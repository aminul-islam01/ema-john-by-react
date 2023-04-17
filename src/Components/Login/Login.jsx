import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'



const Login = () => {
    return (
        <div className="form-container">
            <h1>Login</h1>
            <form>
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