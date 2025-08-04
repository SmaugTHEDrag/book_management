import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { Spinner } from 'flowbite-react';


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  const token = localStorage.getItem("token");

  if (loading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  if (user && token) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};


export default PrivateRoute;