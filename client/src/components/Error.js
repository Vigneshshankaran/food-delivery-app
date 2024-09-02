import React from "react";
import { Alert, AlertTitle } from "@mui/material";

export default function Error({ error, title = "Error", severity = "error" }) {
  return (
    <Alert severity={severity} sx={{ mt: 2 }}>
      <AlertTitle>{title}</AlertTitle>
      {error}
    </Alert>
  );
}
