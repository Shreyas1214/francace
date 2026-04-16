'use client';
import { useState } from 'react';
import { TopBar } from '../../components/TopBar';
import { useTTS } from '../../hooks/useTTS';
import { useApp } from '../../context/AppContext';
import { EXERCISES_DATA } from '../../data/exercises';

const passages = EXERCISES_DATA.reading.passages;

export default function ReadingPage() {
  const [activeTask, setActiveTask] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const { speak } = useTTS();
  const { state, updateProgress, showToast } = useApp();

  const currentPassage = activeTask !== null ? passages[activeTask] : null;

  const handleStartTask = (idx) => {
    setActiveTask(idx);
    setQIndex(0);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
    setSelectedAnswer(null);
  };

  const handleWordClick = (word) => {
    const cleanWord = word.replace(/[.,!?;:"'()\\]/g, '');
    if (cleanWord) speak(cleanWord);
  };

  const handleAnswer = (answerIndex) => {
    if (answered) return;
    setAnswered(true);
    setSelectedAnswer(answerIndex);
    if (answerIndex === currentPassage.questions[qIndex].answer) setScore(s => s + 1);
  };

  const handleNext = () => {
    setAnswered(false);
    setSelectedAnswer(null);
    if (qIndex + 1 < currentPassage.questions.length) {
      setQIndex(q => q + 1);
    } else {
      setShowResult(true);
      if (!state) return;
      const tScore = state.progress.reading.scores?.[activeTask] || 0;
      const finalScore = score + (selectedAnswer === currentPassage.questions[qIndex].answer ? 1 : 0);
      if (finalScore > tScore) {
        const newScores = [...(state.progress.reading.scores || [])];
        newScores[activeTask] = finalScore;
        updateProgress('reading', { scores: newScores, completed: (state.progress.reading.completed || 0) + (tScore === 0 ? currentPassage.questions.length : 0) });
        showToast(`New high score: ${finalScore}/${currentPassage.questions.length}`, 'success');
      }
    }
  };

  if (!state) return null;

  // Passage List View
  if (activeTask === null) {
    return (
      <>
        <TopBar title="Reading Comprehension" subtitle="Compréhension Écrite" />
        <div className="content-area">
          <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
            <div className="card-header">
              <h3 className="card-title">📖 Reading Comprehension (Compréhension écrite)</h3>
              <span className="tag tag-blue">{state.progress.reading.completed}/{state.progress.reading.total} completed</span>
            </div>
            <p className="card-body">Read French passages and answer comprehension questions. Click any word to hear its pronunciation!</p>
          </div>

          <div className="grid-auto">
            {passages.map((p, idx) => (
              <div key={p.id} className="card" style={{ cursor: 'pointer' }} onClick={() => handleStartTask(idx)}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                  <span style={{ fontSize: '2rem' }}>📖</span>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: 4 }}>{p.title}</h4>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>{p.titleEn}</p>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-sm)' }}>
                      <span className={`tag ${p.level === 'A1' ? 'tag-green' : p.level === 'A2' ? 'tag-blue' : 'tag-yellow'}`}>{p.level}</span>
                      <span className="tag tag-blue">{p.type}</span>
                      <span className="tag tag-blue">{p.questions.length} Q</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Strategies */}
          <div className="card" style={{ marginTop: 'var(--space-xl)' }}>
            <div className="card-header">
              <h3 className="card-title">💡 Reading Strategies</h3>
            </div>
            <div className="card-body">
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <li>🎯 <strong>Skim first</strong> — Read the passage quickly to get the gist before the questions</li>
                <li>🎯 <strong>Look for key words</strong> — Match question keywords to passage sections</li>
                <li>🎯 <strong>Don&apos;t translate word-by-word</strong> — Focus on understanding the meaning</li>
                <li>🎯 <strong>Watch for negations</strong> — &ldquo;ne...pas&rdquo;, &ldquo;ne...jamais&rdquo; change the meaning completely</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Active Reading Practice
  return (
    <>
      <TopBar title={currentPassage.title} subtitle={currentPassage.titleEn} />
      <div className="content-area">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
          <button className="btn btn-ghost" onClick={() => setActiveTask(null)}>← Back</button>
          <h3 style={{ fontFamily: 'var(--font-display)' }}>📖 {currentPassage.title}</h3>
          <span className="tag tag-blue" style={{ marginLeft: 'auto' }}>
            {showResult ? 'Complete' : `${qIndex + 1}/${currentPassage.questions.length}`}
          </span>
        </div>

        {showResult ? (
          <div className="card">
            <div className="score-display">
              <div className="score-number">{score}/{currentPassage.questions.length}</div>
              <div className="score-label">{currentPassage.title}</div>
              <p style={{ color: 'var(--text-secondary)', margin: 'var(--space-md) 0' }}>
                {score === currentPassage.questions.length ? '🎉 Perfect reading comprehension!' :
                 score >= currentPassage.questions.length * 0.7 ? '👏 Good work!' :
                 '📚 Re-read the passage and try again.'}
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={() => handleStartTask(activeTask)}>🔄 Retry</button>
                <button className="btn btn-secondary" onClick={() => setActiveTask(null)}>← All Passages</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid-2">
            {/* Left: Passage */}
            <div className="card">
              <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-md)', borderBottom: '1px solid var(--glass-border)', paddingBottom: 'var(--space-sm)' }}>
                Passage <span style={{ fontSize: 'var(--text-xs)' }}>(Click words to listen)</span>
              </h4>
              <div className="reading-passage">
                {currentPassage.text.split('\n').map((paragraph, pIdx) => (
                  <p key={pIdx} style={{ marginBottom: 'var(--space-md)' }}>
                    {paragraph.split(' ').map((word, wIdx) => (
                      <span key={wIdx} className="word-highlight" onClick={() => handleWordClick(word)}>
                        {word}{' '}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </div>

            {/* Right: Questions */}
            <div className="card">
              <p style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-lg)', lineHeight: 1.8 }}>{currentPassage.questions[qIndex].question}</p>
              <div className="quiz-options">
                {currentPassage.questions[qIndex].options.map((opt, i) => {
                  let cls = 'quiz-option';
                  if (answered && i === currentPassage.questions[qIndex].answer) cls += ' correct';
                  else if (answered && i === selectedAnswer && i !== currentPassage.questions[qIndex].answer) cls += ' incorrect';
                  return (
                    <div key={i} className={cls} onClick={() => handleAnswer(i)} style={{ cursor: answered ? 'default' : 'pointer' }}>
                      <span className="quiz-option-letter">{String.fromCharCode(65 + i)}</span>
                      <span>{opt}</span>
                    </div>
                  );
                })}
              </div>
              {answered && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-lg)' }}>
                  <div className="skill-progress" style={{ flex: 1, marginRight: 'var(--space-md)' }}>
                    <div className="skill-progress-fill" style={{ width: `${((qIndex + 1) / currentPassage.questions.length) * 100}%`, background: 'var(--gradient-primary)' }}></div>
                  </div>
                  <button className="btn btn-primary" onClick={handleNext}>Next →</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
