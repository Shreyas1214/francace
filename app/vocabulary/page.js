'use client';
import { useState } from 'react';
import { TopBar } from '../../components/TopBar';
import { FlashCard } from '../../components/FlashCard';
import { useTTS } from '../../hooks/useTTS';
import { useApp } from '../../context/AppContext';
import { VOCABULARY_DATA } from '../../data/vocabulary';

export default function VocabularyPage() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const { speak } = useTTS();
  const { state, updateProgress, showToast } = useApp();

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
    setCardIndex(0);
  };

  const handleMarkLearned = (wordId) => {
    if (!state) return;
    const cat = activeCategory;
    const currentList = state.progress.vocabulary.categories[cat] || [];
    if (!currentList.includes(wordId)) {
      const newList = [...currentList, wordId];
      const newTotal = (state.progress.vocabulary.completed || 0) + 1;
      updateProgress('vocabulary', {
        categories: { ...state.progress.vocabulary.categories, [cat]: newList },
        completed: newTotal
      });
      showToast('Word saved to your bank!', 'success');
    }
  };

  const handleNext = () => {
    const total = VOCABULARY_DATA.categories[activeCategory].words.length;
    if (cardIndex < total - 1) setCardIndex(c => c + 1);
  };

  const handlePrev = () => {
    if (cardIndex > 0) setCardIndex(c => c - 1);
  };

  if (!state) return null;

  return (
    <>
      <TopBar title="Vocabulary Builder" subtitle="Expand your word bank" />
      <div className="module-content fade-in">
        
        {!activeCategory ? (
          <div className="glass-panel" style={{ padding: '2rem' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
               <h3>Word Categories</h3>
               <span className="badge" style={{ background: 'rgba(0,85,164,0.2)', color: 'var(--primary-color)' }}>
                 {state.progress.vocabulary.completed} / 200 words learned
               </span>
             </div>
             <div className="vocab-categories" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
               {Object.entries(VOCABULARY_DATA.categories).map(([id, cat]) => {
                 const learnedCount = state.progress.vocabulary.categories[id]?.length || 0;
                 const total = cat.words.length;
                 const progressPct = (learnedCount / total) * 100;
                 return (
                   <button 
                     key={id} className="category-card glass-panel" 
                     style={{ textAlign: 'left', padding: '1.5rem', cursor: 'pointer', transition: 'all 0.3s' }}
                     onClick={() => handleCategoryClick(id)}
                   >
                     <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{cat.icon}</div>
                     <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{cat.title}</h4>
                     <div style={{ padding: '2px 8px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', fontSize: '0.8rem', display: 'inline-block', marginBottom: '1rem' }}>{cat.level}</div>
                     
                     <div className="global-progress" style={{ width: '100%' }}>
                       <div className="progress-bar-bg">
                         <div className="progress-bar-fill" style={{ width: `${progressPct}%` }}></div>
                       </div>
                       <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.3rem', textAlign: 'right' }}>
                         {learnedCount} / {total}
                       </div>
                     </div>
                   </button>
                 );
               })}
             </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
               <button className="btn-icon" onClick={() => setActiveCategory(null)}>← Back</button>
               <h3>{VOCABULARY_DATA.categories[activeCategory].icon} {VOCABULARY_DATA.categories[activeCategory].title}</h3>
               <div className="badge">{cardIndex + 1}/{VOCABULARY_DATA.categories[activeCategory].words.length}</div>
            </div>

            <div style={{ marginBottom: '3rem' }}>
               <FlashCard 
                 word={VOCABULARY_DATA.categories[activeCategory].words[cardIndex].fr}
                 translation={VOCABULARY_DATA.categories[activeCategory].words[cardIndex].en}
                 phonetic={VOCABULARY_DATA.categories[activeCategory].words[cardIndex].phonetic}
                 onMarkLearned={() => handleMarkLearned(VOCABULARY_DATA.categories[activeCategory].words[cardIndex].id)}
                 isLearned={state.progress.vocabulary.categories[activeCategory]?.includes(VOCABULARY_DATA.categories[activeCategory].words[cardIndex].id)}
               />
               <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                 <button className="btn-outline" onClick={handlePrev} disabled={cardIndex === 0}>← Previous</button>
                 <button className="btn-outline" onClick={handleNext} disabled={cardIndex === VOCABULARY_DATA.categories[activeCategory].words.length - 1}>Next →</button>
               </div>
            </div>

            <div className="glass-panel" style={{ padding: '2rem' }}>
               <h4 style={{ marginBottom: '1rem' }}>All Words in "{VOCABULARY_DATA.categories[activeCategory].title}"</h4>
               <div style={{ display: 'grid', gap: '0.5rem' }}>
                 {VOCABULARY_DATA.categories[activeCategory].words.map(w => {
                   const learned = state.progress.vocabulary.categories[activeCategory]?.includes(w.id);
                   return (
                     <div key={w.id} style={{ display: 'flex', alignItems: 'center', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', borderLeft: learned ? '3px solid #4ade80' : '3px solid transparent' }}>
                       <div style={{ width: '150px', fontWeight: 'bold' }}>{w.fr}</div>
                       <button className="btn-icon" style={{ padding: '0 0.5rem', opacity: 0.7 }} onClick={() => speak(w.fr)}>🔊</button>
                       <div style={{ color: 'rgba(255,255,255,0.6)', marginLeft: '1rem' }}>{w.en}</div>
                       {learned && <div style={{ marginLeft: 'auto', color: '#4ade80', fontSize: '0.8rem' }}>✓</div>}
                     </div>
                   );
                 })}
               </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
