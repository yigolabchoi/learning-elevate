/**
 * Mock API - Problem Set Management
 * 
 * Provides mock data and async functions for problem set management.
 * Includes AI generation simulation.
 * 
 * Functions:
 * - getProblemSetsByTeacher(teacherId)
 * - getProblemSet(id)
 * - createProblemSet(payload, teacherId)
 * - updateProblemSet(id, payload)
 * - deleteProblemSet(id)
 * - generateProblemSet(config) - AI simulation
 */

import { ProblemSet, Question, ProblemSetGenerationConfig, DifficultyLevel, QuestionType } from '../../../types';

// Mock delay to simulate network latency
const delay = (ms: number = 400) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Problem Sets Data
let mockProblemSets: ProblemSet[] = [
  {
    id: 'problemset-1',
    name: 'Present Perfect Practice Set',
    curriculumId: 'curriculum-1',
    curriculumName: '2025 중학교 1학년 영어',
    unitId: 'unit-1-1',
    unitTitle: 'Unit 1: Present Tenses',
    difficulty: 'beginner',
    questionCount: 10,
    questionTypeRatio: {
      multipleChoice: 70,
      shortAnswer: 20,
      descriptive: 10,
    },
    questions: [
      {
        id: 'q-1-1',
        type: 'multipleChoice',
        prompt: 'Which sentence correctly uses the present perfect tense?',
        options: [
          'I have visited Paris last year.',
          'I have visited Paris three times.',
          'I visit Paris three times.',
          'I visited Paris three times.',
        ],
        correctAnswer: 'I have visited Paris three times.',
        conceptTags: ['Present Perfect', 'Tense'],
      },
      {
        id: 'q-1-2',
        type: 'shortAnswer',
        prompt: 'Complete the sentence: "She ___ (study) English for five years."',
        correctAnswer: 'has studied',
        conceptTags: ['Present Perfect', 'Grammar'],
      },
      {
        id: 'q-1-3',
        type: 'descriptive',
        prompt: 'Describe three activities you have done this week using the present perfect tense.',
        conceptTags: ['Present Perfect', 'Writing'],
      },
    ],
    teacherId: 'teacher-1',
    createdAt: '2025-02-15T10:00:00Z',
  },
  {
    id: 'problemset-2',
    name: 'Advanced Grammar Challenge',
    curriculumId: 'curriculum-2',
    curriculumName: 'Grade 9 Advanced English',
    unitId: 'unit-2-1',
    unitTitle: 'Unit 1: Complex Sentences',
    difficulty: 'advanced',
    questionCount: 15,
    questionTypeRatio: {
      multipleChoice: 40,
      shortAnswer: 40,
      descriptive: 20,
    },
    questions: [],
    teacherId: 'teacher-1',
    createdAt: '2025-02-20T14:30:00Z',
  },
];

/**
 * AI Generation Templates
 * Simulates AI-generated questions based on unit content
 */
const questionTemplates = {
  multipleChoice: [
    {
      prompt: 'Which of the following is the correct use of {concept}?',
      options: [
        'Option A with {concept}',
        'Option B with {concept}',
        'Option C with {concept}',
        'Option D with {concept}',
      ],
    },
    {
      prompt: 'Identify the sentence that demonstrates proper {concept} usage.',
      options: [
        'Sentence 1',
        'Sentence 2',
        'Sentence 3',
        'Sentence 4',
      ],
    },
  ],
  shortAnswer: [
    'Complete the sentence using the correct form of {concept}: ___',
    'Fill in the blank with an appropriate {concept}: ___',
    'Transform this sentence to use {concept}: ___',
  ],
  descriptive: [
    'Write a paragraph explaining the use of {concept} with examples.',
    'Describe how {concept} is used in everyday communication.',
    'Create three original sentences demonstrating {concept}.',
  ],
};

/**
 * Generate problem set with AI simulation
 * This simulates an AI generating questions based on configuration
 */
export const generateProblemSet = async (
  config: ProblemSetGenerationConfig,
  curriculumName: string,
  unitTitle: string,
  unitConceptTags: string[]
): Promise<ProblemSet> => {
  // Simulate AI processing time
  await delay(2000); // 2 seconds to feel realistic

  const questions: Question[] = [];
  
  // Calculate question counts based on ratios
  const mcCount = Math.round((config.questionTypeRatio.multipleChoice / 100) * config.targetQuestionCount);
  const saCount = Math.round((config.questionTypeRatio.shortAnswer / 100) * config.targetQuestionCount);
  const dCount = Math.round((config.questionTypeRatio.descriptive / 100) * config.targetQuestionCount);

  // Generate multiple choice questions
  for (let i = 0; i < mcCount; i++) {
    const template = questionTemplates.multipleChoice[i % questionTemplates.multipleChoice.length];
    const concept = unitConceptTags[i % unitConceptTags.length] || 'grammar';
    
    questions.push({
      id: `q-${Date.now()}-${i}`,
      type: 'multipleChoice',
      prompt: template.prompt.replace('{concept}', concept),
      options: template.options.map(opt => opt.replace('{concept}', concept)),
      correctAnswer: template.options[0].replace('{concept}', concept),
      conceptTags: [concept],
    });
  }

  // Generate short answer questions
  for (let i = 0; i < saCount; i++) {
    const template = questionTemplates.shortAnswer[i % questionTemplates.shortAnswer.length];
    const concept = unitConceptTags[i % unitConceptTags.length] || 'grammar';
    
    questions.push({
      id: `q-${Date.now()}-${mcCount + i}`,
      type: 'shortAnswer',
      prompt: template.replace('{concept}', concept),
      correctAnswer: `[Sample answer for ${concept}]`,
      conceptTags: [concept],
    });
  }

  // Generate descriptive questions
  for (let i = 0; i < dCount; i++) {
    const template = questionTemplates.descriptive[i % questionTemplates.descriptive.length];
    const concept = unitConceptTags[i % unitConceptTags.length] || 'grammar';
    
    questions.push({
      id: `q-${Date.now()}-${mcCount + saCount + i}`,
      type: 'descriptive',
      prompt: template.replace('{concept}', concept),
      conceptTags: [concept],
    });
  }

  return {
    id: `problemset-temp-${Date.now()}`,
    name: config.name,
    curriculumId: config.curriculumId,
    curriculumName,
    unitId: config.unitId,
    unitTitle,
    difficulty: config.difficulty,
    questionCount: questions.length,
    questionTypeRatio: config.questionTypeRatio,
    questions,
    teacherId: '', // Will be set when saving
    createdAt: new Date().toISOString(),
  };
};

/**
 * Get all problem sets for a specific teacher
 */
export const getProblemSetsByTeacher = async (teacherId: string): Promise<ProblemSet[]> => {
  await delay(300);
  return mockProblemSets.filter((ps) => ps.teacherId === teacherId);
};

/**
 * Get a single problem set by ID
 */
export const getProblemSet = async (id: string): Promise<ProblemSet | null> => {
  await delay(300);
  const problemSet = mockProblemSets.find((ps) => ps.id === id);
  return problemSet ? { ...problemSet } : null;
};

/**
 * Create a new problem set
 */
export const createProblemSet = async (
  payload: ProblemSet,
  teacherId: string
): Promise<ProblemSet> => {
  await delay(500);

  const newProblemSet: ProblemSet = {
    ...payload,
    id: `problemset-${Date.now()}`,
    teacherId,
    createdAt: new Date().toISOString(),
    questionCount: payload.questions.length,
  };

  mockProblemSets.push(newProblemSet);
  return { ...newProblemSet };
};

/**
 * Update an existing problem set
 */
export const updateProblemSet = async (
  id: string,
  payload: Partial<ProblemSet>
): Promise<ProblemSet | null> => {
  await delay(500);

  const index = mockProblemSets.findIndex((ps) => ps.id === id);
  if (index === -1) {
    return null;
  }

  mockProblemSets[index] = {
    ...mockProblemSets[index],
    ...payload,
    questionCount: payload.questions ? payload.questions.length : mockProblemSets[index].questionCount,
    updatedAt: new Date().toISOString(),
  };

  return { ...mockProblemSets[index] };
};

/**
 * Delete a problem set
 */
export const deleteProblemSet = async (id: string): Promise<boolean> => {
  await delay(400);

  const index = mockProblemSets.findIndex((ps) => ps.id === id);
  if (index === -1) {
    return false;
  }

  mockProblemSets.splice(index, 1);
  return true;
};

