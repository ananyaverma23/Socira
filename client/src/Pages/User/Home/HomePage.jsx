import React from 'react';
import { useAuth } from '../../../context/AuthContext'; // Import the auth hook

const HomePage = () => {
  // 1. Get user info and the logout function from context
  const { userInfo, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      {/* 2. Display a welcome message */}
      {userInfo ? (
        <h2>Welcome, {userInfo.name}!</h2>
      ) : (
        <h2>Welcome!</h2>
      )}
      
      {/* 3. Add the logout button */}
      <button onClick={handleLogout}>Login</button>
      <button onClick={handleLogout}>Register</button>
    </div>
  );
};

export default HomePage;