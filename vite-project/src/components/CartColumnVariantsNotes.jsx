//Next UI
import { Popover, PopoverTrigger, PopoverContent, Button } from '@nextui-org/react'; //Componenetes necesarios para funcionamiento del Popover

const CartColumnVariantsNotes = ({ children, typeOfProduct }) => {
  return (
    <>
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
    </>
  );
};

export default CartColumnVariantsNotes;
