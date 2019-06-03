import React from 'react';

class CreatePostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const userId = this.props.match.params.userId || this.props.currentUser.id;
        const postForm = {
            body: this.state.body,
            userId
        }
        this.props.createPost(postForm);
    }

    updateField(field) {
        return e => {
            this.setState({[field]: e.currentTarget.value})
        }
    }

    render() {
        return (
            <section className="create_post">
                <ul className="post-nav">
                    <li>
                        <i></i>
                        <span>Create Post</span>
                    </li>
                    <li>
                        <i></i>
                        <span>Photo/Video</span>
                    </li>
                    <li>
                        <i></i>
                        <span>Live Video</span>
                    </li>
                    <li>
                        <i></i>
                        <span>Life Event</span>
                    </li>
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <textarea 
                            name="body" 
                            id="body" 
                            cols="30" 
                            rows="10"
                            onChange={this.updateField('body')}
                            placeholder="What's on your mind?"
                        >
                        </textarea>
                        <img src="" />
                    </p>
                    <ul className="post-actions">
                        <li>
                            <i></i>
                            <span>Photo/Video</span>
                        </li>
                        <li>
                            <i></i>
                            <span>Tag Friends</span>
                        </li>
                        <li>
                            <i></i>
                            <span>Feeling/Activity...</span>
                        </li>
                        <li><span>...</span></li>
                    </ul>
                    <input type="submit" value="Post"/>
                </form>
            </section>
        )
    }
}

export default CreatePostForm;