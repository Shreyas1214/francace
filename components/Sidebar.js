'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../context/AppContext';

export function Sidebar({ openSettings, mobileOpen, closeMobile }) {
  const pathname = usePathname();
  const { state } = useApp();
  const clb = state?.user?.clb || 1;
  const level = state?.user?.level || 'A1';
  const levelLabel = state?.user?.levelLabel || 'Débutant';
  const icon = state?.user?.levelIcon || '🌱';
  const streak = state?.user?.streak || 0;

  const handleLogout = () => {
    localStorage.removeItem('francace_auth_token');
    localStorage.removeItem('francace_user_state');
    window.location.href = '/login';
  };

  const NavItem = ({ to, iconStr, label, badge }) => {
    const isActive = pathname === to || pathname === `${to}/`;
    return (
      <li>
        <Link href={to} onClick={closeMobile} className={`nav-link ${isActive ? 'active' : ''}`}>
          <span className="nav-icon">{iconStr}</span>
          {label}
          {badge && <span className="badge">{badge}</span>}
        </Link>
      </li>
    );
  };

  return (
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="brand">
          <div className="brand-icon">⚜️</div>
          <div className="brand-text">
            <div className="brand-name">Franç<span style={{ color: 'var(--accent-primary)' }}>Ace</span></div>
            <div className="brand-tagline">TEF/TCF PREP</div>
          </div>
          <span className="maple-leaf" style={{ fontSize: '1.2rem', marginLeft: 'auto' }}>🍁</span>
        </div>
        {mobileOpen && <button className="close-btn mobile-only" onClick={closeMobile} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'white', fontSize: '1.5rem' }}>×</button>}
      </div>

      <div className="user-level-card">
        <div className="user-level-icon">{icon}</div>
        <div className="user-level-info">
          <div className="user-level-title">Current Level</div>
          <div className="user-level-name">{levelLabel} ({level})</div>
        </div>
        <div className="clb-badge">CLB {clb}</div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">MAIN</div>
        <ul>
          <NavItem to="/" iconStr="📊" label="Dashboard" />
        </ul>

        <div className="nav-section">LEARNING PATH</div>
        <ul>
          <NavItem to="/alphabet" iconStr="🔤" label="Alphabet & Phonics" badge="A1" />
          <NavItem to="/vocabulary" iconStr="📚" label="Vocabulary" badge="A1-B2" />
          <NavItem to="/grammar" iconStr="📝" label="Grammar" badge="A2-B2" />
        </ul>

        <div className="nav-section">PRACTICE SKILLS</div>
        <ul>
          <NavItem to="/conversation" iconStr="🗣️" label="AI Conversation" badge="NEW" />
          <NavItem to="/listening" iconStr="🎧" label="Listening" badge="CO" />
          <NavItem to="/reading" iconStr="📖" label="Reading" badge="CE" />
          <NavItem to="/writing" iconStr="✍️" label="Writing" badge="EE" />
        </ul>

        <div className="nav-section">EXAM PREP</div>
        <ul>
          <NavItem to="/mock-exam" iconStr="🎯" label="Mock Exam" badge="TEF/TCF" />
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="streak-indicator">
          <span className="fire-icon">🔥</span>
          <span className="streak-count">{streak} day streak</span>
        </div>
        <button className="settings-btn" onClick={openSettings}>
          <span className="icon">⚙️</span> Settings
        </button>
        <button type="button" onClick={handleLogout} className="settings-btn" style={{ width: '100%', color: 'var(--accent-secondary)' }}>
          <span className="icon">🚪</span> Sign Out
        </button>
      </div>
    </aside>
  );
}
