import * as AuthApiUtils from '../util/auth_api_util';
import {merge} from 'lodash';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_LOGIN_ERRORS = 'RECEIVE_LOGIN_ERRORS';
export const RECEIVE_SIGNUP_ERRORS = 'RECEIVE_SIGNUP_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const receiveCurrentUser = (user) => {
    return {
        type: RECEIVE_CURRENT_USER,
        user
    };
};

export const logoutCurrentUser = () => {
    return {
        type: LOGOUT_CURRENT_USER
    };
};

export const receiveSignupErrors = (errors) => {
    return {
        type: RECEIVE_SIGNUP_ERRORS,
        errors
    };
};

export const receiveLoginErrors = (errors) => {
    return {
        type: RECEIVE_LOGIN_ERRORS,
        errors
    };
};

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
};

export const receiveUsers = (users) => {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export const login = (userForm) => {
    return (dispatch) => {
        return AuthApiUtils.login(userForm).then(
            (user) => dispatch(receiveCurrentUser(user)),
            (errors) => dispatch(receiveLoginErrors(errors.responseJSON))
        );
    };
};

export const signup = (userForm) => {
    return (dispatch) => {
        return AuthApiUtils.signup(userForm).then(
            (user) => dispatch(receiveCurrentUser(user)),
            (errors) => dispatch(receiveSignupErrors(errors.responseJSON))
        );
    };
};

export const logout = () => {
    return (dispatch) => {
        return AuthApiUtils.logout().then(
            () => dispatch(logoutCurrentUser())
        );
    };
};

export const fetchTimelineData = (userId) => {
    return (dispatch) => {
        return AuthApiUtils.fetchTimelineData(userId).then(
            (userData) => {
                const {friends, user} = userData;
                const allUsers = user ? merge({}, friends, { [user.id]: user }) : friends;
                return dispatch(receiveUsers(allUsers));
            }
        );
    };
}

export const updateUserInfo = (formData) => {
    return (dispatch) => {
        return AuthApiUtils.updateUserInfo(formData).then(
            (user) => dispatch(receiveCurrentUser(user))
        );
    };
}