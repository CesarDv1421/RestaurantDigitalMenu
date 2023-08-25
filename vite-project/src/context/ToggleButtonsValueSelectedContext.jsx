import { useState, createContext } from 'react';

const toggleButtonsValueSelectedContext = createContext();

const ToggleButtonsValueSelectedProvider = ({ children }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  return (
    <toggleButtonsValueSelectedContext.Provider value={{ selectedValue, setSelectedValue }}>
      {children}
    </toggleButtonsValueSelectedContext.Provider>
  );
};

export { toggleButtonsValueSelectedContext, ToggleButtonsValueSelectedProvider };
