/**
 * Admin Class Edit Page
 * 
 * Edit an existing class's details, teacher, and student assignments.
 * 
 * Features:
 * - Load existing class data
 * - Reuses shared ClassForm component
 * - Update functionality
 * - Navigation after update
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Class, ClassFormData } from '../../../types';
import { getClassById, updateClass } from '../../../lib/api/mock/classes';
import { ClassForm } from '../../../components/admin/ClassForm';

export const ClassEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [classData, setClassData] = useState<Class | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Class ID is required');
      setIsLoading(false);
      return;
    }

    loadClass();
  }, [id]);

  const loadClass = async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getClassById(id);
      
      if (!data) {
        setError('Class not found');
        return;
      }

      setClassData(data);
    } catch (err) {
      console.error('Failed to load class:', err);
      setError('Failed to load class data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: ClassFormData) => {
    if (!id) return;

    setIsSubmitting(true);

    try {
      const updatedClass = await updateClass(id, data);
      
      if (!updatedClass) {
        throw new Error('Failed to update class');
      }

      // Show success message
      alert(`Class "${updatedClass.name}" updated successfully!`);
      
      // Navigate back to class list
      navigate('/admin/classes');
    } catch (error) {
      console.error('Failed to update class:', error);
      alert('Failed to update class. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/classes');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">Loading class...</p>
        </div>
      </div>
    );
  }

  if (error || !classData) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Error</h3>
          <p className="text-red-600 mb-4">{error || 'Class not found'}</p>
          <button
            onClick={() => navigate('/admin/classes')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Back to Classes
          </button>
        </div>
      </div>
    );
  }

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

        <h1 className="text-3xl font-bold text-gray-900">Edit Class</h1>
        <p className="mt-1 text-gray-600">
          Update class details, teacher, and student assignments
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <ClassForm
          initialData={{
            name: classData.name,
            gradeLevel: classData.gradeLevel,
            subject: classData.subject,
            teacherId: classData.teacherId,
            studentIds: classData.studentIds,
          }}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isSubmitting}
          submitLabel="Update Class"
        />
      </div>
    </div>
  );
};

