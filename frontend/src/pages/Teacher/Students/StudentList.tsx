/**
 * Teacher Students List Page
 * 
 * 선생님이 담당하는 모든 학생의 목록과 개요를 확인하는 페이지
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import { useLanguage } from '../../../i18n';
import { getStudentsByTeacher, StudentWithStats } from '../../../lib/api/mock/teacherStudents';
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
  Input,
  Select,
} from '../../../design-system';

export const StudentList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, language } = useLanguage();

  const [students, setStudents] = useState<StudentWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedPerformance, setSelectedPerformance] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'score' | 'activity'>('name');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getStudentsByTeacher(user.id);
      setStudents(data);
    } catch (err) {
      console.error('Failed to load students:', err);
      setError(language === 'ko'
        ? '학생 목록을 불러오는데 실패했습니다.'
        : 'Failed to load students.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and sort students
  const filteredAndSortedStudents = students
    .filter(student => {
      // Search filter
      if (searchQuery && !student.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Class filter
      if (selectedClass && student.className !== selectedClass) {
        return false;
      }

      // Performance filter
      if (selectedPerformance) {
        const avg = student.averageScore;
        if (selectedPerformance === 'excellent' && avg < 90) return false;
        if (selectedPerformance === 'good' && (avg < 70 || avg >= 90)) return false;
        if (selectedPerformance === 'needs-improvement' && avg >= 70) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'score') {
        return b.averageScore - a.averageScore;
      } else { // activity
        return new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime();
      }
    });

  // Get unique classes
  const uniqueClasses = Array.from(new Set(students.map(s => s.className)));

  // Calculate statistics
  const totalStudents = filteredAndSortedStudents.length;
  const averageScore = totalStudents > 0
    ? Math.round(filteredAndSortedStudents.reduce((sum, s) => sum + s.averageScore, 0) / totalStudents)
    : 0;
  const excellentStudents = filteredAndSortedStudents.filter(s => s.averageScore >= 90).length;
  const needsAttention = filteredAndSortedStudents.filter(s => s.averageScore < 70).length;

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { variant: 'success' as const, label: 'A' };
    if (score >= 80) return { variant: 'info' as const, label: 'B' };
    if (score >= 70) return { variant: 'warning' as const, label: 'C' };
    return { variant: 'error' as const, label: 'D' };
  };

  const getActivityStatus = (lastActive: string) => {
    const daysSince = Math.floor((Date.now() - new Date(lastActive).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSince === 0) return { label: language === 'ko' ? '오늘' : 'Today', variant: 'success' as const };
    if (daysSince <= 3) return { label: language === 'ko' ? '최근' : 'Recent', variant: 'info' as const };
    if (daysSince <= 7) return { label: language === 'ko' ? '1주일 전' : '1 week ago', variant: 'warning' as const };
    return { label: language === 'ko' ? '오래됨' : 'Inactive', variant: 'error' as const };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Stack direction="vertical" align="center" gap="md">
          <Spinner size="lg" />
          <Text color="muted">
            {language === 'ko' ? '학생 목록 로딩 중...' : 'Loading students...'}
          </Text>
        </Stack>
      </div>
    );
  }

  if (error) {
    return (
      <Page>
        <Alert variant="error" description={error} />
        <Button variant="primary" onClick={loadStudents} className="mt-4">
          {language === 'ko' ? '다시 시도' : 'Retry'}
        </Button>
      </Page>
    );
  }

  return (
    <Page>
      <PageHeader
        title={language === 'ko' ? '학생 관리' : 'Student Management'}
        description={language === 'ko'
          ? '담당 학생들의 학습 현황을 확인하고 개별 지도하세요'
          : 'Monitor and guide your students individually'}
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-blue-50 border-blue-200">
          <Card.Body>
            <Text variant="small" color="muted">
              {language === 'ko' ? '전체 학생' : 'Total Students'}
            </Text>
            <div className="flex items-baseline gap-2 mt-1">
              <Text className="text-3xl font-bold text-blue-700">
                {totalStudents}
              </Text>
              <Text variant="small" color="muted">
                {language === 'ko' ? '명' : 'students'}
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
              {language === 'ko' ? '우수 학생' : 'Excellent (≥90)'}
            </Text>
            <div className="flex items-baseline gap-2 mt-1">
              <Text className="text-3xl font-bold text-purple-700">
                {excellentStudents}
              </Text>
              <Text variant="small" color="muted">
                {language === 'ko' ? '명' : 'students'}
              </Text>
            </div>
          </Card.Body>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <Card.Body>
            <Text variant="small" color="muted">
              {language === 'ko' ? '주의 필요' : 'Needs Attention'}
            </Text>
            <div className="flex items-baseline gap-2 mt-1">
              <Text className="text-3xl font-bold text-red-700">
                {needsAttention}
              </Text>
              <Text variant="small" color="muted">
                {language === 'ko' ? '명' : 'students'}
              </Text>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <Card.Body>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder={language === 'ko' ? '학생 이름 검색...' : 'Search student name...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />

            <Select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">{language === 'ko' ? '전체 반' : 'All Classes'}</option>
              {uniqueClasses.map(className => (
                <option key={className} value={className}>{className}</option>
              ))}
            </Select>

            <Select
              value={selectedPerformance}
              onChange={(e) => setSelectedPerformance(e.target.value)}
            >
              <option value="">{language === 'ko' ? '전체 성적' : 'All Performance'}</option>
              <option value="excellent">{language === 'ko' ? '우수 (90+)' : 'Excellent (≥90)'}</option>
              <option value="good">{language === 'ko' ? '양호 (70-89)' : 'Good (70-89)'}</option>
              <option value="needs-improvement">{language === 'ko' ? '주의 필요 (<70)' : 'Needs Attention (<70)'}</option>
            </Select>

            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="name">{language === 'ko' ? '이름순' : 'Sort by Name'}</option>
              <option value="score">{language === 'ko' ? '점수순' : 'Sort by Score'}</option>
              <option value="activity">{language === 'ko' ? '활동순' : 'Sort by Activity'}</option>
            </Select>
          </div>
        </Card.Body>
      </Card>

      {/* Student List */}
      {filteredAndSortedStudents.length === 0 ? (
        <Card>
          <Card.Body className="p-12">
            <Stack direction="vertical" align="center" gap="md">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <Text color="muted" className="text-center">
                {language === 'ko'
                  ? '조건에 맞는 학생이 없습니다.'
                  : 'No students found.'}
              </Text>
            </Stack>
          </Card.Body>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedStudents.map((student) => {
            const scoreBadge = getScoreBadge(student.averageScore);
            const activityStatus = getActivityStatus(student.lastActiveAt);

            return (
              <Card
                key={student.id}
                className="hover:shadow-xl transition-all cursor-pointer border-2 hover:border-primary-300"
                onClick={() => navigate(`/teacher/students/${student.id}`)}
              >
                <Card.Body>
                  <Stack direction="vertical" gap="md">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <Text weight="bold" className="text-lg">
                            {student.name}
                          </Text>
                          <Text variant="small" color="muted">
                            {student.className}
                          </Text>
                        </div>
                      </div>
                      <Badge variant={activityStatus.variant}>
                        {activityStatus.label}
                      </Badge>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <Text variant="small" color="muted" className="mb-1">
                          {language === 'ko' ? '평균 점수' : 'Average'}
                        </Text>
                        <div className="flex items-baseline gap-2">
                          <Text className="text-2xl font-bold text-primary-700">
                            {student.averageScore}
                          </Text>
                          <Badge variant={scoreBadge.variant} size="sm">
                            {scoreBadge.label}
                          </Badge>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <Text variant="small" color="muted" className="mb-1">
                          {language === 'ko' ? '레벨' : 'Level'}
                        </Text>
                        <Text className="text-2xl font-bold text-primary-700">
                          {student.currentLevel}
                        </Text>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <Text variant="small" color="muted" className="mb-1">
                          {language === 'ko' ? '완료 과제' : 'Completed'}
                        </Text>
                        <Text className="text-xl font-bold text-gray-700">
                          {student.completedAssignments}
                        </Text>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <Text variant="small" color="muted" className="mb-1">
                          {language === 'ko' ? '대기 중' : 'Pending'}
                        </Text>
                        <Text className="text-xl font-bold text-gray-700">
                          {student.pendingAssignments}
                        </Text>
                      </div>
                    </div>

                    {/* Strengths & Weaknesses */}
                    {student.topStrengths.length > 0 && (
                      <div>
                        <Text variant="small" weight="semibold" className="text-green-700 mb-1">
                          💪 {language === 'ko' ? '강점' : 'Strengths'}
                        </Text>
                        <div className="flex flex-wrap gap-1">
                          {student.topStrengths.slice(0, 2).map((strength, i) => (
                            <span key={i} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              {strength}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {student.topWeaknesses.length > 0 && (
                      <div>
                        <Text variant="small" weight="semibold" className="text-red-700 mb-1">
                          📝 {language === 'ko' ? '개선 필요' : 'Needs Work'}
                        </Text>
                        <div className="flex flex-wrap gap-1">
                          {student.topWeaknesses.slice(0, 2).map((weakness, i) => (
                            <span key={i} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                              {weakness}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* View Details Button */}
                    <Button variant="primary" size="sm" fullWidth>
                      {language === 'ko' ? '상세 보기' : 'View Details'} →
                    </Button>
                  </Stack>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </Page>
  );
};

