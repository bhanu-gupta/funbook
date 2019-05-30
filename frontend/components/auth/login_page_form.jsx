import React from 'react';
import {Link} from 'react-router-dom';
import LoginFormContainer from './login_form_container';

class LoginPageForm extends React.Component {
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
        this.props.login(this.state);
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
                <header className="auth-header">
                    <nav className="auth-nav">
                        <h1>
                            <Link to="/">
                                <i></i>
                            </Link>
                            <button>Sign Up</button>
                        </h1>     
                    </nav>
                </header>
                {all_errors}
                <main className="main-content">
                    <div className="middle-section login_bg">
                        <div className="login_form_section" >
                            <form className="login_form_page" onSubmit={this.handleSubmit}>
                                <div className="input">
                                    <input type="text" name="email" id="email" onChange={this.handleInput('email')} value={this.state.email} />
                                    <span></span>
                                </div>
                                <div className="input">
                                    <input className="input_pwd" type="password" name="password" id="password" onChange={this.handleInput('password')} value={this.state.password} />
                                </div>
                                <input className="submit" type="submit" value="Log In" />
                                <a href="#"><span>Forgot account?</span></a>
                                <span>or</span>
                                <button>Create New Account</button>
                            </form>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}
export default LoginPageForm;