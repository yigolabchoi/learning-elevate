/**
 * Parent Child Details Page
 * 
 * Provides detailed report with assignments list and category performance.
 * 
 * Features:
 * - Period selection (30/90 days)
 * - Assignments table
 * - Category performance chart
 * - Improvements and concerns
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ParentChildDetails } from '../../../types';
import { getChildDetails } from '../../../lib/api/mock/parentDetails';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

type Period = '30' | '90';

export const ChildDetails = () => {
  const { childId } = useParams<{ childId: string }>();
  const navigate = useNavigate();
  const [details, setDetails] = useState<ParentChildDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState<Period>('30');

  useEffect(() => {
    loadDetails();
  }, [childId, period]);

  const loadDetails = async () => {
    if (!childId) return;

    setIsLoading(true);
    try {
      const data = await getChildDetails(childId, period);
      setDetails(data);
    } catch (error) {
      console.error('Failed to load details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePeriodChange = (newPeriod: Period) => {
    setPeriod(newPeriod);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getBarColor = (score: number) => {
    if (score >= 90) return '#22c55e'; // green
    if (score >= 80) return '#3b82f6'; // blue
    if (score >= 70) return '#f59e0b'; // orange
    return '#ef4444'; // red
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">Loading details...</p>
        </div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Details Not Found</h3>
          <p className="text-gray-600 mb-4">Unable to load details for this child.</p>
          <button
            onClick={() => navigate('/parent/children')}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Back to My Children
          </button>
        </div>
      </div>
    );
  }

  // Prepare chart data
  const chartData = details.categoryStats.map((stat) => ({
    category: stat.category,
    score: stat.avgScore,
  }));

  return (
    <div className="p-6">
      {/* Navigation */}
      <button
        onClick={() => navigate(`/parent/dashboard/${childId}`)}
        className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </button>

      {/* Header with Period Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{details.childName}</h1>
            <p className="text-gray-600">Detailed Performance Report</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Period:</label>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => handlePeriodChange('30')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  period === '30'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Last 30 Days
              </button>
              <button
                onClick={() => handlePeriodChange('90')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  period === '90'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Last 90 Days
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Assignments Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Assignments Overview</h2>
          <p className="text-sm text-gray-600 mt-1">
            {details.assignments.length} assignment{details.assignments.length !== 1 ? 's' : ''} completed
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Assignment
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Completed
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {details.assignments.map((assignment) => (
                <tr key={assignment.assignmentId} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{assignment.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{assignment.unitTitle}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{formatDate(assignment.completedAt)}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(
                        assignment.score
                      )}`}
                    >
                      {assignment.score}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Category Performance</h2>
        <p className="text-sm text-gray-600 mb-6">Average scores by skill category</p>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="category"
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                domain={[0, 100]}
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
                label={{ value: 'Average Score (%)', angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}
                labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                formatter={(value: number) => [`${value}%`, 'Avg Score']}
              />
              <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-600">90-100% Excellent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-gray-600">80-89% Good</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-gray-600">70-79% Fair</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-gray-600">&lt;70% Needs Improvement</span>
          </div>
        </div>
      </div>

      {/* Highlights & Concerns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Improvements / Highlights */}
        <div className="bg-white border-2 border-green-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-xl font-bold text-gray-900">Improvements & Highlights</h2>
          </div>
          {details.improvements.length > 0 ? (
            <ul className="space-y-3">
              {details.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-600 mt-1 shrink-0">✓</span>
                  <span className="text-gray-700 leading-relaxed">{improvement}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No improvements noted for this period.</p>
          )}
        </div>

        {/* Concerns / Areas for Improvement */}
        <div className="bg-white border-2 border-orange-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-xl font-bold text-gray-900">Areas for Improvement</h2>
          </div>
          {details.concerns.length > 0 ? (
            <ul className="space-y-3">
              {details.concerns.map((concern, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-orange-600 mt-1 shrink-0">!</span>
                  <span className="text-gray-700 leading-relaxed">{concern}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No concerns noted for this period.</p>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How to Use This Report</h3>
            <p className="text-gray-700 leading-relaxed">
              This detailed report shows all completed assignments and performance by category for the selected time period.
              Review the improvements and concerns to understand where your child excels and where they may need additional support.
              Consider discussing these insights with your child or their teacher to create an action plan for continued growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
