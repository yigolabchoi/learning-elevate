/**
 * User Form Drawer Component
 * 
 * Side drawer for creating and editing users (Teachers, Students, Parents).
 * Dynamically renders form fields based on user role.
 * 
 * Features:
 * - Create new users
 * - Edit existing users
 * - Role-specific fields
 * - Form validation
 * - Loading states
 */

import { useState, useEffect, FormEvent } from 'react';
import { Teacher, Student, Parent, UserRole } from '../../types';
import { createUser, updateUser } from '../../lib/api/mock/users';
import { getClasses } from '../../lib/api/mock/classes';
import { getUsersByRole } from '../../lib/api/mock/users';
import { Class } from '../../types';

interface UserFormDrawerProps {
  isOpen: boolean;
  user: Teacher | Student | Parent | null;
  role: UserRole;
  onClose: () => void;
  onSave: () => void;
}

const SUBJECTS = ['English', 'Math', 'Science', 'History', 'Korean', 'ESL', 'Literature', 'Physics', 'Algebra'];
const GRADE_LEVELS = ['Grade 7', 'Grade 8', 'Grade 9', 'Middle 1', 'Middle 2', 'Middle 3', 'High 1', 'High 2', 'High 3'];

export const UserFormDrawer = ({ isOpen, user, role, onClose, onSave }: UserFormDrawerProps) => {
  const [formData, setFormData] = useState<any>({
    name: '',
    email: '',
    isActive: true,
  });
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      loadReferenceData();
      
      if (user) {
        // Edit mode - populate form
        setFormData(user);
      } else {
        // Create mode - reset form
        resetForm();
      }
    }
  }, [isOpen, user, role]);

  const loadReferenceData = async () => {
    try {
      const [classesData, studentsData] = await Promise.all([
        getClasses(),
        getUsersByRole('student'),
      ]);
      setClasses(classesData);
      setStudents(studentsData as Student[]);
    } catch (error) {
      console.error('Failed to load reference data:', error);
    }
  };

  const resetForm = () => {
    const baseForm = {
      name: '',
      email: '',
      isActive: true,
    };

    switch (role) {
      case 'teacher':
        setFormData({
          ...baseForm,
          role: 'teacher',
          subject: 'English',
          subjects: [],
          gradeLevels: [],
        });
        break;
      case 'student':
        setFormData({
          ...baseForm,
          role: 'student',
          gradeLevel: 'Grade 7',
          currentLevel: 1,
          teacherId: '',
          classId: '',
        });
        break;
      case 'parent':
        setFormData({
          ...baseForm,
          role: 'parent',
          phone: '',
          childIds: [],
        });
        break;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (user) {
        await updateUser(formData);
      } else {
        await createUser(formData);
      }

      onSave();
    } catch (error) {
      console.error('Failed to save user:', error);
      alert('Failed to save user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubjectsChange = (subject: string, checked: boolean) => {
    const currentSubjects = formData.subjects || [];
    if (checked) {
      setFormData({ ...formData, subjects: [...currentSubjects, subject] });
    } else {
      setFormData({ ...formData, subjects: currentSubjects.filter((s: string) => s !== subject) });
    }
  };

  const handleChildToggle = (studentId: string) => {
    const currentChildren = formData.childIds || [];
    if (currentChildren.includes(studentId)) {
      setFormData({ ...formData, childIds: currentChildren.filter((id: string) => id !== studentId) });
    } else {
      setFormData({ ...formData, childIds: [...currentChildren, studentId] });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {user ? 'Edit' : 'Create'} {role.charAt(0).toUpperCase() + role.slice(1)}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {user ? `Update ${role} information` : `Add a new ${role} to the system`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={isSubmitting}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Common Fields */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Full name"
              disabled={isSubmitting}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="email@example.com"
              disabled={isSubmitting}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                disabled={isSubmitting}
              />
              <span className="text-sm font-medium text-gray-700">Active Account</span>
            </label>
          </div>

          {/* Teacher-specific fields */}
          {role === 'teacher' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subjects
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SUBJECTS.map((subject) => (
                    <label key={subject} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.subjects?.includes(subject) || false}
                        onChange={(e) => handleSubjectsChange(subject, e.target.checked)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        disabled={isSubmitting}
                      />
                      <span className="text-sm text-gray-700">{subject}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Subject
                </label>
                <select
                  id="subject"
                  value={formData.subject || ''}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  disabled={isSubmitting}
                >
                  {SUBJECTS.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Student-specific fields */}
          {role === 'student' && (
            <>
              <div>
                <label htmlFor="gradeLevel" className="block text-sm font-medium text-gray-700 mb-2">
                  Grade Level
                </label>
                <select
                  id="gradeLevel"
                  value={formData.gradeLevel || ''}
                  onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  disabled={isSubmitting}
                >
                  {GRADE_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="classId" className="block text-sm font-medium text-gray-700 mb-2">
                  Class
                </label>
                <select
                  id="classId"
                  value={formData.classId || ''}
                  onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  disabled={isSubmitting}
                >
                  <option value="">No class assigned</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="currentLevel" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Level
                </label>
                <input
                  id="currentLevel"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.currentLevel || 1}
                  onChange={(e) => setFormData({ ...formData, currentLevel: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  disabled={isSubmitting}
                />
              </div>
            </>
          )}

          {/* Parent-specific fields */}
          {role === 'parent' && (
            <>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="010-1234-5678"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Children ({formData.childIds?.length || 0} selected)
                </label>
                <div className="border border-gray-300 rounded-lg max-h-64 overflow-y-auto">
                  {students.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">No students available</div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {students.map((student) => (
                        <label
                          key={student.id}
                          className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.childIds?.includes(student.id) || false}
                            onChange={() => handleChildToggle(student.id)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            disabled={isSubmitting}
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
            </>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
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
                user ? 'Update' : 'Create'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

