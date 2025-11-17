/**
 * 공통 타입 정의
 */

// 사용자 역할
export type UserRole = 'teacher' | 'student' | 'parent' | 'admin';

// 사용자 타입
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// 교사 타입
export interface Teacher extends User {
  role: 'teacher';
  subject: string;
  subjects?: string[]; // For user management
  schoolName?: string;
  gradeLevels: string[];
}

// 학생 타입
export interface Student extends User {
  role: 'student';
  gradeLevel: string;
  currentLevel: number;
  teacherId: string;
  parentId?: string;
  classId?: string; // For user management
}

// 학부모 타입
export interface Parent extends User {
  role: 'parent';
  phone?: string;
  childIds: string[]; // For user management
}

// 커리큘럼 타입 (Teacher Management)
export interface Curriculum {
  id: string;
  name: string;
  subject: string;
  level: string; // e.g., "Grade 7", "Beginner"
  description?: string;
  teacherId: string;
  units: Unit[];
  createdAt: string;
  updatedAt: string;
}

// 단원 타입 (Teacher Management)
export interface Unit {
  id: string;
  title: string;
  learningObjective: string;
  conceptTags: string[]; // e.g., ["Tense", "Preposition"]
  exampleSentences?: string[];
  exampleQuestions?: string[];
}

// 커리큘럼 폼 데이터
export interface CurriculumFormData {
  name: string;
  subject: string;
  level: string;
  description?: string;
  units: UnitFormData[];
}

// 단원 폼 데이터
export interface UnitFormData {
  id?: string; // Optional for new units
  title: string;
  learningObjective: string;
  conceptTags: string[];
  exampleSentences: string[];
  exampleQuestions: string[];
}

// 문제 타입 (Problem Set)
export type QuestionType = 'multipleChoice' | 'shortAnswer' | 'descriptive';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: string[]; // for multipleChoice
  correctAnswer?: string | string[];
  conceptTags?: string[];
}

// Problem Set 타입
export interface ProblemSet {
  id: string;
  name: string;
  curriculumId: string;
  curriculumName?: string; // for display
  unitId: string;
  unitTitle?: string; // for display
  difficulty: DifficultyLevel;
  questionCount: number;
  questionTypeRatio: {
    multipleChoice: number;
    shortAnswer: number;
    descriptive: number;
  };
  questions: Question[];
  teacherId: string;
  createdAt: string;
  updatedAt?: string;
}

// Problem Set 생성 설정
export interface ProblemSetGenerationConfig {
  name: string;
  curriculumId: string;
  unitId: string;
  difficulty: DifficultyLevel;
  targetQuestionCount: number;
  questionTypeRatio: {
    multipleChoice: number;
    shortAnswer: number;
    descriptive: number;
  };
}

// 과제 타입
export interface Assignment {
  id: string;
  title: string;
  classId: string;
  className?: string; // for display
  problemSetId: string;
  problemSetName?: string; // for display
  dueDate: string;
  assignedAt: string;
  status: 'active' | 'closed';
  teacherId: string;
}

// 제출물 타입
export type SubmissionStatus = 'pending_ai' | 'pending_teacher' | 'confirmed';

export interface Submission {
  id: string;
  assignmentId: string;
  assignmentTitle?: string; // for display
  studentId: string;
  studentName?: string; // for display
  classId?: string;
  className?: string; // for display
  submittedAt: string;
  score?: number;
  status: SubmissionStatus;
}

// 제출물 상세 타입
export interface SubmissionQuestionDetail {
  questionId: string;
  prompt: string;
  studentAnswer: string;
  aiScore?: number;
  aiFeedback?: string;
  teacherComment?: string;
  finalScore?: number;
}

export interface SubmissionDetail extends Submission {
  questions: SubmissionQuestionDetail[];
}

// 리포트 타입
export interface ClassReport {
  classId: string;
  className: string;
  studentCount: number;
  averageScore: number;
  assignmentsSummary: {
    assignmentId: string;
    title: string;
    averageScore: number;
    completionRate: number;
  }[];
  conceptStats: {
    conceptTag: string;
    averageAccuracy: number; // 0-100
  }[];
}

export interface StudentReport {
  studentId: string;
  studentName: string;
  className: string;
  classId: string;
  currentLevel: string;
  recentAssignments: {
    assignmentId: string;
    title: string;
    score: number;
    submittedAt: string;
  }[];
  weaknessTags: {
    conceptTag: string;
    accuracy: number; // 0-100
  }[];
  trendData: {
    date: string;
    score: number;
  }[];
}

// Student Assignment 타입
export type StudentAssignmentStatus = 'not_started' | 'in_progress' | 'completed';

export interface StudentAssignment {
  id: string;
  title: string;
  className: string;
  unitTitle: string;
  dueDate: string;
  status: StudentAssignmentStatus;
  totalQuestions: number;
  completedQuestions: number;
}

export interface StudentAssignmentDetail extends StudentAssignment {
  description?: string;
  lastAttemptedAt?: string;
  score?: number;
  latestFeedbackSummary?: string;
}

// Problem Solving 타입 (QuestionType은 위에서 이미 정의됨)

export interface SolveQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: string[];  // for multiple choice
  studentAnswer?: string | string[];
}

export interface SolveSession {
  assignmentId: string;
  studentId: string;
  questions: SolveQuestion[];
  currentIndex: number;
}

// Student History 타입
export interface StudentHistoryItem {
  id: string;  // assignmentId
  title: string;
  className: string;
  unitTitle: string;
  completedAt: string;
  score: number;
}

export interface StudentHistoryDetail extends StudentHistoryItem {
  summaryFeedback: string;
  questions: {
    questionId: string;
    prompt: string;
    studentAnswer: string;
    isCorrect: boolean;
    aiExplanation: string;
  }[];
}

// Student Practice 타입
export type PracticeDifficulty = 'easy' | 'medium' | 'hard';
export type PracticeStatus = 'not_started' | 'in_progress' | 'completed';

export interface PracticeSet {
  id: string;
  title: string;
  conceptTag: string;
  difficulty: PracticeDifficulty;
  estimatedTimeMinutes: number;
  recommendedReason: string;
  status: PracticeStatus;
  lastPracticedAt?: string;
  questionCount?: number;
}

// Parent Portal 타입
export interface ParentChild {
  id: string;
  name: string;
  grade: string;
  className: string;
  lastActiveAt: string;
  currentLevel: string;
}

export interface ParentChildDashboard {
  childId: string;
  childName: string;
  grade: string;
  className: string;
  currentLevel: string;
  recentSummary: {
    studyDaysLast30: number;
    assignmentsCompletedLast30: number;
    averageScoreLast30: number;
  };
  strengthSummary: string;
  weaknessSummary: string;
  aiSummaryComment: string;
  shortHistory: {
    date: string;
    score: number;
  }[];
}

export interface ParentChildDetails {
  childId: string;
  childName: string;
  periodLabel: string;
  assignments: {
    assignmentId: string;
    title: string;
    unitTitle: string;
    completedAt: string;
    score: number;
  }[];
  categoryStats: {
    category: string;
    avgScore: number;
  }[];
  improvements: string[];
  concerns: string[];
}

export interface ParentProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    importantOnly: boolean;
  };
}

export type ParentNotificationType = 'info' | 'warning' | 'success';

export interface ParentNotification {
  id: string;
  type: ParentNotificationType;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

// 페이지네이션 타입
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Class Management Types
export interface Class {
  id: string;
  name: string;
  gradeLevel?: string;
  subject?: string;
  teacherId?: string;
  studentIds: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface ClassFormData {
  name: string;
  gradeLevel?: string;
  subject?: string;
  teacherId?: string;
  studentIds: string[];
}

// Teacher Dashboard Types
export interface AssignmentSummary {
  id: string;
  title: string;
  classId: string;
  className: string;
  dueDate: string;
  completedCount: number;
  totalStudents: number;
}

export interface PendingSubmissionSummary {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  assignmentId: string;
  assignmentTitle: string;
  submittedAt: string;
  aiScore: number;
}

export interface ClassSummary {
  id: string;
  name: string;
  studentCount: number;
  gradeLevel?: string;
  subject?: string;
}

export interface DashboardSummary {
  classes: ClassSummary[];
  todayAssignments: AssignmentSummary[];
  pendingSubmissions: PendingSubmissionSummary[];
}

