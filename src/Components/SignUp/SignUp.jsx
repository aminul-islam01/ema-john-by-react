import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <div className="form-container">
            <h1>Sign Up</h1>
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
                    <label htmlFor="ConfirmPassword">Confirm Password</label>
                    <input type="text" placeholder="Confirm Password" name="ConfirmPassword" required />
                </div>
                <div>
                    <button className="btn-login">Sign Up</button>
                </div>
                <p className='link-btn'>Already have an account?
                    <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default SignUp;