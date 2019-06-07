import React from 'react';

class CreatePostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: '',
            photoUrls: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.readFile = this.readFile.bind(this);
        this.photos = [];
    }

    updateField(field) {
        return e => {
            this.setState({[field]: e.currentTarget.value})
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('post[body]', this.state.body);
        formData.append('post[user_id]', this.props.profileId);
        for (let i = 0; i < this.photos.length; i++) {
            formData.append('post[photos][]', this.photos[i]);
        }
        if(this.state.body || this.photos.length > 0) {
            this.props.createPost(formData).then(() => this.props.closeModal());
        }
    }

    readFile(e) {
        let that = this;
        Object.values(e.target.files).forEach((file) => {
            const fileReader = new FileReader();
            that.photos.push(file);
            fileReader.onloadend = () => {
                const photoUrls = this.state.photoUrls.concat([fileReader.result]);
                this.setState({photoUrls});
            };
            fileReader.readAsDataURL(file);
        });
    }

    removePhoto(index) {
        return (e) => {
            this.photos = this.photos.filter((photo, idx) => idx !== index);
            const photoUrls = this.state.photoUrls.filter((url, idx2) => idx2 !== index);
            this.setState({photoUrls});
        }
    }

    render() {
        let all_photos = "";
        if (this.props.modalOpen && this.state.photoUrls.length > 0) {
            all_photos = this.state.photoUrls.map((url, idx) => {
                return (
                    <li key={idx}>
                        <div className="gallery-photo">
                            <img src={url} />
                            <i className="fas fa-times close-btn" onClick={this.removePhoto(idx)}></i>
                        </div>
                    </li>
                ) 
            });
        }
        const photoUpload = () => document.getElementById("photo-video").click();
        const formClass = this.props.modalOpen ? 'zoom-form' : "";
        
        return (
            <section className={`create-post section-box ${formClass}`} onClick={this.props.openModal}>
                <ul className="post-nav">
                    <li>
                        <i className="fas fa-pen"></i>
                        <span>Create Post</span>
                    </li>
                    <li onClick={photoUpload}>
                        <i className="fas fa-camera"></i>
                        <span>Photo/Video</span>
                    </li>
                    <li>
                        <i className="fas fa-video"></i>
                        <span>Live Video</span>
                    </li>
                    <li>
                        <i className="fas fa-flag"></i>
                        <span>Life Event</span>
                    </li>
                    {this.props.modalOpen ? (
                    <i id="close-btn" className="fas fa-times close-btn" onClick={this.props.closeModal}></i>
                    ) : ""}
                </ul>
                <form className="post-body" onSubmit={this.handleSubmit}>
                    <div className="post-text">
                        <figure className="profile-pic">
                            <img src={this.props.currentUser.profilePhoto ? this.props.currentUser.profilePhoto : window.defaultUser} />
                        </figure>
                        <textarea 
                            name="body" 
                            id="body"
                            onChange={this.updateField('body')}
                            placeholder="What's on your mind?"
                            className={this.props.modalOpen ? "modal-body" : ""}
                        >
                        </textarea>
                    </div>
                    {this.props.modalOpen && (this.state.photoUrls.length > 0) ? (
                        <div className="photo-gallery">
                            <ul>
                                {all_photos}
                                <li onClick={photoUpload}>
                                    <div className="gallery-photo add-more-photos">
                                        <i className="fas fa-plus"></i>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    ) : "" }
                    <ul className="post-actions">
                        <li onClick={photoUpload}>
                            <i className="fas fa-image"></i>
                            <span>Photo/Video</span>
                        </li>
                        <li>
                            <i className="fas fa-user-tag"></i>
                            <span>Tag Friends</span>
                        </li>
                        <li>
                            <i className="far fa-laugh"></i>
                            <span>Feeling/Activity</span>
                        </li>
                        <li><span>...</span></li>
                    </ul>
                    <input type="file" name="Upload Photo/Video" id="photo-video" onChange={this.readFile} multiple/>
                    {this.props.modalOpen ? (
                        <div className="share-btn">
                            <input type="submit" value="Share"/>
                        </div>
                    ) : ""}
                </form>
            </section>
        )
    }
}

export default CreatePostForm;