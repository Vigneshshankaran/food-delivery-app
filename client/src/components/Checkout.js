import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { placeOrder } from '../actions/orderActions';
import { CircularProgress, Container, Typography, Box, Button, Paper, Grid } from '@mui/material';
import Error from '../components/Error';
import Success from '../components/Success';

export default function Checkout({ subtotal }) {
    const orderState = useSelector((state) => state.placeOrderReducer);
    const { loading, error, success } = orderState;
    const dispatch = useDispatch();

    function tokenHandler(token) {
        dispatch(placeOrder(token, subtotal));
    }

    return (
        <Container
            component={Paper}
            elevation={3}
            sx={{
                p: { xs: 2, md: 4 },
                mt: 2,
                maxWidth: '600px',
                mx: 'auto',
            }}
        >
            <Typography variant="h5" gutterBottom align="center">
                Checkout
            </Typography>

            <Grid container spacing={2}>
                {loading && (
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" mt={2}>
                            <CircularProgress />
                        </Box>
                    </Grid>
                )}

                {error && (
                    <Grid item xs={12}>
                        <Box mt={2}>
                            <Error error="Something went wrong" />
                        </Box>
                    </Grid>
                )}

                {success && (
                    <Grid item xs={12}>
                        <Box mt={2}>
                            <Success success="Your Order Placed Successfully" />
                        </Box>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <StripeCheckout
                        amount={subtotal * 100}
                        shippingAddress
                        token={tokenHandler}
                        stripeKey="pk_test_51PtmDzRxdWQ5YIsefTrZt0vfjiqSPL6tAN25LeAi2pLYj8eTK8M0ZdoiGwhlbD4Valmi7cA96jjFJwr4ORbcHJ1L00F110TNzh"
                        currency="INR"
                    >
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Button variant="contained" fullWidth sx={{
                                    backgroundColor: "#34c759",
                                    '&:hover': {
                                        backgroundColor: "#2a9d76"
                                    },
                                    borderRadius: 1
                                }}>
                                Pay Now
                            </Button>
                        </Box>
                    </StripeCheckout>
                </Grid>
            </Grid>
        </Container>
    );
}
