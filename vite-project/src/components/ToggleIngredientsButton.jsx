import { useState } from 'react';

//CSS Modules
import css from './ToggleIngredientsButton.module.css';

const ToggleIngredientsButton = ({ children, price, priceOfExtra, setToggleButtonsSelected }) => {
  const [isSelected, setIsSelected] = useState(false);

  const onToggle = () => {
    setIsSelected((prevSelection) => !prevSelection);

    setToggleButtonsSelected((prevToggleSelected) => {
      const newSelection = prevToggleSelected.filter((item) => item.ingredient !== children);

      const updatedSelection = isSelected ? newSelection : [...newSelection, { ingredient: children, price }];

      // Ordena el array alfabeticamente por la clave "title"
      updatedSelection.sort((a, b) => a.ingredient.localeCompare(b.ingredient));

      return updatedSelection;
    });
  };

  return (
    <div className={css.toggleContainer}>
      <button onClick={() => onToggle()} className={isSelected ? css.toggleButtonSelected : css.toggleButton}>
        {children}
        {priceOfExtra}
      </button>
    </div>
  );
};

export default ToggleIngredientsButton;
