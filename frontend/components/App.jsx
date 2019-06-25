import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_utils';
import AuthIndex from '../components/auth/auth_index';
import { Route } from 'react-router-dom';
import LoginPageFormContainer from './auth/login_page_form_container';
import SignupPageForm from './auth/signup_page_form';
import UserProfileIndex from './user_profile/user_profile_index';
import FriendRequestsContainer from './friends/friend_requests_container';
import SearchIndexContainer from './search/search_index_container';

const App = () => {
    return (
        <div>
            <AuthRoute path="/login" component={LoginPageFormContainer} />
            <AuthRoute path="/signup" component={SignupPageForm} />
            <Route path="/users/:userId" component={UserProfileIndex} />
            <AuthRoute path="/signup" component={SignupPageForm} />
            <Route path="/search/:searchTerm" component={SearchIndexContainer} />
            <AuthRoute exact path="/" component={AuthIndex} />
            <ProtectedRoute path="/friends/requests" component={FriendRequestsContainer} />
        </div>
    )
};

export default App;