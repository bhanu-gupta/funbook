const getAllAuthErrors = (state) => {
    return Object.values(state.errors.auth);
};