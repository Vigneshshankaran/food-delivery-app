const mongoose = require('mongoose');

// Define the schema for the pizza model
const pizzaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  varients: { type: Array, required: true },
  prices: { type: Array, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create the model for pizzas based on the schema
const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;
