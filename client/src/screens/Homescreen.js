import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas } from "../actions/pizzaActions";
import Error from "../components/Error";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
import Pizza from "../components/Pizza";
import { Container, Grid, } from "@mui/material";

export default function Homescreen() {
  const dispatch = useDispatch();
  const pizzasstate = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas, error, loading } = pizzasstate;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  return (
    <Container sx={{ mt: 4 }}>
      <Filter />
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error="Something went wrong" />
      ) : (
        <Grid container spacing={3} sx={{ pt: 3 }}>
          {pizzas.map((pizza) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pizza._id}>
              <Pizza pizza={pizza} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
