import React, { useContext, useState,useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from 'axios';
import Register from './componets/Register';
import Profil from './componets/Profil';
import AuthContext from './context/AuthContext';
import ForgotPassword from './componets/ForgotPassword';
import ResetPassword from './componets/ResetPassword';
import ProtectedRoute from './componets/ProtectedRoute';

function Router() {

  
    const [auth, setAuth] = useState();
    const {loggedIn} = useContext(AuthContext);
   

  
//console.log(auth)
console.log('loggedIn -- '+loggedIn)

return (
        <BrowserRouter> 
        <Switch>
            {loggedIn === false && (
<>
<Route exact path="/" component={Register} />
                  
<Route exact path="/forgot" component={ForgotPassword} />
       
<Route exact path="/reset/:token"  component={ResetPassword}/>
</>
            )}
    

    {loggedIn === true  && (
        <>
                
                <Route exact path="/profil" component={Profil} loggedIn={loggedIn} />
                </>  
    )}      
       
        </Switch>   
        </BrowserRouter>
    );
}
    
export default Router;





/*


 return (
        <BrowserRouter> 
        <Switch>
            {loggedIn === false && (
<>
<Route exact path="/" component={Register} />
                  
<Route exact path="/forgot" component={ForgotPassword} />
       
<Route exact path="/reset/:token"  component={ResetPassword}/>
</>
            )}
    

    {loggedIn === true  && (
        <>
                
                <ProtectedRoute exact path="/profil" component={Profil} loggedIn={loggedIn} />
                </>  
    )}      
       
        </Switch>   
        </BrowserRouter>
    );*/