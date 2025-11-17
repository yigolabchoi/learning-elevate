/**
 * Submission Review Modal - Teacher
 * 
 * AI 자동 채점 결과를 확인하고 선생님이 검토하여 최종 승인하는 모달
 */

import { useState } from 'react';
import { useLanguage } from '../../i18n';
import { EnglishQuestion } from '../../lib/english';
import { GradingResult } from '../../lib/english/aiGrading';
import {
  Modal,
  Button,
  Alert,
  Text,
  Heading,
  Stack,
  Badge,
  TextArea,
  Card,
} from '../../design-system';

interface QuestionWithFeedback {
  question: EnglishQuestion;
  studentAnswer: string;
  aiGrading: GradingResult;
  teacherComment?: string;
  teacherAdjustedScore?: number;
}

interface SubmissionReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  assignmentTitle: string;
  submittedAt: string;
  questions: QuestionWithFeedback[];
  overallScore: number;
  overallFeedback: string;
  onApprove: (teacherComments: Map<string, string>, finalScore: number) => Promise<void>;
}

export const SubmissionReviewModal = ({
  isOpen,
  onClose,
  studentName,
  assignmentTitle,
  submittedAt,
  questions,
  overallScore,
  overallFeedback,
  onApprove,
}: SubmissionReviewModalProps) => {
  const { language } = useLanguage();
  const [teacherComments, setTeacherComments] = useState<Map<string, string>>(new Map());
  const [adjustedScores, setAdjustedScores] = useState<Map<string, number>>(new Map());
  const [generalComment, setGeneralComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentChange = (questionId: string, comment: string) => {
    const newComments = new Map(teacherComments);
    newComments.set(questionId, comment);
    setTeacherComments(newComments);
  };

  const handleScoreAdjust = (questionId: string, newScore: number) => {
    const newScores = new Map(adjustedScores);
    newScores.set(questionId, newScore);
    setAdjustedScores(newScores);
  };

  const calculateFinalScore = (): number => {
    let totalScore = 0;
    questions.forEach((q) => {
      const adjustedScore = adjustedScores.get(q.question.id);
      totalScore += adjustedScore !== undefined ? adjustedScore : q.aiGrading.score;
    });
    return Math.round(totalScore / questions.length);
  };

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      // 전체 코멘트를 각 문제에 추가
      const finalComments = new Map(teacherComments);
      if (generalComment.trim()) {
        finalComments.set('_general_', generalComment);
      }
      
      await onApprove(finalComments, calculateFinalScore());
      onClose();
    } catch (error) {
      console.error('Approval error:', error);
      alert(language === 'ko' ? '승인 중 오류가 발생했습니다.' : 'Error during approval.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const finalScore = calculateFinalScore();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={language === 'ko' ? '제출물 검토' : 'Review Submission'}
      size="large"
    >
      <Stack direction="vertical" gap="lg">
        {/* 헤더 정보 */}
        <Card variant="muted">
          <Card.Body>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text variant="small" color="muted">
                  {language === 'ko' ? '학생' : 'Student'}
                </Text>
                <Text weight="semibold">{studentName}</Text>
              </div>
              <div>
                <Text variant="small" color="muted">
                  {language === 'ko' ? '과제' : 'Assignment'}
                </Text>
                <Text weight="semibold">{assignmentTitle}</Text>
              </div>
              <div>
                <Text variant="small" color="muted">
                  {language === 'ko' ? '제출 시간' : 'Submitted At'}
                </Text>
                <Text>{new Date(submittedAt).toLocaleString()}</Text>
              </div>
              <div>
                <Text variant="small" color="muted">
                  {language === 'ko' ? 'AI 점수' : 'AI Score'}
                </Text>
                <div className="flex items-center gap-2">
                  <Text weight="bold" className="text-2xl">{overallScore}</Text>
                  <Text color="muted">/100</Text>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* AI 종합 피드백 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <div>
              <Text variant="small" weight="semibold" className="text-blue-900 mb-1">
                {language === 'ko' ? 'AI 종합 피드백' : 'AI Overall Feedback'}
              </Text>
              <Text variant="small" className="text-blue-800">
                {overallFeedback}
              </Text>
            </div>
          </div>
        </div>

        {/* 문제별 피드백 */}
        <div className="max-h-96 overflow-y-auto space-y-4">
          {questions.map((item, index) => {
            const adjustedScore = adjustedScores.get(item.question.id);
            const currentScore = adjustedScore !== undefined ? adjustedScore : item.aiGrading.score;
            
            return (
              <Card key={item.question.id} className="border-2">
                <Card.Body>
                  <Stack direction="vertical" gap="md">
                    {/* 문제 헤더 */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 rounded-full font-semibold text-sm">
                          {index + 1}
                        </span>
                        <Heading level={4}>{item.question.title}</Heading>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="neutral" className="capitalize">
                          {item.question.type}
                        </Badge>
                        <Badge variant={item.aiGrading.isCorrect ? 'success' : 'error'}>
                          {currentScore}/100
                        </Badge>
                      </div>
                    </div>

                    {/* 문제 내용 */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <Text variant="small" weight="semibold" className="mb-1">
                        {language === 'ko' ? '문제:' : 'Question:'}
                      </Text>
                      <Text variant="small" className="whitespace-pre-wrap">
                        {item.question.question}
                      </Text>
                    </div>

                    {/* 학생 답안 */}
                    <div className="bg-blue-50 rounded-lg p-3">
                      <Text variant="small" weight="semibold" className="mb-1 text-blue-900">
                        {language === 'ko' ? '학생 답안:' : 'Student Answer:'}
                      </Text>
                      <Text variant="small" className="text-blue-900">
                        {item.studentAnswer || (language === 'ko' ? '(답변 없음)' : '(No answer)')}
                      </Text>
                    </div>

                    {/* AI 피드백 */}
                    <div className="border-l-4 border-purple-500 bg-purple-50 rounded-r-lg p-3">
                      <Text variant="small" weight="semibold" className="text-purple-900 mb-2">
                        🤖 AI {language === 'ko' ? '피드백' : 'Feedback'}
                      </Text>
                      <Text variant="small" className="text-purple-900 mb-2">
                        {item.aiGrading.feedback}
                      </Text>

                      {item.aiGrading.strengths.length > 0 && (
                        <div className="mt-2">
                          <Text variant="small" weight="semibold" className="text-green-700">
                            ✓ {language === 'ko' ? '강점:' : 'Strengths:'}
                          </Text>
                          <ul className="list-disc list-inside text-xs text-green-700 mt-1">
                            {item.aiGrading.strengths.map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.aiGrading.weaknesses.length > 0 && (
                        <div className="mt-2">
                          <Text variant="small" weight="semibold" className="text-red-700">
                            ✗ {language === 'ko' ? '약점:' : 'Weaknesses:'}
                          </Text>
                          <ul className="list-disc list-inside text-xs text-red-700 mt-1">
                            {item.aiGrading.weaknesses.map((w, i) => (
                              <li key={i}>{w}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.aiGrading.suggestions.length > 0 && (
                        <div className="mt-2">
                          <Text variant="small" weight="semibold" className="text-blue-700">
                            💡 {language === 'ko' ? '제안:' : 'Suggestions:'}
                          </Text>
                          <ul className="list-disc list-inside text-xs text-blue-700 mt-1">
                            {item.aiGrading.suggestions.map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* 점수 조정 */}
                    <div className="flex items-center gap-3">
                      <Text variant="small" weight="semibold">
                        {language === 'ko' ? '점수 조정:' : 'Adjust Score:'}
                      </Text>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={currentScore}
                        onChange={(e) => handleScoreAdjust(item.question.id, Number(e.target.value))}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                      />
                      <Text variant="small" color="muted">/100</Text>
                      {adjustedScore !== undefined && adjustedScore !== item.aiGrading.score && (
                        <Badge variant="warning">
                          {language === 'ko' ? '조정됨' : 'Adjusted'}
                        </Badge>
                      )}
                    </div>

                    {/* 선생님 코멘트 */}
                    <TextArea
                      label={language === 'ko' ? '선생님 추가 코멘트' : 'Teacher Comment'}
                      value={teacherComments.get(item.question.id) || ''}
                      onChange={(e) => handleCommentChange(item.question.id, e.target.value)}
                      placeholder={language === 'ko' 
                        ? 'AI 피드백에 추가할 내용을 입력하세요...' 
                        : 'Add your comments to AI feedback...'}
                      rows={2}
                      fullWidth
                    />
                  </Stack>
                </Card.Body>
              </Card>
            );
          })}
        </div>

        {/* 전체 코멘트 */}
        <TextArea
          label={language === 'ko' ? '전체 종합 코멘트' : 'Overall Comment'}
          value={generalComment}
          onChange={(e) => setGeneralComment(e.target.value)}
          placeholder={language === 'ko'
            ? '학생에게 전달할 전체적인 피드백을 입력하세요...'
            : 'Enter overall feedback for the student...'}
          rows={3}
          fullWidth
        />

        {/* 최종 점수 */}
        <Card className="bg-linear-to-r from-green-50 to-blue-50 border-2 border-green-300">
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <Text variant="small" color="muted">
                  {language === 'ko' ? '최종 점수' : 'Final Score'}
                </Text>
                <div className="flex items-baseline gap-2">
                  <Text className="text-3xl font-bold text-green-700">{finalScore}</Text>
                  <Text color="muted">/100</Text>
                  {finalScore !== overallScore && (
                    <Badge variant="warning">
                      {language === 'ko' ? '(AI: ' : '(AI: '}{overallScore})
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <Text variant="small" color="muted">
                  {language === 'ko' ? '등급' : 'Grade'}
                </Text>
                <Text className="text-2xl font-bold">
                  {finalScore >= 90 ? 'A' : finalScore >= 80 ? 'B' : finalScore >= 70 ? 'C' : finalScore >= 60 ? 'D' : 'F'}
                </Text>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* 버튼 */}
        <Stack direction="horizontal" gap="sm" className="justify-end">
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            {language === 'ko' ? '취소' : 'Cancel'}
          </Button>
          <Button
            variant="primary"
            onClick={handleApprove}
            isLoading={isSubmitting}
          >
            {isSubmitting 
              ? (language === 'ko' ? '승인 중...' : 'Approving...') 
              : (language === 'ko' ? '최종 승인 및 학생에게 전달' : 'Approve & Send to Student')}
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

