// CartScreen.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, deleteFromCart } from '../actions/cartActions';
import Checkout from '../components/Checkout';
import { Container, Grid, Typography, IconButton, Card, CardContent, CardMedia, Box } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';

export default function Cartscreen() {
    const cartstate = useSelector(state => state.cartReducer);
    const cartItems = cartstate.cartItems;
    const subtotal = cartItems.reduce((x, item) => x + item.price * item.quantity, 0);
    const dispatch = useDispatch();

    return (
        <Container>
            <Grid container spacing={2} sx={{ my: 2 }}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>
                        My Cart
                    </Typography>

                    {cartItems.map(item => (
                        <Card key={item._id} sx={{ display: 'flex', mb: 2 }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 80 }}
                                image={item.image}
                                alt={item.name}
                            />
                            <CardContent sx={{ flex: 1 }}>
                                <Typography variant="h6">
                                    {item.name} [{item.varient}]
                                </Typography>
                                <Typography variant="body1">
                                    Price: {item.quantity} * {item.prices[0][item.varient]} = {item.price}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="body1" sx={{ mr: 1 }}>
                                        Quantity:
                                    </Typography>
                                    <IconButton onClick={() => dispatch(addToCart(item, item.quantity + 1, item.varient))}>
                                        <Add />
                                    </IconButton>
                                    <Typography variant="body1" sx={{ mx: 1 }}>
                                        {item.quantity}
                                    </Typography>
                                    <IconButton onClick={() => item.quantity > 1 ? dispatch(addToCart(item, item.quantity - 1, item.varient)) : dispatch(deleteFromCart(item))}>
                                        <Remove />
                                    </IconButton>
                                </Box>
                                <IconButton
                                    sx={{ mt: 1 }}
                                    onClick={() => dispatch(deleteFromCart(item))}
                                >
                                    <Delete color="error" />
                                </IconButton>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h4" gutterBottom>
                            SubTotal: {subtotal} /-
                        </Typography>
                        <Checkout subtotal={subtotal} />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}
