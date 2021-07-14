import React from 'react';
import {useHistory} from 'react-router-dom';
import { useRef, useState } from 'react';
import classes from './Registration.module.css';


const isEmpty = (value) => value.trim() === '';
const isTenChars = (value) => value.trim().length === 10;

function Registration () {
    let history = useHistory();

    const [isSuccessful, setIsSuccessful] = useState(false);
    const [userExists, setUserExists] = useState('');
    const [isUserExists, setIsUserExists] = useState(false);
    const [formInputsValidity, setFormInputsValidity] = useState({
        userId: true,
        email: true,
        phonenumber: true,
        password: true,
      });

    const usernameInputRef = useRef();
    const emailInputRef = useRef();
    const phonenumberInputRef = useRef();
    const passwordInputRef = useRef();

    const confirmHandler = async (event) => {

        event.preventDefault();
    
        const enteredUsername = usernameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPhonenumber = phonenumberInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
    
        const enteredUsernameIsValid = !isEmpty(enteredUsername);
        const enteredEmailIsValid = !isEmpty(enteredEmail);
        const enteredPhonenumberIsValid = isTenChars(enteredPhonenumber);
        const enteredPasswordIsValid = !isEmpty(enteredPassword);
    
        setFormInputsValidity({
          userId: enteredUsernameIsValid,
          email: enteredEmailIsValid,
          phonenumber: enteredPhonenumberIsValid,
          password: enteredPasswordIsValid,
        });
        
        const formIsValid =
            enteredUsernameIsValid &&
            enteredEmailIsValid &&
            enteredPhonenumberIsValid &&
            enteredPasswordIsValid;
    
        if (!formIsValid) {
          return;
        }
    
    //     props.onConfirm({
    //       name: enteredName,
    //       street: enteredStreet,
    //       city: enteredCity,
    //       postalCode: enteredPostalCode,
    //     });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: enteredUsername,
        //email: enteredEmail,
        //phonenumber: enteredPhonenumber,
        password: enteredPassword
      }),
    }

    await fetch('http://localhost:8083/secure/auth/user/add', requestOptions)
      .then(res => {
        if(res.status === 200){
        setIsSuccessful(true);
        setIsUserExists(false);
        }
        if(res.status === 500){
          setUserExists(enteredUsername);
          setIsSuccessful(false);
          setIsUserExists(true);
        }
    }
    );
  
    
    };

      const usernameControlClasses = `${classes.control} ${
        formInputsValidity.username ? '' : classes.invalid
      }`;
      const emailControlClasses = `${classes.control} ${
        formInputsValidity.email ? '' : classes.invalid
      }`;
      const phonenumberControlClasses = `${classes.control} ${
        formInputsValidity.phonenumber ? '' : classes.invalid
      }`;
      const passwordControlClasses = `${classes.control} ${
        formInputsValidity.password ? '' : classes.invalid
      }`;




    return (
        <form className={classes.form} onSubmit={confirmHandler}>          
            <h1>Sign Up</h1>
            {isSuccessful && (<div>
            <h3 className={classes.successful}>User Added Successfully!</h3>
          </div>)}
          {isUserExists && (<div>
            <h3 className={classes.userExists}>User with {userExists} already exists!</h3>
          </div>)}
          <div className={usernameControlClasses}>
            <label htmlFor='username'>Username</label>
            <input type='text' id='name' ref={usernameInputRef} />
            {!formInputsValidity.userId && <p>Please enter username!</p>}
          </div>
          <div className={emailControlClasses}>
            <label htmlFor='email'>Email Id</label>
            <input type='text' id='email' ref={emailInputRef} />
            {!formInputsValidity.email && <p>Please enter email!</p>}
          </div>
          <div className={phonenumberControlClasses}>
            <label htmlFor='phonenumber'>Phone Number</label>
            <input type='text' id='phonenumber' ref={phonenumberInputRef} />
            {!formInputsValidity.phonenumber && (
              <p>Please enter a valid phone number (10 characters long)!</p>
            )}
          </div>
          <div className={passwordControlClasses}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' ref={passwordInputRef} />
            {!formInputsValidity.password && <p>Please enter password!</p>}
          </div>
          <div className={classes.actions}>
            <button className={classes.submit}>Save</button>
            <button type="register" 
                onClick= {() => {
                    history.push('/login');
                }}
                >Back To Login</button>
            <button type="reset">Reset</button> 
          </div>
        </form>
      );

}

export default Registration;