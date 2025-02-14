import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import {LoaderIcon} from 'lucide-react'
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, authLoading } = useAuthContext();
  const location = useLocation();
if(authLoading){
    return <div className='flex-center h-screen'><LoaderIcon /></div>
}
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>; // Render children if authenticated
};

export default ProtectedRoute;
