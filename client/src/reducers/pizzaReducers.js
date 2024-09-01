// Reducer for getting all pizzas
export const getAllPizzasReducer = (state = { pizzas: [] }, action) => {
  switch (action.type) {
      case 'GET_PIZZAS_REQUEST':
          return { ...state, loading: true };
      case 'GET_PIZZAS_SUCCESS':
          return { loading: false, pizzas: action.payload };
      case 'GET_PIZZAS_FAILED':
          return { loading: false, error: action.payload };
      default:
          return state;
  }
};

// Reducer for getting pizza by ID
export const getPizzaByIdReducer = (state = {}, action) => {
  switch (action.type) {
      case 'GET_PIZZABYID_REQUEST':
          return { ...state, loading: true };
      case 'GET_PIZZABYID_SUCCESS':
          return { loading: false, pizza: action.payload };
      case 'GET_PIZZABYID_FAILED':
          return { loading: false, error: action.payload };
      default:
          return state;
  }
};

// Reducer for adding a pizza
export const addPizzaReducer = (state = {}, action) => {
  switch (action.type) {
      case 'ADD_PIZZA_REQUEST':
          return { ...state, loading: true };
      case 'ADD_PIZZA_SUCCESS':
          return { loading: false, success: true };
      case 'ADD_PIZZA_FAILED':
          return { loading: false, error: action.payload };
      default:
          return state;
  }
};

// Reducer for editing a pizza
export const editPizzaReducer = (state = {}, action) => {
  switch (action.type) {
      case 'EDIT_PIZZA_REQUEST':
          return { ...state, editLoading: true };
      case 'EDIT_PIZZA_SUCCESS':
          return { ...state, editLoading: false, editSuccess: true };
      case 'EDIT_PIZZA_FAILED':
          return { ...state, editLoading: false, editError: action.payload };
      default:
          return state;
  }
};
