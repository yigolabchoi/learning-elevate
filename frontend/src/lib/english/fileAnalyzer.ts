/**
 * File Analyzer - PDF/Image to Question Generator
 * 
 * 선생님이 업로드한 PDF 또는 이미지에서 문제를 분석하고 
 * 유사한 문제를 생성하는 AI 시뮬레이션
 */

import { EnglishQuestion, QuestionDifficulty, QuestionType } from './questionTemplates';

export interface AnalyzedQuestion {
  originalText: string;
  questionType: QuestionType;
  difficulty: QuestionDifficulty;
  conceptTags: string[];
  extractedPattern: string;
}

export interface FileAnalysisResult {
  fileName: string;
  fileType: 'pdf' | 'image';
  analyzedQuestions: AnalyzedQuestion[];
  suggestedDifficulty: QuestionDifficulty;
  detectedConcepts: string[];
  processingTime: number;
}

// PDF/이미지에서 텍스트 추출 시뮬레이션
const simulateTextExtraction = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 실제로는 OCR이나 PDF 파싱을 수행
      // 여기서는 다양한 예시 텍스트를 반환
      const sampleTexts = [
        `Question 1: Fill in the blank with the correct verb form:
She _____ (go) to school every day.

Question 2: Choose the correct answer:
I have _____ to London twice.
a) been
b) gone
c) went
d) go

Question 3: Read the passage and answer:
"Climate change is affecting our planet. Scientists warn that we must act now."
What do scientists say about climate change?`,

        `Grammar Exercise:
1. Complete with Present Perfect or Past Simple:
   I _____ (visit) Paris last year.
   I _____ (visit) Paris three times.

2. Rewrite using passive voice:
   They built this house in 1990.

3. Correct the mistakes:
   She don't like coffee.
   He has went to the store.`,

        `Reading Comprehension:
Technology has transformed how we communicate. Social media platforms allow us to connect with people worldwide instantly. However, experts worry about the impact on face-to-face communication.

Questions:
1. What has technology changed?
2. What do experts worry about?
3. Give your opinion on social media. (Write 3-5 sentences)`,
      ];

      const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
      resolve(randomText);
    }, 1500); // 분석 시간 시뮬레이션
  });
};

// 문제 유형 감지
const detectQuestionType = (text: string): QuestionType => {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('fill in') || lowerText.includes('complete') || lowerText.includes('correct form')) {
    return 'grammar';
  } else if (lowerText.includes('choose') || lowerText.includes('select') || lowerText.includes('vocabulary')) {
    return 'vocabulary';
  } else if (lowerText.includes('read') || lowerText.includes('passage') || lowerText.includes('comprehension')) {
    return 'reading';
  } else if (lowerText.includes('write') || lowerText.includes('essay') || lowerText.includes('opinion')) {
    return 'writing';
  }
  
  return 'grammar'; // 기본값
};

// 난이도 감지
const detectDifficulty = (text: string): QuestionDifficulty => {
  const lowerText = text.toLowerCase();
  
  // Advanced 키워드
  if (
    lowerText.includes('conditional') ||
    lowerText.includes('subjunctive') ||
    lowerText.includes('argumentative') ||
    lowerText.includes('critical') ||
    lowerText.includes('analysis')
  ) {
    return 'advanced';
  }
  
  // Intermediate 키워드
  if (
    lowerText.includes('present perfect') ||
    lowerText.includes('past perfect') ||
    lowerText.includes('phrasal verb') ||
    lowerText.includes('passive voice') ||
    lowerText.includes('opinion')
  ) {
    return 'intermediate';
  }
  
  // Beginner가 기본값
  return 'beginner';
};

// 개념 태그 추출
const extractConcepts = (text: string): string[] => {
  const concepts: string[] = [];
  const lowerText = text.toLowerCase();
  
  const conceptMap: Record<string, string[]> = {
    'present simple': ['present simple', 'simple present'],
    'present perfect': ['present perfect', 'have/has + past participle'],
    'past simple': ['past simple', 'simple past'],
    'conditional': ['conditional', 'if clause'],
    'passive voice': ['passive', 'passive voice'],
    'phrasal verb': ['phrasal verb'],
    'vocabulary': ['vocabulary', 'word choice'],
    'reading comprehension': ['reading', 'comprehension'],
    'writing': ['writing', 'essay'],
    'grammar': ['grammar', 'verb form'],
  };
  
  for (const [concept, keywords] of Object.entries(conceptMap)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      concepts.push(concept);
    }
  }
  
  return concepts.length > 0 ? concepts : ['General English'];
};

// 텍스트에서 문제 분석
const analyzeExtractedText = (text: string): AnalyzedQuestion[] => {
  // 문제를 "Question"이나 숫자로 구분
  const questionParts = text.split(/(?:Question\s+\d+:|^\d+\.)/i).filter(p => p.trim());
  
  const analyzed: AnalyzedQuestion[] = [];
  
  questionParts.forEach((part, index) => {
    if (part.trim().length < 10) return; // 너무 짧은 텍스트 제외
    
    const questionType = detectQuestionType(part);
    const difficulty = detectDifficulty(part);
    const conceptTags = extractConcepts(part);
    
    analyzed.push({
      originalText: part.trim().substring(0, 200) + (part.length > 200 ? '...' : ''),
      questionType,
      difficulty,
      conceptTags,
      extractedPattern: `${questionType} question focusing on ${conceptTags.join(', ')}`,
    });
  });
  
  return analyzed.length > 0 ? analyzed : [{
    originalText: text.substring(0, 200),
    questionType: 'grammar',
    difficulty: 'intermediate',
    conceptTags: ['General English'],
    extractedPattern: 'General English question',
  }];
};

// 메인 파일 분석 함수
export const analyzeFile = async (file: File): Promise<FileAnalysisResult> => {
  const startTime = Date.now();
  
  // 파일 타입 확인
  const fileType = file.type.includes('pdf') ? 'pdf' : 'image';
  
  // 텍스트 추출 시뮬레이션
  const extractedText = await simulateTextExtraction(file);
  
  // 문제 분석
  const analyzedQuestions = analyzeExtractedText(extractedText);
  
  // 전체 난이도 결정 (가장 많이 나온 난이도)
  const difficultyCounts = analyzedQuestions.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<QuestionDifficulty, number>);
  
  const suggestedDifficulty = (Object.keys(difficultyCounts) as QuestionDifficulty[])
    .sort((a, b) => difficultyCounts[b] - difficultyCounts[a])[0] || 'intermediate';
  
  // 모든 개념 태그 수집
  const allConcepts = Array.from(
    new Set(analyzedQuestions.flatMap(q => q.conceptTags))
  );
  
  const processingTime = Date.now() - startTime;
  
  return {
    fileName: file.name,
    fileType,
    analyzedQuestions,
    suggestedDifficulty,
    detectedConcepts: allConcepts,
    processingTime,
  };
};

// 분석된 문제를 기반으로 유사한 문제 생성
export const generateSimilarQuestions = (
  analyzedQuestions: AnalyzedQuestion[],
  count: number = 5
): EnglishQuestion[] => {
  const generated: EnglishQuestion[] = [];
  
  analyzedQuestions.forEach((analyzed, index) => {
    const baseId = `generated-${Date.now()}-${index}`;
    
    // 문제 유형별로 유사한 문제 생성
    switch (analyzed.questionType) {
      case 'grammar':
        generated.push({
          id: `${baseId}-grammar`,
          type: 'grammar',
          difficulty: analyzed.difficulty,
          title: `Grammar Practice: ${analyzed.conceptTags[0]}`,
          question: generateGrammarQuestion(analyzed.conceptTags[0], analyzed.difficulty),
          rubric: `Check for correct grammar usage related to ${analyzed.conceptTags[0]}`,
          conceptTags: analyzed.conceptTags,
          estimatedTime: analyzed.difficulty === 'beginner' ? 2 : analyzed.difficulty === 'intermediate' ? 3 : 5,
        });
        break;
        
      case 'vocabulary':
        generated.push({
          id: `${baseId}-vocab`,
          type: 'vocabulary',
          difficulty: analyzed.difficulty,
          title: `Vocabulary: ${analyzed.conceptTags[0]}`,
          question: generateVocabularyQuestion(analyzed.difficulty),
          options: ['option1', 'option2', 'option3', 'option4'],
          correctAnswer: 'option2',
          rubric: 'Check vocabulary usage in context',
          conceptTags: analyzed.conceptTags,
          estimatedTime: 2,
        });
        break;
        
      case 'reading':
        generated.push({
          id: `${baseId}-reading`,
          type: 'reading',
          difficulty: analyzed.difficulty,
          title: `Reading Comprehension: ${analyzed.conceptTags[0]}`,
          question: generateReadingQuestion(analyzed.difficulty),
          rubric: 'Check understanding of main ideas and details',
          conceptTags: analyzed.conceptTags,
          estimatedTime: analyzed.difficulty === 'beginner' ? 3 : analyzed.difficulty === 'intermediate' ? 5 : 8,
        });
        break;
        
      case 'writing':
        generated.push({
          id: `${baseId}-writing`,
          type: 'writing',
          difficulty: analyzed.difficulty,
          title: `Writing Task: ${analyzed.conceptTags[0]}`,
          question: generateWritingQuestion(analyzed.difficulty),
          rubric: 'Evaluate grammar, vocabulary, structure, and content',
          conceptTags: analyzed.conceptTags,
          estimatedTime: analyzed.difficulty === 'beginner' ? 5 : analyzed.difficulty === 'intermediate' ? 10 : 15,
        });
        break;
    }
  });
  
  return generated.slice(0, count);
};

// 문제 생성 헬퍼 함수들
const generateGrammarQuestion = (concept: string, difficulty: QuestionDifficulty): string => {
  const templates = {
    beginner: [
      `Fill in the blank with the correct verb form:\nShe _____ (study) English every day.`,
      `Choose the correct word:\nI _____ a student. (am/is/are)`,
    ],
    intermediate: [
      `Complete with the correct tense:\nI _____ (live) in Seoul since 2020.`,
      `Rewrite using the passive voice:\nThey teach English at this school.`,
    ],
    advanced: [
      `Complete the conditional sentence:\nIf I _____ (know) about the meeting, I would have attended.`,
      `Transform the sentence using inversion:\nI have never seen such a beautiful place.`,
    ],
  };
  
  const options = templates[difficulty];
  return options[Math.floor(Math.random() * options.length)];
};

const generateVocabularyQuestion = (difficulty: QuestionDifficulty): string => {
  const templates = {
    beginner: `Choose the correct word:\nI like to _____ books in my free time.\nA) read\nB) see\nC) watch\nD) look`,
    intermediate: `Select the appropriate phrasal verb:\nCan you _____ this word in the dictionary?\nA) look up\nB) look for\nC) look after\nD) look into`,
    advanced: `Choose the most formal word:\nThe research findings _____ a strong correlation.\nA) show\nB) indicate\nC) tell\nD) prove`,
  };
  
  return templates[difficulty];
};

const generateReadingQuestion = (difficulty: QuestionDifficulty): string => {
  const templates = {
    beginner: `Read and answer:\n"My family has four people. My father is a teacher. My mother is a nurse. I have one sister."\n\nHow many people are in the family?`,
    intermediate: `Read the passage:\n"Recycling is important for our environment. It reduces waste and saves natural resources. Everyone should participate in recycling programs."\n\nWhy is recycling important? (Write 2-3 sentences)`,
    advanced: `Analyze the argument:\n"While technology offers convenience, critics argue it diminishes authentic human interaction and critical thinking skills."\n\nWhat is the author's stance? Support your answer with evidence.`,
  };
  
  return templates[difficulty];
};

const generateWritingQuestion = (difficulty: QuestionDifficulty): string => {
  const templates = {
    beginner: `Write about your daily routine. (4-6 sentences)\n\nInclude:\n- What time you wake up\n- What you do in the morning\n- What you do in the evening`,
    intermediate: `Write your opinion on this topic: (7-10 sentences)\n\n"Should students be allowed to use smartphones in class?"\n\nInclude:\n- Your opinion\n- 2-3 reasons\n- Examples\n- Conclusion`,
    advanced: `Write an argumentative essay (150-200 words):\n\n"The role of artificial intelligence in education"\n\nInclude:\n- Introduction with thesis\n- Arguments for and against\n- Your position with supporting evidence\n- Conclusion`,
  };
  
  return templates[difficulty];
};

