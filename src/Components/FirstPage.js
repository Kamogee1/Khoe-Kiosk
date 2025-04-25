// src/Components/FirstPage.js
// src/Components/FirstPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FirstPage.css'; // Custom CSS for animations
import Logo from '../LOGO.jpg';


const FirstPage = () => {
  const [showPhrase, setShowPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPhrase((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex flex-col justify-between min-h-screen text-white relative"
      style={{
        backgroundColor: '#d2e5d1', // Jadeite background
      }}
    >
      {/* Top-right navigation */}
      <div className="absolute top-4 right-8 flex space-x-6">
        <Link to="/login" className="text-blue-700 hover:text-blue-900 font-medium">Login</Link>
        <Link to="/register" className="text-blue-700 hover:text-blue-900 font-medium">Sign Up</Link>
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center justify-center flex-grow text-center space-y-6">
        {/* Logo */}
        <img
          src={Logo}
          alt="Khoe Kiosk Logo"
          className="w-36 h-36 sm:w-48 sm:h-48 object-contain"
        />

        {/* 'Discover' */}
        {showPhrase === 0 && (
          <h1 className="text-5xl font-bold fadeEffect text-gray-800">Discover</h1>
        )}

        {/* Sliding Phrases */}
        <div className="mt-4 flex space-x-6 text-2xl font-semibold text-blue-800">
          <div className={`slideFadeEffect ${showPhrase === 1 ? 'slideInLeft' : 'slideOutLeft'}`}>
            Great Food
          </div>
          <div className={`slideFadeEffect ${showPhrase === 2 ? 'slideInRight' : 'slideOutRight'}`}>
            Great People
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-700 font-bold py-4">
        © 2025. KHOE KIOSK
      </footer>
    </div>
  );
};

export default FirstPage;