import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button, Container, CssBaseline, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import UserList from "./components/Users/UserList";
import UserForm from "./components/UserForm";
import UserSearch from "./components/UserSearch";
import CrimeList from "./components/Crimes/CrimeList";
import CrimeForm from "./components/Crimes/CrimeForm";
import NotificationList from "./components/Notifications/NotificationList";
import Export from "./components/Reports/Export";
import Upload from "./components/Reports/Upload";

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* AppBar/Header */}
        <Header />

        {/* Main Content with Padding and Material UI Styles */}
        <CssBaseline />
        <Container component="main" maxWidth="lg" style={{ padding: "20px", minHeight: "80vh" }}>
          <Box>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <UserList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users/add"
                element={
                  <ProtectedRoute>
                    <UserForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users/search"
                element={
                  <ProtectedRoute>
                    <UserSearch />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/crimes"
                element={
                  <ProtectedRoute>
                    <CrimeList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/crimes/add"
                element={
                  <ProtectedRoute>
                    <CrimeForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <NotificationList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/export"
                element={
                  <ProtectedRoute>
                    <Export />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/upload"
                element={
                  <ProtectedRoute>
                    <Upload />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Box>
        </Container>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
