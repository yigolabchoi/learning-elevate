/**
 * Teacher Dashboard (디자인 시스템 적용)
 * 
 * 선생님 메인 대시보드:
 * - 내 반/클래스 목록 (학생 수)
 * - 오늘의 과제 (완료 현황)
 * - 확인 대기 중인 제출물
 * 
 * Features:
 * - 실시간 개요
 * - 핵심 페이지로 빠른 이동
 * - 로딩 및 에러 상태
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { DashboardSummary } from '../../types';
import { getTeacherDashboardSummary } from '../../lib/api/mock/teacherDashboard';
import { AIInsightsDashboard } from '../Teacher/Dashboard/AIInsights';
import {
  Page,
  PageHeader,
  Card,
  StatCard,
  Badge,
  Spinner,
  Alert,
  Button,
  Text,
  Heading,
  Stack,
} from '../../design-system';

export const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getTeacherDashboardSummary(user.id);
      setDashboardData(data);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
      setError('대시보드 데이터를 불러오는데 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 60) {
      return `${diffMins}분 전`;
    } else if (diffHours < 24) {
      return `${diffHours}시간 전`;
    } else {
      return formatDate(dateString);
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Stack direction="vertical" align="center" gap="md">
          <Spinner size="lg" />
          <Text color="muted">대시보드 로딩 중...</Text>
        </Stack>
      </div>
    );
  }

  // 에러 상태
  if (error || !dashboardData) {
    return (
      <Page>
        <Alert
          variant="error"
          title="오류"
          description={error || '대시보드를 불러올 수 없습니다'}
        />
        <Button variant="primary" onClick={loadDashboard} className="mt-4">
          다시 시도
        </Button>
      </Page>
    );
  }

  return (
    <Page>
      {/* 헤더 */}
      <PageHeader
        title="선생님 대시보드"
        description={`환영합니다, ${user?.name}님! 오늘의 현황을 확인하세요.`}
      />

      {/* AI 인사이트 - 선생님의 업무 부담을 줄이는 자동화 기능 */}
      {user && <AIInsightsDashboard teacherId={user.id} />}

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          label="전체 반/클래스"
          value={dashboardData.classes.length.toString()}
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
        />
        <StatCard
          label="오늘의 과제"
          value={dashboardData.todayAssignments.length.toString()}
          className="bg-gradient-to-br from-green-500 to-green-600 text-white"
        />
        <StatCard
          label="확인 대기 중"
          value={dashboardData.pendingSubmissions.length.toString()}
          className="bg-gradient-to-br from-orange-500 to-orange-600 text-white"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 내 클래스 */}
        <Card>
          <Card.Header>
            <Heading level={2}>내 클래스</Heading>
          </Card.Header>
          <Card.Body>
            {dashboardData.classes.length === 0 ? (
              <div className="text-center py-8">
                <svg
                  className="w-12 h-12 mx-auto text-gray-400 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <Text color="muted">아직 배정된 클래스가 없습니다</Text>
              </div>
            ) : (
              <Stack direction="vertical" gap="md">
                {dashboardData.classes.map((classItem) => (
                  <div
                    key={classItem.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate(`/teacher/classes/${classItem.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <Heading level={3} className="text-lg">
                          {classItem.name}
                        </Heading>
                        <Stack direction="horizontal" gap="md" className="mt-2">
                          <Text variant="small" color="muted" className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            {classItem.studentCount}명
                          </Text>
                          {classItem.subject && (
                            <Badge variant="info">{classItem.subject}</Badge>
                          )}
                        </Stack>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </Stack>
            )}
          </Card.Body>
        </Card>

        {/* 오늘의 과제 */}
        <Card>
          <Card.Header>
            <Heading level={2}>오늘의 과제</Heading>
          </Card.Header>
          <Card.Body>
            {dashboardData.todayAssignments.length === 0 ? (
              <div className="text-center py-8">
                <svg
                  className="w-12 h-12 mx-auto text-gray-400 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <Text color="muted">오늘 마감인 과제가 없습니다</Text>
              </div>
            ) : (
              <Stack direction="vertical" gap="md">
                {dashboardData.todayAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate('/teacher/assignments')}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <Heading level={3} className="text-base">
                          {assignment.title}
                        </Heading>
                        <Text variant="small" color="muted" className="mt-1">
                          {assignment.className}
                        </Text>
                      </div>
                    </div>

                    {/* 진행률 바 */}
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <Text variant="small" color="muted">완료율</Text>
                        <Text variant="small" weight="medium">
                          {assignment.completedCount} / {assignment.totalStudents}
                        </Text>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{
                            width: `${(assignment.completedCount / assignment.totalStudents) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Text variant="small" color="muted">
                        마감 {formatDate(assignment.dueDate)}
                      </Text>
                      <Badge
                        variant={
                          assignment.completedCount === assignment.totalStudents
                            ? 'success'
                            : 'warning'
                        }
                      >
                        {assignment.completedCount === assignment.totalStudents
                          ? '완료'
                          : '진행 중'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </Stack>
            )}
          </Card.Body>
        </Card>
      </div>

      {/* 확인 대기 중인 제출물 - 전체 너비 */}
      <Card className="mt-6">
        <Card.Header>
          <div className="flex items-center justify-between">
            <Heading level={2}>확인 대기 중인 제출물</Heading>
            {dashboardData.pendingSubmissions.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/teacher/submissions')}
              >
                전체 보기 →
              </Button>
            )}
          </div>
        </Card.Header>
        <Card.Body>
          {dashboardData.pendingSubmissions.length === 0 ? (
            <div className="text-center py-8">
              <svg
                className="w-12 h-12 mx-auto text-gray-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <Text color="muted">확인 대기 중인 제출물이 없습니다</Text>
              <Text variant="small" color="muted" className="mt-1">
                모든 제출물이 검토 완료되었습니다!
              </Text>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">학생</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">과제</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">반</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">AI 점수</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">제출 시간</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">작업</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dashboardData.pendingSubmissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <Text weight="medium">{submission.studentName}</Text>
                      </td>
                      <td className="py-4 px-4">
                        <Text variant="small">{submission.assignmentTitle}</Text>
                      </td>
                      <td className="py-4 px-4">
                        <Text variant="small" color="muted">{submission.className}</Text>
                      </td>
                      <td className="py-4 px-4">
                        <Badge
                          variant={
                            submission.aiScore >= 90
                              ? 'success'
                              : submission.aiScore >= 80
                              ? 'info'
                              : submission.aiScore >= 70
                              ? 'warning'
                              : 'error'
                          }
                        >
                          {submission.aiScore}%
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Text variant="small" color="muted">
                          {getTimeAgo(submission.submittedAt)}
                        </Text>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate('/teacher/submissions')}
                        >
                          검토하기
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card.Body>
      </Card>
    </Page>
  );
};
