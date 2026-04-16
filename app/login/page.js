'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      // In a real app we'd validate against the database
      // Here, any valid-looking input simulates a successful login.
      if (email.includes('@') && password.length >= 6) {
        localStorage.setItem('francace_auth_token', 'simulated_token_123');
        // Add a fake user name to local state if missing
        try {
          const stateStr = localStorage.getItem('francace_user_state');
          if (stateStr) {
            const state = JSON.parse(stateStr);
            if (!state.user.name || state.user.name === 'Learner') {
              state.user.name = email.split('@')[0];
              localStorage.setItem('francace_user_state', JSON.stringify(state));
            }
          }
        } catch (err) {}
        
        window.location.href = '/'; // redirect to dashboard
      } else {
        setError('Invalid credentials. Email must be valid and password at least 6 characters.');
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

      <div className="auth-container glass-panel">
        <div className="auth-brand-panel">
          <div className="auth-brand-content">
            <Link href="/" className="auth-brand-logo">
              <span style={{ fontSize: '2rem' }}>⚜️</span>
              <span className="logo-text">Franc<span className="accent">Ace</span></span>
            </Link>
            
            <p className="auth-tagline">
              Master the French language. Unlock your Canadian dream.
            </p>

            <div className="auth-features">
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <div>
                  <h4>CLB-Aligned Curriculum</h4>
                  <p>Content matches TEF/TCF standards</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🤖</span>
                <div>
                  <h4>AI Speaking Partner</h4>
                  <p>Practice real conversational scenarios</p>
                </div>
              </div>
            </div>
            
            <div className="auth-testimonial">
              <p>"Thanks to FrancAce, I achieved CLB 9 and got my Express Entry invitation within 4 months!"</p>
              <span className="testimonial-author">— Sarah M., Ontario</span>
            </div>
          </div>
        </div>
        
        <div className="auth-form-panel">
          <div className="auth-form-header">
            <h2>Welcome back</h2>
            <p>Log in to continue your French journey.</p>
          </div>

          <form onSubmit={handleLogin} className="auth-form">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label htmlFor="password">Password</label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="btn-auth-submit" disabled={loading}>
              {loading ? <span className="spinner"></span> : 'Log In'}
            </button>
            
            {/* Divider */}
            <div className="auth-divider">
              <span>OR</span>
            </div>
            
            <button type="button" className="btn-auth-social">
              <span className="social-icon">G</span>
              Continue with Google
            </button>
          </form>

          <p className="auth-redirect">
            Don't have an account? <Link href="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
