import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../api/client';
import { getToken, setToken, clearToken } from '../utils/storage';

interface AuthContextData {
  user: { email: string } | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>({} as any);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    getToken().then(token => {
      if (token) {

        api.get('/users/me').then(res => setUser(res.data));
      }
      setLoading(false);
    });
  }, []);

  async function signIn(email: string, password: string) {
    const res = await api.post('/users/login', { email, password });
    await setToken(res.data.token);
    setUser(res.data.user);
  }

  function signOut() {
    clearToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
