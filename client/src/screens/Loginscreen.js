import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { Container, Box, TextField, Button, Typography, Link } from "@mui/material";

export default function Loginscreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const loginstate = useSelector((state) => state.loginUserReducer);
  const { loading, error } = loginstate;
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      window.location.href = '/';
    }
  }, []);

  function handleLogin() {
    const user = { email, password };
    dispatch(loginUser(user));
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'background.paper'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        {loading && <Loading />}
        {error && <Error error="Invalid Credentials" />}

        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }} sx={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, backgroundColor: "#34c759",
              '&:hover': {
                  backgroundColor: "#2a9d76"
              },
              borderRadius: 1}}
          >
            Login
          </Button>
          <Link href="/register" variant="body2" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
       
            Click Here To Register
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
