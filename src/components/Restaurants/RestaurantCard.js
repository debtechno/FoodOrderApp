import classes from './RestaurantCard.module.css'

const RestaurantCard = props => {
    return <div className={classes.card}>{props.children}</div>
  };
  
  export default RestaurantCard;