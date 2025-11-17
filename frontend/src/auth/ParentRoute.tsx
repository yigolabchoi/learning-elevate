/**
 * Parent Route Guard
 * 
 * Protects routes that should only be accessible to parents.
 * Redirects to login if not authenticated or not a parent.
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ParentRouteProps {
  children: React.ReactNode;
}

export const ParentRoute = ({ children }: ParentRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'parent') {
    // If authenticated but not a parent, redirect to their appropriate dashboard
    if (user?.role === 'teacher') {
      return <Navigate to="/dashboard" replace />;
    }
    if (user?.role === 'admin') {
      return <Navigate to="/dashboard" replace />;
    }
    if (user?.role === 'student') {
      return <Navigate to="/student/home" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

