/**
 * Problem Set Detail Page
 * 
 * Display full problem set information with all questions.
 * Read-only view with action buttons.
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProblemSet, DifficultyLevel } from '../../../types';
import { getProblemSet } from '../../../lib/api/mock/problemSets';

export const ProblemSetDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [problemSet, setProblemSet] = useState<ProblemSet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Problem set ID is required');
      setIsLoading(false);
      return;
    }

    loadProblemSet();
  }, [id]);

  const loadProblemSet = async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getProblemSet(id);
      
      if (!data) {
        setError('Problem set not found');
        return;
      }

      setProblemSet(data);
    } catch (err) {
      console.error('Failed to load problem set:', err);
      setError('Failed to load problem set');
    } finally {
      setIsLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">Loading problem set...</p>
        </div>
      </div>
    );
  }

  if (error || !problemSet) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Error</h3>
          <p className="text-red-600 mb-4">{error || 'Problem set not found'}</p>
          <button
            onClick={() => navigate('/teacher/problem-sets')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Back to Problem Sets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/teacher/problem-sets')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Problem Sets
        </button>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{problemSet.name}</h1>
            
            <div className="space-y-2 text-gray-600 mb-4">
              <p>
                <span className="font-medium">Curriculum:</span> {problemSet.curriculumName}
              </p>
              <p>
                <span className="font-medium">Unit:</span> {problemSet.unitTitle}
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(problemSet.difficulty)}`}>
                {problemSet.difficulty}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                {problemSet.questionCount} questions
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                MC: {problemSet.questionTypeRatio.multipleChoice}%
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                SA: {problemSet.questionTypeRatio.shortAnswer}%
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                Desc: {problemSet.questionTypeRatio.descriptive}%
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => alert('Duplicate functionality coming soon!')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Duplicate
            </button>
            <button
              onClick={() => alert('Edit functionality coming soon!')}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-medium"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Questions</h2>

        {problemSet.questions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-600">No questions in this problem set.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {problemSet.questions.map((question, index) => (
              <div key={question.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* Question Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-900">Question {index + 1}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        question.type === 'multipleChoice'
                          ? 'bg-blue-100 text-blue-700'
                          : question.type === 'shortAnswer'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {question.type === 'multipleChoice'
                        ? 'Multiple Choice'
                        : question.type === 'shortAnswer'
                        ? 'Short Answer'
                        : 'Descriptive'}
                    </span>
                  </div>
                  {question.conceptTags && question.conceptTags.length > 0 && (
                    <div className="flex gap-2">
                      {question.conceptTags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Question Prompt */}
                <div className="mb-4">
                  <p className="text-gray-900 leading-relaxed">{question.prompt}</p>
                </div>

                {/* Options (for Multiple Choice) */}
                {question.options && question.options.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Options:</p>
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded-lg border ${
                          question.correctAnswer === option
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-medium text-gray-700">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>
                          <span className="flex-1 text-gray-900">{option}</span>
                          {question.correctAnswer === option && (
                            <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded">
                              Correct
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Correct Answer (for Short Answer) */}
                {question.type === 'shortAnswer' && question.correctAnswer && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-semibold text-green-800 mb-1">Correct Answer:</p>
                    <p className="text-green-900">{question.correctAnswer as string}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
