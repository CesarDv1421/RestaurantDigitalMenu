import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Componentes
import RestaurantMenu from '../components/RestaurantMenu.jsx';
import CartMenu from '../components/CartMenu.jsx';
import SliderCategories from '../components/SliderCategories.jsx';
import TotalPriceCard from '../components/TotalPriceCard.jsx';
import Navbar from '../components/Navbar.jsx';

//Iconos
import Cart from '/img/icons/Cart.png';

//Context
//==> token
import { AuthContext } from '../../context/AuthContext';
//==> CartOrder / Carrito de compras
import { CartOrdersContext } from '../../context/CartOrdersContext.jsx';

//Material UI
import { Grid } from '@mui/material';

//Next UI
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react'; //Componentes necesarios para el Modal
import { Badge, Button, Input } from '@nextui-org/react'; //Circulo de notificaciones

//API URL
const API_URL = import.meta.env.VITE_API_URL;

//CSS Modules
import css from '../components/Menu.module.css';

function App() {
  const [restaurantMenu, setRestaurantMenu] = useState([]); //Aqui se almacena el menu del restaurante
  const copyOfRestaurantMenu = useRef([]);

  const { cartOrders, setCartOrders } = useContext(CartOrdersContext);

  const [categories, setCategories] = useState([]); //Aqui se almacenan las categorias de los platillos
  const [displayedCategory, setDisplayedCategory] = useState('Menu'); //Mustra el menu de acuerdo a la categoria selecionada
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();

  //Custom Hooks
  const { isOpen, onOpen, onClose } = useDisclosure(); //custom Hook del Modal del NextUI

  //Context del Token
  const { logout, userToken } = useContext(AuthContext);

  useEffect(() => {
    if (!userToken) {
      navigate('/auth');
    }
  }, [userToken]);

  useEffect(() => {
    const fetchMenuRestaurant = async () => {
      try {
        const response = await fetch(`${API_URL}/menu`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${userToken}`,
          },
        });
        const { menu, categories, err } = await response.json();

        if (err) {
          logout();
          console.log(err);
          navigate('/auth');
        }

        if (response.status === 200) {
          setRestaurantMenu(menu);
          copyOfRestaurantMenu.current = menu;
          setCategories(categories);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (userToken) {
      fetchMenuRestaurant();
    }
  }, [userToken]);

  useEffect(() => {
    setRestaurantMenu(() => {
      return displayedCategory !== 'Menu' //Cuando se seleccione cualquier boton que no sea "Menu" de las categorias
        ? copyOfRestaurantMenu.current.filter(({ category }) => category === displayedCategory)
        : copyOfRestaurantMenu.current;
    });
  }, [displayedCategory, copyOfRestaurantMenu]); //Cada vez que se seleccione una categoria

  const onGoToCart = () => {
    localStorage.setItem('cartOrders', JSON.stringify(cartOrders));
    navigate('/cart');
  };

  const onFindingMenu = (event) => {
    //Muestra el menu de acuerdo a lo escrito
    const value = event.target.value;

    const filteredFood = copyOfRestaurantMenu.current.filter((food) =>
      food.name.toLowerCase().includes(inputValue.toLocaleLowerCase())
    );
    console.log(filteredFood);
    setRestaurantMenu(filteredFood);
  };

  return (
    <div className='flex'>
      <Navbar />

      <main className='w-screen h-full overflow-y-hidden bg-gray-100'>
        <section className='border-2 border-b-red-900'>
          <div className={css.ChosseCategoryContainer}>
            <h1>Bienvenido, {userToken.userName}</h1>

            <div className='w-1/2'>
              {/* <input type='text' placeholder='Buscar categoria o menu' /> */}
              <Input
                className='border-2 border-gray-300 rounded-xl'
                type='text'
                label='Buscar plato del menu'
                value={inputValue}
                onValueChange={setInputValue}
                onChange={onFindingMenu}
              />
            </div>

            <Badge
              content={cartOrders.length > 0 ? cartOrders.length : false}
              isInvisible={cartOrders.length === 0}
              color='danger'
            >
              <img
                src={Cart}
                alt='Cart logo'
                onClick={() => onOpen()}
                width='35px'
                height='35px'
                style={{ cursor: 'pointer' }}
              />
            </Badge>

            <Modal
              backdrop='blur'
              scrollBehavior='inside'
              isOpen={isOpen}
              onClose={onClose}
              placement='center'
              size='3xl'
              shadow='sm'
              classNames={{
                backdrop: 'bg-[#292f47]/50 backdrop-opacity-40',
                base: ' border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3] ',
                header: 'border-b-[1px] border-[#292f46]',
                footer: 'border-t-[1px] border-[#292f46]',
                closeButton: 'hover:bg-white/5 active:bg-white/10',
                wrapper: 'overflow-hidden border border-black',
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className='flex flex-col gap-1'>
                      <div className='flex justify-between items-center'>
                        <h2>Carrito</h2>
                      </div>
                    </ModalHeader>
                    <ModalBody>
                      <div className={css.orderList}>
                        {cartOrders?.length === 0 ? (
                          <span className='w-full h-64 flex justify-center items-center text-4xl'>
                            Sin pedidos, ordena ya
                          </span>
                        ) : (
                          cartOrders.map(({ id, name, quanty, price, buttonsValues, extras, typeOfProduct }, index) => (
                            <CartMenu
                              key={`${id}-${name}-${index}`}
                              id={id}
                              name={name}
                              quanty={quanty}
                              price={price}
                              typeOfProduct={typeOfProduct}
                              setCartOrders={setCartOrders}
                              buttonsValues={buttonsValues}
                              extras={extras}
                            >
                              {typeOfProduct === 'Custom' && <h1 className='mb-2'>Sin:</h1>}

                              {Object.values(buttonsValues).map(({ title, ingredient }) => {
                                return (
                                  <div key={ingredient}>
                                    {typeOfProduct === 'Coffee' && title} {ingredient}
                                  </div>
                                );
                              })}

                              {extras.length > 0 && (
                                <>
                                  <h1 className='my-2'>Extra de:</h1>
                                  {Object.values(extras)?.map(({ ingredient, price }) => {
                                    return (
                                      <div key={ingredient}>
                                        - {ingredient} (+${price})
                                      </div>
                                    );
                                  })}
                                </>
                              )}
                            </CartMenu>
                          ))
                        )}
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      {/* <TotalPriceCard onClose={onClose}>
                        {cartOrders.reduce((acc, { price, quanty }) => acc + price * quanty, 0)}
                      </TotalPriceCard> */}
                      <div className='flex mx-5 gap-5 justify-evenly'>
                        <Button className='w-full' color='danger' variant='light' onClick={onClose}>
                          Cancelar
                        </Button>
                        <Button className='w-full' color='success' variant='ghost' onClick={onGoToCart}>
                          Pagar
                        </Button>
                      </div>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </section>

        <section className='overflow-y-auto h-full'>
          <SliderCategories categories={categories} setDisplayedCategory={setDisplayedCategory} />
          <h1 className='m-5 text-2xl'>{displayedCategory === 'Menu' ? 'Menu' : `${displayedCategory} Menu`}</h1>
          <div className='p-5'>
            <Grid container spacing={5} alignItems='center'>
              {restaurantMenu?.map(({ id, name, description, price, img, category, variants, ingredients, extras }) => {
                return (
                  <Grid key={id} item xs={12} sm={6} md={6} lg={4}>
                    <RestaurantMenu
                      key={id}
                      id={id}
                      name={name}
                      description={description}
                      price={price}
                      img={`http://localhost:3000/img/restaurantImg/${img}`}
                      category={category}
                      variants={variants}
                      ingredients={ingredients}
                      extras={extras}
                      cartOrders={cartOrders}
                      setCartOrders={setCartOrders}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
