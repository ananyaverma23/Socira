import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../utils/api'; // 1. Import api client
import { useAuth } from '../../../context/AuthContext'; // 2. Import auth hook

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 3. Add loading, error, and navigation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userInfo, setUserInfo } = useAuth(); // 4. Get auth state and setter
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (userInfo) {
      navigate('/'); // Redirect to home if user is already logged in
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 5. Make the API call in a try/catch
    try {
      const response = await api.post('/api/users/login', {
        email,
        password,
      });

      // 6. On success, store user data and navigate
      setUserInfo(response.data);
      navigate('/');
      
    } catch (err) {
      // 7. On failure, set the error message
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* 8. Display error message */}
        {error && <div style={{ color: 'red' }}>{error}</div>}

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* 9. Disable button while loading */}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;