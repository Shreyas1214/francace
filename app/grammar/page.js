'use client';
import { useState } from 'react';
import { TopBar } from '../../components/TopBar';
import { useApp } from '../../context/AppContext';
import { EXERCISES_DATA } from '../../data/exercises';

const lessons = EXERCISES_DATA.grammar.lessons;
const tips = EXERCISES_DATA.grammar.tips;

function getLevelTag(level) {
  if (level === 'A1') return 'tag-green';
  if (level === 'A2') return 'tag-blue';
  return 'tag-yellow';
}

export default function GrammarPage() {
  const [activeLesson, setActiveLesson] = useState(null);
  const [exerciseMode, setExerciseMode] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const { state, updateProgress, showToast } = useApp();

  const handleStartExercise = () => {
    setExerciseMode(true);
    setQIndex(0);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
    setSelectedAnswer(null);
  };

  const currentLesson = activeLesson !== null ? lessons[activeLesson] : null;

  const handleAnswer = (optIndex) => {
    if (answered) return;
    setAnswered(true);
    setSelectedAnswer(optIndex);
    const q = currentLesson.exercises[qIndex];
    if (optIndex === q.answer) setScore(s => s + 1);
  };

  const handleNext = () => {
    setAnswered(false);
    setSelectedAnswer(null);
    if (qIndex + 1 < currentLesson.exercises.length) {
      setQIndex(q => q + 1);
    } else {
      setShowResult(true);
      if (!state) return;
      const lessonScore = state.progress.grammar.lessons[currentLesson.id]?.score || 0;
      const finalScore = score + (selectedAnswer === currentLesson.exercises[qIndex].answer ? 1 : 0);
      if (finalScore > lessonScore) {
        updateProgress('grammar', {
          lessons: { ...state.progress.grammar.lessons, [currentLesson.id]: { score: finalScore, completed: true, total: currentLesson.exercises.length } },
          completed: Object.values({ ...state.progress.grammar.lessons, [currentLesson.id]: { score: finalScore, completed: true, total: currentLesson.exercises.length } }).reduce((acc, l) => acc + (l.completed ? l.total : 0), 0)
        });
      }
    }
  };

  const renderTheory = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--accent-primary)">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em style="color:var(--text-secondary)">$1</em>')
      .replace(/\n/g, '<br/>')
      .replace(/•/g, '<span style="color:var(--accent-primary);margin-right:4px">•</span>');
  };

  if (!state) return null;

  // Lesson List View
  if (activeLesson === null) {
    return (
      <>
        <TopBar title="Grammar Lessons" subtitle="Build strong foundations" />
        <div className="content-area">
          <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
            <div className="card-header">
              <h3 className="card-title">Grammar Lessons</h3>
              <span className="tag tag-blue">{state.progress.grammar.completed}/{lessons.reduce((a, l) => a + l.exercises.length, 0)} exercises done</span>
            </div>
            <p className="card-body">Master French grammar with structured lessons. Each lesson includes theory, examples, and interactive exercises.</p>
          </div>

          <div className="grid-auto">
            {lessons.map((lesson, idx) => {
              const lProg = state.progress.grammar.lessons[lesson.id] || { score: 0, completed: false };
              return (
                <div key={lesson.id} className="card" style={{ cursor: 'pointer' }} onClick={() => { setActiveLesson(idx); setExerciseMode(false); }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                    <span style={{ fontSize: '2rem' }}>{lesson.icon}</span>
                    <div>
                      <h4 style={{ color: 'var(--text-primary)' }}>{lesson.title}</h4>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>{lesson.titleEn}</span>
                    </div>
                    <span className={`tag ${getLevelTag(lesson.level)}`} style={{ marginLeft: 'auto' }}>{lesson.level}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <div className="skill-progress" style={{ flex: 1 }}>
                      <div className="skill-progress-fill" style={{ width: lProg.completed ? '100%' : '0%', background: 'var(--gradient-success)' }}></div>
                    </div>
                    {lProg.completed
                      ? <span className="tag tag-green">✓ {lProg.score}/{lesson.exercises.length}</span>
                      : <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Not started</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Grammar Tips */}
          <div className="card" style={{ marginTop: 'var(--space-xl)' }}>
            <div className="card-header">
              <h3 className="card-title">💡 TEF/TCF Grammar Tips</h3>
            </div>
            <div className="tips-list">
              {tips.map((tip, i) => (
                <div key={i} className="tip-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-xs)' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>{tip.title}</strong>
                    <span className={`tag ${getLevelTag(tip.level)}`}>{tip.level}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>{tip.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Lesson Detail View
  return (
    <>
      <TopBar title={currentLesson.title} subtitle={currentLesson.titleEn} />
      <div className="content-area">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
          <button className="btn btn-ghost" onClick={() => setActiveLesson(null)}>← Back</button>
          <h3 style={{ fontFamily: 'var(--font-display)' }}>{currentLesson.icon} {currentLesson.title}</h3>
          <span className="tag tag-blue" style={{ marginLeft: 'auto' }}>
            {exerciseMode ? (showResult ? 'Complete' : `${qIndex + 1}/${currentLesson.exercises.length}`) : 'Theory'}
          </span>
        </div>

        {!exerciseMode ? (
          /* Theory View */
          <div className="card">
            <div className="grammar-theory" dangerouslySetInnerHTML={{ __html: renderTheory(currentLesson.theory) }}></div>
            {currentLesson.examples && (
              <div style={{ marginTop: 'var(--space-lg)', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: 'var(--space-sm) var(--space-md)', textAlign: 'left', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>French</th>
                      <th style={{ padding: 'var(--space-sm) var(--space-md)', textAlign: 'left', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>English</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentLesson.examples.map((ex, i) => (
                      <tr key={i}>
                        <td style={{ padding: 'var(--space-sm) var(--space-md)', borderBottom: '1px solid var(--glass-border)', color: 'var(--accent-primary)', fontWeight: 600 }}>{ex.fr}</td>
                        <td style={{ padding: 'var(--space-sm) var(--space-md)', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>{ex.en}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-lg)' }}>
              <button className="btn btn-primary" onClick={handleStartExercise}>Start Exercises →</button>
            </div>
          </div>
        ) : showResult ? (
          /* Results View */
          <div className="card">
            <div className="score-display">
              <div className="score-number">{score}/{currentLesson.exercises.length}</div>
              <div className="score-label">{currentLesson.title}</div>
              <p style={{ color: 'var(--text-secondary)', margin: 'var(--space-md) 0' }}>
                {score === currentLesson.exercises.length ? '🎉 Perfect! You\'ve mastered this topic!' :
                 score >= currentLesson.exercises.length * 0.7 ? '👏 Well done! Review any mistakes.' :
                 '📚 Keep studying! Review the theory and try again.'}
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={handleStartExercise}>🔄 Retry</button>
                <button className="btn btn-secondary" onClick={() => setExerciseMode(false)}>📖 Review Theory</button>
                <button className="btn btn-secondary" onClick={() => setActiveLesson(null)}>← All Lessons</button>
              </div>
            </div>
          </div>
        ) : (
          /* Exercise View */
          <div className="card">
            <p style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-lg)', lineHeight: 1.8 }}>{currentLesson.exercises[qIndex].question}</p>
            <div className="quiz-options">
              {currentLesson.exercises[qIndex].options.map((opt, i) => {
                let cls = 'quiz-option';
                if (answered && i === currentLesson.exercises[qIndex].answer) cls += ' correct';
                else if (answered && i === selectedAnswer && i !== currentLesson.exercises[qIndex].answer) cls += ' incorrect';
                return (
                  <div key={i} className={cls} onClick={() => handleAnswer(i)} style={{ cursor: answered ? 'default' : 'pointer' }}>
                    <span className="quiz-option-letter">{String.fromCharCode(65 + i)}</span>
                    <span>{opt}</span>
                  </div>
                );
              })}
            </div>
            {answered && (
              <div style={{ marginTop: 'var(--space-lg)', padding: 'var(--space-md)', background: selectedAnswer === currentLesson.exercises[qIndex].answer ? 'var(--color-success-bg)' : 'var(--color-error-bg)', borderRadius: 'var(--radius-sm)' }}>
                <p style={{ color: selectedAnswer === currentLesson.exercises[qIndex].answer ? 'var(--color-success)' : 'var(--color-error)', fontWeight: 600, marginBottom: 4 }}>
                  {selectedAnswer === currentLesson.exercises[qIndex].answer ? '✅ Correct!' : '❌ Incorrect'}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>{currentLesson.exercises[qIndex].explanation}</p>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-lg)' }}>
              <div className="skill-progress" style={{ flex: 1, marginRight: 'var(--space-md)' }}>
                <div className="skill-progress-fill" style={{ width: `${(qIndex / currentLesson.exercises.length) * 100}%`, background: 'var(--gradient-primary)' }}></div>
              </div>
              {answered && <button className="btn btn-primary" onClick={handleNext}>Next →</button>}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
