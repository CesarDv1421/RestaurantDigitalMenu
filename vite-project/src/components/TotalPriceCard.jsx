//Next UI
import { Link, Button } from '@nextui-org/react';

const TotalPriceCard = ({ children, onClose }) => {
  const IVA_PERCENTAGE = Number(import.meta.env.VITE_IVA_PERCENTAGE);
  const SERVICE_PERCENTAGE = Number(import.meta.env.VITE_SERVICE_PERCENTAGE);

  const SUBTOTAL_WITH_IVA = ((children * IVA_PERCENTAGE) / 100).toFixed(2);
  const SUBTOTAL_WITH_SERVICE_PERCENTAGE = ((children * SERVICE_PERCENTAGE) / 100).toFixed(2);
  const TOTAL = (children * (1 + (SERVICE_PERCENTAGE + IVA_PERCENTAGE) / 100)).toFixed(2);
  const TOTAL_IN_BS = (TOTAL * 32).toFixed(2);

  return (
    <div className='flex flex-col w-full'>
      <div className='my-3'>
        <div className='flex justify-between mx-5'>
          <span className='text-xl'>Subtotal:</span>
          <span className='text-xl'>${children.toFixed(2)}</span>
        </div>
        <div className='flex justify-between mx-5'>
          <span>IVA ({IVA_PERCENTAGE}%):</span>
          <span>${SUBTOTAL_WITH_IVA}</span>
        </div>
        <div className='flex justify-between mx-5'>
          <span className='text-sm'>Servicio del {SERVICE_PERCENTAGE}%:</span>
          <span className='text-sm'>${SUBTOTAL_WITH_SERVICE_PERCENTAGE}</span>
        </div>
        <div className='border border-dashed m-2 border-gray-600'></div>
        <div className='flex justify-between mx-5'>
          <span className='text-2xl'>Total:</span>
          <span className='text-2xl'>
            Bs {TOTAL_IN_BS} / ${TOTAL}
          </span>
        </div>
      </div>

      <div className='flex mx-5 gap-5 justify-evenly py-5'>
        <Button className='w-1/4' href='/menu' as={Link} color='secondary' showAnchorIcon variant='solid'>
          Regresar al Menu
        </Button>
        <Button className='w-1/4' color='success' variant='ghost'>
          Pagar
        </Button>
      </div>
    </div>
  );
};

export default TotalPriceCard;
