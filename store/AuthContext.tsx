import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isWorker: boolean;
  setIsWorker: (v: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isWorker: false,
  setIsWorker: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isWorker, setIsWorker] = useState(false);

  useEffect(() => {
    // Restore worker session if token exists
    AsyncStorage.getItem('authtoken').then(token => {
      if (token) setIsWorker(true);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isWorker, setIsWorker }}>
      {children}
    </AuthContext.Provider>
  );
}
