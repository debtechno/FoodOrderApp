import classes from './RestaurantItem.module.css'
import {useHistory} from 'react-router-dom';
import AuthApi from '../ContextApis/AuthApi';
import UsernameApi from '../ContextApis/UsernameApi';
import React from 'react';
import RestaurantNameApi from '../ContextApis/RestaurantNameApi';
import Cookies from 'js-cookie'

const RestaurantItem = (props) => {
    const Auth = React.useContext(AuthApi);
    const Username = React.useContext(UsernameApi);
    const RestaurantName = React.useContext(RestaurantNameApi);
    let history = useHistory();
   
    const openRestaurantItems = () => {
        let id = props.id
        console.log('id...',id);
        // Auth.setAuth(true);
        RestaurantName.setRestaurantName(props.name);
        Cookies.set("rName", props.name);
        //  history.push('/restaurants/'+id);
        history.push('/check/'+id);
      }
    return (
        <li className={classes.restaurant}>
            <div>
                {/* <h3><img src={props.img} alt="Restaurnat" onClick={openRestaurantItems}/></h3> */}
                <h3><button onClick={openRestaurantItems}>{props.name}</button></h3>
                <div className={classes.place}>{props.place}</div>
            </div>
        </li>
        
    )
}

export default RestaurantItem;