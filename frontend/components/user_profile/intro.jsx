import React from 'react';
import {Link} from 'react-router-dom';
import EditIntroForm from './bio_form';

class Intro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayEditForm: false,
            displayEditIcon: false
        }
        this.hideEditForm = this.hideEditForm.bind(this);
        this.showEditForm = this.showEditForm.bind(this);
    }

    hideEditForm() {
        this.setState({displayEditForm: false});
    }

    showEditForm() {
        this.setState({displayEditForm: true});
    }

    render() {
        const {profileInfo, currentUser} = this.props;
        return (
          <>
            {profileInfo.bio || currentUser.id === profileInfo.id ? (
              <section className="sidebar-section intro-section">
                <header>
                  <i className="fas fa-globe-americas sidebar-icon globe-icon" />
                  <h1>Intro</h1>
                </header>
                {this.state.displayEditForm === false ? (
                  <div className="profile-bio">
                    {profileInfo.bio ? (
                      <>
                        {profileInfo.bio}
                        {currentUser.id === profileInfo.id ? (
                          <i
                            className="fas fa-pen edit-icon"
                            onClick={this.showEditForm}
                          />
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <>
                        <i className="far fa-comment-alt comment-icon" />
                        <span className="add-bio-txt">
                          Add a short bio to tell people more about
                          yourself.
                        </span>
                        <Link to="#" onClick={this.showEditForm}>
                          Add Bio
                        </Link>
                      </>
                    )}
                  </div>
                ) : (
                  <EditIntroForm
                    bio={profileInfo.bio}
                    hideEditForm={this.hideEditForm}
                    updateUserInfo={this.props.updateUserInfo}
                  />
                )}
              </section>
            ) : (
              ""
            )}
          </>
        );
    }   

}

export default Intro;