import css from './ProductCoffeeCard.module.css';

const ProductCoffeeCard = ({ children, name, img, description, price, toggleButtonsSelected }) => {
  return (
    <div className={toggleButtonsSelected.length >= 4 ? css.containerReady : css.container}>
      <div className='flex'>
        <img src={img} className='w-24 rounded-lg' alt='Imagen del plato' />
        <div className='flex flex-col justify-between py-0 px-3'>
          <h1>{name}</h1>
          <p>{description}</p>
          <div className='flex justify-between items-center'>
            <span className='text-2xl text-green-800'>${price}</span>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ProductCoffeeCard;
