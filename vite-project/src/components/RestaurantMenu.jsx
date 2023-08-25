import { useEffect, useState } from 'react';

//Iconos
import Fire from '/img/icons/fire.png';
import Ice from '/img/icons/Ice.png';

//Componentes: ==>
//Tipos de Productos del menu a renderizar
import ProductCard from './ProductCard';
import ProductCoffeeCard from './ProductCoffeeCard';
import ProductVariantCard from './ProductVariantCard';
import ProductCustomIngredientsCard from './ProductCustomIngredientsCard';
import CustomIngredientsListCard from './CustomIngredientsListCard';
//ToggleButtons
import ToggleButton from './ToggleButton';
import ToggleMenu from './ToggleMenu';
import ToggleIngredientsButton from './ToggleIngredientsButton';
//Componentes Secundarios
import SetQuanty from './SetQuanty';
import AddToCartMenu from './AddToCartMenu';
import SnackbarMUI from './SnackbarMUI';

//NextUI
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';

//CSS Modules
import css from './RestaurantMenu.module.css';

const RestaurantMenu = ({
  id,
  name,
  description,
  price,
  img,
  category,
  variants,
  cartOrders,
  setCartOrders,
  ingredients,
  extras,
}) => {
  const [toggleButtonsSelected, setToggleButtonsSelected] = useState([]); //Estado encargado de obtener el valor de todos los Toggle Buttons
  const [toggleButtonsExtrasSelected, setToggleButtonsExtrasSelected] = useState([]); //Mismo funcionamiento que el anterior pero dedicado exclusivamente a los extras que se le puede agregar a un plato
  const [quanty, setQuanty] = useState(1); //Estado encargado de manejar la cantidad del producto que el cliente desea
  const [snackbarMessage, setSnackbarMessage] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure(); //custom Hook del Modal del NextUI

  const calculateTotalPriceWithExtras = toggleButtonsExtrasSelected.reduce((total, { ingredient }) => {
    const selectedExtra = extras.find((extra) => extra.extras === ingredient); //Si encuentra el extra seleccionado en la lista de extras
    return (Number(total) + (selectedExtra ? selectedExtra.extrasPrice : 0)).toFixed(2); //Suma su precio al total actual. Si no lo encuentra, simplemente suma 0 al total.
  }, price);

  const onAddToCart = () => {
    if (quanty > 0) {
      const getTypeOfProduct = () => {
        if (toggleButtonsSelected.length >= 0 && category === 'Hamburguesas') return 'Custom';

        if (toggleButtonsSelected.length === 0) return 'Normal';

        if (toggleButtonsSelected.length === 4) return 'Coffee';

        const priceOfVariant = variants?.find(({ variant }) => variant === toggleButtonsSelected[0].ingredient);
        if (priceOfVariant?.price) return 'Variants';
      };

      const calculatePrice = () => {
        if (price)
          return toggleButtonsExtrasSelected.length > 0 ? Number(calculateTotalPriceWithExtras) : Number(price);

        const priceOfVariant = variants?.find(({ variant }) => variant === toggleButtonsSelected[0].ingredient);

        return Number(priceOfVariant?.price) || 0;
      };

      setCartOrders((prevOrders) => {
        const existingSimilarOrders = prevOrders.find((order) => {
          if (order.typeOfProduct === 'Normal') return order.name === name;

          if (order.typeOfProduct === 'Coffee' || order.typeOfProduct === 'Variants') {
            return (
              order.name === name &&
              order.buttonsValues.every(({ ingredient }, index) => {
                return ingredient === toggleButtonsSelected[index].ingredient;
              })
            );
          }

          if (order.typeOfProduct === 'Custom') {
            // Comparar solo si tienen la misma longitud
            if (
              order.buttonsValues.length !== toggleButtonsSelected.length ||
              order.extras.length !== toggleButtonsExtrasSelected.length
            ) {
              return false;
            }

            // Comparar elementos de buttonsValues uno a uno
            const ingredientsMatch = order.buttonsValues.every(({ ingredient }, index) => {
              return ingredient === toggleButtonsSelected[index].ingredient;
            });

            // Comparar elementos de extras uno a uno
            const extrasMatch = order.extras.every(({ ingredient }, index) => {
              return ingredient === toggleButtonsExtrasSelected[index].ingredient;
            });

            // Retornar true si tanto buttonsValues como extras coinciden
            return order.name === name && ingredientsMatch && extrasMatch;
          }

          return false;
        });

        if (existingSimilarOrders) {
          existingSimilarOrders.quanty += quanty;
          return [...prevOrders];
        }

        return [
          ...prevOrders,
          {
            id,
            name,
            quanty,
            price: calculatePrice(),
            buttonsValues: toggleButtonsSelected,
            extras: toggleButtonsExtrasSelected && toggleButtonsExtrasSelected,
            typeOfProduct: getTypeOfProduct(),
          },
        ];
      });
      setSnackbarMessage('Producto añadido al carrito exitosamente');
      setQuanty(1);
      setToggleButtonsSelected([]);
      setToggleButtonsExtrasSelected([]);
    }
  };

  return (
    <>
      {category === 'Cafe' && (
        <ProductCoffeeCard
          name={name}
          img={img}
          description={description}
          price={price}
          toggleButtonsSelected={toggleButtonsSelected}
        >
          <div className={css.toggleMenuContainer}>
            <ToggleMenu title='Mood' onAddToCart={cartOrders}>
              <ToggleButton setToggleButtonsSelected={setToggleButtonsSelected} name={name} styles={'ToggleButton'}>
                <img src={Fire} width='20px' data='Caliente' alt='Fire logo' />
              </ToggleButton>
              <ToggleButton setToggleButtonsSelected={setToggleButtonsSelected} name={name} styles={'ToggleButton'}>
                <img src={Ice} width='20px' data='Frio' alt='Ice logo' />
              </ToggleButton>
            </ToggleMenu>

            <ToggleMenu title='Tamaño' onAddToCart={cartOrders}>
              <ToggleButton setToggleButtonsSelected={setToggleButtonsSelected} name={name} styles={'ToggleButton'}>
                S
              </ToggleButton>
              <ToggleButton setToggleButtonsSelected={setToggleButtonsSelected} name={name} styles={'ToggleButton'}>
                M
              </ToggleButton>
              <ToggleButton setToggleButtonsSelected={setToggleButtonsSelected} name={name} styles={'ToggleButton'}>
                L
              </ToggleButton>
            </ToggleMenu>
          </div>

          <div className={css.toggleMenuContainer}>
            <ToggleMenu title='Azucar' onAddToCart={cartOrders}>
              <ToggleButton setToggleButtonsSelected={setToggleButtonsSelected} name={name} styles={'ToggleButton'}>
                30%
              </ToggleButton>
              <ToggleButton setToggleButtonsSelected={setToggleButtonsSelected} name={name} styles={'ToggleButton'}>
                50%
              </ToggleButton>
              <ToggleButton setToggleButtonsSelected={setToggleButtonsSelected} name={name} styles={'ToggleButton'}>
                70%
              </ToggleButton>
            </ToggleMenu>

            <ToggleMenu title='Hielo' onAddToCart={cartOrders}>
              <ToggleButton setToggleButtonsSelected={setToggleButtonsSelected} name={name} styles={'ToggleButton'}>
                30%
              </ToggleButton>
              <ToggleButton setToggleButtonsSelected={setToggleButtonsSelected} name={name} styles={'ToggleButton'}>
                50%
              </ToggleButton>
              <ToggleButton setToggleButtonsSelected={setToggleButtonsSelected} name={name} styles={'ToggleButton'}>
                70%
              </ToggleButton>
            </ToggleMenu>
          </div>

          <AddToCartMenu toggleButtonsSelected={toggleButtonsSelected} toggleLength={4}>
            <SetQuanty quanty={quanty} setQuanty={setQuanty} />
            <Button
              variant='solid'
              isDisabled={quanty <= 0}
              onPress={() => onAddToCart()}
              className='text-white bg-green-500 w-1/2'
            >
              Add to Cart
            </Button>
          </AddToCartMenu>
        </ProductCoffeeCard>
      )}

      {variants?.length > 0 && (
        <ProductVariantCard
          name={name}
          description={description}
          img={img}
          toggleButtonsSelected={toggleButtonsSelected}
        >
          <div className={css.toggleMenuContainerWithVariants}>
            <ToggleMenu toggleButtonsSelected={toggleButtonsSelected} onAddToCart={cartOrders}>
              {variants.map(({ variant, price }) => (
                <ToggleButton
                  key={variant}
                  name={name}
                  price={<span>${price}</span>}
                  styles={'ToggleButtonWithVariants'}
                  setToggleButtonsSelected={setToggleButtonsSelected}
                >
                  {variant}
                </ToggleButton>
              ))}
            </ToggleMenu>
          </div>

          <AddToCartMenu toggleButtonsSelected={toggleButtonsSelected} toggleLength={1}>
            <SetQuanty quanty={quanty} setQuanty={setQuanty} />
            <Button
              variant='solid'
              isDisabled={quanty <= 0}
              onPress={() => onAddToCart()}
              className='text-white bg-green-500 w-1/2'
            >
              Add to Cart
            </Button>
          </AddToCartMenu>
        </ProductVariantCard>
      )}

      {variants === null && category !== 'Cafe' && category !== 'Hamburguesas' && (
        <ProductCard name={name} description={description} img={img} price={price}>
          <AddToCartMenu toggleButtonsSelected={toggleButtonsSelected} toggleLength={0}>
            <SetQuanty quanty={quanty} setQuanty={setQuanty} />
            <Button
              variant='solid'
              isDisabled={quanty <= 0}
              onPress={() => onAddToCart()}
              className='text-white bg-blue-500 w-1/2'
            >
              Add to Cart
            </Button>
          </AddToCartMenu>
        </ProductCard>
      )}

      {ingredients && (
        <ProductCustomIngredientsCard name={name} description={description} img={img} price={price} onOpen={onOpen}>
          <div className={css.addCartContainer}>
            <Modal
              backdrop='blur'
              scrollBehavior='normal'
              isOpen={isOpen}
              onClose={onClose}
              size='2xl'
              shadow='sm'
              classNames={{
                backdrop: 'bg-[#292f47]/50 backdrop-opacity-40',
                base: 'border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]',
                header: 'border-b-[1px] border-[#292f46]',
                footer: 'border-t-[1px] border-[#292f46]',
                closeButton: 'hover:bg-white/5 active:bg-white/10',
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className='flex flex-col gap-1'>
                      <div className={css.titleModal}>
                        <h1>Cantidad</h1>
                        <SetQuanty quanty={quanty} setQuanty={setQuanty} />
                        <h1>{name}</h1>
                      </div>
                    </ModalHeader>
                    <ModalBody>
                      <CustomIngredientsListCard title='Eliminar Ingredientes'>
                        {ingredients.map(({ ingredient }) => {
                          return (
                            <ToggleIngredientsButton
                              key={ingredient}
                              setToggleButtonsSelected={setToggleButtonsSelected}
                            >
                              {ingredient}
                            </ToggleIngredientsButton>
                          );
                        })}
                      </CustomIngredientsListCard>

                      <CustomIngredientsListCard title='Agregar Extra'>
                        {extras &&
                          extras.map(({ extras, extrasPrice }) => {
                            return (
                              <ToggleIngredientsButton
                                key={extras}
                                price={extrasPrice}
                                priceOfExtra={<span> (+${extrasPrice})</span>}
                                setToggleButtonsSelected={setToggleButtonsExtrasSelected}
                              >
                                {extras}
                              </ToggleIngredientsButton>
                            );
                          })}
                      </CustomIngredientsListCard>
                      <h2 className='text-lg m-5'>Precio final: ${calculateTotalPriceWithExtras}</h2>
                    </ModalBody>
                    <ModalFooter>
                      <Button color='danger' variant='light' onClick={onClose}>
                        Cancelar
                      </Button>
                      <Button color='primary' variant='ghost' onPress={() => onAddToCart()} onClick={onClose}>
                        Anadir al Carrito
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </ProductCustomIngredientsCard>
      )}
      {snackbarMessage && <SnackbarMUI message={snackbarMessage} setMessage={setSnackbarMessage} style='success' />}
    </>
  );
};

export default RestaurantMenu;
