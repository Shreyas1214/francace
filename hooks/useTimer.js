'use client';
import { useState, useRef, useCallback, useEffect } from 'react';

export function useTimer(initialSeconds = 0, onComplete) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const stop = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    setIsRunning(false);
  }, []);

  const start = useCallback((seconds) => {
    stop();
    if (seconds !== undefined) setTimeLeft(seconds);
    setIsRunning(true);
  }, [stop]);

  const reset = useCallback((seconds) => {
    stop();
    setTimeLeft(seconds !== undefined ? seconds : initialSeconds);
  }, [stop, initialSeconds]);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          onCompleteRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning]);

  const formatTime = useCallback((s) => {
    const seconds = s !== undefined ? s : timeLeft;
    const m = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }, [timeLeft]);

  return { timeLeft, isRunning, start, stop, reset, formatTime };
}
