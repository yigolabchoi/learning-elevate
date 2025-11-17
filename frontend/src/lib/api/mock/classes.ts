/**
 * Mock API - Class Management
 * 
 * Provides mock data and async functions for class management.
 * Simulates network latency and CRUD operations.
 * 
 * Functions:
 * - getClasses()
 * - getClassById(id)
 * - createClass(payload)
 * - updateClass(id, payload)
 * - getTeachers()
 * - getStudents()
 */

import { Class, Teacher, Student, ClassFormData } from '../../../types';

// Mock delay to simulate network latency
const delay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Data
let mockClasses: Class[] = [
  {
    id: 'class-1',
    name: 'Grade 7 - A',
    gradeLevel: 'Grade 7',
    subject: 'English',
    teacherId: 'teacher-1',
    studentIds: ['student-1', 'student-2', 'student-3', 'student-4', 'student-5'],
    createdAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 'class-2',
    name: 'Grade 8 - B',
    gradeLevel: 'Grade 8',
    subject: 'English',
    teacherId: 'teacher-2',
    studentIds: ['student-6', 'student-7', 'student-8'],
    createdAt: '2025-01-20T11:30:00Z',
  },
  {
    id: 'class-3',
    name: 'Middle 1 - C',
    gradeLevel: 'Middle 1',
    subject: 'Math',
    teacherId: 'teacher-3',
    studentIds: ['student-9', 'student-10', 'student-11', 'student-12'],
    createdAt: '2025-02-01T09:00:00Z',
  },
  {
    id: 'class-4',
    name: 'Grade 9 - Advanced',
    gradeLevel: 'Grade 9',
    subject: 'English',
    teacherId: 'teacher-1',
    studentIds: ['student-13', 'student-14'],
    createdAt: '2025-02-10T14:00:00Z',
  },
];

const mockTeachers: Teacher[] = [
  {
    id: 'teacher-1',
    name: 'Kim Soo-jin',
    email: 'kim.soojin@school.com',
    role: 'teacher',
    subject: 'English',
    subjects: ['English', 'ESL'],
    gradeLevels: ['Grade 7', 'Grade 8', 'Grade 9'],
    isActive: true,
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
  },
];

const mockStudents: Student[] = [
  { id: 'student-1', name: 'Kim Min-jun', email: 'minjun.kim@student.com', role: 'student', gradeLevel: 'Grade 7', currentLevel: 1, teacherId: 'teacher-1', isActive: true, classId: 'class-1' },
  { id: 'student-2', name: 'Lee Seo-yeon', email: 'seoyeon.lee@student.com', role: 'student', gradeLevel: 'Grade 7', currentLevel: 2, teacherId: 'teacher-1', isActive: true, classId: 'class-1' },
  { id: 'student-3', name: 'Park Ji-hu', email: 'jihu.park@student.com', role: 'student', gradeLevel: 'Grade 7', currentLevel: 1, teacherId: 'teacher-1', isActive: true, classId: 'class-1' },
  { id: 'student-4', name: 'Choi Ha-yoon', email: 'hayoon.choi@student.com', role: 'student', gradeLevel: 'Grade 7', currentLevel: 3, teacherId: 'teacher-1', isActive: true, classId: 'class-1' },
  { id: 'student-5', name: 'Jung Seo-jun', email: 'seojun.jung@student.com', role: 'student', gradeLevel: 'Grade 7', currentLevel: 2, teacherId: 'teacher-1', isActive: false, classId: 'class-1' },
  { id: 'student-6', name: 'Kang Do-yoon', email: 'doyoon.kang@student.com', role: 'student', gradeLevel: 'Grade 8', currentLevel: 2, teacherId: 'teacher-2', isActive: true, classId: 'class-2' },
  { id: 'student-7', name: 'Yoon Seo-ah', email: 'seoah.yoon@student.com', role: 'student', gradeLevel: 'Grade 8', currentLevel: 3, teacherId: 'teacher-2', isActive: true, classId: 'class-2' },
  { id: 'student-8', name: 'Lim Ye-jun', email: 'yejun.lim@student.com', role: 'student', gradeLevel: 'Grade 8', currentLevel: 2, teacherId: 'teacher-2', isActive: true, classId: 'class-2' },
  { id: 'student-9', name: 'Han Ji-woo', email: 'jiwoo.han@student.com', role: 'student', gradeLevel: 'Middle 1', currentLevel: 1, teacherId: 'teacher-3', isActive: true, classId: 'class-3' },
  { id: 'student-10', name: 'Shin Soo-ah', email: 'sooah.shin@student.com', role: 'student', gradeLevel: 'Middle 1', currentLevel: 2, teacherId: 'teacher-3', isActive: true, classId: 'class-3' },
  { id: 'student-11', name: 'Oh Min-seo', email: 'minseo.oh@student.com', role: 'student', gradeLevel: 'Middle 1', currentLevel: 1, teacherId: 'teacher-3', isActive: true, classId: 'class-3' },
  { id: 'student-12', name: 'Kwon Ha-jun', email: 'hajun.kwon@student.com', role: 'student', gradeLevel: 'Middle 1', currentLevel: 3, teacherId: 'teacher-3', isActive: true, classId: 'class-3' },
  { id: 'student-13', name: 'Jeon Yu-jin', email: 'yujin.jeon@student.com', role: 'student', gradeLevel: 'Grade 9', currentLevel: 4, teacherId: 'teacher-1', isActive: true, classId: 'class-4' },
  { id: 'student-14', name: 'Song Ji-an', email: 'jian.song@student.com', role: 'student', gradeLevel: 'Grade 9', currentLevel: 4, teacherId: 'teacher-1', isActive: true, classId: 'class-4' },
  { id: 'student-15', name: 'Bae Seo-hyun', email: 'seohyun.bae@student.com', role: 'student', gradeLevel: 'Grade 8', currentLevel: 2, teacherId: 'teacher-2', isActive: true, classId: 'class-2' },
];

/**
 * Get all classes
 */
export const getClasses = async (): Promise<Class[]> => {
  await delay(300);
  return [...mockClasses];
};

/**
 * Get a single class by ID
 */
export const getClassById = async (id: string): Promise<Class | null> => {
  await delay(300);
  const classData = mockClasses.find((c) => c.id === id);
  return classData ? { ...classData } : null;
};

/**
 * Create a new class
 */
export const createClass = async (payload: ClassFormData): Promise<Class> => {
  await delay(500);

  const newClass: Class = {
    id: `class-${Date.now()}`,
    ...payload,
    createdAt: new Date().toISOString(),
  };

  mockClasses.push(newClass);
  return { ...newClass };
};

/**
 * Update an existing class
 */
export const updateClass = async (id: string, payload: ClassFormData): Promise<Class | null> => {
  await delay(500);

  const index = mockClasses.findIndex((c) => c.id === id);
  if (index === -1) {
    return null;
  }

  mockClasses[index] = {
    ...mockClasses[index],
    ...payload,
    updatedAt: new Date().toISOString(),
  };

  return { ...mockClasses[index] };
};

/**
 * Delete a class
 */
export const deleteClass = async (id: string): Promise<boolean> => {
  await delay(400);

  const index = mockClasses.findIndex((c) => c.id === id);
  if (index === -1) {
    return false;
  }

  mockClasses.splice(index, 1);
  return true;
};

/**
 * Get all teachers
 */
export const getTeachers = async (): Promise<Teacher[]> => {
  await delay(200);
  return [...mockTeachers];
};

/**
 * Get all students
 */
export const getStudents = async (): Promise<Student[]> => {
  await delay(200);
  return [...mockStudents];
};

/**
 * Get teacher by ID
 */
export const getTeacherById = async (id: string): Promise<Teacher | null> => {
  await delay(100);
  const teacher = mockTeachers.find((t) => t.id === id);
  return teacher ? { ...teacher } : null;
};

/**
 * Get multiple students by IDs
 */
export const getStudentsByIds = async (ids: string[]): Promise<Student[]> => {
  await delay(100);
  return mockStudents.filter((s) => ids.includes(s.id));
};

