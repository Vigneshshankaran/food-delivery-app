import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser } from "../actions/userActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Userslist() {
  const dispatch = useDispatch();
  const usersstate = useSelector(state => state.getAllUsersReducer);
  const { error, loading, users } = usersstate;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Users List
      </Typography>

      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map(user => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton 
                    color="error"
                    onClick={() => dispatch(deleteUser(user._id))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
