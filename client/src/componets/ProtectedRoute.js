import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";


//console.log(loggedIn)

const ProtectedRoute = ({component: Component, loggedIn, ...rest}) =>(
    
    <Route {...rest} render={(props) => (
        loggedIn === true
        ? <Component {...props} />
        :<Redirect to='/'/>
    )} />

)

export default ProtectedRoute;