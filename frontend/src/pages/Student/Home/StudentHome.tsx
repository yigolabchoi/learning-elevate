/**
 * Student Home Page (디자인 시스템 적용)
 * 
 * 학생 메인 대시보드:
 * - 다가오는 과제
 * - 최근 점수 및 성과
 * - 연습 모드 빠른 접근
 * - 학습 진행 상황 개요
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import { StudentAssignment } from '../../../types';
import { getStudentAssignments } from '../../../lib/api/mock/studentAssignments';
import {
  Page,
  PageHeader,
  Card,
  StatCard,
  Badge,
  Spinner,
  Text,
  Heading,
  Stack,
} from '../../../design-system';

export const StudentHome = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<StudentAssignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const data = await getStudentAssignments(user.id);
      setAssignments(data);
    } catch (error) {
      console.error('Failed to load assignments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 오늘과 다가오는 과제 필터링 (완료되지 않은 것)
  const upcomingAssignments = assignments
    .filter((a) => a.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  const inProgressCount = assignments.filter((a) => a.status === 'in_progress').length;
  const completedThisWeek = assignments.filter((a) => {
    if (a.status !== 'completed') return false;
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return new Date(a.dueDate) > oneWeekAgo;
  }).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `${Math.abs(diffDays)}일 지남`;
    } else if (diffDays === 0) {
      return '오늘 마감';
    } else if (diffDays === 1) {
      return '내일 마감';
    } else {
      return `${diffDays}일 남음`;
    }
  };

  const getStatusBadgeVariant = (assignment: StudentAssignment): 'error' | 'neutral' | 'info' | 'success' => {
    const isOverdue = new Date(assignment.dueDate) < new Date() && assignment.status !== 'completed';
    
    if (isOverdue) return 'error';
    
    switch (assignment.status) {
      case 'not_started':
        return 'neutral';
      case 'in_progress':
        return 'info';
      case 'completed':
        return 'success';
      default:
        return 'neutral';
    }
  };

  const getStatusLabel = (assignment: StudentAssignment) => {
    const isOverdue = new Date(assignment.dueDate) < new Date() && assignment.status !== 'completed';
    
    if (isOverdue) return '마감 지남';
    
    switch (assignment.status) {
      case 'not_started':
        return '시작 전';
      case 'in_progress':
        return '진행 중';
      case 'completed':
        return '완료';
      default:
        return assignment.status;
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Stack direction="vertical" align="center" gap="md">
          <Spinner size="lg" />
          <Text color="muted">로딩 중...</Text>
        </Stack>
      </div>
    );
  }

  return (
    <Page>
      {/* 헤더 */}
      <PageHeader
        title={`환영합니다, ${user?.name}님!`}
        description="학습 현황을 확인하세요"
      />

      {/* 빠른 상태 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="진행 중"
          value={inProgressCount.toString()}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          }
        />

        <StatCard
          label="이번 주 완료"
          value={completedThisWeek.toString()}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />

        <StatCard
          label="다가오는 과제"
          value={upcomingAssignments.length.toString()}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
      </div>

      {/* 오늘의 과제 */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <Heading level={2}>오늘의 과제</Heading>
            <Link
              to="/student/assignments"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              전체 보기 →
            </Link>
          </div>
        </Card.Header>

        <Card.Body>
          {upcomingAssignments.length === 0 ? (
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
              <Text color="muted">다가오는 과제가 없습니다. 훌륭해요!</Text>
            </div>
          ) : (
            <Stack direction="vertical" gap="md">
              {upcomingAssignments.map((assignment) => (
                <Link
                  key={assignment.id}
                  to={`/student/assignments/${assignment.id}`}
                  className="block border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Heading level={3} className="text-lg mb-2">
                        {assignment.title}
                      </Heading>
                      
                      <Stack direction="vertical" gap="xs" className="mb-3">
                        <Text variant="small" color="muted">
                          <span className="font-medium">반:</span> {assignment.className}
                        </Text>
                        <Text variant="small" color="muted">
                          <span className="font-medium">단원:</span> {assignment.unitTitle}
                        </Text>
                      </Stack>

                      <Stack direction="horizontal" gap="md" className="text-sm">
                        <Badge variant={getStatusBadgeVariant(assignment)}>
                          {getStatusLabel(assignment)}
                        </Badge>
                        <Text variant="small" color="muted">
                          {formatDate(assignment.dueDate)}
                        </Text>
                      </Stack>
                    </div>

                    <div className="ml-4 text-right">
                      <Text variant="small" color="muted" className="mb-2">
                        진행률
                      </Text>
                      <Text className="text-2xl font-bold text-gray-900">
                        {assignment.completedQuestions}/{assignment.totalQuestions}
                      </Text>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full"
                          style={{
                            width: `${(assignment.completedQuestions / assignment.totalQuestions) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Stack>
          )}
        </Card.Body>
      </Card>
    </Page>
  );
};
