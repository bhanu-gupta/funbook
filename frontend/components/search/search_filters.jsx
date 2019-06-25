import React from 'react';

class SearchFilters extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
            <h1>Filter Results</h1>
            <ul className="all-filters">
              <li className="filter-box">
                <h2>POSTS FROM</h2>
                <fieldset id="posts_from">
                  <label htmlFor="all">
                    <input
                      type="radio"
                      name="posts_from"
                      id="all"
                      checked={
                        this.props.selected.postsFrom === "all"
                          ? "checked"
                          : ""
                      }
                      onChange={this.props.filterPosts("all")}
                    />
                    Anyone
                  </label>
                  <label htmlFor="you">
                    <input
                      type="radio"
                      name="posts_from"
                      id="you"
                      checked={
                        this.props.selected.postsFrom === "you"
                          ? "checked"
                          : ""
                      }
                      onChange={this.props.filterPosts("you")}
                    />
                    You
                  </label>
                  <label htmlFor="friends">
                    <input
                      type="radio"
                      name="posts_from"
                      id="friends"
                      checked={
                        this.props.selected.postsFrom === "friends"
                          ? "checked"
                          : ""
                      }
                      onChange={this.props.filterPosts("friends")}
                    />
                    Your Friends
                  </label>
                </fieldset>
              </li>
            </ul>
            </>
        );
    }
}

export default SearchFilters;