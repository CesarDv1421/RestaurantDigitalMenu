import { useEffect, useContext } from 'react';

// Componentes
import SetQuanty from './SetQuanty';

// Context => Carrito de Compras
import { CartOrdersContext } from '../../context/CartOrdersContext';

// Custom Hooks
import useCartOrders from '../../hooks/useCartOrders';

const QuantyEditor = ({ id, quanty, buttonsValues, extras, setCartOrdersList }) => {
  const { cartOrders } = useContext(CartOrdersContext);
  const { newQuanty, setNewQuanty } = useCartOrders(id, quanty, buttonsValues, extras);

  useEffect(() => {
    localStorage.setItem('cartOrders', JSON.stringify(cartOrders));
    setCartOrdersList(cartOrders); // Actualizar la lista en el componente Cart
  }, [newQuanty, cartOrders, setCartOrdersList]);

  return <SetQuanty quanty={newQuanty} setQuanty={setNewQuanty} />;
};

export default QuantyEditor;
