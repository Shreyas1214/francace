'use client';
import { useState, useEffect } from 'react';
import { TopBar } from '../../components/TopBar';
import { useTTS } from '../../hooks/useTTS';
import { useApp } from '../../context/AppContext';
import { ALPHABET_DATA } from '../../data/alphabet';

export default function AlphabetPage() {
  const [activeTab, setActiveTab] = useState('standard');
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [quizScore, setQuizScore] = useState(null);
  const { speak } = useTTS();
  const { state, updateProgress } = useApp();

  const handleLetterClick = (item) => {
    setSelectedLetter(item);
    speak(item.letter);
    
    // Mark as mastered if explored
    if (state) {
      const mastered = new Set(state.progress.alphabet.mastered || []);
      if (!mastered.has(item.letter)) {
        mastered.add(item.letter);
        updateProgress('alphabet', {
          mastered: Array.from(mastered),
          completed: mastered.size
        });
      }
    }
  };

  const QuizSection = () => {
    const [qIndex, setQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (option) => {
      if (option === ALPHABET_DATA.quizzes[qIndex].answer) setScore(s => s + 1);
      if (qIndex + 1 < ALPHABET_DATA.quizzes.length) {
        setQIndex(q => q + 1);
      } else {
        setShowResult(true);
        if (score + 1 === ALPHABET_DATA.quizzes.length) {
           updateProgress('alphabet', { completed: 42 }); // Max out alphabet progress
        }
      }
    };

    if (showResult) {
       return (
         <div className="quiz-container glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
            <h3>Quiz Finished! 🎉</h3>
            <p style={{ fontSize: '2rem', margin: '1rem 0' }}>{score} / {ALPHABET_DATA.quizzes.length}</p>
            <button className="btn-primary" onClick={() => { setQIndex(0); setScore(0); setShowResult(false); }}>Try Again</button>
         </div>
       );
    }

    const q = ALPHABET_DATA.quizzes[qIndex];
    return (
      <div className="quiz-container glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3>Question {qIndex + 1} of {ALPHABET_DATA.quizzes.length}</h3>
          <span>Score: {score}</span>
        </div>
        <p className="quiz-question" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>{q.question}</p>
        <div className="quiz-options" style={{ display: 'grid', gap: '1rem' }}>
           {q.options.map((opt, i) => (
             <button key={i} className="quiz-option btn-outline" style={{ display: 'block', width: '100%', textAlign: 'left', padding: '1rem' }} onClick={() => handleAnswer(opt)}>
               {opt}
             </button>
           ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <TopBar title="Alphabet & Phonics" subtitle="Master French sounds" />
      <div className="module-content fade-in">
        
        <div className="toolbar glass-panel" style={{ display: 'flex', gap: '1rem', padding: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button className={`btn-tab ${activeTab === 'standard' ? 'active' : ''}`} onClick={() => setActiveTab('standard')}>🔤 Standard (A-Z)</button>
          <button className={`btn-tab ${activeTab === 'accented' ? 'active' : ''}`} onClick={() => setActiveTab('accented')}>✨ Accented Characters</button>
          <button className={`btn-tab ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>❓ Quiz</button>
        </div>

        {activeTab !== 'quiz' && (
          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
               <h3>French Alphabet</h3>
               <span className="badge" style={{ background: 'rgba(0,170,85,0.2)', color: '#4ade80' }}>
                 {state?.progress.alphabet.completed} / 42 mastered
               </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>Click any letter to hear its French pronunciation. Practice each letter until you feel confident!</p>
            
            <div className="alphabet-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '1rem' }}>
              {ALPHABET_DATA[activeTab].map(item => {
                 const isMastered = state?.progress.alphabet.mastered?.includes(item.letter);
                 return (
                   <button 
                     key={item.letter}
                     className={`letter-tile ${selectedLetter?.letter === item.letter ? 'active' : ''}`}
                     style={{ 
                       padding: '1.5rem 1rem', background: 'rgba(255,255,255,0.05)', 
                       border: `1px solid ${selectedLetter?.letter === item.letter ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)'}`,
                       borderRadius: '12px', cursor: 'pointer', transition: 'all 0.3s',
                       position: 'relative', textAlign: 'center'
                     }}
                     onClick={() => handleLetterClick(item)}
                   >
                     <div style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>{item.letter}</div>
                     <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem' }}>{item.phonetic}</div>
                     {isMastered && <div style={{ position: 'absolute', top: 5, right: 5, fontSize: '0.7rem' }}>✅</div>}
                   </button>
                 );
              })}
            </div>
          </div>
        )}

        {activeTab !== 'quiz' && selectedLetter && (
          <div className="letter-detail-panel glass-panel fade-in" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
             <div style={{ fontSize: '4rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: 'var(--primary-color)' }}>
               {selectedLetter.letter}
             </div>
             <div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                 <h3 style={{ margin: 0 }}>{selectedLetter.name || 'Pronunciation'}</h3>
                 <button className="btn-icon" onClick={() => speak(selectedLetter.letter)} style={{ background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}>🔊</button>
               </div>
               <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0.5rem 0' }}>
                 Phonetic: <strong>{selectedLetter.phonetic}</strong> | IPA: <strong>{selectedLetter.ipa}</strong>
               </p>
               <p style={{ margin: '0.5rem 0' }}>
                 Example: <strong style={{ color: 'white' }}>{selectedLetter.example}</strong> <span style={{ color: 'rgba(255,255,255,0.5)' }}>({selectedLetter.exampleEn})</span>
               </p>
               {selectedLetter.description && <p style={{ fontSize: '0.9rem', color: 'var(--accent-color)' }}>💡 {selectedLetter.description}</p>}
             </div>
          </div>
        )}

        {activeTab === 'quiz' && <QuizSection />}
      </div>
    </>
  );
}
