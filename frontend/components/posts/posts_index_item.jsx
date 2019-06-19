import React from 'react';
import {formatDate} from '../../util/date_util';
import {Link} from 'react-router-dom';
import CommentsIndex from '../comments/comments_index';
import EditPostFormContainer from './edit_post_form_container';
import { logoutCurrentUser } from '../../actions/auth_actions';

class PostsIndexItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayEditForm: false,
            displayPostOptions: false
        }
    }

    render() {
        const {body, createdAt, id, photoUrls} = this.props.post;
        const { author, user, comments, deletePost, currentUserId} = this.props;
        const all_photos = photoUrls ? photoUrls.slice(0, 5).map((photoUrl, idx) => {
            return (
                <figure key={idx}>
                    <img src={photoUrl}/>
                </figure>
            );
        }) : "";
        return (
            <li className="section-box">
                <section className="single-post">
                    <div className="post-text">
                        <figure className="profile-pic">
                            <Link to={`/users/${author.id}`}><img src={author.profilePhoto ? author.profilePhoto : window.defaultUser} /></Link>
                        </figure>
                        <div className="post-info">
                            <div className="post-user">
                                <span><Link to={`/users/${author.id}`}>{`${author.firstName} ${author.lastName} `}</Link></span>
                                {author.id !== user.id ? (
                                    <>
                                    <i className="fas fa-caret-right"></i>
                                    <span><Link to={`/users/${user.id}`}>{`${user.firstName} ${user.lastName} `}</Link></span>
                                    </>
                                ) : ""}
                            </div>
                            <div>
                                <span>{formatDate(createdAt)}</span>
                                <i className="fas fa-user-friends"></i>
                            </div>
                        </div>
                        {(author.id === currentUserId || user.id === currentUserId) ? (
                            <>
                                <div
                                    className="more-actions"
                                    onClick={() => this.setState({ displayPostOptions: !this.state.displayPostOptions })}
                                >
                                    ...
                                    {this.state.displayPostOptions ? (
                                        <ul className="bottom-dropdown post-actions-dropdown">
                                            {author.id === currentUserId ? (
                                                <li>
                                                    <i></i>
                                                    <span onClick={() => this.setState({ displayEditForm: true })}>Edit Post</span>
                                                </li>
                                            ): ""}
                                            <li>
                                                <i></i>
                                                <span onClick={() => deletePost(id)}>Delete</span>
                                            </li>
                                        </ul>
                                    ) : ""}
                                </div>
                            </>
                        ) : ""}
                        {this.state.displayEditForm ? <EditPostFormContainer post={this.props.post}/>: ""}
                    </div>
                    <div className="post-body">{body}</div>
                </section>
                <div className="post-photo-gallery">
                    {all_photos}
                </div>
                <CommentsIndex comments={comments} postId={id} isFriend={this.props.isFriend} totalComments={this.props.totalComments}/>
            </li>
        );

    }

}

export default PostsIndexItem;