import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FeedsIndexContainer from '../components/feeds/feeds_index_container';

const msp = state => ({
    loggedIn: Boolean(state.session.currentUserId),
});

const Auth = ({ loggedIn, path, component: Component }) => {
    return (
        <Route path={path}
            render={props => (
                loggedIn ? <FeedsIndexContainer {...props} />: <Component {...props} />
            )}
        />
    )
};

const Protected = ({ loggedIn, path, component: Component }) => {
    return (
        <Route path={path}
            render={props => (
                loggedIn ? <Component {...props} /> : <Redirect to="/" />
            )}
        />
    )
};

export const AuthRoute = withRouter(connect(msp)(Auth));
export const ProtectedRoute = withRouter(connect(msp)(Protected));