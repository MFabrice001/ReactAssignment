import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Logo or App Name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Police Management System
        </Typography>

        {/* Navigation Links */}
        <Box>
          <Button color="inherit" component={Link} to="/dashboard" sx={{ marginRight: 2 }}>
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/admin/users" sx={{ marginRight: 2 }}>
            Manage Users
          </Button>
          {/* Add more links as necessary */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
