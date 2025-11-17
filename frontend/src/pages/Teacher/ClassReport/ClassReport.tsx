/**
 * Teacher Class Report Page
 * 
 * Detailed analytics and report for a specific class.
 * Shows overall class performance, trends, and student comparisons.
 * 
 * Future implementation:
 * - Class overview statistics
 * - Performance trends over time
 * - Student ranking and distribution
 * - Concept mastery heatmap
 * - Assignment completion rates
 * - Average scores by topic
 * - Identify struggling students
 * - Export reports
 */

import { useParams } from 'react-router-dom';

export const ClassReport = () => {
  const { classId } = useParams();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Class 1A Report</h1>
        <p className="text-gray-600">Performance analytics and insights | Class ID: {classId}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600 mb-2">Total Students</p>
          <p className="text-3xl font-bold">32</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600 mb-2">Average Score</p>
          <p className="text-3xl font-bold text-primary-500">74%</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600 mb-2">Completion Rate</p>
          <p className="text-3xl font-bold text-green-500">89%</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600 mb-2">At Risk</p>
          <p className="text-3xl font-bold text-red-500">4</p>
        </div>
      </div>

      {/* Performance Trends */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Performance Trends</h2>
        <div className="h-64 flex items-center justify-center border border-gray-200 rounded">
          <p className="text-gray-500">[Chart: Class average over time]</p>
        </div>
      </div>

      {/* Top Performers & At Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Top Performers</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-semibold">
                    {i}
                  </div>
                  <span>Student {i}</span>
                </div>
                <span className="font-semibold text-green-600">
                  {95 - i * 2}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Needs Attention</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-700">
                    ⚠
                  </div>
                  <span>Student {i + 20}</span>
                </div>
                <span className="font-semibold text-red-600">
                  {45 + i * 5}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

