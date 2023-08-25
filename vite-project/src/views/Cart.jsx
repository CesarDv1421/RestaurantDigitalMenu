import { useState, useEffect, useContext } from 'react';

//Componentes
import Navbar from '../components/Navbar';
import QuantyEditor from '../components/QuantyEditor';
import CartColumnVariantsNotes from '../components/CartColumnVariantsNotes';
import DeleteCartOrderButton from '../components/DeleteCartOrderButton';
import TotalPriceCard from '../components/TotalPriceCard';

//NextUI
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/react';

//Context ==> Carrito de Compras
import { CartOrdersContext } from '../../context/CartOrdersContext.jsx';

const Cart = () => {
  const { cartOrders } = useContext(CartOrdersContext);
  const [cartOrdersList, setCartOrdersList] = useState(JSON.parse(localStorage.getItem('cartOrders')) || []);

  useEffect(() => {
    const cartOrdersFromLocalStorage = JSON.parse(localStorage.getItem('cartOrders')) || [];
    setCartOrdersList(cartOrdersFromLocalStorage);
  }, []);

  return (
    <div className='flex'>
      <Navbar />
      <div className='w-full h-screen flex flex-col justify-between overflow-hidden'>
        <Table aria-label='CartOrdersList' className='w-full p-5 overflow-auto'>
          <TableHeader>
            <TableColumn>Nombre</TableColumn>
            <TableColumn>Notas / Variantes</TableColumn>
            <TableColumn className='text-center'>Precio</TableColumn>
            <TableColumn className='text-center'>Cantidad</TableColumn>
            <TableColumn className='text-center'>Acciones</TableColumn>
          </TableHeader>
          <TableBody>
            {cartOrdersList &&
              cartOrdersList.map(({ id, name, price, quanty, buttonsValues, extras, typeOfProduct }) => (
                <TableRow key={id}>
                  <TableCell>{name}</TableCell>
                  <TableCell>
                    <CartColumnVariantsNotes typeOfProduct={typeOfProduct}>
                      {typeOfProduct === 'Custom' && <h1 className='mb-2'>Sin:</h1>}

                      {Object.values(buttonsValues)?.map(({ title, ingredient }) => {
                        return (
                          <div key={ingredient}>
                            {typeOfProduct === 'Coffee' && title} {ingredient}
                          </div>
                        );
                      })}

                      {extras.length > 0 && (
                        <>
                          <h1 className='my-2'>Extra de:</h1>
                          {Object.values(extras)?.map(({ ingredient, price }) => {
                            return (
                              <div key={ingredient}>
                                - {ingredient} (+${price})
                              </div>
                            );
                          })}
                        </>
                      )}
                    </CartColumnVariantsNotes>
                  </TableCell>
                  <TableCell className='text-center'>${(price * quanty).toFixed(2)}</TableCell>
                  <TableCell className='flex justify-center'>
                    <QuantyEditor
                      id={id}
                      quanty={quanty}
                      buttonsValues={buttonsValues}
                      extras={extras}
                      setCartOrdersList={setCartOrdersList}
                    />
                  </TableCell>
                  <TableCell className='text-center'>
                    <DeleteCartOrderButton id={id} quanty={quanty} buttonsValues={buttonsValues} extras={extras}>
                      Eliminar
                    </DeleteCartOrderButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className='border-2 border-gray-200 rounded-xl m-5'>
          <TotalPriceCard>{cartOrders.reduce((acc, { price, quanty }) => acc + price * quanty, 0)}</TotalPriceCard>
        </div>
      </div>
    </div>
  );
};

export default Cart;
