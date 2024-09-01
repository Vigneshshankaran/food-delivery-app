const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Use environment variable for sensitive data
const Order = require('../models/orderModel');

// Route to place an order
router.post("/placeorder", async (req, res) => {
  const { token, subtotal, currentUser, cartItems } = req.body;

  try {
    // Create a new customer on Stripe
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    // Create a charge for the customer
    const payment = await stripe.charges.create({
      amount: subtotal * 100,
      currency: 'inr',
      customer: customer.id,
      receipt_email: token.email,
    }, {
      idempotencyKey: uuidv4(), // Ensure idempotency to avoid duplicate charges
    });

    // If payment is successful, save the order
    if (payment) {
      const newOrder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userid: currentUser._id,
        orderItems: cartItems,
        orderAmount: subtotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          pincode: token.card.address_zip,
        },
        transactionId: payment.id, // Use payment ID for transaction ID
      });

      await newOrder.save();

      res.status(201).json({ message: 'Order placed successfully' });
    } else {
      res.status(500).json({ message: 'Payment failed' });
    }
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(400).json({ message: 'Something went wrong', error });
  }
});

// Route to get user-specific orders
router.post("/getuserorders", async (req, res) => {
  const { userid } = req.body;

  try {
    const orders = await Order.find({ userid }).sort({ _id: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(400).json({ message: 'Something went wrong', error });
  }
});

// Route to get all orders
router.get("/getallorders", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(400).json({ message: 'Something went wrong', error });
  }
});

// Route to mark an order as delivered
router.post("/deliverorder", async (req, res) => {
  const { orderid } = req.body;

  try {
    const order = await Order.findById(orderid);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.isDelivered = true;
    await order.save();

    res.status(200).json({ message: 'Order Delivered Successfully' });
  } catch (error) {
    console.error("Error delivering order:", error);
    res.status(400).json({ message: 'Something went wrong', error });
  }
});

module.exports = router;
