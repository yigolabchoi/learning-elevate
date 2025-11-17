/**
 * Mock API - Student Practice
 * 
 * Provides mock data for recommended practice sets.
 * 
 * Functions:
 * - getPracticeSets(studentId)
 * - getPracticeQuestions(practiceId) - reuses solve questions structure
 */

import { PracticeSet, SolveQuestion } from '../../../types';
import { getSolveQuestions } from './studentSolve';

// Mock delay to simulate network latency
const delay = (ms: number = 400) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Practice Sets Data
const mockPracticeSets: PracticeSet[] = [
  // Recommended (based on weaknesses)
  {
    id: 'practice-1',
    title: 'Past Perfect Tense Practice',
    conceptTag: 'Past Perfect',
    difficulty: 'medium',
    estimatedTimeMinutes: 15,
    recommendedReason: 'You scored 60% on past perfect questions in your mid-term review. Practice will help solidify this concept.',
    status: 'not_started',
    questionCount: 8,
  },
  {
    id: 'practice-2',
    title: 'Preposition Mastery',
    conceptTag: 'Prepositions',
    difficulty: 'easy',
    estimatedTimeMinutes: 10,
    recommendedReason: 'Recent assignments show minor confusion with preposition usage. Quick practice to master this!',
    status: 'not_started',
    questionCount: 10,
  },
  {
    id: 'practice-3',
    title: 'Academic Vocabulary Builder',
    conceptTag: 'Vocabulary',
    difficulty: 'medium',
    estimatedTimeMinutes: 20,
    recommendedReason: 'Expanding vocabulary will improve your reading comprehension and writing skills.',
    status: 'in_progress',
    lastPracticedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    questionCount: 15,
  },
  
  // Additional practice sets
  {
    id: 'practice-4',
    title: 'Present Perfect vs Simple Past',
    conceptTag: 'Tenses',
    difficulty: 'hard',
    estimatedTimeMinutes: 25,
    recommendedReason: 'Master the subtle differences between these commonly confused tenses.',
    status: 'not_started',
    questionCount: 12,
  },
  {
    id: 'practice-5',
    title: 'Reading Comprehension: Main Ideas',
    conceptTag: 'Reading',
    difficulty: 'medium',
    estimatedTimeMinutes: 18,
    recommendedReason: 'Strengthen your ability to identify main ideas and supporting details in passages.',
    status: 'completed',
    lastPracticedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    questionCount: 6,
  },
  {
    id: 'practice-6',
    title: 'Conditional Sentences Practice',
    conceptTag: 'Conditionals',
    difficulty: 'hard',
    estimatedTimeMinutes: 20,
    recommendedReason: 'If-clauses can be tricky! Practice all types: zero, first, second, and third conditionals.',
    status: 'not_started',
    questionCount: 10,
  },
  {
    id: 'practice-7',
    title: 'Sentence Structure Basics',
    conceptTag: 'Grammar',
    difficulty: 'easy',
    estimatedTimeMinutes: 12,
    recommendedReason: 'Build a strong foundation with simple, compound, and complex sentence structures.',
    status: 'not_started',
    questionCount: 8,
  },
  {
    id: 'practice-8',
    title: 'Idioms and Expressions',
    conceptTag: 'Vocabulary',
    difficulty: 'medium',
    estimatedTimeMinutes: 15,
    recommendedReason: 'Learn common English idioms to sound more natural and improve comprehension.',
    status: 'not_started',
    questionCount: 12,
  },
  {
    id: 'practice-9',
    title: 'Modal Verbs in Context',
    conceptTag: 'Grammar',
    difficulty: 'medium',
    estimatedTimeMinutes: 15,
    recommendedReason: 'Practice using can, could, may, might, must, should in different situations.',
    status: 'not_started',
    questionCount: 10,
  },
  {
    id: 'practice-10',
    title: 'Passive Voice Practice',
    conceptTag: 'Grammar',
    difficulty: 'hard',
    estimatedTimeMinutes: 20,
    recommendedReason: 'Master passive constructions for more formal and academic writing.',
    status: 'not_started',
    questionCount: 10,
  },
  {
    id: 'practice-11',
    title: 'Inference and Context Clues',
    conceptTag: 'Reading',
    difficulty: 'medium',
    estimatedTimeMinutes: 15,
    recommendedReason: 'Improve your ability to understand implied meaning and use context to figure out unknown words.',
    status: 'not_started',
    questionCount: 8,
  },
  {
    id: 'practice-12',
    title: 'Adjectives and Adverbs',
    conceptTag: 'Grammar',
    difficulty: 'easy',
    estimatedTimeMinutes: 10,
    recommendedReason: 'Practice the correct placement and usage of descriptive words.',
    status: 'not_started',
    questionCount: 10,
  },
];

/**
 * Get all practice sets for a student
 * Returns sets sorted by recommendation priority
 */
export const getPracticeSets = async (studentId: string): Promise<PracticeSet[]> => {
  await delay(400);
  
  // Sort by status (in_progress first) and then by recommendation
  const sorted = [...mockPracticeSets].sort((a, b) => {
    // In progress first
    if (a.status === 'in_progress' && b.status !== 'in_progress') return -1;
    if (a.status !== 'in_progress' && b.status === 'in_progress') return 1;
    
    // Then not started before completed
    if (a.status === 'not_started' && b.status === 'completed') return -1;
    if (a.status === 'completed' && b.status === 'not_started') return 1;
    
    return 0;
  });
  
  return sorted;
};

/**
 * Get questions for a practice set
 * Reuses the solve questions structure from assignments
 */
export const getPracticeQuestions = async (practiceId: string): Promise<SolveQuestion[]> => {
  await delay(500);
  
  // Map practice sets to assignment IDs that have similar questions
  // In a real app, each practice set would have its own questions
  const practiceToAssignmentMap: Record<string, string> = {
    'practice-1': 'student-assignment-3', // Past tense questions
    'practice-2': 'student-assignment-1', // Present perfect (has preposition usage)
    'practice-3': 'student-assignment-2', // Vocabulary
    'practice-4': 'student-assignment-1', // Present perfect
    'practice-5': 'student-assignment-4', // Reading comprehension
    'practice-6': 'student-assignment-3', // Past tense (conditional-like)
    'practice-7': 'student-assignment-1', // Grammar
    'practice-8': 'student-assignment-2', // Vocabulary
    'practice-9': 'student-assignment-1', // Modal verbs (grammar)
    'practice-10': 'student-assignment-3', // Passive voice (grammar)
    'practice-11': 'student-assignment-4', // Reading inference
    'practice-12': 'student-assignment-1', // Adjectives/adverbs
  };
  
  const assignmentId = practiceToAssignmentMap[practiceId] || 'student-assignment-1';
  
  // Reuse the assignment questions
  return getSolveQuestions(assignmentId);
};

/**
 * Submit practice answers
 * For practice, we don't store scores, just mark as completed
 */
export const submitPracticeAnswers = async (practiceId: string): Promise<void> => {
  await delay(600);
  
  // In a real app, this would:
  // 1. Calculate score (for student's reference only, not saved)
  // 2. Update practice set status to 'completed'
  // 3. Update lastPracticedAt timestamp
  
  console.log('Practice completed:', practiceId);
  
  return Promise.resolve();
};

