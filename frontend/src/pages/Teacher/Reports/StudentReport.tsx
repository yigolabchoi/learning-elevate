/**
 * Student Report Page
 * 
 * Detailed performance report for an individual student.
 * Shows score trend, recent assignments, and weakness analysis.
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StudentReport as StudentReportType } from '../../../types';
import { getStudentReport } from '../../../lib/api/mock/reports';

export const StudentReport = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();

  const [report, setReport] = useState<StudentReportType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId) {
      setError('Student ID is required');
      setIsLoading(false);
      return;
    }

    loadData();
  }, [studentId]);

  const loadData = async () => {
    if (!studentId) return;

    setIsLoading(true);
    setError(null);

    try {
      const reportData = await getStudentReport(studentId);

      if (!reportData) {
        setError('Student report not found');
        return;
      }

      setReport(reportData);
    } catch (err) {
      console.error('Failed to load student report:', err);
      setError('Failed to load student report');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return 'bg-purple-100 text-purple-700';
      case 'intermediate':
        return 'bg-blue-100 text-blue-700';
      case 'beginner':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">Loading student report...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Error</h3>
          <p className="text-red-600 mb-4">{error || 'Student report not found'}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Calculate current average from recent assignments
  const currentAverage =
    report.recentAssignments.length > 0
      ? report.recentAssignments.reduce((sum, a) => sum + a.score, 0) / report.recentAssignments.length
      : 0;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(`/teacher/classes/${report.classId}`)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Class Report
        </button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{report.studentName}</h1>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-gray-600">{report.className}</p>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelBadgeColor(report.currentLevel)}`}>
                {report.currentLevel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <p className={`text-2xl font-bold ${getScoreColor(currentAverage)}`}>
                {currentAverage.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600">Current Average</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{report.recentAssignments.length}</p>
              <p className="text-sm text-gray-600">Assignments Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{report.weaknessTags.length}</p>
              <p className="text-sm text-gray-600">Areas to Improve</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-linear-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Learning Summary</h3>
            <p className="text-gray-700 leading-relaxed">
              {report.studentName} is currently performing at a {report.currentLevel.toLowerCase()} level. 
              {currentAverage >= 85 
                ? " The student shows strong understanding across most concepts and maintains consistent high performance."
                : currentAverage >= 70
                ? " The student demonstrates good progress with room for improvement in specific areas identified below."
                : " The student would benefit from additional support in the highlighted weakness areas."}
              {report.trendData.length >= 2 && report.trendData[report.trendData.length - 1].score > report.trendData[0].score
                ? " There is a positive upward trend in recent performance, indicating effective learning."
                : " Focus on the identified weak areas to improve overall performance."}
            </p>
          </div>
        </div>
      </div>

      {/* Score Trend */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Score Trend</h2>
        
        <div className="mb-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={report.trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                tick={{ fontSize: 12 }}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                labelFormatter={(value) => `Date: ${formatDate(value as string)}`}
                formatter={(value: number) => [`${value}%`, 'Score']}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Highest Score</p>
            <p className="text-lg font-bold text-green-600">
              {Math.max(...report.trendData.map((d) => d.score))}%
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Lowest Score</p>
            <p className="text-lg font-bold text-red-600">
              {Math.min(...report.trendData.map((d) => d.score))}%
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Latest Score</p>
            <p className={`text-lg font-bold ${getScoreColor(report.trendData[report.trendData.length - 1].score)}`}>
              {report.trendData[report.trendData.length - 1].score}%
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Average Score</p>
            <p className={`text-lg font-bold ${getScoreColor(currentAverage)}`}>
              {currentAverage.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Recent Assignments */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Assignments</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {report.recentAssignments.map((assignment) => (
                <tr key={assignment.assignmentId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {assignment.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${getScoreColor(assignment.score)}`}>
                        {assignment.score}%
                      </span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            assignment.score >= 90
                              ? 'bg-green-500'
                              : assignment.score >= 70
                              ? 'bg-blue-500'
                              : assignment.score >= 50
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${assignment.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(assignment.submittedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weakness Tags */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Areas to Improve</h2>
        
        {report.weaknessTags.length === 0 ? (
          <div className="text-center py-8">
            <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600">No significant weaknesses identified. Great job!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.weaknessTags.map((tag) => (
              <div
                key={tag.conceptTag}
                className={`border-2 rounded-lg p-4 ${
                  tag.accuracy < 60
                    ? 'border-red-300 bg-red-50'
                    : tag.accuracy < 75
                    ? 'border-yellow-300 bg-yellow-50'
                    : 'border-blue-300 bg-blue-50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{tag.conceptTag}</h3>
                  <div className="flex items-center gap-2">
                    <svg
                      className={`w-5 h-5 ${
                        tag.accuracy < 60
                          ? 'text-red-600'
                          : tag.accuracy < 75
                          ? 'text-yellow-600'
                          : 'text-blue-600'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span
                      className={`text-lg font-bold ${
                        tag.accuracy < 60
                          ? 'text-red-600'
                          : tag.accuracy < 75
                          ? 'text-yellow-600'
                          : 'text-blue-600'
                      }`}
                    >
                      {tag.accuracy}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full ${
                      tag.accuracy < 60
                        ? 'bg-red-500'
                        : tag.accuracy < 75
                        ? 'bg-yellow-500'
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${tag.accuracy}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {tag.accuracy < 60
                    ? 'Needs immediate attention'
                    : tag.accuracy < 75
                    ? 'Requires additional practice'
                    : 'Minor improvement needed'}
                </p>
              </div>
            ))}
          </div>
        )}

        {report.weaknessTags.length > 0 && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Recommendation</h4>
            <p className="text-sm text-blue-800">
              Focus on targeted practice for {report.weaknessTags[0].conceptTag} 
              {report.weaknessTags.length > 1 && ` and ${report.weaknessTags[1].conceptTag}`}.
              Consider creating custom problem sets for these specific areas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

