'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface SignupFormProps {
  onSignupSuccess: (token: string, user: any) => void;
  onSwitchToLogin: () => void;
}

export default function SignupForm({ onSignupSuccess, onSwitchToLogin }: SignupFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Signup failed');
      }

      // If session is returned, store it
      if (data.data.access_token) {
        localStorage.setItem('auth_token', data.data.access_token);
        localStorage.setItem('refresh_token', data.data.refresh_token || '');
        localStorage.setItem('user', JSON.stringify(data.data.user));
        onSignupSuccess(data.data.access_token, data.data.user);
      } else {
        // Email confirmation required
        alert(data.message || 'Account created. Please check your email to confirm your account.');
        onSwitchToLogin();
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err instanceof Error ? err.message : 'Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        backgroundColor: '#080808',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '1.5rem',
        padding: '2.5rem',
        maxWidth: '400px',
        width: '100%'
      }}
    >
      <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
        Create Account
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem', fontSize: '0.95rem' }}>
        Create an admin account to access the lead management panel
      </p>

      {error && (
        <div style={{
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#ef4444',
          marginBottom: '1.5rem',
          fontSize: '0.9rem'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{
            display: 'block',
            color: '#fff',
            fontSize: '0.95rem',
            marginBottom: '0.5rem',
            fontWeight: 500
          }}>
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
            placeholder="Your Name"
            style={{
              width: '100%',
              padding: '0.9rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid rgba(255,255,255,0.15)',
              backgroundColor: '#0b0b0b',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none',
              boxSizing: 'border-box',
              opacity: loading ? 0.6 : 1
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            color: '#fff',
            fontSize: '0.95rem',
            marginBottom: '0.5rem',
            fontWeight: 500
          }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            placeholder="admin@example.com"
            style={{
              width: '100%',
              padding: '0.9rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid rgba(255,255,255,0.15)',
              backgroundColor: '#0b0b0b',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none',
              boxSizing: 'border-box',
              opacity: loading ? 0.6 : 1
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            color: '#fff',
            fontSize: '0.95rem',
            marginBottom: '0.5rem',
            fontWeight: 500
          }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            placeholder="••••••••"
            minLength={8}
            style={{
              width: '100%',
              padding: '0.9rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid rgba(255,255,255,0.15)',
              backgroundColor: '#0b0b0b',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none',
              boxSizing: 'border-box',
              opacity: loading ? 0.6 : 1
            }}
          />
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            Minimum 8 characters
          </p>
        </div>

        <div>
          <label style={{
            display: 'block',
            color: '#fff',
            fontSize: '0.95rem',
            marginBottom: '0.5rem',
            fontWeight: 500
          }}>
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
            placeholder="••••••••"
            minLength={8}
            style={{
              width: '100%',
              padding: '0.9rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid rgba(255,255,255,0.15)',
              backgroundColor: '#0b0b0b',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none',
              boxSizing: 'border-box',
              opacity: loading ? 0.6 : 1
            }}
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={!loading ? { scale: 1.01 } : {}}
          whileTap={!loading ? { scale: 0.98 } : {}}
          style={{
            padding: '1rem 1.5rem',
            borderRadius: '999px',
            border: 'none',
            background: loading ? '#666' : '#C41E3A',
            color: '#000',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            marginTop: '0.5rem'
          }}
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </motion.button>
      </form>

      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <button
          onClick={onSwitchToLogin}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
            fontSize: '0.9rem',
            textDecoration: 'underline'
          }}
        >
          Already have an account? Login
        </button>
      </div>
    </motion.div>
  );
}

