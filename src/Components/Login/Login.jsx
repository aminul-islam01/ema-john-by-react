import React, { useContext } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Providers/AuthProviders';



const Login = () => {
    const {loginUser} = useContext(UserContext);
    const Navigate = useNavigate();
    const location = useLocation();
    // console.log(location)
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        loginUser(email, password)
        .then((result) => {
            const loggedUser = result.user;
            form.reset();
            Navigate(from, {replace: true})
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
          });
        
    }

    return (
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="text" placeholder="password" name="password" required />
                </div>
                <div>
                    <button className="btn-login">Login</button>
                </div>
                <p className='link-btn'>New to Ema-John?
                    <Link to="/sign-up">Create New Account</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;