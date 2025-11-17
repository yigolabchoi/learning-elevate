/**
 * Student History List Page (Enhanced with Approved Feedback)
 * 
 * 선생님이 승인한 제출물과 최종 피드백 목록
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import { useLanguage } from '../../../i18n';
import { getStudentApprovedSubmissions, EnglishSubmission } from '../../../lib/api/mock/englishSubmissions';
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

export const HistoryList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();
  
  const [submissions, setSubmissions] = useState<EnglishSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<'7days' | '30days' | 'all'>('30days');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getStudentApprovedSubmissions(user.id);
      setSubmissions(data.sort((a, b) => 
        new Date(b.approvedAt || b.submittedAt).getTime() - new Date(a.approvedAt || a.submittedAt).getTime()
      ));
    } catch (err) {
      console.error('Failed to load history:', err);
      setError(language === 'ko'
        ? '학습 기록을 불러오는데 실패했습니다.'
        : 'Failed to load history.');
    } finally {
      setIsLoading(false);
    }
  };

  const filterByDate = (submissions: EnglishSubmission[]) => {
    const now = new Date();
    const cutoffDate = new Date();
    
    if (dateFilter === '7days') {
      cutoffDate.setDate(now.getDate() - 7);
    } else if (dateFilter === '30days') {
      cutoffDate.setDate(now.getDate() - 30);
    } else {
      return submissions; // 'all'
    }

    return submissions.filter(s => new Date(s.approvedAt || s.submittedAt) >= cutoffDate);
  };

  const filteredSubmissions = filterByDate(submissions);

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { variant: 'success' as const, label: 'A', color: 'text-green-700' };
    if (score >= 80) return { variant: 'info' as const, label: 'B', color: 'text-blue-700' };
    if (score >= 70) return { variant: 'warning' as const, label: 'C', color: 'text-yellow-700' };
    return { variant: 'error' as const, label: 'D', color: 'text-red-700' };
  };

  const calculateAverageScore = () => {
    if (filteredSubmissions.length === 0) return 0;
    const total = filteredSubmissions.reduce((sum, s) => sum + (s.teacherAdjustedScore || s.overallScore), 0);
    return Math.round(total / filteredSubmissions.length);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Stack direction="vertical" align="center" gap="md">
          <Spinner size="lg" />
          <Text color="muted">
            {language === 'ko' ? '학습 기록 로딩 중...' : 'Loading history...'}
          </Text>
        </Stack>
      </div>
    );
  }

  if (error) {
    return (
      <Page>
        <Alert variant="error" description={error} />
        <Button variant="primary" onClick={loadHistory} className="mt-4">
          {language === 'ko' ? '다시 시도' : 'Retry'}
        </Button>
      </Page>
    );
  }

  const averageScore = calculateAverageScore();

  return (
    <Page>
      <PageHeader
        title={language === 'ko' ? '학습 기록' : 'Learning History'}
        description={language === 'ko'
          ? '선생님이 검토하고 승인한 과제 결과와 피드백을 확인하세요'
          : 'View your approved assignments and teacher feedback'}
      />

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-blue-50 border-blue-200">
          <Card.Body>
            <Text variant="small" color="muted">
              {language === 'ko' ? '완료한 과제' : 'Completed Assignments'}
            </Text>
            <div className="flex items-baseline gap-2 mt-1">
              <Text className="text-3xl font-bold text-blue-700">
                {filteredSubmissions.length}
              </Text>
              <Text variant="small" color="muted">
                {language === 'ko' ? '개' : 'items'}
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
                {averageScore}
              </Text>
              <Text variant="small" color="muted">/100</Text>
            </div>
          </Card.Body>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <Card.Body>
            <Text variant="small" color="muted">
              {language === 'ko' ? '우수 과제 (90점 이상)' : 'Excellent (≥90)'}
            </Text>
            <div className="flex items-baseline gap-2 mt-1">
              <Text className="text-3xl font-bold text-purple-700">
                {filteredSubmissions.filter(s => (s.teacherAdjustedScore || s.overallScore) >= 90).length}
              </Text>
              <Text variant="small" color="muted">
                {language === 'ko' ? '개' : 'items'}
              </Text>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* 필터 */}
      <Card className="mb-6">
        <Card.Body>
          <div className="flex items-center justify-between">
            <Text weight="semibold">
              {language === 'ko' ? '기간 선택' : 'Filter by Period'}
            </Text>
            <div className="flex gap-2">
              <Button
                variant={dateFilter === '7days' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setDateFilter('7days')}
              >
                {language === 'ko' ? '최근 7일' : 'Last 7 days'}
              </Button>
              <Button
                variant={dateFilter === '30days' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setDateFilter('30days')}
              >
                {language === 'ko' ? '최근 30일' : 'Last 30 days'}
              </Button>
              <Button
                variant={dateFilter === 'all' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setDateFilter('all')}
              >
                {language === 'ko' ? '전체' : 'All'}
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* 과제 목록 */}
      {filteredSubmissions.length === 0 ? (
        <Card>
          <Card.Body className="p-12">
            <Stack direction="vertical" align="center" gap="md">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <Text color="muted" className="text-center">
                {language === 'ko'
                  ? '아직 완료한 과제가 없습니다.'
                  : 'No completed assignments yet.'}
              </Text>
              <Button variant="primary" onClick={() => navigate('/student/assignments')}>
                {language === 'ko' ? '과제 보러 가기' : 'View Assignments'}
              </Button>
            </Stack>
          </Card.Body>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map((submission) => {
            const finalScore = submission.teacherAdjustedScore || submission.overallScore;
            const scoreBadge = getScoreBadge(finalScore);
            const hasTeacherComment = submission.teacherComments && submission.teacherComments.size > 0;

            return (
              <Card
                key={submission.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/student/feedback/${submission.id}`)}
              >
                <Card.Body>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Text weight="bold" className="text-lg">
                          {submission.assignmentTitle}
                        </Text>
                        <Badge variant="neutral">{submission.className}</Badge>
                        {hasTeacherComment && (
                          <Badge variant="info">
                            👨‍🏫 {language === 'ko' ? '선생님 코멘트' : 'Teacher Comment'}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {new Date(submission.approvedAt || submission.submittedAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {submission.questions.length} {language === 'ko' ? '문제' : 'questions'}
                        </span>
                      </div>

                      {/* AI 피드백 미리보기 */}
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <Text variant="small" className="text-purple-900 line-clamp-2">
                          🤖 {submission.overallFeedback}
                        </Text>
                      </div>

                      {/* 선생님 전체 코멘트 미리보기 */}
                      {submission.teacherComments?.get('_general_') && (
                        <div className="mt-2 bg-green-50 border border-green-200 rounded-lg p-3">
                          <Text variant="small" className="text-green-900 line-clamp-2">
                            👨‍🏫 {submission.teacherComments.get('_general_')}
                          </Text>
                        </div>
                      )}
                    </div>

                    <div className="ml-6 text-center">
                      <Text variant="small" color="muted" className="mb-1">
                        {language === 'ko' ? '최종 점수' : 'Final Score'}
                      </Text>
                      <div className="flex flex-col items-center">
                        <Text className={`text-4xl font-bold ${scoreBadge.color}`}>
                          {finalScore}
                        </Text>
                        <Badge variant={scoreBadge.variant} className="mt-2">
                          {scoreBadge.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </Page>
  );
};
