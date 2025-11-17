/**
 * Mock API - Teacher Dashboard
 * 
 * Provides mock data for teacher dashboard overview.
 * 
 * Functions:
 * - getTeacherDashboardSummary(teacherId)
 */

import { DashboardSummary, ClassSummary, AssignmentSummary, PendingSubmissionSummary } from '../../../types';

// Mock delay to simulate network latency
const delay = (ms: number = 400) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Get teacher dashboard summary
 */
export const getTeacherDashboardSummary = async (teacherId: string): Promise<DashboardSummary> => {
  await delay(500);

  // Mock classes for this teacher
  const classes: ClassSummary[] = [
    {
      id: 'class-1',
      name: 'Grade 7 - A',
      studentCount: 5,
      gradeLevel: 'Grade 7',
      subject: 'English',
    },
    {
      id: 'class-4',
      name: 'Grade 9 - Advanced',
      studentCount: 2,
      gradeLevel: 'Grade 9',
      subject: 'English',
    },
  ];

  // Mock today's assignments
  const todayAssignments: AssignmentSummary[] = [
    {
      id: 'assignment-1',
      title: 'Present Perfect Practice',
      classId: 'class-1',
      className: 'Grade 7 - A',
      dueDate: new Date().toISOString(),
      completedCount: 3,
      totalStudents: 5,
    },
    {
      id: 'assignment-2',
      title: 'Reading Comprehension - Chapter 3',
      classId: 'class-4',
      className: 'Grade 9 - Advanced',
      dueDate: new Date().toISOString(),
      completedCount: 2,
      totalStudents: 2,
    },
    {
      id: 'assignment-3',
      title: 'Vocabulary Quiz - Unit 2',
      classId: 'class-1',
      className: 'Grade 7 - A',
      dueDate: new Date().toISOString(),
      completedCount: 1,
      totalStudents: 5,
    },
  ];

  // Mock pending submissions (AI graded, waiting for teacher confirmation)
  const pendingSubmissions: PendingSubmissionSummary[] = [
    {
      id: 'submission-1',
      studentId: 'student-1',
      studentName: 'Kim Min-jun',
      classId: 'class-1',
      className: 'Grade 7 - A',
      assignmentId: 'assignment-1',
      assignmentTitle: 'Present Perfect Practice',
      submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      aiScore: 85,
    },
    {
      id: 'submission-2',
      studentId: 'student-2',
      studentName: 'Lee Seo-yeon',
      classId: 'class-1',
      className: 'Grade 7 - A',
      assignmentId: 'assignment-1',
      assignmentTitle: 'Present Perfect Practice',
      submittedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
      aiScore: 92,
    },
    {
      id: 'submission-3',
      studentId: 'student-13',
      studentName: 'Jeon Yu-jin',
      classId: 'class-4',
      className: 'Grade 9 - Advanced',
      assignmentId: 'assignment-2',
      assignmentTitle: 'Reading Comprehension - Chapter 3',
      submittedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
      aiScore: 88,
    },
    {
      id: 'submission-4',
      studentId: 'student-3',
      studentName: 'Park Ji-hu',
      classId: 'class-1',
      className: 'Grade 7 - A',
      assignmentId: 'assignment-3',
      assignmentTitle: 'Vocabulary Quiz - Unit 2',
      submittedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
      aiScore: 78,
    },
    {
      id: 'submission-5',
      studentId: 'student-14',
      studentName: 'Song Ji-an',
      classId: 'class-4',
      className: 'Grade 9 - Advanced',
      assignmentId: 'assignment-2',
      assignmentTitle: 'Reading Comprehension - Chapter 3',
      submittedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
      aiScore: 95,
    },
  ];

  return {
    classes,
    todayAssignments,
    pendingSubmissions,
  };
};

