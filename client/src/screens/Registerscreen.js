import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';

export default function Registerscreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const registerstate = useSelector((state) => state.registerUserReducer);
  const { error, loading, success } = registerstate;
  const dispatch = useDispatch();

  function register() {
    if (password !== cpassword) {
      alert("Passwords do not match");
    } else {
      const user = {
        name,
        email,
        password,
      };
      dispatch(registerUser(user));
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>

        {loading && <Loading />}
        {success && <Success success="User Registered Successfully" />}
        {error && <Error error="Email already registered" />}

        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, backgroundColor: "#34c759",
              '&:hover': {
                  backgroundColor: "#2a9d76"
              },
              borderRadius: 1}}
            onClick={register}
          >
            Register
          </Button>
          <Typography variant="body2" align="center">
            Already have an account? <a href="/login">Login here</a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
