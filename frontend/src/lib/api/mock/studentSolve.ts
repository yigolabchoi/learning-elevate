/**
 * Mock API - Student Problem Solving
 * 
 * Provides mock data for solving assignments.
 * 
 * Functions:
 * - getSolveQuestions(assignmentId)
 * - submitAssignmentAnswers(session)
 */

import { SolveQuestion, SolveSession } from '../../../types';

// Mock delay to simulate network latency
const delay = (ms: number = 400) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock questions for different assignments
const mockQuestionSets: Record<string, SolveQuestion[]> = {
  'student-assignment-1': [
    {
      id: 'q1',
      type: 'multipleChoice',
      prompt: 'Which sentence correctly uses the present perfect tense?',
      options: [
        'I have seen that movie yesterday.',
        'I have seen that movie three times.',
        'I have saw that movie before.',
        'I am seeing that movie now.',
      ],
    },
    {
      id: 'q2',
      type: 'multipleChoice',
      prompt: 'Complete the sentence: "She _____ to Paris twice."',
      options: [
        'has been',
        'have been',
        'was',
        'is',
      ],
    },
    {
      id: 'q3',
      type: 'shortAnswer',
      prompt: 'Fill in the blank with the correct form: "They _____ (finish) their homework already."',
    },
    {
      id: 'q4',
      type: 'multipleChoice',
      prompt: 'Which of these time expressions is commonly used with present perfect?',
      options: [
        'yesterday',
        'last week',
        'already',
        'tomorrow',
      ],
    },
    {
      id: 'q5',
      type: 'shortAnswer',
      prompt: 'Rewrite using present perfect: "I read this book." (Add "just")',
    },
    {
      id: 'q6',
      type: 'descriptive',
      prompt: 'Write 3 sentences about things you have done this week using the present perfect tense.',
    },
    {
      id: 'q7',
      type: 'multipleChoice',
      prompt: 'What is the past participle of "eat"?',
      options: [
        'ate',
        'eaten',
        'eated',
        'eating',
      ],
    },
    {
      id: 'q8',
      type: 'shortAnswer',
      prompt: 'Complete: "We _____ (not/see) him since Monday."',
    },
    {
      id: 'q9',
      type: 'multipleChoice',
      prompt: 'Which sentence is correct?',
      options: [
        'Have you ever been to Japan?',
        'Did you ever been to Japan?',
        'Have you ever be to Japan?',
        'Did you ever be to Japan?',
      ],
    },
    {
      id: 'q10',
      type: 'descriptive',
      prompt: 'Explain the difference between "I went to Paris" and "I have been to Paris" in 2-3 sentences.',
    },
  ],
  'student-assignment-2': [
    {
      id: 'q1',
      type: 'multipleChoice',
      prompt: 'Which word means "to examine carefully"?',
      options: [
        'scrutinize',
        'ignore',
        'forget',
        'dismiss',
      ],
    },
    {
      id: 'q2',
      type: 'multipleChoice',
      prompt: 'What is a synonym for "meticulous"?',
      options: [
        'careless',
        'detailed',
        'rough',
        'simple',
      ],
    },
    {
      id: 'q3',
      type: 'shortAnswer',
      prompt: 'Use "comprehensive" in a sentence.',
    },
    {
      id: 'q4',
      type: 'multipleChoice',
      prompt: 'What does "analyze" mean?',
      options: [
        'to break down and examine',
        'to build up',
        'to ignore',
        'to memorize',
      ],
    },
    {
      id: 'q5',
      type: 'shortAnswer',
      prompt: 'What is the opposite of "ambiguous"?',
    },
    {
      id: 'q6',
      type: 'multipleChoice',
      prompt: 'Which word means "to make easier"?',
      options: [
        'complicate',
        'facilitate',
        'confuse',
        'disturb',
      ],
    },
    {
      id: 'q7',
      type: 'shortAnswer',
      prompt: 'Define "empirical" in your own words.',
    },
    {
      id: 'q8',
      type: 'multipleChoice',
      prompt: 'What does "synthesize" mean?',
      options: [
        'to combine elements',
        'to separate',
        'to destroy',
        'to ignore',
      ],
    },
    {
      id: 'q9',
      type: 'shortAnswer',
      prompt: 'Use "paradigm" in a sentence.',
    },
    {
      id: 'q10',
      type: 'descriptive',
      prompt: 'Choose 3 vocabulary words from this week and write a short paragraph using all of them.',
    },
    {
      id: 'q11',
      type: 'multipleChoice',
      prompt: 'What is a synonym for "prevalent"?',
      options: [
        'rare',
        'common',
        'unusual',
        'unique',
      ],
    },
    {
      id: 'q12',
      type: 'shortAnswer',
      prompt: 'What does "substantiate" mean?',
    },
    {
      id: 'q13',
      type: 'multipleChoice',
      prompt: 'Which word means "temporary"?',
      options: [
        'permanent',
        'ephemeral',
        'eternal',
        'lasting',
      ],
    },
    {
      id: 'q14',
      type: 'shortAnswer',
      prompt: 'Use "rhetoric" in a sentence.',
    },
    {
      id: 'q15',
      type: 'multipleChoice',
      prompt: 'What does "pragmatic" mean?',
      options: [
        'idealistic',
        'practical',
        'theoretical',
        'imaginary',
      ],
    },
  ],
  'student-assignment-3': [
    {
      id: 'q1',
      type: 'multipleChoice',
      prompt: 'Which sentence uses the simple past correctly?',
      options: [
        'I was playing tennis when it started raining.',
        'I played tennis when it was starting to rain.',
        'I have played tennis when it rained.',
        'I play tennis when it rained.',
      ],
    },
    {
      id: 'q2',
      type: 'multipleChoice',
      prompt: 'What is the past tense of "bring"?',
      options: [
        'bringed',
        'brought',
        'brang',
        'brung',
      ],
    },
    {
      id: 'q3',
      type: 'shortAnswer',
      prompt: 'Complete: "While I _____ (study), my friend called me."',
    },
    {
      id: 'q4',
      type: 'multipleChoice',
      prompt: 'Which form is correct?',
      options: [
        'She had already left when I arrived.',
        'She already left when I had arrived.',
        'She has already left when I arrived.',
        'She leaves already when I arrived.',
      ],
    },
    {
      id: 'q5',
      type: 'shortAnswer',
      prompt: 'Rewrite in past continuous: "He watches TV." (at 8pm yesterday)',
    },
    {
      id: 'q6',
      type: 'descriptive',
      prompt: 'Write a short story (4-5 sentences) using both simple past and past continuous tenses.',
    },
    {
      id: 'q7',
      type: 'multipleChoice',
      prompt: 'What is the past perfect of "see"?',
      options: [
        'saw',
        'seen',
        'had seen',
        'have seen',
      ],
    },
    {
      id: 'q8',
      type: 'shortAnswer',
      prompt: 'Complete: "They _____ (not/finish) dinner when we arrived."',
    },
    {
      id: 'q9',
      type: 'multipleChoice',
      prompt: 'Which sentence is correct?',
      options: [
        'I used to live in Tokyo.',
        'I am used to live in Tokyo.',
        'I use to live in Tokyo.',
        'I using to live in Tokyo.',
      ],
    },
    {
      id: 'q10',
      type: 'shortAnswer',
      prompt: 'What is the difference between "I did it" and "I was doing it"?',
    },
    {
      id: 'q11',
      type: 'multipleChoice',
      prompt: 'Complete: "By the time we got to the station, the train _____."',
      options: [
        'has left',
        'left',
        'had left',
        'leaves',
      ],
    },
    {
      id: 'q12',
      type: 'descriptive',
      prompt: 'Describe what you were doing at this time yesterday using past continuous (3-4 sentences).',
    },
  ],
  'student-assignment-4': [
    {
      id: 'q1',
      type: 'multipleChoice',
      prompt: 'What is the main idea of the passage?',
      options: [
        'Climate change is affecting polar bears.',
        'Polar bears are good swimmers.',
        'The Arctic has ice.',
        'Bears are mammals.',
      ],
    },
    {
      id: 'q2',
      type: 'shortAnswer',
      prompt: 'According to the text, what are two reasons polar bears are losing their habitat?',
    },
    {
      id: 'q3',
      type: 'multipleChoice',
      prompt: 'The word "diminishing" in paragraph 2 most likely means:',
      options: [
        'growing',
        'decreasing',
        'staying the same',
        'improving',
      ],
    },
    {
      id: 'q4',
      type: 'shortAnswer',
      prompt: 'What does the author suggest we can do to help?',
    },
    {
      id: 'q5',
      type: 'descriptive',
      prompt: 'Summarize the passage in 3-4 sentences in your own words.',
    },
    {
      id: 'q6',
      type: 'multipleChoice',
      prompt: 'What is the author\'s tone in this passage?',
      options: [
        'Humorous',
        'Concerned',
        'Angry',
        'Indifferent',
      ],
    },
    {
      id: 'q7',
      type: 'shortAnswer',
      prompt: 'What evidence does the author provide to support their main claim?',
    },
    {
      id: 'q8',
      type: 'descriptive',
      prompt: 'Do you agree with the author\'s perspective? Why or why not? (3-4 sentences)',
    },
  ],
};

/**
 * Get questions for solving an assignment
 */
export const getSolveQuestions = async (assignmentId: string): Promise<SolveQuestion[]> => {
  await delay(500);
  
  const questions = mockQuestionSets[assignmentId];
  
  if (!questions) {
    // Return default questions if assignment not found
    return [
      {
        id: 'q1',
        type: 'multipleChoice',
        prompt: 'This is a sample question. What is 2 + 2?',
        options: ['2', '3', '4', '5'],
      },
      {
        id: 'q2',
        type: 'shortAnswer',
        prompt: 'Write your answer here.',
      },
      {
        id: 'q3',
        type: 'descriptive',
        prompt: 'Describe your thoughts in detail.',
      },
    ];
  }
  
  // Return a copy without studentAnswer to simulate fresh start
  return questions.map(({ studentAnswer, ...q }) => q);
};

/**
 * Submit assignment answers
 */
export const submitAssignmentAnswers = async (session: SolveSession): Promise<void> => {
  await delay(800);
  
  // Simulate submission
  console.log('Submitting answers:', session);
  
  // In a real app, this would send data to backend
  // and update the assignment status, calculate score, etc.
  
  return Promise.resolve();
};

