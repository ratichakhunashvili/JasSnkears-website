import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => {
    return localStorage.getItem('jas_admin_token');
  });

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('jas_admin_token', newToken);
    } else {
      localStorage.removeItem('jas_admin_token');
    }
    setTokenState(newToken);
  };

  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
