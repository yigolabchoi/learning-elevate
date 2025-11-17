/**
 * Teacher Student Detail Page
 * 
 * 개별 학생의 상세 학습 정보를 확인하고 관리하는 페이지
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import { useLanguage } from '../../../i18n';
import { 
  getStudentDetailById, 
  StudentDetail as StudentDetailType,
  saveTeacherNote 
} from '../../../lib/api/mock/teacherStudents';
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
  TextArea,
} from '../../../design-system';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const StudentDetail = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();

  const [student, setStudent] = useState<StudentDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [teacherNote, setTeacherNote] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [showNoteSuccess, setShowNoteSuccess] = useState(false);

  useEffect(() => {
    loadStudentDetail();
  }, [studentId]);

  const loadStudentDetail = async () => {
    if (!studentId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getStudentDetailById(studentId);
      if (!data) {
        setError(language === 'ko'
          ? '학생 정보를 찾을 수 없습니다.'
          : 'Student not found.');
        return;
      }
      setStudent(data);
      setTeacherNote(data.teacherNote || '');
    } catch (err) {
      console.error('Failed to load student detail:', err);
      setError(language === 'ko'
        ? '학생 정보를 불러오는데 실패했습니다.'
        : 'Failed to load student information.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNote = async () => {
    if (!studentId || !user) return;

    setIsSavingNote(true);
    try {
      await saveTeacherNote(studentId, user.id, teacherNote);
      setShowNoteSuccess(true);
      setTimeout(() => setShowNoteSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save note:', err);
      alert(language === 'ko'
        ? '노트 저장에 실패했습니다.'
        : 'Failed to save note.');
    } finally {
      setIsSavingNote(false);
    }
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
            {language === 'ko' ? '학생 정보 로딩 중...' : 'Loading student information...'}
          </Text>
        </Stack>
      </div>
    );
  }

  if (error || !student) {
    return (
      <Page>
        <Alert variant="error" description={error || 'Not found'} />
        <Button variant="primary" onClick={() => navigate('/teacher/students')} className="mt-4">
          {language === 'ko' ? '학생 목록으로' : 'Back to Students'}
        </Button>
      </Page>
    );
  }

  const scoreBadge = getScoreBadge(student.averageScore);

  return (
    <Page>
      <PageHeader
        title={student.name}
        description={`${student.className} • Level ${student.currentLevel}`}
      >
        <Stack direction="horizontal" gap="sm">
          <Button variant="secondary" onClick={() => navigate('/teacher/students')}>
            {language === 'ko' ? '목록으로' : 'Back to List'}
          </Button>
          <Button variant="primary" onClick={() => navigate(`/teacher/assignments/new?studentId=${student.id}`)}>
            {language === 'ko' ? '과제 배정' : 'Assign Task'}
          </Button>
        </Stack>
      </PageHeader>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-300">
          <Card.Body>
            <Text variant="small" color="muted">
              {language === 'ko' ? '평균 점수' : 'Average Score'}
            </Text>
            <div className="flex items-baseline gap-2 mt-1">
              <Text className="text-4xl font-bold text-primary-700">
                {student.averageScore}
              </Text>
              <Badge variant={scoreBadge.variant}>
                {scoreBadge.label}
              </Badge>
            </div>
          </Card.Body>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <Card.Body>
            <Text variant="small" color="muted">
              {language === 'ko' ? '완료 과제' : 'Completed'}
            </Text>
            <Text className="text-4xl font-bold text-blue-700 mt-1">
              {student.completedAssignments}
            </Text>
          </Card.Body>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <Card.Body>
            <Text variant="small" color="muted">
              {language === 'ko' ? '대기 중' : 'Pending'}
            </Text>
            <Text className="text-4xl font-bold text-yellow-700 mt-1">
              {student.pendingAssignments}
            </Text>
          </Card.Body>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <Card.Body>
            <Text variant="small" color="muted">
              {language === 'ko' ? '출석률' : 'Attendance'}
            </Text>
            <Text className="text-4xl font-bold text-purple-700 mt-1">
              {student.attendanceRate}%
            </Text>
          </Card.Body>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Score Trend Chart */}
          <Card>
            <Card.Body>
              <Heading level={3} className="mb-4">
                {language === 'ko' ? '성적 추이' : 'Score Trend'}
              </Heading>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={student.scoreTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#6366f1" 
                      strokeWidth={2}
                      dot={{ fill: '#6366f1', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>

          {/* Recent Submissions */}
          <Card>
            <Card.Body>
              <Heading level={3} className="mb-4">
                {language === 'ko' ? '최근 제출물' : 'Recent Submissions'}
              </Heading>
              <div className="space-y-3">
                {student.recentSubmissions.map((submission) => {
                  const submissionBadge = getScoreBadge(submission.score);
                  return (
                    <div
                      key={submission.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => navigate(`/teacher/submissions?studentId=${student.id}`)}
                    >
                      <div className="flex-1">
                        <Text weight="semibold">{submission.assignmentTitle}</Text>
                        <Text variant="small" color="muted">
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </Text>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={submissionBadge.variant}>
                          {submission.score}
                        </Badge>
                        <Badge variant={
                          submission.status === 'approved' ? 'success' : 'warning'
                        }>
                          {submission.status === 'approved' 
                            ? (language === 'ko' ? '승인됨' : 'Approved')
                            : (language === 'ko' ? '검토 대기' : 'Pending')}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card.Body>
          </Card>

          {/* Learning Progress by Concept */}
          <Card>
            <Card.Body>
              <Heading level={3} className="mb-4">
                {language === 'ko' ? '개념별 학습 진도' : 'Progress by Concept'}
              </Heading>
              <div className="space-y-3">
                {student.conceptProgress.map((concept) => (
                  <div key={concept.concept}>
                    <div className="flex items-center justify-between mb-1">
                      <Text variant="small" weight="semibold">
                        {concept.concept}
                      </Text>
                      <Text variant="small" weight="semibold" className={
                        concept.accuracy >= 80 ? 'text-green-700' :
                        concept.accuracy >= 60 ? 'text-yellow-700' : 'text-red-700'
                      }>
                        {concept.accuracy}%
                      </Text>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          concept.accuracy >= 80 ? 'bg-green-500' :
                          concept.accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${concept.accuracy}%` }}
                      />
                    </div>
                    <Text variant="small" color="muted" className="mt-1">
                      {concept.attemptCount} {language === 'ko' ? '회 시도' : 'attempts'}
                    </Text>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Student Info */}
          <Card>
            <Card.Body>
              <Heading level={3} className="mb-4">
                {language === 'ko' ? '학생 정보' : 'Student Information'}
              </Heading>
              <div className="space-y-3">
                <div>
                  <Text variant="small" color="muted">
                    {language === 'ko' ? '이메일' : 'Email'}
                  </Text>
                  <Text>{student.email}</Text>
                </div>
                <div>
                  <Text variant="small" color="muted">
                    {language === 'ko' ? '학급' : 'Class'}
                  </Text>
                  <Text>{student.className}</Text>
                </div>
                <div>
                  <Text variant="small" color="muted">
                    {language === 'ko' ? '현재 레벨' : 'Current Level'}
                  </Text>
                  <Text weight="bold" className="text-primary-700">
                    Level {student.currentLevel}
                  </Text>
                </div>
                <div>
                  <Text variant="small" color="muted">
                    {language === 'ko' ? '최근 활동' : 'Last Active'}
                  </Text>
                  <Text>
                    {new Date(student.lastActiveAt).toLocaleString()}
                  </Text>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Strengths & Weaknesses */}
          <Card>
            <Card.Body>
              <Heading level={3} className="mb-4">
                {language === 'ko' ? '강점 & 약점' : 'Strengths & Weaknesses'}
              </Heading>
              
              <div className="mb-4">
                <Text variant="small" weight="semibold" className="text-green-700 mb-2 block">
                  💪 {language === 'ko' ? '강점' : 'Strengths'}
                </Text>
                <div className="flex flex-wrap gap-2">
                  {student.topStrengths.map((strength, i) => (
                    <Badge key={i} variant="success">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Text variant="small" weight="semibold" className="text-red-700 mb-2 block">
                  📝 {language === 'ko' ? '개선 필요' : 'Needs Improvement'}
                </Text>
                <div className="flex flex-wrap gap-2">
                  {student.topWeaknesses.map((weakness, i) => (
                    <Badge key={i} variant="error">
                      {weakness}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* AI Recommendation */}
          <Card className="bg-purple-50 border-purple-300">
            <Card.Body>
              <div className="flex items-start gap-2 mb-3">
                <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <Heading level={4} className="text-purple-900">
                  🤖 AI {language === 'ko' ? '추천' : 'Recommendation'}
                </Heading>
              </div>
              <Text className="text-purple-900">
                {student.aiRecommendation}
              </Text>
            </Card.Body>
          </Card>

          {/* Teacher's Note */}
          <Card>
            <Card.Body>
              <Heading level={3} className="mb-4">
                👨‍🏫 {language === 'ko' ? '선생님 노트' : "Teacher's Note"}
              </Heading>
              {showNoteSuccess && (
                <Alert
                  variant="success"
                  description={language === 'ko' ? '노트가 저장되었습니다.' : 'Note saved successfully.'}
                  className="mb-3"
                />
              )}
              <TextArea
                value={teacherNote}
                onChange={(e) => setTeacherNote(e.target.value)}
                placeholder={language === 'ko'
                  ? '이 학생에 대한 메모를 작성하세요...'
                  : 'Write notes about this student...'}
                rows={6}
                fullWidth
              />
              <Button
                variant="primary"
                onClick={handleSaveNote}
                isLoading={isSavingNote}
                className="mt-3"
                fullWidth
              >
                {language === 'ko' ? '노트 저장' : 'Save Note'}
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Page>
  );
};

