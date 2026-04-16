'use client';
import { useState, useEffect } from 'react';
import { TopBar } from '../../components/TopBar';
import { useTTS } from '../../hooks/useTTS';
import { useTimer } from '../../hooks/useTimer';
import { useApp } from '../../context/AppContext';
import { EXERCISES_DATA } from '../../data/exercises';

export default function MockExamPage() {
  const [examState, setExamState] = useState('menu'); // 'menu', 'running', 'results'
  const [examType, setExamType] = useState('TEF');
  const [currentSection, setCurrentSection] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  const { state, updateProgress, calculateLevel } = useApp();
  const { speak, stop } = useTTS();

  const handleTimeUp = () => {
    alert("Time's up for this section!");
    handleNextSection();
  };

  const { timeLeft, start, stop: stopTimer, formatTime } = useTimer(0, handleTimeUp);

  const sectionsConfig = [
    { id: 'co', name: 'Compréhension orale', timeLimit: 2400, questions: [
        { script: 'Bonjour, je voudrais un billet pour Montréal.', question: 'Que veut la personne?', answer: 'Un billet', options: ['Un billet', 'Une pomme', 'Un café', 'Un taxi'] },
        { script: 'La réunion est reportée à demain matin.', question: 'Quand aura lieu la réunion?', answer: 'Demain', options: ['Aujourd\'hui', 'Demain', 'La semaine prochaine', 'Jamais'] }
    ]},
    { id: 'ce', name: 'Compréhension écrite', timeLimit: 3600, questions: [
        { text: 'Le train à destination de Paris partira voie 4 à 18h précise.', question: 'A quelle heure part le train?', answer: '18h', options: ['18h', '19h', '14h', '17h'] },
        { text: 'Suite à des travaux, la piscine sera fermée du 12 au 15 juin.', question: 'Pourquoi la piscine est-elle fermée?', answer: 'Des travaux', options: ['Un jour férié', 'Des travaux', 'Une compétition', 'Une grève'] }
    ]}
  ];

  const currentSectionData = examState === 'running' ? sectionsConfig[currentSection] : null;

  const handleStartExam = (type) => {
    setExamType(type);
    setExamState('running');
    setCurrentSection(0);
    setQIndex(0);
    setAnswers({});
    start(sectionsConfig[0].timeLimit);
  };

  const handleAnswer = (val) => {
    setAnswers(prev => ({ ...prev, [`${currentSection}-${qIndex}`]: val }));
    
    if (qIndex + 1 < currentSectionData.questions.length) {
      setQIndex(q => q + 1);
    } else {
      handleNextSection();
    }
  };

  const handleNextSection = () => {
    stop(); // stop TTS
    if (currentSection + 1 < sectionsConfig.length) {
      setCurrentSection(c => c + 1);
      setQIndex(0);
      start(sectionsConfig[currentSection + 1].timeLimit);
    } else {
      finishExam();
    }
  };

  const finishExam = () => {
    stopTimer();
    stop();
    
    // Calculate Score
    let totalCorrect = 0;
    let totalQuestions = 0;
    const sectionScores = {};

    sectionsConfig.forEach((sec, sIdx) => {
      let secCorrect = 0;
      sec.questions.forEach((q, qIdx) => {
        totalQuestions++;
        const ans = answers[`${sIdx}-${qIdx}`];
        if (ans === q.answer) secCorrect++;
      });
      totalCorrect += secCorrect;
      sectionScores[sec.id] = { correct: secCorrect, total: sec.questions.length };
    });

    const percent = Math.round((totalCorrect / Math.max(totalQuestions, 1)) * 100);
    const estimatedCLB = Math.min(10, Math.floor(percent / 10) + 1);

    setResults({ percent, totalCorrect, totalQuestions, sectionScores, estimatedCLB, timestamp: new Date().toISOString() });
    setExamState('results');

    if (state) {
      const best = Math.max(state.progress.mockExam.bestCLB || 0, estimatedCLB);
      updateProgress('mockExam', {
         bestCLB: best,
         attempts: [...(state.progress.mockExam.attempts || []), { type: examType, score: percent, clb: estimatedCLB, date: new Date().toISOString() }]
      });
      calculateLevel();
    }
  };

  if (!state) return null;

  return (
    <>
      <TopBar title="Mock Exam Simulation" subtitle="Evaluer votre niveau" />
      <div className="module-content fade-in">
        
        {examState === 'menu' && (
          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
             <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Full Exam Simulation</h3>
             <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>Take a full-length simulated exam to estimate your CLB level. The exam is strictly timed, just like the real test.</p>
             
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
               <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', border: '1px solid var(--primary-color)' }}>
                 <h2 style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>TEF Canada</h2>
                 <p style={{ minHeight: '80px', color: 'rgba(255,255,255,0.8)' }}>Compréhension orale (40 min)<br/>Compréhension écrite (60 min)</p>
                 <button className="btn-primary" style={{ width: '100%', padding: '1rem' }} onClick={() => handleStartExam('TEF')}>Start TEF Simulation</button>
               </div>
               
               <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', border: '1px solid #4ade80' }}>
                 <h2 style={{ fontSize: '2rem', color: '#4ade80', marginBottom: '1rem' }}>TCF Canada</h2>
                 <p style={{ minHeight: '80px', color: 'rgba(255,255,255,0.8)' }}>Compréhension orale (35 min)<br/>Compréhension écrite (60 min)</p>
                 <button className="btn-primary" style={{ background: '#4ade80', width: '100%', padding: '1rem' }} onClick={() => handleStartExam('TCF')}>Start TCF Simulation</button>
               </div>
             </div>

             {state.progress.mockExam.attempts && state.progress.mockExam.attempts.length > 0 && (
               <div style={{ marginTop: '3rem' }}>
                 <h3 style={{ marginBottom: '1rem' }}>Past Attempts</h3>
                 <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead style={{ background: 'rgba(255,255,255,0.1)' }}>
                        <tr>
                          <th style={{ padding: '1rem' }}>Date</th>
                          <th style={{ padding: '1rem' }}>Exam Type</th>
                          <th style={{ padding: '1rem' }}>Score</th>
                          <th style={{ padding: '1rem' }}>Estimated Level</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.progress.mockExam.attempts.map((a, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '1rem' }}>{new Date(a.date).toLocaleDateString()}</td>
                            <td style={{ padding: '1rem' }}><span className="badge">{a.type}</span></td>
                            <td style={{ padding: '1rem' }}>{a.score}%</td>
                            <td style={{ padding: '1rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>CLB {a.clb}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                 </div>
               </div>
             )}
          </div>
        )}

        {examState === 'running' && currentSectionData && (
          <div className="glass-panel" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'linear-gradient(90deg, rgba(30,41,59,1), rgba(15,23,42,1))' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{examType} Simulation — {currentSectionData.name} ({currentSection + 1}/{sectionsConfig.length})</h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Q {qIndex + 1}/{currentSectionData.questions.length}</span>
                <div className="badge timer" style={{ background: '#ef4444', color: 'white', fontSize: '1.2rem', padding: '0.5rem 1rem' }}>
                   ⏱️ {formatTime()}
                </div>
              </div>
            </div>
            
            <div style={{ padding: '2rem', flex: 1, position: 'relative' }}>
              <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px' }}>
                
                {currentSectionData.id === 'co' && (
                  <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                     <button className="btn-secondary" onClick={() => speak(currentSectionData.questions[qIndex].script)}>
                       ▶ Play Audio Once
                     </button>
                  </div>
                )}

                {currentSectionData.id === 'ce' && currentSectionData.questions[qIndex].text && (
                  <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: '8px', borderLeft: '3px solid var(--primary-color)' }}>
                     <p style={{ lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{currentSectionData.questions[qIndex].text}</p>
                  </div>
                )}

                <h3 style={{ fontSize: '1.3rem', marginBottom: '2rem' }}>{currentSectionData.questions[qIndex].question}</h3>
                
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {currentSectionData.questions[qIndex].options.map((opt, i) => (
                    <button key={i} className="quiz-option btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem', textAlign: 'left' }} onClick={() => handleAnswer(opt)}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>{String.fromCharCode(65 + i)}</div>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {examState === 'results' && results && (
          <div className="glass-panel fade-in" style={{ padding: '3rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Simulation Complete! 🎉</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', marginBottom: '3rem' }}>Here are your estimated results for the {examType} Canada.</p>
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4rem', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '150px', height: '150px', borderRadius: '50%', border: '8px solid var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 'bold' }}>
                  {results.percent}%
                </div>
                <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>Total Score</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '150px', height: '150px', borderRadius: '50%', border: '8px solid #4ade80', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: '1.2rem' }}>CLB</div>
                  <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{results.estimatedCLB}</div>
                </div>
                <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>Estimated Level</div>
              </div>
            </div>

            <div style={{ maxWidth: '600px', margin: '0 auto', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '2rem', textAlign: 'left' }}>
               <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Section Breakdown</h3>
               {Object.entries(results.sectionScores).map(([id, s]) => {
                 const name = id === 'co' ? 'Compréhension orale (Listening)' : 'Compréhension écrite (Reading)';
                 return (
                   <div key={id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 0', borderBottom: '1px dashed rgba(255,255,255,0.05)' }}>
                     <span>{name}</span>
                     <strong>{s.correct} / {s.total}</strong>
                   </div>
                 );
               })}
            </div>

            <button className="btn-primary" style={{ marginTop: '3rem', padding: '1rem 3rem' }} onClick={() => setExamState('menu')}>Return to Dashboard</button>
          </div>
        )}
      </div>
    </>
  );
}
