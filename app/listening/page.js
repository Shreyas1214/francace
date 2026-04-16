'use client';
import { useState } from 'react';
import { TopBar } from '../../components/TopBar';
import { useTTS } from '../../hooks/useTTS';
import { useApp } from '../../context/AppContext';
import { EXERCISES_DATA } from '../../data/exercises';

const scripts = EXERCISES_DATA.listening.scripts;

export default function ListeningPage() {
  const [activeTask, setActiveTask] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const { speak, stop, isSpeaking } = useTTS();
  const { state, updateProgress, showToast } = useApp();

  const currentScript = activeTask !== null ? scripts[activeTask] : null;

  const handleStartTask = (idx) => {
    setActiveTask(idx);
    setQIndex(0);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
    setSelectedAnswer(null);
    stop();
  };

  const handlePlayAudio = () => {
    speak(currentScript.text, playbackSpeed);
  };

  const handleAnswer = (answerIndex) => {
    if (answered) return;
    setAnswered(true);
    setSelectedAnswer(answerIndex);
    if (answerIndex === currentScript.questions[qIndex].answer) setScore(s => s + 1);
  };

  const handleNext = () => {
    setAnswered(false);
    setSelectedAnswer(null);
    if (qIndex + 1 < currentScript.questions.length) {
      setQIndex(q => q + 1);
    } else {
      setShowResult(true);
      stop();
      if (!state) return;
      const tScore = state.progress.listening.scores?.[activeTask] || 0;
      const finalScore = score + (selectedAnswer === currentScript.questions[qIndex].answer ? 1 : 0);
      if (finalScore > tScore) {
        const newScores = [...(state.progress.listening.scores || [])];
        newScores[activeTask] = finalScore;
        updateProgress('listening', { scores: newScores, completed: (state.progress.listening.completed || 0) + (tScore === 0 ? currentScript.questions.length : 0) });
        showToast(`New high score: ${finalScore}/${currentScript.questions.length}`, 'success');
      }
    }
  };

  if (!state) return null;

  // Script List View
  if (activeTask === null) {
    return (
      <>
        <TopBar title="Listening Practice" subtitle="Compréhension Orale" />
        <div className="content-area">
          <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
            <div className="card-header">
              <h3 className="card-title">🎧 Listening Practice (Compréhension orale)</h3>
              <span className="tag tag-blue">{state.progress.listening.completed}/{state.progress.listening.total} completed</span>
            </div>
            <p className="card-body">Listen to French audio passages and answer comprehension questions. Practice at different speeds to prepare for the real exam.</p>
          </div>

          {/* Speed Controls */}
          <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)', flexWrap: 'wrap' }}>
              <div>
                <label style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', display: 'block', marginBottom: 4 }}>Playback Speed</label>
                <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
                  {[0.75, 1.0, 1.25].map(spd => (
                    <button key={spd} className={`btn ${playbackSpeed === spd ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setPlaybackSpeed(spd)}>{spd}x</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid-auto">
            {scripts.map((s, idx) => (
              <div key={s.id} className="card" style={{ cursor: 'pointer' }} onClick={() => handleStartTask(idx)}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                  <span style={{ fontSize: '2rem' }}>🎧</span>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: 4 }}>{s.title}</h4>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>{s.titleEn}</p>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-sm)' }}>
                      <span className={`tag ${s.level === 'A2' ? 'tag-green' : 'tag-blue'}`}>{s.level}</span>
                      <span className="tag tag-blue">{s.type}</span>
                      <span className="tag tag-blue">{s.questions.length} Q</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Strategies */}
          <div className="card" style={{ marginTop: 'var(--space-xl)' }}>
            <div className="card-header">
              <h3 className="card-title">💡 Listening Strategies</h3>
            </div>
            <div className="card-body">
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <li>🎯 <strong>Read questions first</strong> — Know what to listen for before playing audio</li>
                <li>🎯 <strong>Listen for key words</strong> — Focus on stressed words and numbers</li>
                <li>🎯 <strong>Don&apos;t panic</strong> — You don&apos;t need to understand every word</li>
                <li>🎯 <strong>Practice at faster speeds</strong> — Makes normal speed feel easier on exam day</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Active Listening Practice
  return (
    <>
      <TopBar title={currentScript.title} subtitle={currentScript.titleEn} />
      <div className="content-area">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
          <button className="btn btn-ghost" onClick={() => { setActiveTask(null); stop(); }}>← Back</button>
          <h3 style={{ fontFamily: 'var(--font-display)' }}>🎧 {currentScript.title}</h3>
          <span className="tag tag-blue" style={{ marginLeft: 'auto' }}>
            {showResult ? 'Complete' : `${qIndex + 1}/${currentScript.questions.length}`}
          </span>
        </div>

        {showResult ? (
          <div className="card">
            <div className="score-display">
              <div className="score-number">{score}/{currentScript.questions.length}</div>
              <div className="score-label">{currentScript.title}</div>
              <p style={{ color: 'var(--text-secondary)', margin: 'var(--space-md) 0' }}>
                {score === currentScript.questions.length ? '🎉 Perfect listening comprehension!' :
                 score >= currentScript.questions.length * 0.7 ? '👏 Good work! Review the transcript.' :
                 '📚 Try again and listen more carefully.'}
              </p>
              {/* Transcript */}
              <div style={{ textAlign: 'left', margin: 'var(--space-lg) auto', maxWidth: '600px', padding: 'var(--space-lg)', background: 'var(--glass-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                <h4 style={{ marginBottom: 'var(--space-sm)', color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>📝 Transcript</h4>
                <p style={{ fontStyle: 'italic', lineHeight: 1.8, color: 'var(--text-secondary)' }}>&ldquo;{currentScript.text}&rdquo;</p>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={() => handleStartTask(activeTask)}>🔄 Retry</button>
                <button className="btn btn-secondary" onClick={() => setActiveTask(null)}>← All Tasks</button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Audio Player */}
            <div className="card" style={{ marginBottom: 'var(--space-lg)', textAlign: 'center' }}>
              <button onClick={handlePlayAudio} className={`btn ${isSpeaking ? 'btn-accent' : 'btn-primary'} btn-lg`} style={{ borderRadius: 'var(--radius-full)' }}>
                {isSpeaking ? '🔊 Playing...' : '▶ Play Audio'}
              </button>
              <p style={{ marginTop: 'var(--space-sm)', fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>Speed: {playbackSpeed}x — Listen as many times as you need</p>
            </div>

            {/* Question */}
            <div className="card">
              <p style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-lg)', lineHeight: 1.8 }}>{currentScript.questions[qIndex].question}</p>
              <div className="quiz-options">
                {currentScript.questions[qIndex].options.map((opt, i) => {
                  let cls = 'quiz-option';
                  if (answered && i === currentScript.questions[qIndex].answer) cls += ' correct';
                  else if (answered && i === selectedAnswer && i !== currentScript.questions[qIndex].answer) cls += ' incorrect';
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
                    <div className="skill-progress-fill" style={{ width: `${((qIndex + 1) / currentScript.questions.length) * 100}%`, background: 'var(--gradient-primary)' }}></div>
                  </div>
                  <button className="btn btn-primary" onClick={handleNext}>Next →</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
