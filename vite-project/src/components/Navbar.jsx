import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

//Iconos
import Home from '/img/icons/Home.png';
import Menu from '/img/icons/Menu.png';
import Clock from '/img/icons/Clock.png';
import Promo from '/img/icons/Promo.png';
import Settings from '/img/icons/Settings.png';
import LogOut from '/img/icons/LogOut.png';
import ReactIcon from '/img/icons/React.png';

//Context => Token
import { AuthContext } from '../../context/AuthContext';

//CSS modules
import css from './Navbar.module.css';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const listNavbar = [
    { title: null, img: ReactIcon },
    { title: 'Home', img: Home },
    { title: 'Menu', img: Menu },
    { title: 'Clock', img: Clock },
    { title: 'Promo', img: Promo },
    { title: 'Config.', img: Settings },
    {
      title: 'Sign Out',
      img: LogOut,
      click: () => {
        logout();
        navigate('/auth');
      },
    },
  ];

  return (
    <header>
      <nav className='flex justify-center items-center'>
        <ul className={css.ulContainer}>
          {listNavbar.map(({ title, img, click }) => {
            return (
              <li key={title} onClick={click ? () => click() : null}>
                <img src={img} className={title === null ? 'w-12' : 'w-6'} alt='React logo' width='25px' />
                {title}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
