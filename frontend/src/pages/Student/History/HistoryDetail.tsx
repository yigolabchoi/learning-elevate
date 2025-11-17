/**
 * Student History Detail Page
 * 
 * Shows detailed feedback for a completed assignment.
 * 
 * Features:
 * - Assignment header with score
 * - Summary feedback from AI
 * - Question-by-question breakdown
 * - Correct/incorrect indicators
 * - AI explanations (collapsible)
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StudentHistoryDetail } from '../../../types';
import { getStudentHistoryDetail } from '../../../lib/api/mock/studentHistory';

export const HistoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<StudentHistoryDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadDetail();
  }, [id]);

  const loadDetail = async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      const data = await getStudentHistoryDetail(id);
      setDetail(data);
    } catch (error) {
      console.error('Failed to load history detail:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const expandAll = () => {
    if (!detail) return;
    setExpandedQuestions(new Set(detail.questions.map((q) => q.questionId)));
  };

  const collapseAll = () => {
    setExpandedQuestions(new Set());
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">Loading feedback...</p>
        </div>
      </div>
    );
  }

  if (!detail) {
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
          <h3 className="text-xl font-semibold text-gray-900 mb-2">History Not Found</h3>
          <p className="text-gray-600 mb-4">This assignment history doesn't exist.</p>
          <button
            onClick={() => navigate('/student/history')}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Back to History
          </button>
        </div>
      </div>
    );
  }

  const correctCount = detail.questions.filter((q) => q.isCorrect).length;
  const totalQuestions = detail.questions.length;
  const correctPercentage = Math.round((correctCount / totalQuestions) * 100);

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/student/history')}
        className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to History
      </button>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{detail.title}</h1>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Class:</span> {detail.className}</p>
              <p><span className="font-medium">Unit:</span> {detail.unitTitle}</p>
              <p><span className="font-medium">Completed:</span> {formatDate(detail.completedAt)}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">Your Score</div>
            <div className={`text-5xl font-bold ${getScoreColor(detail.score)}`}>
              {detail.score}%
            </div>
            <div className="text-sm text-gray-600 mt-2">
              {correctCount} / {totalQuestions} correct
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full ${
                correctPercentage >= 90
                  ? 'bg-green-500'
                  : correctPercentage >= 80
                  ? 'bg-blue-500'
                  : correctPercentage >= 70
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${correctPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* AI Summary Feedback */}
      <div className="bg-linear-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-lg shrink-0">
            <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">AI Summary Feedback</h2>
            <p className="text-gray-700 leading-relaxed">{detail.summaryFeedback}</p>
          </div>
        </div>
      </div>

      {/* Question Controls */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Question-by-Question Review</h2>
        <div className="flex gap-2">
          <button
            onClick={expandAll}
            className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {detail.questions.map((question, index) => {
          const isExpanded = expandedQuestions.has(question.questionId);
          
          return (
            <div
              key={question.questionId}
              className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
                question.isCorrect ? 'border-green-200' : 'border-red-200'
              }`}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleQuestion(question.questionId)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 text-left">
                  {/* Question Number */}
                  <div
                    className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      question.isCorrect
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Correctness Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${
                      question.isCorrect
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {question.isCorrect ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Correct
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Incorrect
                      </>
                    )}
                  </span>

                  {/* Question Prompt (truncated) */}
                  <p className="text-gray-900 font-medium flex-1 line-clamp-1">
                    {question.prompt}
                  </p>
                </div>

                {/* Expand Icon */}
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ml-4 ${
                    isExpanded ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Question Details (Collapsible) */}
              {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-200">
                  {/* Question Prompt */}
                  <div className="mt-4 mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Question:</h4>
                    <p className="text-gray-900 leading-relaxed">{question.prompt}</p>
                  </div>

                  {/* Student Answer */}
                  <div className="mb-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Your Answer:</h4>
                    <p className="text-gray-900">{question.studentAnswer}</p>
                  </div>

                  {/* AI Explanation */}
                  <div
                    className={`border-l-4 rounded-r-lg p-4 ${
                      question.isCorrect
                        ? 'bg-green-50 border-green-500'
                        : 'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">AI Explanation:</h4>
                        <p className="text-gray-700 leading-relaxed">{question.aiExplanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={() => navigate('/student/history')}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
        >
          Back to History
        </button>
        <button
          onClick={() => navigate('/student/assignments')}
          className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600"
        >
          View Current Assignments
        </button>
      </div>
    </div>
  );
};
