/**
 * Class Form Component
 * 
 * Shared form component for creating and editing classes.
 * Used by both ClassCreate and ClassEdit pages.
 * 
 * Features:
 * - Class name input (required)
 * - Grade level selector
 * - Subject selector
 * - Teacher selector (single select)
 * - Student multi-select
 * - Form validation
 * - Loading states
 */

import { useState, useEffect, FormEvent } from 'react';
import { ClassFormData, Teacher, Student } from '../../types';

interface ClassFormProps {
  initialData?: ClassFormData;
  onSubmit: (data: ClassFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  submitLabel?: string;
}

const GRADE_LEVELS = [
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Middle 1',
  'Middle 2',
  'Middle 3',
  'High 1',
  'High 2',
  'High 3',
];

const SUBJECTS = ['English', 'Math', 'Science', 'History', 'Korean', 'General'];

export const ClassForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = 'Create Class',
}: ClassFormProps) => {
  // Form state
  const [formData, setFormData] = useState<ClassFormData>(
    initialData || {
      name: '',
      gradeLevel: '',
      subject: 'English',
      teacherId: '',
      studentIds: [],
    }
  );

  // Data loading state
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load teachers and students
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoadingData(true);
    try {
      const { getTeachers, getStudents } = await import('../../lib/api/mock/classes');
      const [teachersData, studentsData] = await Promise.all([
        getTeachers(),
        getStudents(),
      ]);
      setTeachers(teachersData);
      setStudents(studentsData);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Class name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  const handleStudentToggle = (studentId: string) => {
    setFormData((prev) => ({
      ...prev,
      studentIds: prev.studentIds.includes(studentId)
        ? prev.studentIds.filter((id) => id !== studentId)
        : [...prev.studentIds, studentId],
    }));
  };

  const handleSelectAllStudents = () => {
    if (formData.studentIds.length === students.length) {
      setFormData((prev) => ({ ...prev, studentIds: [] }));
    } else {
      setFormData((prev) => ({ ...prev, studentIds: students.map((s) => s.id) }));
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Class Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Class Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., Grade 7 - A"
          disabled={isLoading}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      {/* Grade Level */}
      <div>
        <label htmlFor="gradeLevel" className="block text-sm font-medium text-gray-700 mb-2">
          Grade Level
        </label>
        <select
          id="gradeLevel"
          value={formData.gradeLevel}
          onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={isLoading}
        >
          <option value="">Select grade level (optional)</option>
          {GRADE_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          Subject
        </label>
        <select
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={isLoading}
        >
          {SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      {/* Teacher */}
      <div>
        <label htmlFor="teacherId" className="block text-sm font-medium text-gray-700 mb-2">
          Assigned Teacher
        </label>
        <select
          id="teacherId"
          value={formData.teacherId}
          onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={isLoading}
        >
          <option value="">No teacher assigned</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name} ({teacher.subject})
            </option>
          ))}
        </select>
      </div>

      {/* Students */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Students ({formData.studentIds.length} selected)
          </label>
          <button
            type="button"
            onClick={handleSelectAllStudents}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            disabled={isLoading}
          >
            {formData.studentIds.length === students.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        <div className="border border-gray-300 rounded-lg max-h-64 overflow-y-auto">
          {students.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No students available
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {students.map((student) => (
                <label
                  key={student.id}
                  className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.studentIds.includes(student.id)}
                    onChange={() => handleStudentToggle(student.id)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    disabled={isLoading}
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        {student.name}
                      </span>
                      <span className="text-xs text-gray-500">{student.gradeLevel}</span>
                    </div>
                    <span className="text-xs text-gray-500">{student.email}</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
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
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
};

