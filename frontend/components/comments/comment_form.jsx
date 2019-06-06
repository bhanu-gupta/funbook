import React from 'react';
import {Link} from 'react-router-dom';
import CommentsIndexItemContainer from './comments_index_item_container';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: props.comment.body || '',
            showForm: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.comment  = props.comment;
    }

    handleSubmit(e) {
        if (event.keyCode === 13) {
            e.preventDefault();
            if (this.state.body) {
                const commentForm = {
                    body: this.state.body,
                    parent_id: this.props.comment.parentId,
                    post_id: this.props.comment.postId
                }
                if (this.props.formType === 'edit') {
                    commentForm.commentId = this.props.comment.id;
                    this.comment.body = this.state.body;
                    this.props.processForm(commentForm).then(() => {
                        this.setState({ showForm: false});
                    })
                } else {
                    this.props.processForm(commentForm).then(() => {
                        const showForm = commentForm.parentId ? false : true;
                        this.setState({showForm, body: ''});
                    });
                }
            }
        }
    }

    updateField(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.value })
        }
    }

    render() {
        const { currentUser} = this.props;
        return (
            <>
                {this.state.showForm ? (
                    <li>
                        <div className="comment-form">
                            <figure className="profile-pic">
                                <Link to={`/users/${currentUser.id}`}><img src={currentUser.profilePhoto} /></Link>
                            </figure>
                            <form>
                                <textarea
                                    name="body"
                                    id="body"
                                    value={this.state.body}
                                    onChange={this.updateField('body')}
                                    placeholder="Write a comment..."
                                    onKeyUp={this.handleSubmit}>
                                </textarea>
                            </form>
                        </div>
                    </li>
                ) : (this.props.formType === 'edit') ? 
                (<CommentsIndexItemContainer comment={this.comment} isFriend={true} />) 
                : ""}
            </>
        )
    }
}

export default CommentForm;