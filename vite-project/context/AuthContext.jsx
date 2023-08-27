import { user } from '@nextui-org/react';
import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userInfo, setuUserInfo] = useState(localStorage.getItem('token') || null);

  const login = (token, userInfo) => {
    setuUserInfo(userInfo);
    localStorage.setItem('token', token);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  };

  const logout = () => {
    setuUserInfo(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ userToken: localStorage.getItem('token'), userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
