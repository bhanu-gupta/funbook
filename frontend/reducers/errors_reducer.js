import {combineReducers} from 'redux';
import authErrorsReducer from './auth_errors_reducer';

export default combineReducers({
    auth: authErrorsReducer
});