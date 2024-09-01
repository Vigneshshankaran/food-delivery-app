import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addPizza } from "../actions/pizzaActions";
import { Container, Grid, TextField, Button, CircularProgress, Alert, Typography } from '@mui/material';

export default function AddPizza() {
  const [name, setName] = useState("");
  const [smallPrice, setSmallPrice] = useState("");
  const [mediumPrice, setMediumPrice] = useState("");
  const [largePrice, setLargePrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const addPizzaState = useSelector(state => state.addPizzaReducer);
  const { success, error, loading } = addPizzaState;

  function formHandler(e) {
    e.preventDefault();

    const pizza = {
      name,
      image,
      description,
      category,
      prices: {
        small: smallPrice,
        medium: mediumPrice,
        large: largePrice
      }
    };

    dispatch(addPizza(pizza));
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Add Pizza</Typography>
      
      {loading && <CircularProgress />}
      {error && <Alert severity="error">Something went wrong</Alert>}
      {success && <Alert severity="success">New Pizza added successfully</Alert>}

      <form onSubmit={formHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Small Variant Price"
              fullWidth
              value={smallPrice}
              onChange={(e) => setSmallPrice(e.target.value)}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Medium Variant Price"
              fullWidth
              value={mediumPrice}
              onChange={(e) => setMediumPrice(e.target.value)}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Large Variant Price"
              fullWidth
              value={largePrice}
              onChange={(e) => setLargePrice(e.target.value)}
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Category"
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Image URL"
              fullWidth
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Pizza
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
