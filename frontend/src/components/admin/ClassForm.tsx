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

import { useState, useEffect, FormEvent, useRef } from 'react';
import { ClassFormData, Teacher, Student } from '../../types';
import { useLanguage } from '../../i18n';

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
  const { language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // CSV Upload state
  const [studentInputMode, setStudentInputMode] = useState<'manual' | 'csv'>('manual');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreviewData, setCsvPreviewData] = useState<Array<{ name: string; email: string; grade?: string }>>([]);
  const [csvError, setCsvError] = useState<string | null>(null);

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
      // CSV 모드인 경우, CSV 데이터를 포함해서 전달
      if (studentInputMode === 'csv' && csvPreviewData.length > 0) {
        const formDataWithCsv = {
          ...formData,
          csvStudents: csvPreviewData,
        };
        await onSubmit(formDataWithCsv as any);
      } else {
        await onSubmit(formData);
      }
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

  const handleCsvFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target?.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.csv')) {
      setCsvError(language === 'ko' ? 'CSV 파일만 업로드 가능합니다.' : 'Only CSV files are allowed.');
      return;
    }

    setCsvFile(selectedFile);
    setCsvError(null);
    parseCSV(selectedFile);
  };

  const parseCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          setCsvError(language === 'ko' ? 'CSV 파일에 데이터가 없습니다.' : 'CSV file is empty.');
          return;
        }

        // 헤더 파싱
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        
        // 필수 헤더 확인
        const requiredHeaders = ['name', 'email'];
        const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
        
        if (missingHeaders.length > 0) {
          setCsvError(language === 'ko'
            ? `필수 열이 없습니다: ${missingHeaders.join(', ')}`
            : `Missing required columns: ${missingHeaders.join(', ')}`);
          return;
        }

        // 데이터 파싱
        const parsedStudents: Array<{ name: string; email: string; grade?: string }> = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim());
          if (values.length !== headers.length) continue;

          const student: { name: string; email: string; grade?: string } = {
            name: '',
            email: '',
          };

          headers.forEach((header, index) => {
            const value = values[index];
            switch (header) {
              case 'name':
                student.name = value;
                break;
              case 'email':
                student.email = value;
                break;
              case 'grade':
                student.grade = value;
                break;
            }
          });

          // 유효성 검사
          if (student.name && student.email) {
            parsedStudents.push(student);
          }
        }

        if (parsedStudents.length === 0) {
          setCsvError(language === 'ko'
            ? '유효한 학생 데이터가 없습니다.'
            : 'No valid student data found.');
          return;
        }

        setCsvPreviewData(parsedStudents);
        setCsvError(null);
      } catch (err) {
        console.error('CSV parsing error:', err);
        setCsvError(language === 'ko'
          ? 'CSV 파일을 파싱하는 중 오류가 발생했습니다.'
          : 'Error parsing CSV file.');
      }
    };

    reader.onerror = () => {
      setCsvError(language === 'ko'
        ? '파일을 읽는 중 오류가 발생했습니다.'
        : 'Error reading file.');
    };

    reader.readAsText(file);
  };

  const downloadCsvTemplate = () => {
    const template = 'name,email,grade\n홍길동,hong@school.com,Middle 1\n김철수,kim@school.com,Middle 1\n이영희,lee@school.com,Middle 2';
    const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students_template.csv';
    a.click();
    URL.revokeObjectURL(url);
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
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {language === 'ko' ? '학생 등록' : 'Students'} 
          {studentInputMode === 'manual' && ` (${formData.studentIds.length} ${language === 'ko' ? '명 선택됨' : 'selected'})`}
          {studentInputMode === 'csv' && csvPreviewData.length > 0 && ` (${csvPreviewData.length} ${language === 'ko' ? '명' : 'students'})`}
        </label>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-4 border-b border-gray-200">
          <button
            type="button"
            onClick={() => setStudentInputMode('manual')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              studentInputMode === 'manual'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            disabled={isLoading}
          >
            {language === 'ko' ? '수동 선택' : 'Manual Selection'}
          </button>
          <button
            type="button"
            onClick={() => setStudentInputMode('csv')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              studentInputMode === 'csv'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            disabled={isLoading}
          >
            {language === 'ko' ? 'CSV 파일 업로드' : 'CSV Upload'}
          </button>
        </div>

        {/* Manual Selection Tab */}
        {studentInputMode === 'manual' && (
          <div>
            <div className="flex items-center justify-end mb-2">
              <button
                type="button"
                onClick={handleSelectAllStudents}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                disabled={isLoading}
              >
                {formData.studentIds.length === students.length 
                  ? (language === 'ko' ? '전체 해제' : 'Deselect All')
                  : (language === 'ko' ? '전체 선택' : 'Select All')}
              </button>
            </div>

            <div className="border border-gray-300 rounded-lg max-h-64 overflow-y-auto">
              {students.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  {language === 'ko' ? '등록된 학생이 없습니다' : 'No students available'}
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
        )}

        {/* CSV Upload Tab */}
        {studentInputMode === 'csv' && (
          <div className="space-y-4">
            {/* CSV 설명 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-blue-900">
                  {language === 'ko' ? 'CSV 파일 형식' : 'CSV File Format'}
                </p>
                <p className="text-sm text-blue-800">
                  {language === 'ko' ? '필수 열: name, email' : 'Required columns: name, email'}
                </p>
                <p className="text-sm text-blue-800">
                  {language === 'ko' ? '선택 열: grade' : 'Optional columns: grade'}
                </p>
                <button
                  type="button"
                  onClick={downloadCsvTemplate}
                  className="mt-2 text-sm text-blue-700 hover:text-blue-800 font-medium underline"
                >
                  {language === 'ko' ? '📥 템플릿 다운로드' : '📥 Download Template'}
                </button>
              </div>
            </div>

            {/* 파일 선택 */}
            {csvPreviewData.length === 0 && (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleCsvFileSelect}
                  className="hidden"
                  id="csv-file-input"
                />
                <label
                  htmlFor="csv-file-input"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-gray-600">
                    {csvFile ? csvFile.name : (language === 'ko' ? 'CSV 파일을 선택하세요' : 'Select CSV file')}
                  </p>
                </label>
              </div>
            )}

            {/* 에러 메시지 */}
            {csvError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">{csvError}</p>
              </div>
            )}

            {/* CSV 미리보기 */}
            {csvPreviewData.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700">
                    {language === 'ko' ? '미리보기' : 'Preview'} ({csvPreviewData.length} {language === 'ko' ? '명' : 'students'})
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setCsvPreviewData([]);
                      setCsvFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {language === 'ko' ? '다시 선택' : 'Select Again'}
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          {language === 'ko' ? '이름' : 'Name'}
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          {language === 'ko' ? '이메일' : 'Email'}
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          {language === 'ko' ? '학년' : 'Grade'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {csvPreviewData.map((student, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-3 py-2 text-gray-900">{student.name}</td>
                          <td className="px-3 py-2 text-gray-600">{student.email}</td>
                          <td className="px-3 py-2 text-gray-600">{student.grade || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✓ {language === 'ko' 
                      ? `${csvPreviewData.length}명의 학생이 반 생성 시 자동으로 등록됩니다.` 
                      : `${csvPreviewData.length} students will be automatically registered when the class is created.`}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
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

