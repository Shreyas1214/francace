'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';
import { ProgressRing } from '../components/ProgressRing';

export default function Dashboard() {
  const { state, calculateLevel } = useApp();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    calculateLevel();
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bonjour');
    else if (hour < 18) setGreeting('Bon après-midi');
    else setGreeting('Bonsoir');
  }, [calculateLevel]);

  if (!state) return null; // Wait for hydration

  const streak = state.user.streak;
  const minutes = state.user.totalMinutes;
  const cLevel = state.user.clb;
  const exam = state.settings.examType;

  const getProgress = (module) => {
    const data = state.progress[module];
    return data && data.total > 0 ? (data.completed / data.total) * 100 : 0;
  };

  return (
    <>
      <TopBar title="Dashboard" subtitle="Welcome back!" />
      <div className="module-content fade-in">
        <div className="welcome-banner glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>{greeting}, <span className="highlight-text">learner</span>! <span role="img" aria-label="sprout">🌱</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0.5rem 0 1.5rem' }}>
            Level: {state.user.levelLabel} ({state.user.level}) · CLB {state.user.clb} · Target: {exam} Canada
          </p>
          <div className="banner-actions" style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/alphabet" className="btn-primary" style={{ textDecoration: 'none' }}>
              <span className="icon" role="img" aria-label="play">▶</span> Continue Learning
            </Link>
            <Link href="/mock-exam" className="btn-secondary" style={{ textDecoration: 'none' }}>
              <span className="icon" role="img" aria-label="target">🎯</span> Practice Exam
            </Link>
          </div>
        </div>
        
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="stat-card glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div className="stat-icon fire-icon text-glow" style={{ fontSize: '2rem', marginBottom: '0.5rem' }} role="img" aria-label="fire">🔥</div>
            <div className="stat-value" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{streak}</div>
            <div className="stat-label" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Day Streak</div>
          </div>
          <div className="stat-card glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div className="stat-icon" style={{ fontSize: '2rem', marginBottom: '0.5rem' }} role="img" aria-label="timer">⏱️</div>
            <div className="stat-value" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{minutes}</div>
            <div className="stat-label" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Minutes Studied</div>
          </div>
          <div className="stat-card glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div className="stat-icon" style={{ fontSize: '2rem', marginBottom: '0.5rem' }} role="img" aria-label="chart">📊</div>
            <div className="stat-value" style={{ fontSize: '2rem', fontWeight: 'bold' }}>CLB {cLevel}</div>
            <div className="stat-label" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Estimated Level</div>
          </div>
          <div className="stat-card glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div className="stat-icon" style={{ fontSize: '2rem', marginBottom: '0.5rem' }} role="img" aria-label="target">🎯</div>
            <div className="stat-value" style={{ fontSize: '2rem', fontWeight: 'bold' }}>—</div>
            <div className="stat-label" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Set exam date ⚙️</div>
          </div>
        </div>

        <section className="dashboard-section glass-panel" style={{ padding: '2rem' }}>
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
             <h3 className="section-title">Skills Progress</h3>
             <span className="exam-badge" style={{ padding: '0.3rem 0.8rem', background: 'rgba(0,85,164,0.3)', borderRadius: '20px', fontSize: '0.8rem' }}>{exam} Canada</span>
          </div>
          <div className="progress-rings-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', textAlign: 'center' }}>
             <div className="progress-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <ProgressRing progress={getProgress('listening')} color="#0055A4" />
               <div className="progress-item-title" style={{ fontWeight: 'bold', marginTop: '1rem' }}><span role="img" aria-label="headphones">🎧</span> Listening</div>
               <div className="progress-item-subtitle" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Compréhension orale</div>
             </div>
             <div className="progress-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <ProgressRing progress={getProgress('reading')} color="#4ade80" />
               <div className="progress-item-title" style={{ fontWeight: 'bold', marginTop: '1rem' }}><span role="img" aria-label="book">📖</span> Reading</div>
               <div className="progress-item-subtitle" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Compréhension écrite</div>
             </div>
             <div className="progress-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <ProgressRing progress={getProgress('writing')} color="#f59e0b" />
               <div className="progress-item-title" style={{ fontWeight: 'bold', marginTop: '1rem' }}><span role="img" aria-label="writing">✍️</span> Writing</div>
               <div className="progress-item-subtitle" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Expression écrite</div>
             </div>
             <div className="progress-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <ProgressRing progress={getProgress('conversation')} color="#a855f7" />
               <div className="progress-item-title" style={{ fontWeight: 'bold', marginTop: '1rem' }}><span role="img" aria-label="speaking">🗣️</span> Speaking</div>
               <div className="progress-item-subtitle" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Expression orale</div>
             </div>
          </div>
        </section>
      </div>
    </>
  );
}
