import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NewsFeedContainer from '../components/news_feed/news_feed_container';

const msp = state => ({
    loggedIn: Boolean(state.session.currentUserId),
});

const Auth = ({ loggedIn, path, component: Component }) => {
    return (
        <Route exact path={path}
            render={props => (
                loggedIn ? <NewsFeedContainer {...props} />: <Component {...props} />
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