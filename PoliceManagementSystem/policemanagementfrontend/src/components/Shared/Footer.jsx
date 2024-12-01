import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#2c3e50",
        color: "#ecf0f1",
        padding: "20px 0",
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Police Management System. All Rights Reserved.
        </Typography>
        <Typography variant="body2">
          <Link href="/privacy-policy" sx={linkStyle}>
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link href="/terms-of-service" sx={linkStyle}>
            Terms of Service
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

const linkStyle = {
  color: "#1abc9c",
  textDecoration: "none",
};

export default Footer;
