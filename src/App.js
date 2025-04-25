// src/App.js
// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirstPage from './Components/FirstPage';
import RegistrationForm from './Components/RegistrationForm';
import LoginPage from './Components/LoginPage';
import ProductList from './Components/ProductList';
import ProtectedRoute from './Components/ProtectedRoute';
import AccessDenied from './Components/AccessDenied';
import AddProductForm from './Components/AddProductForm';

const App = () => {
  const [userRole, setUserRole] = useState(null);

  return (
    <Router>
      <Routes>

        {/* ✅ Make FirstPage the default landing page */}
        <Route path="/" element={<FirstPage />} />

        {/* 🔐 Register */}
        <Route path="/register" element={<RegistrationForm setUserRole={setUserRole} />} />

        {/* 🔐 Login */}
        <Route path="/login" element={<LoginPage setUserRole={setUserRole} />} />

        {/* 👥 Protected route: Product List (User + Admin) */}
        <Route
          path="/products"
          element={
            <ProtectedRoute userRole={userRole} allowedRoles={['user', 'admin']}>
              <ProductList userRole={userRole} />
            </ProtectedRoute>
          }
        />

        {/* 🛠 Admin-only route: Add product */}
        <Route
          path="/add-product"
          element={
            <ProtectedRoute userRole={userRole} allowedRoles={['admin']}>
              <AddProductForm />
            </ProtectedRoute>
          }
        />

        {/* 🚫 Access Denied */}
        <Route path="/access-denied" element={<AccessDenied />} />

      </Routes>
    </Router>
  );
};

export default App;

