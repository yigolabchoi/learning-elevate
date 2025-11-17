/**
 * Mock API - Parent Children
 * 
 * Provides mock data for parent viewing their children's learning data.
 * 
 * Functions:
 * - getChildrenByParent(parentId)
 * - getChildDashboard(childId)
 */

import { ParentChild, ParentChildDashboard } from '../../../types';

// Mock delay to simulate network latency
const delay = (ms: number = 400) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Children Data
const mockChildren: ParentChild[] = [
  {
    id: 'child-1',
    name: 'Kim Min-jun',
    grade: 'Grade 7',
    className: 'Grade 7 - A',
    lastActiveAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    currentLevel: 'Level 4',
  },
  {
    id: 'child-2',
    name: 'Lee Seo-yeon',
    grade: 'Grade 7',
    className: 'Grade 7 - A',
    lastActiveAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    currentLevel: 'Level 3',
  },
  {
    id: 'child-3',
    name: 'Park Ji-hoon',
    grade: 'Grade 9',
    className: 'Grade 9 - B',
    lastActiveAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    currentLevel: 'Level 6',
  },
];

// Mock Dashboard Data
const mockDashboards: Record<string, ParentChildDashboard> = {
  'child-1': {
    childId: 'child-1',
    childName: 'Kim Min-jun',
    grade: 'Grade 7',
    className: 'Grade 7 - A',
    currentLevel: 'Level 4',
    recentSummary: {
      studyDaysLast30: 22,
      assignmentsCompletedLast30: 8,
      averageScoreLast30: 85,
    },
    strengthSummary: 'Min-jun shows excellent comprehension of grammar concepts, particularly present and past tenses. His vocabulary retention is strong, and he consistently applies new words correctly in writing assignments.',
    weaknessSummary: 'Reading speed could be improved - Min-jun sometimes takes extra time to complete reading comprehension tasks. Additionally, confidence in speaking practice could use reinforcement through more oral exercises.',
    aiSummaryComment: 'Over the last month, Min-jun has demonstrated steady progress with an average score of 85%. He is particularly strong in grammar and vocabulary, showing consistent improvement in written assignments. His engagement has been excellent with 22 active study days. To reach the next level, focus on improving reading speed and building confidence in oral communication. Consider dedicating 15-20 minutes daily to reading practice and participating in speaking activities.',
    shortHistory: [
      { date: '2025-10-18', score: 78 },
      { date: '2025-10-25', score: 82 },
      { date: '2025-11-01', score: 85 },
      { date: '2025-11-08', score: 88 },
      { date: '2025-11-15', score: 87 },
    ],
  },
  'child-2': {
    childId: 'child-2',
    childName: 'Lee Seo-yeon',
    grade: 'Grade 7',
    className: 'Grade 7 - A',
    currentLevel: 'Level 3',
    recentSummary: {
      studyDaysLast30: 18,
      assignmentsCompletedLast30: 6,
      averageScoreLast30: 76,
    },
    strengthSummary: 'Seo-yeon excels in creative writing and shows great enthusiasm for descriptive assignments. She has a natural ability to use vivid language and her essay organization is well-structured. Listening comprehension is also a notable strength.',
    weaknessSummary: 'Grammar accuracy needs improvement, especially with verb tenses and subject-verb agreement. Seo-yeon sometimes rushes through assignments, leading to careless errors. More attention to detail and proofreading would significantly improve scores.',
    aiSummaryComment: 'Over the last month, Seo-yeon has maintained a consistent average of 76% with room for growth. Her creative writing abilities are impressive, and she demonstrates strong listening skills. However, grammar accuracy remains a challenge that affects overall performance. Encourage her to slow down and review her work before submission. With 18 active study days, she\'s showing good engagement. Suggested focus areas: grammar drills (15 minutes daily) and developing a proofreading habit.',
    shortHistory: [
      { date: '2025-10-18', score: 72 },
      { date: '2025-10-25', score: 75 },
      { date: '2025-11-01', score: 74 },
      { date: '2025-11-08', score: 78 },
      { date: '2025-11-15', score: 81 },
    ],
  },
  'child-3': {
    childId: 'child-3',
    childName: 'Park Ji-hoon',
    grade: 'Grade 9',
    className: 'Grade 9 - B',
    currentLevel: 'Level 6',
    recentSummary: {
      studyDaysLast30: 25,
      assignmentsCompletedLast30: 10,
      averageScoreLast30: 92,
    },
    strengthSummary: 'Ji-hoon demonstrates advanced-level proficiency across all skill areas. His analytical approach to reading comprehension is exceptional, and he consistently identifies main ideas and supporting details. Grammar mastery is near-perfect, and his academic vocabulary is impressive for his grade level.',
    weaknessSummary: 'While Ji-hoon\'s overall performance is excellent, there\'s minor room for improvement in idiomatic expressions and colloquial language. His writing, though accurate, could benefit from more varied sentence structures to add stylistic flair.',
    aiSummaryComment: 'Over the last month, Ji-hoon has excelled with an outstanding 92% average across all assignments. His dedication is evident with 25 active study days and 10 completed assignments. He\'s operating at an advanced level with strong performance in all areas. To continue challenging him, consider introducing more complex literary texts and advanced writing techniques. His consistent effort and high achievement indicate readiness for Level 7 soon. Encourage exploration of authentic English materials (news, podcasts) to enhance exposure to natural language use.',
    shortHistory: [
      { date: '2025-10-18', score: 88 },
      { date: '2025-10-25', score: 90 },
      { date: '2025-11-01', score: 91 },
      { date: '2025-11-08', score: 94 },
      { date: '2025-11-15', score: 95 },
    ],
  },
};

/**
 * Get all children linked to a parent account
 */
export const getChildrenByParent = async (parentId: string): Promise<ParentChild[]> => {
  await delay(400);
  
  // Return all children for any parent (in real app, would filter by parentId)
  return [...mockChildren];
};

/**
 * Get dashboard data for a specific child
 */
export const getChildDashboard = async (childId: string): Promise<ParentChildDashboard | null> => {
  await delay(500);
  
  const dashboard = mockDashboards[childId];
  return dashboard ? { ...dashboard } : null;
};

