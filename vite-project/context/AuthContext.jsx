import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem('token') || null);

  const login = (newToken) => {
    setUserToken(JSON.stringify(newToken));
    localStorage.setItem('token', JSON.stringify(newToken));
  };

  const logout = () => {
    setUserToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ userToken : JSON.parse(userToken), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
