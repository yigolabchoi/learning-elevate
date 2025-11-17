/**
 * Curriculum Edit Page
 * 
 * Edit an existing curriculum.
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Curriculum, CurriculumFormData } from '../../../types';
import { getCurriculum, updateCurriculum } from '../../../lib/api/mock/curricula';
import { CurriculumForm } from '../../../components/teacher/CurriculumForm';

export const CurriculumEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      setError('Failed to load curriculum data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: CurriculumFormData) => {
    if (!id) return;

    setIsSubmitting(true);

    try {
      const updated = await updateCurriculum(id, data);
      
      if (!updated) {
        throw new Error('Failed to update curriculum');
      }

      alert(`Curriculum "${updated.name}" updated successfully!`);
      navigate('/teacher/curricula');
    } catch (error) {
      console.error('Failed to update curriculum:', error);
      alert('Failed to update curriculum. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/teacher/curricula');
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
    <div className="p-6 max-w-5xl mx-auto">
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

        <h1 className="text-3xl font-bold text-gray-900">Edit Curriculum</h1>
        <p className="mt-1 text-gray-600">Update curriculum details and units</p>
      </div>

      <CurriculumForm
        initialData={{
          name: curriculum.name,
          subject: curriculum.subject,
          level: curriculum.level,
          description: curriculum.description,
          units: curriculum.units.map(unit => ({
            id: unit.id,
            title: unit.title,
            learningObjective: unit.learningObjective,
            conceptTags: unit.conceptTags,
            exampleSentences: unit.exampleSentences || [],
            exampleQuestions: unit.exampleQuestions || [],
          })),
        }}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isSubmitting}
        submitLabel="Update Curriculum"
      />
    </div>
  );
};

