import React from 'react';
import CommentsIndexItemContainer from './comments_index_item_container';
import CreateCommentFormContainer from './create_comment_form_container';
import { isEmpty } from 'lodash';

const CommentsIndex = (props) => {
    let all_comments = [];
    if (!isEmpty(props.comments)) {
        if (typeof props.comments === 'object') {
            all_comments = Object.keys(props.comments) ;
            all_comments = all_comments.map((id) => {
                return <CommentsIndexItemContainer key={id} comment={props.comments[id]} isFriend={props.isFriend}/>;
            });
        } else {
            all_comments = props.comments;
            all_comments = all_comments.map((comment) => {
                return <CommentsIndexItemContainer key={id} comment={comment} isFriend={props.isFriend}/>;
            })
        }
    }
    const commentsLength = props.totalComments;
    const commentText = (commentsLength === 1) ? '1 Comment' : `${commentsLength} Comments`;
    return (
        <div className="all-comments">
            {commentsLength > 0 ? (
                <div className="comment-display">
                    <span></span>
                    <span>{commentText}</span>
                </div>
            ) : ""}
            <ul className="comments-nav">
                {props.isFriend ? (
                    <>
                        {/* <li>
                            <i className="fas fa-thumbs-up"></i>
                            <span>Like</span>
                        </li> */}
                        <li onClick={() => document.getElementById(`comment-${props.postId}`).focus()}>
                            <i className="far fa-comment-alt"></i>
                            <span>Comment</span>
                        </li>
                    </>
                ) : ""}
                {/* <li>
                    <i className="fas fa-share"></i>
                    <span>Share</span>
                </li> */}
            </ul>
            <ul className="single-comment">
                {all_comments}
                {props.isFriend ? (<CreateCommentFormContainer postId={props.postId} />) : ""}
            </ul>
        </div>
    )
}

export default CommentsIndex;