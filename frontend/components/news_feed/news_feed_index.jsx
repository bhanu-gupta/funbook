import React from 'react';
import PostsIndexContainer from '../posts/posts_index_container';
import Modal from '../modal';
import MainNavContainer from '../main_nav_container';
import CreatePostFormContainer from '../posts/create_post_form_container';

const NewsFeedIndex = (props) => {
    return (
        <>
            <Modal />
            <MainNavContainer />
            <main className="main-content profile-main">
                <div className="profile-content">
                    <div className="profile-middle">
                        <CreatePostFormContainer />
                        <PostsIndexContainer />
                    </div>
                </div>
            </main>
        </>
    );
}

export default NewsFeedIndex;