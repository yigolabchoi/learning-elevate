/**
 * Mock API - User Management
 * 
 * Provides mock data and async functions for user management.
 * Supports Teachers, Students, and Parents.
 * 
 * Functions:
 * - getUsersByRole(role)
 * - createUser(user)
 * - updateUser(user)
 * - toggleUserActive(id)
 */

import { Teacher, Student, Parent, UserRole } from '../../../types';

// Mock delay to simulate network latency
const delay = (ms: number = 400) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Teachers
let mockTeachers: Teacher[] = [
  {
    id: 'teacher-1',
    name: 'Kim Soo-jin',
    email: 'kim.soojin@school.com',
    role: 'teacher',
    subject: 'English',
    subjects: ['English', 'ESL'],
    gradeLevels: ['Grade 7', 'Grade 8', 'Grade 9'],
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'teacher-2',
    name: 'Lee Min-ho',
    email: 'lee.minho@school.com',
    role: 'teacher',
    subject: 'English',
    subjects: ['English'],
    gradeLevels: ['Grade 8', 'Middle 1'],
    isActive: true,
    createdAt: '2024-02-10T11:00:00Z',
  },
  {
    id: 'teacher-3',
    name: 'Park Ji-won',
    email: 'park.jiwon@school.com',
    role: 'teacher',
    subject: 'Math',
    subjects: ['Math', 'Algebra'],
    gradeLevels: ['Grade 7', 'Middle 1'],
    isActive: true,
    createdAt: '2024-01-20T09:00:00Z',
  },
  {
    id: 'teacher-4',
    name: 'Choi Young-hee',
    email: 'choi.younghee@school.com',
    role: 'teacher',
    subject: 'Science',
    subjects: ['Science', 'Physics'],
    gradeLevels: ['Grade 8', 'Grade 9'],
    isActive: false,
    createdAt: '2024-03-05T14:00:00Z',
  },
  {
    id: 'teacher-5',
    name: 'Jung Hae-rin',
    email: 'jung.haerin@school.com',
    role: 'teacher',
    subject: 'English',
    subjects: ['English', 'Literature'],
    gradeLevels: ['Grade 9'],
    isActive: true,
    createdAt: '2024-02-28T13:00:00Z',
  },
];

// Mock Students
let mockStudents: Student[] = [
  {
    id: 'student-1',
    name: 'Kim Min-jun',
    email: 'minjun.kim@student.com',
    role: 'student',
    gradeLevel: 'Grade 7',
    currentLevel: 1,
    teacherId: 'teacher-1',
    classId: 'class-1',
    isActive: true,
    createdAt: '2024-01-10T08:00:00Z',
  },
  {
    id: 'student-2',
    name: 'Lee Seo-yeon',
    email: 'seoyeon.lee@student.com',
    role: 'student',
    gradeLevel: 'Grade 7',
    currentLevel: 2,
    teacherId: 'teacher-1',
    classId: 'class-1',
    parentId: 'parent-1',
    isActive: true,
    createdAt: '2024-01-12T08:00:00Z',
  },
  {
    id: 'student-3',
    name: 'Park Ji-hu',
    email: 'jihu.park@student.com',
    role: 'student',
    gradeLevel: 'Grade 7',
    currentLevel: 1,
    teacherId: 'teacher-1',
    classId: 'class-1',
    isActive: true,
    createdAt: '2024-01-15T08:00:00Z',
  },
  {
    id: 'student-4',
    name: 'Choi Ha-yoon',
    email: 'hayoon.choi@student.com',
    role: 'student',
    gradeLevel: 'Grade 7',
    currentLevel: 3,
    teacherId: 'teacher-1',
    classId: 'class-1',
    parentId: 'parent-2',
    isActive: true,
    createdAt: '2024-01-18T08:00:00Z',
  },
  {
    id: 'student-5',
    name: 'Jung Seo-jun',
    email: 'seojun.jung@student.com',
    role: 'student',
    gradeLevel: 'Grade 7',
    currentLevel: 2,
    teacherId: 'teacher-1',
    classId: 'class-1',
    isActive: false,
    createdAt: '2024-01-20T08:00:00Z',
  },
  {
    id: 'student-6',
    name: 'Kang Do-yoon',
    email: 'doyoon.kang@student.com',
    role: 'student',
    gradeLevel: 'Grade 8',
    currentLevel: 2,
    teacherId: 'teacher-2',
    classId: 'class-2',
    parentId: 'parent-3',
    isActive: true,
    createdAt: '2024-02-01T08:00:00Z',
  },
  {
    id: 'student-7',
    name: 'Yoon Seo-ah',
    email: 'seoah.yoon@student.com',
    role: 'student',
    gradeLevel: 'Grade 8',
    currentLevel: 3,
    teacherId: 'teacher-2',
    classId: 'class-2',
    isActive: true,
    createdAt: '2024-02-05T08:00:00Z',
  },
  {
    id: 'student-8',
    name: 'Lim Ye-jun',
    email: 'yejun.lim@student.com',
    role: 'student',
    gradeLevel: 'Grade 8',
    currentLevel: 2,
    teacherId: 'teacher-2',
    classId: 'class-2',
    parentId: 'parent-1',
    isActive: true,
    createdAt: '2024-02-08T08:00:00Z',
  },
];

// Mock Parents
let mockParents: Parent[] = [
  {
    id: 'parent-1',
    name: 'Kim Young-soo',
    email: 'youngsoo.kim@parent.com',
    role: 'parent',
    phone: '010-1234-5678',
    childIds: ['student-2', 'student-8'],
    isActive: true,
    createdAt: '2024-01-10T10:00:00Z',
  },
  {
    id: 'parent-2',
    name: 'Lee Mi-jung',
    email: 'mijung.lee@parent.com',
    role: 'parent',
    phone: '010-2345-6789',
    childIds: ['student-4'],
    isActive: true,
    createdAt: '2024-01-18T10:00:00Z',
  },
  {
    id: 'parent-3',
    name: 'Park Sung-ho',
    email: 'sungho.park@parent.com',
    role: 'parent',
    phone: '010-3456-7890',
    childIds: ['student-6'],
    isActive: true,
    createdAt: '2024-02-01T10:00:00Z',
  },
  {
    id: 'parent-4',
    name: 'Choi Ji-hye',
    email: 'jihye.choi@parent.com',
    role: 'parent',
    phone: '010-4567-8901',
    childIds: [],
    isActive: false,
    createdAt: '2024-03-10T10:00:00Z',
  },
];

/**
 * Get users by role
 */
export const getUsersByRole = async (role: UserRole): Promise<(Teacher | Student | Parent)[]> => {
  await delay(300);

  switch (role) {
    case 'teacher':
      return [...mockTeachers];
    case 'student':
      return [...mockStudents];
    case 'parent':
      return [...mockParents];
    default:
      return [];
  }
};

/**
 * Create a new user
 */
export const createUser = async (user: Teacher | Student | Parent): Promise<Teacher | Student | Parent> => {
  await delay(500);

  const newUser = {
    ...user,
    id: `${user.role}-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  switch (user.role) {
    case 'teacher':
      mockTeachers.push(newUser as Teacher);
      break;
    case 'student':
      mockStudents.push(newUser as Student);
      break;
    case 'parent':
      mockParents.push(newUser as Parent);
      break;
  }

  return newUser;
};

/**
 * Update an existing user
 */
export const updateUser = async (user: Teacher | Student | Parent): Promise<Teacher | Student | Parent> => {
  await delay(500);

  const updatedUser = {
    ...user,
    updatedAt: new Date().toISOString(),
  };

  switch (user.role) {
    case 'teacher': {
      const index = mockTeachers.findIndex((t) => t.id === user.id);
      if (index !== -1) {
        mockTeachers[index] = updatedUser as Teacher;
      }
      break;
    }
    case 'student': {
      const index = mockStudents.findIndex((s) => s.id === user.id);
      if (index !== -1) {
        mockStudents[index] = updatedUser as Student;
      }
      break;
    }
    case 'parent': {
      const index = mockParents.findIndex((p) => p.id === user.id);
      if (index !== -1) {
        mockParents[index] = updatedUser as Parent;
      }
      break;
    }
  }

  return updatedUser;
};

/**
 * Toggle user active status
 */
export const toggleUserActive = async (
  id: string,
  role: UserRole
): Promise<Teacher | Student | Parent | null> => {
  await delay(200);

  let user: Teacher | Student | Parent | null = null;

  switch (role) {
    case 'teacher': {
      const index = mockTeachers.findIndex((t) => t.id === id);
      if (index !== -1) {
        mockTeachers[index].isActive = !mockTeachers[index].isActive;
        mockTeachers[index].updatedAt = new Date().toISOString();
        user = mockTeachers[index];
      }
      break;
    }
    case 'student': {
      const index = mockStudents.findIndex((s) => s.id === id);
      if (index !== -1) {
        mockStudents[index].isActive = !mockStudents[index].isActive;
        mockStudents[index].updatedAt = new Date().toISOString();
        user = mockStudents[index];
      }
      break;
    }
    case 'parent': {
      const index = mockParents.findIndex((p) => p.id === id);
      if (index !== -1) {
        mockParents[index].isActive = !mockParents[index].isActive;
        mockParents[index].updatedAt = new Date().toISOString();
        user = mockParents[index];
      }
      break;
    }
  }

  return user;
};

/**
 * Get user by ID (for reference in other modules)
 */
export const getUserById = async (
  id: string,
  role: UserRole
): Promise<Teacher | Student | Parent | null> => {
  await delay(100);

  switch (role) {
    case 'teacher':
      return mockTeachers.find((t) => t.id === id) || null;
    case 'student':
      return mockStudents.find((s) => s.id === id) || null;
    case 'parent':
      return mockParents.find((p) => p.id === id) || null;
    default:
      return null;
  }
};

/**
 * Bulk upload students from CSV
 */
export const bulkUploadStudents = async (
  students: Partial<Student>[]
): Promise<{ created: number; updated: number }> => {
  await delay(800);

  let created = 0;
  let updated = 0;

  students.forEach((studentData) => {
    // 이메일로 기존 학생 찾기
    const existingIndex = mockStudents.findIndex(
      (s) => s.email === studentData.email
    );

    if (existingIndex !== -1) {
      // 기존 학생 업데이트
      mockStudents[existingIndex] = {
        ...mockStudents[existingIndex],
        ...studentData,
        updatedAt: new Date().toISOString(),
      };
      updated++;
    } else {
      // 새 학생 생성
      const newStudent: Student = {
        id: `student-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: studentData.name || '',
        email: studentData.email || '',
        role: 'student',
        externalId: studentData.externalId,
        gradeLevel: studentData.gradeLevel,
        currentLevel: studentData.currentLevel || 1,
        classId: studentData.classId,
        teacherId: studentData.teacherId,
        isActive: studentData.isActive !== undefined ? studentData.isActive : true,
        createdAt: new Date().toISOString(),
      };
      mockStudents.push(newStudent);
      created++;
    }
  });

  return { created, updated };
};

