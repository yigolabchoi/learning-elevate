/**
 * Mock API - AI Insights
 * 
 * AI가 자동으로 분석하여 선생님의 업무를 줄이는 인사이트 제공
 */

const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export interface UrgentStudent {
  id: string;
  name: string;
  score: number;
  reason: string;
  daysInactive: number;
}

export interface QuickApprovalSubmission {
  id: string;
  studentName: string;
  assignmentTitle: string;
  score: number;
  confidence: number; // AI confidence percentage
}

export interface RecommendedAssignment {
  id: string;
  title: string;
  reason: string;
  targetStudentCount: number;
  conceptTags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface PriorityTask {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: number; // minutes
  link: string;
}

export interface AIInsight {
  summary: string;
  todayActionCount: number;
  estimatedTime: number; // total estimated time in minutes
  autoApprovalReady: number;
  urgentStudents: UrgentStudent[];
  quickApprovalReady: QuickApprovalSubmission[];
  recommendedAssignments: RecommendedAssignment[];
  priorityTasks: PriorityTask[];
}

// Mock data
const mockInsight: AIInsight = {
  summary: '오늘은 3명의 학생이 특별한 주의가 필요합니다. 12개의 제출물이 AI 자동 승인 대기 중이며, 5개의 추천 과제를 학생들에게 배정할 수 있습니다. 예상 소요 시간은 약 25분입니다.',
  todayActionCount: 8,
  estimatedTime: 25,
  autoApprovalReady: 12,
  urgentStudents: [
    {
      id: 'student-5',
      name: 'Jung Woo-jin',
      score: 65,
      reason: '최근 3주간 성적이 지속적으로 하락하고 있습니다',
      daysInactive: 5,
    },
    {
      id: 'student-3',
      name: 'Park Ji-hu',
      score: 78,
      reason: '출석률이 88%로 낮고, Grammar 개념 이해도가 부족합니다',
      daysInactive: 2,
    },
    {
      id: 'student-new-1',
      name: 'Kang Min-seo',
      score: 62,
      reason: '제출 기한을 자주 놓치고, 과제 완료율이 60%입니다',
      daysInactive: 7,
    },
  ],
  quickApprovalReady: [
    {
      id: 'sub-quick-1',
      studentName: 'Lee Seo-yeon',
      assignmentTitle: 'Advanced Grammar Practice',
      score: 95,
      confidence: 98,
    },
    {
      id: 'sub-quick-2',
      studentName: 'Han Yu-na',
      assignmentTitle: 'Reading Comprehension',
      score: 92,
      confidence: 97,
    },
    {
      id: 'sub-quick-3',
      studentName: 'Kim Min-jun',
      assignmentTitle: 'Vocabulary Quiz',
      score: 88,
      confidence: 96,
    },
    {
      id: 'sub-quick-4',
      studentName: 'Choi Da-eun',
      assignmentTitle: 'Present Perfect Practice',
      score: 90,
      confidence: 95,
    },
    {
      id: 'sub-quick-5',
      studentName: 'Park Seo-jun',
      assignmentTitle: 'Writing Task',
      score: 85,
      confidence: 95,
    },
  ],
  recommendedAssignments: [
    {
      id: 'rec-1',
      title: 'Grammar Fundamentals Review',
      reason: '3명의 학생이 Present Simple과 Present Perfect 개념에서 어려움을 겪고 있습니다',
      targetStudentCount: 3,
      conceptTags: ['Present Simple', 'Present Perfect', 'Basic Grammar'],
      difficulty: 'beginner',
    },
    {
      id: 'rec-2',
      title: 'Writing Skills Boost',
      reason: '5명의 학생이 작문 점수가 평균보다 15점 낮습니다',
      targetStudentCount: 5,
      conceptTags: ['Essay Writing', 'Paragraph Structure', 'Opinion Writing'],
      difficulty: 'intermediate',
    },
    {
      id: 'rec-3',
      title: 'Vocabulary Builder - Daily Life',
      reason: '일상 어휘 문제에서 반 전체 평균이 70%로 낮습니다',
      targetStudentCount: 8,
      conceptTags: ['Daily Vocabulary', 'Common Phrases', 'Practical English'],
      difficulty: 'beginner',
    },
  ],
  priorityTasks: [
    {
      id: 'task-1',
      title: '긴급: Jung Woo-jin 학생 일대일 상담 필요',
      description: 'AI 분석 결과, 학습 동기가 크게 저하되었습니다',
      priority: 'high',
      estimatedTime: 15,
      link: '/teacher/students/student-5',
    },
    {
      id: 'task-2',
      title: '12개 제출물 일괄 승인',
      description: 'AI가 높은 신뢰도로 채점 완료 (클릭 한 번으로 승인 가능)',
      priority: 'high',
      estimatedTime: 2,
      link: '/teacher/submissions?filter=quick-approval',
    },
    {
      id: 'task-3',
      title: 'Grammar 보충 과제 배정',
      description: '3명의 학생에게 추천 (자동 생성됨)',
      priority: 'medium',
      estimatedTime: 3,
      link: '/teacher/assignments/new?preset=grammar-fundamentals',
    },
    {
      id: 'task-4',
      title: '이번 주 출석률 확인',
      description: '2명의 학생이 출석률 90% 미만',
      priority: 'medium',
      estimatedTime: 5,
      link: '/teacher/students?filter=low-attendance',
    },
    {
      id: 'task-5',
      title: '학부모 알림 발송',
      description: '주의가 필요한 학생 3명의 학부모에게 자동 알림',
      priority: 'low',
      estimatedTime: 2,
      link: '/teacher/notifications/send',
    },
  ],
};

/**
 * Get AI-powered insights for teacher
 */
export const getAIInsights = async (teacherId: string): Promise<AIInsight> => {
  await delay(800); // Simulate AI processing time
  return mockInsight;
};

/**
 * Bulk approve submissions
 */
export const bulkApproveSubmissions = async (
  submissionIds: string[],
  teacherId: string
): Promise<void> => {
  await delay(500);
  // In real app, this would approve all submissions at once
  console.log(`Bulk approved ${submissionIds.length} submissions by teacher ${teacherId}`);
};

/**
 * Auto-assign recommended assignment
 */
export const autoAssignRecommended = async (
  recommendationId: string,
  teacherId: string
): Promise<void> => {
  await delay(500);
  console.log(`Auto-assigned recommendation ${recommendationId} by teacher ${teacherId}`);
};

