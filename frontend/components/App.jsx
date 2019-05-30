import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_utils';
import AuthIndex from '../components/auth/auth_index';
import { Route } from 'react-router-dom';
import LoginPageFormContainer from './auth/login_page_form_container';
import SignupPageForm from './auth/signup_page_form';

const App = () => {
    return (
        <div>
            <AuthRoute path="/login" component={LoginPageFormContainer} />
            <AuthRoute path="/signup" component={SignupPageForm} />
            <AuthRoute exact path="/" component={AuthIndex} />
        </div>
    )
};

export default App;