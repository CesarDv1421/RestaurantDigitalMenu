import css from './AddToCartMenu.module.css';

const AddToCartButton = ({ children, toggleButtonsSelected, toggleLength }) => {

  return (
    <>
      {toggleButtonsSelected.length >= toggleLength && (
        <div className={css.addCartContainer}>
          {children}
        </div>
      )}
    </>
  );
};

export default AddToCartButton;
