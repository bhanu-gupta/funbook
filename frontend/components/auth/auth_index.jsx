import React from 'react';
import LoginFormContainer from './login_form_container';
import SignupFormContainer from './signup_form_container';
import AuthInfo from './auth_info';
import {Link} from 'react-router-dom';

const AuthIndex = () => {
    return (
        <>
        <header className="auth-header">
            <nav className="auth-nav">
                <h1>
                    <Link to="/">
                        <i></i>
                    </Link>
                </h1>
                <LoginFormContainer />
            </nav>
        </header>
        <main className="main-content">
            <AuthInfo />
            <SignupFormContainer />
        </main>
        </>
    );
};

export default AuthIndex;