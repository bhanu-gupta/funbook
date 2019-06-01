import React from 'react';
import CreatePostFormContainer from '../posts/create_post_form_container';
import MainNavContainer from '../main_nav_container';
import PostsIndexContainer from '../posts/posts_index_container';

const UserProfileIndex = () => {
    return (
        <>
        <MainNavContainer />
        <main className="main-content">
            <CreatePostFormContainer />
            <PostsIndexContainer />
        </main>
        </>
    );
}

export default UserProfileIndex;