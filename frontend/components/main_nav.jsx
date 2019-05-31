import React from 'react';
import { Link } from 'react-router-dom';

class MainNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {showDropdown: 0};
        this.toggleMenu = this.toggleMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
    }

    componentDidMount() {
        // document.addEventListener('mousedown', this.hideMenu);
    }

    componentWillUnmount() {
        // document.removeEventListener('mousedown', this.hideMenu);
    }

    toggleMenu(event) {
        let show = 0;
        if(this.state.showDropdown === 0) {
            show = 1;
        }
        this.setState({showDropdown: show})
    }

    hideMenu(event) {
        event.stopPropagation();
        this.setState({ showDropdown: 0 })
    }

    render() {
        let dropdown = "";
        if(this.state.showDropdown === 1) {
            dropdown = (
            <ul className="dropdown-nav">
                <li><Link to="#">Your Groups</Link></li>
                <span className="separator"></span>
                <li><Link to="#">Advertising on Facebook</Link></li>
                <span className="separator"></span>
                <li><Link to="#">Activity Log</Link></li>
                <li><Link to="#">News Feed Preferences</Link></li>
                <li><Link to="#">Settings</Link></li>
                <li onClick={this.props.logout}><Link to="#">Logout</Link></li>
            </ul>
            );
        }

        const dropdownIconClass = this.state.showDropdown ? 'col-white' : '';
        return (
        <header className="main-header">
            <nav className="main-nav">
                <div className="search-nav">
                    <h1>
                        <Link to="/">
                            <i></i>
                        </Link>
                    </h1>
                    <form className="search-bar">
                        <input type="text" placeholder="Search"/>
                            <i className="fas fa-search search-icon"></i>
                    </form>
                </div>
                <ul className="nav-links">
                    <li className="pdg-top">
                        <Link to={`/${this.props.currentUser.username}`}>{this.props.currentUser.firstName}</Link>
                    </li>
                    <li className="nav-border pdg-top"><Link to="/">Home</Link></li>
                    <li className="nav-border pdg-top"><Link to="#">Create</Link></li>
                    <li className="nav-border icons">
                            <i className="fas fa-user-friends fa-lg nav-icons"></i>
                    </li>
                    <li className="icons">
                        <i className="fab fa-facebook-messenger fa-lg nav-icons"></i>
                    </li>
                    <li className="icons">
                        <i className="fas fa-bell fa-lg nav-icons"></i>
                    </li>
                    <li className="nav-border icons">
                            <i className="fas fa-question-circle fa-lg nav-icons"></i>
                    </li>
                        <li className="dropdown-icon icons" onClick={this.toggleMenu}>
                            <i className={`fas fa-caret-down nav-icons ${dropdownIconClass}`}></i>
                        {dropdown}
                    </li>
                </ul>
            </nav>
        </header>
        );
    }
}

export default MainNav;