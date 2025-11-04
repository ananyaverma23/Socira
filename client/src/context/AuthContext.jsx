import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api'; // <-- Import api
import { useNavigate } from 'react-router-dom';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider (a component that wraps your app)
export const AuthProvider = ({ children }) => {
  // 3. Define the state
  // We check localStorage to keep the user logged in on page refresh
  const [userInfo, setUserInfo] = useState(() => {
    try {
      const storedUser = localStorage.getItem('userInfo');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse userInfo from localStorage", error);
      return null;
    }
  });

  // 4. Save to localStorage whenever userInfo changes
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [userInfo]);

  const logout = async () => {
    try {
      await api.post('/api/users/logout'); // Call backend endpoint
      setUserInfo(null); // Clear state
      localStorage.removeItem('userInfo'); // Clear storage
      navigate('/login'); // Redirect to login
    } catch (err) {
      console.error("Logout failed:", err);
      // Even if API fails, force logout on client
      setUserInfo(null);
      localStorage.removeItem('userInfo');
      navigate('/login');
    }
  };

  // 5. Provide the state and setter function to children
  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 6. Create a custom hook to easily use this context
export const useAuth = () => {
  return useContext(AuthContext);
};