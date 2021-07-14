import { useState } from 'react';

import Header from './Layout/Header';
import Meals from './Meals/Meals';
import Cart from './Cart/Cart';
import CartProvider from '../store/CartProvider';
import {Redirect, Switch} from 'react-router';
import MealsListAndHeader from '../components/Restaurants/MealsListAndHeader'
import AvailableMeals from '../components/Meals/AvailableMeals'

function LandingPage() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
 
  // if(!authorized){
  //     return <Redirect to='/login' />;
  // }

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>       
        <Meals />      
      </main>
    </CartProvider>
  );
}

export default LandingPage;
