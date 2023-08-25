//Custom Hooks
import useCartOrders from '../../hooks/useCartOrders';

//Next UI
import { Button } from '@nextui-org/react'; //Componenetes necesarios para funcionamiento del Popover

import Delete from '/img/icons/Delete.png';

const DeleteCartOrderButton = ({ children, id, quanty, buttonsValues, extras }) => {
  const { onDeleteCartOrder } = useCartOrders(id, quanty, buttonsValues, extras);
  return (
    <Button color='danger' onPress={() => onDeleteCartOrder()} variant='ghost'>
      <img src={Delete} alt='Delete icon' onClick={() => onDeleteCartOrder()} width='20px' />
    </Button>
  );
};

export default DeleteCartOrderButton;
