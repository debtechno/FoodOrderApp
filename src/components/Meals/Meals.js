import { Fragment } from 'react';

import MealsSummary from './MealsSummary';
import AvailableRestaurants from '../Restaurants/AvailableRestaurants'

const Meals = () => {
  // const [isAvailableMeals, setIsAvailableMeals] = useState(false);
  // const [isRestaurant, setIsRestaurant] = useState(true); 

  // const getRestarauntDetails = (booleanMealsValue, booleanRestaurantValue) => {
  //   setIsAvailableMeals(booleanMealsValue);
  //   setIsRestaurant(booleanRestaurantValue);
  // }

  return (
    <Fragment>
      <MealsSummary />
      {/* <Restaurant/> */}
      <AvailableRestaurants></AvailableRestaurants>
    </Fragment>
  );
};

export default Meals;
