/**
 * Application Routes
 * 
 * Central routing configuration for the School Portal.
 * Includes role-based route protection and layout composition.
 * 
 * Route Protection:
 * - Public: /login (redirects to /dashboard if authenticated)
 * - Admin: /admin/* (admin only)
 * - Teacher: /teacher/* (teacher + admin)
 * - Dashboard: accessible to both admin and teacher
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { AdminRoute } from '../auth/AdminRoute';
import { TeacherRoute } from '../auth/TeacherRoute';
import { MainLayout } from '../layout/MainLayout';

// Pages
import { Login } from '../pages/Login/Login';
import { SchoolLogin } from '../pages/Login/SchoolLogin';
import { StudentLogin } from '../pages/Login/StudentLogin';
import { RoleDashboard } from '../pages/Dashboard/RoleDashboard';

// Admin Pages
import { ClassList } from '../pages/Admin/Classes/ClassList';
import { ClassCreate } from '../pages/Admin/Classes/ClassCreate';
import { ClassEdit } from '../pages/Admin/Classes/ClassEdit';
import { UserManagement } from '../pages/Admin/Users/UserManagement';

// Teacher Pages
import { CurriculaList } from '../pages/Teacher/Curricula/CurriculaList';
import { CurriculumCreate } from '../pages/Teacher/Curricula/CurriculumCreate';
import { CurriculumEdit } from '../pages/Teacher/Curricula/CurriculumEdit';
import { CurriculumDetail } from '../pages/Teacher/Curricula/CurriculumDetail';
import { ProblemSetsList } from '../pages/Teacher/ProblemSets/ProblemSetsList';
import { ProblemSetCreate } from '../pages/Teacher/ProblemSets/ProblemSetCreate';
import { ProblemSetDetail } from '../pages/Teacher/ProblemSets/ProblemSetDetail';
import { AssignmentList } from '../pages/Teacher/Assignments/AssignmentList';
import { AssignmentCreate } from '../pages/Teacher/Assignments/AssignmentCreate';
import { SubmissionList } from '../pages/Teacher/Submissions/SubmissionList';
import { ClassReport } from '../pages/Teacher/Reports/ClassReport';
import { StudentReport } from '../pages/Teacher/Reports/StudentReport';
import { StudentList } from '../pages/Teacher/Students/StudentList';
import { StudentDetail } from '../pages/Teacher/Students/StudentDetail';

// Student Pages
import { StudentHome } from '../pages/Student/Home/StudentHome';
import { StudentAssignmentList } from '../pages/Student/Assignments/AssignmentList';
import { StudentAssignmentDetail } from '../pages/Student/Assignments/AssignmentDetail';
import { StudentSolve } from '../pages/Student/Solve/StudentSolve';
import { StudentPractice } from '../pages/Student/Practice/Practice';
import { HistoryList as StudentHistoryList } from '../pages/Student/History/HistoryList';
import { HistoryDetail } from '../pages/Student/History/HistoryDetail';
import { FeedbackDetail } from '../pages/Student/Feedback/FeedbackDetail';
import { StudentProfile } from '../pages/Student/Profile/StudentProfile';

// Parent Pages
import { ParentChildrenList } from '../pages/Parent/Children/ChildrenList';
import { ChildDashboard } from '../pages/Parent/Dashboard/ChildDashboard';
import { ChildDetails } from '../pages/Parent/Details/ChildDetails';
import { ChildResults } from '../pages/Parent/Results/ChildResults';
import { ParentNotifications } from '../pages/Parent/Notifications/ParentNotifications';
import { ParentSettings } from '../pages/Parent/Settings/ParentSettings';

// Design System Demo
import { DesignSystemDemo } from '../pages/DesignSystemDemo';

// Landing Page
import { Landing } from '../pages/Landing/Landing';

// Route Guards
import { StudentRoute } from '../auth/StudentRoute';
import { ParentRoute } from '../auth/ParentRoute';

export const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  // If not authenticated, show landing and login pages
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/school/login" element={<SchoolLogin />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // If authenticated, redirect to appropriate dashboard based on role
  const getDashboardPath = () => {
    switch (user?.role) {
      case 'student':
        return '/student/home';
      case 'parent':
        return '/parent/children';
      case 'admin':
      case 'teacher':
      default:
        return '/dashboard';
    }
  };

  // If authenticated, show protected routes
  return (
    <Routes>
      {/* Redirect root and /login to appropriate dashboard based on role */}
      <Route path="/" element={<Navigate to={getDashboardPath()} replace />} />
      <Route path="/login" element={<Navigate to={getDashboardPath()} replace />} />

      {/* Dashboard (role-based) */}
      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <RoleDashboard />
          </MainLayout>
        }
      />

      {/* Admin Routes - Classes */}
      <Route
        path="/admin/classes"
        element={
          <AdminRoute>
            <MainLayout>
              <ClassList />
            </MainLayout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/classes/new"
        element={
          <AdminRoute>
            <MainLayout>
              <ClassCreate />
            </MainLayout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/classes/:id/edit"
        element={
          <AdminRoute>
            <MainLayout>
              <ClassEdit />
            </MainLayout>
          </AdminRoute>
        }
      />

      {/* Admin Routes - Users */}
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <MainLayout>
              <UserManagement />
            </MainLayout>
          </AdminRoute>
        }
      />

      {/* Teacher Routes - Curricula */}
      <Route
        path="/teacher/curricula"
        element={
          <TeacherRoute>
            <MainLayout>
              <CurriculaList />
            </MainLayout>
          </TeacherRoute>
        }
      />
      <Route
        path="/teacher/curricula/new"
        element={
          <TeacherRoute>
            <MainLayout>
              <CurriculumCreate />
            </MainLayout>
          </TeacherRoute>
        }
      />
      <Route
        path="/teacher/curricula/:id"
        element={
          <TeacherRoute>
            <MainLayout>
              <CurriculumDetail />
            </MainLayout>
          </TeacherRoute>
        }
      />
      <Route
        path="/teacher/curricula/:id/edit"
        element={
          <TeacherRoute>
            <MainLayout>
              <CurriculumEdit />
            </MainLayout>
          </TeacherRoute>
        }
      />

      {/* Teacher Routes - Problem Sets */}
      <Route
        path="/teacher/problem-sets"
        element={
          <TeacherRoute>
            <MainLayout>
              <ProblemSetsList />
            </MainLayout>
          </TeacherRoute>
        }
      />
      <Route
        path="/teacher/problem-sets/new"
        element={
          <TeacherRoute>
            <MainLayout>
              <ProblemSetCreate />
            </MainLayout>
          </TeacherRoute>
        }
      />
      <Route
        path="/teacher/problem-sets/:id"
        element={
          <TeacherRoute>
            <MainLayout>
              <ProblemSetDetail />
            </MainLayout>
          </TeacherRoute>
        }
      />

      {/* Teacher Routes - Assignments */}
      <Route
        path="/teacher/assignments"
        element={
          <TeacherRoute>
            <MainLayout>
              <AssignmentList />
            </MainLayout>
          </TeacherRoute>
        }
      />
      <Route
        path="/teacher/assignments/new"
        element={
          <TeacherRoute>
            <MainLayout>
              <AssignmentCreate />
            </MainLayout>
          </TeacherRoute>
        }
      />

      {/* Teacher Routes - Submissions */}
      <Route
        path="/teacher/submissions"
        element={
          <TeacherRoute>
            <MainLayout>
              <SubmissionList />
            </MainLayout>
          </TeacherRoute>
        }
      />

      {/* Teacher Routes - Reports */}
      <Route
        path="/teacher/classes/:classId"
        element={
          <TeacherRoute>
            <MainLayout>
              <ClassReport />
            </MainLayout>
          </TeacherRoute>
        }
      />

      {/* Teacher Routes - Students */}
      <Route
        path="/teacher/students"
        element={
          <TeacherRoute>
            <MainLayout>
              <StudentList />
            </MainLayout>
          </TeacherRoute>
        }
      />
      <Route
        path="/teacher/students/:studentId"
        element={
          <TeacherRoute>
            <MainLayout>
              <StudentDetail />
            </MainLayout>
          </TeacherRoute>
        }
      />

      {/* Student Routes */}
      <Route
        path="/student/home"
        element={
          <StudentRoute>
            <MainLayout>
              <StudentHome />
            </MainLayout>
          </StudentRoute>
        }
      />
      <Route
        path="/student/assignments"
        element={
          <StudentRoute>
            <MainLayout>
              <StudentAssignmentList />
            </MainLayout>
          </StudentRoute>
        }
      />
      <Route
        path="/student/practice/:id/solve"
        element={
          <StudentRoute>
            <StudentSolve />
          </StudentRoute>
        }
      />
      <Route
        path="/student/assignments/:id/solve"
        element={
          <StudentRoute>
            <StudentSolve />
          </StudentRoute>
        }
      />
      <Route
        path="/student/assignments/:id"
        element={
          <StudentRoute>
            <MainLayout>
              <StudentAssignmentDetail />
            </MainLayout>
          </StudentRoute>
        }
      />
      <Route
        path="/student/practice"
        element={
          <StudentRoute>
            <MainLayout>
              <StudentPractice />
            </MainLayout>
          </StudentRoute>
        }
      />
      <Route
        path="/student/history"
        element={
          <StudentRoute>
            <MainLayout>
              <StudentHistoryList />
            </MainLayout>
          </StudentRoute>
        }
      />
      <Route
        path="/student/history/:id"
        element={
          <StudentRoute>
            <MainLayout>
              <HistoryDetail />
            </MainLayout>
          </StudentRoute>
        }
      />
      <Route
        path="/student/feedback/:id"
        element={
          <StudentRoute>
            <MainLayout>
              <FeedbackDetail />
            </MainLayout>
          </StudentRoute>
        }
      />
      <Route
        path="/student/profile"
        element={
          <StudentRoute>
            <MainLayout>
              <StudentProfile />
            </MainLayout>
          </StudentRoute>
        }
      />

      {/* Parent Routes */}
      <Route
        path="/parent/children"
        element={
          <ParentRoute>
            <MainLayout>
              <ParentChildrenList />
            </MainLayout>
          </ParentRoute>
        }
      />
      <Route
        path="/parent/dashboard/:childId"
        element={
          <ParentRoute>
            <MainLayout>
              <ChildDashboard />
            </MainLayout>
          </ParentRoute>
        }
      />
      <Route
        path="/parent/details/:childId"
        element={
          <ParentRoute>
            <MainLayout>
              <ChildDetails />
            </MainLayout>
          </ParentRoute>
        }
      />
      <Route
        path="/parent/results/:childId"
        element={
          <ParentRoute>
            <MainLayout>
              <ChildResults />
            </MainLayout>
          </ParentRoute>
        }
      />
      <Route
        path="/parent/notifications"
        element={
          <ParentRoute>
            <MainLayout>
              <ParentNotifications />
            </MainLayout>
          </ParentRoute>
        }
      />
      <Route
        path="/parent/settings"
        element={
          <ParentRoute>
            <MainLayout>
              <ParentSettings />
            </MainLayout>
          </ParentRoute>
        }
      />

      {/* Design System Demo (accessible to all authenticated users) */}
      <Route
        path="/design-system"
        element={
          <MainLayout>
            <DesignSystemDemo />
          </MainLayout>
        }
      />

      {/* 404 - redirect based on role */}
      <Route
        path="*"
        element={
          <Navigate
            to={
              user?.role === 'student'
                ? '/student/home'
                : user?.role === 'parent'
                ? '/parent/children'
                : '/dashboard'
            }
            replace
          />
        }
      />
    </Routes>
  );
};
