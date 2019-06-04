export const signup = (userForm) => {
    return $.ajax({
        method: "POST",
        url: "/api/users",
        data: { user: userForm }
    });
};

export const login = (userForm) => {
    return $.ajax({
        method: "POST",
        url: "/api/session",
        data: { user: userForm }
    });
};

export const logout = () => {
    return $.ajax({
        method: "DELETE",
        url: "/api/session"
    });
};

export const fetchTimelineData = (userId) => {
    return $.ajax({
        method: 'GET',
        url: `/api/users/${userId}`
    })
}

export const updateUserInfo = (formData) => {
    return $.ajax({
        method: 'PATCH',
        url: '/api/users',
        data: formData,
        contentType: false,
        processData: false
    });
}