/**
 * Submission Detail Modal
 * 
 * Modal for viewing and confirming student submission details.
 * Shows AI-graded answers and allows teacher to add comments and confirm.
 */

import { useState, useEffect } from 'react';
import { Submission, SubmissionDetail } from '../../types';
import { getSubmissionDetail, updateSubmissionTeacherFeedback } from '../../lib/api/mock/submissions';

interface SubmissionDetailModalProps {
  submissionId: string;
  onClose: () => void;
  onSubmissionUpdated: (submission: Submission) => void;
}

export const SubmissionDetailModal = ({
  submissionId,
  onClose,
  onSubmissionUpdated,
}: SubmissionDetailModalProps) => {
  const [submission, setSubmission] = useState<SubmissionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Teacher feedback for each question
  const [teacherComments, setTeacherComments] = useState<Record<string, string>>({});

  useEffect(() => {
    loadSubmission();
  }, [submissionId]);

  const loadSubmission = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getSubmissionDetail(submissionId);
      if (!data) {
        setError('Submission not found');
        return;
      }

      setSubmission(data);

      // Initialize teacher comments with existing values
      const existingComments: Record<string, string> = {};
      data.questions.forEach((q) => {
        if (q.teacherComment) {
          existingComments[q.questionId] = q.teacherComment;
        }
      });
      setTeacherComments(existingComments);
    } catch (err) {
      console.error('Failed to load submission:', err);
      setError('Failed to load submission details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!submission) return;

    setIsSaving(true);

    try {
      // Prepare feedback payload
      const feedbackPayload = {
        questionFeedback: submission.questions.map((q) => ({
          questionId: q.questionId,
          teacherComment: teacherComments[q.questionId] || '',
          finalScore: q.aiScore, // In a real app, teacher could adjust score
        })),
        status: 'confirmed' as const,
      };

      const updatedSubmission = await updateSubmissionTeacherFeedback(submission.id, feedbackPayload);

      if (updatedSubmission) {
        alert('Submission confirmed successfully!');
        onSubmissionUpdated(updatedSubmission);
        onClose();
      }
    } catch (err) {
      console.error('Failed to confirm submission:', err);
      alert('Failed to confirm submission. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const getScoreColor = (score?: number) => {
    if (score === undefined) return 'text-gray-400';
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
          
          <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
            <div className="flex items-center justify-center p-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                <p className="mt-4 text-gray-600">Loading submission...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
          
          <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
            <div className="p-6">
              <p className="text-red-600">{error || 'Submission not found'}</p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        {/* Modal */}
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white">Submission Review</h2>
                <p className="text-sm text-primary-100 mt-1">
                  {submission.studentName} • {submission.assignmentTitle}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-primary-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-gray-600">Class</p>
                  <p className="font-semibold text-gray-900">{submission.className}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Submitted</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(submission.submittedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Overall Score</p>
                  <p className={`text-2xl font-bold ${getScoreColor(submission.score)}`}>
                    {submission.score}%
                  </p>
                </div>
              </div>
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    submission.status === 'pending_teacher'
                      ? 'bg-blue-100 text-blue-700'
                      : submission.status === 'confirmed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {submission.status === 'pending_teacher'
                    ? 'Needs Review'
                    : submission.status === 'confirmed'
                    ? 'Confirmed'
                    : 'AI Grading'}
                </span>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Questions ({submission.questions.length})
            </h3>

            <div className="space-y-6">
              {submission.questions.map((question, index) => (
                <div key={question.questionId} className="border border-gray-200 rounded-lg p-5">
                  {/* Question Header */}
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">Question {index + 1}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">AI Score:</span>
                      <span className={`text-lg font-bold ${getScoreColor(question.aiScore)}`}>
                        {question.aiScore !== undefined ? `${question.aiScore}%` : '-'}
                      </span>
                    </div>
                  </div>

                  {/* Prompt */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Question:</p>
                    <p className="text-gray-900">{question.prompt}</p>
                  </div>

                  {/* Student Answer */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Student Answer:</p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-gray-900">{question.studentAnswer}</p>
                    </div>
                  </div>

                  {/* AI Feedback */}
                  {question.aiFeedback && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">AI Feedback:</p>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <p className="text-sm text-purple-900">{question.aiFeedback}</p>
                      </div>
                    </div>
                  )}

                  {/* Teacher Comment */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Your Comments (Optional):
                    </label>
                    <textarea
                      value={teacherComments[question.questionId] || ''}
                      onChange={(e) =>
                        setTeacherComments((prev) => ({
                          ...prev,
                          [question.questionId]: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      rows={2}
                      placeholder="Add your feedback for the student..."
                      disabled={submission.status === 'confirmed'}
                    />
                  </div>

                  {/* Existing Teacher Comment (if confirmed) */}
                  {question.teacherComment && submission.status === 'confirmed' && (
                    <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-green-800 mb-1">Teacher Comment:</p>
                      <p className="text-sm text-green-900">{question.teacherComment}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
            >
              Close
            </button>

            {submission.status === 'pending_teacher' && (
              <button
                onClick={handleConfirm}
                disabled={isSaving}
                className="px-8 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Confirming...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Confirm Submission
                  </>
                )}
              </button>
            )}

            {submission.status === 'confirmed' && (
              <div className="flex items-center gap-2 text-green-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">Already Confirmed</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

