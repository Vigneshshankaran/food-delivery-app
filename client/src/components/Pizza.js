import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  MenuItem,
  Select,
  Modal,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components
const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiPaper-root": {
    padding: theme.spacing(2),
    maxWidth: 500,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[5],
  marginBottom: theme.spacing(2),
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.02)",
    transition: "transform 0.2s ease-in-out",
  },
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%", // Make sure the card takes the full height
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
}));

export default function Pizza({ pizza }) {
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState("small");
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addtocart = () => {
    dispatch(addToCart(pizza, quantity, variant));
  };

  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="200"
        image={pizza.image}
        alt={pizza.name}
        onClick={handleOpen}
      />
      <StyledCardContent>
        <Typography variant="h6" component="div" noWrap>
          {pizza.name}
        </Typography>
        <Box mt={2}>
          <Typography variant="body2">Varients</Typography>
          <Select
            fullWidth
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
          >
            {pizza.varients.map((varient) => (
              <MenuItem key={varient} value={varient}>
                {varient}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box mt={2}>
          <Typography variant="body2">Quantity</Typography>
          <Select
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          >
            {[...Array(10).keys()].map((x) => (
              <MenuItem key={x + 1} value={x + 1}>
                {x + 1}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box mt={2} mb={2}>
          <Typography variant="h6">
            ₹ {pizza.prices[0][variant] * quantity} /-
          </Typography>
        </Box>
      </StyledCardContent>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#34c759",
          "&:hover": {
            backgroundColor: "#2a9d76",
          },
        }}
        onClick={addtocart}
        fullWidth
      >
        ADD TO CART
      </Button>

      <StyledModal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: "80%",
            maxWidth: "500px",
            margin: "auto",
            mt: 5,
            backgroundColor: "#ffffff", // Ensure the background is white
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
          }}
        >
          <CardMedia
            component="img"
            height="300"
            image={pizza.image}
            alt={pizza.name}
            sx={{
              width: "100%",
              objectFit: "cover",
              borderRadius: 2,
              mb: 2,
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            {pizza.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {pizza.description}
          </Typography>
          <Button
            variant="outlined"
            sx={{
               color:"#fff",
              backgroundColor: "#34c759",
              "&:hover": {
                backgroundColor: "#2a9d76",
               
              },
            }}
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      </StyledModal>
    </StyledCard>
  );
}
