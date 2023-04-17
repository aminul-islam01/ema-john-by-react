import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Providers/AuthProviders';

const SignUp = () => {
    const { createUser, emailVerified } = useContext(UserContext);

    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then((result) => {
                const loggedUser = result.user;
                loggedUser.displayName = name;

                emailVerified()
                    .then(() => {
                        alert('check your email and verification this email')
                    });

                console.log(loggedUser)
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });

    }

    return (
        <div className="form-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleRegister}>
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