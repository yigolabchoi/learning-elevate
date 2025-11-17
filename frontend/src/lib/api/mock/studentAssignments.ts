/**
 * Mock API - Student Assignments
 * 
 * Provides mock data for student assignments.
 * 
 * Functions:
 * - getStudentAssignments(studentId)
 * - getStudentAssignmentDetail(assignmentId)
 */

import { StudentAssignment, StudentAssignmentDetail } from '../../../types';

// Mock delay to simulate network latency
const delay = (ms: number = 400) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Student Assignments Data
const mockAssignments: StudentAssignmentDetail[] = [
  {
    id: 'student-assignment-1',
    title: 'Present Perfect Practice',
    className: 'Grade 7 - A',
    unitTitle: 'Unit 1: Present Tenses',
    description: 'Practice using the present perfect tense in various contexts. Complete all questions to master this grammar concept.',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    status: 'not_started',
    totalQuestions: 10,
    completedQuestions: 0,
  },
  {
    id: 'student-assignment-2',
    title: 'Vocabulary Quiz - Week 12',
    className: 'Grade 7 - A',
    unitTitle: 'Unit 2: Academic Vocabulary',
    description: 'Test your knowledge of this week\'s vocabulary words with multiple choice and fill-in-the-blank questions.',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    status: 'in_progress',
    totalQuestions: 15,
    completedQuestions: 7,
    lastAttemptedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: 'student-assignment-3',
    title: 'Past Tense Review',
    className: 'Grade 7 - A',
    unitTitle: 'Unit 3: Past Tenses',
    description: 'Review simple past, past continuous, and past perfect tenses.',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    status: 'not_started',
    totalQuestions: 12,
    completedQuestions: 0,
  },
  {
    id: 'student-assignment-4',
    title: 'Reading Comprehension',
    className: 'Grade 7 - A',
    unitTitle: 'Unit 4: Reading Skills',
    description: 'Read the passage and answer comprehension questions.',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago (overdue)
    status: 'in_progress',
    totalQuestions: 8,
    completedQuestions: 5,
    lastAttemptedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    id: 'student-assignment-5',
    title: 'Grammar Challenge',
    className: 'Grade 7 - A',
    unitTitle: 'Unit 1: Present Tenses',
    description: 'Challenging questions to test your overall grammar knowledge.',
    dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    status: 'completed',
    totalQuestions: 20,
    completedQuestions: 20,
    lastAttemptedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    score: 85,
    latestFeedbackSummary: 'Good understanding of present tenses! Minor issues with prepositions. Keep practicing vocabulary.',
  },
  {
    id: 'student-assignment-6',
    title: 'Mid-term Review',
    className: 'Grade 7 - A',
    unitTitle: 'Units 1-5 Review',
    description: 'Comprehensive review of all topics covered in the first half of the semester.',
    dueDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    status: 'completed',
    totalQuestions: 25,
    completedQuestions: 25,
    lastAttemptedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    score: 78,
    latestFeedbackSummary: 'Struggled with past perfect tense. Vocabulary is improving. Excellent work on reading comprehension.',
  },
  {
    id: 'student-assignment-7',
    title: 'Essay Writing Practice',
    className: 'Grade 7 - A',
    unitTitle: 'Unit 6: Writing Skills',
    description: 'Write a short essay on a given topic demonstrating proper structure and grammar.',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
    status: 'not_started',
    totalQuestions: 1,
    completedQuestions: 0,
  },
  {
    id: 'student-assignment-8',
    title: 'Listening Comprehension',
    className: 'Grade 7 - A',
    unitTitle: 'Unit 7: Listening Skills',
    description: 'Listen to audio clips and answer questions about what you heard.',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    status: 'not_started',
    totalQuestions: 10,
    completedQuestions: 0,
  },
];

/**
 * Get all assignments for a student
 */
export const getStudentAssignments = async (studentId: string): Promise<StudentAssignment[]> => {
  await delay(400);
  
  // Return assignments without the extended details
  return mockAssignments.map(({ description, lastAttemptedAt, score, latestFeedbackSummary, ...assignment }) => assignment);
};

/**
 * Get detailed information about a specific assignment
 */
export const getStudentAssignmentDetail = async (assignmentId: string): Promise<StudentAssignmentDetail | null> => {
  await delay(400);
  
  const assignment = mockAssignments.find((a) => a.id === assignmentId);
  return assignment ? { ...assignment } : null;
};

