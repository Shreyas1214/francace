'use client';
import { useState, useEffect } from 'react';
import { TopBar } from '../../components/TopBar';
import { useApp } from '../../context/AppContext';
import { EXERCISES_DATA } from '../../data/exercises';

const prompts = EXERCISES_DATA.writing.prompts;
const phraseBank = EXERCISES_DATA.writing.phraseBank;

export default function WritingPage() {
  const [activePrompt, setActivePrompt] = useState(null);
  const [draft, setDraft] = useState('');
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [showPhraseBank, setShowPhraseBank] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const { state, updateProgress, showToast } = useApp();

  const currentPrompt = activePrompt !== null ? prompts[activePrompt] : null;

  useEffect(() => {
    if (activePrompt !== null && state) {
      const pid = prompts[activePrompt].id;
      const saved = (state.progress.writing.drafts || {})[pid];
      setDraft(saved || '');
    }
  }, [activePrompt]);

  const wordCount = draft.trim().length > 0 ? draft.trim().split(/\s+/).length : 0;
  const wcColor = currentPrompt
    ? (wordCount >= currentPrompt.wordCount.min && wordCount <= currentPrompt.wordCount.max ? 'var(--color-success)' :
       wordCount > currentPrompt.wordCount.max ? 'var(--color-error)' : 'var(--text-tertiary)')
    : 'var(--text-tertiary)';

  const handleSaveDraft = () => {
    if (!state || !currentPrompt) return;
    const pid = currentPrompt.id;
    const isNew = !(state.progress.writing.drafts || {})[pid];
    const newDrafts = { ...(state.progress.writing.drafts || {}), [pid]: draft };
    updateProgress('writing', {
      drafts: newDrafts,
      completed: (state.progress.writing.completed || 0) + (isNew && draft.length > 50 ? 1 : 0)
    });
    showToast('Draft saved successfully', 'success');
  };

  const getRelevantPhrases = () => {
    if (!currentPrompt?.phraseBankIds) return [];
    const phrases = [];
    currentPrompt.phraseBankIds.forEach(id => {
      if (phraseBank[id]) phraseBank[id].forEach(text => phrases.push(text));
    });
    return phrases;
  };

  if (!state) return null;

  // Prompt List View
  if (activePrompt === null) {
    return (
      <>
        <TopBar title="Writing Practice" subtitle="Expression Écrite" />
        <div className="content-area">
          <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
            <div className="card-header">
              <h3 className="card-title">✍️ Writing Practice (Expression écrite)</h3>
              <span className="tag tag-blue">{state.progress.writing.completed}/{state.progress.writing.total} completed</span>
            </div>
            <p className="card-body">Practice TEF/TCF writing tasks. Your drafts are auto-saved so you can come back anytime.</p>
          </div>

          <div className="grid-auto">
            {prompts.map((p, idx) => {
              const hasDraft = !!(state.progress.writing.drafts || {})[p.id];
              return (
                <div key={p.id} className="card" style={{ cursor: 'pointer' }} onClick={() => { setActivePrompt(idx); setShowModelAnswer(false); setShowPhraseBank(false); setShowChecklist(false); }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                    <span style={{ fontSize: '2rem' }}>✍️</span>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: 'var(--text-primary)', marginBottom: 4 }}>{p.title}</h4>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>{p.titleEn}</p>
                      <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-sm)', flexWrap: 'wrap' }}>
                        <span className={`tag ${p.level === 'A2' ? 'tag-green' : p.level === 'B1' ? 'tag-blue' : 'tag-yellow'}`}>{p.level}</span>
                        <span className="tag tag-blue">{p.type}</span>
                        <span className="tag tag-blue">{p.wordCount.min}-{p.wordCount.max} words</span>
                        {hasDraft && <span className="tag tag-yellow">📝 Draft saved</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Strategies */}
          <div className="card" style={{ marginTop: 'var(--space-xl)' }}>
            <div className="card-header">
              <h3 className="card-title">💡 Writing Strategies</h3>
            </div>
            <div className="card-body">
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <li>📌 <strong>Plan before writing</strong> — Outline your main ideas first</li>
                <li>📌 <strong>Watch the word count</strong> — Stay within the min/max range</li>
                <li>📌 <strong>Use formal language</strong> — &ldquo;vous&rdquo; forms unless specified otherwise</li>
                <li>📌 <strong>Include opening and closing</strong> — Proper greeting and signature</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Writing Editor View
  const relevantPhrases = getRelevantPhrases();

  return (
    <>
      <TopBar title={currentPrompt.title} subtitle={currentPrompt.titleEn} />
      <div className="content-area">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
          <button className="btn btn-ghost" onClick={() => { handleSaveDraft(); setActivePrompt(null); }}>← Back</button>
          <h3 style={{ fontFamily: 'var(--font-display)' }}>✍️ {currentPrompt.title}</h3>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 'var(--space-xs)' }}>
            <button className={`btn ${showPhraseBank ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setShowPhraseBank(!showPhraseBank)}>📋 Phrases</button>
            <button className={`btn ${showChecklist ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setShowChecklist(!showChecklist)}>✅ Checklist</button>
          </div>
        </div>

        <div className="grid-2">
          {/* Left: Editor */}
          <div>
            {/* Task Prompt */}
            <div className="card" style={{ marginBottom: 'var(--space-md)' }}>
              <div style={{ padding: 'var(--space-sm)', borderLeft: '3px solid var(--accent-primary)', background: 'rgba(var(--accent-primary-rgb), 0.05)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
                <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)' }}>{currentPrompt.instruction}</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginTop: 'var(--space-xs)', fontStyle: 'italic' }}>{currentPrompt.instructionEn}</p>
              </div>
            </div>

            {/* Editor */}
            <div className="card">
              {showModelAnswer ? (
                <div>
                  <h4 style={{ color: 'var(--color-success)', marginBottom: 'var(--space-md)' }}>Model Answer ({currentPrompt.level})</h4>
                  {currentPrompt.modelAnswer ? (
                    <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, color: 'var(--text-secondary)' }}>{currentPrompt.modelAnswer}</p>
                  ) : (
                    <p style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>No model answer available. Write your own!</p>
                  )}
                </div>
              ) : (
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Commencez à écrire ici... (Start writing here)"
                  className="input-field"
                  style={{ minHeight: '300px', resize: 'vertical' }}
                />
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-md)' }}>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: wcColor }}>
                  {wordCount}/{currentPrompt.wordCount.min}-{currentPrompt.wordCount.max} words
                </span>
                <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
                  <button className={`btn ${showModelAnswer ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setShowModelAnswer(!showModelAnswer)}>
                    {showModelAnswer ? '✏️ Editor' : '📄 Model'}
                  </button>
                  <button className="btn btn-success btn-sm" onClick={handleSaveDraft}>💾 Save</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Tools */}
          <div>
            {showPhraseBank && relevantPhrases.length > 0 && (
              <div className="card" style={{ marginBottom: 'var(--space-md)' }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-md)', fontSize: 'var(--text-sm)' }}>📋 Phrase Bank — click to insert</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                  {relevantPhrases.map((phrase, i) => (
                    <div key={i} style={{ padding: 'var(--space-sm) var(--space-md)', background: 'var(--glass-bg)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: 'var(--text-sm)', transition: 'all var(--transition-fast)' }}
                         onClick={() => { if (!showModelAnswer) setDraft(d => d + (d.endsWith(' ') || d === '' ? '' : ' ') + phrase + ' '); }}>
                      {phrase}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showChecklist && (
              <div className="card" style={{ marginBottom: 'var(--space-md)' }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-md)', fontSize: 'var(--text-sm)' }}>✅ Self-Assessment Checklist</h4>
                <ul style={{ paddingLeft: 'var(--space-lg)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 2 }}>
                  {currentPrompt.checklist.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {!showPhraseBank && !showChecklist && (
              <div className="card">
                <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>
                  Use the toolbar buttons above to open the <strong>Phrase Bank</strong> or <strong>Self-Assessment Checklist</strong>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
