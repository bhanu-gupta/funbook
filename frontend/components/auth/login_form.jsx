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
        this.props.clearErrors();
        this.props.login(this.state).fail(() => this.props.history.push('/login'));
    }

    handleInput(field) {
        return (e) => {
            this.setState({ [field]: e.currentTarget.value });
        };
    }

    render() {
        return (
            <>
                <form className="login_form" onSubmit={this.handleSubmit}>
                    <div className="input">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" onChange={this.handleInput('email')} value={this.state.email} />
                        <span></span>
                    </div>
                    <div className="input">
                        <label htmlFor="password">Password</label>
                        <input className="input_pwd" type="password" name="password" id="password" onChange={this.handleInput('password')} value={this.state.password} />
                        <a href="#"><span>Forgot account?</span></a>
                    </div>
                    <input className="submit" type="submit" value="Log In" />
                </form>
            </>
        );
    }
}
export default LoginForm;