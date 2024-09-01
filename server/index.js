const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const Pizza = require('./models/pizzaModel');
const db = require("./db.js");

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Routes
const pizzasRoute = require('./routes/pizzasRoute');
const userRoute = require('./routes/userRoute');
const ordersRoute = require('./routes/ordersRoute');

app.use('/api/pizzas', pizzasRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', ordersRoute);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});
