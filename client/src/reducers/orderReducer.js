// Reducer for placing an order
export const placeOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case 'PLACE_ORDER_REQUEST':
            return { loading: true };
        case 'PLACE_ORDER_SUCCESS':
            return { loading: false, success: true };
        case 'PLACE_ORDER_FAILED':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Reducer for getting user orders
export const getUserOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case 'GET_USER_ORDERS_REQUEST':
            return { ...state, loading: true };
        case 'GET_USER_ORDERS_SUCCESS':
            return { loading: false, orders: action.payload };
        case 'GET_USER_ORDERS_FAILED':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Reducer for getting all orders (admin or general use)
export const getAllOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case 'GET_ALLORDERS_REQUEST':
            return { ...state, loading: true };
        case 'GET_ALLORDERS_SUCCESS':
            return { loading: false, orders: action.payload };
        case 'GET_ALLORDERS_FAILED':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};