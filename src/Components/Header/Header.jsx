import React, { useContext } from 'react';
import './Header.css'
import logo from '../../images/Logo.svg'
import { Link } from 'react-router-dom';
import { UserContext } from '../../Providers/AuthProviders';

const Header = () => {
    const { user, setUser, logOut } = useContext(UserContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { 
                setUser(null)
            })
            .catch(error => console.error(error))
    }

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shops</Link>
                <Link to="/orders">Order</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/sign-up">SignUp</Link>
                {
                    user && <span className='user'>Well come {user.email} <button onClick={logOut}>Log Out</button></span>
                }
            </div>
        </nav>
    );
};

export default Header;