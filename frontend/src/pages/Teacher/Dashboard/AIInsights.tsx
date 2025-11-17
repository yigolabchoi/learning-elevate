/**
 * AI Insights Dashboard Component
 * 
 * AI가 자동으로 분석하여 선생님이 우선적으로 신경써야 할 사항들을 표시
 * - 주의가 필요한 학생
 * - 대기 중인 작업 (우선순위 자동 정렬)
 * - 자동 추천 과제
 * - 빠른 액션
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../i18n';
import { getAIInsights, AIInsight } from '../../../lib/api/mock/aiInsights';
import {
  Card,
  Badge,
  Button,
  Spinner,
  Text,
  Heading,
  Stack,
  Alert,
} from '../../../design-system';
import { AlertTriangle, TrendingDown, Clock, Zap, Users, CheckCircle } from 'lucide-react';

interface AIInsightsDashboardProps {
  teacherId: string;
}

export const AIInsightsDashboard = ({ teacherId }: AIInsightsDashboardProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [insights, setInsights] = useState<AIInsight | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInsights();
  }, [teacherId]);

  const loadInsights = async () => {
    setIsLoading(true);
    try {
      const data = await getAIInsights(teacherId);
      setInsights(data);
    } catch (error) {
      console.error('Failed to load AI insights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!insights) return null;

  return (
    <div className="space-y-6">
      {/* AI 요약 */}
      <Card className="bg-linear-to-r from-purple-50 to-blue-50 border-2 border-purple-300">
        <Card.Body>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <Heading level={3} className="text-purple-900 mb-2">
                🤖 AI {language === 'ko' ? '분석 요약' : 'Analysis Summary'}
              </Heading>
              <Text className="text-purple-900 mb-3">
                {insights.summary}
              </Text>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/80 rounded-lg p-3">
                  <Text variant="small" color="muted">
                    {language === 'ko' ? '오늘 할 일' : 'Today'}
                  </Text>
                  <Text className="text-2xl font-bold text-purple-700">
                    {insights.todayActionCount}
                  </Text>
                </div>
                <div className="bg-white/80 rounded-lg p-3">
                  <Text variant="small" color="muted">
                    {language === 'ko' ? '예상 시간' : 'Est. Time'}
                  </Text>
                  <Text className="text-2xl font-bold text-purple-700">
                    {insights.estimatedTime}
                    <Text variant="small" className="inline ml-1">{language === 'ko' ? '분' : 'min'}</Text>
                  </Text>
                </div>
                <div className="bg-white/80 rounded-lg p-3">
                  <Text variant="small" color="muted">
                    {language === 'ko' ? '자동화 가능' : 'Auto-ready'}
                  </Text>
                  <Text className="text-2xl font-bold text-green-600">
                    {insights.autoApprovalReady}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* 긴급: 주의 필요 학생 */}
      {insights.urgentStudents.length > 0 && (
        <Card className="border-2 border-red-300">
          <Card.Body>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <Heading level={3} className="text-red-900">
                  ⚠️ {language === 'ko' ? '긴급: 주의 필요 학생' : 'Urgent: Students Need Attention'}
                </Heading>
                <Badge variant="error">{insights.urgentStudents.length}</Badge>
              </div>
            </div>
            <div className="space-y-3">
              {insights.urgentStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                  onClick={() => navigate(`/teacher/students/${student.id}`)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center">
                      <Text weight="bold" className="text-red-700">
                        {student.name.charAt(0)}
                      </Text>
                    </div>
                    <div className="flex-1">
                      <Text weight="semibold">{student.name}</Text>
                      <Text variant="small" className="text-red-700">
                        <TrendingDown className="w-3 h-3 inline mr-1" />
                        {student.reason}
                      </Text>
                    </div>
                    <div className="text-right">
                      <Badge variant="error">{student.score}{language === 'ko' ? '점' : 'pts'}</Badge>
                      <Text variant="small" color="muted" className="block mt-1">
                        {student.daysInactive}{language === 'ko' ? '일 비활동' : 'd inactive'}
                      </Text>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    {language === 'ko' ? '확인' : 'View'} →
                  </Button>
                </div>
              ))}
            </div>
            <Button
              variant="primary"
              fullWidth
              className="mt-4"
              onClick={() => navigate('/teacher/students?filter=urgent')}
            >
              {language === 'ko' ? '모든 주의 학생 보기' : 'View All Urgent Students'}
            </Button>
          </Card.Body>
        </Card>
      )}

      {/* 빠른 승인 가능 (AI 신뢰도 높음) */}
      {insights.quickApprovalReady.length > 0 && (
        <Card className="border-2 border-green-300">
          <Card.Body>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <Heading level={3} className="text-green-900">
                  ⚡ {language === 'ko' ? '빠른 승인 가능 (AI 신뢰도 높음)' : 'Quick Approval Ready (High Confidence)'}
                </Heading>
                <Badge variant="success">{insights.quickApprovalReady.length}</Badge>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  if (window.confirm(language === 'ko'
                    ? `${insights.quickApprovalReady.length}개 제출물을 일괄 승인하시겠습니까?\n\nAI가 높은 신뢰도로 채점한 제출물들입니다.`
                    : `Approve all ${insights.quickApprovalReady.length} submissions?\n\nThese are high-confidence AI graded submissions.`)) {
                    // Bulk approval logic
                    alert(language === 'ko' ? '일괄 승인되었습니다!' : 'Approved successfully!');
                    loadInsights();
                  }
                }}
              >
                {language === 'ko' ? `${insights.quickApprovalReady.length}개 일괄 승인` : `Approve All ${insights.quickApprovalReady.length}`}
              </Button>
            </div>
            <Alert
              variant="info"
              description={language === 'ko'
                ? '이 제출물들은 AI가 95% 이상의 신뢰도로 채점했습니다. 빠르게 승인하고 학생들에게 피드백을 전달하세요.'
                : 'These submissions were graded by AI with >95% confidence. Quickly approve and send feedback to students.'}
              className="mb-3"
            />
            <div className="space-y-2">
              {insights.quickApprovalReady.slice(0, 3).map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="success">
                      {submission.score}
                    </Badge>
                    <div>
                      <Text weight="semibold">{submission.studentName}</Text>
                      <Text variant="small" color="muted">{submission.assignmentTitle}</Text>
                    </div>
                  </div>
                  <Badge variant="info">
                    AI {submission.confidence}%
                  </Badge>
                </div>
              ))}
              {insights.quickApprovalReady.length > 3 && (
                <Text variant="small" color="muted" className="text-center pt-2">
                  +{insights.quickApprovalReady.length - 3} {language === 'ko' ? '개 더' : 'more'}
                </Text>
              )}
            </div>
          </Card.Body>
        </Card>
      )}

      {/* AI 추천 과제 */}
      {insights.recommendedAssignments.length > 0 && (
        <Card className="border-2 border-blue-300">
          <Card.Body>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-blue-600" />
              <Heading level={3} className="text-blue-900">
                💡 {language === 'ko' ? 'AI 추천 과제' : 'AI Recommended Assignments'}
              </Heading>
            </div>
            <Text variant="small" color="muted" className="mb-4">
              {language === 'ko'
                ? '학생들의 학습 패턴과 약점을 분석하여 AI가 자동으로 추천한 과제입니다.'
                : 'AI analyzed student learning patterns and weaknesses to recommend these assignments.'}
            </Text>
            <div className="space-y-3">
              {insights.recommendedAssignments.map((rec) => (
                <div
                  key={rec.id}
                  className="flex items-start justify-between p-4 bg-blue-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Text weight="semibold">{rec.title}</Text>
                      <Badge variant="info">{rec.targetStudentCount} {language === 'ko' ? '명' : 'students'}</Badge>
                    </div>
                    <Text variant="small" className="text-blue-900 mb-2">
                      {rec.reason}
                    </Text>
                    <div className="flex flex-wrap gap-2">
                      {rec.conceptTags.map((tag) => (
                        <span key={tag} className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="ml-4"
                    onClick={() => {
                      if (window.confirm(language === 'ko'
                        ? `"${rec.title}" 과제를 ${rec.targetStudentCount}명의 학생에게 배정하시겠습니까?`
                        : `Assign "${rec.title}" to ${rec.targetStudentCount} students?`)) {
                        alert(language === 'ko' ? '과제가 배정되었습니다!' : 'Assignment created!');
                        loadInsights();
                      }
                    }}
                  >
                    {language === 'ko' ? '배정' : 'Assign'}
                  </Button>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      )}

      {/* 오늘의 우선순위 작업 */}
      <Card>
        <Card.Body>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-gray-600" />
            <Heading level={3}>
              📋 {language === 'ko' ? '오늘의 우선순위 작업' : "Today's Priority Tasks"}
            </Heading>
          </div>
          <div className="space-y-2">
            {insights.priorityTasks.map((task, index) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => navigate(task.link)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  task.priority === 'high' ? 'bg-red-100 text-red-700' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <Text weight="semibold">{task.title}</Text>
                  <Text variant="small" color="muted">{task.description}</Text>
                </div>
                <div className="text-right">
                  <Badge variant={
                    task.priority === 'high' ? 'error' :
                    task.priority === 'medium' ? 'warning' : 'info'
                  }>
                    {task.estimatedTime}{language === 'ko' ? '분' : 'min'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

