'use client';
import { useState, useRef, useEffect } from 'react';
import { TopBar } from '../../components/TopBar';
import { useApp } from '../../context/AppContext';
import { useTTS } from '../../hooks/useTTS';
import { CONVERSATIONS_DATA } from '../../data/conversations';

const scenarios = CONVERSATIONS_DATA.scenarios;

export default function ConversationPage() {
  const [activeScenario, setActiveScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [conversationScore, setConversationScore] = useState({ total: 0, criteria: {} });

  const { state, updateProgress, showToast } = useApp();
  const { speak } = useTTS();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const currentScenario = activeScenario !== null ? scenarios[activeScenario] : null;

  const startScenario = (idx) => {
    const scenario = scenarios[idx];
    setActiveScenario(idx);
    setMessages([{ role: 'ai', text: scenario.greeting, textEn: scenario.greetingEn }]);
    setIsFinished(false);
    setShowSuggestions(true);
    setConversationScore({ total: 0, criteria: {} });
    speak(scenario.greeting);
  };

  const matchDialogue = (text, dialogueTree) => {
    const lower = text.toLowerCase();
    for (const [patterns, response] of Object.entries(dialogueTree)) {
      const keywords = patterns.split('|');
      if (keywords.some(kw => lower.includes(kw.toLowerCase()))) {
        return response;
      }
    }
    return null;
  };

  const scoreResponse = (text) => {
    const lower = text.toLowerCase();
    let points = 0;
    if (lower.includes('vous') || lower.includes("s'il vous plaît") || lower.includes('merci') || lower.includes('bonjour')) points += 2;
    if (lower.includes('pourriez') || lower.includes('voudrais') || lower.includes('puis-je') || lower.includes('serait')) points += 2;
    if (text.split(' ').length > 5) points += 1;
    return points;
  };

  const handleSend = () => {
    if (!inputValue.trim() || isFinished) return;
    const userText = inputValue;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInputValue('');
    setShowSuggestions(false);

    const points = scoreResponse(userText);
    setConversationScore(prev => ({ ...prev, total: prev.total + points }));

    setTimeout(() => {
      const match = matchDialogue(userText, currentScenario.dialogueTree);
      const lower = userText.toLowerCase();

      if (match) {
        setMessages(prev => [...prev, { role: 'ai', text: match.response, textEn: match.responseEn }]);
        speak(match.response);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: currentScenario.defaultResponse, textEn: currentScenario.defaultResponseEn }]);
        speak(currentScenario.defaultResponse);
      }

      if (lower.includes('merci') || lower.includes('au revoir') || lower.includes('bonne journée')) {
        setTimeout(() => endAndScore(), 2000);
      }
    }, 800);
  };

  const endAndScore = () => {
    setIsFinished(true);
    const total = Math.min(100, Math.round((conversationScore.total / 15) * 100));

    if (state) {
      const prevBest = state.progress.conversation.sessions?.find(s => s.id === currentScenario.id)?.score || 0;
      if (total > prevBest) {
        const newSessions = [
          ...(state.progress.conversation.sessions || []).filter(s => s.id !== currentScenario.id),
          { id: currentScenario.id, score: total }
        ];
        updateProgress('conversation', { sessions: newSessions, completed: newSessions.length });
      }
    }

    setMessages(prev => [...prev, {
      role: 'system',
      text: `📊 Conversation Score: ${Math.min(100, Math.round((conversationScore.total / 15) * 100))}%`
    }]);
  };

  if (!state) return null;

  // Scenario List View
  if (activeScenario === null) {
    return (
      <>
        <TopBar title="AI Conversation Partner" subtitle="Interactive speaking practice" />
        <div className="content-area">
          <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
            <div className="card-header">
              <h3 className="card-title">🗣️ AI Conversation Partner</h3>
              <span className="tag tag-red">Flagship Feature</span>
            </div>
            <p className="card-body">Practice real French conversation scenarios that mirror TEF/TCF speaking tasks. Choose a scenario below and chat in French!</p>
          </div>

          <div className="grid-auto">
            {scenarios.map((s, idx) => {
              const prev = (state.progress.conversation.sessions || []).find(x => x.id === s.id);
              return (
                <div key={s.id} className="card" style={{ cursor: 'pointer' }} onClick={() => startScenario(idx)}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                    <span style={{ fontSize: '2.5rem' }}>{s.icon}</span>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: 'var(--text-primary)', marginBottom: 4 }}>{s.title}</h4>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-sm)' }}>{s.titleEn}</p>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{s.context}</p>
                      <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-sm)' }}>
                        <span className={`tag ${s.level === 'A2' ? 'tag-green' : s.level === 'B1' ? 'tag-blue' : 'tag-yellow'}`}>{s.level}</span>
                        <span className="tag tag-blue">{s.scoringCriteria.length} criteria</span>
                        {prev && <span className="tag tag-green">✓ {prev.score}%</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Speaking Tips */}
          <div className="card" style={{ marginTop: 'var(--space-xl)' }}>
            <div className="card-header">
              <h3 className="card-title">💡 Speaking Tips for TEF/TCF</h3>
            </div>
            <div className="card-body">
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <li>🎯 <strong>Use polite forms</strong> — Always start with &ldquo;Bonjour&rdquo; and use &ldquo;vous&rdquo; in formal scenarios</li>
                <li>🎯 <strong>Be structured</strong> — Organize your thoughts: introduction → development → conclusion</li>
                <li>🎯 <strong>Use connectors</strong> — &ldquo;D&apos;abord&rdquo;, &ldquo;Ensuite&rdquo;, &ldquo;Cependant&rdquo;, &ldquo;En conclusion&rdquo;</li>
                <li>🎯 <strong>Vary vocabulary</strong> — Avoid repeating the same words; use synonyms</li>
                <li>🎯 <strong>Express opinions</strong> — &ldquo;À mon avis&rdquo;, &ldquo;Je pense que&rdquo;, &ldquo;Il me semble que&rdquo;</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Active Chat View
  return (
    <>
      <TopBar title={currentScenario.title} subtitle={currentScenario.context} />
      <div className="content-area">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
          <button className="btn btn-ghost" onClick={() => { setActiveScenario(null); setMessages([]); }}>← Back</button>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)' }}>{currentScenario.icon} {currentScenario.title}</h3>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{currentScenario.context}</span>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowSuggestions(!showSuggestions)} title="Toggle suggestions">
              {showSuggestions ? '💡' : '💡❌'}
            </button>
            {!isFinished && <button className="btn btn-accent btn-sm" onClick={endAndScore}>📊 End & Score</button>}
          </div>
        </div>

        {/* Chat Container */}
        <div className="chat-container">
          <div className="chat-messages" id="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-message ${m.role === 'user' ? 'user' : 'ai'}`}>
                <div className="chat-avatar">{m.role === 'user' ? '👤' : m.role === 'system' ? '📊' : '🇫🇷'}</div>
                <div>
                  <div className="chat-bubble">{m.text}</div>
                  {m.textEn && (
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 2, paddingLeft: 'var(--space-sm)' }}>{m.textEn}</div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {showSuggestions && messages.length <= 2 && !isFinished && (
            <div style={{ padding: 'var(--space-sm) var(--space-md)', borderTop: '1px solid var(--glass-border)', background: 'var(--bg-secondary)' }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-xs)' }}>💡 Suggested responses:</p>
              <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap' }}>
                {currentScenario.suggestedResponses.map((r, i) => (
                  <button key={i} className="btn btn-secondary btn-sm" onClick={() => setInputValue(r)}>{r}</button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="chat-input-area">
            <input
              ref={inputRef}
              type="text"
              className="chat-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isFinished && handleSend()}
              placeholder={isFinished ? 'Conversation ended' : 'Type your response in French...'}
              disabled={isFinished}
              autoComplete="off"
            />
            <button className="chat-send-btn" onClick={handleSend} disabled={isFinished} title="Send">➤</button>
          </div>
        </div>
      </div>
    </>
  );
}
