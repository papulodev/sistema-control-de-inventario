import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../index';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      async (event, session) => {
        if (session?.user === null) {
          setUser(null);
        } else {
          setUser(session?.user);
        }
      }
    });

    return () => {
      authListener.subscription;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('UserAuth must be used within an AuthContextProvider');
  }
  return context;
}