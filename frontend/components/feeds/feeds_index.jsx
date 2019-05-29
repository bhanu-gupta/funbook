import React from 'react';
import MainNavContainer from '../main_nav_container';

class FeedsIndex extends React.Component {
    render() {
        return (
            <>
            <MainNavContainer />
            <main className="main-content">
                <div>This is the Feeds page</div>
            </main>
            </>
        );
    }
}

export default FeedsIndex;