import React from 'react';
import SignupFormContainer from './signup_form_container';
import {Link} from 'react-router-dom';
import LoginFormContainer from './login_form_container';

export default () => {
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
            <div className="middle-section">
                <div className="signup-form-section" >
                    <section className="auth-signup-section">
                        <h2>Create a New Account</h2>
                        <h3>It's free and always will be.</h3>
                            <SignupFormContainer />
                        </section>
                </div>
            </div>
        </main>
        </>
    );
}