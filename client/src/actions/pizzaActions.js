import axios from "axios";

const API_BASE_URL = 'https://food-delivery-app-17wz.vercel.app/api/pizzas';

// Action to get all pizzas
export const getAllPizzas = () => async (dispatch) => {
    dispatch({ type: 'GET_PIZZAS_REQUEST' });

    try {
        const response = await axios.get(`${API_BASE_URL}/getallpizzas`);
        dispatch({ type: 'GET_PIZZAS_SUCCESS', payload: response.data });
    } catch (error) {
        console.error('Error fetching pizzas:', error);
        dispatch({ type: 'GET_PIZZAS_FAILED', payload: error.message });
    }
};

// Action to get a pizza by ID
export const getPizzaById = (pizzaId) => async (dispatch) => {
    dispatch({ type: 'GET_PIZZABYID_REQUEST' });

    try {
        const response = await axios.post(`${API_BASE_URL}/getpizzabyid`, { pizzaId });
        dispatch({ type: 'GET_PIZZABYID_SUCCESS', payload: response.data });
    } catch (error) {
        console.error(`Error fetching pizza with ID ${pizzaId}:`, error);
        dispatch({ type: 'GET_PIZZABYID_FAILED', payload: error.message });
    }
};

// Action to filter pizzas by search key and category
export const filterPizzas = (searchKey, category) => async (dispatch) => {
    dispatch({ type: 'GET_PIZZAS_REQUEST' });

    try {
        const response = await axios.get(`${API_BASE_URL}/getallpizzas`);
        let filteredPizzas = response.data;

        if (searchKey) {
            filteredPizzas = filteredPizzas.filter(pizza =>
                pizza.name.toLowerCase().includes(searchKey.toLowerCase())
            );
        }

        if (category && category !== 'all') {
            filteredPizzas = filteredPizzas.filter(pizza =>
                pizza.category.toLowerCase() === category.toLowerCase()
            );
        }

        dispatch({ type: 'GET_PIZZAS_SUCCESS', payload: filteredPizzas });
    } catch (error) {
        console.error('Error filtering pizzas:', error);
        dispatch({ type: 'GET_PIZZAS_FAILED', payload: error.message });
    }
};

// Action to add a new pizza
export const addPizza = (pizza) => async (dispatch) => {
    dispatch({ type: 'ADD_PIZZA_REQUEST' });

    try {
        await axios.post(`${API_BASE_URL}/addpizza`, pizza);
        dispatch({ type: 'ADD_PIZZA_SUCCESS' });
    } catch (error) {
        console.error('Error adding pizza:', error);
        dispatch({ type: 'ADD_PIZZA_FAILED', payload: error.message });
    }
};

// Action to edit an existing pizza
export const editPizza = (editedPizza) => async (dispatch) => {
    dispatch({ type: 'EDIT_PIZZA_REQUEST' });

    try {
        await axios.post(`${API_BASE_URL}/editpizza`, editedPizza);
        dispatch({ type: 'EDIT_PIZZA_SUCCESS' });
        window.location.href = '/admin/pizzaslist';
    } catch (error) {
        console.error('Error editing pizza:', error);
        dispatch({ type: 'EDIT_PIZZA_FAILED', payload: error.message });
    }
};

// Action to delete a pizza by ID
export const deletePizza = (pizzaId) => async (dispatch) => {
    try {
        await axios.post(`${API_BASE_URL}/deletepizza`, { pizzaId });
        alert('Pizza deleted successfully');
        window.location.reload();
    } catch (error) {
        console.error(`Error deleting pizza with ID ${pizzaId}:`, error);
        alert('Something went wrong');
    }
};