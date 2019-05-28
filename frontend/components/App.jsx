import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_utils';
import AuthIndex from '../components/auth/auth_index';
import { Route } from 'react-router-dom';

const App = () => {
    return (
        <div>
            <h1>Funbook</h1>
            <AuthRoute path="/" component={AuthIndex} />
        </div>
    )
};

export default App;