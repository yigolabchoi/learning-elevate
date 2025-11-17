/**
 * Sidebar Component
 * 
 * Role-based navigation sidebar that shows different menu items
 * depending on whether the user is an Admin, Teacher, Student, or Parent.
 */

import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useLanguage } from '../i18n';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  ClipboardList,
  CheckSquare,
  School,
  GraduationCap,
  Bell,
  Settings,
} from 'lucide-react';

interface NavItem {
  labelKey: string;
  path: string;
  icon: React.ReactNode;
}

export const Sidebar = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const adminNavItems: NavItem[] = [
    {
      labelKey: 'nav.dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      labelKey: 'nav.classes',
      path: '/admin/classes',
      icon: <School className="w-5 h-5" />,
    },
    {
      labelKey: 'nav.users',
      path: '/admin/users',
      icon: <Users className="w-5 h-5" />,
    },
  ];

  const teacherNavItems: NavItem[] = [
    {
      labelKey: 'nav.dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      labelKey: 'nav.students',
      path: '/teacher/students',
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      labelKey: 'nav.curricula',
      path: '/teacher/curricula',
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      labelKey: 'nav.problemSets',
      path: '/teacher/problem-sets',
      icon: <FileText className="w-5 h-5" />,
    },
    {
      labelKey: 'nav.assignments',
      path: '/teacher/assignments',
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      labelKey: 'nav.submissions',
      path: '/teacher/submissions',
      icon: <CheckSquare className="w-5 h-5" />,
    },
  ];

  const studentNavItems: NavItem[] = [
    {
      labelKey: 'nav.home',
      path: '/student/home',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      labelKey: 'nav.assignments',
      path: '/student/assignments',
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      labelKey: 'nav.practice',
      path: '/student/practice',
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      labelKey: 'nav.history',
      path: '/student/history',
      icon: <FileText className="w-5 h-5" />,
    },
    {
      labelKey: 'nav.profile',
      path: '/student/profile',
      icon: <Users className="w-5 h-5" />,
    },
  ];

  const parentNavItems: NavItem[] = [
    {
      labelKey: 'nav.myChildren',
      path: '/parent/children',
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      labelKey: 'nav.notifications',
      path: '/parent/notifications',
      icon: <Bell className="w-5 h-5" />,
    },
    {
      labelKey: 'nav.settings',
      path: '/parent/settings',
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const getNavItems = () => {
    switch (user?.role) {
      case 'admin':
        return adminNavItems;
      case 'teacher':
        return teacherNavItems;
      case 'student':
        return studentNavItems;
      case 'parent':
        return parentNavItems;
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 h-[calc(100vh-4rem)] overflow-y-auto">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            {item.icon}
            <span>{t(item.labelKey as any)}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
