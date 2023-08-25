import { createContext, useState } from 'react';

const CartOrdersContext = createContext();

const CartOrdersProvider = ({ children }) => {
  const [cartOrders, setCartOrders] = useState([]); //Almacena en el carrito las ordenes para luego renderizarlo.

  return <CartOrdersContext.Provider value={{ cartOrders, setCartOrders }}>{children}</CartOrdersContext.Provider>;
};

export { CartOrdersContext, CartOrdersProvider };
