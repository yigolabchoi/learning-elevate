/**
 * Student Route Guard
 * 
 * Protects routes that should only be accessible to students.
 * Redirects to login if not authenticated or not a student.
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface StudentRouteProps {
  children: React.ReactNode;
}

export const StudentRoute = ({ children }: StudentRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'student') {
    // If authenticated but not a student, redirect to their appropriate dashboard
    if (user?.role === 'teacher') {
      return <Navigate to="/dashboard" replace />;
    }
    if (user?.role === 'admin') {
      return <Navigate to="/dashboard" replace />;
    }
    if (user?.role === 'parent') {
      return <Navigate to="/parent/children" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

