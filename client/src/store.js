import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { 
  getAllPizzasReducer, 
  addPizzaReducer, 
  getPizzaByIdReducer, 
  editPizzaReducer 
} from './reducers/pizzaReducers';
import { cartReducer } from './reducers/cartReducer';
import { 
  loginUserReducer, 
  registerUserReducer, 
  getAllUsersReducer 
} from './reducers/userReducer';
import { 
  placeOrderReducer, 
  getUserOrdersReducer, 
  getAllOrdersReducer 
} from './reducers/orderReducer';

// Combine reducers
const rootReducer = combineReducers({
  getAllPizzasReducer,
  addPizzaReducer,
  getPizzaByIdReducer,
  editPizzaReducer,
  cartReducer,
  loginUserReducer,
  registerUserReducer,
  getAllUsersReducer,
  placeOrderReducer,
  getUserOrdersReducer,
  getAllOrdersReducer,
});

// Initial state from localStorage
const cartItems = localStorage.getItem('cartItems') 
  ? JSON.parse(localStorage.getItem('cartItems')) 
  : [];

const currentUser = localStorage.getItem('currentUser') 
  ? JSON.parse(localStorage.getItem('currentUser')) 
  : null;

const initialState = {
  cartReducer: {
    cartItems,
  },
  loginUserReducer: {
    currentUser,
  },
};

// Create store with middleware and Redux DevTools extension
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;