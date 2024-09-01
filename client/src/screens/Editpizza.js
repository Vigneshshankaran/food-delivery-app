import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPizza, getPizzaById } from "../actions/pizzaActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";
import { Container, TextField, Button, Typography, Box, Grid, Card, CardContent } from "@mui/material";

export default function Editpizza({ match }) {
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [smallprice, setsmallprice] = useState("");
  const [mediumprice, setmediumprice] = useState("");
  const [largeprice, setlargeprice] = useState("");
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");

  const getpizzabyidstate = useSelector((state) => state.getPizzaByIdReducer);
  const { pizza, error, loading } = getpizzabyidstate;

  const editpizzastate = useSelector((state) => state.editPizzaReducer);
  const { editloading, editsuccess } = editpizzastate;

  useEffect(() => {
    if (pizza && pizza._id === match.params.pizzaid) {
      setname(pizza.name);
      setdescription(pizza.description);
      setcategory(pizza.category);
      setsmallprice(pizza.prices[0]['small']);
      setmediumprice(pizza.prices[0]['medium']);
      setlargeprice(pizza.prices[0]['large']);
      setimage(pizza.image);
    } else {
      dispatch(getPizzaById(match.params.pizzaid));
    }
  }, [pizza, dispatch, match.params.pizzaid]);

  function formHandler(e) {
    e.preventDefault();

    const editedpizza = {
      _id: match.params.pizzaid,
      name,
      image,
      description,
      category,
      prices: {
        small: smallprice,
        medium: mediumprice,
        large: largeprice,
      },
    };

    dispatch(editPizza(editedpizza));
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Edit Pizza
        </Typography>

        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {editsuccess && <Success success="Pizza details edited successfully" />}
        {editloading && <Loading />}

        <Card>
          <CardContent>
            <form onSubmit={formHandler}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Small Variant Price"
                    variant="outlined"
                    value={smallprice}
                    onChange={(e) => setsmallprice(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Medium Variant Price"
                    variant="outlined"
                    value={mediumprice}
                    onChange={(e) => setmediumprice(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Large Variant Price"
                    variant="outlined"
                    value={largeprice}
                    onChange={(e) => setlargeprice(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Category"
                    variant="outlined"
                    value={category}
                    onChange={(e) => setcategory(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Image URL"
                    variant="outlined"
                    value={image}
                    onChange={(e) => setimage(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Edit Pizza
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
