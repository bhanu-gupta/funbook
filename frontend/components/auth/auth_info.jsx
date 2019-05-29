import React from 'react';

export default () => {
    return (
        <section className="auth-info-section">
            <h2>Connect with friends and the <br/>world around you on Facebook.</h2>
            <ul>
                <li className="photos_updates">
                    <img src="https://scontent-lga3-1.xx.fbcdn.net/v/t39.2365-6/32964924_188362901982436_5189181917978689536_n.png?_nc_cat=111&_nc_ht=scontent-lga3-1.xx&oh=76dac4ac88ff3f06c010a1d77019f03e&oe=5D9738A3" />
                    <span className="highlighted">
                        <b>See photos and updates </b> 
                    </span>
                    <span> 
                        from friends in News Feed.
                    </span>
                </li>
                <li className="whats_new">
                    <img src="https://scontent-lga3-1.xx.fbcdn.net/v/t39.2365-6/32967637_1400301410075884_2994305350271762432_n.png?_nc_cat=108&_nc_ht=scontent-lga3-1.xx&oh=e9c61bc7034187e1cf95374983fea458&oe=5D9A25B0" />
                    <span className="highlighted">
                        <b>Share what's new</b>
                    </span>
                    <span> 
                        in your life on your Timeline.
                    </span>
                </li>
                <li className="find_more">
                    <img src="https://scontent-lga3-1.xx.fbcdn.net/v/t39.2365-6/33137320_1687624661315903_5362007326045765632_n.png?_nc_cat=111&_nc_ht=scontent-lga3-1.xx&oh=9b39a942dba35d8914b01171240ad931&oe=5D63A305" />
                    <span className="highlighted">
                        <b>Find more</b>
                    </span>
                    <span>
                        of what you're looking for with Facebook Search.
                    </span>
                </li>
            </ul>
        </section>
    );
};