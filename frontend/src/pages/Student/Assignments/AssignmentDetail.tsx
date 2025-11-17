/**
 * Student Assignment Detail Page
 * 
 * Shows detailed information about a single assignment.
 * 
 * Features:
 * - Assignment details (title, description, due date)
 * - Progress tracking
 * - Start/continue assignment button
 * - View feedback (for completed assignments)
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StudentAssignmentDetail as AssignmentDetailType } from '../../../types';
import { getStudentAssignmentDetail } from '../../../lib/api/mock/studentAssignments';

export const StudentAssignmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState<AssignmentDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAssignment();
  }, [id]);

  const loadAssignment = async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      const data = await getStudentAssignmentDetail(id);
      setAssignment(data);
    } catch (error) {
      console.error('Failed to load assignment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  const getStatusBadge = () => {
    if (!assignment) return '';
    const isOverdue = new Date(assignment.dueDate) < new Date() && assignment.status !== 'completed';
    
    if (isOverdue) {
      return 'bg-red-100 text-red-700';
    }
    
    switch (assignment.status) {
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

  const getStatusLabel = () => {
    if (!assignment) return '';
    const isOverdue = new Date(assignment.dueDate) < new Date() && assignment.status !== 'completed';
    
    if (isOverdue) {
      return 'Overdue';
    }
    
    switch (assignment.status) {
      case 'not_started':
        return 'Not Started';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return assignment.status;
    }
  };

  const handleStartContinue = () => {
    navigate(`/student/assignments/${assignment!.id}/solve`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">Loading assignment...</p>
        </div>
      </div>
    );
  }

  if (!assignment) {
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
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Assignment Not Found</h3>
          <p className="text-gray-600 mb-4">The assignment you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/student/assignments')}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Back to Assignments
          </button>
        </div>
      </div>
    );
  }

  const progressPercentage = (assignment.completedQuestions / assignment.totalQuestions) * 100;
  const isOverdue = new Date(assignment.dueDate) < new Date() && assignment.status !== 'completed';

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/student/assignments')}
        className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Assignments
      </button>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{assignment.title}</h1>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadge()}`}>
                {getStatusLabel()}
              </span>
              {isOverdue && (
                <span className="text-red-600 font-medium text-sm">
                  ⚠️ {formatRelativeTime(assignment.dueDate)}
                </span>
              )}
            </div>
          </div>
          {assignment.status === 'completed' && assignment.score !== undefined && (
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Your Score</div>
              <div className="text-4xl font-bold text-green-600">{assignment.score}%</div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-600">Class</p>
            <p className="font-semibold text-gray-900">{assignment.className}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Unit</p>
            <p className="font-semibold text-gray-900">{assignment.unitTitle}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Due Date</p>
            <p className={`font-semibold ${isOverdue ? 'text-red-600' : 'text-gray-900'}`}>
              {formatDate(assignment.dueDate)}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      {assignment.description && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
          <p className="text-gray-700 leading-relaxed">{assignment.description}</p>
        </div>
      )}

      {/* Progress */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Progress</h2>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            {assignment.completedQuestions} of {assignment.totalQuestions} questions completed
          </span>
          <span className="text-sm font-semibold text-gray-900">{Math.round(progressPercentage)}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all ${
              assignment.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {assignment.lastAttemptedAt && (
          <p className="mt-3 text-sm text-gray-600">
            Last attempted: {formatDate(assignment.lastAttemptedAt)}
          </p>
        )}
      </div>

      {/* AI Feedback (for completed assignments) */}
      {assignment.status === 'completed' && assignment.latestFeedbackSummary && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">AI Feedback</h2>
              <p className="text-gray-700 leading-relaxed">{assignment.latestFeedbackSummary}</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {assignment.status === 'completed' ? (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-lg font-medium mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Assignment Completed!
            </div>
            <p className="text-gray-600 mb-4">
              You scored {assignment.score}% on this assignment. Great work!
            </p>
            <button
              onClick={() => navigate('/student/assignments')}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600"
            >
              Back to All Assignments
            </button>
          </div>
        ) : (
          <div className="text-center">
            <button
              onClick={handleStartContinue}
              className="px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold text-lg hover:bg-primary-600 transition-colors"
            >
              {assignment.status === 'not_started' ? '🚀 Start Assignment' : '▶️ Continue Assignment'}
            </button>
            <p className="mt-3 text-sm text-gray-600">
              {assignment.status === 'not_started' 
                ? 'Click to begin working on this assignment' 
                : `You've completed ${assignment.completedQuestions} out of ${assignment.totalQuestions} questions`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
