import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../actions/orderActions';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { Typography, Paper, Grid, Divider, Box } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Ordersscreen() {
  const dispatch = useDispatch();
  const orderstate = useSelector((state) => state.getUserOrdersReducer);
  const { orders, error, loading } = orderstate;

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  AOS.init();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      <Divider sx={{ mb: 3 }} />
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      <Grid container spacing={2} justifyContent="center">
        {orders &&
          orders.map((order) => (
            <Grid item xs={12} md={8} key={order._id}>
              <Paper
                elevation={3}
                sx={{ p: 3, mb: 2, backgroundColor: '#1c1c1E', color: 'white' }}
                data-aos="fade-down"
              >
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6">Items</Typography>
                  <Divider sx={{ mb: 1 }} />
                  {order.orderItems.map((item) => (
                    <Typography key={item._id}>
                      {item.name} [{item.varient}] * {item.quantity} = {item.price}
                    </Typography>
                  ))}
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6">Address</Typography>
                  <Divider sx={{ mb: 1 }} />
                  <Typography>Street: {order.shippingAddress.street}</Typography>
                  <Typography>City: {order.shippingAddress.city}</Typography>
                  <Typography>Country: {order.shippingAddress.country}</Typography>
                  <Typography>Pincode: {order.shippingAddress.pincode}</Typography>
                </Box>

                <Box>
                  <Typography variant="h6">Order Info</Typography>
                  <Divider sx={{ mb: 1 }} />
                  <Typography>Order Amount: {order.orderAmount}</Typography>
                  <Typography>Date: {order.createdAt.substring(0, 10)}</Typography>
                  <Typography>Transaction Id: {order.transactionId}</Typography>
                  <Typography>Order Id: {order._id}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
