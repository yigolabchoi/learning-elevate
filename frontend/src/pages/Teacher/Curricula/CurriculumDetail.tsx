/**
 * Curriculum Detail Page (Read-only View)
 * 
 * Display full curriculum information with all units.
 * Provides Edit button to modify the curriculum.
 * 
 * Features:
 * - Read-only view of curriculum
 * - Display all units with details
 * - Show concept tags, examples
 * - Edit button
 * - Back navigation
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Curriculum } from '../../../types';
import { getCurriculum } from '../../../lib/api/mock/curricula';

export const CurriculumDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Curriculum ID is required');
      setIsLoading(false);
      return;
    }

    loadCurriculum();
  }, [id]);

  const loadCurriculum = async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getCurriculum(id);
      
      if (!data) {
        setError('Curriculum not found');
        return;
      }

      setCurriculum(data);
    } catch (err) {
      console.error('Failed to load curriculum:', err);
      setError('Failed to load curriculum');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">Loading curriculum...</p>
        </div>
      </div>
    );
  }

  if (error || !curriculum) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Error</h3>
          <p className="text-red-600 mb-4">{error || 'Curriculum not found'}</p>
          <button
            onClick={() => navigate('/teacher/curricula')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Back to Curricula
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
          onClick={() => navigate('/teacher/curricula')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Curricula
        </button>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{curriculum.name}</h1>
            <p className="text-gray-600 mb-4">{curriculum.description || 'No description'}</p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                {curriculum.subject}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                {curriculum.level}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                {curriculum.units.length} units
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate(`/teacher/curricula/${curriculum.id}/edit`)}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-medium flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit Curriculum
          </button>
        </div>
      </div>

      {/* Units */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Units</h2>

        {curriculum.units.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-600">No units in this curriculum yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {curriculum.units.map((unit, index) => (
              <div key={unit.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Unit Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Unit {index + 1}: {unit.title}
                  </h3>
                </div>

                {/* Unit Content */}
                <div className="p-6 space-y-6">
                  {/* Learning Objective */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Learning Objective
                    </h4>
                    <p className="text-gray-900">{unit.learningObjective}</p>
                  </div>

                  {/* Concept Tags */}
                  {unit.conceptTags.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                        Concept Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {unit.conceptTags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Example Sentences */}
                  {unit.exampleSentences && unit.exampleSentences.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                        Example Sentences
                      </h4>
                      <ul className="space-y-2">
                        {unit.exampleSentences.map((sentence, sentenceIndex) => (
                          <li key={sentenceIndex} className="flex items-start gap-3">
                            <span className="text-primary-500 mt-1">•</span>
                            <span className="text-gray-900">{sentence}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Example Questions */}
                  {unit.exampleQuestions && unit.exampleQuestions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                        Example Questions
                      </h4>
                      <ul className="space-y-2">
                        {unit.exampleQuestions.map((question, questionIndex) => (
                          <li key={questionIndex} className="flex items-start gap-3">
                            <span className="text-primary-500 mt-1">•</span>
                            <span className="text-gray-900">{question}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
