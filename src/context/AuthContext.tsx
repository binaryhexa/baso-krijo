import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
  role: string | null;
  setRole: (role: string | null) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      setRole(savedRole); 
    }
  }, []);

  const isAuthenticated = role !== null;

  return (
    <AuthContext.Provider value={{ role, setRole, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
