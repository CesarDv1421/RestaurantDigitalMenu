const ToggleButton = ({
  childrenValue,
  setToggleButtonsSelected,
  name,
  price,
  title,
  selectedValue,
  setSelectedValue,
  styles,
}) => {
  const children = typeof childrenValue === 'object' ? childrenValue.props.data : childrenValue; //Verifica si el children es un string o <img/> (icono), si es una imagen, accede a sus valores

  const isSelected = selectedValue === children;

  const toggleButtonClicked = () => {
    setSelectedValue((prevValue) => (prevValue === children ? null : children));

    setToggleButtonsSelected((prevSelections) => {
      const newSelection = prevSelections.filter((item) => item.title !== title);

      const updatedSelection = isSelected ? newSelection : [...newSelection, { name, title, ingredient: children }];

      updatedSelection.sort((a, b) => a.title.localeCompare(b.title));

      return updatedSelection;
    });
  };

  return (
    <div className='flex flex-col gap-3 text-center'>
      <button
        className={`${
          styles === 'ToggleButton'
            ? `w-10 h-10 text-xs text-black rounded-full border-2 flex justify-center items-center cursor-pointer transition duration-300 hover:bg-opacity-20 ${
                isSelected ? 'bg-opacity-50 border-gray-800' : 'border-gray-300 bg-opacity-10'
              } `
            : `text-xs py-2 px-4 rounded-full border-2 cursor-pointer transition-all duration-250 ${
                isSelected ? 'border-gray-800 bg-gray-800 text-white' : 'border-gray-400 bg-gray-100'
              }`
        }`}
        onClick={toggleButtonClicked}
        type='button'
      >
        {childrenValue}
      </button>

      {price}
    </div>
  );
};

export default ToggleButton;
