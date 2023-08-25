import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

//Material UI
import Slide from '@mui/material/Slide';

const SnackbarMUI = ({ message, setMessage, style }) => {
  const [showMessage, setShowMessage] = useState(true);

  return (
    <Snackbar
      open={showMessage}
      TransitionComponent={Slide}
      autoHideDuration={2000}
      anchorOrigin={{
        vertical: 'bottom', // Posición vertical: 'top', 'bottom'
        horizontal: 'center', // Posición horizontal: 'left', 'center', 'right'
      }}
      onClose={() => {
        setShowMessage(false);
        setTimeout(() => {
          message.type ? setMessage({ type: '', styles: '', message: '' }) : setMessage('');
        }, 1800);
      }}
    >
      <Alert severity={style} variant='filled'>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarMUI;
