import React from 'react';
import MainNavContainer from '../main_nav_container';
import ProfileHeaderContainer from './profile_header_container';
import {Route, Switch} from 'react-router-dom';
import FriendsIndexContainer from '../friends/friends_index_container';
import TimelineContainer from './timeline_container';

const UserProfileIndex = () => {
    return (
        <>
            <MainNavContainer />
            <main className="main-content">
                <ProfileHeaderContainer />
                <Switch>
                    <Route path="/users/:userId/friends" component={FriendsIndexContainer} />
                    <Route exact path="/users/:userId" component={TimelineContainer} />
                    <Route path="/users/:userId/timeline" component={TimelineContainer} />
                </Switch>
            </main>
        </>
    );
}

export default UserProfileIndex;