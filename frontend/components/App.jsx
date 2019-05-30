import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_utils';
import AuthIndex from '../components/auth/auth_index';
import { Route } from 'react-router-dom';
import LoginPageFormContainer from './auth/login_page_form_container';
import SignupFormIndex from './auth/signup_form_index';

const App = () => {
    return (
        <div>
            <AuthRoute path="/login" component={LoginPageFormContainer} />
            <AuthRoute path="/signup" component={SignupFormIndex} />
            <AuthRoute exact path="/" component={AuthIndex} />
        </div>
    )
};

export default App;