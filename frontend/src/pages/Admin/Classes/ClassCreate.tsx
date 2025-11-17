/**
 * Admin Class Create Page
 * 
 * Create a new class with teacher assignment and student selection.
 * 
 * Features:
 * - Reuses shared ClassForm component
 * - Form validation
 * - Success feedback
 * - Navigation after creation
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClassFormData } from '../../../types';
import { createClass } from '../../../lib/api/mock/classes';
import { ClassForm } from '../../../components/admin/ClassForm';

export const ClassCreate = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ClassFormData) => {
    setIsSubmitting(true);

    try {
      const newClass = await createClass(data);
      
      // Show success message
      alert(`Class "${newClass.name}" created successfully!`);
      
      // Navigate back to class list
      navigate('/admin/classes');
    } catch (error) {
      console.error('Failed to create class:', error);
      alert('Failed to create class. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/classes');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin/classes')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Classes
        </button>

        <h1 className="text-3xl font-bold text-gray-900">Create New Class</h1>
        <p className="mt-1 text-gray-600">
          Set up a new class with teacher and students
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <ClassForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isSubmitting}
          submitLabel="Create Class"
        />
      </div>
    </div>
  );
};

