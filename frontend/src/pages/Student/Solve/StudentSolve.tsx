/**
 * Student Solve Page
 * 
 * Question-by-question solving interface for students.
 * 
 * Features:
 * - Navigate through questions with Previous/Next
 * - Different input types (multiple choice, short answer, descriptive)
 * - Progress tracking
 * - Submit assignment
 * - Navigation warning for unsaved changes
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate, useBlocker, useLocation } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import { SolveSession, SolveQuestion } from '../../../types';
import { getSolveQuestions, submitAssignmentAnswers } from '../../../lib/api/mock/studentSolve';
import { getPracticeQuestions, submitPracticeAnswers } from '../../../lib/api/mock/studentPractice';
import { getStudentAssignmentDetail } from '../../../lib/api/mock/studentAssignments';

export const StudentSolve = () => {
  const { id: assignmentId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  // Determine if this is practice mode or assignment mode
  const isPracticeMode = location.pathname.includes('/practice/');

  const [session, setSession] = useState<SolveSession | null>(null);
  const [assignmentTitle, setAssignmentTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Block navigation if there are unsaved changes
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      hasUnsavedChanges &&
      currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    loadAssignment();
  }, [assignmentId]);

  const loadAssignment = async () => {
    if (!assignmentId || !user) return;

    setIsLoading(true);
    try {
      // Load title
      if (isPracticeMode) {
        // For practice, we could load from practice sets, but for simplicity, use practice ID as title
        setAssignmentTitle('Practice Session');
      } else {
        // Load assignment details for title
        const detail = await getStudentAssignmentDetail(assignmentId);
        if (detail) {
          setAssignmentTitle(detail.title);
        }
      }

      // Load questions based on mode
      const questions = isPracticeMode
        ? await getPracticeQuestions(assignmentId)
        : await getSolveQuestions(assignmentId);
      
      setSession({
        assignmentId,
        studentId: user.id,
        questions,
        currentIndex: 0,
      });
    } catch (error) {
      console.error('Failed to load assignment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (answer: string | string[]) => {
    if (!session) return;

    const updatedQuestions = [...session.questions];
    updatedQuestions[session.currentIndex] = {
      ...updatedQuestions[session.currentIndex],
      studentAnswer: answer,
    };

    setSession({
      ...session,
      questions: updatedQuestions,
    });
    setHasUnsavedChanges(true);
  };

  const handlePrevious = () => {
    if (!session || session.currentIndex === 0) return;
    setSession({ ...session, currentIndex: session.currentIndex - 1 });
  };

  const handleNext = () => {
    if (!session || session.currentIndex >= session.questions.length - 1) return;
    setSession({ ...session, currentIndex: session.currentIndex + 1 });
  };

  const handleSubmitClick = () => {
    setShowSubmitConfirm(true);
  };

  const handleSubmitConfirm = async () => {
    if (!session || !assignmentId) return;

    setIsSubmitting(true);
    setShowSubmitConfirm(false);

    try {
      if (isPracticeMode) {
        // Submit practice (ungraded)
        await submitPracticeAnswers(assignmentId);
        setHasUnsavedChanges(false);
        
        // Redirect to practice page
        navigate('/student/practice', {
          state: { practiceCompleted: true },
        });
      } else {
        // Submit assignment
        await submitAssignmentAnswers(session);
        setHasUnsavedChanges(false);
        
        // Redirect to assignment detail with success message
        navigate(`/student/assignments/${assignmentId}`, {
          state: { submissionSuccess: true },
        });
      }
    } catch (error) {
      console.error('Failed to submit:', error);
      alert(`Failed to submit ${isPracticeMode ? 'practice' : 'assignment'}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitCancel = () => {
    setShowSubmitConfirm(false);
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

  if (!session || session.questions.length === 0) {
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
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Questions Available</h3>
          <p className="text-gray-600 mb-4">This assignment has no questions.</p>
          <button
            onClick={() => navigate(`/student/assignments/${assignmentId}`)}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Back to Assignment
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = session.questions[session.currentIndex];
  const progressPercentage = ((session.currentIndex + 1) / session.questions.length) * 100;
  const isFirstQuestion = session.currentIndex === 0;
  const isLastQuestion = session.currentIndex === session.questions.length - 1;

  // Count answered questions
  const answeredCount = session.questions.filter(
    (q) => q.studentAnswer !== undefined && q.studentAnswer !== '' && 
           (Array.isArray(q.studentAnswer) ? q.studentAnswer.length > 0 : true)
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-gray-900">{assignmentTitle}</h1>
            <button
              onClick={() => {
                if (hasUnsavedChanges) {
                  const confirm = window.confirm(
                    'You have unsaved answers. Are you sure you want to leave?'
                  );
                  if (!confirm) return;
                }
                navigate(isPracticeMode ? '/student/practice' : `/student/assignments/${assignmentId}`);
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              ✕ Exit
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
              <span>
                Question {session.currentIndex + 1} of {session.questions.length}
              </span>
              <span>
                {answeredCount} / {session.questions.length} answered
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          {/* Question Number Badge */}
          <div className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            Question {session.currentIndex + 1}
          </div>

          {/* Question Type Badge */}
          <div className="inline-block ml-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-4">
            {currentQuestion.type === 'multipleChoice' && '📋 Multiple Choice'}
            {currentQuestion.type === 'shortAnswer' && '✍️ Short Answer'}
            {currentQuestion.type === 'descriptive' && '📝 Descriptive'}
          </div>

          {/* Question Prompt */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 leading-relaxed">
            {currentQuestion.prompt}
          </h2>

          {/* Answer Input */}
          <div className="mt-6">
            {currentQuestion.type === 'multipleChoice' && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      currentQuestion.studentAnswer === option
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option}
                      checked={currentQuestion.studentAnswer === option}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      className="w-5 h-5 text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-3 text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === 'shortAnswer' && (
              <input
                type="text"
                value={(currentQuestion.studentAnswer as string) || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              />
            )}

            {currentQuestion.type === 'descriptive' && (
              <textarea
                value={(currentQuestion.studentAnswer as string) || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder="Type your detailed answer here..."
                rows={8}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
              />
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={isFirstQuestion}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              isFirstQuestion
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50'
            }`}
          >
            ← Previous
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmitClick}
              disabled={isSubmitting}
              className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : '✓ Submit Assignment'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              Next →
            </button>
          )}
        </div>

        {/* Answer Status Indicators */}
        <div className="mt-6 flex justify-center gap-2">
          {session.questions.map((q, index) => {
            const isAnswered = q.studentAnswer !== undefined && q.studentAnswer !== '' && 
                               (Array.isArray(q.studentAnswer) ? q.studentAnswer.length > 0 : true);
            const isCurrent = index === session.currentIndex;
            
            return (
              <button
                key={q.id}
                onClick={() => setSession({ ...session, currentIndex: index })}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                  isCurrent
                    ? 'bg-primary-500 text-white ring-2 ring-primary-300'
                    : isAnswered
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                title={`Question ${index + 1}${isAnswered ? ' (Answered)' : ''}`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Submit Assignment?</h3>
            <p className="text-gray-600 mb-6">
              You have answered {answeredCount} out of {session.questions.length} questions.
              {answeredCount < session.questions.length && (
                <span className="block mt-2 text-orange-600 font-medium">
                  ⚠️ Warning: You have {session.questions.length - answeredCount} unanswered question(s).
                </span>
              )}
            </p>
            <p className="text-gray-600 mb-6">
              Once submitted, you cannot change your answers. Are you sure you want to submit?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleSubmitCancel}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitConfirm}
                className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Block Modal */}
      {blocker.state === 'blocked' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Leave Page?</h3>
            <p className="text-gray-600 mb-6">
              You have unsaved answers. If you leave now, your progress will be lost.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => blocker.reset?.()}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                Stay
              </button>
              <button
                onClick={() => blocker.proceed?.()}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

