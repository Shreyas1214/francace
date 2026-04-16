'use client';
import { useState } from 'react';
import { useTTS } from '../hooks/useTTS';

export function FlashCard({ word, translation, phonetic, onMarkLearned, isLearned }) {
  const [flipped, setFlipped] = useState(false);
  const { speak } = useTTS();

  return (
    <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)} style={{ perspective: '1000px', width: '100%', maxWidth: '400px', height: '250px', cursor: 'pointer', margin: '0 auto' }}>
      <div className="flashcard-inner" style={{ position: 'relative', width: '100%', height: '100%', transition: 'transform 0.6s', transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'none' }}>
        
        {/* Front */}
        <div className="flashcard-front glass-panel" style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{word}</h2>
          <div style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1rem', fontStyle: 'italic' }}>[{phonetic}]</div>
          <button 
             className="btn-icon" 
             onClick={(e) => { e.stopPropagation(); speak(word); }}
             style={{ background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px' }}
          >🔊</button>
          <div style={{ position: 'absolute', bottom: '1rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>Tap to reveal translation</div>
        </div>

        {/* Back */}
        <div className="flashcard-back glass-panel" style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', transform: 'rotateY(180deg)', background: 'linear-gradient(145deg, rgba(30,41,59,0.9), rgba(15,23,42,0.9))', border: '1px solid var(--primary-color)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>{translation}</h2>
          <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
             <button 
               className="btn-success" 
               onClick={(e) => { e.stopPropagation(); onMarkLearned(); setFlipped(false); }}
               disabled={isLearned}
             >
               {isLearned ? '✓ Learned' : '✓ Mark Learned'}
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}
