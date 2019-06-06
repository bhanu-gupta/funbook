import React from 'react';
import { formatDate } from '../../util/date_util';
import {Link} from 'react-router-dom';
import CreateCommentFormContainer from './create_comment_form_container';
import EditCommentFormContainer from './edit_comment_form_container';
import CommentsIndexItemContainer from './comments_index_item_container';

class CommentsIndexItem extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            editComment: false,
            replyComment: false,
            displayEditTooltip: false,
            displayCommentDropdown: false
        }
        this.editComment = this.editComment.bind(this);
    }

    editComment() {
        this.setState({ editComment : true});
    }

    toggleTooltip() {

    }

    render() {
        const {comment, author, currentUser} = this.props;
        let subComments = [];
        if (comment.subComments && comment.subComments.length > 0) {
            subComments = comment.subComments.map((subComment, idx) => {
                return <CommentsIndexItemContainer key={idx} comment={subComment} isFriend={this.props.isFriend}/>
            })
        }
        let replyCommentForm = [];
        if (this.props.isFriend && !comment.parentId) {
            replyCommentForm = <CreateCommentFormContainer postId={comment.postId} parentId={comment.parentId ? comment.parentId : comment.id} />;
            if(!comment.parentId) {
                replyCommentForm = (<div className="reply-comment">{replyCommentForm}</div>);
            }
        }
        return this.state.editComment ? <EditCommentFormContainer comment={comment}/> : (
            <>
                <li>
                    <div className="comment-info">
                        <figure className="profile-pic">
                            <Link to={`/users/${author.id}`}><img src={author.profilePhoto} /></Link>
                        </figure>
                        <div className="comment-text">
                            <div className="comment-display">
                                <div className="comment-body">
                                    <Link className="comment-author" to={`/users/${author.id}`}>{`${author.firstName} ${author.lastName}`}</Link>
                                {comment.body}
                                </div>
                                {author.id === currentUser.id ? (
                                    <>
                                        <div 
                                            className="more-actions" 
                                            onClick={() => this.setState({ displayCommentDropdown: !this.state.displayCommentDropdown})}
                                             >
                                        ...
                                        {this.state.displayEditTooltip ? (
                                                <div className="bottom-dropdown">
                                                    <span>Edit or delete this</span>
                                                </div>
                                            ) : ""}
                                            {this.state.displayCommentDropdown ? (
                                                <ul className="bottom-dropdown comment-dropdown">
                                                    <li>
                                                        <i></i>
                                                        <span onClick={this.editComment}>Edit...</span>
                                                    </li>
                                                    <li>
                                                        <i></i>
                                                        <span onClick={() => this.props.deleteComment(comment.id)}>Delete...</span>
                                                    </li>
                                                </ul>
                                            ) : ""}
                                        </div>
                                    </>
                                ) : ""}
                            </div>
                            <div className="comment-actions">
                                {this.props.isFriend ? (
                                    <>
                                        <span><Link to="#">Like</Link></span>
                                        <span className="separator">.</span>
                                        <span><Link to="#">Reply</Link></span>
                                        <span className="separator">.</span>
                                    </>
                                ) : ""}
                                <span><Link to="#">{formatDate(comment.createdAt)}</Link></span>
                            </div>
                        </div>
                    </div>
                </li>
                {subComments.length > 0 ? (
                    <div className="reply-comment">
                        {subComments}
                    </div>) : ""}
                {replyCommentForm}
            </>
        );
    }
}

export default CommentsIndexItem;