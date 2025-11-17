/**
 * Curriculum Form Component
 * 
 * Shared form component for creating and editing curricula.
 * Supports dynamic unit management with concept tags and examples.
 * 
 * Features:
 * - Add/remove units dynamically
 * - Concept tags input (chip-based)
 * - Multiple example sentences
 * - Multiple example questions
 * - Form validation
 */

import { useState, FormEvent } from 'react';
import { CurriculumFormData, UnitFormData } from '../../types';

interface CurriculumFormProps {
  initialData?: CurriculumFormData;
  onSubmit: (data: CurriculumFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  submitLabel?: string;
}

const SUBJECTS = ['English', 'Math', 'Science', 'History', 'Korean'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

export const CurriculumForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = 'Create Curriculum',
}: CurriculumFormProps) => {
  const [formData, setFormData] = useState<CurriculumFormData>(
    initialData || {
      name: '',
      subject: 'English',
      level: 'Grade 7',
      description: '',
      units: [],
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Temporary input states for chips
  const [unitConceptInputs, setUnitConceptInputs] = useState<Record<number, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Curriculum name is required';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    formData.units.forEach((unit, index) => {
      if (!unit.title.trim()) {
        newErrors[`unit-${index}-title`] = 'Unit title is required';
      }
      if (!unit.learningObjective.trim()) {
        newErrors[`unit-${index}-objective`] = 'Learning objective is required';
      }
    });

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

  const addUnit = () => {
    setFormData({
      ...formData,
      units: [
        ...formData.units,
        {
          title: '',
          learningObjective: '',
          conceptTags: [],
          exampleSentences: [],
          exampleQuestions: [],
        },
      ],
    });
  };

  const removeUnit = (index: number) => {
    setFormData({
      ...formData,
      units: formData.units.filter((_, i) => i !== index),
    });
  };

  const updateUnit = (index: number, field: keyof UnitFormData, value: any) => {
    const newUnits = [...formData.units];
    newUnits[index] = { ...newUnits[index], [field]: value };
    setFormData({ ...formData, units: newUnits });
  };

  const addConceptTag = (unitIndex: number) => {
    const input = unitConceptInputs[unitIndex]?.trim();
    if (!input) return;

    const unit = formData.units[unitIndex];
    if (!unit.conceptTags.includes(input)) {
      updateUnit(unitIndex, 'conceptTags', [...unit.conceptTags, input]);
    }
    setUnitConceptInputs({ ...unitConceptInputs, [unitIndex]: '' });
  };

  const removeConceptTag = (unitIndex: number, tag: string) => {
    const unit = formData.units[unitIndex];
    updateUnit(
      unitIndex,
      'conceptTags',
      unit.conceptTags.filter((t) => t !== tag)
    );
  };

  const addExample = (unitIndex: number, type: 'exampleSentences' | 'exampleQuestions', value: string) => {
    if (!value.trim()) return;
    const unit = formData.units[unitIndex];
    updateUnit(unitIndex, type, [...unit[type], value.trim()]);
  };

  const removeExample = (unitIndex: number, type: 'exampleSentences' | 'exampleQuestions', exampleIndex: number) => {
    const unit = formData.units[unitIndex];
    updateUnit(
      unitIndex,
      type,
      unit[type].filter((_, i) => i !== exampleIndex)
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Curriculum Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 2025 Grade 7 English"
              disabled={isLoading}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Subject and Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                disabled={isLoading}
              >
                {SUBJECTS.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
                Level
              </label>
              <select
                id="level"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                disabled={isLoading}
              >
                {LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              rows={3}
              placeholder="Brief description of this curriculum..."
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Units */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Units ({formData.units.length})
          </h3>
          <button
            type="button"
            onClick={addUnit}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 text-sm font-medium flex items-center gap-2"
            disabled={isLoading}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Unit
          </button>
        </div>

        {formData.units.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No units yet. Click "Add Unit" to get started.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {formData.units.map((unit, unitIndex) => (
              <div key={unitIndex} className="border border-gray-200 rounded-lg p-4 relative">
                {/* Unit Header */}
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Unit {unitIndex + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeUnit(unitIndex)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                    disabled={isLoading}
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Unit Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={unit.title}
                      onChange={(e) => updateUnit(unitIndex, 'title', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                        errors[`unit-${unitIndex}-title`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Unit 1: Present Tenses"
                      disabled={isLoading}
                    />
                    {errors[`unit-${unitIndex}-title`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`unit-${unitIndex}-title`]}</p>
                    )}
                  </div>

                  {/* Learning Objective */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Learning Objective <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={unit.learningObjective}
                      onChange={(e) => updateUnit(unitIndex, 'learningObjective', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                        errors[`unit-${unitIndex}-objective`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      rows={2}
                      placeholder="What students will be able to do after this unit..."
                      disabled={isLoading}
                    />
                    {errors[`unit-${unitIndex}-objective`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`unit-${unitIndex}-objective`]}</p>
                    )}
                  </div>

                  {/* Concept Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Concept Tags
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={unitConceptInputs[unitIndex] || ''}
                        onChange={(e) =>
                          setUnitConceptInputs({ ...unitConceptInputs, [unitIndex]: e.target.value })
                        }
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addConceptTag(unitIndex);
                          }
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="e.g., Tense, Grammar (press Enter)"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => addConceptTag(unitIndex)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                        disabled={isLoading}
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {unit.conceptTags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeConceptTag(unitIndex, tag)}
                            className="hover:text-blue-900"
                            disabled={isLoading}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Example Sentences */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Example Sentences
                    </label>
                    <div className="space-y-2">
                      {unit.exampleSentences.map((sentence, sentenceIndex) => (
                        <div key={sentenceIndex} className="flex gap-2">
                          <input
                            type="text"
                            value={sentence}
                            onChange={(e) => {
                              const newSentences = [...unit.exampleSentences];
                              newSentences[sentenceIndex] = e.target.value;
                              updateUnit(unitIndex, 'exampleSentences', newSentences);
                            }}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => removeExample(unitIndex, 'exampleSentences', sentenceIndex)}
                            className="px-3 py-2 text-red-600 hover:text-red-700"
                            disabled={isLoading}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addExample(unitIndex, 'exampleSentences', '')}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        disabled={isLoading}
                      >
                        + Add sentence
                      </button>
                    </div>
                  </div>

                  {/* Example Questions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Example Questions
                    </label>
                    <div className="space-y-2">
                      {unit.exampleQuestions.map((question, questionIndex) => (
                        <div key={questionIndex} className="flex gap-2">
                          <input
                            type="text"
                            value={question}
                            onChange={(e) => {
                              const newQuestions = [...unit.exampleQuestions];
                              newQuestions[questionIndex] = e.target.value;
                              updateUnit(unitIndex, 'exampleQuestions', newQuestions);
                            }}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => removeExample(unitIndex, 'exampleQuestions', questionIndex)}
                            className="px-3 py-2 text-red-600 hover:text-red-700"
                            disabled={isLoading}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addExample(unitIndex, 'exampleQuestions', '')}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        disabled={isLoading}
                      >
                        + Add question
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-4">
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

