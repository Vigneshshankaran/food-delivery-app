import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

export default function Loading({ size = 100, message = "Loading..." }) {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh'
      }}
      aria-live="polite"
    >
      <CircularProgress size={size} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
}
