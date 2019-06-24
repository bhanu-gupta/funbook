import React from 'react';

class BioForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: props.bio || ''
        }
        this.updateField = this.updateField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateField(e) {
        this.setState({bio: e.currentTarget.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user[bio]', this.state.bio);
        this.props
          .updateUserInfo(formData)
          .then(this.props.hideEditForm);
    }

    render() {
        return (
          <form>
            <textarea
              name="bio"
              id="bio"
              rows="4"
              value={this.state.bio}
              placeholder="Describe who you are"
              maxLength="101"
              onChange={this.updateField}
            />
            <div className="edit-bio-actions">
              <button
                className="white-btn small-btn"
                onClick={this.props.hideEditForm}
              >
                Cancel
              </button>
              <button
                className="blue-btn small-btn"
                onClick={this.handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        );
    }
}

export default BioForm;