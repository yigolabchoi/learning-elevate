/**
 * Parent - Child Learning Results Page
 * 
 * 학부모가 자녀의 승인된 과제 결과를 확인하는 페이지
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../i18n';
import { getChildSubmissions, EnglishSubmission } from '../../../lib/api/mock/englishSubmissions';
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

export const ChildResults = () => {
  const { childId } = useParams<{ childId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const [submissions, setSubmissions] = useState<EnglishSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadResults();
  }, [childId]);

  const loadResults = async () => {
    if (!childId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getChildSubmissions(childId);
      setSubmissions(data.sort((a, b) => 
        new Date(b.approvedAt || b.submittedAt).getTime() - new Date(a.approvedAt || a.submittedAt).getTime()
      ));
    } catch (err) {
      console.error('Failed to load results:', err);
      setError(language === 'ko'
        ? '학습 결과를 불러오는데 실패했습니다.'
        : 'Failed to load learning results.');
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { variant: 'success' as const, label: 'A', color: 'text-green-700' };
    if (score >= 80) return { variant: 'info' as const, label: 'B', color: 'text-blue-700' };
    if (score >= 70) return { variant: 'warning' as const, label: 'C', color: 'text-yellow-700' };
    return { variant: 'error' as const, label: 'D', color: 'text-red-700' };
  };

  const calculateAverageScore = () => {
    if (submissions.length === 0) return 0;
    const total = submissions.reduce((sum, s) => sum + (s.teacherAdjustedScore || s.overallScore), 0);
    return Math.round(total / submissions.length);
  };

  const calculateTrend = () => {
    if (submissions.length < 2) return 'stable';
    const recent = submissions.slice(0, 3);
    const older = submissions.slice(3, 6);
    
    const recentAvg = recent.reduce((sum, s) => sum + (s.teacherAdjustedScore || s.overallScore), 0) / recent.length;
    const olderAvg = older.length > 0 ? older.reduce((sum, s) => sum + (s.teacherAdjustedScore || s.overallScore), 0) / older.length : recentAvg;
    
    if (recentAvg > olderAvg + 5) return 'improving';
    if (recentAvg < olderAvg - 5) return 'declining';
    return 'stable';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Stack direction="vertical" align="center" gap="md">
          <Spinner size="lg" />
          <Text color="muted">
            {language === 'ko' ? '학습 결과 로딩 중...' : 'Loading results...'}
          </Text>
        </Stack>
      </div>
    );
  }

  if (error) {
    return (
      <Page>
        <Alert variant="error" description={error} />
        <Button variant="primary" onClick={loadResults} className="mt-4">
          {language === 'ko' ? '다시 시도' : 'Retry'}
        </Button>
      </Page>
    );
  }

  const averageScore = calculateAverageScore();
  const trend = calculateTrend();
  const childName = submissions[0]?.studentName || (language === 'ko' ? '자녀' : 'Child');

  return (
    <Page>
      <PageHeader
        title={language === 'ko' ? `${childName}의 학습 결과` : `${childName}'s Learning Results`}
        description={language === 'ko'
          ? '선생님이 승인한 과제 결과와 피드백을 확인하세요'
          : 'View approved assignments and teacher feedback'}
      >
        <Button variant="secondary" onClick={() => navigate('/parent/children')}>
          {language === 'ko' ? '자녀 목록' : 'Back to Children'}
        </Button>
      </PageHeader>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-blue-50 border-blue-200">
          <Card.Body>
            <Text variant="small" color="muted">
              {language === 'ko' ? '완료한 과제' : 'Completed'}
            </Text>
            <div className="flex items-baseline gap-2 mt-1">
              <Text className="text-3xl font-bold text-blue-700">
                {submissions.length}
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
              {language === 'ko' ? '우수 과제' : 'Excellent (≥90)'}
            </Text>
            <div className="flex items-baseline gap-2 mt-1">
              <Text className="text-3xl font-bold text-purple-700">
                {submissions.filter(s => (s.teacherAdjustedScore || s.overallScore) >= 90).length}
              </Text>
              <Text variant="small" color="muted">
                {language === 'ko' ? '개' : 'items'}
              </Text>
            </div>
          </Card.Body>
        </Card>

        <Card className={`border-2 ${
          trend === 'improving' ? 'bg-green-50 border-green-300' :
          trend === 'declining' ? 'bg-red-50 border-red-300' :
          'bg-gray-50 border-gray-300'
        }`}>
          <Card.Body>
            <Text variant="small" color="muted">
              {language === 'ko' ? '학습 추세' : 'Trend'}
            </Text>
            <div className="flex items-center gap-2 mt-1">
              {trend === 'improving' && (
                <>
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <Text className="text-xl font-bold text-green-700">
                    {language === 'ko' ? '상승' : 'Improving'}
                  </Text>
                </>
              )}
              {trend === 'declining' && (
                <>
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                  <Text className="text-xl font-bold text-red-700">
                    {language === 'ko' ? '하락' : 'Declining'}
                  </Text>
                </>
              )}
              {trend === 'stable' && (
                <>
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14" />
                  </svg>
                  <Text className="text-xl font-bold text-gray-700">
                    {language === 'ko' ? '안정' : 'Stable'}
                  </Text>
                </>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* 학습 인사이트 */}
      <Alert
        variant={trend === 'improving' ? 'success' : trend === 'declining' ? 'warning' : 'info'}
        title={language === 'ko' ? '📊 학습 인사이트' : '📊 Learning Insights'}
        description={
          language === 'ko' ? (
            trend === 'improving' 
              ? `${childName}의 학습 성과가 지속적으로 향상되고 있습니다! 현재 평균 점수는 ${averageScore}점이며, 최근 과제에서 더 좋은 성적을 보이고 있습니다. 이 추세를 유지할 수 있도록 격려해 주세요.`
              : trend === 'declining'
              ? `${childName}의 최근 성적이 다소 하락하는 추세입니다. 선생님의 피드백을 함께 확인하시고, 어려워하는 부분에 대해 도움을 주시면 좋겠습니다.`
              : `${childName}는 안정적인 학습 패턴을 보이고 있습니다. 평균 ${averageScore}점을 유지하고 있으며, 꾸준한 학습을 이어가고 있습니다.`
          ) : (
            trend === 'improving'
              ? `${childName}'s learning performance is improving! Current average is ${averageScore}. Recent assignments show better results. Keep encouraging!`
              : trend === 'declining'
              ? `${childName}'s recent scores are declining. Please review teacher feedback and provide support in challenging areas.`
              : `${childName} maintains a stable learning pattern with an average of ${averageScore}. Consistent progress is being made.`
          )
        }
        className="mb-6"
      />

      {/* 과제 결과 목록 */}
      {submissions.length === 0 ? (
        <Card>
          <Card.Body className="p-12">
            <Stack direction="vertical" align="center" gap="md">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <Text color="muted" className="text-center">
                {language === 'ko'
                  ? '아직 완료된 과제가 없습니다.'
                  : 'No completed assignments yet.'}
              </Text>
            </Stack>
          </Card.Body>
        </Card>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => {
            const finalScore = submission.teacherAdjustedScore || submission.overallScore;
            const scoreBadge = getScoreBadge(finalScore);
            const isExpanded = expandedId === submission.id;

            return (
              <Card key={submission.id} className="hover:shadow-lg transition-shadow">
                <Card.Body>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Text weight="bold" className="text-lg">
                          {submission.assignmentTitle}
                        </Text>
                        <Badge variant="neutral">{submission.className}</Badge>
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

                      {/* 선생님 코멘트 미리보기 */}
                      {submission.teacherComments?.get('_general_') && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                          <div className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <div>
                              <Text variant="small" weight="semibold" className="text-green-900 mb-1">
                                👨‍🏫 {language === 'ko' ? '선생님 코멘트' : "Teacher's Comment"}
                              </Text>
                              <Text variant="small" className="text-green-900">
                                {submission.teacherComments.get('_general_')}
                              </Text>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 상세 피드백 (펼침/접힘) */}
                      {isExpanded && (
                        <div className="mt-4 border-t pt-4">
                          <Heading level={4} className="mb-3">
                            {language === 'ko' ? '문제별 상세 결과' : 'Detailed Results'}
                          </Heading>
                          <div className="space-y-3">
                            {submission.questions.map((q, index) => {
                              const grading = submission.aiGradingResults.get(q.id);
                              return (
                                <div key={q.id} className="bg-gray-50 rounded-lg p-3">
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <span className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-semibold text-white ${
                                        grading?.isCorrect ? 'bg-green-500' : 'bg-red-500'
                                      }`}>
                                        {index + 1}
                                      </span>
                                      <Text weight="semibold">{q.title}</Text>
                                    </div>
                                    <Badge variant={grading?.isCorrect ? 'success' : 'error'}>
                                      {grading?.score || 0}/100
                                    </Badge>
                                  </div>
                                  <Text variant="small" className="text-gray-700">
                                    {grading?.feedback}
                                  </Text>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="ml-6 flex flex-col items-center gap-3">
                      <div className="text-center">
                        <Text variant="small" color="muted" className="mb-1">
                          {language === 'ko' ? '점수' : 'Score'}
                        </Text>
                        <Text className={`text-4xl font-bold ${scoreBadge.color}`}>
                          {finalScore}
                        </Text>
                        <Badge variant={scoreBadge.variant} className="mt-2">
                          {scoreBadge.label}
                        </Badge>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setExpandedId(isExpanded ? null : submission.id)}
                      >
                        {isExpanded 
                          ? (language === 'ko' ? '접기' : 'Collapse')
                          : (language === 'ko' ? '상세보기' : 'View Details')}
                      </Button>
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

