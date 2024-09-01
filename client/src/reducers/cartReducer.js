// cartReducer.js
export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: action.payload.quantity, price: action.payload.price }
              : item
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case 'DELETE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== action.payload._id),
      };

    default:
      return state;
  }
};