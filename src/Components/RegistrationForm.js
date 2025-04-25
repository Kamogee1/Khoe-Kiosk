// src/Components/RegisterForm.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

const RegistrationForm = ({ setUserRole }) => {
  const [redirect, setRedirect] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); 
  const { register, handleSubmit, reset, formState: { errors } } = useForm(); // Ensure `reset` is here

  const onSubmit = async (data) => {
    const email = data.email.toLowerCase();

    // 1. Determine user role based on email
    let role;
    if (email === "admin@singular.com") {
      role = 1; // Admin
    } else if (email.endsWith("@singular.com")) {
      role = 2; // Normal user
    } else {
      alert("Invalid email domain. Use '@singular.com' or 'admin@singular.com'");
      return;
    }

    // 2. Save role for UI control
    setUserRole(role);
    localStorage.setItem("userRole", role); // Persist role

    try {
      const response = await fetch(`https://localhost:5001/api/Users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: data.username,
          userPassword: data.password,
          name: data.firstName,
          surname: data.lastName,
          userEmail: data.email
        })
      });
    
      if (response.ok) {
        reset();
        setSuccessMessage("✅ Profile created successfully! Redirecting to login...");
        setTimeout(() => setRedirect(true), 2000);
      } else {
        const errorData = await response.json();
        console.error("⚠️ Server responded with an error:", errorData);
        alert(errorData.message || "Registration failed.");
      }
    } catch (err) {
      console.error("🚨 Network or server error:", err); // ← this is crucial
      alert(`An error occurred: ${err.message}`);
    }
  }

  // If registration was successful, redirect to login
  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/Image/kisk one.jpg')" }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md backdrop-blur-sm bg-opacity-90">
        <img
          src="/Image/SingularSocialSharingImage.png"
          alt="Khoe Kiosk Logo"
          className="w-32 mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">Welcome to the Khoe Kiosk</h1>
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Sign-Up</h2>
        
        {successMessage && (
          <div className="text-green-600 text-center mb-4 font-semibold">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            {...register('username', { required: "Username is required" })}
            placeholder="Username"
            className="w-full px-4 py-2 mb-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && <p className="text-red-500 text-sm mb-2">{errors.username.message}</p>}

          <input
            {...register('firstName', { required: "First name is required" })}
            placeholder="First Name"
            className="w-full px-4 py-2 mb-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.firstName && <p className="text-red-500 text-sm mb-2">{errors.firstName.message}</p>}

          <input
            {...register('lastName', { required: "Last name is required" })}
            placeholder="Last Name"
            className="w-full px-4 py-2 mb-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.lastName && <p className="text-red-500 text-sm mb-2">{errors.lastName.message}</p>}

          <input
            {...register('email', {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format"
              }
            })}
            placeholder="Email"
            className="w-full px-4 py-2 mb-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

          <input
            {...register('password', {
              required: "Password is required",
              minLength: { value: 8, message: "At least 8 characters" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                message: "Password must contain upper, lower, number & symbol"
              }
            })}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;