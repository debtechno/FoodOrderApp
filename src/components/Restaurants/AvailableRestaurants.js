import { useEffect, useState } from 'react';
import RestaurantItem from './RestaurantItem'
import RestaurantCard from './RestaurantCard'
import classes from './AvailableRestaurants.module.css'
// import alibaba from '../../assets/Alibaba.jfif';
// import star from '../../assets/starbriyani.jpg';
// import buharii from '../../assets/buharii.jpg';
// import barbecue from '../../assets/barbecue.jpg';

// const DUMMY_RESTAURANTS = [

//   {
//     id: '1000',
//     name: 'Buhari',
//     place: 'OMR, Chennai',
//     img: buharii,
//   },
//   {
//     id: '1001',
//     name: 'Barbeque Nation',
//     place: 'ECR, Chennai',
//     img: barbecue,
//   },
    
//     {
//       id: '1002',
//       name: 'Star Briyani',
//       place: 'T.nagar, Chennai',
//       img: star,
//     },
    
//     {
//       id: '1003',
//       name: 'Ali Baba',
//       place: 'Annanagar, Chennai',
//       img: alibaba,
//     },
    
//   ];

  const AvailableRestaurants = () => {

    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
      const fetchRestaurants = async () => {
        const response = await fetch(
          'http://localhost:8084/restaurants'
        );
  
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
  
        const responseData = await response.json();

        var obj = {};

        for ( var i=0, len=responseData.length; i < len; i++ ){
            obj[responseData[i].rId.restaurant_id] = responseData[i];
          }

        const loadedResponseRestaurants = [];

        for ( var key in obj ){
          loadedResponseRestaurants.push(obj[key])
        }

        const loadedRestaurants = [];
  
        for (const key in loadedResponseRestaurants) {
          loadedRestaurants.push({
            id: loadedResponseRestaurants[key].rId.restaurant_id,
            name: loadedResponseRestaurants[key].restaurant_name,
            place: loadedResponseRestaurants[key].restaurant_address,
            img: loadedResponseRestaurants[key].restaurant_img,
          });
        }
        setRestaurants(loadedRestaurants);
        setIsLoading(false);
        
      };
  
      fetchRestaurants().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    }, []);

    if (isLoading) {
      return (
        <section className={classes.RestaurantsLoading}>
          <p>Loading...</p>
        </section>
      );
    }
  
    if (httpError) {
      return (
        <section className={classes.RestaurantsError}>
          <p>{httpError}</p>
        </section>
      );
    }

    const restaurantList = restaurants.map((rest) => (
        <RestaurantItem
          key={rest.id}
          id={rest.id}
          name={rest.name}
          place={rest.place}
          img={rest.img}
        />
      ));

      return (
        <section className={classes.restaurants}>
          <RestaurantCard>
            <ul>{restaurantList}</ul>
          </RestaurantCard>
        </section>
      );

  }

  export default AvailableRestaurants;