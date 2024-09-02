import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  getAllPizzasReducer,
  addPizzaReducer,
  getPizzaByIdReducer,
  editPizzaReducer,
} from './reducers/pizzaReducers';

import { cartReducer } from './reducers/cartReducer';
import {
  loginUserReducer,
  registerUserReducer,
  getAllUsersReducer,
} from './reducers/userReducer';

import {
  placeOrderReducer,
  getUserOrdersReducer,
  getAllOrdersReducer,
} from './reducers/orderReducer';

// Utility to load initial state from localStorage
const loadFromLocalStorage = (key, defaultValue) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

// Combine reducers
const rootReducer = combineReducers({
  pizzas: combineReducers({
    all: getAllPizzasReducer,
    add: addPizzaReducer,
    byId: getPizzaByIdReducer,
    edit: editPizzaReducer,
  }),
  cart: cartReducer,
  user: combineReducers({
    login: loginUserReducer,
    register: registerUserReducer,
    allUsers: getAllUsersReducer,
  }),
  orders: combineReducers({
    placeOrder: placeOrderReducer,
    userOrders: getUserOrdersReducer,
    allOrders: getAllOrdersReducer,
  }),
});

// Initial state from localStorage
const initialState = {
  cart: {
    cartItems: loadFromLocalStorage('cartItems', []),
  },
  user: {
    login: {
      currentUser: loadFromLocalStorage('currentUser', null),
    },
  },
};

// Middleware
const middleware = [thunk];

// Create store with middleware and Redux DevTools extension
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
