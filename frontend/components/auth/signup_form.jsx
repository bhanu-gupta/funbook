import React from 'react';
import {getCurrentFullDate, getSelectOptions} from '../../util/helper_util';
import {Link} from 'react-router-dom';


class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.fullDate = getCurrentFullDate();
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            birth_month: this.fullDate.month,
            birth_date: this.fullDate.date,
            birth_year: this.fullDate.year-25,
            gender: ''
        };
        this.form = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        
    }

    handleSubmit(e) {
        debugger
        e.preventDefault();
        this.props.clearErrors();
        this.props.signup(this.state);
    }

    updateInput(field) {
        return (e) => {
            // e.currentTarget.setCustomValidity("Email is invalid");
            this.setState({ [field]: e.currentTarget.value });
        };
    }

    reportValidationErrors() {
        return (e) => {
            // debugger
            // e.currentTarget.reportValidity();
        }
    }

    render() {
        const all_errors = this.props.errors.map((error, idx) => {
            return <li key={idx}>{error}</li>;
        });
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return (
            <section className="auth-signup-section">
                <h2>Sign Up</h2>
                <h3>It's free and always will be.</h3>
                <form className="signup_form" onSubmit={this.handleSubmit} ref={this.form}>
                    <ul>{all_errors}</ul> 
                    <div className="name">
                        <input type="text" required name="first_name" onChange={this.updateInput('first_name')} value={this.state.first_name} placeholder="First Name"/>
                        <input type="text" required name="last_name" onChange={this.updateInput('last_name')} value={this.state.last_name} placeholder="Last Name" />
                    </div>
                    <input type="email" required name="email" onChange={this.updateInput('email')} value={this.state.email} placeholder="Email" />
                    <input type="password" required name="password" minLength="6" onChange={this.updateInput('password')} value={this.state.password} placeholder="New password" />
                    <label className="birthday_label" htmlFor="birthday">Birthday</label>
                    <div className="select_birthday">
                        <select required type="number" onChange={this.updateInput('birth_month')} value={this.state.birth_month} name="birth_month">
                            <option key="0" value="0">Month</option>
                            {getSelectOptions(1, 12, false, months)}
                        </select>
                        <select required type="number" onChange={this.updateInput('birth_date')} value={this.state.birth_date} name="birth_date">
                            <option key="0" value="0">Day</option>
                            {getSelectOptions(1, 31)}
                        </select>
                        <select required type="number" onChange={this.updateInput('birth_year')} value={this.state.birth_year} name="birth_year">
                            <option key="0" value="0">Year</option>
                            {getSelectOptions(this.fullDate.year - 114, this.fullDate.year, true)}
                        </select>
                        <a href="#" title="Click for more information">Why do I need to provide my birthday?</a>
                    </div>
                    <div className="input_gender">
                        <input type="radio" required name="gender" id="female" value="F" onChange={this.updateInput('gender')}/>
                        <label htmlFor="female">Female</label>
                        <input type="radio" required name="gender" id="male" value="M" onChange={this.updateInput('gender')}/>
                        <label htmlFor="male">Male</label>
                    </div>
                    <p className="confirm">By clicking Sign Up, you agree to our 
                        <Link to="www.facebook.com/legal/terms/update">Terms</Link>, 
                        <Link to="www.facebook.com/about/privacy/update">Data Policy</Link> and 
                        <Link to="www.facebook.com/policies/cookies">Cookies Policy</Link>. You may receive SMS Notifications from us and can opt out any time.
                    </p>
                    <input type="submit" value="Sign Up" />
                </form>
                <div className="create_page"><a href="#">Create a Page</a> for a celebrity, band or business.</div>
            </section>
        );
    }
}

export default SignupForm;