import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  const setToken = (token) => {
    setAuthToken(token);
  };

  const remToken = () => {
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, setToken, remToken }}>
      {children}
    </AuthContext.Provider>
  );
};