import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet,Routes, Route } from "react-router-dom";
import { Container, Typography, List, ListItem, ListItemText, Box, AppBar, Toolbar } from "@mui/material";
import Addpizza from "./Addpizza";
import Editpizza from "./Editpizza";
import Orderslist from "./Orderslist";
import Pizzaslist from "./Pizzaslist";
import Userslist from "./Userslist";

export default function AdminScreen() {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  // const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser.isAdmin) {
      window.location.href = "/";
    }
  }, [currentUser.isAdmin]);

  return (
    <Container>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      <Box my={3}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>

        <Box display="flex" mb={2}>
          <List>
            <ListItem button component="a" href="/admin/userslist">
              <ListItemText primary="Users List" />
            </ListItem>
            <ListItem button component="a" href="/admin/pizzaslist">
              <ListItemText primary="Pizzas List" />
            </ListItem>
            <ListItem button component="a" href="/admin/addpizza">
              <ListItemText primary="Add Pizza" />
            </ListItem>
            <ListItem button component="a" href="/admin/orderslist">
              <ListItemText primary="Orders List" />
            </ListItem>
          </List>
        </Box>

        <Outlet />
      </Box>
    </Container>
  );
}

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/userslist" />} />
      <Route path="/userslist" element={<Userslist />} />
      <Route path="/orderslist" element={<Orderslist />} />
      <Route path="/pizzaslist" element={<Pizzaslist />} />
      <Route path="/addpizza" element={<Addpizza />} />
      <Route path="/editpizza/:pizzaid" element={<Editpizza />} />
    </Routes>
  );
};