/**
 * AdminRoute Component
 * 
 * Protected route wrapper that only allows admin users.
 * Redirects non-admin users to the appropriate dashboard.
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { ReactNode } from 'react';

interface AdminRouteProps {
  children: ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin') {
    // Redirect to appropriate dashboard based on role
    if (user?.role === 'teacher') return <Navigate to="/dashboard" replace />;
    if (user?.role === 'student') return <Navigate to="/student/dashboard" replace />;
    if (user?.role === 'parent') return <Navigate to="/parent/dashboard" replace />;
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

