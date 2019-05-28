import React from 'react';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            birthMonth: '',
            birthDate: '',
            birthYear: '',
            gender: ''
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
                    <input type="text" name="firstName" onChange={this.handleInput('firstName')} value={this.state.firstName} placeholder="First Name"/>
                    <input type="text" name="lastName" onChange={this.handleInput('lastName')} value={this.state.lastName} placeholder="Last Name" />
                    <input type="password" name="password" onChange={this.handleInput('password')} value={this.state.password} placeholder="New password" />
                    <label htmlFor="birthday">Birthday</label>
                    <select onChange={this.handleInput('birthDate')} value={this.state.birthDate} name="birthDate" defaultValue={currentDate}>
                        <option />
                        {getOptions(1, 31)}
                    </select>
                    <select onChange={this.handleInput('birthMonth')} value={this.state.birthDate} name="birthMonth" defaultValue={currentMonth}>
                        <option />
                        {getOptions(1, 12)}
                    </select>
                    <select onChange={this.handleInput('birthYear')} value={this.state.birthDate} name="birthYear" defaultValue={currentYear}>
                        <option />
                        {getOptions(currentYear - 114, currentYear, true)}
                    </select>
                    <input type="radio" name="gender" id="female"/>
                    <label htmlFor="female">Female</label>
                    <input type="radio" name="gender" id="male" />
                    <label htmlFor="male">Male</label>
                    <p>By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy. You may receive SMS Notifications from us and can opt out any time.</p>
                    <input type="submit" value="Submit" />
                </form>
            </>
        );
    }
}

export default SignupForm;