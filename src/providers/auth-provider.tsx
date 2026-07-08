'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '@/services/authService';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loginGlobal: (token: string, userData: unknown) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;

  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function normalizeUser(userData: unknown): User | null {
  if (!isRecord(userData)) return null;

  const id =
    getNumber(userData.id) ??
    getNumber(userData.userId) ??
    getNumber(userData.usuarioId) ??
    getNumber(userData.sub);

  if (id === null) {
    return null;
  }

  return {
    id,
    name: getString(userData.name) || getString(userData.nome),
    email: getString(userData.email),
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return !!localStorage.getItem('token');
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    authService
      .getMe()
      .then((res) => {
        const payload = isRecord(res.data) && 'user' in res.data ? res.data.user : res.data;
        const normalizedUser = normalizeUser(payload);

        console.log('[AuthProvider] getMe raw', res.data);
        console.log('[AuthProvider] getMe normalized', normalizedUser);

        setUser(normalizedUser);
      })
      .catch((error) => {
        console.error('[AuthProvider] erro no getMe', error);
        localStorage.removeItem('token');
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const loginGlobal = (token: string, userData: unknown) => {
    const normalizedUser = normalizeUser(userData);

    console.log('[AuthProvider] login raw', userData);
    console.log('[AuthProvider] login normalized', normalizedUser);

    localStorage.setItem('token', token);
    setUser(normalizedUser);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loginGlobal, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
};