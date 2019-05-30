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
        <main className="main-content no-pdn">
            <div className="auth-content">
                <AuthInfo />
                    <section className="auth-signup-section">
                        <h2>Sign Up</h2>
                        <h3>It's free and always will be.</h3>
                        <SignupFormContainer />
                        <div className="create_page"><a href="#">Create a Page</a> for a celebrity, band or business.</div>
                    </section>
            </div>
        </main>
        </>
    );
};

export default AuthIndex;