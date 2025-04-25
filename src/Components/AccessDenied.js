import React from 'react';

/**
 * AccessDenied component to display a message when a user attempts to access a restricted page.
 * 
 *
 */
const AccessDenied = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
    <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md w-full">
      <h2 className="text-3xl font-semibold text-primaryBlue mb-4">Access Denied</h2>
      <p className="text-lg text-gray-700 mb-4">
        You do not have permission to view this page.
      </p>
      <p className="text-sm text-gray-500">
        Please contact the administrator if you believe this is an error.
      </p>
    </div>
  </div> 
);

export default AccessDenied;
