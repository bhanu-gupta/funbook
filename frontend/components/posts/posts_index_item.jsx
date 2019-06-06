import React from 'react';
import {formatDate} from '../../util/date_util';
import {Link} from 'react-router-dom';
import CommentsIndex from '../comments/comments_index';

const PostsIndexItem = (props) => {
    const {body, createdAt, id} = props.post;
    const {author, user, comments} = props;
    return (
        <li className="section-box">
            <section className="single-post">
                <div className="post-text">
                    <figure className="profile-pic">
                        <Link to={`/users/${author.id}`}><img src={author.profilePhoto} /></Link>
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
                </div>
                <div className="post-body">{body}</div>
            </section>
            <CommentsIndex comments={comments} postId={id} isFriend={props.isFriend}/>
        </li>
    );
}

export default PostsIndexItem;