import React from 'react';
import {useHistory} from 'react-router-dom';
import { useRef, useState } from 'react';

import classes from './Login.module.css';
import AuthApi from '../ContextApis/AuthApi';
import UsernameApi from '../ContextApis/UsernameApi';
import Cookies from 'js-cookie'

const isEmpty = (value) => value.trim() === '';

const Login = () => {
    const Auth = React.useContext(AuthApi);
    const Username = React.useContext(UsernameApi);
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    let history = useHistory();

    const [formInputsValidity, setFormInputsValidity] = useState({
        username: true,
        password: true,
      });

    const usernameInputRef = useRef();
    const passwordInputRef = useRef();

    const confirmHandler = async (event) => {
        console.log('inside confirm handelr..');
        event.preventDefault();
    
        const enteredUsername = usernameInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
    
        const enteredUsernameIsValid = !isEmpty(enteredUsername);
        const enteredPasswordIsValid = !isEmpty(enteredPassword);
    
        setFormInputsValidity({
          username: enteredUsernameIsValid,
          password: enteredPasswordIsValid,
        });
    
        const formIsValid =
            enteredUsernameIsValid &&
            enteredPasswordIsValid 
    
        if (!formIsValid) {
          return;
        }
        // else {
        //     sendIsLoginData(true)
        //     history.push('/exoticMeals');
        // }

        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: enteredUsername,
            password: enteredPassword
          }),
        }
    
        await fetch('http://localhost:8083/secure/auth/loginUser', requestOptions)
          .then(response => response.json())
          .then(data => {
            if(data.userId === enteredUsername){
              setIsUserRegistered(false);
              Auth.setAuth(true);
              Username.setUsername(data.userId);
              Cookies.set("user", enteredUsername)
            }else{ 
              setIsUserRegistered(true);
            }
          });
      };

      const usernameControlClasses = `${classes.control} ${
        formInputsValidity.username ? '' : classes.invalid
      }`;
      const passwordControlClasses = `${classes.control} ${
        formInputsValidity.password ? '' : classes.invalid
      }`;


    return (
        <form className={classes.form} onSubmit={confirmHandler}>
          
          <h1>Welcome to Exotic Meals</h1>
          {isUserRegistered && (<div>
            <h3 className={classes.userExists}>Invalid Credentials!</h3>
          </div>)}
          <div className={usernameControlClasses}>
            <label htmlFor='username'>Username </label>
            <input type='text' id='username' ref={usernameInputRef} />
            {!formInputsValidity.username && <p>Please enter Username!</p>}
          </div>
          <div className={passwordControlClasses}>
            <label htmlFor='password'>Password </label>
            <input type='password' id='password' ref={passwordInputRef} />
            {!formInputsValidity.password && <p>Please enter Password!</p>}
          </div>
          <br></br>
          <div className={classes.actions}>
            <button className={classes.submit}>Login</button>
            <button type="register" 
                onClick= {() => {
                    history.push('/register');
                }}
                >Register</button>
            <button type="reset">Reset</button> 
          </div>
        </form>
      );
}

export default Login;