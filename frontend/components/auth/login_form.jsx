import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.processForm(this.state);
    }

    handleInput(field) {
        return (e) => {
            this.setState({ [field]: e.currentTarget.value });
        };
    }

    render() {
        const all_errors = this.props.errors.map((error, idx) => {
            return <li key={idx}>{error}</li>;
        });
        return (
            <>
                <ul>{all_errors}</ul>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" onChange={this.handleInput('email')} value={this.state.email} />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={this.handleInput('password')} value={this.state.password} />
                    <input type="submit" value="Submit" />
                </form>
            </>
        );
    }
}
export default LoginForm;