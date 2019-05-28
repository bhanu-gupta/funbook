import * as AuthApiUtils from '../util/auth_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

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

export const receiveErrors = (errors) => {
    return {
        type: RECEIVE_ERRORS,
        errors
    };
};

export const login = (userForm) => {
    return (dispatch) => {
        return AuthApiUtils.login(userForm).then(
            (user) => dispatch(receiveCurrentUser(user)),
            (errors) => dispatch(receiveErrors(errors.responseJSON))
        );
    };
};

export const signup = (userForm) => {
    return (dispatch) => {
        return AuthApiUtils.signup(userForm).then(
            (user) => dispatch(receiveCurrentUser(user)),
            (errors) => dispatch(receiveErrors(errors.responseJSON))
        );
    };
};

export const logout = () => {
    return (dispatch) => {
        return AuthApiUtils.logout().then(
            () => dispatch(logoutCurrentUser()),
            (errors) => dispatch(receiveErrors(errors.responseJSON))
        );
    };
};