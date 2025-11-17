/**
 * Mock API - Student History
 * 
 * Provides mock data for student assignment history and feedback.
 * 
 * Functions:
 * - getStudentHistory(studentId)
 * - getStudentHistoryDetail(assignmentId)
 */

import { StudentHistoryItem, StudentHistoryDetail } from '../../../types';

// Mock delay to simulate network latency
const delay = (ms: number = 400) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock History Data
const mockHistory: StudentHistoryDetail[] = [
  {
    id: 'student-assignment-5',
    title: 'Grammar Challenge',
    className: 'Grade 7 - A',
    unitTitle: 'Unit 1: Present Tenses',
    completedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
    score: 85,
    summaryFeedback: 'Excellent work on present perfect! You demonstrated a strong understanding of the basic structure and usage. Minor issues with prepositions - remember "for" is used for duration and "since" for starting points. Keep practicing vocabulary to improve further.',
    questions: [
      {
        questionId: 'q1',
        prompt: 'Which sentence correctly uses the present perfect tense?',
        studentAnswer: 'I have seen that movie three times.',
        isCorrect: true,
        aiExplanation: 'Correct! "I have seen that movie three times" properly uses present perfect (have + past participle) to describe an experience that happened at an unspecified time and may happen again.',
      },
      {
        questionId: 'q2',
        prompt: 'Complete: "She _____ to Paris twice."',
        studentAnswer: 'has been',
        isCorrect: true,
        aiExplanation: 'Perfect! "has been" is correct because the subject is "she" (third person singular) and we need present perfect to describe her life experience.',
      },
      {
        questionId: 'q3',
        prompt: 'Fill in the blank: "They _____ (finish) their homework already."',
        studentAnswer: 'have finished',
        isCorrect: true,
        aiExplanation: 'Excellent! You correctly used "have finished" with the time expression "already", which is commonly used with present perfect.',
      },
      {
        questionId: 'q4',
        prompt: 'Which time expression is commonly used with present perfect?',
        studentAnswer: 'already',
        isCorrect: true,
        aiExplanation: 'Correct! "Already" is a time expression commonly used with present perfect. Other similar expressions include "yet", "just", "ever", and "never".',
      },
      {
        questionId: 'q5',
        prompt: 'Rewrite using present perfect: "I read this book." (Add "just")',
        studentAnswer: 'I have just read this book.',
        isCorrect: true,
        aiExplanation: 'Perfect answer! You correctly placed "just" between "have" and the past participle "read". The word order is: have/has + just + past participle.',
      },
      {
        questionId: 'q6',
        prompt: 'Write 3 sentences about things you have done this week using present perfect.',
        studentAnswer: 'I have studied English every day. I have played soccer with my friends. I have finished my math homework.',
        isCorrect: true,
        aiExplanation: 'Great job! All three sentences correctly use present perfect tense. Your sentences show good variety and proper structure.',
      },
      {
        questionId: 'q7',
        prompt: 'What is the past participle of "eat"?',
        studentAnswer: 'eaten',
        isCorrect: true,
        aiExplanation: 'Correct! "Eaten" is the past participle of the irregular verb "eat". Remember: eat → ate (past simple) → eaten (past participle).',
      },
      {
        questionId: 'q8',
        prompt: 'Complete: "We _____ (not/see) him since Monday."',
        studentAnswer: 'have not seen',
        isCorrect: true,
        aiExplanation: 'Perfect! "have not seen" (or "haven\'t seen") is correct with "since Monday". "Since" + specific time point requires present perfect.',
      },
      {
        questionId: 'q9',
        prompt: 'Which sentence is correct?',
        studentAnswer: 'Have you ever been to Japan?',
        isCorrect: true,
        aiExplanation: 'Excellent! "Have you ever been to Japan?" is the correct form. "Ever" is used in questions with present perfect to ask about life experiences.',
      },
      {
        questionId: 'q10',
        prompt: 'Explain the difference between "I went to Paris" and "I have been to Paris".',
        studentAnswer: 'I went to Paris is past simple for a specific time. I have been to Paris is for experience.',
        isCorrect: false,
        aiExplanation: 'Your answer is on the right track but could be more complete. "I went to Paris" (past simple) refers to a specific completed action in the past, often with a time reference like "last year". "I have been to Paris" (present perfect) emphasizes life experience without specifying when, and the experience may still be relevant now. The connection to the present is the key difference.',
      },
    ],
  },
  {
    id: 'student-assignment-6',
    title: 'Mid-term Review',
    className: 'Grade 7 - A',
    unitTitle: 'Units 1-5 Review',
    completedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    score: 78,
    summaryFeedback: 'Good overall performance! You showed strength in reading comprehension and vocabulary. However, you struggled with past perfect tense - review when to use it versus simple past. Your essay writing has improved significantly. Focus on using more varied sentence structures and continue building your academic vocabulary.',
    questions: [
      {
        questionId: 'q1',
        prompt: 'What is the main idea of the passage about climate change?',
        studentAnswer: 'Climate change is causing problems for polar bears.',
        isCorrect: true,
        aiExplanation: 'Correct! You identified the main idea accurately. The passage focuses on how climate change affects polar bears\' habitat.',
      },
      {
        questionId: 'q2',
        prompt: 'Define "comprehensive" and use it in a sentence.',
        studentAnswer: 'Comprehensive means complete. The teacher gave us a comprehensive review.',
        isCorrect: true,
        aiExplanation: 'Excellent! Your definition is accurate and your example sentence uses "comprehensive" correctly in context.',
      },
      {
        questionId: 'q3',
        prompt: 'Complete: "By the time we arrived, they _____ (leave)."',
        studentAnswer: 'left',
        isCorrect: false,
        aiExplanation: 'Not quite. The correct answer is "had left" (past perfect). Use past perfect when one past action happened before another past action. "They left" happened before "we arrived", so we need past perfect: "By the time we arrived, they had left."',
      },
      {
        questionId: 'q4',
        prompt: 'Which word means "to make easier"?',
        studentAnswer: 'facilitate',
        isCorrect: true,
        aiExplanation: 'Perfect! "Facilitate" means to make something easier or help something progress more smoothly.',
      },
      {
        questionId: 'q5',
        prompt: 'Write a paragraph about your favorite hobby.',
        studentAnswer: 'My favorite hobby is reading. I like to read fantasy books. Harry Potter is my favorite series. Reading helps me relax.',
        isCorrect: true,
        aiExplanation: 'Good paragraph! You have a clear topic sentence and supporting details. To improve, try using more complex sentences and descriptive language. For example: "My favorite hobby is reading, especially fantasy novels that transport me to magical worlds."',
      },
      {
        questionId: 'q6',
        prompt: 'What is the past perfect form of "see"?',
        studentAnswer: 'saw',
        isCorrect: false,
        aiExplanation: 'Incorrect. "Saw" is past simple. The past perfect form is "had seen". Remember: past perfect = had + past participle.',
      },
      {
        questionId: 'q7',
        prompt: 'Identify the error: "She have finished her homework yesterday."',
        studentAnswer: 'Should be has finished',
        isCorrect: false,
        aiExplanation: 'Partially correct. You identified one error ("have" should be "has" for third person singular), but you missed the bigger issue: we can\'t use present perfect with "yesterday". The correct sentence is: "She finished her homework yesterday" (past simple).',
      },
      {
        questionId: 'q8',
        prompt: 'What does "analyze" mean?',
        studentAnswer: 'To break down and examine carefully',
        isCorrect: true,
        aiExplanation: 'Excellent definition! "Analyze" means to examine something in detail by breaking it into its parts to understand it better.',
      },
    ],
  },
  {
    id: 'history-item-3',
    title: 'Vocabulary Building Week 8',
    className: 'Grade 7 - A',
    unitTitle: 'Unit 2: Academic Vocabulary',
    completedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(), // 22 days ago
    score: 92,
    summaryFeedback: 'Outstanding work! You demonstrated excellent understanding of all vocabulary words and used them correctly in context. Your definitions were clear and your example sentences were sophisticated. Keep up this level of effort!',
    questions: [
      {
        questionId: 'q1',
        prompt: 'What does "meticulous" mean?',
        studentAnswer: 'Very careful and paying attention to details',
        isCorrect: true,
        aiExplanation: 'Perfect definition! "Meticulous" describes someone who is extremely careful about details and precision.',
      },
      {
        questionId: 'q2',
        prompt: 'Use "paradigm" in a sentence.',
        studentAnswer: 'The new teaching method represents a paradigm shift in education.',
        isCorrect: true,
        aiExplanation: 'Excellent! You used "paradigm" correctly in a sophisticated sentence. A paradigm is a model or pattern, and "paradigm shift" is a common expression.',
      },
      {
        questionId: 'q3',
        prompt: 'What is the opposite of "ambiguous"?',
        studentAnswer: 'clear',
        isCorrect: true,
        aiExplanation: 'Correct! "Clear" or "unambiguous" is the opposite. "Ambiguous" means unclear or having multiple possible meanings.',
      },
      {
        questionId: 'q4',
        prompt: 'Define "empirical".',
        studentAnswer: 'Based on observation and experience rather than theory',
        isCorrect: true,
        aiExplanation: 'Excellent definition! Empirical evidence comes from direct observation or experimentation, not just theoretical reasoning.',
      },
      {
        questionId: 'q5',
        prompt: 'Which word means "to combine elements"?',
        studentAnswer: 'synthesize',
        isCorrect: true,
        aiExplanation: 'Perfect! "Synthesize" means to combine separate elements into a coherent whole.',
      },
    ],
  },
  {
    id: 'history-item-4',
    title: 'Reading Comprehension Test',
    className: 'Grade 7 - A',
    unitTitle: 'Unit 4: Reading Skills',
    completedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(), // 35 days ago
    score: 88,
    summaryFeedback: 'Very good comprehension skills! You accurately identified main ideas and supporting details. Your inference skills are strong. Work on vocabulary in context - sometimes you focused too much on individual words rather than overall meaning. Practice identifying author\'s purpose and tone.',
    questions: [
      {
        questionId: 'q1',
        prompt: 'What is the main idea of the passage?',
        studentAnswer: 'The passage explains how technology has changed communication.',
        isCorrect: true,
        aiExplanation: 'Excellent! You correctly identified the central theme. The passage discusses the evolution of communication through technology.',
      },
      {
        questionId: 'q2',
        prompt: 'What can you infer about the author\'s opinion?',
        studentAnswer: 'The author thinks technology is mostly positive.',
        isCorrect: true,
        aiExplanation: 'Good inference! The author\'s language and examples show a generally positive view of technological progress.',
      },
      {
        questionId: 'q3',
        prompt: 'What does "obsolete" mean in paragraph 3?',
        studentAnswer: 'old',
        isCorrect: false,
        aiExplanation: 'Close, but not quite complete. "Obsolete" means more than just "old" - it means no longer in use or outdated because something better has replaced it. In the context, it refers to technologies that have become completely replaced by newer ones.',
      },
      {
        questionId: 'q4',
        prompt: 'According to the passage, what are two benefits of social media?',
        studentAnswer: 'Connecting with friends and sharing information quickly',
        isCorrect: true,
        aiExplanation: 'Perfect! You identified two key benefits mentioned in the passage. Both answers are directly supported by the text.',
      },
      {
        questionId: 'q5',
        prompt: 'What is the author\'s tone?',
        studentAnswer: 'informative',
        isCorrect: true,
        aiExplanation: 'Correct! The author uses an informative, educational tone to present facts and explain concepts clearly.',
      },
    ],
  },
  {
    id: 'history-item-5',
    title: 'Essay: My Future Goals',
    className: 'Grade 7 - A',
    unitTitle: 'Unit 6: Writing Skills',
    completedAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(), // 50 days ago
    score: 82,
    summaryFeedback: 'Good essay with clear ideas! Your introduction effectively states your thesis, and you provided relevant supporting details. However, work on paragraph transitions to make your writing flow more smoothly. Also, vary your sentence structure more - you used simple sentences too often. Your conclusion was strong and tied everything together well.',
    questions: [
      {
        questionId: 'q1',
        prompt: 'Does your essay have a clear thesis statement?',
        studentAnswer: 'Yes, in the introduction I stated my three main goals.',
        isCorrect: true,
        aiExplanation: 'Excellent! Your thesis statement in the introduction clearly outlined your three main goals, giving readers a roadmap for your essay.',
      },
      {
        questionId: 'q2',
        prompt: 'Did you provide specific examples for each goal?',
        studentAnswer: 'Yes, I gave examples for each one.',
        isCorrect: true,
        aiExplanation: 'Good! You supported each goal with specific examples, which made your essay more concrete and believable.',
      },
      {
        questionId: 'q3',
        prompt: 'Evaluate your paragraph transitions.',
        studentAnswer: 'I used some transition words like "first" and "next".',
        isCorrect: false,
        aiExplanation: 'You did use some transitions, but they were quite basic. To improve, try using more sophisticated transitions that show relationships between ideas (e.g., "Furthermore," "In addition," "As a result"). Also, try connecting the end of one paragraph to the beginning of the next.',
      },
      {
        questionId: 'q4',
        prompt: 'Did you use varied sentence structures?',
        studentAnswer: 'I tried to mix short and long sentences.',
        isCorrect: false,
        aiExplanation: 'You showed some awareness of sentence variety, but most of your sentences followed the same simple pattern (subject-verb-object). Try using compound and complex sentences to add sophistication to your writing.',
      },
    ],
  },
];

/**
 * Get all completed assignments for a student
 */
export const getStudentHistory = async (studentId: string): Promise<StudentHistoryItem[]> => {
  await delay(400);
  
  // Return history items without detailed questions
  return mockHistory.map(({ summaryFeedback, questions, ...item }) => item);
};

/**
 * Get detailed information about a specific completed assignment
 */
export const getStudentHistoryDetail = async (assignmentId: string): Promise<StudentHistoryDetail | null> => {
  await delay(500);
  
  const item = mockHistory.find((h) => h.id === assignmentId);
  return item ? { ...item } : null;
};

