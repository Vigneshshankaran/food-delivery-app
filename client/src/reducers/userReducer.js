// Reducer for user registration
export const registerUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_REGISTER_REQUEST':
            return { loading: true };
        case 'USER_REGISTER_SUCCESS':
            return { loading: false, success: true };
        case 'USER_REGISTER_FAILED':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Reducer for user login
export const loginUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return { loading: true };
        case 'USER_LOGIN_SUCCESS':
            return { loading: false, success: true, currentUser: action.payload };
        case 'USER_LOGIN_FAILED':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Reducer for getting all users
export const getAllUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case 'GET_USERS_REQUEST':
            return { loading: true, users: state.users }; // Preserve existing user data
        case 'GET_USERS_SUCCESS':
            return { loading: false, users: action.payload };
        case 'GET_USERS_FAILED':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};