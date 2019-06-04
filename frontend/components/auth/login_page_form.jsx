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
        let allErrors;
        if (this.props.errors.length > 0) {
            allErrors = (
                <ul className="all_errors">
                    <li>{this.props.errors[0]}</li>
                </ul>
            );
        }
        const showError = this.props.errors.length > 0 ? true : false;
        const errorIcon = (
            <div className="error-icon">
                <i className="fas fa-exclamation-circle fa-lg"></i>
            </div>
        );
        const toolTip = (
            <div className="tooltip" title="Tooltip box!">
                The email or phone number you’ve entered doesn’t match any account. <Link to="/signup">Sign up for an account.</Link>
            </div>
        );
        return (
            <>
                <header className="auth-header">
                    <nav className="auth-nav">
                        <h1>
                            <Link to="/">
                                <i></i>
                            </Link>
                            <Link to="/signup"><button className="signup-btn small-btn">Sign Up</button></Link>
                        </h1>     
                    </nav>
                </header>
                <main className="main-content">
                    <div className="middle-section">
                        <div className="login_form_section login_bg" >
                            <h1 className="align-center">Log Into Facebook</h1>
                            <form className="login_form_page" onSubmit={this.handleSubmit}>
                                <div className="input input-box">
                                    <input 
                                        type="text" 
                                        className={showError ? 'err-border' : ''} 
                                        name="email" 
                                        id="email" 
                                        onChange={this.handleInput('email')} 
                                        value={this.state.email} 
                                        placeholder="Email"/>
                                    {showError ? errorIcon : ""}
                                    {showError ? toolTip : ""}
                                </div>
                                <div className="input">
                                    <input 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        onChange={this.handleInput('password')} 
                                        value={this.state.password} 
                                        placeholder="Password"/>
                                </div>
                                <input className="submit" type="submit" value="Log In" />
                                <a href="#"><span>Forgot account?</span></a>
                                <span className="login-or">or</span>
                                <Link to="/signup" className="create-acc-link"><button>Create New Account</button></Link>
                            </form>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}
export default LoginPageForm;