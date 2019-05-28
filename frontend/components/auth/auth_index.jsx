import React from 'react';
import LoginFormContainer from './login_form_container';
import SignupFormContainer from './signup_form_container';

const AuthIndex = () => {
    return (
        <>
        <div>Welcome to the Auth Page</div>
        <LoginFormContainer />
        <SignupFormContainer />
        </>
    );
};

export default AuthIndex;