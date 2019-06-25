import React from 'react';
import MainNavContainer from '../main_nav_container';
import SearchIndexUserItem from "./search_index_user_item";
import SearchIndexPostItem from './search_index_post_item';
import SearchFilters from './search_filters';

class SearchIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          menuSelected: 'All',
          selected: {
            postsFrom: 'all'
          }
        }
        this.filterPosts = this.filterPosts.bind(this);
    }

    componentDidMount() {
        this.props.fetchSearchResults(this.props.searchTerm);
    }

    componentDidUpdate(prevProps) { 
        if (prevProps.searchTerm != this.props.searchTerm) {
            this.props.fetchSearchResults(this.props.searchTerm).then(() => {
              this.setState({menuSelected: 'All', selected: {postsFrom: 'all'}});
            });
        }
    }

    changeMenu(menuVal) {
      return () => {
        let newState = { menuSelected: menuVal };
        if (menuVal !== 'Posts') {
          newState.selected = {postsFrom: 'all'};
        }
        this.setState(newState);
      }
    }

    filterPosts(fieldVal) {
      const that = this;
      return () => {
        that.setState({selected: {postsFrom: fieldVal}});
      }
    }

    render() {
      const {users, posts, currentUser} = this.props;
      let allUsers = [];
      if ( (this.state.menuSelected === "All" ||
                          this.state.menuSelected === "People") && this.state.selected.postsFrom === "all") {
        allUsers = users.map((user, idx) => {
          return (
            <SearchIndexUserItem
              key={idx}
              user={user}
              currentUser={this.props.currentUser}
            />
          );
        });
      }
      let allPosts = [];
      if (this.state.menuSelected !== "People") {
        posts.forEach(post => {
          switch (this.state.selected.postsFrom) {
            case "you":
              if (post.authorId === currentUser.id) {
                allPosts.push(post);
              }
              break;
            case "friends":
              if (currentUser.friendIds.includes(post.authorId)) {
                allPosts.push(post);
              }
              break;
            default:
              allPosts.push(post);
          }
        });
        allPosts = allPosts.map((post, idx) => {
          return <SearchIndexPostItem key={idx} post={post} />;
        });
      }
        return (
          <>
            <div className="main-content profile-main other-page">
              <MainNavContainer />
              <div className="search-menu clearfix">
                <ul>
                  <li
                    className={
                      this.state.menuSelected === "All"
                        ? "selected"
                        : ""
                    }
                    onClick={this.changeMenu("All")}
                  >
                    All
                  </li>
                  <li
                    className={
                      this.state.menuSelected === "Posts"
                        ? "selected"
                        : ""
                    }
                    onClick={this.changeMenu("Posts")}
                  >
                    Posts
                  </li>
                  <li
                    className={
                      this.state.menuSelected === "People"
                        ? "selected"
                        : ""
                    }
                    onClick={this.changeMenu("People")}
                  >
                    People
                  </li>
                </ul>
              </div>
              <div className="profile-content pdng-nav">
                <div className="search-page">
                  <section className="search-sidebar">
                    {this.state.menuSelected !== "People" ? (
                      <SearchFilters
                        selected={this.state.selected}
                        filterPosts={this.filterPosts}
                      />
                    ) : (
                      ""
                    )}
                  </section>
                  <section className="search-results">
                    {allUsers.length > 0 || allPosts.length > 0 ? (
                      <>
                        {allUsers.length > 0 ? (
                          <>
                            <div className="section-heading ">
                              <h1>People</h1>
                            </div>
                            <ul className="search-user-box">
                              {allUsers.length > 0 ? allUsers : ""}
                            </ul>
                          </>
                        ) : (
                          ""
                        )}
                        {(this.state.menuSelected === "All" ||
                          this.state.menuSelected === "Posts") &&
                        allPosts.length > 0 ? (
                          <>
                            <ul className="search-posts-box">
                              <div className="section-heading post-heading">
                                <h1>People Are Saying</h1>
                              </div>
                              {allPosts.length > 0 ? allPosts : ""}
                            </ul>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <div className="no-content">
                        <span className="sad-icon">
                          <i className="fas fa-frown" />
                        </span>
                        <div className="no-results-txt">
                          <span>
                            We couldn't find anything for
                            <b> {this.props.searchTerm} </b>
                          </span>
                          <span className="no-result-txt2">
                            Looking for people or posts? Try entering a
                            name, or different words.
                          </span>
                        </div>
                      </div>
                    )}
                  </section>
                </div>
              </div>
            </div>
          </>
        );
    }
}

export default SearchIndex;;