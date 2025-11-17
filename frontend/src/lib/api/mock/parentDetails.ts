/**
 * Mock API - Parent Child Details
 * 
 * Provides detailed report data for a child including assignments and category performance.
 * 
 * Functions:
 * - getChildDetails(childId, period)
 */

import { ParentChildDetails } from '../../../types';

// Mock delay to simulate network latency
const delay = (ms: number = 400) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Details Data by Child and Period
const mockDetails: Record<string, Record<string, ParentChildDetails>> = {
  'child-1': {
    '30': {
      childId: 'child-1',
      childName: 'Kim Min-jun',
      periodLabel: 'Last 30 days',
      assignments: [
        {
          assignmentId: 'a1',
          title: 'Present Perfect Tense Practice',
          unitTitle: 'Unit 3: Grammar Fundamentals',
          completedAt: '2025-11-15T14:30:00Z',
          score: 87,
        },
        {
          assignmentId: 'a2',
          title: 'Vocabulary Quiz - Science Terms',
          unitTitle: 'Unit 4: Academic Vocabulary',
          completedAt: '2025-11-12T10:15:00Z',
          score: 92,
        },
        {
          assignmentId: 'a3',
          title: 'Reading Comprehension - Short Stories',
          unitTitle: 'Unit 2: Reading Skills',
          completedAt: '2025-11-08T16:45:00Z',
          score: 82,
        },
        {
          assignmentId: 'a4',
          title: 'Essay Writing - My Favorite Season',
          unitTitle: 'Unit 5: Writing Practice',
          completedAt: '2025-11-05T11:20:00Z',
          score: 85,
        },
        {
          assignmentId: 'a5',
          title: 'Listening Exercise - Daily Conversations',
          unitTitle: 'Unit 1: Listening Comprehension',
          completedAt: '2025-11-01T09:30:00Z',
          score: 88,
        },
        {
          assignmentId: 'a6',
          title: 'Grammar Review - Past Tenses',
          unitTitle: 'Unit 3: Grammar Fundamentals',
          completedAt: '2025-10-28T13:00:00Z',
          score: 90,
        },
        {
          assignmentId: 'a7',
          title: 'Vocabulary Builder - Emotions',
          unitTitle: 'Unit 4: Academic Vocabulary',
          completedAt: '2025-10-25T15:30:00Z',
          score: 85,
        },
        {
          assignmentId: 'a8',
          title: 'Reading Quiz - News Articles',
          unitTitle: 'Unit 2: Reading Skills',
          completedAt: '2025-10-20T10:45:00Z',
          score: 78,
        },
      ],
      categoryStats: [
        { category: 'Grammar', avgScore: 88 },
        { category: 'Vocabulary', avgScore: 89 },
        { category: 'Reading', avgScore: 80 },
        { category: 'Writing', avgScore: 85 },
        { category: 'Listening', avgScore: 88 },
      ],
      improvements: [
        'Vocabulary retention has improved significantly - now consistently scoring above 85%',
        'Grammar accuracy in complex sentences has shown marked improvement',
        'Essay structure and organization have become more coherent',
        'Reduced careless errors in multiple-choice questions',
      ],
      concerns: [
        'Reading speed remains below grade level - consider daily reading practice',
        'Speaking confidence is still low - needs more oral practice opportunities',
        'Comprehension drops with longer texts (500+ words)',
      ],
    },
    '90': {
      childId: 'child-1',
      childName: 'Kim Min-jun',
      periodLabel: 'Last 90 days',
      assignments: [
        // Include all from 30 days plus more
        {
          assignmentId: 'a1',
          title: 'Present Perfect Tense Practice',
          unitTitle: 'Unit 3: Grammar Fundamentals',
          completedAt: '2025-11-15T14:30:00Z',
          score: 87,
        },
        {
          assignmentId: 'a2',
          title: 'Vocabulary Quiz - Science Terms',
          unitTitle: 'Unit 4: Academic Vocabulary',
          completedAt: '2025-11-12T10:15:00Z',
          score: 92,
        },
        {
          assignmentId: 'a3',
          title: 'Reading Comprehension - Short Stories',
          unitTitle: 'Unit 2: Reading Skills',
          completedAt: '2025-11-08T16:45:00Z',
          score: 82,
        },
        {
          assignmentId: 'a4',
          title: 'Essay Writing - My Favorite Season',
          unitTitle: 'Unit 5: Writing Practice',
          completedAt: '2025-11-05T11:20:00Z',
          score: 85,
        },
        {
          assignmentId: 'a5',
          title: 'Listening Exercise - Daily Conversations',
          unitTitle: 'Unit 1: Listening Comprehension',
          completedAt: '2025-11-01T09:30:00Z',
          score: 88,
        },
        {
          assignmentId: 'a6',
          title: 'Grammar Review - Past Tenses',
          unitTitle: 'Unit 3: Grammar Fundamentals',
          completedAt: '2025-10-28T13:00:00Z',
          score: 90,
        },
        {
          assignmentId: 'a7',
          title: 'Vocabulary Builder - Emotions',
          unitTitle: 'Unit 4: Academic Vocabulary',
          completedAt: '2025-10-25T15:30:00Z',
          score: 85,
        },
        {
          assignmentId: 'a8',
          title: 'Reading Quiz - News Articles',
          unitTitle: 'Unit 2: Reading Skills',
          completedAt: '2025-10-20T10:45:00Z',
          score: 78,
        },
        {
          assignmentId: 'a9',
          title: 'Grammar Basics - Articles',
          unitTitle: 'Unit 3: Grammar Fundamentals',
          completedAt: '2025-10-15T14:00:00Z',
          score: 82,
        },
        {
          assignmentId: 'a10',
          title: 'Vocabulary - Common Phrases',
          unitTitle: 'Unit 4: Academic Vocabulary',
          completedAt: '2025-10-10T11:30:00Z',
          score: 80,
        },
        {
          assignmentId: 'a11',
          title: 'Reading - Story Analysis',
          unitTitle: 'Unit 2: Reading Skills',
          completedAt: '2025-10-05T16:00:00Z',
          score: 75,
        },
        {
          assignmentId: 'a12',
          title: 'Descriptive Essay - My School',
          unitTitle: 'Unit 5: Writing Practice',
          completedAt: '2025-09-28T10:30:00Z',
          score: 80,
        },
        {
          assignmentId: 'a13',
          title: 'Listening - Podcast Comprehension',
          unitTitle: 'Unit 1: Listening Comprehension',
          completedAt: '2025-09-22T15:00:00Z',
          score: 85,
        },
        {
          assignmentId: 'a14',
          title: 'Grammar - Conditionals',
          unitTitle: 'Unit 3: Grammar Fundamentals',
          completedAt: '2025-09-18T13:30:00Z',
          score: 78,
        },
      ],
      categoryStats: [
        { category: 'Grammar', avgScore: 85 },
        { category: 'Vocabulary', avgScore: 86 },
        { category: 'Reading', avgScore: 78 },
        { category: 'Writing', avgScore: 83 },
        { category: 'Listening', avgScore: 87 },
      ],
      improvements: [
        'Significant upward trend in overall scores - improved by 9% over 3 months',
        'Grammar understanding has progressed from basic to intermediate level',
        'Vocabulary acquisition rate has increased steadily',
        'Writing skills show consistent improvement in structure and clarity',
        'Listening comprehension has become a strong area',
      ],
      concerns: [
        'Reading comprehension improvement is slower than other areas',
        'Long-form reading tasks still challenging',
        'Speaking practice remains minimal - no oral assessments completed',
        'Occasional inconsistency in performance suggests attention/motivation fluctuations',
      ],
    },
  },
  'child-2': {
    '30': {
      childId: 'child-2',
      childName: 'Lee Seo-yeon',
      periodLabel: 'Last 30 days',
      assignments: [
        {
          assignmentId: 'b1',
          title: 'Creative Writing - Story Continuation',
          unitTitle: 'Unit 5: Writing Practice',
          completedAt: '2025-11-16T14:00:00Z',
          score: 88,
        },
        {
          assignmentId: 'b2',
          title: 'Grammar Quiz - Subject-Verb Agreement',
          unitTitle: 'Unit 3: Grammar Fundamentals',
          completedAt: '2025-11-10T10:30:00Z',
          score: 72,
        },
        {
          assignmentId: 'b3',
          title: 'Listening Practice - Interviews',
          unitTitle: 'Unit 1: Listening Comprehension',
          completedAt: '2025-11-06T15:45:00Z',
          score: 82,
        },
        {
          assignmentId: 'b4',
          title: 'Vocabulary - Adjectives & Adverbs',
          unitTitle: 'Unit 4: Academic Vocabulary',
          completedAt: '2025-11-02T11:00:00Z',
          score: 75,
        },
        {
          assignmentId: 'b5',
          title: 'Reading Comprehension - Fiction',
          unitTitle: 'Unit 2: Reading Skills',
          completedAt: '2025-10-29T09:15:00Z',
          score: 70,
        },
        {
          assignmentId: 'b6',
          title: 'Essay - My Role Model',
          unitTitle: 'Unit 5: Writing Practice',
          completedAt: '2025-10-23T13:30:00Z',
          score: 85,
        },
      ],
      categoryStats: [
        { category: 'Grammar', avgScore: 72 },
        { category: 'Vocabulary', avgScore: 75 },
        { category: 'Reading', avgScore: 70 },
        { category: 'Writing', avgScore: 87 },
        { category: 'Listening', avgScore: 82 },
      ],
      improvements: [
        'Creative writing scores consistently high - excellent descriptive language',
        'Recent improvement in proofreading - fewer careless errors',
        'Listening comprehension has improved by 8% this month',
        'Shows enthusiasm and effort in all assignments',
      ],
      concerns: [
        'Grammar accuracy needs focus - especially verb tenses',
        'Reading comprehension scores remain low - may need additional support',
        'Rushing through assignments leading to preventable mistakes',
        'Subject-verb agreement errors persist despite instruction',
      ],
    },
    '90': {
      childId: 'child-2',
      childName: 'Lee Seo-yeon',
      periodLabel: 'Last 90 days',
      assignments: [
        {
          assignmentId: 'b1',
          title: 'Creative Writing - Story Continuation',
          unitTitle: 'Unit 5: Writing Practice',
          completedAt: '2025-11-16T14:00:00Z',
          score: 88,
        },
        {
          assignmentId: 'b2',
          title: 'Grammar Quiz - Subject-Verb Agreement',
          unitTitle: 'Unit 3: Grammar Fundamentals',
          completedAt: '2025-11-10T10:30:00Z',
          score: 72,
        },
        {
          assignmentId: 'b3',
          title: 'Listening Practice - Interviews',
          unitTitle: 'Unit 1: Listening Comprehension',
          completedAt: '2025-11-06T15:45:00Z',
          score: 82,
        },
        {
          assignmentId: 'b4',
          title: 'Vocabulary - Adjectives & Adverbs',
          unitTitle: 'Unit 4: Academic Vocabulary',
          completedAt: '2025-11-02T11:00:00Z',
          score: 75,
        },
        {
          assignmentId: 'b5',
          title: 'Reading Comprehension - Fiction',
          unitTitle: 'Unit 2: Reading Skills',
          completedAt: '2025-10-29T09:15:00Z',
          score: 70,
        },
        {
          assignmentId: 'b6',
          title: 'Essay - My Role Model',
          unitTitle: 'Unit 5: Writing Practice',
          completedAt: '2025-10-23T13:30:00Z',
          score: 85,
        },
        {
          assignmentId: 'b7',
          title: 'Grammar - Prepositions',
          unitTitle: 'Unit 3: Grammar Fundamentals',
          completedAt: '2025-10-18T14:30:00Z',
          score: 68,
        },
        {
          assignmentId: 'b8',
          title: 'Vocabulary - Action Verbs',
          unitTitle: 'Unit 4: Academic Vocabulary',
          completedAt: '2025-10-12T10:00:00Z',
          score: 72,
        },
        {
          assignmentId: 'b9',
          title: 'Reading - Non-fiction Article',
          unitTitle: 'Unit 2: Reading Skills',
          completedAt: '2025-10-08T16:00:00Z',
          score: 65,
        },
        {
          assignmentId: 'b10',
          title: 'Descriptive Writing - My Hometown',
          unitTitle: 'Unit 5: Writing Practice',
          completedAt: '2025-09-30T11:30:00Z',
          score: 82,
        },
        {
          assignmentId: 'b11',
          title: 'Listening - News Report',
          unitTitle: 'Unit 1: Listening Comprehension',
          completedAt: '2025-09-25T15:15:00Z',
          score: 78,
        },
        {
          assignmentId: 'b12',
          title: 'Grammar - Past Perfect',
          unitTitle: 'Unit 3: Grammar Fundamentals',
          completedAt: '2025-09-20T13:00:00Z',
          score: 70,
        },
      ],
      categoryStats: [
        { category: 'Grammar', avgScore: 70 },
        { category: 'Vocabulary', avgScore: 74 },
        { category: 'Reading', avgScore: 68 },
        { category: 'Writing', avgScore: 85 },
        { category: 'Listening', avgScore: 80 },
      ],
      improvements: [
        'Writing skills are a clear strength - consistently high scores',
        'Gradual improvement in listening comprehension over 3 months',
        'Increased engagement and participation in recent weeks',
        'Vocabulary has shown steady growth',
      ],
      concerns: [
        'Grammar remains the weakest area - needs targeted practice',
        'Reading comprehension has not improved significantly',
        'Tendency to rush affecting accuracy across multiple categories',
        'Basic grammar concepts (tenses, agreement) need reinforcement',
      ],
    },
  },
  'child-3': {
    '30': {
      childId: 'child-3',
      childName: 'Park Ji-hoon',
      periodLabel: 'Last 30 days',
      assignments: [
        {
          assignmentId: 'c1',
          title: 'Advanced Reading - Literary Analysis',
          unitTitle: 'Unit 6: Advanced Reading',
          completedAt: '2025-11-15T16:00:00Z',
          score: 95,
        },
        {
          assignmentId: 'c2',
          title: 'Grammar Mastery - Complex Sentences',
          unitTitle: 'Unit 7: Advanced Grammar',
          completedAt: '2025-11-11T14:30:00Z',
          score: 96,
        },
        {
          assignmentId: 'c3',
          title: 'Academic Vocabulary - Research Terms',
          unitTitle: 'Unit 8: Academic English',
          completedAt: '2025-11-07T10:15:00Z',
          score: 92,
        },
        {
          assignmentId: 'c4',
          title: 'Argumentative Essay - Technology',
          unitTitle: 'Unit 9: Advanced Writing',
          completedAt: '2025-11-03T11:45:00Z',
          score: 94,
        },
        {
          assignmentId: 'c5',
          title: 'Listening - Academic Lectures',
          unitTitle: 'Unit 10: Advanced Listening',
          completedAt: '2025-10-30T15:30:00Z',
          score: 90,
        },
        {
          assignmentId: 'c6',
          title: 'Critical Reading - Opinion Articles',
          unitTitle: 'Unit 6: Advanced Reading',
          completedAt: '2025-10-26T13:00:00Z',
          score: 93,
        },
        {
          assignmentId: 'c7',
          title: 'Grammar Challenge - Passive Voice',
          unitTitle: 'Unit 7: Advanced Grammar',
          completedAt: '2025-10-22T09:30:00Z',
          score: 94,
        },
        {
          assignmentId: 'c8',
          title: 'Vocabulary - Idiomatic Expressions',
          unitTitle: 'Unit 8: Academic English',
          completedAt: '2025-10-18T16:15:00Z',
          score: 88,
        },
        {
          assignmentId: 'c9',
          title: 'Research Paper - Environmental Issues',
          unitTitle: 'Unit 9: Advanced Writing',
          completedAt: '2025-10-14T14:00:00Z',
          score: 92,
        },
        {
          assignmentId: 'c10',
          title: 'Listening - TED Talk Analysis',
          unitTitle: 'Unit 10: Advanced Listening',
          completedAt: '2025-10-10T10:45:00Z',
          score: 91,
        },
      ],
      categoryStats: [
        { category: 'Grammar', avgScore: 95 },
        { category: 'Vocabulary', avgScore: 90 },
        { category: 'Reading', avgScore: 94 },
        { category: 'Writing', avgScore: 93 },
        { category: 'Listening', avgScore: 91 },
      ],
      improvements: [
        'Exceptional performance across all categories',
        'Advanced-level analytical skills evident in reading comprehension',
        'Grammar mastery at near-perfect level',
        'Writing demonstrates sophisticated vocabulary and varied sentence structures',
        'Consistently high scores with minimal fluctuation',
      ],
      concerns: [
        'Idiomatic expressions and colloquial language could use more exposure',
        'While excellent overall, could benefit from more creative/stylistic variety in writing',
        'Ready for Level 7 materials - current assignments may not be challenging enough',
      ],
    },
    '90': {
      childId: 'child-3',
      childName: 'Park Ji-hoon',
      periodLabel: 'Last 90 days',
      assignments: [
        {
          assignmentId: 'c1',
          title: 'Advanced Reading - Literary Analysis',
          unitTitle: 'Unit 6: Advanced Reading',
          completedAt: '2025-11-15T16:00:00Z',
          score: 95,
        },
        {
          assignmentId: 'c2',
          title: 'Grammar Mastery - Complex Sentences',
          unitTitle: 'Unit 7: Advanced Grammar',
          completedAt: '2025-11-11T14:30:00Z',
          score: 96,
        },
        {
          assignmentId: 'c3',
          title: 'Academic Vocabulary - Research Terms',
          unitTitle: 'Unit 8: Academic English',
          completedAt: '2025-11-07T10:15:00Z',
          score: 92,
        },
        {
          assignmentId: 'c4',
          title: 'Argumentative Essay - Technology',
          unitTitle: 'Unit 9: Advanced Writing',
          completedAt: '2025-11-03T11:45:00Z',
          score: 94,
        },
        {
          assignmentId: 'c5',
          title: 'Listening - Academic Lectures',
          unitTitle: 'Unit 10: Advanced Listening',
          completedAt: '2025-10-30T15:30:00Z',
          score: 90,
        },
        {
          assignmentId: 'c6',
          title: 'Critical Reading - Opinion Articles',
          unitTitle: 'Unit 6: Advanced Reading',
          completedAt: '2025-10-26T13:00:00Z',
          score: 93,
        },
        {
          assignmentId: 'c7',
          title: 'Grammar Challenge - Passive Voice',
          unitTitle: 'Unit 7: Advanced Grammar',
          completedAt: '2025-10-22T09:30:00Z',
          score: 94,
        },
        {
          assignmentId: 'c8',
          title: 'Vocabulary - Idiomatic Expressions',
          unitTitle: 'Unit 8: Academic English',
          completedAt: '2025-10-18T16:15:00Z',
          score: 88,
        },
        {
          assignmentId: 'c9',
          title: 'Research Paper - Environmental Issues',
          unitTitle: 'Unit 9: Advanced Writing',
          completedAt: '2025-10-14T14:00:00Z',
          score: 92,
        },
        {
          assignmentId: 'c10',
          title: 'Listening - TED Talk Analysis',
          unitTitle: 'Unit 10: Advanced Listening',
          completedAt: '2025-10-10T10:45:00Z',
          score: 91,
        },
        {
          assignmentId: 'c11',
          title: 'Reading - Classic Literature',
          unitTitle: 'Unit 6: Advanced Reading',
          completedAt: '2025-10-05T15:00:00Z',
          score: 90,
        },
        {
          assignmentId: 'c12',
          title: 'Grammar - Modal Verbs Advanced',
          unitTitle: 'Unit 7: Advanced Grammar',
          completedAt: '2025-09-30T13:30:00Z',
          score: 93,
        },
        {
          assignmentId: 'c13',
          title: 'Vocabulary - Academic Word List',
          unitTitle: 'Unit 8: Academic English',
          completedAt: '2025-09-25T11:00:00Z',
          score: 89,
        },
        {
          assignmentId: 'c14',
          title: 'Persuasive Essay - Education Reform',
          unitTitle: 'Unit 9: Advanced Writing',
          completedAt: '2025-09-20T16:30:00Z',
          score: 91,
        },
        {
          assignmentId: 'c15',
          title: 'Listening - Documentary Analysis',
          unitTitle: 'Unit 10: Advanced Listening',
          completedAt: '2025-09-15T10:15:00Z',
          score: 88,
        },
      ],
      categoryStats: [
        { category: 'Grammar', avgScore: 94 },
        { category: 'Vocabulary', avgScore: 90 },
        { category: 'Reading', avgScore: 93 },
        { category: 'Writing', avgScore: 92 },
        { category: 'Listening', avgScore: 90 },
      ],
      improvements: [
        'Sustained high performance over 3-month period',
        'Consistent upward trend - improved from 88% to 96%',
        'Demonstrates readiness for Level 7 advanced materials',
        'Strong analytical and critical thinking skills evident',
        'Excellent work ethic and self-directed learning',
        'All categories at or above 90% - exceptional across the board',
      ],
      concerns: [
        'Current level may not provide sufficient challenge',
        'Could benefit from exposure to more authentic native materials',
        'Minimal room for improvement in current curriculum - needs advancement',
      ],
    },
  },
};

/**
 * Get detailed report for a child
 * @param childId - The child's ID
 * @param period - Time period: '30' for last 30 days, '90' for last 90 days
 */
export const getChildDetails = async (
  childId: string,
  period: '30' | '90' = '30'
): Promise<ParentChildDetails | null> => {
  await delay(500);

  const childData = mockDetails[childId];
  if (!childData) return null;

  const details = childData[period];
  return details ? { ...details } : null;
};

