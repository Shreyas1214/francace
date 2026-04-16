'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const calculateStrength = (password) => {
    let strength = 0;
    if (password.length > 7) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = calculateStrength(formData.password);

  const getStrengthLabel = () => {
    if (formData.password.length === 0) return '';
    if (strength <= 1) return 'Weak';
    if (strength === 2) return 'Fair';
    if (strength === 3) return 'Good';
    return 'Strong';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      if (formData.email.includes('@') && formData.password.length > 5 && formData.name) {
        localStorage.setItem('francace_auth_token', 'simulated_token_123');
        // Add user info
        try {
          const stateStr = localStorage.getItem('francace_user_state') || '{}';
          const state = JSON.parse(stateStr);
          if(!state.user) state.user = {};
          state.user.name = formData.name;
          state.user.email = formData.email;
          localStorage.setItem('francace_user_state', JSON.stringify(state));
        } catch (err) {}
        
        window.location.href = '/';
      } else {
        setError('Please check your inputs.');
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="auth-page">
      {/* Background Orbs */}
      <div className="auth-orb auth-orb-1"></div>
      <div className="auth-orb auth-orb-2"></div>
      <div className="auth-orb auth-orb-3"></div>

      <div className="auth-container glass-panel" style={{ flexDirection: 'row-reverse' }}>
        <div className="auth-brand-panel" style={{ borderRight: 'none', borderLeft: '1px solid var(--glass-border)' }}>
          <div className="auth-brand-content">
            <Link href="/" className="auth-brand-logo">
              <span style={{ fontSize: '2rem' }}>⚜️</span>
              <span className="logo-text">Franc<span className="accent">Ace</span></span>
            </Link>
            
            <p className="auth-tagline">
              Join thousands of candidates passing their TEF/TCF exams.
            </p>

            <div className="auth-stats-row">
              <div className="stat-box">
                <span className="stat-value">92%</span>
                <span className="stat-label">Pass Rate</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">50k+</span>
                <span className="stat-label">Learners</span>
              </div>
            </div>
            
            <div className="auth-features" style={{ marginTop: '2rem' }}>
              <div className="feature-item">
                <span className="feature-icon">📈</span>
                <div>
                  <h4>Real-time Progress</h4>
                  <p>Track your implied CLB score</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎧</span>
                <div>
                  <h4>Native Audio</h4>
                  <p>Practice with Quebecois & French accents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="auth-form-panel">
          <div className="auth-form-header">
            <h2>Create Account</h2>
            <p>Start your customized TEF/TCF learning plan.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Jean Dupont" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <span className="input-icon">✉️</span>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="vous@exemple.com" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
              
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bars">
                    <div className={`strength-bar ${strength >= 1 ? 'active var-weak' : ''}`}></div>
                    <div className={`strength-bar ${strength >= 2 ? 'active var-fair' : ''}`}></div>
                    <div className={`strength-bar ${strength >= 3 ? 'active var-good' : ''}`}></div>
                    <div className={`strength-bar ${strength >= 4 ? 'active var-strong' : ''}`}></div>
                  </div>
                  <span className="strength-label">{getStrengthLabel()}</span>
                </div>
              )}
            </div>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="btn-auth-submit" disabled={loading}>
              {loading ? <span className="spinner"></span> : 'Create Account'}
            </button>
          </form>

          <p className="auth-redirect">
            Already have an account? <Link href="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
