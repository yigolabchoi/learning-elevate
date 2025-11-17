/**
 * Teacher Problem Sets List Page
 * 
 * List of all problem sets created by the teacher.
 * Includes filtering by curriculum, unit, and difficulty.
 * 
 * Features:
 * - View all problem sets
 * - Filter by curriculum, unit, difficulty
 * - Create new problem set
 * - Navigate to detail
 * - Delete problem set
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import { ProblemSet, Curriculum, DifficultyLevel } from '../../../types';
import { getProblemSetsByTeacher, deleteProblemSet } from '../../../lib/api/mock/problemSets';
import { getCurriculaByTeacher } from '../../../lib/api/mock/curricula';

export const ProblemSetsList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [problemSets, setProblemSets] = useState<ProblemSet[]>([]);
  const [curricula, setCurricula] = useState<Curriculum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | ''>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const [problemSetsData, curriculaData] = await Promise.all([
        getProblemSetsByTeacher(user.id),
        getCurriculaByTeacher(user.id),
      ]);

      setProblemSets(problemSetsData);
      setCurricula(curriculaData);
    } catch (err) {
      console.error('Failed to load problem sets:', err);
      setError('Failed to load problem sets. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await deleteProblemSet(id);
      setProblemSets((prev) => prev.filter((ps) => ps.id !== id));
    } catch (err) {
      console.error('Failed to delete problem set:', err);
      alert('Failed to delete problem set. Please try again.');
    }
  };

  // Filter problem sets
  const filteredProblemSets = problemSets.filter((ps) => {
    if (selectedCurriculum && ps.curriculumId !== selectedCurriculum) return false;
    if (selectedUnit && ps.unitId !== selectedUnit) return false;
    if (selectedDifficulty && ps.difficulty !== selectedDifficulty) return false;
    return true;
  });

  // Get units for selected curriculum
  const availableUnits = selectedCurriculum
    ? curricula.find((c) => c.id === selectedCurriculum)?.units || []
    : [];

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">Loading problem sets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-600">{error}</p>
          <button
            onClick={loadData}
            className="mt-2 text-sm text-red-700 underline hover:text-red-800"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Problem Sets</h1>
        <p className="mt-1 text-gray-600">Manage your AI-generated problem sets</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Curriculum</label>
            <select
              value={selectedCurriculum}
              onChange={(e) => {
                setSelectedCurriculum(e.target.value);
                setSelectedUnit(''); // Reset unit when curriculum changes
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Curricula</option>
              {curricula.map((curriculum) => (
                <option key={curriculum.id} value={curriculum.id}>
                  {curriculum.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              disabled={!selectedCurriculum}
            >
              <option value="">All Units</option>
              {availableUnits.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as DifficultyLevel | '')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSelectedCurriculum('');
                setSelectedUnit('');
                setSelectedDifficulty('');
              }}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Create Button */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            All Problem Sets ({filteredProblemSets.length})
          </h2>
        </div>
        <button
          onClick={() => navigate('/teacher/problem-sets/new')}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Problem Set
        </button>
      </div>

      {/* Problem Sets List */}
      {filteredProblemSets.length === 0 ? (
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Problem Sets</h3>
          <p className="text-gray-600 mb-4">
            {problemSets.length === 0
              ? 'Create your first AI-generated problem set'
              : 'No problem sets match the selected filters'}
          </p>
          {problemSets.length === 0 && (
            <button
              onClick={() => navigate('/teacher/problem-sets/new')}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Create First Problem Set
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProblemSets.map((problemSet) => (
            <div
              key={problemSet.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/teacher/problem-sets/${problemSet.id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{problemSet.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Curriculum:</span> {problemSet.curriculumName}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Unit:</span> {problemSet.unitTitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{problemSet.questionCount} questions</span>
                    </div>
                    
                    <div className="text-xs">
                      MC: {problemSet.questionTypeRatio.multipleChoice}% | 
                      SA: {problemSet.questionTypeRatio.shortAnswer}% | 
                      Desc: {problemSet.questionTypeRatio.descriptive}%
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                      problemSet.difficulty
                    )}`}
                  >
                    {problemSet.difficulty}
                  </span>

                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/teacher/problem-sets/${problemSet.id}`);
                      }}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(problemSet.id, problemSet.name);
                      }}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
