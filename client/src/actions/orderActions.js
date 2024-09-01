import axios from "axios";

// Define the base URL for API requests
const API_BASE_URL = 'http://localhost:8000/api/orders';

// Action to place an order
export const placeOrder = (token, subtotal) => async (dispatch, getState) => {
    dispatch({ type: 'PLACE_ORDER_REQUEST' });

    const { currentUser } = getState().loginUserReducer;
    const { cartItems } = getState().cartReducer;

    try {
        const response = await axios.post(`${API_BASE_URL}/placeorder`, {
            token,
            subtotal,
            currentUser,
            cartItems,
        });
        dispatch({ type: 'PLACE_ORDER_SUCCESS' });
        console.log('Order placed successfully:', response.data);
    } catch (error) {
        dispatch({ type: 'PLACE_ORDER_FAILED', payload: error.message });
        console.error('Error placing order:', error);
    }
};

// Action to get orders for the logged-in user
export const getUserOrders = () => async (dispatch, getState) => {
    dispatch({ type: 'GET_USER_ORDERS_REQUEST' });

    const { currentUser } = getState().loginUserReducer;

    try {
        const response = await axios.post(`${API_BASE_URL}/getuserorders`, {
            userid: currentUser._id,
        });
        dispatch({ type: 'GET_USER_ORDERS_SUCCESS', payload: response.data });
        console.log('Fetched user orders:', response.data);
    } catch (error) {
        dispatch({ type: 'GET_USER_ORDERS_FAILED', payload: error.message });
        console.error('Error fetching user orders:', error);
    }
};

// Action to get all orders (admin only)
export const getAllOrders = () => async (dispatch) => {
    dispatch({ type: 'GET_ALLORDERS_REQUEST' });

    try {
        const response = await axios.get(`${API_BASE_URL}/getallorders`);
        dispatch({ type: 'GET_ALLORDERS_SUCCESS', payload: response.data });
        console.log('Fetched all orders:', response.data);
    } catch (error) {
        dispatch({ type: 'GET_ALLORDERS_FAILED', payload: error.message });
        console.error('Error fetching all orders:', error);
    }
};

// Action to mark an order as delivered (admin only)
export const deliverOrder = (orderid) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/deliverorder`, { orderid });
        console.log('Order delivered:', response.data);
        alert('Order delivered successfully');

        // Refresh the list of all orders after delivery
        const ordersResponse = await axios.get(`${API_BASE_URL}/getallorders`);
        dispatch({ type: 'GET_ALLORDERS_SUCCESS', payload: ordersResponse.data });
    } catch (error) {
        console.error('Error delivering order:', error);
    }
};
