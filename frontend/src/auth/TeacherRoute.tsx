/**
 * TeacherRoute Component
 * 
 * Protected route wrapper that only allows teacher users.
 * Redirects non-teacher users to the appropriate dashboard.
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { ReactNode } from 'react';

interface TeacherRouteProps {
  children: ReactNode;
}

export const TeacherRoute = ({ children }: TeacherRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'teacher' && user?.role !== 'admin') {
    // Admin can access teacher routes
    if (user?.role === 'student') return <Navigate to="/student/dashboard" replace />;
    if (user?.role === 'parent') return <Navigate to="/parent/dashboard" replace />;
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

