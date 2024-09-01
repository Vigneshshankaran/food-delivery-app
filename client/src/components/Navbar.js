import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  IconButton,
  MenuItem,
  Badge,
  useMediaQuery,
  useTheme,
  Box
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Link } from "react-router-dom"; 
import { logoutUser } from "../actions/userActions";

export default function Navbar() {
  const cartState = useSelector((state) => state.cartReducer);
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    handleMenuClose();
  };

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <AppBar position="static" sx={{ backgroundColor: '#34c759' }}>
      <Toolbar>
        {/* Logo and Mobile Menu Icon */}
        <Box sx={{ flexGrow: 1, display: { xs: 'block', lg: 'none' } }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ display: 'inline', marginLeft: 2 }}>
            Deva Pizza Shop
          </Typography>
        </Box>

        {/* Desktop Logo */}
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, flexGrow: 1 }}>
          <Typography variant="h6">
            Deva Pizza Shop
          </Typography>
        </Box>

        {/* Mobile Menu Dropdown */}
        <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{ sx: { width: 'auto', maxWidth: 240 } }}
          >
            {currentUser ? (
              <>
                <MenuItem onClick={handleMenuClose}>{currentUser.name}</MenuItem>
                <MenuItem component={Link} to="/orders">Orders</MenuItem>
                <MenuItem component={Link} to="/cart" onClick={handleMenuClose}>
                  <ShoppingCartCheckoutIcon />
                  <Badge badgeContent={cartState.cartItems.length} color="secondary" sx={{ marginLeft: 1 }} />
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            ) : (
              <>
                <MenuItem component={Link} to="/login">Login</MenuItem>
                <MenuItem component={Link} to="/cart" onClick={handleMenuClose}>
                  Cart
                  <Badge badgeContent={cartState.cartItems.length} color="secondary" sx={{ marginLeft: 1 }} />
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>

        {/* Desktop Login and Cart Buttons */}
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center' }}>
          {isLargeScreen && currentUser && (
            <Button component={Link} to="/orders" color="inherit">
              Orders
            </Button>
          )}
          {isLargeScreen && (
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          )}
          {isLargeScreen && (
            <Button component={Link} to="/cart" color="inherit">
              <ShoppingCartCheckoutIcon />
              <Badge badgeContent={cartState.cartItems.length} color="secondary"  />
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
