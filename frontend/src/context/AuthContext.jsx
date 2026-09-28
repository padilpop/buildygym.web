import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('buildygym_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('buildygym_token') || null);
  const [loading, setLoading] = useState(true);

  // Validate session on app mount if token exists
  useEffect(() => {
    async function verifySession() {
      if (token) {
        try {
          const res = await authApi.me();
          setUser(res.user);
          localStorage.setItem('buildygym_user', JSON.stringify(res.user));
        } catch (err) {
          // Token expired or invalid
          setUser(null);
          setToken(null);
          localStorage.removeItem('buildygym_token');
          localStorage.removeItem('buildygym_user');
        }
      }
      setLoading(false);
    }

    verifySession();
  }, [token]);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem('buildygym_token', res.token);
    localStorage.setItem('buildygym_user', JSON.stringify(res.user));
    return res;
  };

  const logout = async () => {
    try {
      if (token) {
        await authApi.logout();
      }
    } catch (err) {
      // Continue cleanup on error
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('buildygym_token');
      localStorage.removeItem('buildygym_user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
