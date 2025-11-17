/**
 * AI Grading and Feedback System
 * 
 * 학생 답안을 자동으로 채점하고 피드백을 생성하는 시뮬레이션 시스템
 */

import { EnglishQuestion, QuestionType } from './questionTemplates';

export interface GradingResult {
  score: number; // 0-100
  isCorrect: boolean;
  feedback: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  detailedAnalysis: string;
}

// 문자열 유사도 계산 (Levenshtein Distance 기반)
const calculateSimilarity = (str1: string, str2: string): number => {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();
  
  if (s1 === s2) return 1.0;
  
  const len1 = s1.length;
  const len2 = s2.length;
  const maxLen = Math.max(len1, len2);
  
  if (maxLen === 0) return 1.0;
  
  // Simple character match ratio
  let matches = 0;
  for (let i = 0; i < Math.min(len1, len2); i++) {
    if (s1[i] === s2[i]) matches++;
  }
  
  return matches / maxLen;
};

// Grammar 문제 채점
const gradeGrammarQuestion = (
  question: EnglishQuestion,
  studentAnswer: string
): GradingResult => {
  const correctAnswer = question.correctAnswer || '';
  const similarity = calculateSimilarity(studentAnswer, correctAnswer);
  const isCorrect = similarity > 0.8;
  const score = Math.round(similarity * 100);

  let feedback = '';
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];

  if (isCorrect) {
    feedback = '정답입니다! 문법 규칙을 정확히 이해하고 계십니다.';
    strengths.push('Correct grammar structure');
    strengths.push('Proper verb form usage');
  } else if (similarity > 0.5) {
    feedback = '아쉽습니다. 거의 맞았지만 일부 수정이 필요합니다.';
    weaknesses.push('Minor grammar error');
    suggestions.push(`The correct answer is: "${correctAnswer}"`);
    suggestions.push('Review the grammar rule: ' + question.conceptTags.join(', '));
  } else {
    feedback = '다시 한번 확인해보세요. 문법 규칙을 복습하시면 도움이 될 것입니다.';
    weaknesses.push('Incorrect grammar structure');
    suggestions.push(`The correct answer is: "${correctAnswer}"`);
    suggestions.push('Study the concept: ' + question.conceptTags.join(', '));
    suggestions.push('Practice more exercises on this topic');
  }

  return {
    score,
    isCorrect,
    feedback,
    strengths,
    weaknesses,
    suggestions,
    detailedAnalysis: `Your answer "${studentAnswer}" was compared with the correct answer "${correctAnswer}". ${question.rubric || ''}`,
  };
};

// Vocabulary 문제 채점
const gradeVocabularyQuestion = (
  question: EnglishQuestion,
  studentAnswer: string
): GradingResult => {
  const correctAnswer = question.correctAnswer || '';
  const isCorrect = studentAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
  const score = isCorrect ? 100 : 0;

  let feedback = '';
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];

  if (isCorrect) {
    feedback = '완벽합니다! 어휘를 정확하게 이해하고 계십니다.';
    strengths.push('Correct vocabulary choice');
    strengths.push('Good understanding of context');
  } else {
    feedback = '틀렸습니다. 문맥에 맞는 어휘를 다시 선택해보세요.';
    weaknesses.push('Incorrect vocabulary selection');
    suggestions.push(`The correct answer is: "${correctAnswer}"`);
    suggestions.push('Learn the meaning and usage of: ' + correctAnswer);
    suggestions.push('Practice with similar vocabulary exercises');
  }

  return {
    score,
    isCorrect,
    feedback,
    strengths,
    weaknesses,
    suggestions,
    detailedAnalysis: question.rubric || 'Review the vocabulary and its context.',
  };
};

// Reading 문제 채점
const gradeReadingQuestion = (
  question: EnglishQuestion,
  studentAnswer: string
): GradingResult => {
  const correctAnswer = question.correctAnswer || '';
  const similarity = calculateSimilarity(studentAnswer, correctAnswer);
  
  // Reading은 키워드 매칭도 중요
  const keywords = correctAnswer.toLowerCase().split(' ');
  const studentWords = studentAnswer.toLowerCase().split(' ');
  const keywordMatches = keywords.filter(kw => studentWords.some(sw => sw.includes(kw)));
  const keywordScore = keywordMatches.length / keywords.length;
  
  const finalScore = Math.max(similarity, keywordScore);
  const isCorrect = finalScore > 0.7;
  const score = Math.round(finalScore * 100);

  let feedback = '';
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];

  if (isCorrect) {
    feedback = '훌륭합니다! 지문의 핵심 내용을 잘 파악하셨습니다.';
    strengths.push('Good reading comprehension');
    strengths.push('Identified key information');
  } else if (finalScore > 0.4) {
    feedback = '부분적으로 맞습니다. 지문을 더 꼼꼼히 읽어보세요.';
    weaknesses.push('Missed some key details');
    suggestions.push('Read the passage more carefully');
    suggestions.push('Focus on: ' + correctAnswer);
  } else {
    feedback = '지문을 다시 읽고 질문이 무엇을 묻는지 확인해보세요.';
    weaknesses.push('Reading comprehension needs improvement');
    suggestions.push(`Look for this information: "${correctAnswer}"`);
    suggestions.push('Practice identifying main ideas and details');
  }

  return {
    score,
    isCorrect,
    feedback,
    strengths,
    weaknesses,
    suggestions,
    detailedAnalysis: `Expected answer: "${correctAnswer}". ${question.rubric || ''}`,
  };
};

// Writing 문제 채점 (가장 복잡한 평가)
const gradeWritingQuestion = (
  question: EnglishQuestion,
  studentAnswer: string
): GradingResult => {
  const answer = studentAnswer.trim();
  const wordCount = answer.split(/\s+/).length;
  const sentenceCount = answer.split(/[.!?]+/).filter(s => s.trim()).length;
  
  let score = 0;
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];
  
  // 1. Length check (10 points)
  if (wordCount >= 30) {
    score += 10;
    strengths.push('Adequate length');
  } else {
    weaknesses.push('Response too short');
    suggestions.push('Write more to fully develop your ideas');
  }
  
  // 2. Structure check (20 points)
  if (sentenceCount >= 3) {
    score += 20;
    strengths.push('Multiple sentences used');
  } else {
    weaknesses.push('Limited sentence variety');
    suggestions.push('Use more sentences to organize your thoughts');
  }
  
  // 3. Grammar check (30 points) - 시뮬레이션
  const hasCapitalization = /[A-Z]/.test(answer);
  const hasPunctuation = /[.!?]/.test(answer);
  const hasProperSpacing = !/\s{2,}/.test(answer);
  
  let grammarScore = 0;
  if (hasCapitalization) grammarScore += 10;
  if (hasPunctuation) grammarScore += 10;
  if (hasProperSpacing) grammarScore += 10;
  
  score += grammarScore;
  
  if (grammarScore >= 20) {
    strengths.push('Good basic grammar');
  } else {
    weaknesses.push('Grammar needs improvement');
    suggestions.push('Check capitalization and punctuation');
  }
  
  // 4. Vocabulary check (20 points) - 단어 다양성
  const uniqueWords = new Set(answer.toLowerCase().split(/\s+/));
  const vocabularyRatio = uniqueWords.size / wordCount;
  const vocabularyScore = Math.min(20, Math.round(vocabularyRatio * 40));
  score += vocabularyScore;
  
  if (vocabularyScore >= 15) {
    strengths.push('Good vocabulary variety');
  } else {
    weaknesses.push('Limited vocabulary');
    suggestions.push('Use more varied vocabulary');
  }
  
  // 5. Content relevance (20 points) - 키워드 체크
  const questionKeywords = ['name', 'age', 'hobby', 'favorite', 'introduce', 'myself'];
  const answerLower = answer.toLowerCase();
  const relevantKeywords = questionKeywords.filter(kw => 
    answerLower.includes(kw) || question.question.toLowerCase().includes(kw)
  );
  const contentScore = Math.min(20, (relevantKeywords.length / 3) * 20);
  score += contentScore;
  
  if (contentScore >= 15) {
    strengths.push('Relevant content');
  } else {
    weaknesses.push('Content could be more relevant');
    suggestions.push('Address all parts of the question');
  }
  
  const isCorrect = score >= 70;
  
  let feedback = '';
  if (score >= 90) {
    feedback = '탁월합니다! 매우 잘 작성된 답변입니다.';
  } else if (score >= 70) {
    feedback = '잘 했습니다! 몇 가지만 개선하면 더 좋은 답변이 될 것입니다.';
  } else if (score >= 50) {
    feedback = '괜찮습니다. 하지만 개선이 필요한 부분들이 있습니다.';
  } else {
    feedback = '더 많은 연습이 필요합니다. 첨삭 내용을 참고하여 다시 작성해보세요.';
  }

  return {
    score,
    isCorrect,
    feedback,
    strengths,
    weaknesses,
    suggestions,
    detailedAnalysis: `Word count: ${wordCount}, Sentences: ${sentenceCount}. ${question.rubric || ''}`,
  };
};

// 메인 채점 함수
export const gradeAnswer = (
  question: EnglishQuestion,
  studentAnswer: string
): GradingResult => {
  if (!studentAnswer || studentAnswer.trim() === '') {
    return {
      score: 0,
      isCorrect: false,
      feedback: '답변이 제출되지 않았습니다.',
      strengths: [],
      weaknesses: ['No answer provided'],
      suggestions: ['Please provide an answer'],
      detailedAnalysis: 'Student did not submit an answer.',
    };
  }

  switch (question.type) {
    case 'grammar':
      return gradeGrammarQuestion(question, studentAnswer);
    case 'vocabulary':
      return gradeVocabularyQuestion(question, studentAnswer);
    case 'reading':
      return gradeReadingQuestion(question, studentAnswer);
    case 'writing':
      return gradeWritingQuestion(question, studentAnswer);
    default:
      return {
        score: 0,
        isCorrect: false,
        feedback: 'Unknown question type',
        strengths: [],
        weaknesses: [],
        suggestions: [],
        detailedAnalysis: '',
      };
  }
};

// 여러 문제 일괄 채점
export const gradeMultipleAnswers = (
  questions: EnglishQuestion[],
  answers: Map<string, string>
): Map<string, GradingResult> => {
  const results = new Map<string, GradingResult>();
  
  questions.forEach(question => {
    const answer = answers.get(question.id) || '';
    const result = gradeAnswer(question, answer);
    results.set(question.id, result);
  });
  
  return results;
};

// 전체 점수 계산
export const calculateTotalScore = (results: Map<string, GradingResult>): number => {
  if (results.size === 0) return 0;
  
  let totalScore = 0;
  results.forEach(result => {
    totalScore += result.score;
  });
  
  return Math.round(totalScore / results.size);
};

// AI 종합 피드백 생성
export const generateOverallFeedback = (
  results: Map<string, GradingResult>,
  totalScore: number
): string => {
  const correctCount = Array.from(results.values()).filter(r => r.isCorrect).length;
  const totalCount = results.size;
  const percentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  let overallFeedback = '';
  
  if (totalScore >= 90) {
    overallFeedback = `Excellent work! You scored ${totalScore}/100. You answered ${correctCount} out of ${totalCount} questions correctly (${percentage}%). Your English proficiency is outstanding. Keep up the great work!`;
  } else if (totalScore >= 70) {
    overallFeedback = `Good job! You scored ${totalScore}/100. You answered ${correctCount} out of ${totalCount} questions correctly (${percentage}%). You're doing well, but there's room for improvement in some areas.`;
  } else if (totalScore >= 50) {
    overallFeedback = `Fair effort. You scored ${totalScore}/100. You answered ${correctCount} out of ${totalCount} questions correctly (${percentage}%). You need to focus more on the concepts and practice regularly.`;
  } else {
    overallFeedback = `You scored ${totalScore}/100. You answered ${correctCount} out of ${totalCount} questions correctly (${percentage}%). Don't be discouraged! Review the feedback carefully and practice more. You can improve!`;
  }

  return overallFeedback;
};

