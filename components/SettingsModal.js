'use client';
import { useApp } from '../context/AppContext';

export function SettingsModal({ onClose }) {
  const { state, saveState, toggleExamType, resetState } = useApp();

  const handleSpeedChange = (e) => {
    saveState(prev => ({
      ...prev,
      settings: { ...prev.settings, ttsSpeed: parseFloat(e.target.value) }
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ display: 'flex' }}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>⚙️ Settings</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="settings-section">
          <h3>Exam Target</h3>
          <div className="setting-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
            <label>Current Exam Focus:</label>
            <button className="btn-secondary" onClick={toggleExamType}>
              Switch to {state.settings.examType === 'TEF' ? 'TCF' : 'TEF'} Canada
            </button>
          </div>
        </div>
        
        <div className="settings-section" style={{ marginTop: '2rem' }}>
          <h3>Audio (TTS) Settings</h3>
          <div className="setting-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
            <label>Speech Speed ({state.settings.ttsSpeed}x):</label>
            <input 
              type="range" 
              min="0.5" max="1.5" step="0.25" 
              value={state.settings.ttsSpeed} 
              onChange={handleSpeedChange} 
            />
          </div>
        </div>

        <div className="settings-section danger-zone" style={{ marginTop: '2rem', padding: '1rem', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px' }}>
          <h3 style={{ color: 'var(--danger-color)' }}>Danger Zone</h3>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', margin: '1rem 0' }}>Reset all progress, streaks, and saved data. This cannot be undone.</p>
          <button className="btn-danger" onClick={() => {
            if (confirm("Are you sure? This will delete all your progress!")) {
              resetState();
              onClose();
            }
          }}>Factory Reset</button>
        </div>
      </div>
    </div>
  );
}
