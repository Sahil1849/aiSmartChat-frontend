import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../Screens/Login";
import Register from "../Screens/Register";
import Home from "../Screens/Home";
import Project from "../Screens/Project";
import ErrorPage from "../components/ErrorPage";
import { isAuthenticated } from "../utils/isAuthenticated";

// Protected Route Component
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/project/:id"
          element={<PrivateRoute element={<Project />} />}
        />

        {/* 404 Page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
