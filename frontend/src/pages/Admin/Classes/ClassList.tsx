/**
 * Admin Class List Page (디자인 시스템 적용)
 * 
 * 모든 클래스를 선생님 및 학생과 함께 표시합니다.
 * 관리자가 클래스를 생성, 수정, 삭제할 수 있습니다.
 * 
 * Features:
 * - 테이블 형식으로 클래스 목록 표시
 * - 배정된 선생님 표시
 * - 학생 수 표시
 * - 새 클래스 생성
 * - 기존 클래스 수정
 * - 클래스 삭제
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Class, Teacher, StudentUser } from '../../../types';
import { getClasses, getTeachers, deleteClass } from '../../../lib/api/mock/classes';
import { bulkUploadStudents } from '../../../lib/api/mock/users';
import { useLanguage } from '../../../i18n';
import { BulkStudentUpload } from '../../../components/admin/BulkStudentUpload';
import {
  Page,
  PageHeader,
  Card,
  StatCard,
  Badge,
  Button,
  Spinner,
  Alert,
  Text,
  Heading,
  Stack,
} from '../../../design-system';

export const ClassList = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [classes, setClasses] = useState<Class[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // 마운트 시 데이터 로드
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [classesData, teachersData] = await Promise.all([
        getClasses(),
        getTeachers(),
      ]);

      setClasses(classesData);
      setTeachers(teachersData);
    } catch (err) {
      setError('클래스 목록을 불러오는데 실패했습니다. 다시 시도해주세요.');
      console.error('Error loading classes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (classId: string, className: string) => {
    if (!window.confirm(`정말로 "${className}"를 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await deleteClass(classId);
      setClasses((prev) => prev.filter((c) => c.id !== classId));
    } catch (err) {
      alert('클래스 삭제에 실패했습니다. 다시 시도해주세요.');
      console.error('Error deleting class:', err);
    }
  };

  const getTeacherName = (teacherId?: string) => {
    if (!teacherId) return '-';
    const teacher = teachers.find((t) => t.id === teacherId);
    return teacher ? teacher.name : (language === 'ko' ? '알 수 없음' : 'Unknown');
  };

  const handleBulkUpload = async (students: Partial<StudentUser>[]) => {
    try {
      const result = await bulkUploadStudents(students);
      setUploadSuccess(
        language === 'ko' 
          ? `${result.created}명의 학생이 추가되고, ${result.updated}명이 업데이트되었습니다.`
          : `${result.created} students added, ${result.updated} updated.`
      );
      setIsUploadModalOpen(false);
      
      // 성공 메시지 3초 후 자동 숨김
      setTimeout(() => {
        setUploadSuccess(null);
      }, 5000);
    } catch (err) {
      console.error('Bulk upload error:', err);
      throw err;
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Stack direction="vertical" align="center" gap="md">
          <Spinner size="lg" />
          <Text color="muted">클래스 목록 로딩 중...</Text>
        </Stack>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <Page>
        <Alert variant="error" description={error} />
        <Button variant="primary" onClick={loadData} className="mt-4">
          다시 시도
        </Button>
      </Page>
    );
  }

  return (
    <Page>
      {/* 헤더 */}
      <PageHeader
        title={t('classes.title')}
        description={language === 'ko' ? '클래스를 관리하고, 선생님을 배정하며, 학생을 조직하세요' : 'Manage classes, assign teachers, and organize students'}
      >
        <Stack direction="horizontal" gap="sm">
          <Button
            variant="secondary"
            onClick={() => setIsUploadModalOpen(true)}
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            }
          >
            {language === 'ko' ? '학생 일괄 업로드' : 'Bulk Upload Students'}
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate('/admin/classes/new')}
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            {t('classes.createClass')}
          </Button>
        </Stack>
      </PageHeader>

      {/* 성공 메시지 */}
      {uploadSuccess && (
        <Alert variant="success" description={uploadSuccess} className="mb-4" />
      )}

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="전체 클래스"
          value={classes.length.toString()}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          }
        />
        <StatCard
          label="전체 학생"
          value={classes.reduce((sum, c) => sum + c.studentIds.length, 0).toString()}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
        />
        <StatCard
          label="전체 선생님"
          value={teachers.length.toString()}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          }
        />
      </div>

      {/* 클래스 목록 테이블 */}
      {classes.length === 0 ? (
        <Card>
          <Card.Body className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <Heading level={3} className="mb-2">
              아직 클래스가 없습니다
            </Heading>
            <Text color="muted" className="mb-4">
              첫 번째 클래스를 생성하여 시작하세요
            </Text>
            <Button variant="primary" onClick={() => navigate('/admin/classes/new')}>
              첫 클래스 만들기
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    클래스명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    학년
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    과목
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    담당 선생님
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    학생 수
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {classes.map((classItem) => (
                  <tr key={classItem.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Text weight="medium">{classItem.name}</Text>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Text variant="small" color="muted">
                        {classItem.gradeLevel || '-'}
                      </Text>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="info">
                        {classItem.subject || '일반'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Text variant="small" color="muted">
                        {getTeacherName(classItem.teacherId)}
                      </Text>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Stack direction="horizontal" gap="xs" align="center">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <Text variant="small" weight="medium">
                          {classItem.studentIds.length}
                        </Text>
                      </Stack>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Stack direction="horizontal" gap="sm" justify="end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/admin/classes/${classItem.id}/edit`)}
                        >
                          수정
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(classItem.id, classItem.name)}
                          className="text-red-600 hover:text-red-900"
                        >
                          삭제
                        </Button>
                      </Stack>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* CSV 업로드 모달 */}
      <BulkStudentUpload
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleBulkUpload}
      />
    </Page>
  );
};
