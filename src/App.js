import ReactRouter from './ReactRouter';
import AuthApi from './components/ContextApis/AuthApi';
import React from "react"
import Cookies from 'js-cookie'
import UsernameApi from './components/ContextApis/UsernameApi';
import RestaurantNameApi from './components/ContextApis/RestaurantNameApi';

function App() {
  
  const [auth, setAuth] = React.useState(false);
  const[username, setUsername] = React.useState('');
  const[restaurantName, setRestaurantName] = React.useState('');

  const readCookie = () => {
    const user = Cookies.get("user");
    const rName = Cookies.get("rName");
    if(user){
      setAuth(true);
      setUsername(user);
      setRestaurantName(rName);
    }
  }

  React.useEffect(() => {
    readCookie();
  }, [])
  

  return (
     <AuthApi.Provider value={{auth, setAuth}}>
       <UsernameApi.Provider value={{username, setUsername}}>
         <RestaurantNameApi.Provider value={{restaurantName, setRestaurantName}}>
    <ReactRouter />
    </RestaurantNameApi.Provider>
    </UsernameApi.Provider>
    </AuthApi.Provider>
  )
}

export default App;
