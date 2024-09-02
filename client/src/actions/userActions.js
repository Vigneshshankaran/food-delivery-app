import axios from 'axios';

const API_BASE_URL = 'https://food-delivery-app-17wz.vercel.app/api/users';

// Action to register a user
export const registerUser = (user) => async (dispatch) => {
    dispatch({ type: 'USER_REGISTER_REQUEST' });

    try {
        const response = await axios.post(`${API_BASE_URL}/register`, user);
        dispatch({ type: 'USER_REGISTER_SUCCESS' });
        console.log('User registered successfully:', response.data);
    } catch (error) {
        dispatch({
            type: 'USER_REGISTER_FAILED',
            payload: error.response ? error.response.data.message : error.message,
        });
        console.error('Error registering user:', error);
    }
};

// Action to log in a user
export const loginUser = (user) => async (dispatch) => {
    dispatch({ type: 'USER_LOGIN_REQUEST' });

    try {
        const response = await axios.post(`${API_BASE_URL}/login`, user);
        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data });

        // Save user data to local storage
        localStorage.setItem('currentUser', JSON.stringify(response.data));

        // Redirect to home page after successful login
        window.location.href = '/';
        console.log('User logged in successfully:', response.data);
    } catch (error) {
        dispatch({
            type: 'USER_LOGIN_FAILED',
            payload: error.response ? error.response.data.message : error.message,
        });
        console.error('Error logging in user:', error);
    }
};

// Action to log out a user
export const logoutUser = () => (dispatch) => {
    // Remove user data from local storage
    localStorage.removeItem('currentUser');

    // Redirect to login page after logout
    window.location.href = '/login';
    console.log('User logged out successfully');
};

// Action to get all users (admin only)
export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: 'GET_USERS_REQUEST' });

    try {
        const response = await axios.get(`${API_BASE_URL}/getallusers`);
        dispatch({ type: 'GET_USERS_SUCCESS', payload: response.data });
        console.log('Fetched all users:', response.data);
    } catch (error) {
        dispatch({
            type: 'GET_USERS_FAILED',
            payload: error.response ? error.response.data.message : error.message,
        });
        console.error('Error fetching users:', error);
    }
};

// Action to delete a user (admin only)
export const deleteUser = (userid) => async (dispatch) => {
    try {
        await axios.post(`${API_BASE_URL}/deleteuser`, { userid });
        alert('User deleted successfully');

        // Refresh the list of users after deletion
        dispatch(getAllUsers());
        console.log('User deleted:', userid);
    } catch (error) {
        alert('Error deleting user');
        console.error('Error deleting user:', error);
    }
};