import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

//Componentes
import SnackbarMUI from '../components/SnackbarMUI';

//Context ==> token
import { AuthContext } from '../../context/AuthContext';

//NextUI
import { Card, CardBody, Divider, Button, Input, Tabs, Tab } from '@nextui-org/react';
import EyeFilledIcon from '../components/EyeFilledIcon';
import EyeSlashFilledIcon from '../components/EyeSlashFilledIcon.jsx';

//API URL
const VITE_API_URL = import.meta.env.VITE_API_URL;

const Auth = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [typeOfAuth, setTypeOfAuth] = useState('Signin');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errMessage, setErrMessage] = useState({
    type: '',
    styles: '',
    message: '',
  });
  const navigate = useNavigate();

  //Context ==> token
  const { login, logout, userToken } = useContext(AuthContext);

  useEffect(() => {
    if (userToken) return navigate('/menu');
  }, [userToken]);

  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
  }, [typeOfAuth]);

  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const inputErrMessage = (type, styles, message) => {
    setErrMessage({ type: type, styles: styles, message: message });

    setTimeout(() => {
      setErrMessage({ type: '', styles: '', message: '' });
    }, 2000);
  };

  const onSignIn = async (event) => {
    event.preventDefault();

    if (!email) return inputErrMessage('Email', 'invalid', 'El email es requerido');

    if (!password) return inputErrMessage('Password', 'invalid', 'La contraseña es requerida');

    try {
      const response = await fetch(`${VITE_API_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const { token, userName, rol, err } = await response.json();

      if (err) {
        logout();
        setErrMessage({ type: 'Server', styles: 'invalid', message: err });
        return console.log(err);
      }
      if (response.status === 201) {
        login(token, { userName, rol });
        navigate('/menu');
      }
    } catch (err) {
      setErrMessage({ type: 'Server', styles: 'invalid', message: err });
      console.log(err);
    }
  };

  const onSignUp = async (event) => {
    event.preventDefault();

    if (!name) return inputErrMessage('Name', 'invalid', 'El nombre es requerido');

    if (!email) return inputErrMessage('Email', 'invalid', 'El email es requerido');

    if (!password) return inputErrMessage('Password', 'invalid', 'La contraseña es requerida');

    try {
      const response = await fetch(`${VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const { token, userName, rol, err } = await response.json();

      console.log(token, userName, rol, err);

      if (err) {
        logout();
        setErrMessage({ type: 'Server', styles: 'invalid', message: err });
        return console.log(err);
      }
      if (response.status === 201) {
        login(token, { userName, rol });
        navigate('/menu');
      }
    } catch (err) {
      setErrMessage({ type: 'Server', styles: 'invalid', message: err });
      console.log(err);
    }
  };

  return (
    <section>
      <form className='h-screen flex justify-center items-center'>
        <Card className='w-[30%]'>
          <Tabs
            fullWidth
            size='md'
            aria-label='Tabs form'
            className='px-10 py-5 pb-1'
            selectedKey={typeOfAuth}
            onSelectionChange={setTypeOfAuth}
          >
            <Tab key='Signin' title='Iniciar Sesion'>
              <Divider />
              <CardBody>
                <div className='w-full h-full flex gap-5 flex-col justify-evenly'>
                  <Input
                    type='email'
                    variant='bordered'
                    label='Email'
                    validationState={errMessage.type === 'Email' && errMessage.styles}
                    errorMessage={errMessage.type === 'Email' && errMessage.message}
                    value={email}
                    onValueChange={setEmail}
                  />
                  <Input
                    type={isPasswordVisible ? 'text' : 'password'}
                    variant='bordered'
                    label='Contraseña'
                    validationState={errMessage.type === 'Password' && errMessage.styles}
                    errorMessage={errMessage.type === 'Password' && errMessage.message}
                    value={password}
                    onValueChange={setPassword}
                    endContent={
                      <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
                        {isPasswordVisible ? (
                          <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                        ) : (
                          <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                        )}
                      </button>
                    }
                  />
                </div>
              </CardBody>
              <Divider />
              <div className='flex m-3 gap-5 justify-end'>
                <Button className='w-full' color='success' variant='ghost' type='submit' onClick={onSignIn}>
                  Iniciar Sesion
                </Button>
              </div>
            </Tab>
            <Tab key='SignUp' title='Registrarse'>
              <Divider />
              <CardBody>
                <div className='w-full h-full flex gap-5 flex-col justify-evenly'>
                  <Input
                    type='text'
                    variant='bordered'
                    label='Nombre'
                    validationState={errMessage.type === 'Name' && errMessage.styles}
                    errorMessage={errMessage.type === 'Name' && errMessage.message}
                    value={name}
                    onValueChange={setName}
                  />
                  <Input
                    type='email'
                    variant='bordered'
                    label='Email'
                    validationState={errMessage.type === 'Email' && errMessage.styles}
                    errorMessage={errMessage.type === 'Email' && errMessage.message}
                    value={email}
                    onValueChange={setEmail}
                  />
                  <Input
                    type={isPasswordVisible ? 'text' : 'password'}
                    variant='bordered'
                    label='Contraseña'
                    validationState={errMessage.type === 'Password' && errMessage.styles}
                    errorMessage={errMessage.type === 'Password' && errMessage.message}
                    value={password}
                    onValueChange={setPassword}
                    endContent={
                      <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
                        {isPasswordVisible ? (
                          <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                        ) : (
                          <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                        )}
                      </button>
                    }
                  />
                </div>
              </CardBody>
              <Divider />
              <div className='flex m-3 gap-5 justify-end'>
                <Button
                  className='w-full hover:text-white'
                  color='success'
                  variant='ghost'
                  type='submit'
                  onClick={onSignUp}
                >
                  Registrarse
                </Button>
              </div>
            </Tab>
          </Tabs>
        </Card>
      </form>
      {errMessage.type === 'Server' && (
        <SnackbarMUI message={errMessage.message} setMessage={setErrMessage} style='error' />
      )}
    </section>
  );
};

export default Auth;
