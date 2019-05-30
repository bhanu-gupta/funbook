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
        <main className="main-content">
            <div className="middle-section">
                <div className="login_form_section" >
                    <SignupFormContainer />
                </div>
            </div>
        </main>
        </>
    );
}