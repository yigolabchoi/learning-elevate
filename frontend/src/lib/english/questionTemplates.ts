/**
 * English Question Templates
 * 
 * 실제 영어 교육 문제 템플릿 (난이도별)
 */

export type QuestionDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type QuestionType = 'grammar' | 'vocabulary' | 'reading' | 'writing';

export interface EnglishQuestion {
  id: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  title: string;
  question: string;
  options?: string[];
  correctAnswer?: string;
  rubric?: string;
  conceptTags: string[];
  estimatedTime: number; // minutes
}

// Beginner Level Questions
const beginnerQuestions: EnglishQuestion[] = [
  {
    id: 'beginner-grammar-1',
    type: 'grammar',
    difficulty: 'beginner',
    title: 'Present Simple Tense',
    question: 'Fill in the blank with the correct form of the verb:\n\nShe _____ (go) to school every day.',
    correctAnswer: 'goes',
    rubric: 'Check if the student uses the correct third-person singular form "goes"',
    conceptTags: ['Present Simple', 'Third Person Singular'],
    estimatedTime: 2,
  },
  {
    id: 'beginner-vocabulary-1',
    type: 'vocabulary',
    difficulty: 'beginner',
    title: 'Daily Activities',
    question: 'Choose the correct word:\n\nI _____ my teeth every morning.\n\nA) wash\nB) brush\nC) clean\nD) make',
    options: ['wash', 'brush', 'clean', 'make'],
    correctAnswer: 'brush',
    rubric: 'Correct answer is "brush". Common collocation: brush teeth',
    conceptTags: ['Daily Routines', 'Collocations'],
    estimatedTime: 1,
  },
  {
    id: 'beginner-reading-1',
    type: 'reading',
    difficulty: 'beginner',
    title: 'Simple Story Comprehension',
    question: 'Read the text and answer:\n\n"My name is Tom. I am 13 years old. I live in Seoul with my family. I have one sister and one brother."\n\nWhere does Tom live?',
    correctAnswer: 'Seoul',
    rubric: 'Check if the student correctly identifies "Seoul" from the text',
    conceptTags: ['Reading Comprehension', 'Basic Information'],
    estimatedTime: 3,
  },
  {
    id: 'beginner-writing-1',
    type: 'writing',
    difficulty: 'beginner',
    title: 'Self Introduction',
    question: 'Write 3-5 sentences about yourself. Include your name, age, and favorite hobby.\n\nExample:\n- My name is...\n- I am ... years old.\n- My favorite hobby is...',
    rubric: 'Check for: 1) Complete sentences 2) Correct use of "I am" 3) Basic grammar 4) Clear information',
    conceptTags: ['Self Introduction', 'Present Simple', 'Basic Writing'],
    estimatedTime: 5,
  },
];

// Intermediate Level Questions
const intermediateQuestions: EnglishQuestion[] = [
  {
    id: 'intermediate-grammar-1',
    type: 'grammar',
    difficulty: 'intermediate',
    title: 'Present Perfect vs. Past Simple',
    question: 'Choose the correct tense:\n\n1. I _____ (visit) London last year.\n2. I _____ (visit) London three times.',
    correctAnswer: '1. visited, 2. have visited',
    rubric: 'Check: 1) Past Simple for specific past time 2) Present Perfect for experiences without specific time',
    conceptTags: ['Present Perfect', 'Past Simple', 'Time Expressions'],
    estimatedTime: 3,
  },
  {
    id: 'intermediate-vocabulary-1',
    type: 'vocabulary',
    difficulty: 'intermediate',
    title: 'Phrasal Verbs',
    question: 'Replace the underlined words with appropriate phrasal verbs:\n\n"I need to find the answer in the dictionary."\n\nOptions: look up, look for, look after, look into',
    options: ['look up', 'look for', 'look after', 'look into'],
    correctAnswer: 'look up',
    rubric: 'Correct answer: "look up" (search for information in a reference source)',
    conceptTags: ['Phrasal Verbs', 'Dictionary Skills'],
    estimatedTime: 2,
  },
  {
    id: 'intermediate-reading-1',
    type: 'reading',
    difficulty: 'intermediate',
    title: 'Article Analysis',
    question: 'Read the article and answer:\n\n"Climate change is one of the most pressing issues of our time. Scientists warn that global temperatures are rising due to greenhouse gas emissions. Many countries are now working together to reduce carbon footprints."\n\nWhat is the main cause of rising global temperatures according to the text?',
    correctAnswer: 'greenhouse gas emissions',
    rubric: 'Check if student identifies "greenhouse gas emissions" as the cause',
    conceptTags: ['Reading Comprehension', 'Main Ideas', 'Environmental Topics'],
    estimatedTime: 4,
  },
  {
    id: 'intermediate-writing-1',
    type: 'writing',
    difficulty: 'intermediate',
    title: 'Opinion Essay',
    question: 'Write a short paragraph (5-7 sentences) about:\n\n"Should students wear school uniforms?"\n\nInclude:\n- Your opinion\n- 2-3 reasons\n- A conclusion',
    rubric: 'Evaluate: 1) Clear opinion statement 2) Logical reasons with examples 3) Proper paragraph structure 4) Grammar and vocabulary variety',
    conceptTags: ['Opinion Writing', 'Paragraph Structure', 'Argumentation'],
    estimatedTime: 10,
  },
];

// Advanced Level Questions
const advancedQuestions: EnglishQuestion[] = [
  {
    id: 'advanced-grammar-1',
    type: 'grammar',
    difficulty: 'advanced',
    title: 'Conditional Sentences',
    question: 'Complete the sentences with the correct conditional form:\n\n1. If I _____ (know) about the party, I would have gone.\n2. If she studies hard, she _____ (pass) the exam.\n3. If I were you, I _____ (accept) the offer.',
    correctAnswer: '1. had known, 2. will pass, 3. would accept',
    rubric: 'Check: 1) Third conditional (past perfect + would have) 2) First conditional (present + will) 3) Second conditional (past simple + would)',
    conceptTags: ['Conditionals', 'Mixed Conditionals', 'Subjunctive'],
    estimatedTime: 5,
  },
  {
    id: 'advanced-vocabulary-1',
    type: 'vocabulary',
    difficulty: 'advanced',
    title: 'Academic Vocabulary',
    question: 'Choose the word that best fits the academic context:\n\n"The research findings _____ that there is a strong correlation between diet and health."\n\nA) show\nB) indicate\nC) tell\nD) say',
    options: ['show', 'indicate', 'tell', 'say'],
    correctAnswer: 'indicate',
    rubric: 'Correct answer: "indicate" (most formal and appropriate for academic writing)',
    conceptTags: ['Academic Vocabulary', 'Register', 'Formal Writing'],
    estimatedTime: 2,
  },
  {
    id: 'advanced-reading-1',
    type: 'reading',
    difficulty: 'advanced',
    title: 'Critical Reading',
    question: 'Read the passage and analyze:\n\n"While technology has undoubtedly improved our lives in many ways, critics argue that our over-reliance on digital devices is eroding face-to-face communication skills and creating a generation that struggles with genuine human connection."\n\nWhat is the author\'s stance? Provide evidence from the text.',
    rubric: 'Evaluate: 1) Identification of balanced view 2) Recognition of "while" clause showing both sides 3) Understanding of implicit criticism 4) Evidence-based answer',
    conceptTags: ['Critical Reading', 'Author\'s Perspective', 'Inference'],
    estimatedTime: 6,
  },
  {
    id: 'advanced-writing-1',
    type: 'writing',
    difficulty: 'advanced',
    title: 'Argumentative Essay',
    question: 'Write an argumentative essay (150-200 words) on:\n\n"The benefits and drawbacks of artificial intelligence in education"\n\nInclude:\n- Introduction with thesis statement\n- Two body paragraphs (benefits and drawbacks)\n- Conclusion with your position\n- Use transition words and academic vocabulary',
    rubric: 'Evaluate: 1) Clear thesis 2) Well-developed paragraphs with examples 3) Effective transitions 4) Academic register 5) Balanced analysis 6) Strong conclusion',
    conceptTags: ['Argumentative Writing', 'Essay Structure', 'Academic Writing', 'Critical Thinking'],
    estimatedTime: 15,
  },
];

// All questions organized by difficulty
export const questionBank = {
  beginner: beginnerQuestions,
  intermediate: intermediateQuestions,
  advanced: advancedQuestions,
};

// Get questions by difficulty
export const getQuestionsByDifficulty = (difficulty: QuestionDifficulty): EnglishQuestion[] => {
  return questionBank[difficulty];
};

// Get random questions for a problem set
export const generateProblemSet = (
  difficulty: QuestionDifficulty,
  count: number = 5
): EnglishQuestion[] => {
  const questions = questionBank[difficulty];
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, questions.length));
};

// Get question by ID
export const getQuestionById = (id: string): EnglishQuestion | undefined => {
  const allQuestions = [...beginnerQuestions, ...intermediateQuestions, ...advancedQuestions];
  return allQuestions.find(q => q.id === id);
};

