'use client';
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const DEFAULT_STATE = {
  user: {
    level: 'A1', levelLabel: 'Débutant', levelIcon: '🌱', clb: 1,
    examType: 'TEF', examDate: null, dailyGoal: 30,
    streak: 0, lastActiveDate: null, totalMinutes: 0,
    joinDate: new Date().toISOString()
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

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('francace_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        setState(deepMerge(JSON.parse(JSON.stringify(DEFAULT_STATE)), parsed));
      } else {
        setState(JSON.parse(JSON.stringify(DEFAULT_STATE)));
      }
    } catch {
      setState(JSON.parse(JSON.stringify(DEFAULT_STATE)));
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!state) return;
    try {
      localStorage.setItem('francace_state', JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save state:', e);
    }
  }, [state]);

  // Streak management
  useEffect(() => {
    if (!state) return;
    const today = new Date().toDateString();
    if (state.user.lastActiveDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    let newStreak;
    if (state.user.lastActiveDate === yesterday) {
      newStreak = state.user.streak + 1;
    } else {
      newStreak = 1;
    }
    setState(prev => ({
      ...prev,
      user: { ...prev.user, streak: newStreak, lastActiveDate: today }
    }));
  }, [state?.user?.lastActiveDate]);

  const saveState = useCallback((updater) => {
    setState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      return next;
    });
  }, []);

  const updateProgress = useCallback((module, updates) => {
    setState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        [module]: { ...prev.progress[module], ...updates }
      }
    }));
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

  const resetState = useCallback(() => {
    const fresh = JSON.parse(JSON.stringify(DEFAULT_STATE));
    setState(fresh);
    localStorage.removeItem('francace_state');
    showToast('All progress has been reset', 'info');
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

  // Calculate level from progress
  const calculateLevel = useCallback(() => {
    setState(prev => {
      if (!prev) return prev;
      const p = prev.progress;
      const totalCompleted =
        (p.alphabet.completed / Math.max(p.alphabet.total, 1)) * 10 +
        (p.vocabulary.completed / Math.max(p.vocabulary.total, 1)) * 20 +
        (p.grammar.completed / Math.max(p.grammar.total, 1)) * 20 +
        (p.listening.completed / Math.max(p.listening.total, 1)) * 15 +
        (p.reading.completed / Math.max(p.reading.total, 1)) * 15 +
        (p.writing.completed / Math.max(p.writing.total, 1)) * 10 +
        (p.conversation.completed / Math.max(p.conversation.total, 1)) * 10;
      
      let level, label, icon, clb;
      if (totalCompleted >= 90) { level = 'C1'; label = "Prêt pour l'examen"; icon = '🏆'; clb = 10; }
      else if (totalCompleted >= 70) { level = 'C1'; label = 'Expert'; icon = '🎯'; clb = 8; }
      else if (totalCompleted >= 50) { level = 'B2'; label = 'Avancé'; icon = '✍️'; clb = 7; }
      else if (totalCompleted >= 30) { level = 'B1'; label = 'Intermédiaire'; icon = '🗣️'; clb = 5; }
      else if (totalCompleted >= 15) { level = 'A2'; label = 'Élémentaire'; icon = '📚'; clb = 3; }
      else { level = 'A1'; label = 'Débutant'; icon = '🌱'; clb = 1; }
      
      // Prevent infinite loop if nothing actually changed
      if (prev.user.level === level && prev.user.clb === clb) return prev;

      return {
        ...prev,
        user: { ...prev.user, level, levelLabel: label, levelIcon: icon, clb }
      };
    });
  }, []);

  const getOverallProgress = useCallback(() => {
    if (!state) return 0;
    const p = state.progress;
    const items = [
      p.alphabet.completed / Math.max(p.alphabet.total, 1),
      p.vocabulary.completed / Math.max(p.vocabulary.total, 1),
      p.grammar.completed / Math.max(p.grammar.total, 1),
      p.listening.completed / Math.max(p.listening.total, 1),
      p.reading.completed / Math.max(p.reading.total, 1),
      p.writing.completed / Math.max(p.writing.total, 1),
      p.conversation.completed / Math.max(p.conversation.total, 1)
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
