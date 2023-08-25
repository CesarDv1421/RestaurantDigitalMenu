//Componentes
import SetQuanty from './SetQuanty';
import DeleteCartOrderButton from './DeleteCartOrderButton';

//Custom Hooks
import useCartOrders from '../../hooks/useCartOrders';

//Next UI
import { Popover, PopoverTrigger, PopoverContent, Button } from '@nextui-org/react'; //Componenetes necesarios para funcionamiento del Popover

const CartMenu = ({ children, id, name, quanty, price, typeOfProduct, buttonsValues, extras }) => {
  const { newQuanty, setNewQuanty } = useCartOrders(id, quanty, buttonsValues, extras);

  return (
    <div>
      <div className='w-24'>
        <img src='http://localhost:3000/img/restaurantImg/coffee.jpg' className='' />
      </div>
      <div className='flex flex-col justify-around w-full mx-5'>
        <div className='flex justify-between'>
          <h1>{name}</h1>
          <DeleteCartOrderButton id={id} quanty={quanty} buttonsValues={buttonsValues} extras={extras}>
            Eliminar
          </DeleteCartOrderButton>
        </div>
        <div className='flex justify-between items-center'>
          <span>${(price * quanty).toFixed(2)}</span>
          {typeOfProduct === 'Custom' || typeOfProduct === 'Coffee' ? (
            <Popover
              placement='bottom'
              showArrow={true}
              classNames={{
                base: 'py-3 px-4 border border-default-200 bg-gradient-to-br from-white to-default-300 dark:from-default-100 dark:to-default-50',
                arrow: 'bg-default-200',
              }}
            >
              <PopoverTrigger>
                <Button color='primary' variant='ghost'>
                  Ver Notas...
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className='px-1 py-2'>{children}</div>
              </PopoverContent>
            </Popover>
          ) : typeOfProduct === 'Normal' ? null : typeOfProduct === 'Variants' ? (
            <div>{children}</div>
          ) : null}

          <SetQuanty quanty={newQuanty} setQuanty={setNewQuanty} />
        </div>
      </div>
    </div>
  );
};

export default CartMenu;
