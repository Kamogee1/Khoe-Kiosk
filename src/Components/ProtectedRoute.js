// src/Components/ProtectedRoute.js
// src/Components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute component to guard routes based on user authentication and role.
 * 
 * @param {Object} props
 * @param {string} props.userRole - The role of the current user.
 * @param {Array} [props.allowedRoles] - List of roles allowed to access the route.
 * @param {ReactNode} props.children - The components to render if access is allowed.
 * @returns {ReactNode} - The children components if access is granted; otherwise, redirects to login or access denied page.
 */
const ProtectedRoute = ({ userRole, allowedRoles = [], children }) => {
  if (!userRole) {
    // Redirect to login if no user role is found
    return <Navigate to="/login" replace />;
  }

  // Check if the current user's role is included in the allowed roles
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect to access denied page if user role is not in allowedRoles
    return <Navigate to="/access-denied" replace />;
  }

  // Render children components if access is granted
  return children;
};

export default ProtectedRoute;

