import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import SearchIndex from './search_index';
import {fetchSearchResults} from '../../actions/search_actions';
import {getAllProfilePosts, getUserFriends} from '../../reducers/selector';

const msp = (state, ownProps) => {
    return {
        searchTerm: ownProps.match.params.searchTerm || "",
        users: getUserFriends(state, null, 'search'),
        posts: getAllProfilePosts(state, null, 'search'),
        currentUser: state.entities.users[state.session.currentUserId]
    }
}

const mdp = dispatch => {
    return {
        fetchSearchResults: (query) => dispatch(fetchSearchResults(query))
    }
}

export default withRouter(connect(msp, mdp)(SearchIndex));