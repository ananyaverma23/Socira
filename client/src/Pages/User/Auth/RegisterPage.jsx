import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For linking to the login page
import api from '../../../utils/api';
import { useAuth } from '../../../context/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setUserInfo } = useAuth(); // Get the setter from your context
  const navigate = useNavigate(); // Get the navigation function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Make the API call in a try/catch block
    try {
      const response = await api.post('/api/users/register', {
        name,
        email,
        password,
      });

      // On success:
      // - Store user data in global context
      setUserInfo(response.data);
      // - Redirect to the home page
      navigate('/'); 

    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

 return (
    <div>
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        {/* 9. Display the error message if it exists */}
        {error && <div style={{ color: 'red' }}>{error}</div>}

        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email (@igdtuw.ac.in)</label>
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
        {/* 10. Disable button while loading */}
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;