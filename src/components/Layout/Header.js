import { Fragment } from 'react';
// import {Link} from 'react-router';
import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/foodImage1.jpg';
import classes from './Header.module.css';
import {Link} from 'react-router-dom';
import AuthApi from '../ContextApis/AuthApi';
import UsernameApi from '../ContextApis/UsernameApi';
import React from "react"
import Cookies from 'js-cookie'
import {useHistory} from 'react-router-dom';

const Header = (props) => {
  let history = useHistory();
  const Auth = React.useContext(AuthApi);
  const Username = React.useContext(UsernameApi);
  const handleOnClick = () => {
    Auth.setAuth(false);
    Cookies.remove("user");
    Cookies.remove("rName");
    history.push('/login');
  }
  let username = Username.username;
  // let history = useHistory();
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Exotic Meals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
        
        <div className={classes.dropdown}>
    <button className={classes.dropbtn}>Welcome, {username}
      <span className={classes.icon}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
        </svg>
      </span>
    </button>
    <div className={classes.dropdownContent}>
      <ul className={classes.ul}>
        <li><Link to="/login" className={classes.textLink}>Profile</Link></li>
        <li><Link to="/login" className={classes.textLink}>Bookmarks</Link></li>
        <li><Link to="/login" className={classes.textLink}>Settings</Link></li>
        <li><Link to="/login" className={classes.textLink}>Help</Link></li>
        {/* <li><Link to="/login" className={classes.textLink}>LogOut</Link></li> */}
        <li><button onClick={handleOnClick} className={classes.logOut}>Logout</button></li>
      </ul>
    </div>
  </div>
        {/* <div className={classes.actions}>
        <button type="login" 
                onClick= {() => {
                    history.push('/login');
                }}
                >Logout</button>
        </div>  */}
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;
