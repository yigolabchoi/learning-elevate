/**
 * Mock API - Reports
 * 
 * Provides mock data for class and student reports.
 * 
 * Functions:
 * - getClassReport(classId)
 * - getStudentReport(studentId)
 */

import { ClassReport, StudentReport } from '../../../types';

// Mock delay to simulate network latency
const delay = (ms: number = 400) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Class Reports Data
const mockClassReports: ClassReport[] = [
  {
    classId: 'class-1',
    className: 'Grade 7 - A',
    studentCount: 25,
    averageScore: 82.5,
    assignmentsSummary: [
      {
        assignmentId: 'assignment-1',
        title: 'Present Perfect Practice',
        averageScore: 85.0,
        completionRate: 88, // 22/25 students
      },
      {
        assignmentId: 'assignment-3',
        title: 'Mid-term Review',
        averageScore: 78.5,
        completionRate: 100, // 25/25 students
      },
      {
        assignmentId: 'assignment-5',
        title: 'Past Tense Quiz',
        averageScore: 90.2,
        completionRate: 92, // 23/25 students
      },
      {
        assignmentId: 'assignment-6',
        title: 'Vocabulary Test',
        averageScore: 76.8,
        completionRate: 96, // 24/25 students
      },
    ],
    conceptStats: [
      { conceptTag: 'Present Perfect', averageAccuracy: 85.5 },
      { conceptTag: 'Tense', averageAccuracy: 78.2 },
      { conceptTag: 'Grammar', averageAccuracy: 82.0 },
      { conceptTag: 'Vocabulary', averageAccuracy: 74.5 },
      { conceptTag: 'Past Tense', averageAccuracy: 88.3 },
      { conceptTag: 'Preposition', averageAccuracy: 70.8 },
    ],
  },
  {
    classId: 'class-4',
    className: 'Grade 9 - Advanced',
    studentCount: 18,
    averageScore: 88.7,
    assignmentsSummary: [
      {
        assignmentId: 'assignment-2',
        title: 'Grammar Challenge',
        averageScore: 87.5,
        completionRate: 94, // 17/18 students
      },
      {
        assignmentId: 'assignment-7',
        title: 'Complex Sentences',
        averageScore: 91.2,
        completionRate: 100, // 18/18 students
      },
      {
        assignmentId: 'assignment-8',
        title: 'Essay Writing',
        averageScore: 86.8,
        completionRate: 89, // 16/18 students
      },
    ],
    conceptStats: [
      { conceptTag: 'Complex Sentences', averageAccuracy: 90.5 },
      { conceptTag: 'Grammar', averageAccuracy: 88.0 },
      { conceptTag: 'Writing', averageAccuracy: 85.2 },
      { conceptTag: 'Advanced Vocabulary', averageAccuracy: 92.3 },
    ],
  },
];

// Mock Student Reports Data
const mockStudentReports: StudentReport[] = [
  {
    studentId: 'student-1',
    studentName: 'Kim Min-jun',
    className: 'Grade 7 - A',
    classId: 'class-1',
    currentLevel: 'Intermediate',
    recentAssignments: [
      {
        assignmentId: 'assignment-1',
        title: 'Present Perfect Practice',
        score: 85,
        submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        assignmentId: 'assignment-3',
        title: 'Mid-term Review',
        score: 78,
        submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        assignmentId: 'assignment-5',
        title: 'Past Tense Quiz',
        score: 92,
        submittedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        assignmentId: 'assignment-6',
        title: 'Vocabulary Test',
        score: 74,
        submittedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    weaknessTags: [
      { conceptTag: 'Vocabulary', accuracy: 72 },
      { conceptTag: 'Preposition', accuracy: 68 },
      { conceptTag: 'Tense', accuracy: 75 },
    ],
    trendData: [
      { date: '2025-10-15', score: 70 },
      { date: '2025-10-22', score: 72 },
      { date: '2025-10-29', score: 74 },
      { date: '2025-11-05', score: 78 },
      { date: '2025-11-12', score: 85 },
      { date: '2025-11-19', score: 82 },
      { date: '2025-11-26', score: 88 },
      { date: '2025-12-03', score: 85 },
    ],
  },
  {
    studentId: 'student-2',
    studentName: 'Lee Seo-yeon',
    className: 'Grade 7 - A',
    classId: 'class-1',
    currentLevel: 'Advanced',
    recentAssignments: [
      {
        assignmentId: 'assignment-1',
        title: 'Present Perfect Practice',
        score: 92,
        submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        assignmentId: 'assignment-3',
        title: 'Mid-term Review',
        score: 88,
        submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        assignmentId: 'assignment-5',
        title: 'Past Tense Quiz',
        score: 95,
        submittedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        assignmentId: 'assignment-6',
        title: 'Vocabulary Test',
        score: 90,
        submittedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    weaknessTags: [
      { conceptTag: 'Complex Sentences', accuracy: 82 },
      { conceptTag: 'Advanced Vocabulary', accuracy: 85 },
    ],
    trendData: [
      { date: '2025-10-15', score: 85 },
      { date: '2025-10-22', score: 87 },
      { date: '2025-10-29', score: 88 },
      { date: '2025-11-05', score: 90 },
      { date: '2025-11-12', score: 92 },
      { date: '2025-11-19', score: 91 },
      { date: '2025-11-26', score: 94 },
      { date: '2025-12-03', score: 92 },
    ],
  },
  {
    studentId: 'student-13',
    studentName: 'Jeon Yu-jin',
    className: 'Grade 9 - Advanced',
    classId: 'class-4',
    currentLevel: 'Advanced',
    recentAssignments: [
      {
        assignmentId: 'assignment-2',
        title: 'Grammar Challenge',
        score: 88,
        submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        assignmentId: 'assignment-7',
        title: 'Complex Sentences',
        score: 92,
        submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        assignmentId: 'assignment-8',
        title: 'Essay Writing',
        score: 85,
        submittedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    weaknessTags: [
      { conceptTag: 'Writing', accuracy: 82 },
      { conceptTag: 'Grammar', accuracy: 85 },
    ],
    trendData: [
      { date: '2025-10-20', score: 82 },
      { date: '2025-10-27', score: 85 },
      { date: '2025-11-03', score: 86 },
      { date: '2025-11-10', score: 88 },
      { date: '2025-11-17', score: 90 },
      { date: '2025-11-24', score: 89 },
      { date: '2025-12-01', score: 92 },
    ],
  },
];

/**
 * Get class report by ID
 */
export const getClassReport = async (classId: string): Promise<ClassReport | null> => {
  await delay(400);
  const report = mockClassReports.find((r) => r.classId === classId);
  return report ? { ...report } : null;
};

/**
 * Get student report by ID
 */
export const getStudentReport = async (studentId: string): Promise<StudentReport | null> => {
  await delay(400);
  const report = mockStudentReports.find((r) => r.studentId === studentId);
  return report ? { ...report } : null;
};

/**
 * Get all students in a class (for class report student list)
 */
export const getStudentsInClass = async (classId: string): Promise<Array<{ id: string; name: string }>> => {
  await delay(300);
  
  // Return mock students for specific classes
  const studentsByClass: Record<string, Array<{ id: string; name: string }>> = {
    'class-1': [
      { id: 'student-1', name: 'Kim Min-jun' },
      { id: 'student-2', name: 'Lee Seo-yeon' },
      { id: 'student-3', name: 'Park Ji-hu' },
      { id: 'student-4', name: 'Choi Soo-ah' },
      { id: 'student-5', name: 'Jung Tae-yang' },
    ],
    'class-4': [
      { id: 'student-13', name: 'Jeon Yu-jin' },
      { id: 'student-14', name: 'Song Ji-an' },
      { id: 'student-15', name: 'Kang Min-ho' },
    ],
  };

  return studentsByClass[classId] || [];
};

