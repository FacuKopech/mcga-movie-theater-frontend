import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRouteProps } from '../interfaces/PrivateRoutesProps';

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, redirectPath = '/login' }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default PrivateRoute;
