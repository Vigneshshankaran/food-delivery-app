import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import Cartscreen from './screens/Cartscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Ordersscreen from './screens/Ordersscreen';
import Adminscreen from './screens/Adminscreen';

function App() {
  return (
    <Router>
      <CssBaseline /> {/* Apply baseline CSS reset */}
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/" exact element={<Homescreen />} />
          <Route path="/cart" exact element={<Cartscreen />} />
          <Route path="/register" exact element={<Registerscreen />} />
          <Route path="/login" exact element={<Loginscreen />} />
          <Route path="/orders" exact element={<Ordersscreen />} />
          <Route path="/admin/*" element={<Adminscreen />} /> {/* Use path with wildcard for nested routes */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;