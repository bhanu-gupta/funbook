import React from 'react';
import { Link } from 'react-router-dom';

class MainNav extends React.Component {
    render() {
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
                        <li><Link to={`/${this.props.currentUser.username}`}>{this.props.currentUser.firstName}</Link></li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="#">Create</Link></li>
                    <li onClick={this.props.logout}>Logout</li>
                </ul>
            </nav>
        </header>
        );
    }
}

export default MainNav;