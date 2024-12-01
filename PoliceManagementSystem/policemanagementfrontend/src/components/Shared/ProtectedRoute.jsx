import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { CircularProgress, Snackbar, Alert } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token !== null) {
      setLoading(false);
    } else {
      setLoading(false);
      setOpenSnackbar(true);
    }
  }, [token]);

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "auto", paddingTop: "20px" }} />;
  }

  return token ? (
    children
  ) : (
    <>
      <Navigate to="/login" />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="warning" sx={{ width: "100%" }}>
          You must log in to access this page!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProtectedRoute;
