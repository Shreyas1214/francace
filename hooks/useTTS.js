'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

export function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const selectedVoice = useRef(null);
  const speed = useRef(1.0);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const loadVoices = () => {
      const allVoices = speechSynthesis.getVoices();
      const frVoices = allVoices.filter(v => v.lang.startsWith('fr'));
      setVoices(frVoices);
      // Prefer Canadian French, then any French
      selectedVoice.current =
        frVoices.find(v => v.lang === 'fr-CA') ||
        frVoices.find(v => v.lang === 'fr-FR') ||
        frVoices[0] || null;
    };
    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  const speak = useCallback((text, rate) => {
    if (!window.speechSynthesis || !text) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-CA';
    if (selectedVoice.current) utterance.voice = selectedVoice.current;
    utterance.rate = rate || speed.current;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const setSpeed = useCallback((s) => { speed.current = s; }, []);
  const setVoice = useCallback((name) => {
    const v = voices.find(v => v.name === name);
    if (v) selectedVoice.current = v;
  }, [voices]);

  return { speak, stop, isSpeaking, voices, setSpeed, setVoice };
}
