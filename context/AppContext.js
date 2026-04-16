'use client';
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEY = 'francace_user_state';

const DEFAULT_STATE = {
  user: {
    id: 'local_user',
    name: 'Learner',
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
  const isInitialized = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setState(deepMerge(JSON.parse(JSON.stringify(DEFAULT_STATE)), JSON.parse(saved)));
        } else {
          setState(JSON.parse(JSON.stringify(DEFAULT_STATE)));
        }
      } catch (err) {
        console.error('Local storage error:', err);
        setState(JSON.parse(JSON.stringify(DEFAULT_STATE)));
      }
    }
  }, []);

  useEffect(() => {
    if (state && typeof window !== 'undefined') {
      if (isInitialized.current) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } else {
        isInitialized.current = true;
      }
    }
  }, [state]);

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

  const updateProgress = useCallback((module, updates) => {
    setState(prev => {
      const currentMod = prev.progress[module] || {};
      const updatedMod = { ...currentMod, ...updates };

      return {
        ...prev,
        progress: {
          ...prev.progress,
          [module]: updatedMod
        }
      };
    });
  }, []);

  const calculateLevel = useCallback(() => {
    if (!state) return;
    
    // Simple local simulation of CLB level
    let avgScore = 0;
    try {
      const p = state.progress;
      let totalItemsCompleted = p.listening.completed + p.reading.completed + p.grammar.completed;
      let totalMins = state.user.totalMinutes;
      avgScore = Math.min(100, (totalItemsCompleted * 2) + Math.floor(totalMins / 10));
    } catch(e){}

    let newClb = 1;
    let newLevel = 'A1';
    let newLabel = 'Débutant';
    let newIcon = '🌱';

    if (avgScore > 90) { newClb = 10; newLevel = 'C1'; newLabel = 'Avancé'; newIcon = '👑'; }
    else if (avgScore > 75) { newClb = 7; newLevel = 'B2'; newLabel = 'Intermédiaire Fort'; newIcon = '🚀'; }
    else if (avgScore > 50) { newClb = 5; newLevel = 'B1'; newLabel = 'Intermédiaire'; newIcon = '⭐'; }
    else if (avgScore > 25) { newClb = 4; newLevel = 'A2'; newLabel = 'Élémentaire'; newIcon = '🌿'; }

    if (state.user.clb !== newClb) {
      setState(prev => ({
        ...prev,
        user: { ...prev.user, level: newLevel, levelLabel: newLabel, levelIcon: newIcon, clb: newClb }
      }));
    }
  }, [state]);

  const resetState = useCallback(() => {
    setState(JSON.parse(JSON.stringify(DEFAULT_STATE)));
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    showToast('Progress reset successfully');
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
