import React from 'react';
import {getCurrentFullDate, getSelectOptions} from '../../util/helper_util';
import {Link} from 'react-router-dom';
import {merge} from 'lodash';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.fullDate = getCurrentFullDate();
        this.emailInput = React.createRef();
        this.errors = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            email2: '',
            gender: ''
        }
        this.state = {
            data: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                birth_month: this.fullDate.month,
                birth_date: this.fullDate.date,
                birth_year: this.fullDate.year-25,
                gender: '',
                email2: '',
            },
            errorIcons: {
                first_name: false,
                last_name: false,
                password: false,
                email: false,
                email2: false,
                gender: ''
            },
            errorTxt: {
                field: '',
                value: ''
            },
            reenterEmail: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCustomErrorMessages = this.getCustomErrorMessages.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let formErrors = false;
        Object.values(this.state.errorIcons).forEach(element => {
            if(element === true) {
                formErrors = true;
                return;
            }
        });
        if (!formErrors) {
            this.props.clearErrors();
            this.props.signup(this.state.data);
        }
    }

    handleErrors(field) {
        return (e) => {
            const errText = this.getCustomErrorMessages(field, e.currentTarget.value);
            if (errText) {
                this.setState({
                    errorIcons: merge(this.state.errorIcons, {[field]: true})
                });
                this.errors = merge(this.errors, { [field]: errText });
            } else {
                this.errors = merge(this.errors, { [field]: '' });
            }
        };
    }

    displayError(field) {
        return e => {
            this.setState({
                errorIcons: merge(this.state.errorIcons, { [field]: false })
            });
            this.setState({
                errorTxt: {
                    field: '',
                    value: ''
                }
            });
            if (this.errors[field]) {
                this.setState({
                    errorTxt: {
                        field,
                        value: this.errors[field]
                    }
                });
            }
        }
    }

    getCustomErrorMessages(field, value) {
        if ((field === 'first_name' || field === 'last_name') && !value) {
            return 'What\'s your name?';
        } else if (field === 'gender' && !value) {
            return 'Please select a gender';
        } else if (field === 'email' || field == 'email2') {
            if(!value) {
                return 'You\'ll use this when you log in and if you ever need to reset your password.';
            } else if (!(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(value))) {
                return 'Please enter a valid email address.';
            }
            if(field === 'email2') {
                if (value !== this.emailInput.current.value) {
                    return 'Your emails do not match. Please try again.'
                }
            }
        } else if(field === 'password' && !value) {
            return 'Enter a combination of at least six numbers, letters and punctuation marks (like ! and &).';
        } else {
            return "";
        }
    }

    updateInput(field) {
        return (e) => {
            if (field === 'email') {
                if(!this.getCustomErrorMessages(field, e.currentTarget.value)) {
                    this.setState({reenterEmail: true})
                } else {
                    this.setState({ reenterEmail: false})
                    this.setState(merge(this.state.data, {email2: ''}))
                }
            }
            this.setState({ 
                data: merge(this.state.data, {[field]: e.currentTarget.value})
            });
        };
    }

    render() {
        let allErrors;
        if(this.props.errors.length > 0) {
            allErrors = (
            <ul className="all_errors">
                <li>{this.props.errors[0]}</li>
            </ul>
            );
        }
        const toolTip = (
            <div className="tooltip" title="Tooltip box!">
                {this.state.errorTxt.value}
            </div>
        );
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const errorIcon = (
                <div className="error-icon">
                    <i className="fas fa-exclamation-circle fa-lg"></i>
                </div>
        );
        const reenterEmailBox = (
            <div className="input-box">
                <input
                    type="text"
                    name="email2"
                    onFocus={this.displayError('email2')}
                    onBlur={this.handleErrors('email2')}
                    onChange={this.updateInput('email2')}
                    value={this.state.data.email2}
                    placeholder="Re-enter email" 
                    className={this.state.errorIcons.email2 ? 'err-border' : ''}/>
                {this.state.errorTxt.field === 'email2' ? toolTip : ""}
                {this.state.errorIcons.email2 ? errorIcon : ""}
            </div>
        );
        return (
                <>
                <form className="signup_form" onSubmit={this.handleSubmit} ref={this.form}>
                    {allErrors}
                    <div className="name">
                        <div className="input-box">
                            <input 
                                type="text" 
                                name="first_name" 
                                onFocus={this.displayError('first_name')} 
                                onBlur={this.handleErrors('first_name')} 
                                onChange={this.updateInput('first_name')} 
                                value={this.state.data.first_name} 
                                placeholder="First Name"
                                className={this.state.errorIcons.first_name ? 'err-border' : ''}/>
                            {this.state.errorIcons.first_name ? errorIcon : ""}
                            {this.state.errorTxt.field === 'first_name' ? toolTip : ""}
                        </div>
                        <div className="input-box">
                            <input 
                                type="text" 
                                name="last_name" 
                                onFocus={this.displayError('last_name')} 
                                onBlur={this.handleErrors('last_name')} 
                                onChange={this.updateInput('last_name')} 
                                value={this.state.data.last_name} 
                                placeholder="Last Name" 
                                className={this.state.errorIcons.last_name ? 'err-border' : ''}/>
                            {this.state.errorIcons.last_name ? errorIcon : ""}
                            {this.state.errorTxt.field === 'last_name' ? toolTip : ""}
                        </div>
                    </div>
                    <div className="input-box">
                        <input 
                            ref={this.emailInput}
                            type="text" 
                            name="email" 
                            onFocus={this.displayError('email')} 
                            onBlur={this.handleErrors('email')} 
                            onChange={this.updateInput('email')} 
                            value={this.state.data.email} 
                            placeholder="Email" 
                            className={this.state.errorIcons.email ? 'err-border' : ''}/>
                        {this.state.errorTxt.field === 'email' ? toolTip : ""}
                        {this.state.errorIcons.email ? errorIcon : ""}
                    </div>
                    {this.state.reenterEmail ? reenterEmailBox : ""}
                    <div className="input-box">
                        <input 
                            type="password" 
                            onFocus={this.displayError('password')} 
                            onBlur={this.handleErrors('password')} 
                            name="password" minLength="6" 
                            onChange={this.updateInput('password')} 
                            value={this.state.data.password} 
                            placeholder="New password" 
                            className={this.state.errorIcons.password ? 'err-border' : ''}/>
                        {this.state.errorTxt.field === 'password' ? toolTip : ""}
                        {this.state.errorIcons.password ? errorIcon : ""}
                    </div>
                    <label className="birthday_label" htmlFor="birthday">Birthday</label>
                    <div className="select_birthday">
                        <select 
                            type="number" 
                            onChange={this.updateInput('birth_month')} 
                            value={this.state.data.birth_month} 
                            name="birth_month">
                            <option key="0" value="0" disabled>Month</option>
                            {getSelectOptions(1, 12, false, months)}
                        </select>
                        <select 
                            type="number" 
                            onChange={this.updateInput('birth_date')} 
                            value={this.state.data.birth_date} 
                            name="birth_date">
                            <option key="0" value="0" disabled>Day</option>
                            {getSelectOptions(1, 31)}
                        </select>
                        <select 
                            type="number" 
                            onChange={this.updateInput('birth_year')} 
                            value={this.state.data.birth_year} 
                            name="birth_year">
                            <option key="0" value="0" disabled>Year</option>
                            {getSelectOptions(this.fullDate.year - 114, this.fullDate.year, true)}
                        </select>
                        <a href="#" title="Click for more information">Why do I need to provide my birthday?</a>
                    </div>
                    <div className="input_gender">
                        <input 
                            type="radio" 
                            name="gender" 
                            id="female" 
                            value="F" 
                            onChange={this.updateInput('gender')} 
                            className={this.state.errorIcons.gender ? 'err-border' : ''}/>
                        <label htmlFor="female">Female</label>
                        <input 
                            type="radio"
                            name="gender" 
                            id="male" 
                            value="M" 
                            onChange={this.updateInput('gender')}
                            className={this.state.errorIcons.gender ? 'err-border' : ''}/>
                        <label htmlFor="male">Male</label>
                    </div>
                    <p className="confirm">By clicking Sign Up, you agree to our 
                        <Link to="www.facebook.com/legal/terms/update">Terms</Link>, 
                        <Link to="www.facebook.com/about/privacy/update">Data Policy</Link> and 
                        <Link to="www.facebook.com/policies/cookies">Cookies Policy</Link>. You may receive SMS Notifications from us and can opt out any time.
                    </p>
                    <div>
                        <input type="submit" value="Sign Up" />
                    </div>
                </form>
                <button onClick={this.props.demoLogin}>Demo Login</button>
                </>
        );
    }
}

export default SignupForm;