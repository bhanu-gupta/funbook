import React from 'react';

const PostsIndexItem = (props) => {
    const {body, createdAt, updatedAt} = props.post;
    let updatedTime = "";
    if (createdAt !== updatedAt) {
        updatedTime = formatDateTime(this.props.report.updatedAt);
    }
    return (
        <li>
            <span>{`${props.author.firstName} ${props.author.lastName} `}</span>
            <span>{`${props.user.firstName} ${props.user.lastName} `}</span>
            <span>{formatDate(createdAt)}</span>
            <span>{formatTime(createdAt)}</span>
            <span>{updatedTime}</span>
            <div>{body}</div>
        </li>
    );
}

export default PostsIndexItem;