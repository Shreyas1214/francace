'use client';
import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { SettingsModal } from './SettingsModal';
import { Toast } from './Toast';
import { AppProvider } from '../context/AppContext';

export function LayoutShell({ children }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setMobileOpen(prev => !prev);
    window.addEventListener('toggle-mobile-menu', handleToggle);
    return () => window.removeEventListener('toggle-mobile-menu', handleToggle);
  }, []);

  return (
    <AppProvider>
      <div className="app-container">
        {/* Mobile Header */}
        <header className="mobile-header">
           <button className="icon-btn mobile-menu-toggle" onClick={() => setMobileOpen(true)} style={{ background: 'none', border: 'none', color: 'white', padding: '0.5rem' }}>
             <span style={{ fontSize: '1.5rem' }}>☰</span>
           </button>
           <div className="brand" style={{ marginLeft: '1rem', textDecoration: 'none' }}>
              <div className="brand-name">Franç<span style={{ color: 'var(--accent-primary)' }}>Ace</span></div>
           </div>
        </header>

        <Sidebar 
          openSettings={() => setSettingsOpen(true)} 
          mobileOpen={mobileOpen} 
          closeMobile={() => setMobileOpen(false)} 
        />
        
        <main className="main-content">
          {children}
        </main>

        {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}
        <Toast />
      </div>
    </AppProvider>
  );
}
