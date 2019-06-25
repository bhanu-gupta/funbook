import React from "react";
import { formatDate } from "../../util/date_util";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const SearchIndexPostItem = ({post, author, user}) => {
    const { body, createdAt, photoUrls } = post;
    const all_photos = photoUrls
      ? photoUrls.slice(0, 1).map((photoUrl, idx) => {
          return (
            <figure key={idx}>
              <img src={photoUrl} />
            </figure>
          );
        })
      : "";
    return (
      <li className="section-box">
        <section className="single-post">
          <div className="post-text">
            <figure className="profile-pic">
              <Link to={`/users/${author.id}`}>
                <img
                  src={
                    author.profilePhoto
                      ? author.profilePhoto
                      : window.defaultUser
                  }
                />
              </Link>
            </figure>
            <div className="post-info">
              <div className="post-user">
                <span>
                  <Link to={`/users/${author.id}`}>{`${author.firstName} ${
                    author.lastName
                  } `}</Link>
                </span>
                {author.id !== user.id ? (
                  <>
                    <i className="fas fa-caret-right" />
                    <span>
                      <Link to={`/users/${user.id}`}>{`${user.firstName} ${
                        user.lastName
                      } `}</Link>
                    </span>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="post-desc">
            <div className="post-body">
              <span className="post-date">{formatDate(createdAt)}</span>
              {body}
            </div>
            <div className="search-photo-gallery">{all_photos}</div>
          </div>
        </section>
      </li>
    );
}

const msp = (state, ownProps) => {
    const authorId = ownProps.post.authorId;
    const userId = ownProps.post.userId;
    const postId = ownProps.post.id;
    return {
        author: state.entities.users[authorId] || {},
        user: state.entities.users[userId] || {},
        totalComments: state.entities.posts[postId].commentIds.length
    }
}

export default connect(msp)(SearchIndexPostItem);
