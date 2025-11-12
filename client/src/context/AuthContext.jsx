import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

// Create Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(() => {
    try {
      const storedUser = localStorage.getItem('userInfo');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse userInfo from localStorage", error);
      return null;
    }
  });

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [userInfo]);

  const logout = async () => {
    try {
      // Only call API if the endpoint actually exists
      if (api) {
        await api.post('/api/users/logout');
      }
    } catch (err) {
      console.error("Logout API failed:", err);
    } finally {
      // Always clear local data, even if API fails
      setUserInfo(null);
      localStorage.removeItem('userInfo');
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
