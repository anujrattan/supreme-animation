'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Sparkles } from 'lucide-react';

interface LoginFormProps {
  onLoginSuccess: (token: string, user: any) => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const loginEndpoint =
        process.env.NEXT_PUBLIC_ADMIN_LOGIN_ENDPOINT ||
        'http://localhost:54321/functions/v1/admin-login';

      const response = await fetch(loginEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.data.access_token) {
        localStorage.setItem('auth_token', data.data.access_token);
        localStorage.setItem('refresh_token', data.data.refresh_token || '');
        localStorage.setItem('user', JSON.stringify(data.data.user));
        onLoginSuccess(data.data.access_token, data.data.user);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="manage-login-card"
    >
      {/* Accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, #C41E3A 0%, #e63950 50%, #C41E3A 100%)',
          borderRadius: '1.5rem 1.5rem 0 0',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'rgba(196,30,58,0.1)',
            border: '1px solid rgba(196,30,58,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Lock size={22} color="#C41E3A" strokeWidth={2} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1a1a1a', margin: 0, letterSpacing: '-0.02em' }}>
            Admin Portal
          </h2>
          <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.875rem', margin: 0 }}>
            Sign in to manage leads
          </p>
        </div>
      </div>

      <p style={{ color: 'rgba(0,0,0,0.6)', marginBottom: '1.75rem', fontSize: '0.95rem', lineHeight: 1.5 }}>
        Access the lead management dashboard for Supreme Animation Studio
      </p>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '0.875rem 1rem',
            borderRadius: 12,
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#dc2626',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{ fontSize: '1rem' }}>⚠</span>
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#374151',
            fontSize: '0.9rem',
            marginBottom: '0.5rem',
            fontWeight: 500,
          }}>
            <Mail size={16} color="rgba(0,0,0,0.5)" />
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            placeholder="admin@supreme.com"
            className="manage-input"
          />
        </div>

        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#374151',
            fontSize: '0.9rem',
            marginBottom: '0.5rem',
            fontWeight: 500,
          }}>
            <Lock size={16} color="rgba(0,0,0,0.5)" />
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
            className="manage-input"
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={!loading ? { scale: 1.01 } : {}}
          whileTap={!loading ? { scale: 0.99 } : {}}
          className="manage-btn-primary"
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{ display: 'inline-block', width: 18, height: 18, border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#000', borderRadius: '50%' }}
              />
              Signing in...
            </span>
          ) : (
            <>
              <Sparkles size={18} />
              Sign In
            </>
          )}
        </motion.button>
      </form>

    </motion.div>
  );
}
