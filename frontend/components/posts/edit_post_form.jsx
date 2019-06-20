import React from 'react';

class EditPostForm extends React.Component {
    constructor(props) {
        super(props);
        const { photoUrls, body, photosAttachmentIds} = props.post;
        this.photos = [];
        this.state = {
            body: body,
            photoUrls: photoUrls || []
        };
        this.attachments = photosAttachmentIds;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.readFile = this.readFile.bind(this);
        this.removed = [];
    }

    updateField(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.value })
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('post[body]', this.state.body);
        for (let i = 0; i < this.photos.length; i++) {
            formData.append('post[photos][]', this.photos[i]);
        }
        if (this.removed.length > 0) {
            for (let j = 0; j < this.removed.length; j++) {
                formData.append('post[removed][]', this.removed[j])
            }
        }
        if ((this.state.body !== this.props.post.body) || this.photos.length > 0 || this.removed.length > 0) {
            this.props.updatePost(formData, this.props.post.id).then(this.props.closeModal);
        } else {
            this.props.closeModal();
        }
    }

    readFile(e) {
        let that = this;
        Object.values(e.target.files).forEach((file) => {
            const fileReader = new FileReader();
            that.photos.push(file);
            fileReader.onloadend = () => {
                const photoUrls = this.state.photoUrls.concat([fileReader.result]);
                this.setState({ photoUrls });
            };
            fileReader.readAsDataURL(file);
        });
    }

    removePhoto(index) {
        let that = this;
        return (e) => {
            if (index < that.attachments.length) {
                that.removed.push(that.attachments[index]);
                that.attachments = that.attachments.slice(0, index).concat(that.attachments.slice(index+1))
            } else {
                that.photos = that.photos.filter((photo, idx) => idx !== (index-that.attachments.length));
            }
            const photoUrls = that.state.photoUrls.filter((url, idx2) => idx2 !== index);
            that.setState({ photoUrls });
        }
    }

    render() {
        let all_photos = "";
        if (this.state.photoUrls.length > 0) {
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
        const photoUpload = () => document.getElementById("edit-photo").click();

        const form = (
            <section className="create-post section-box zoom-form">
                <ul className="post-nav">
                    <li>
                        <span>Edit Post</span>
                    </li>
                    <i id="close-btn" className="fas fa-times close-btn" onClick={this.props.closeModal}></i>
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
                            className="modal-body"
                            value={this.state.body}
                        >
                        </textarea>
                    </div>
                    {this.state.photoUrls.length > 0 ? (
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
                    ) : ""}
                    <ul className="post-actions">
                        <li onClick={photoUpload}>
                            <i className="fas fa-image"></i>
                            <span>Photo/Video</span>
                        </li>
                    </ul>
                    <input type="file" name="Upload Photo/Video" id="edit-photo" onChange={this.readFile} multiple />
                    <div className="share-btn">
                        <input type="submit" value="Save" />
                    </div>
                </form>
            </section>
        );


        return (
            <>
                <div className="modal-background">
                </div>
                <div className="modal-child">
                    {form}
                </div>
            </>
        );
    }
}

export default EditPostForm;