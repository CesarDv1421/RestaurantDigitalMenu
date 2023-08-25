import css from './ProductVariantCard.module.css';

const ProductVariantCard = ({ children, name, description, img, toggleButtonsSelected }) => {
  return (
    <div className={toggleButtonsSelected.length >= 1 ? css.containerReady : css.container}>
      <div className='flex'>
        <img src={img} className='w-24 rounded-lg' alt='Imagen del producto'/>
        <div className='flex w-full flex-col justify-between px-3'>
          <h1>{name}</h1>
          <p>{description}</p>
          <div></div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ProductVariantCard;
