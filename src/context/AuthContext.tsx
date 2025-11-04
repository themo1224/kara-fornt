// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import api, { setAuthToken, attach401Interceptor } from '../services/api';

type User = { id: number; name: string; email: string } | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // in-memory token to reduce direct localStorage reads
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  useEffect(() => {
    setAuthToken(token);
    // attach 401 handler that clears auth
    attach401Interceptor(() => {
      clearAuth();
    });

    // try to load user if token present
    (async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get('/auth/me');
        setUser(res.data);
      } catch {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        setAuthToken(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []); // run once

  async function login(email: string, password: string, remember = true) {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const newToken = res.data.token as string;
      const userData = res.data.user as User;

      setToken(newToken);
      setAuthToken(newToken);
      setUser(userData);

      // if remember, persist token; otherwise keep in memory only
      if (remember) localStorage.setItem('token', newToken);
      else localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignore network errors
    }
    clearAuth();
  }

  function clearAuth() {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    setAuthToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
