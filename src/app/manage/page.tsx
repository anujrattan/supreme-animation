'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import LeadManagementPanel from '@/components/LeadManagementPanel';
import LoginForm from '@/components/LoginForm';
import { LogOut, User } from 'lucide-react';

export default function ManagePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ email?: string; name?: string } | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token');

      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      // Verify token by calling get-leads (validates JWT + admin role)
      const leadsEndpoint =
        process.env.NEXT_PUBLIC_GET_LEADS_ENDPOINT ||
        'http://localhost:54321/functions/v1/get-leads';

      const response = await fetch(`${leadsEndpoint}?limit=1&offset=0`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsAuthenticated(true);
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
            setUser(null);
          }
        }
      } else {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = (token: string, userData: { email?: string; name?: string }) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="manage-page-bg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: 'rgba(0,0,0,0.5)' }}>
          <div
            style={{
              width: 40,
              height: 40,
              border: '3px solid rgba(0,0,0,0.1)',
              borderTopColor: '#C41E3A',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        className="manage-page-bg"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          position: 'relative',
          zIndex: 1,
          gap: '2rem',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/Logo04.png"
            alt="Supreme Animation Studio"
            width={180}
            height={54}
            priority
            style={{ height: 48, width: 'auto', maxWidth: 180, objectFit: 'contain' }}
          />
        </Link>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div className="manage-page-bg" style={{ position: 'relative', zIndex: 1 }}>
      {/* Top Bar */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="manage-header"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link href="/" className="manage-logo-link">
            <Image
              src="/Logo04.png"
              alt="Supreme Animation Studio"
              width={160}
              height={48}
              priority
              className="manage-logo"
            />
          </Link>
          <div style={{ height: 24, width: 1, background: 'rgba(0,0,0,0.12)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'rgba(196,30,58,0.1)',
                border: '1px solid rgba(196,30,58,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <User size={20} color="#C41E3A" />
            </div>
            <div>
              <span style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.8rem' }}>Logged in as</span>
              <div style={{ color: '#1a1a1a', fontWeight: 600, fontSize: '0.95rem' }}>
                {user?.name || user?.email || 'Admin'}
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleLogout} className="manage-logout-btn">
          <LogOut size={18} />
          Logout
        </button>
      </motion.header>

      <LeadManagementPanel />
    </div>
  );
}
