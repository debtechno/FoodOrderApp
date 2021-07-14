import React from 'react';
import alibaba from '../../assets/Alibaba.jfif';
import abcos from '../../assets/Abcos.jpg';
import {useHistory} from 'react-router-dom';
//import alibaba from 'C:/Users/WC939EQ/OneDrive - EY/Documents/My_Workspaces/ReactApps/ex-fo-ui-app/src/assets/Alibaba.jfif'
const Restaurant = ({getRestarauntDetails}) => {
  let history = useHistory();
    /*const restaurantList = restaurants.map((meal) => (
        <RestaurantMember
          key={meal.id}
          id={meal.id}
          name={meal.name}
          description={meal.description}
          
        />
      ));*/
    const openAlibabaItems = () => {
      console.log('inside alibaba');
       history.push('/restaurants/availableMeals');
      //  getRestarauntDetails(true, false);
    }
    const openAbcosItems = () => {
      console.log('insideAbacos');
      history.push('/restaurants/availableMeals');
      // getRestarauntDetails(true, false);

    }
    return (
        <div>
        <button><img src={alibaba} alt="Alibaba restaurnat" onClick={openAlibabaItems}/></button>
        <button><img src={abcos} alt="Abcos restaurant" onClick={openAbcosItems}/></button>
        </div>
    );

};
export default Restaurant;