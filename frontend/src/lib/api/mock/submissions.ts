/**
 * Mock API - Submission Management
 * 
 * Provides mock data and async functions for submission management.
 * Teachers can view, filter, and confirm student submissions.
 * 
 * Functions:
 * - getSubmissionsByTeacher(teacherId, filters)
 * - getSubmissionDetail(id)
 * - updateSubmissionStatus(id, status)
 * - updateSubmissionTeacherFeedback(id, feedbackPayload)
 */

import { Submission, SubmissionDetail, SubmissionStatus, SubmissionQuestionDetail } from '../../../types';

// Mock delay to simulate network latency
const delay = (ms: number = 400) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Submissions Data
let mockSubmissions: SubmissionDetail[] = [
  {
    id: 'submission-1',
    assignmentId: 'assignment-1',
    assignmentTitle: 'Present Perfect Practice',
    studentId: 'student-1',
    studentName: 'Kim Min-jun',
    classId: 'class-1',
    className: 'Grade 7 - A',
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    score: 85,
    status: 'pending_teacher',
    questions: [
      {
        questionId: 'q-1-1',
        prompt: 'Which sentence correctly uses the present perfect tense?',
        studentAnswer: 'I have visited Paris three times.',
        aiScore: 100,
        aiFeedback: 'Correct! The student correctly identified the present perfect tense usage.',
      },
      {
        questionId: 'q-1-2',
        prompt: 'Complete the sentence: "She ___ (study) English for five years."',
        studentAnswer: 'has studied',
        aiScore: 100,
        aiFeedback: 'Perfect! The correct form "has studied" was used.',
      },
      {
        questionId: 'q-1-3',
        prompt: 'Describe three activities you have done this week using the present perfect tense.',
        studentAnswer: 'I have finished my homework. I have played soccer with friends. I have read a book.',
        aiScore: 90,
        aiFeedback: 'Good use of present perfect. Minor improvement: could add more detail to each activity.',
      },
    ],
  },
  {
    id: 'submission-2',
    assignmentId: 'assignment-1',
    assignmentTitle: 'Present Perfect Practice',
    studentId: 'student-2',
    studentName: 'Lee Seo-yeon',
    classId: 'class-1',
    className: 'Grade 7 - A',
    submittedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    score: 92,
    status: 'pending_teacher',
    questions: [
      {
        questionId: 'q-1-1',
        prompt: 'Which sentence correctly uses the present perfect tense?',
        studentAnswer: 'I have visited Paris three times.',
        aiScore: 100,
        aiFeedback: 'Excellent! Perfect understanding of present perfect usage.',
      },
      {
        questionId: 'q-1-2',
        prompt: 'Complete the sentence: "She ___ (study) English for five years."',
        studentAnswer: 'has studied',
        aiScore: 100,
        aiFeedback: 'Correct form used.',
      },
      {
        questionId: 'q-1-3',
        prompt: 'Describe three activities you have done this week using the present perfect tense.',
        studentAnswer: 'I have studied math every day this week. I have helped my mom cook dinner twice. I have watched two movies.',
        aiScore: 95,
        aiFeedback: 'Excellent detailed responses with proper present perfect usage throughout.',
      },
    ],
  },
  {
    id: 'submission-3',
    assignmentId: 'assignment-2',
    assignmentTitle: 'Grammar Challenge',
    studentId: 'student-13',
    studentName: 'Jeon Yu-jin',
    classId: 'class-4',
    className: 'Grade 9 - Advanced',
    submittedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    score: 88,
    status: 'pending_teacher',
    questions: [
      {
        questionId: 'q-2-1',
        prompt: 'Identify complex sentence structures in the given text.',
        studentAnswer: 'The text contains subordinating conjunctions like "although" and "because" which create complex sentences.',
        aiScore: 90,
        aiFeedback: 'Good identification of key elements. Could provide specific examples from the text.',
      },
      {
        questionId: 'q-2-2',
        prompt: 'Explain the difference between compound and complex sentences.',
        studentAnswer: 'Compound sentences use coordinating conjunctions (and, but, or) while complex sentences use subordinating conjunctions (because, although, since).',
        aiScore: 85,
        aiFeedback: 'Good basic understanding. Could elaborate on independent vs. dependent clauses.',
      },
    ],
  },
  {
    id: 'submission-4',
    assignmentId: 'assignment-1',
    assignmentTitle: 'Present Perfect Practice',
    studentId: 'student-3',
    studentName: 'Park Ji-hu',
    classId: 'class-1',
    className: 'Grade 7 - A',
    submittedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    score: 78,
    status: 'pending_teacher',
    questions: [
      {
        questionId: 'q-1-1',
        prompt: 'Which sentence correctly uses the present perfect tense?',
        studentAnswer: 'I visited Paris three times.',
        aiScore: 0,
        aiFeedback: 'Incorrect. This is simple past, not present perfect. Should be "I have visited".',
      },
      {
        questionId: 'q-1-2',
        prompt: 'Complete the sentence: "She ___ (study) English for five years."',
        studentAnswer: 'studied',
        aiScore: 0,
        aiFeedback: 'Incorrect form. Should be "has studied" for present perfect.',
      },
      {
        questionId: 'q-1-3',
        prompt: 'Describe three activities you have done this week using the present perfect tense.',
        studentAnswer: 'I have finished homework. I have play soccer. I read books.',
        aiScore: 60,
        aiFeedback: 'Partial credit. First sentence correct. Second should be "played", third should be "have read".',
      },
    ],
  },
  {
    id: 'submission-5',
    assignmentId: 'assignment-2',
    assignmentTitle: 'Grammar Challenge',
    studentId: 'student-14',
    studentName: 'Song Ji-an',
    classId: 'class-4',
    className: 'Grade 9 - Advanced',
    submittedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
    score: 95,
    status: 'confirmed',
    questions: [
      {
        questionId: 'q-2-1',
        prompt: 'Identify complex sentence structures in the given text.',
        studentAnswer: 'The passage uses several complex structures: "Although the weather was bad, we went hiking" shows concession, and "I studied because I wanted to pass" shows causation.',
        aiScore: 100,
        aiFeedback: 'Excellent! Specific examples with clear analysis.',
        teacherComment: 'Great work! Very thorough analysis.',
        finalScore: 100,
      },
      {
        questionId: 'q-2-2',
        prompt: 'Explain the difference between compound and complex sentences.',
        studentAnswer: 'Compound sentences join two independent clauses with coordinating conjunctions. Complex sentences combine an independent clause with one or more dependent clauses using subordinating conjunctions.',
        aiScore: 95,
        aiFeedback: 'Perfect explanation with clear understanding of clause types.',
        teacherComment: 'Perfect! Well explained.',
        finalScore: 95,
      },
    ],
  },
];

interface SubmissionFilters {
  classId?: string;
  assignmentId?: string;
  status?: SubmissionStatus;
}

/**
 * Get submissions for a teacher with optional filters
 */
export const getSubmissionsByTeacher = async (
  teacherId: string,
  filters?: SubmissionFilters
): Promise<Submission[]> => {
  await delay(300);

  let filtered = [...mockSubmissions];

  if (filters?.classId) {
    filtered = filtered.filter((s) => s.classId === filters.classId);
  }

  if (filters?.assignmentId) {
    filtered = filtered.filter((s) => s.assignmentId === filters.assignmentId);
  }

  if (filters?.status) {
    filtered = filtered.filter((s) => s.status === filters.status);
  }

  // Return without question details for list view
  return filtered.map(({ questions, ...submission }) => submission);
};

/**
 * Get submission detail with questions
 */
export const getSubmissionDetail = async (id: string): Promise<SubmissionDetail | null> => {
  await delay(300);
  const submission = mockSubmissions.find((s) => s.id === id);
  return submission ? { ...submission } : null;
};

/**
 * Update submission status
 */
export const updateSubmissionStatus = async (
  id: string,
  status: SubmissionStatus
): Promise<SubmissionDetail | null> => {
  await delay(500);

  const index = mockSubmissions.findIndex((s) => s.id === id);
  if (index === -1) {
    return null;
  }

  mockSubmissions[index].status = status;
  return { ...mockSubmissions[index] };
};

/**
 * Update submission with teacher feedback
 */
export const updateSubmissionTeacherFeedback = async (
  id: string,
  feedbackPayload: {
    questionFeedback: Array<{
      questionId: string;
      teacherComment: string;
      finalScore?: number;
    }>;
    status?: SubmissionStatus;
  }
): Promise<SubmissionDetail | null> => {
  await delay(500);

  const index = mockSubmissions.findIndex((s) => s.id === id);
  if (index === -1) {
    return null;
  }

  // Update teacher feedback for each question
  feedbackPayload.questionFeedback.forEach((feedback) => {
    const questionIndex = mockSubmissions[index].questions.findIndex(
      (q) => q.questionId === feedback.questionId
    );
    if (questionIndex !== -1) {
      mockSubmissions[index].questions[questionIndex].teacherComment = feedback.teacherComment;
      if (feedback.finalScore !== undefined) {
        mockSubmissions[index].questions[questionIndex].finalScore = feedback.finalScore;
      }
    }
  });

  // Update status if provided
  if (feedbackPayload.status) {
    mockSubmissions[index].status = feedbackPayload.status;
  }

  return { ...mockSubmissions[index] };
};

