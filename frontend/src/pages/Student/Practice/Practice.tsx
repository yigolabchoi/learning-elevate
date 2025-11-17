/**
 * Student Practice Page
 * 
 * Free practice mode where students can solve additional problems.
 * 
 * Features:
 * - Recommended practice sets based on weaknesses
 * - Browse all practice sets
 * - Filter by difficulty, concept, or status
 * - Start practice session
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import { PracticeSet, PracticeDifficulty, PracticeStatus } from '../../../types';
import { getPracticeSets } from '../../../lib/api/mock/studentPractice';

export const StudentPractice = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [practiceSets, setPracticeSets] = useState<PracticeSet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters
  const [difficultyFilter, setDifficultyFilter] = useState<PracticeDifficulty | ''>('');
  const [statusFilter, setStatusFilter] = useState<PracticeStatus | ''>('');
  const [conceptFilter, setConceptFilter] = useState<string>('');

  useEffect(() => {
    loadPracticeSets();
  }, []);

  const loadPracticeSets = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const data = await getPracticeSets(user.id);
      setPracticeSets(data);
    } catch (error) {
      console.error('Failed to load practice sets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get recommended sets (first 3, not completed)
  const recommendedSets = practiceSets
    .filter((set) => set.status !== 'completed')
    .slice(0, 3);

  // Get all unique concept tags for filter
  const allConcepts = Array.from(new Set(practiceSets.map((set) => set.conceptTag)));

  // Filter practice sets
  const filteredSets = practiceSets.filter((set) => {
    if (difficultyFilter && set.difficulty !== difficultyFilter) return false;
    if (statusFilter && set.status !== statusFilter) return false;
    if (conceptFilter && set.conceptTag !== conceptFilter) return false;
    return true;
  });

  const getDifficultyColor = (difficulty: PracticeDifficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadge = (status: PracticeStatus) => {
    switch (status) {
      case 'not_started':
        return 'bg-gray-100 text-gray-700';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: PracticeStatus) => {
    switch (status) {
      case 'not_started':
        return 'New';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const handleStartPractice = (practiceId: string) => {
    navigate(`/student/practice/${practiceId}/solve`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">Loading practice sets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Practice Zone</h1>
        <p className="mt-1 text-gray-600">Improve your skills with personalized practice sets</p>
      </div>

      {/* Recommended for You */}
      {recommendedSets.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
              <p className="text-sm text-gray-600">Based on your recent performance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedSets.map((set) => (
              <div
                key={set.id}
                className="bg-linear-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-6 hover:shadow-lg transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{set.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(set.difficulty)}`}>
                        {set.difficulty.toUpperCase()}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700">
                        {set.conceptTag}
                      </span>
                      {set.status !== 'not_started' && (
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(set.status)}`}>
                          {getStatusLabel(set.status)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recommendation Reason */}
                <div className="bg-white/80 border border-purple-200 rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm text-gray-700 leading-relaxed">{set.recommendedReason}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{set.estimatedTimeMinutes} min</span>
                  </div>
                  {set.questionCount && (
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      <span>{set.questionCount} questions</span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleStartPractice(set.id)}
                  className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  {set.status === 'in_progress' ? '▶️ Continue Practice' : '🚀 Start Practice'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Practice Sets */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">All Practice Sets</h2>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value as PracticeDifficulty | '')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
              >
                <option value="">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Concept Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Concept</label>
              <select
                value={conceptFilter}
                onChange={(e) => setConceptFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
              >
                <option value="">All Concepts</option>
                {allConcepts.map((concept) => (
                  <option key={concept} value={concept}>
                    {concept}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as PracticeStatus | '')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
              >
                <option value="">All Status</option>
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Practice Sets Grid */}
        {filteredSets.length === 0 ? (
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Practice Sets Found</h3>
            <p className="text-gray-600">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSets.map((set) => (
              <div
                key={set.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all hover:border-primary-300"
              >
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{set.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(set.difficulty)}`}>
                      {set.difficulty.toUpperCase()}
                    </span>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                      {set.conceptTag}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(set.status)}`}>
                      {getStatusLabel(set.status)}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{set.estimatedTimeMinutes} min</span>
                  </div>
                  {set.questionCount && (
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      <span>{set.questionCount} questions</span>
                    </div>
                  )}
                </div>

                {/* Last Practiced */}
                {set.lastPracticedAt && (
                  <p className="text-xs text-gray-500 mb-4">
                    Last practiced: {new Date(set.lastPracticedAt).toLocaleDateString()}
                  </p>
                )}

                {/* Action Button */}
                <button
                  onClick={() => handleStartPractice(set.id)}
                  className="w-full py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
                >
                  {set.status === 'completed' ? '🔄 Practice Again' : set.status === 'in_progress' ? 'Continue' : 'Start Practice'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
