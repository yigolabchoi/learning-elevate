/**
 * Mock API - Teacher Students Management
 * 
 * 선생님이 담당하는 학생들의 정보와 학습 현황 관리
 */

const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export interface StudentWithStats {
  id: string;
  name: string;
  email: string;
  className: string;
  currentLevel: number;
  averageScore: number;
  completedAssignments: number;
  pendingAssignments: number;
  lastActiveAt: string;
  topStrengths: string[];
  topWeaknesses: string[];
}

export interface StudentDetail extends StudentWithStats {
  attendanceRate: number;
  scoreTrend: Array<{ date: string; score: number }>;
  recentSubmissions: Array<{
    id: string;
    assignmentTitle: string;
    score: number;
    submittedAt: string;
    status: 'pending_teacher' | 'approved';
  }>;
  conceptProgress: Array<{
    concept: string;
    accuracy: number;
    attemptCount: number;
  }>;
  aiRecommendation: string;
  teacherNote?: string;
}

// Mock student data
const mockStudents: StudentWithStats[] = [
  {
    id: 'student-1',
    name: 'Kim Min-jun',
    email: 'minjun.kim@school.com',
    className: 'Grade 7-A',
    currentLevel: 3,
    averageScore: 85,
    completedAssignments: 12,
    pendingAssignments: 2,
    lastActiveAt: '2025-01-17T10:30:00Z',
    topStrengths: ['Grammar', 'Vocabulary'],
    topWeaknesses: ['Writing'],
  },
  {
    id: 'student-2',
    name: 'Lee Seo-yeon',
    email: 'seoyeon.lee@school.com',
    className: 'Grade 7-A',
    currentLevel: 4,
    averageScore: 92,
    completedAssignments: 15,
    pendingAssignments: 1,
    lastActiveAt: '2025-01-17T14:00:00Z',
    topStrengths: ['Reading', 'Writing', 'Grammar'],
    topWeaknesses: ['Speaking'],
  },
  {
    id: 'student-3',
    name: 'Park Ji-hu',
    email: 'jihu.park@school.com',
    className: 'Grade 7-A',
    currentLevel: 2,
    averageScore: 78,
    completedAssignments: 10,
    pendingAssignments: 3,
    lastActiveAt: '2025-01-15T09:00:00Z',
    topStrengths: ['Listening'],
    topWeaknesses: ['Grammar', 'Vocabulary'],
  },
  {
    id: 'student-4',
    name: 'Choi Da-eun',
    email: 'daeun.choi@school.com',
    className: 'Grade 7-B',
    currentLevel: 3,
    averageScore: 88,
    completedAssignments: 13,
    pendingAssignments: 2,
    lastActiveAt: '2025-01-17T11:45:00Z',
    topStrengths: ['Reading', 'Vocabulary'],
    topWeaknesses: ['Writing'],
  },
  {
    id: 'student-5',
    name: 'Jung Woo-jin',
    email: 'woojin.jung@school.com',
    className: 'Grade 7-B',
    currentLevel: 2,
    averageScore: 65,
    completedAssignments: 8,
    pendingAssignments: 4,
    lastActiveAt: '2025-01-12T16:20:00Z',
    topStrengths: ['Listening'],
    topWeaknesses: ['Grammar', 'Writing', 'Vocabulary'],
  },
  {
    id: 'student-6',
    name: 'Han Yu-na',
    email: 'yuna.han@school.com',
    className: 'Grade 7-B',
    currentLevel: 4,
    averageScore: 95,
    completedAssignments: 16,
    pendingAssignments: 1,
    lastActiveAt: '2025-01-17T15:30:00Z',
    topStrengths: ['Grammar', 'Writing', 'Reading'],
    topWeaknesses: [],
  },
];

// Mock detailed student data
const mockStudentDetails: Record<string, StudentDetail> = {
  'student-1': {
    ...mockStudents[0],
    attendanceRate: 95,
    scoreTrend: [
      { date: '2025-01-01', score: 78 },
      { date: '2025-01-05', score: 82 },
      { date: '2025-01-08', score: 85 },
      { date: '2025-01-12', score: 87 },
      { date: '2025-01-15', score: 85 },
    ],
    recentSubmissions: [
      {
        id: 'sub-1',
        assignmentTitle: 'Intermediate Grammar Practice',
        score: 85,
        submittedAt: '2025-01-15T14:30:00Z',
        status: 'approved',
      },
      {
        id: 'sub-2',
        assignmentTitle: 'Vocabulary Quiz - Unit 3',
        score: 90,
        submittedAt: '2025-01-12T10:20:00Z',
        status: 'approved',
      },
      {
        id: 'sub-3',
        assignmentTitle: 'Reading Comprehension',
        score: 80,
        submittedAt: '2025-01-10T11:15:00Z',
        status: 'approved',
      },
    ],
    conceptProgress: [
      { concept: 'Present Simple', accuracy: 92, attemptCount: 15 },
      { concept: 'Present Perfect', accuracy: 78, attemptCount: 12 },
      { concept: 'Phrasal Verbs', accuracy: 85, attemptCount: 10 },
      { concept: 'Reading Comprehension', accuracy: 88, attemptCount: 8 },
      { concept: 'Essay Writing', accuracy: 65, attemptCount: 5 },
    ],
    aiRecommendation: 'Min-jun shows consistent improvement in grammar and vocabulary. However, writing skills need more practice. Recommend assigning more descriptive and opinion essay tasks to build confidence in written expression.',
    teacherNote: 'Active participant in class. Needs encouragement with creative writing assignments.',
  },
  'student-2': {
    ...mockStudents[1],
    attendanceRate: 100,
    scoreTrend: [
      { date: '2025-01-01', score: 88 },
      { date: '2025-01-05', score: 90 },
      { date: '2025-01-08', score: 92 },
      { date: '2025-01-12', score: 94 },
      { date: '2025-01-15', score: 92 },
    ],
    recentSubmissions: [
      {
        id: 'sub-4',
        assignmentTitle: 'Intermediate Grammar Practice',
        score: 92,
        submittedAt: '2025-01-15T15:20:00Z',
        status: 'approved',
      },
      {
        id: 'sub-5',
        assignmentTitle: 'Advanced Reading',
        score: 95,
        submittedAt: '2025-01-13T14:00:00Z',
        status: 'approved',
      },
      {
        id: 'sub-6',
        assignmentTitle: 'Essay - Climate Change',
        score: 90,
        submittedAt: '2025-01-10T16:30:00Z',
        status: 'approved',
      },
    ],
    conceptProgress: [
      { concept: 'Present Perfect', accuracy: 95, attemptCount: 15 },
      { concept: 'Conditionals', accuracy: 90, attemptCount: 12 },
      { concept: 'Academic Vocabulary', accuracy: 92, attemptCount: 14 },
      { concept: 'Critical Reading', accuracy: 94, attemptCount: 10 },
      { concept: 'Argumentative Writing', accuracy: 88, attemptCount: 8 },
    ],
    aiRecommendation: 'Seo-yeon is an excellent student with high proficiency across all areas. Consider providing advanced-level materials and challenging tasks to maintain engagement. Could benefit from peer tutoring opportunities.',
    teacherNote: 'Top performer. Very motivated and helps other students.',
  },
  'student-3': {
    ...mockStudents[2],
    attendanceRate: 88,
    scoreTrend: [
      { date: '2025-01-01', score: 72 },
      { date: '2025-01-05', score: 75 },
      { date: '2025-01-08', score: 78 },
      { date: '2025-01-12', score: 80 },
      { date: '2025-01-15', score: 78 },
    ],
    recentSubmissions: [
      {
        id: 'sub-7',
        assignmentTitle: 'Beginner English Practice',
        score: 95,
        submittedAt: '2025-01-16T10:00:00Z',
        status: 'approved',
      },
      {
        id: 'sub-8',
        assignmentTitle: 'Grammar Basics',
        score: 70,
        submittedAt: '2025-01-13T09:30:00Z',
        status: 'approved',
      },
      {
        id: 'sub-9',
        assignmentTitle: 'Vocabulary - Daily Life',
        score: 68,
        submittedAt: '2025-01-10T11:00:00Z',
        status: 'approved',
      },
    ],
    conceptProgress: [
      { concept: 'Present Simple', accuracy: 82, attemptCount: 12 },
      { concept: 'Basic Vocabulary', accuracy: 75, attemptCount: 15 },
      { concept: 'Simple Reading', accuracy: 78, attemptCount: 10 },
      { concept: 'Sentence Structure', accuracy: 65, attemptCount: 8 },
      { concept: 'Basic Writing', accuracy: 60, attemptCount: 6 },
    ],
    aiRecommendation: 'Ji-hu is making steady progress but struggles with grammar fundamentals. Recommend more practice with basic sentence structures and verb tenses. Additional one-on-one support could be beneficial.',
    teacherNote: 'Shy but trying hard. Consider pairing with a study buddy.',
  },
};

// Populate remaining mock details
mockStudents.forEach((student) => {
  if (!mockStudentDetails[student.id]) {
    mockStudentDetails[student.id] = {
      ...student,
      attendanceRate: 90 + Math.floor(Math.random() * 10),
      scoreTrend: Array.from({ length: 5 }, (_, i) => ({
        date: new Date(Date.now() - (4 - i) * 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        score: student.averageScore + Math.floor(Math.random() * 10 - 5),
      })),
      recentSubmissions: [
        {
          id: `sub-${student.id}-1`,
          assignmentTitle: 'Recent Assignment',
          score: student.averageScore,
          submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'approved',
        },
      ],
      conceptProgress: student.topStrengths.concat(student.topWeaknesses).map(concept => ({
        concept,
        accuracy: student.topStrengths.includes(concept) ? 85 + Math.floor(Math.random() * 10) : 50 + Math.floor(Math.random() * 20),
        attemptCount: 8 + Math.floor(Math.random() * 8),
      })),
      aiRecommendation: `${student.name} is performing at an average level. Focus on improving ${student.topWeaknesses.join(', ')}.`,
      teacherNote: '',
    };
  }
});

// Teacher notes storage
const teacherNotes: Record<string, string> = {};

/**
 * Get all students by teacher
 */
export const getStudentsByTeacher = async (teacherId: string): Promise<StudentWithStats[]> => {
  await delay();
  return mockStudents;
};

/**
 * Get detailed student information
 */
export const getStudentDetailById = async (studentId: string): Promise<StudentDetail | null> => {
  await delay();
  const detail = mockStudentDetails[studentId];
  if (!detail) return null;

  // Include saved teacher note if exists
  if (teacherNotes[studentId]) {
    return {
      ...detail,
      teacherNote: teacherNotes[studentId],
    };
  }

  return detail;
};

/**
 * Save teacher's note for a student
 */
export const saveTeacherNote = async (
  studentId: string,
  teacherId: string,
  note: string
): Promise<void> => {
  await delay(500);
  teacherNotes[studentId] = note;
  
  // Update in mock data
  if (mockStudentDetails[studentId]) {
    mockStudentDetails[studentId].teacherNote = note;
  }
};

