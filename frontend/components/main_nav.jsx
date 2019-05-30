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
        console.log('in toggle');
        // alert(this.state.showDropdown);
        let show = 0;
        if(this.state.showDropdown === 0) {
            show = 1;
        }
        // alert(show);
        this.setState({showDropdown: show})
        // alert(this.state.showDropdown)
    }

    hideMenu(event) {
        console.log('in hide');
        event.stopPropagation();
        this.setState({ showDropdown: 0 })
    }

    render() {
        let dropdown = "";
        console.log(`render ${this.state.showDropdown}`);
        if(this.state.showDropdown === 1) {
            dropdown = (
            <ul className="dropdown-nav">
                <li><Link to="#">Your Groups</Link></li>
                <li className="separator"></li>
                <li><Link to="#">Advertising on Facebook</Link></li>
                <li className="separator"></li>
                <li><Link to="#">Activity Log</Link></li>
                <li><Link to="#">News Feed Preferences</Link></li>
                <li><Link to="#">Settings</Link></li>
                <li onClick={this.props.logout}>Logout</li>
            </ul>
            );
        }
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
                        <input type="submit" value=""/>
                    </form>
                </div>
                <ul className="nav-links">
                    <li>
                        <Link to={`/${this.props.currentUser.username}`}>{this.props.currentUser.firstName}</Link>
                    </li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="#">Create</Link></li>
                        <li className="dropdown-icon" onClick={this.toggleMenu}>
                            <Link to="#"><i></i></Link>
                        {dropdown}
                    </li>
                </ul>
            </nav>
        </header>
        );
    }
}

export default MainNav;