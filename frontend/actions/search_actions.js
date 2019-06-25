import * as SearchApiUtil from '../util/search_api_util';
import {receiveUsers} from '../actions/auth_actions';
import {receivePosts} from '../actions/posts_actions';

export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';

const receiveSearch = ({userIds, postIds}) => {
    return {
        type: RECEIVE_SEARCH,
        userIds,
        postIds
    }
}

export const fetchSearchResults = (query) => {
    return (dispatch) => {
        return SearchApiUtil.fetchSearchResults(query).then(
            (data) => {
                if (data.users) dispatch(receiveUsers(data.users))
                if (data.posts) dispatch(receivePosts(data.posts))
                if (data.search) dispatch(receiveSearch(data.search))
            }
        );
    };
}