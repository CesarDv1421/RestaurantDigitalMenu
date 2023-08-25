import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const token = localStorage.getItem('token');
    let rawUserData = localStorage.getItem('userData');

    if(rawUserData){
        try {
            rawUserData = JSON.parse(rawUserData);
        } catch (error) {
            console.log('Error parsing userData', error)
            
        }
    }
    
  const [userToken, setUserToken] = useState(token);
  const [userData, setUserData] = useState(rawUserData);

  const login = ({token, userName, rol}) => {
      const userData = {
          userName: userName,
          rol: rol
      }
      
    setUserToken(token);
    setUserData(userData);
      
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setUserToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ userToken, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
