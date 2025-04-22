import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../api/auth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check the current login status
  useEffect(() => {
    async function fetchUser() {
      const data = await getCurrentUser();
      if (data && data.username) {
        setUser(data.username);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  return (
      <AuthContext.Provider value={{ user, setUser, loading }}>
        {children}
      </AuthContext.Provider>
  );
}
