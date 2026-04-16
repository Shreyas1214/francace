'use client';
import { useApp } from '../context/AppContext';

export function TopBar({ title, subtitle }) {
  const { state, toggleExamType, getOverallProgress } = useApp();
  const examType = state?.settings?.examType || 'TEF';
  const progress = getOverallProgress();

  const handleMenuClick = () => {
    window.dispatchEvent(new Event('toggle-mobile-menu'));
  };

  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <div className="page-context">
          <h2 id="page-title" className="page-title">{title}</h2>
          {subtitle && <p id="page-subtitle" className="page-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="top-bar-right">
        <div className="global-progress">
          <span className="progress-label">Overall Progress</span>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="progress-value">{progress}%</span>
        </div>
        <button className="btn-outline outline-sm" onClick={toggleExamType}>
          {examType} Canada <span className="icon">⇄</span>
        </button>
      </div>
    </header>
  );
}
