/**
 * 애플리케이션 라우트 상수
 */

export const ROUTES = {
  // 인증
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
  },

  // 교사
  TEACHER: {
    DASHBOARD: '/teacher/dashboard',
    CURRICULUM: '/teacher/curriculum',
    CURRICULUM_NEW: '/teacher/curriculum/new',
    CURRICULUM_DETAIL: (id: string) => `/teacher/curriculum/${id}`,
    STUDENTS: '/teacher/students',
    STUDENT_DETAIL: (id: string) => `/teacher/students/${id}`,
    REVIEW: '/teacher/review',
    REVIEW_DETAIL: (assignmentId: string, studentId: string) => 
      `/teacher/review/${assignmentId}/${studentId}`,
  },

  // 학생
  STUDENT: {
    DASHBOARD: '/student/dashboard',
    ASSIGNMENT: (id: string) => `/student/assignment/${id}`,
    SOLVE: (attemptId: string) => `/student/solve/${attemptId}`,
    RESULT: (attemptId: string) => `/student/result/${attemptId}`,
    HISTORY: '/student/history',
  },

  // 학부모
  PARENT: {
    DASHBOARD: '/parent/dashboard',
    REPORT: (studentId: string) => `/parent/report/${studentId}`,
  },
} as const;

