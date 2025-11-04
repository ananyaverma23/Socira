import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import RegisterPage from '../Pages/User/Auth/RegisterPage';
import LoginPage from '../Pages/User/Auth/LoginPage';
import HomePage from '../Pages/User/Home/HomePage';

const UserRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />

      <Route element={<ProtectedRoute />}>
        {/* <Route path="/" element={<HomePage />} /> */}
      </Route>

      {/* --- Not Found Route --- */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default UserRoutes;