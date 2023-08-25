import { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

//Vistas
import Menu from './views/Menu';
import Auth from './views/Auth';
import Cart from './views/Cart';

//Context
import { AuthContext } from '../context/AuthContext';

function App() {
  const { userToken } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/menu' element={userToken ? <Menu /> : <Navigate to='/auth' />} />
        <Route path='/cart' element={userToken ? <Cart /> : <Navigate to='/auth' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
