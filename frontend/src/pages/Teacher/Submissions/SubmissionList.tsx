/**
 * Teacher Submissions List Page (Enhanced with AI Grading)
 * 
 * 실제 영어 제출물과 AI 자동 채점 결과를 확인하고 승인하는 페이지
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import { useLanguage } from '../../../i18n';
import { 
  getPendingSubmissions, 
  getSubmissionDetail,
  approveSubmission,
  EnglishSubmission 
} from '../../../lib/api/mock/englishSubmissions';
import { SubmissionReviewModal } from '../../../components/teacher/SubmissionReviewModal';
import {
  Page,
  PageHeader,
  Card,
  Badge,
  Button,
  Spinner,
  Alert,
  Text,
  Stack,
} from '../../../design-system';

export const SubmissionList = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [submissions, setSubmissions] = useState<EnglishSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<EnglishSubmission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getPendingSubmissions(user.id);
      setSubmissions(data);
    } catch (err) {
      console.error('Failed to load submissions:', err);
      setError(language === 'ko'
        ? '제출물을 불러오는데 실패했습니다.'
        : 'Failed to load submissions.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewSubmission = async (submissionId: string) => {
    try {
      const detail = await getSubmissionDetail(submissionId);
      if (detail) {
        setSelectedSubmission(detail);
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error('Failed to load submission detail:', err);
      alert(language === 'ko'
        ? '제출물 상세 정보를 불러올 수 없습니다.'
        : 'Failed to load submission details.');
    }
  };

  const handleApprove = async (teacherComments: Map<string, string>, finalScore: number) => {
    if (!user || !selectedSubmission) return;

    try {
      await approveSubmission(
        selectedSubmission.id,
        user.id,
        teacherComments,
        finalScore
      );

      alert(language === 'ko'
        ? `${selectedSubmission.studentName} 학생의 제출물이 승인되었습니다!\n최종 점수: ${finalScore}점\n\n학생에게 피드백이 전달되었습니다.`
        : `Submission approved for ${selectedSubmission.studentName}!\nFinal score: ${finalScore}\n\nFeedback has been sent to the student.`);

      // 목록 새로고침
      loadSubmissions();
      setIsModalOpen(false);
      setSelectedSubmission(null);
    } catch (err) {
      throw err; // 모달에서 처리
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(language === 'ko' ? 'ko-KR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { variant: 'success' as const, label: 'A' };
    if (score >= 80) return { variant: 'info' as const, label: 'B' };
    if (score >= 70) return { variant: 'warning' as const, label: 'C' };
    return { variant: 'error' as const, label: 'D' };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Stack direction="vertical" align="center" gap="md">
          <Spinner size="lg" />
          <Text color="muted">
            {language === 'ko' ? '제출물 로딩 중...' : 'Loading submissions...'}
          </Text>
        </Stack>
      </div>
    );
  }

  if (error) {
    return (
      <Page>
        <Alert variant="error" description={error} />
        <Button variant="primary" onClick={loadSubmissions} className="mt-4">
          {language === 'ko' ? '다시 시도' : 'Retry'}
        </Button>
      </Page>
    );
  }

  return (
    <Page>
      <PageHeader
        title={t('submissions.title')}
        description={language === 'ko'
          ? 'AI가 자동 채점한 제출물을 검토하고 최종 승인하세요'
          : 'Review AI-graded submissions and approve them'}
      />

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-yellow-50 border-yellow-200">
          <Card.Body>
            <Text variant="small" color="muted">
              {language === 'ko' ? '대기 중' : 'Pending Review'}
            </Text>
            <div className="flex items-baseline gap-2 mt-1">
              <Text className="text-3xl font-bold text-yellow-700">
                {submissions.length}
              </Text>
              <Text variant="small" color="muted">
                {language === 'ko' ? '건' : 'items'}
              </Text>
            </div>
          </Card.Body>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <Card.Body>
            <Text variant="small" color="muted">
              {language === 'ko' ? '평균 점수' : 'Average Score'}
            </Text>
            <div className="flex items-baseline gap-2 mt-1">
              <Text className="text-3xl font-bold text-green-700">
                {submissions.length > 0 
                  ? Math.round(submissions.reduce((sum, s) => sum + s.overallScore, 0) / submissions.length)
                  : 0}
              </Text>
              <Text variant="small" color="muted">/100</Text>
            </div>
          </Card.Body>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <Card.Body>
            <Text variant="small" color="muted">
              {language === 'ko' ? '90점 이상' : 'Score ≥ 90'}
            </Text>
            <div className="flex items-baseline gap-2 mt-1">
              <Text className="text-3xl font-bold text-blue-700">
                {submissions.filter(s => s.overallScore >= 90).length}
              </Text>
              <Text variant="small" color="muted">
                {language === 'ko' ? '명' : 'students'}
              </Text>
            </div>
          </Card.Body>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <Card.Body>
            <Text variant="small" color="muted">
              {language === 'ko' ? '70점 미만' : 'Score < 70'}
            </Text>
            <div className="flex items-baseline gap-2 mt-1">
              <Text className="text-3xl font-bold text-purple-700">
                {submissions.filter(s => s.overallScore < 70).length}
              </Text>
              <Text variant="small" color="muted">
                {language === 'ko' ? '명' : 'students'}
              </Text>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* AI 안내 */}
      <Alert 
        variant="info" 
        title={language === 'ko' ? '🤖 AI 자동 채점 완료' : '🤖 AI Auto-Grading Complete'}
        description={language === 'ko'
          ? '모든 제출물은 AI가 자동으로 채점하여 상세한 피드백을 생성했습니다. 선생님께서는 AI 피드백을 검토하시고, 필요한 경우 점수를 조정하거나 추가 코멘트를 작성하신 후 최종 승인해주세요.'
          : 'All submissions have been automatically graded by AI with detailed feedback. Please review the AI feedback, adjust scores if needed, add your comments, and approve.'}
        className="mb-6"
      />

      {/* 제출물 목록 */}
      {submissions.length === 0 ? (
        <Card>
          <Card.Body className="p-12">
            <Stack direction="vertical" align="center" gap="md">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <Text color="muted" className="text-center">
                {language === 'ko'
                  ? '검토 대기 중인 제출물이 없습니다.'
                  : 'No pending submissions.'}
              </Text>
            </Stack>
          </Card.Body>
        </Card>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => {
            const scoreBadge = getScoreBadge(submission.overallScore);
            
            return (
              <Card key={submission.id} className="hover:shadow-lg transition-shadow">
                <Card.Body>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Text weight="bold" className="text-lg">
                          {submission.studentName}
                        </Text>
                        <Badge variant="neutral">{submission.className}</Badge>
                        <Badge variant={scoreBadge.variant}>
                          {submission.overallScore}점 ({scoreBadge.label})
                        </Badge>
                      </div>
                      
                      <Text className="mb-2">{submission.assignmentTitle}</Text>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {formatDate(submission.submittedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {submission.questions.length} {language === 'ko' ? '문제' : 'questions'}
                        </span>
                      </div>

                      {/* AI 피드백 미리보기 */}
                      <div className="mt-3 bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          <div>
                            <Text variant="small" weight="semibold" className="text-purple-900 mb-1">
                              AI {language === 'ko' ? '종합 피드백' : 'Overall Feedback'}
                            </Text>
                            <Text variant="small" className="text-purple-800 line-clamp-2">
                              {submission.overallFeedback}
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      onClick={() => handleViewSubmission(submission.id)}
                    >
                      {language === 'ko' ? '검토 및 승인' : 'Review & Approve'}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}

      {/* 검토 모달 */}
      {selectedSubmission && (
        <SubmissionReviewModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSubmission(null);
          }}
          studentName={selectedSubmission.studentName}
          assignmentTitle={selectedSubmission.assignmentTitle}
          submittedAt={selectedSubmission.submittedAt}
          questions={selectedSubmission.questions.map((q, index) => ({
            question: q,
            studentAnswer: selectedSubmission.answers.get(q.id) || '',
            aiGrading: selectedSubmission.aiGradingResults.get(q.id),
          }))}
          overallScore={selectedSubmission.overallScore}
          overallFeedback={selectedSubmission.overallFeedback}
          onApprove={handleApprove}
        />
      )}
    </Page>
  );
};
