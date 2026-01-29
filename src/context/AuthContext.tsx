import React, { useEffect, useState, createContext, useContext } from 'react';
import { authApi } from '../services/api';
import type { User } from '../types/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode; }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('dashboard_user');
    const savedToken = localStorage.getItem('auth_token');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
      }
    }
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authApi.login({ email, password });

      if (response && response.token && response.user) {
        setToken(response.token);
        setUser(response.user);

        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('dashboard_user', JSON.stringify(response.user));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    // Optionally call API logout
    authApi.logout().catch(err => console.error("Logout API failed", err));

    setUser(null);
    setToken(null);
    localStorage.removeItem('dashboard_user');
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}