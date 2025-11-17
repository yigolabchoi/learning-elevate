/**
 * Student Feedback Detail Page
 * 
 * 선생님이 최종 승인한 피드백을 확인하는 페이지
 * AI 자동 채점 + 선생님 코멘트 통합 표시
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../i18n';
import { getSubmissionFeedback, EnglishSubmission } from '../../../lib/api/mock/englishSubmissions';
import {
  Page,
  PageHeader,
  Card,
  Badge,
  Button,
  Spinner,
  Alert,
  Text,
  Heading,
  Stack,
} from '../../../design-system';

export const FeedbackDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const [submission, setSubmission] = useState<EnglishSubmission | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFeedback();
  }, [id]);

  const loadFeedback = async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getSubmissionFeedback(id);
      if (!data) {
        setError(language === 'ko'
          ? '피드백을 찾을 수 없습니다.'
          : 'Feedback not found.');
        return;
      }
      setSubmission(data);
    } catch (err) {
      console.error('Failed to load feedback:', err);
      setError(language === 'ko'
        ? '피드백을 불러오는데 실패했습니다.'
        : 'Failed to load feedback.');
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-700';
    if (score >= 80) return 'text-blue-700';
    if (score >= 70) return 'text-yellow-700';
    return 'text-red-700';
  };

  const getGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Stack direction="vertical" align="center" gap="md">
          <Spinner size="lg" />
          <Text color="muted">
            {language === 'ko' ? '피드백 로딩 중...' : 'Loading feedback...'}
          </Text>
        </Stack>
      </div>
    );
  }

  if (error || !submission) {
    return (
      <Page>
        <Alert variant="error" description={error || 'Not found'} />
        <Button variant="primary" onClick={() => navigate('/student/history')} className="mt-4">
          {language === 'ko' ? '목록으로' : 'Back to List'}
        </Button>
      </Page>
    );
  }

  const finalScore = submission.teacherAdjustedScore || submission.overallScore;

  return (
    <Page>
      <PageHeader
        title={language === 'ko' ? '학습 피드백' : 'Learning Feedback'}
        description={submission.assignmentTitle}
      >
        <Button variant="secondary" onClick={() => navigate('/student/history')}>
          {language === 'ko' ? '목록으로' : 'Back to List'}
        </Button>
      </PageHeader>

      {/* 점수 카드 */}
      <Card className="mb-6 border-2 border-primary-300 bg-gradient-to-r from-primary-50 to-blue-50">
        <Card.Body>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Text variant="small" color="muted" className="mb-2">
                {language === 'ko' ? '최종 점수' : 'Final Score'}
              </Text>
              <div className="flex items-baseline justify-center gap-2">
                <Text className={`text-5xl font-bold ${getScoreColor(finalScore)}`}>
                  {finalScore}
                </Text>
                <Text color="muted" className="text-2xl">/100</Text>
              </div>
              <Badge variant={
                finalScore >= 90 ? 'success' :
                finalScore >= 70 ? 'info' : 'warning'
              } className="mt-2">
                {language === 'ko' ? '등급' : 'Grade'}: {getGrade(finalScore)}
              </Badge>
            </div>

            <div className="text-center">
              <Text variant="small" color="muted" className="mb-2">
                {language === 'ko' ? '제출 시간' : 'Submitted At'}
              </Text>
              <Text weight="semibold">
                {new Date(submission.submittedAt).toLocaleString()}
              </Text>
              {submission.approvedAt && (
                <div className="mt-3">
                  <Text variant="small" color="muted" className="mb-1">
                    {language === 'ko' ? '승인 시간' : 'Approved At'}
                  </Text>
                  <Text variant="small">
                    {new Date(submission.approvedAt).toLocaleString()}
                  </Text>
                </div>
              )}
            </div>

            <div className="text-center">
              <Text variant="small" color="muted" className="mb-2">
                {language === 'ko' ? '문제 수' : 'Questions'}
              </Text>
              <Text className="text-4xl font-bold text-primary-700">
                {submission.questions.length}
              </Text>
              <Text variant="small" color="muted" className="mt-2">
                {language === 'ko' ? '개 문제' : 'questions'}
              </Text>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* 선생님 전체 코멘트 */}
      {submission.teacherComments?.get('_general_') && (
        <Alert
          variant="info"
          title={`👨‍🏫 ${language === 'ko' ? '선생님 코멘트' : "Teacher's Comment"}`}
          description={submission.teacherComments.get('_general_')}
          className="mb-6"
        />
      )}

      {/* AI 종합 피드백 */}
      <Card className="mb-6">
        <Card.Body>
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <div className="flex-1">
              <Heading level={3} className="mb-2">
                🤖 AI {language === 'ko' ? '종합 분석' : 'Overall Analysis'}
              </Heading>
              <Text className="text-purple-900">
                {submission.overallFeedback}
              </Text>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* 문제별 상세 피드백 */}
      <Heading level={2} className="mb-4">
        {language === 'ko' ? '문제별 상세 피드백' : 'Detailed Feedback by Question'}
      </Heading>

      <div className="space-y-6">
        {submission.questions.map((question, index) => {
          const studentAnswer = submission.answers.get(question.id) || '';
          const aiGrading = submission.aiGradingResults.get(question.id);
          const teacherComment = submission.teacherComments?.get(question.id);

          return (
            <Card key={question.id} className="border-2">
              <Card.Body>
                <Stack direction="vertical" gap="md">
                  {/* 문제 헤더 */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-white ${
                        aiGrading?.isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {index + 1}
                      </span>
                      <div>
                        <Heading level={4}>{question.title}</Heading>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="neutral" className="capitalize text-xs">
                            {question.type}
                          </Badge>
                          <Badge variant={
                            question.difficulty === 'beginner' ? 'success' :
                            question.difficulty === 'intermediate' ? 'warning' : 'error'
                          } className="text-xs">
                            {question.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Badge variant={aiGrading?.isCorrect ? 'success' : 'error'} className="text-lg">
                      {aiGrading?.score || 0}/100
                    </Badge>
                  </div>

                  {/* 문제 내용 */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <Text variant="small" weight="semibold" className="mb-2">
                      {language === 'ko' ? '문제:' : 'Question:'}
                    </Text>
                    <Text className="whitespace-pre-wrap">{question.question}</Text>
                  </div>

                  {/* 학생 답안 */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <Text variant="small" weight="semibold" className="mb-2 text-blue-900">
                      {language === 'ko' ? '내 답안:' : 'My Answer:'}
                    </Text>
                    <Text className="text-blue-900">{studentAnswer || (language === 'ko' ? '(답변 없음)' : '(No answer)')}</Text>
                  </div>

                  {/* AI 피드백 */}
                  <div className="border-l-4 border-purple-500 bg-purple-50 rounded-r-lg p-4">
                    <Text variant="small" weight="semibold" className="text-purple-900 mb-2">
                      🤖 AI {language === 'ko' ? '피드백' : 'Feedback'}
                    </Text>
                    <Text className="text-purple-900 mb-3">{aiGrading?.feedback}</Text>

                    {aiGrading?.strengths && aiGrading.strengths.length > 0 && (
                      <div className="mb-2">
                        <Text variant="small" weight="semibold" className="text-green-700 mb-1">
                          ✓ {language === 'ko' ? '잘한 점:' : 'Strengths:'}
                        </Text>
                        <ul className="list-disc list-inside text-sm text-green-700">
                          {aiGrading.strengths.map((s: string, i: number) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {aiGrading?.weaknesses && aiGrading.weaknesses.length > 0 && (
                      <div className="mb-2">
                        <Text variant="small" weight="semibold" className="text-red-700 mb-1">
                          ✗ {language === 'ko' ? '개선할 점:' : 'Areas to Improve:'}
                        </Text>
                        <ul className="list-disc list-inside text-sm text-red-700">
                          {aiGrading.weaknesses.map((w: string, i: number) => (
                            <li key={i}>{w}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {aiGrading?.suggestions && aiGrading.suggestions.length > 0 && (
                      <div>
                        <Text variant="small" weight="semibold" className="text-blue-700 mb-1">
                          💡 {language === 'ko' ? '학습 제안:' : 'Study Suggestions:'}
                        </Text>
                        <ul className="list-disc list-inside text-sm text-blue-700">
                          {aiGrading.suggestions.map((s: string, i: number) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* 선생님 추가 코멘트 */}
                  {teacherComment && (
                    <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-4">
                      <Text variant="small" weight="semibold" className="text-green-900 mb-2">
                        👨‍🏫 {language === 'ko' ? '선생님 추가 코멘트' : "Teacher's Additional Comment"}
                      </Text>
                      <Text className="text-green-900">{teacherComment}</Text>
                    </div>
                  )}
                </Stack>
              </Card.Body>
            </Card>
          );
        })}
      </div>

      {/* 학습 팁 */}
      <Card className="mt-6 bg-yellow-50 border-yellow-300">
        <Card.Body>
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <div>
              <Heading level={4} className="text-yellow-900 mb-2">
                💪 {language === 'ko' ? '다음 학습을 위한 팁' : 'Tips for Next Study'}
              </Heading>
              <Text className="text-yellow-900">
                {language === 'ko'
                  ? '피드백을 꼼꼼히 읽고, 개선할 점을 다음 학습에 반영하세요. 틀린 문제는 다시 한번 풀어보고, 제안된 학습 방법을 따라해 보세요. 꾸준한 연습이 실력 향상의 비결입니다!'
                  : 'Read the feedback carefully and apply the improvements to your next study. Try solving incorrect questions again and follow the suggested study methods. Consistent practice is the key to improvement!'}
              </Text>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Page>
  );
};

