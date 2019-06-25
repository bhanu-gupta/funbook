import {RECEIVE_SEARCH} from '../actions/search_actions';

const _nullSearch = { userIds: [], postIds: [] };

export default (state = _nullSearch, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_SEARCH:
            const newState = {userIds: action.userIds, postIds: action.postIds}
            return newState;
        default:
            return state;
    }
};