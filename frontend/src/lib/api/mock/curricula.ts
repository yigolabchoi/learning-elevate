/**
 * Mock API - Curriculum Management
 * 
 * Provides mock data and async functions for curriculum management.
 * Teachers can create, read, update curricula with units.
 * 
 * Functions:
 * - getCurriculaByTeacher(teacherId)
 * - getCurriculum(id)
 * - createCurriculum(payload)
 * - updateCurriculum(id, payload)
 * - deleteCurriculum(id)
 */

import { Curriculum, CurriculumFormData } from '../../../types';

// Mock delay to simulate network latency
const delay = (ms: number = 400) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Curricula Data
let mockCurricula: Curriculum[] = [
  {
    id: 'curriculum-1',
    name: '2025 중학교 1학년 영어',
    subject: 'English',
    level: 'Grade 7',
    description: 'Middle school first year English curriculum covering basic grammar and vocabulary',
    teacherId: 'teacher-1',
    units: [
      {
        id: 'unit-1-1',
        title: 'Unit 1: Present Tenses',
        learningObjective: 'Students will be able to use present simple and present continuous tenses correctly in various contexts.',
        conceptTags: ['Present Simple', 'Present Continuous', 'Tense', 'Grammar'],
        exampleSentences: [
          'I go to school every day.',
          'She is reading a book right now.',
          'They play soccer on weekends.',
        ],
        exampleQuestions: [
          'What do you do every morning?',
          'What are you doing right now?',
          'Does she like pizza?',
        ],
      },
      {
        id: 'unit-1-2',
        title: 'Unit 2: Past Tenses',
        learningObjective: 'Students will understand and apply past simple and past continuous tenses in storytelling and descriptions.',
        conceptTags: ['Past Simple', 'Past Continuous', 'Tense', 'Grammar'],
        exampleSentences: [
          'I visited my grandparents last week.',
          'She was studying when I called.',
          'They went to the park yesterday.',
        ],
        exampleQuestions: [
          'What did you do last weekend?',
          'Where were you yesterday at 3 PM?',
          'Did you watch TV last night?',
        ],
      },
      {
        id: 'unit-1-3',
        title: 'Unit 3: Prepositions of Time and Place',
        learningObjective: 'Students will correctly use prepositions to describe time and location.',
        conceptTags: ['Prepositions', 'Time', 'Place', 'Grammar'],
        exampleSentences: [
          'The book is on the table.',
          'I have a meeting at 3 PM.',
          'She lives in Seoul.',
        ],
        exampleQuestions: [
          'Where is your school?',
          'What time do you wake up?',
          'When is your birthday?',
        ],
      },
    ],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-02-10T14:30:00Z',
  },
  {
    id: 'curriculum-2',
    name: 'Grade 9 Advanced English',
    subject: 'English',
    level: 'Grade 9',
    description: 'Advanced English curriculum for high-achieving 9th graders',
    teacherId: 'teacher-1',
    units: [
      {
        id: 'unit-2-1',
        title: 'Unit 1: Complex Sentences',
        learningObjective: 'Students will construct and analyze complex sentences using subordinating conjunctions.',
        conceptTags: ['Complex Sentences', 'Conjunctions', 'Grammar', 'Writing'],
        exampleSentences: [
          'Although it was raining, we went to the park.',
          'I will call you when I arrive.',
          'She studied hard because she wanted to pass the exam.',
        ],
        exampleQuestions: [
          'Why do we use complex sentences?',
          'What is a subordinating conjunction?',
          'How can you combine these two sentences?',
        ],
      },
      {
        id: 'unit-2-2',
        title: 'Unit 2: Academic Vocabulary',
        learningObjective: 'Students will recognize and use academic vocabulary in reading and writing.',
        conceptTags: ['Vocabulary', 'Academic English', 'Reading', 'Writing'],
        exampleSentences: [
          'The research indicates a significant correlation.',
          'This phenomenon requires further investigation.',
          'The data demonstrates a clear pattern.',
        ],
        exampleQuestions: [
          'What does "analyze" mean?',
          'How is "hypothesis" used in science?',
          'What is the difference between "infer" and "imply"?',
        ],
      },
    ],
    createdAt: '2025-02-01T09:00:00Z',
    updatedAt: '2025-02-15T11:20:00Z',
  },
  {
    id: 'curriculum-3',
    name: 'ESL Beginner Course',
    subject: 'English',
    level: 'Beginner',
    description: 'English as Second Language course for absolute beginners',
    teacherId: 'teacher-2',
    units: [
      {
        id: 'unit-3-1',
        title: 'Unit 1: Greetings and Introductions',
        learningObjective: 'Students will be able to greet others and introduce themselves in English.',
        conceptTags: ['Greetings', 'Introductions', 'Speaking', 'Vocabulary'],
        exampleSentences: [
          'Hello, my name is John.',
          'Nice to meet you.',
          'How are you today?',
        ],
        exampleQuestions: [
          'What is your name?',
          'Where are you from?',
          'How old are you?',
        ],
      },
    ],
    createdAt: '2025-02-20T08:30:00Z',
    updatedAt: '2025-02-20T08:30:00Z',
  },
];

/**
 * Get all curricula for a specific teacher
 */
export const getCurriculaByTeacher = async (teacherId: string): Promise<Curriculum[]> => {
  await delay(300);
  return mockCurricula.filter((c) => c.teacherId === teacherId);
};

/**
 * Get a single curriculum by ID
 */
export const getCurriculum = async (id: string): Promise<Curriculum | null> => {
  await delay(300);
  const curriculum = mockCurricula.find((c) => c.id === id);
  return curriculum ? { ...curriculum } : null;
};

/**
 * Create a new curriculum
 */
export const createCurriculum = async (
  payload: CurriculumFormData,
  teacherId: string
): Promise<Curriculum> => {
  await delay(500);

  const newCurriculum: Curriculum = {
    id: `curriculum-${Date.now()}`,
    ...payload,
    teacherId,
    units: payload.units.map((unit, index) => ({
      ...unit,
      id: unit.id || `unit-${Date.now()}-${index}`,
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockCurricula.push(newCurriculum);
  return { ...newCurriculum };
};

/**
 * Update an existing curriculum
 */
export const updateCurriculum = async (
  id: string,
  payload: CurriculumFormData
): Promise<Curriculum | null> => {
  await delay(500);

  const index = mockCurricula.findIndex((c) => c.id === id);
  if (index === -1) {
    return null;
  }

  mockCurricula[index] = {
    ...mockCurricula[index],
    ...payload,
    units: payload.units.map((unit, idx) => ({
      ...unit,
      id: unit.id || `unit-${Date.now()}-${idx}`,
    })),
    updatedAt: new Date().toISOString(),
  };

  return { ...mockCurricula[index] };
};

/**
 * Delete a curriculum
 */
export const deleteCurriculum = async (id: string): Promise<boolean> => {
  await delay(400);

  const index = mockCurricula.findIndex((c) => c.id === id);
  if (index === -1) {
    return false;
  }

  mockCurricula.splice(index, 1);
  return true;
};

