'use client';

import { useActionState } from 'react';
import { login } from '@/app/actions/auth';
import Link from 'next/link';

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="auth-page">
      <div className="auth-ambient-bg">
        <div className="auth-orb auth-orb-1"></div>
        <div className="auth-orb auth-orb-2"></div>
        <div className="auth-orb auth-orb-3"></div>
      </div>

      <div className="auth-container">
        {/* Left Panel — Branding */}
        <div className="auth-brand-panel">
          <div className="auth-brand-content">
            <div className="auth-brand-logo">
              <span className="auth-flag" role="img" aria-label="French flag">🇫🇷</span>
              <span className="auth-brand-name">FrançAce</span>
              <span className="auth-maple" role="img" aria-label="maple leaf">🍁</span>
            </div>
            <p className="auth-tagline">Ace your French. Unlock Canada.</p>
            
            <div className="auth-features">
              <div className="auth-feature-item">
                <span className="auth-feature-icon">🎧</span>
                <div>
                  <h4>TEF & TCF Preparation</h4>
                  <p>Complete exam preparation for both official French proficiency tests</p>
                </div>
              </div>
              <div className="auth-feature-item">
                <span className="auth-feature-icon">🤖</span>
                <div>
                  <h4>AI Conversation Partner</h4>
                  <p>Practice speaking with an intelligent conversation partner</p>
                </div>
              </div>
              <div className="auth-feature-item">
                <span className="auth-feature-icon">📊</span>
                <div>
                  <h4>CLB Level Tracking</h4>
                  <p>Track your progress towards your target CLB level</p>
                </div>
              </div>
            </div>

            <div className="auth-stats-row">
              <div className="auth-stat">
                <span className="auth-stat-number">4</span>
                <span className="auth-stat-label">Core Skills</span>
              </div>
              <div className="auth-stat">
                <span className="auth-stat-number">A1–C2</span>
                <span className="auth-stat-label">All Levels</span>
              </div>
              <div className="auth-stat">
                <span className="auth-stat-number">CLB 10</span>
                <span className="auth-stat-label">Max Score</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel — Login Form */}
        <div className="auth-form-panel">
          <div className="auth-form-wrapper">
            <div className="auth-form-header">
              <h1>Welcome Back</h1>
              <p>Sign in to continue your French journey</p>
            </div>

            <form action={action} className="auth-form">
              <div className="auth-field">
                <label htmlFor="email">Email Address</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">✉️</span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
                {state?.errors?.email && (
                  <div className="auth-error">
                    {state.errors.email.map((error, i) => (
                      <p key={i}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="auth-field">
                <label htmlFor="password">Password</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">🔒</span>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />
                </div>
                {state?.errors?.password && (
                  <div className="auth-error">
                    {state.errors.password.map((error, i) => (
                      <p key={i}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              {state?.message && (
                <div className="auth-error auth-error-general">
                  <p>{state.message}</p>
                </div>
              )}

              <button type="submit" className="auth-submit-btn" disabled={pending}>
                {pending ? (
                  <>
                    <span className="auth-spinner"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <span className="auth-btn-arrow">→</span>
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <p className="auth-switch">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="auth-switch-link">
                Create one free
              </Link>
            </p>

            <p className="auth-footer-text">
              <span role="img" aria-label="shield">🛡️</span> Your data is encrypted and secure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
