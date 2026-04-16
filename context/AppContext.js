'use client';
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const DEFAULT_STATE = {
  user: {
    id: null,
    name: '',
    email: '',
    level: 'A1', levelLabel: 'Débutant', levelIcon: '🌱', clb: 1,
    examType: 'TEF', examDate: null, dailyGoal: 30,
    streak: 0, lastActiveDate: null, totalMinutes: 0,
  },
  progress: {
    alphabet: { completed: 0, total: 42, mastered: [] },
    vocabulary: { completed: 0, total: 200, categories: {} },
    grammar: { completed: 0, total: 30, lessons: {} },
    listening: { completed: 0, total: 20, scores: [] },
    reading: { completed: 0, total: 20, scores: [] },
    writing: { completed: 0, total: 15, drafts: {} },
    conversation: { completed: 0, total: 10, sessions: [] },
    mockExam: { attempts: [], bestCLB: 0 }
  },
  settings: { ttsSpeed: 1.0, ttsVoice: 'auto', examType: 'TEF' }
};

function deepMerge(target, source) {
  const result = { ...target };
  for (let key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, setState] = useState(null);
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  // Fetch state from real database on mount
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch('/api/user');
        if (res.ok) {
          const data = await res.json();
          // Build a normalized state matching expected shape
          const normalizedState = deepMerge(JSON.parse(JSON.stringify(DEFAULT_STATE)), {
            user: {
              ...data.user,
              ...data.stats,
            },
            progress: data.progress,
            settings: { examType: data.user.examType || 'TEF' }
          });
          setState(normalizedState);
        } else {
          // If unauthorized, default state (middleware handles redirect anyway)
          setState(JSON.parse(JSON.stringify(DEFAULT_STATE)));
        }
      } catch (err) {
        console.error('Failed to load user:', err);
        setState(JSON.parse(JSON.stringify(DEFAULT_STATE)));
      }
    }
    loadUser();
  }, []);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = ++toastId.current;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const saveState = useCallback((updater) => {
    setState(prev => typeof updater === 'function' ? updater(prev) : updater);
  }, []);

  // Update progress locally AND sync to database
  const updateProgress = useCallback(async (module, updates) => {
    setState(prev => {
      const currentMod = prev.progress[module] || {};
      const updatedMod = { ...currentMod, ...updates };

      // Sync to backend asynchronously
      fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module,
          completed: updatedMod.completed,
          total: updatedMod.total,
          data: updatedMod
        })
      }).then(res => res.json()).then(data => {
        if (data.success && (data.level !== prev.user.level || data.streak !== prev.user.streak)) {
           // Backend recalculated level/streak, update it locally
           setState(s => ({
             ...s, 
             user: { 
               ...s.user, 
               level: data.level, 
               clb: data.clb, 
               streak: data.streak 
             }
           }));
        }
      }).catch(err => console.error("Sync error:", err));

      return {
        ...prev,
        progress: {
          ...prev.progress,
          [module]: updatedMod
        }
      };
    });
  }, []);

  const calculateLevel = useCallback(() => { /* now handled primarily by backend sync */ }, []);

  const resetState = useCallback(() => {
    // Currently disabled for DB
    showToast('Cannot reset progress yet', 'error');
  }, [showToast]);

  const toggleExamType = useCallback(() => {
    setState(prev => {
      const newType = prev.settings.examType === 'TEF' ? 'TCF' : 'TEF';
      return {
        ...prev,
        user: { ...prev.user, examType: newType },
        settings: { ...prev.settings, examType: newType }
      };
    });
  }, []);

  const getOverallProgress = useCallback(() => {
    if (!state) return 0;
    const p = state.progress;
    const items = [
      p.alphabet.completed / Math.max(p.alphabet.total || 1, 1),
      p.vocabulary.completed / Math.max(p.vocabulary.total || 1, 1),
      p.grammar.completed / Math.max(p.grammar.total || 1, 1),
      p.listening.completed / Math.max(p.listening.total || 1, 1),
      p.reading.completed / Math.max(p.reading.total || 1, 1),
      p.writing.completed / Math.max(p.writing.total || 1, 1),
      p.conversation.completed / Math.max(p.conversation.total || 1, 1)
    ];
    return Math.round((items.reduce((a, b) => a + b, 0) / items.length) * 100);
  }, [state]);

  if (!state) return null; // Loading

  return (
    <AppContext.Provider value={{
      state, saveState, updateProgress, showToast, removeToast,
      toasts, resetState, toggleExamType, calculateLevel, getOverallProgress
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
