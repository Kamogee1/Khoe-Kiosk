import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setUserRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const assignRoleBasedOnEmail = (email) => {
    let role;
    if (email === "admin@singular.com") {
      role = 1; // Admin
    } else if (email.endsWith("@singular.com")) {
      role = 2; // Normal user
    } else {
      alert("Invalid email domain. Use '@singular.com' or 'admin@singular.com'");
      return null;
    }
    return role;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    console.log('Email:', email);
    console.log('Password:', password);

    const role = assignRoleBasedOnEmail(email);
    if (role === null) return;

    try {
      const requestBody = {
        userEmail: email.trim(),  // Correct field name to match backend
        password: password.trim(),
      };
      console.log('Request Payload:', requestBody);

      const response = await fetch('https://localhost:5001/api/Users/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server Error:', errorData);
        setError(errorData.message || 'Login failed');
        return;
      }

      const data = await response.json();
      console.log('Login successful:', data);

      localStorage.setItem('userId', data.userId);
      localStorage.setItem('role', data.role);

      setUserRole(data.role === 1 ? 'admin' : 'user');
      navigate('/products');

    } catch (err) {
      console.error('Login Error:', err);
      setError('Login failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold text-center mb-4 text-primaryBlue">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-primaryBlue">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 p-2 w-full border border-lightBlue rounded-md focus:ring-2 focus:ring-primaryBlue"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-primaryBlue">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-2 w-full border border-lightBlue rounded-md focus:ring-2 focus:ring-primaryBlue pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-3 text-sm text-gray-500 focus:outline-none"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <button
          type="submit"
          className="w-full p-2 bg-primaryBlue text-white rounded hover:bg-secondaryBlue transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;




