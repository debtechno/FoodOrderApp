import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Redirect} from 'react-router';
import Login  from './components/Login/Login';
import Registration from './components/Login/Registration'
import LandingPage from './components/LandingPage'
import { useState } from 'react';
import MealsListAndHeader from './components/Restaurants/MealsListAndHeader'
import AvailableMeals from './components/Meals/AvailableMeals'
import AuthApi from './components/ContextApis/AuthApi';
import UsernameApi from './components/ContextApis/UsernameApi';
import Check from './components/Restaurants/Check';
import RestaurantNameApi from './components/ContextApis/RestaurantNameApi';

function ReactRouter () {
  const Auth = React.useContext(AuthApi)
  const Username = React.useContext(UsernameApi)
  const RestaurantName = React.useContext(RestaurantNameApi)

  return (
        <Router>
          <Switch>
            <ProtectedLogin exact path="/login" component={Login}   auth={Auth.auth} username={Username.username} />
            <Route exact path="/register" component= {Registration} />
            <ProtectedRoute path="/restaurants" component={LandingPage} auth={Auth.auth}  username={Username.username} restaurantName={RestaurantName.restaurantName}/>
            {/* <Protected path="/restaurants/:id" component= {MealsListAndHeader}/> */}
            <Route exact path="/check/:id" component={Check} restaurantName={RestaurantName.restaurantName} />
            <Redirect from='/' to="/login" />
          </Switch>
        </Router>
    )
}

const ProtectedRoute = ({auth, component: Component, ...rest}) => {
  return(
    <Route 
    {...rest}
    render = {() =>auth? (
      <Component />
    ):
    (
      <Redirect to="/login" />
    )
  }
    />
  )
}

const ProtectedLogin = ({auth, component: Component, ...rest}) => {
  return(
    <Route 
    {...rest}
    render = {() => !auth? (
      <Component />
    ):
    (
      <Redirect to="/restaurants" />
    )
  }
    />
  )
}

export default ReactRouter;