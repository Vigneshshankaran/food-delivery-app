import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletePizza, getAllPizzas } from "../actions/pizzaActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function PizzasList() {
  const dispatch = useDispatch();
  const pizzasState = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas, error, loading } = pizzasState;

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  const handleDelete = (pizzaId) => {
    dispatch(deletePizza(pizzaId));
    setSnackbarMessage("Pizza deleted successfully");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Pizzas List
      </Typography>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Prices</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pizzas &&
              pizzas.map((pizza) => (
                <TableRow key={pizza._id}>
                  <TableCell>{pizza.name}</TableCell>
                  <TableCell>
                    {Object.entries(pizza.prices[0]).map(([size, price]) => (
                      <span key={size}>
                        {size}: {price} <br />
                      </span>
                    ))}
                  </TableCell>
                  <TableCell>{pizza.category}</TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(pizza._id)}
                      aria-label="delete pizza"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Link to={`/admin/editpizza/${pizza._id}`}>
                      <IconButton color="primary" aria-label="edit pizza">
                        <EditIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}