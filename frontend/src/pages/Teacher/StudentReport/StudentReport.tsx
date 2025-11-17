/**
 * Teacher Student Report Page
 * 
 * Detailed analytics for an individual student.
 * Shows student's progress, strengths, weaknesses, and learning patterns.
 * 
 * Future implementation:
 * - Student profile and basic info
 * - Overall performance metrics
 * - Progress over time (charts)
 * - Strengths and weaknesses analysis
 * - Concept mastery breakdown
 * - Assignment history
 * - Submission quality trends
 * - Recommended focus areas
 * - Parent communication log
 * - Export student report
 */

import { useParams } from 'react-router-dom';

export const StudentReport = () => {
  const { studentId } = useParams();

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-2xl font-bold text-primary-700">
            KS
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kim Student</h1>
            <p className="text-gray-600">Class 1A | Student ID: {studentId}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600 mb-2">Current Level</p>
          <p className="text-3xl font-bold text-primary-500">Level 5</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600 mb-2">Overall Average</p>
          <p className="text-3xl font-bold">72%</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600 mb-2">Assignments</p>
          <p className="text-3xl font-bold text-green-500">18/20</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600 mb-2">Study Time</p>
          <p className="text-3xl font-bold">8.5h</p>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Progress Over Time</h2>
        <div className="h-64 flex items-center justify-center border border-gray-200 rounded">
          <p className="text-gray-500">[Chart: Student scores over time]</p>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">💪 Strengths</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Basic Tenses</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '90%' }}></div>
                </div>
                <span className="font-semibold text-green-600">90%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Modals</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '85%' }}></div>
                </div>
                <span className="font-semibold text-green-600">85%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Vocabulary</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '88%' }}></div>
                </div>
                <span className="font-semibold text-green-600">88%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">🎯 Needs Improvement</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Present Perfect</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: '35%' }}></div>
                </div>
                <span className="font-semibold text-red-600">35%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Prepositions</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: '45%' }}></div>
                </div>
                <span className="font-semibold text-yellow-600">45%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Relative Clauses</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: '60%' }}></div>
                </div>
                <span className="font-semibold text-yellow-600">60%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">📋 Recommendations</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-primary-700 text-sm">1</span>
            </div>
            <div>
              <p className="font-medium">Focus on Present Perfect tense</p>
              <p className="text-sm text-gray-600 mt-1">
                Student shows difficulty with have/has + past participle structures. 
                Recommend additional practice sets and 1-on-1 review.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-primary-700 text-sm">2</span>
            </div>
            <div>
              <p className="font-medium">Preposition drills needed</p>
              <p className="text-sm text-gray-600 mt-1">
                Common mistakes with in/on/at. Consider assigning targeted exercises 
                and real-world examples.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

