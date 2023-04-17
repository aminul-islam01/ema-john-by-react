import React, { useContext } from 'react';
import { UserContext } from '../Providers/AuthProviders';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const {user, loading} = useContext(UserContext);
    const location = useLocation();
    // console.log(location)

    if(loading){
        return <h2>Loading...</h2>
    }else if(user){
        return children;
    }else {
        return <Navigate to="/login" state={{ from: location }} replace ></Navigate>;
    }
};

export default PrivateRoute;