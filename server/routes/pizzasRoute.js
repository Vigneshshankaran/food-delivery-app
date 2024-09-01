const express = require("express");
const router = express.Router(); // Fixed typo in 'router'

const Pizza = require('../models/pizzaModel');

// Use async/await for better error handling and readability
router.get("/getallpizzas", async (req, res) => {
  try {
    const pizzas = await Pizza.find({}); // Fixed typo in 'find'
    res.json(pizzas); // Use res.json for proper JSON response formatting
  } catch (error) {
    console.error(error.message); // Log error message for debugging
    res.status(500).json({ message: "An error occurred while fetching pizzas" }); // Return a generic error message
  }
});

module.exports = router;
