/**
 * Assignment Create Page
 * 
 * Form for creating a new assignment.
 * Assigns a problem set to a specific class.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import { ProblemSet, Class } from '../../../types';
import { getProblemSetsByTeacher } from '../../../lib/api/mock/problemSets';
import { getClasses } from '../../../lib/api/mock/classes';
import { createAssignment } from '../../../lib/api/mock/assignments';

export const AssignmentCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Form state
  const [title, setTitle] = useState('');
  const [classId, setClassId] = useState('');
  const [problemSetId, setProblemSetId] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Data loading
  const [problemSets, setProblemSets] = useState<ProblemSet[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const [problemSetsData, classesData] = await Promise.all([
        getProblemSetsByTeacher(user.id),
        getClasses(), // Get all classes (in real app, filter by teacher)
      ]);

      setProblemSets(problemSetsData);
      setClasses(classesData);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!classId) {
      newErrors.classId = 'Please select a class';
    }

    if (!problemSetId) {
      newErrors.problemSetId = 'Please select a problem set';
    }

    if (!dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const due = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (due < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !user) return;

    setIsSaving(true);

    try {
      const selectedClass = classes.find((c) => c.id === classId);
      const selectedProblemSet = problemSets.find((ps) => ps.id === problemSetId);

      await createAssignment(
        {
          title,
          classId,
          className: selectedClass?.name,
          problemSetId,
          problemSetName: selectedProblemSet?.name,
          dueDate: new Date(dueDate).toISOString(),
          status: 'active',
        },
        user.id
      );

      alert('Assignment created successfully!');
      navigate('/teacher/assignments');
    } catch (error) {
      console.error('Failed to create assignment:', error);
      alert('Failed to create assignment. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/teacher/assignments')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Assignments
        </button>

        <h1 className="text-3xl font-bold text-gray-900">Create Assignment</h1>
        <p className="mt-1 text-gray-600">Assign a problem set to a class</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assignment Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Week 3 - Present Perfect Practice"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Class Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class <span className="text-red-500">*</span>
            </label>
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                errors.classId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a class...</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} ({cls.studentIds?.length || 0} students)
                </option>
              ))}
            </select>
            {errors.classId && <p className="mt-1 text-sm text-red-600">{errors.classId}</p>}
            {classes.length === 0 && (
              <p className="mt-2 text-sm text-gray-600">
                No classes available. Please create a class first.
              </p>
            )}
          </div>

          {/* Problem Set Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Problem Set <span className="text-red-500">*</span>
            </label>
            <select
              value={problemSetId}
              onChange={(e) => setProblemSetId(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                errors.problemSetId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a problem set...</option>
              {problemSets.map((ps) => (
                <option key={ps.id} value={ps.id}>
                  {ps.name} ({ps.questionCount} questions - {ps.difficulty})
                </option>
              ))}
            </select>
            {errors.problemSetId && (
              <p className="mt-1 text-sm text-red-600">{errors.problemSetId}</p>
            )}
            {problemSets.length === 0 && (
              <p className="mt-2 text-sm text-gray-600">
                No problem sets available.{' '}
                <button
                  type="button"
                  onClick={() => navigate('/teacher/problem-sets/new')}
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  Create one now
                </button>
              </p>
            )}
          </div>

          {/* Problem Set Preview */}
          {problemSetId && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">Problem Set Details</h4>
              {(() => {
                const selected = problemSets.find((ps) => ps.id === problemSetId);
                if (!selected) return null;

                return (
                  <div className="space-y-1 text-sm text-blue-800">
                    <p>
                      <span className="font-medium">Curriculum:</span> {selected.curriculumName}
                    </p>
                    <p>
                      <span className="font-medium">Unit:</span> {selected.unitTitle}
                    </p>
                    <p>
                      <span className="font-medium">Questions:</span> {selected.questionCount}
                    </p>
                    <p>
                      <span className="font-medium">Difficulty:</span> {selected.difficulty}
                    </p>
                    <p>
                      <span className="font-medium">Question Types:</span> MC {selected.questionTypeRatio.multipleChoice}%, SA{' '}
                      {selected.questionTypeRatio.shortAnswer}%, Desc {selected.questionTypeRatio.descriptive}%
                    </p>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                errors.dueDate ? 'border-red-500' : 'border-gray-300'
              }`}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/teacher/assignments')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
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
                Creating...
              </>
            ) : (
              'Create Assignment'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

