/**
 * Problem Set Create Page
 * 
 * Multi-step form for creating AI-generated problem sets.
 * Steps:
 * 1. Select Curriculum and Unit
 * 2. Configure generation options
 * 3. Generate with AI (simulated)
 * 4. Preview and edit questions
 * 5. Save problem set
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import { Curriculum, ProblemSet, Question, DifficultyLevel } from '../../../types';
import { getCurriculaByTeacher } from '../../../lib/api/mock/curricula';
import { generateProblemSet, createProblemSet } from '../../../lib/api/mock/problemSets';

type Step = 'select' | 'configure' | 'generate' | 'preview';

export const ProblemSetCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Step management
  const [currentStep, setCurrentStep] = useState<Step>('select');

  // Data loading
  const [curricula, setCurricula] = useState<Curriculum[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Step 1: Selection
  const [selectedCurriculumId, setSelectedCurriculumId] = useState('');
  const [selectedUnitId, setSelectedUnitId] = useState('');

  // Step 2: Configuration
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('intermediate');
  const [targetQuestionCount, setTargetQuestionCount] = useState(10);
  const [multipleChoiceRatio, setMultipleChoiceRatio] = useState(50);
  const [shortAnswerRatio, setShortAnswerRatio] = useState(30);
  const [descriptiveRatio, setDescriptiveRatio] = useState(20);

  // Step 3: Generation
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProblemSet, setGeneratedProblemSet] = useState<ProblemSet | null>(null);

  // Step 4: Editing
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadCurricula();
  }, []);

  const loadCurricula = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const data = await getCurriculaByTeacher(user.id);
      setCurricula(data);
    } catch (err) {
      console.error('Failed to load curricula:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedCurriculum = curricula.find((c) => c.id === selectedCurriculumId);
  const selectedUnit = selectedCurriculum?.units.find((u) => u.id === selectedUnitId);

  const handleNextFromSelect = () => {
    if (!selectedCurriculumId || !selectedUnitId) {
      alert('Please select both curriculum and unit');
      return;
    }
    setCurrentStep('configure');
  };

  const handleNextFromConfigure = () => {
    if (!name.trim()) {
      alert('Please enter a problem set name');
      return;
    }

    const totalRatio = multipleChoiceRatio + shortAnswerRatio + descriptiveRatio;
    if (totalRatio !== 100) {
      alert('Question type ratios must add up to 100%');
      return;
    }

    setCurrentStep('generate');
  };

  const handleGenerate = async () => {
    if (!selectedCurriculum || !selectedUnit || !user) return;

    setIsGenerating(true);

    try {
      const config = {
        name,
        curriculumId: selectedCurriculumId,
        unitId: selectedUnitId,
        difficulty,
        targetQuestionCount,
        questionTypeRatio: {
          multipleChoice: multipleChoiceRatio,
          shortAnswer: shortAnswerRatio,
          descriptive: descriptiveRatio,
        },
      };

      const problemSet = await generateProblemSet(
        config,
        selectedCurriculum.name,
        selectedUnit.title,
        selectedUnit.conceptTags
      );

      setGeneratedProblemSet(problemSet);
      setQuestions(problemSet.questions);
      setCurrentStep('preview');
    } catch (error) {
      console.error('Failed to generate problem set:', error);
      alert('Failed to generate problem set. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditQuestion = (index: number, field: keyof Question, value: any) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!generatedProblemSet || !user) return;

    if (questions.length === 0) {
      alert('Cannot save problem set with no questions');
      return;
    }

    setIsSaving(true);

    try {
      const problemSetToSave: ProblemSet = {
        ...generatedProblemSet,
        questions,
        questionCount: questions.length,
      };

      await createProblemSet(problemSetToSave, user.id);
      alert('Problem set created successfully!');
      navigate('/teacher/problem-sets');
    } catch (error) {
      console.error('Failed to save problem set:', error);
      alert('Failed to save problem set. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const getDifficultyColor = (diff: DifficultyLevel) => {
    switch (diff) {
      case 'beginner':
        return 'bg-green-500 hover:bg-green-600 text-white';
      case 'intermediate':
        return 'bg-yellow-500 hover:bg-yellow-600 text-white';
      case 'advanced':
        return 'bg-red-500 hover:bg-red-600 text-white';
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
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/teacher/problem-sets')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Problem Sets
        </button>

        <h1 className="text-3xl font-bold text-gray-900">Create Problem Set with AI</h1>
        <p className="mt-1 text-gray-600">Generate customized problem sets from your curriculum</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[
            { key: 'select', label: 'Select Unit' },
            { key: 'configure', label: 'Configure' },
            { key: 'generate', label: 'Generate' },
            { key: 'preview', label: 'Preview & Save' },
          ].map((step, index) => (
            <div key={step.key} className="flex items-center flex-1">
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep === step.key
                      ? 'bg-primary-500 text-white'
                      : ['select', 'configure', 'generate', 'preview'].indexOf(currentStep) >
                        ['select', 'configure', 'generate', 'preview'].indexOf(step.key as Step)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {['select', 'configure', 'generate', 'preview'].indexOf(currentStep) >
                  ['select', 'configure', 'generate', 'preview'].indexOf(step.key as Step) ? (
                    '✓'
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">{step.label}</span>
              </div>
              {index < 3 && <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Select Curriculum and Unit */}
      {currentStep === 'select' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Curriculum and Unit</h2>

          <div className="space-y-6">
            {/* Curriculum Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Curriculum <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedCurriculumId}
                onChange={(e) => {
                  setSelectedCurriculumId(e.target.value);
                  setSelectedUnitId(''); // Reset unit
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a curriculum...</option>
                {curricula.map((curriculum) => (
                  <option key={curriculum.id} value={curriculum.id}>
                    {curriculum.name} ({curriculum.level})
                  </option>
                ))}
              </select>
            </div>

            {/* Unit Selection */}
            {selectedCurriculum && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {selectedCurriculum.units.map((unit, index) => (
                    <div
                      key={unit.id}
                      onClick={() => setSelectedUnitId(unit.id)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedUnitId === unit.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          checked={selectedUnitId === unit.id}
                          onChange={() => setSelectedUnitId(unit.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            Unit {index + 1}: {unit.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{unit.learningObjective}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {unit.conceptTags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNextFromSelect}
                disabled={!selectedCurriculumId || !selectedUnitId}
                className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Configure Options
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Configure Options */}
      {currentStep === 'configure' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Configure Generation Options</h2>

          <div className="space-y-6">
            {/* Problem Set Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Problem Set Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., Present Perfect Practice Set"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Difficulty Level</label>
              <div className="flex gap-3">
                {(['beginner', 'intermediate', 'advanced'] as DifficultyLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                      difficulty === level
                        ? getDifficultyColor(level)
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Question Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Question Count
              </label>
              <input
                type="number"
                min="5"
                max="50"
                value={targetQuestionCount}
                onChange={(e) => setTargetQuestionCount(parseInt(e.target.value) || 10)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Question Type Ratio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Question Type Ratio (must total 100%)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Multiple Choice</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={multipleChoiceRatio}
                      onChange={(e) => setMultipleChoiceRatio(parseInt(e.target.value) || 0)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <span className="text-gray-700">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Short Answer</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={shortAnswerRatio}
                      onChange={(e) => setShortAnswerRatio(parseInt(e.target.value) || 0)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <span className="text-gray-700">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Descriptive</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={descriptiveRatio}
                      onChange={(e) => setDescriptiveRatio(parseInt(e.target.value) || 0)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <span className="text-gray-700">%</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Total: {multipleChoiceRatio + shortAnswerRatio + descriptiveRatio}%
                {multipleChoiceRatio + shortAnswerRatio + descriptiveRatio !== 100 && (
                  <span className="text-red-600 ml-2">Must equal 100%</span>
                )}
              </p>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setCurrentStep('select')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Back
              </button>
              <button
                onClick={handleNextFromConfigure}
                className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-medium"
              >
                Next: Generate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Generate */}
      {currentStep === 'generate' && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          {!isGenerating ? (
            <>
              <svg
                className="w-20 h-20 mx-auto text-primary-500 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Generate!</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                AI will generate {targetQuestionCount} questions based on "{selectedUnit?.title}" with{' '}
                {difficulty} difficulty.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setCurrentStep('configure')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handleGenerate}
                  className="px-8 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-medium text-lg"
                >
                  🤖 Generate with AI
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mb-6"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Generating Questions...</h2>
              <p className="text-gray-600">AI is creating your personalized problem set. This may take a moment.</p>
            </>
          )}
        </div>
      )}

      {/* Step 4: Preview and Edit */}
      {currentStep === 'preview' && generatedProblemSet && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview & Edit Questions</h2>
            <p className="text-gray-600 mb-6">
              Review and edit the generated questions below. You can modify prompts, options, or remove questions.
            </p>

            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-900">Q{index + 1}</span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          question.type === 'multipleChoice'
                            ? 'bg-blue-100 text-blue-700'
                            : question.type === 'shortAnswer'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {question.type === 'multipleChoice'
                          ? 'Multiple Choice'
                          : question.type === 'shortAnswer'
                          ? 'Short Answer'
                          : 'Descriptive'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveQuestion(index)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>

                  <textarea
                    value={question.prompt}
                    onChange={(e) => handleEditQuestion(index, 'prompt', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
                    rows={2}
                  />

                  {question.options && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Options:</p>
                      {question.options.map((option, optionIndex) => (
                        <input
                          key={optionIndex}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...question.options!];
                            newOptions[optionIndex] = e.target.value;
                            handleEditQuestion(index, 'options', newOptions);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep('configure')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Back to Configure
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || questions.length === 0}
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
                  Saving...
                </>
              ) : (
                'Save Problem Set'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

