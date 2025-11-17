/**
 * Bulk Student Upload Component
 * 
 * CSV 파일로 학생 정보 일괄 업로드
 */

import { useState, useRef } from 'react';
import { useLanguage } from '../../i18n';
import { 
  Modal, 
  Button, 
  Alert, 
  Text, 
  Heading, 
  Stack,
  Spinner 
} from '../../design-system';
import { StudentUser } from '../../types';

interface BulkStudentUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (students: Partial<StudentUser>[]) => Promise<void>;
}

interface CSVStudent {
  name: string;
  email: string;
  externalId?: string;
  grade?: string;
  classId?: string;
}

export const BulkStudentUpload = ({ isOpen, onClose, onUpload }: BulkStudentUploadProps) => {
  const { t, language } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<CSVStudent[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.csv')) {
      setError(language === 'ko' 
        ? 'CSV 파일만 업로드 가능합니다.' 
        : 'Only CSV files are allowed.');
      return;
    }

    setFile(selectedFile);
    setError(null);
    parseCSV(selectedFile);
  };

  const parseCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          setError(language === 'ko' 
            ? 'CSV 파일에 데이터가 없습니다.' 
            : 'CSV file is empty.');
          return;
        }

        // 헤더 파싱
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        
        // 필수 헤더 확인
        const requiredHeaders = ['name', 'email'];
        const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
        
        if (missingHeaders.length > 0) {
          setError(language === 'ko'
            ? `필수 열이 없습니다: ${missingHeaders.join(', ')}`
            : `Missing required columns: ${missingHeaders.join(', ')}`);
          return;
        }

        // 데이터 파싱
        const students: CSVStudent[] = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim());
          if (values.length !== headers.length) continue;

          const student: CSVStudent = {
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
              case 'externalid':
              case 'external_id':
              case 'studentid':
              case 'student_id':
                student.externalId = value;
                break;
              case 'grade':
                student.grade = value;
                break;
              case 'classid':
              case 'class_id':
              case 'class':
                student.classId = value;
                break;
            }
          });

          // 유효성 검사
          if (student.name && student.email) {
            students.push(student);
          }
        }

        if (students.length === 0) {
          setError(language === 'ko'
            ? '유효한 학생 데이터가 없습니다.'
            : 'No valid student data found.');
          return;
        }

        setPreviewData(students);
        setShowPreview(true);
        setError(null);
      } catch (err) {
        console.error('CSV parsing error:', err);
        setError(language === 'ko'
          ? 'CSV 파일을 파싱하는 중 오류가 발생했습니다.'
          : 'Error parsing CSV file.');
      }
    };

    reader.onerror = () => {
      setError(language === 'ko'
        ? '파일을 읽는 중 오류가 발생했습니다.'
        : 'Error reading file.');
    };

    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (previewData.length === 0) return;

    setIsProcessing(true);
    setError(null);

    try {
      const studentsToUpload: Partial<StudentUser>[] = previewData.map(s => ({
        name: s.name,
        email: s.email,
        role: 'student' as const,
        externalId: s.externalId,
        classId: s.classId,
        isActive: true,
      }));

      await onUpload(studentsToUpload);
      
      // 성공 후 리셋
      handleClose();
    } catch (err) {
      console.error('Upload error:', err);
      setError(language === 'ko'
        ? '학생 정보 업로드 중 오류가 발생했습니다.'
        : 'Error uploading student data.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setPreviewData([]);
    setShowPreview(false);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  const downloadTemplate = () => {
    const template = 'name,email,externalId,grade,classId\n학생1,student1@school.com,2024001,7,class-1\n학생2,student2@school.com,2024002,7,class-1';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_upload_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={language === 'ko' ? '학생 일괄 업로드' : 'Bulk Student Upload'}>
      <Stack direction="vertical" gap="lg">
        {/* 설명 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <Stack direction="vertical" gap="sm">
            <Text variant="small" weight="semibold" className="text-blue-900">
              {language === 'ko' ? 'CSV 파일 형식' : 'CSV File Format'}
            </Text>
            <Text variant="small" className="text-blue-800">
              {language === 'ko' 
                ? '필수 열: name, email' 
                : 'Required columns: name, email'}
            </Text>
            <Text variant="small" className="text-blue-800">
              {language === 'ko' 
                ? '선택 열: externalId, grade, classId' 
                : 'Optional columns: externalId, grade, classId'}
            </Text>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={downloadTemplate}
              className="mt-2 w-fit"
            >
              {language === 'ko' ? '템플릿 다운로드' : 'Download Template'}
            </Button>
          </Stack>
        </div>

        {/* 파일 선택 */}
        {!showPreview && (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
              id="csv-upload"
            />
            <label
              htmlFor="csv-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <Text variant="small" className="text-gray-600">
                {file ? file.name : (language === 'ko' ? 'CSV 파일을 선택하거나 드래그하세요' : 'Select or drag CSV file')}
              </Text>
            </label>
          </div>
        )}

        {/* 에러 메시지 */}
        {error && <Alert variant="error" description={error} />}

        {/* 미리보기 */}
        {showPreview && previewData.length > 0 && (
          <div>
            <Heading level={3} className="mb-3">
              {language === 'ko' ? '미리보기' : 'Preview'} ({previewData.length} {language === 'ko' ? '명' : 'students'})
            </Heading>
            <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left">{language === 'ko' ? '이름' : 'Name'}</th>
                    <th className="px-3 py-2 text-left">{language === 'ko' ? '이메일' : 'Email'}</th>
                    <th className="px-3 py-2 text-left">{language === 'ko' ? '학번' : 'ID'}</th>
                    <th className="px-3 py-2 text-left">{language === 'ko' ? '학년' : 'Grade'}</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.slice(0, 10).map((student, index) => (
                    <tr key={index} className="border-t border-gray-100">
                      <td className="px-3 py-2">{student.name}</td>
                      <td className="px-3 py-2">{student.email}</td>
                      <td className="px-3 py-2">{student.externalId || '-'}</td>
                      <td className="px-3 py-2">{student.grade || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {previewData.length > 10 && (
                <div className="p-2 text-center text-sm text-gray-500 bg-gray-50 border-t">
                  {language === 'ko' ? `외 ${previewData.length - 10}명 더...` : `and ${previewData.length - 10} more...`}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 버튼 */}
        <Stack direction="horizontal" gap="sm" className="justify-end">
          {showPreview && (
            <Button
              variant="secondary"
              onClick={() => {
                setShowPreview(false);
                setPreviewData([]);
                setFile(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
            >
              {language === 'ko' ? '다시 선택' : 'Select Again'}
            </Button>
          )}
          <Button variant="secondary" onClick={handleClose} disabled={isProcessing}>
            {language === 'ko' ? '취소' : 'Cancel'}
          </Button>
          {showPreview && (
            <Button
              variant="primary"
              onClick={handleUpload}
              disabled={isProcessing || previewData.length === 0}
              isLoading={isProcessing}
            >
              {isProcessing 
                ? (language === 'ko' ? '업로드 중...' : 'Uploading...') 
                : (language === 'ko' ? `${previewData.length}명 업로드` : `Upload ${previewData.length} students`)}
            </Button>
          )}
        </Stack>
      </Stack>
    </Modal>
  );
};

