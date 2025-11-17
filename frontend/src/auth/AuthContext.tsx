/**
 * Authentication Context
 * 
 * Provides authentication state and user role information throughout the app.
 * Currently uses mock data; will be replaced with real API integration later.
 * 
 * Features:
 * - Mock authentication for development
 * - Role-based access control
 * - Login/logout functionality
 * - Role switching (dev only)
 */

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  schoolId?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void; // For demo purposes
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development
const mockUsers: Record<UserRole, User> = {
  admin: {
    id: 'admin-1',
    name: 'Admin Manager',
    email: 'admin@school.com',
    role: 'admin',
    schoolId: 'school-1',
  },
  teacher: {
    id: 'teacher-1',
    name: 'Teacher Kim',
    email: 'teacher@school.com',
    role: 'teacher',
    schoolId: 'school-1',
  },
  student: {
    id: 'student-1',
    name: 'Student Park',
    email: 'student@school.com',
    role: 'student',
  },
  parent: {
    id: 'parent-1',
    name: 'Parent Lee',
    email: 'parent@school.com',
    role: 'parent',
  },
};

const AUTH_STORAGE_KEY = 'learning_elevate_auth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Mock login - simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock validation
    if (password !== 'password123') {
      throw new Error('Invalid credentials');
    }

    // Determine user based on email
    let authenticatedUser: User | null = null;

    if (email.includes('admin')) {
      authenticatedUser = mockUsers.admin;
    } else if (email.includes('teacher')) {
      authenticatedUser = mockUsers.teacher;
    } else if (email.includes('student')) {
      authenticatedUser = mockUsers.student;
    } else if (email.includes('parent')) {
      authenticatedUser = mockUsers.parent;
    } else {
      throw new Error('User not found');
    }

    setUser(authenticatedUser);
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    // For demo purposes only - allows easy role switching
    setUser(mockUsers[role]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
