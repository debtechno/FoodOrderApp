import React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import AvailableMeals from '../Meals/AvailableMeals'
import Header from '../Layout/Header'
import CartProvider from '../../store/CartProvider';
import { useState } from 'react';
import Cart from '../Cart/Cart';
import RestaurantNameApi from '../ContextApis/RestaurantNameApi';
import AuthApi from '../ContextApis/AuthApi';
import classes from './Check.module.css';

const Check = () => {
    let history = useHistory();
    const {id} = useParams();
    const Auth = React.useContext(AuthApi);
  console.log('in mealsprops...',id );
  if(id){
    console.log('inside idddd ifff');
    Auth.setAuth(true);
  }
  const RestaurantName = React.useContext(RestaurantNameApi);
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const restaurantNameFunction = () => {
    let rName = RestaurantName.restaurantName;
    return rName;
  }
    return(
        <CartProvider>
            {cartIsShown && <Cart onClose={hideCartHandler} />}
             <Header  onShowCart={showCartHandler} />
            <h1 style={{color: "#5a1a01"}}><center>{restaurantNameFunction()}</center></h1>
            <AvailableMeals id={id}></AvailableMeals>
            <br></br>
            <center><button className={classes.button} type="button" onClick= {() => {
                    history.push('/restaurants');
                }}>Back to Homepage</button></center>
        </CartProvider>
    )
}

export default Check;