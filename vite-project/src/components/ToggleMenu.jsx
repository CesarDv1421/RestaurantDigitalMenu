import React, { useEffect, useState } from 'react';

const ToggleMenu = ({ children, title, onAddToCart }) => {
  const [selectedValue, setSelectedValue] = useState(null); //Estado global pasado como prop a los children, almacena la informacion del boton seleccionado

  useEffect(() => {
    setSelectedValue(null);
  }, [onAddToCart]);

  return (
    <div>
      <h1>{title}</h1>
      <div className='flex justify-evenly'>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            childrenValue: child.props.children, // Se cambia el la propiedad children por un nombre mas descriptivo
            title,
            selectedValue,
            setSelectedValue,
          })
        )}
      </div>
    </div>
  );
};

export default ToggleMenu;
