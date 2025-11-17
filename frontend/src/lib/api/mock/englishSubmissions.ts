/**
 * Mock API - English Submissions with AI Grading
 * 
 * 실제 영어 문제 제출 및 AI 채점 결과를 시뮬레이션
 */

import { EnglishQuestion, generateProblemSet } from '../../english';
import { gradeAnswer, gradeMultipleAnswers, calculateTotalScore, generateOverallFeedback } from '../../english/aiGrading';

const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export interface EnglishSubmission {
  id: string;
  studentId: string;
  studentName: string;
  assignmentId: string;
  assignmentTitle: string;
  classId: string;
  className: string;
  submittedAt: string;
  questions: EnglishQuestion[];
  answers: Map<string, string>;
  aiGradingResults: Map<string, any>;
  overallScore: number;
  overallFeedback: string;
  status: 'pending_teacher' | 'approved';
  teacherComments?: Map<string, string>;
  teacherAdjustedScore?: number;
  approvedAt?: string;
  approvedBy?: string;
}

// Mock 제출물 데이터
const mockSubmissions: EnglishSubmission[] = [
  {
    id: 'sub-1',
    studentId: 'student-1',
    studentName: 'Kim Min-jun',
    assignmentId: 'assign-1',
    assignmentTitle: 'Intermediate Grammar Practice',
    classId: 'class-1',
    className: 'Grade 7-A',
    submittedAt: '2025-01-15T14:30:00Z',
    questions: generateProblemSet('intermediate', 3),
    answers: new Map([
      ['intermediate-grammar-1', 'visited, have visited'],
      ['intermediate-vocabulary-1', 'look up'],
      ['intermediate-reading-1', 'greenhouse gas emissions'],
    ]),
    aiGradingResults: new Map(),
    overallScore: 85,
    overallFeedback: 'Good job! You scored 85/100. You answered 2 out of 3 questions correctly (67%). You\'re doing well, but there\'s room for improvement in some areas.',
    status: 'pending_teacher',
  },
  {
    id: 'sub-2',
    studentId: 'student-2',
    studentName: 'Lee Seo-yeon',
    assignmentId: 'assign-1',
    assignmentTitle: 'Intermediate Grammar Practice',
    classId: 'class-1',
    className: 'Grade 7-A',
    submittedAt: '2025-01-15T15:20:00Z',
    questions: generateProblemSet('intermediate', 3),
    answers: new Map([
      ['intermediate-grammar-1', '1. visited, 2. have visited'],
      ['intermediate-vocabulary-1', 'look up'],
      ['intermediate-writing-1', 'I think students should not use smartphones in class because they can be distracting. First, students might play games instead of listening. Second, it can disturb other students. However, smartphones can be useful for research. In conclusion, I believe the disadvantages outweigh the advantages in a classroom setting.'],
    ]),
    aiGradingResults: new Map(),
    overallScore: 92,
    overallFeedback: 'Excellent work! You scored 92/100. You answered 3 out of 3 questions correctly (100%). Your English proficiency is outstanding. Keep up the great work!',
    status: 'pending_teacher',
  },
  {
    id: 'sub-3',
    studentId: 'student-3',
    studentName: 'Park Ji-hu',
    assignmentId: 'assign-2',
    assignmentTitle: 'Beginner English Practice',
    classId: 'class-1',
    className: 'Grade 7-A',
    submittedAt: '2025-01-16T10:00:00Z',
    questions: generateProblemSet('beginner', 4),
    answers: new Map([
      ['beginner-grammar-1', 'goes'],
      ['beginner-vocabulary-1', 'brush'],
      ['beginner-reading-1', 'Seoul'],
      ['beginner-writing-1', 'My name is Jihu. I am 13 years old. My favorite hobby is playing soccer. I like to play with my friends.'],
    ]),
    aiGradingResults: new Map(),
    overallScore: 95,
    overallFeedback: 'Excellent work! You scored 95/100. You answered 4 out of 4 questions correctly (100%). Your English proficiency is outstanding. Keep up the great work!',
    status: 'pending_teacher',
  },
];

// AI 채점 수행 (제출 시)
const performAIGrading = (submission: EnglishSubmission): EnglishSubmission => {
  const gradingResults = gradeMultipleAnswers(
    submission.questions,
    submission.answers
  );
  
  const totalScore = calculateTotalScore(gradingResults);
  const overallFeedback = generateOverallFeedback(gradingResults, totalScore);
  
  return {
    ...submission,
    aiGradingResults: gradingResults,
    overallScore: totalScore,
    overallFeedback,
  };
};

// 초기화 시 AI 채점 수행
mockSubmissions.forEach((sub, index) => {
  mockSubmissions[index] = performAIGrading(sub);
});

// 선생님의 대기 중인 제출물 가져오기
export const getPendingSubmissions = async (teacherId: string): Promise<EnglishSubmission[]> => {
  await delay();
  return mockSubmissions.filter(s => s.status === 'pending_teacher');
};

// 제출물 상세 정보 가져오기
export const getSubmissionDetail = async (submissionId: string): Promise<EnglishSubmission | null> => {
  await delay();
  const submission = mockSubmissions.find(s => s.id === submissionId);
  return submission || null;
};

// 선생님 승인 처리
export const approveSubmission = async (
  submissionId: string,
  teacherId: string,
  teacherComments: Map<string, string>,
  adjustedScore?: number
): Promise<void> => {
  await delay(500);
  
  const index = mockSubmissions.findIndex(s => s.id === submissionId);
  if (index !== -1) {
    mockSubmissions[index] = {
      ...mockSubmissions[index],
      status: 'approved',
      teacherComments,
      teacherAdjustedScore: adjustedScore,
      approvedAt: new Date().toISOString(),
      approvedBy: teacherId,
    };
  }
};

// 학생의 승인된 제출물 가져오기 (학생용)
export const getStudentApprovedSubmissions = async (studentId: string): Promise<EnglishSubmission[]> => {
  await delay();
  return mockSubmissions.filter(
    s => s.studentId === studentId && s.status === 'approved'
  );
};

// 특정 제출물의 최종 피드백 가져오기 (학생용)
export const getSubmissionFeedback = async (submissionId: string): Promise<EnglishSubmission | null> => {
  await delay();
  const submission = mockSubmissions.find(s => s.id === submissionId && s.status === 'approved');
  return submission || null;
};

// 학부모가 자녀 제출물 조회
export const getChildSubmissions = async (childId: string): Promise<EnglishSubmission[]> => {
  await delay();
  return mockSubmissions.filter(s => s.studentId === childId && s.status === 'approved');
};

