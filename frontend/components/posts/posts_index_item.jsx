import React from 'react';
import {formatDate} from '../../util/date_util';
import {Link} from 'react-router-dom';
import CommentsIndex from '../comments/comments_index';
import EditPostFormContainer from './edit_post_form_container';

class PostsIndexItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayEditForm: false,
            displayPostOptions: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal(e) {
        this.setState({ displayEditForm: false })
    }

    openModal(e) {
        this.setState({ displayEditForm: true })
    }

    render() {
        const {body, createdAt, id, photoUrls} = this.props.post;
        const { author, user, comments, deletePost, currentUserId, type, profileInfo} = this.props;
        const all_photos = photoUrls ? photoUrls.slice(0, 5).map((photoUrl, idx) => {
            return (
              <figure>
                <img key={idx} src={photoUrl} />
              </figure>
            );
        }) : "";
        const photosClass = "post-photo-gallery "  + (all_photos.length === 1 ? "one-col" : "");
        let createdDate = createdAt;
        if (type === 'birth') {
            createdDate = profileInfo.birthday;
        }
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
                                <span>{formatDate(createdDate)}</span>
                                <i className="fas fa-user-friends"></i>
                            </div>
                        </div>
                        {(author.id === currentUserId || user.id === currentUserId) && type !== 'birth' ? (
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
                                                    <span onClick={this.openModal}>Edit Post</span>
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
                        {this.state.displayEditForm ? <EditPostFormContainer post={this.props.post} closeModal={this.closeModal}/>: ""}
                    </div>
                    <div className="post-body">{type === 'birth' ? (
                        <div className="born-post">
                            <div className="baby-icon">
                                <i className="fas fa-baby"></i>
                            </div>
                            <span>Born on {formatDate(createdDate)}</span>
                        </div>
                    ) : body}
                        </div>
                </section>
                {type !== 'birth' ? (
                    <>
                    <div className={photosClass}>
                        {all_photos}
                    </div>
                    <CommentsIndex comments={comments} postId={id} isFriend={this.props.isFriend} totalComments={this.props.totalComments}/>
                    </>
                ) : ""}
            </li>
        );

    }

}

export default PostsIndexItem;