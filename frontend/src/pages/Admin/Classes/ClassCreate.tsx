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
import { createUser } from '../../../lib/api/mock/users';
import { ClassForm } from '../../../components/admin/ClassForm';
import { useLanguage } from '../../../i18n';

export const ClassCreate = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);

    try {
      let finalStudentIds = [...data.studentIds];

      // CSV 학생이 있는 경우, 먼저 학생들을 생성
      if (data.csvStudents && data.csvStudents.length > 0) {
        console.log('Creating students from CSV:', data.csvStudents);
        
        // 각 CSV 학생을 순차적으로 생성
        const createdStudentIds = [];
        for (const csvStudent of data.csvStudents) {
          try {
            const newStudent = await createUser({
              name: csvStudent.name,
              email: csvStudent.email,
              role: 'student',
              isActive: true,
              gradeLevel: csvStudent.grade || data.gradeLevel || '',
            });
            createdStudentIds.push(newStudent.id);
          } catch (err) {
            console.error('Failed to create student:', csvStudent.name, err);
          }
        }

        // 생성된 학생 ID를 추가
        finalStudentIds = [...finalStudentIds, ...createdStudentIds];
      }

      // 반 생성 (CSV로 생성된 학생들 포함)
      const classData: ClassFormData = {
        name: data.name,
        gradeLevel: data.gradeLevel,
        subject: data.subject,
        teacherId: data.teacherId,
        studentIds: finalStudentIds,
      };

      const newClass = await createClass(classData);
      
      // Show success message
      const message = data.csvStudents && data.csvStudents.length > 0
        ? (language === 'ko'
          ? `반 "${newClass.name}"이(가) 생성되었습니다! ${data.csvStudents.length}명의 학생이 추가되었습니다.`
          : `Class "${newClass.name}" created successfully with ${data.csvStudents.length} students!`)
        : (language === 'ko'
          ? `반 "${newClass.name}"이(가) 생성되었습니다!`
          : `Class "${newClass.name}" created successfully!`);
      
      alert(message);
      
      // Navigate back to class list
      navigate('/admin/classes');
    } catch (error) {
      console.error('Failed to create class:', error);
      const errorMsg = language === 'ko'
        ? '반 생성에 실패했습니다. 다시 시도해주세요.'
        : 'Failed to create class. Please try again.';
      alert(errorMsg);
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
          {language === 'ko' ? '반 목록으로 돌아가기' : 'Back to Classes'}
        </button>

        <h1 className="text-3xl font-bold text-gray-900">
          {language === 'ko' ? '새 반 만들기' : 'Create New Class'}
        </h1>
        <p className="mt-1 text-gray-600">
          {language === 'ko' 
            ? '선생님과 학생을 지정하여 새로운 반을 만드세요' 
            : 'Set up a new class with teacher and students'}
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <ClassForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isSubmitting}
          submitLabel={language === 'ko' ? '반 만들기' : 'Create Class'}
        />
      </div>
    </div>
  );
};

