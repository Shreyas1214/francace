'use client';

import { useActionState, useState } from 'react';
import { signup } from '@/app/actions/auth';
import Link from 'next/link';

export default function SignupPage() {
  const [state, action, pending] = useActionState(signup, undefined);
  const [passwordValue, setPasswordValue] = useState('');

  const checks = {
    length: passwordValue.length >= 8,
    letter: /[a-zA-Z]/.test(passwordValue),
    number: /[0-9]/.test(passwordValue),
  };

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
                <span className="auth-feature-icon">🎯</span>
                <div>
                  <h4>Adaptive Learning</h4>
                  <p>Personalized pathways from A1 beginner to C2 mastery</p>
                </div>
              </div>
              <div className="auth-feature-item">
                <span className="auth-feature-icon">📝</span>
                <div>
                  <h4>Mock Exams</h4>
                  <p>Realistic simulations replicating actual TEF &amp; TCF conditions</p>
                </div>
              </div>
              <div className="auth-feature-item">
                <span className="auth-feature-icon">🔊</span>
                <div>
                  <h4>French TTS</h4>
                  <p>Hear native French pronunciation for every word and sentence</p>
                </div>
              </div>
            </div>

            <div className="auth-testimonial">
              <p>&ldquo;FrançAce helped me go from zero French to CLB 7 in 4 months. The mock exams were incredibly realistic.&rdquo;</p>
              <div className="auth-testimonial-author">
                <span className="auth-testimonial-avatar">👩‍💻</span>
                <div>
                  <strong>Priya S.</strong>
                  <span>Express Entry Applicant</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel — Signup Form */}
        <div className="auth-form-panel">
          <div className="auth-form-wrapper">
            <div className="auth-form-header">
              <h1>Create Account</h1>
              <p>Start your path to TEF/TCF success</p>
            </div>

            <form action={action} className="auth-form">
              <div className="auth-field">
                <label htmlFor="name">Full Name</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">👤</span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    autoComplete="name"
                    required
                  />
                </div>
                {state?.errors?.name && (
                  <div className="auth-error">
                    {state.errors.name.map((error, i) => (
                      <p key={i}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

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
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    required
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                  />
                </div>
                {state?.errors?.password && (
                  <div className="auth-error">
                    {state.errors.password.map((error, i) => (
                      <p key={i}>{error}</p>
                    ))}
                  </div>
                )}
                {passwordValue.length > 0 && (
                  <div className="auth-password-checks">
                    <div className={`auth-check ${checks.length ? 'pass' : ''}`}>
                      <span>{checks.length ? '✓' : '○'}</span> At least 8 characters
                    </div>
                    <div className={`auth-check ${checks.letter ? 'pass' : ''}`}>
                      <span>{checks.letter ? '✓' : '○'}</span> Contains a letter
                    </div>
                    <div className={`auth-check ${checks.number ? 'pass' : ''}`}>
                      <span>{checks.number ? '✓' : '○'}</span> Contains a number
                    </div>
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
                    Creating account...
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <span className="auth-btn-arrow">→</span>
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <p className="auth-switch">
              Already have an account?{' '}
              <Link href="/login" className="auth-switch-link">
                Sign in
              </Link>
            </p>

            <p className="auth-footer-text">
              <span role="img" aria-label="sparkle">✨</span> Free forever — no credit card required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
