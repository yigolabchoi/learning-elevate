/**
 * Role-based Dashboard Router
 * 
 * Renders the appropriate dashboard based on user role:
 * - Admin → AdminDashboard
 * - Teacher → TeacherDashboard
 * - Others → Redirect or placeholder
 */

import { useAuth } from '../../auth/AuthContext';
import { AdminDashboard } from './AdminDashboard';
import { TeacherDashboard } from './TeacherDashboard';

export const RoleDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-yellow-800">Please log in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    default:
      return (
        <div className="p-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome!</h2>
            <p className="text-gray-600">
              Dashboard for {user.role} role is not yet implemented.
            </p>
          </div>
        </div>
      );
  }
};

