
import Header from '../Layout/Header';
import { useState, useHistory } from 'react';
import AvailableMeals from '../Meals/AvailableMeals';
import CartProvider from '../../store/CartProvider';
import Cart from '../Cart/Cart';
import {Redirect} from 'react-router';
import {useParams} from 'react-router-dom';

const MealsListAndHeader = () => {
  let history = useHistory();
  const {id} = useParams();
  console.log('in mealsprops...',id );
  
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const restaurantNameFunction = () => {
    if(id == 1000){
    return 'Buhari';
    }else if(id === '1001'){
      return 'Barbeque Nation';
    }else if(id === '1002'){
      return 'Star Briyani';
    }else if(id === '1003'){
      return 'Ali Baba';
    };
  }

//   if(!authorized){
//     return <Redirect to='/login' />;
// }

    return (
        <CartProvider>
            {cartIsShown && <Cart onClose={hideCartHandler} />}
            <Header onShowCart={showCartHandler} />
           <h1 style={{color: "#5a1a01"}}><center>{restaurantNameFunction()}</center></h1>
            <AvailableMeals id={id}></AvailableMeals>            
        </CartProvider>        
    )

}

export default MealsListAndHeader;