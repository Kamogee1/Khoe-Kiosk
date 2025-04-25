import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after login


const LoginPage = ({ setUserRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Updated from useHistory to useNavigate

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission reload 
  
    const domain = email.split('@')[1];
    if (domain === 'singular.com') {
      setUserRole('user');
      navigate('/products');
    } else if (domain === 'adminsingular.com') {
      setUserRole('admin');
      navigate('/products');
    } else {
      setError('Invalid email domain');
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
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 p-2 w-full border border-lightBlue rounded-md focus:ring-2 focus:ring-primaryBlue"
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <button type="submit" className="w-full p-2 bg-primaryBlue text-white rounded hover:bg-secondaryBlue transition-colors">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
