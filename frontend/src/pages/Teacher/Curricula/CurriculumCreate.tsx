/**
 * Curriculum Create Page (AI-Powered)
 * 
 * 선생님이 PDF나 이미지 파일을 업로드하면 AI가 분석하여
 * 유사한 문제를 자동 생성하는 새로운 플로우
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import { useLanguage } from '../../../i18n';
import { 
  analyzeFile, 
  generateSimilarQuestions, 
  FileAnalysisResult 
} from '../../../lib/english/fileAnalyzer';
import { EnglishQuestion } from '../../../lib/english';
import {
  Page,
  PageHeader,
  Card,
  Button,
  Alert,
  Spinner,
  Text,
  Heading,
  Stack,
  Badge,
  Input,
  Select,
} from '../../../design-system';

type Step = 'upload' | 'analyzing' | 'review' | 'finalize';

export const CurriculumCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, language } = useLanguage();

  // State
  const [step, setStep] = useState<Step>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<FileAnalysisResult | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<EnglishQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Curriculum metadata
  const [curriculumName, setCurriculumName] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [questionCount, setQuestionCount] = useState(5);

  // 파일 선택 핸들러
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 타입 체크
    const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setError(language === 'ko' 
        ? 'PDF 또는 이미지 파일만 업로드 가능합니다.' 
        : 'Only PDF or image files are allowed.');
      return;
    }

    // 파일 크기 체크 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError(language === 'ko'
        ? '파일 크기는 10MB를 초과할 수 없습니다.'
        : 'File size cannot exceed 10MB.');
      return;
    }

    setUploadedFile(file);
    setError(null);
  };

  // 파일 분석 시작
  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setStep('analyzing');
    setError(null);

    try {
      // AI 파일 분석
      const result = await analyzeFile(uploadedFile);
      setAnalysisResult(result);
      setSelectedDifficulty(result.suggestedDifficulty);
      
      // 기본 커리큘럼 이름 설정
      if (!curriculumName) {
        const baseName = uploadedFile.name.replace(/\.[^/.]+$/, '');
        setCurriculumName(`${baseName} - AI Generated`);
      }

      setStep('review');
    } catch (err) {
      console.error('Analysis error:', err);
      setError(language === 'ko'
        ? '파일 분석 중 오류가 발생했습니다. 다시 시도해주세요.'
        : 'Error analyzing file. Please try again.');
      setStep('upload');
    } finally {
      setIsProcessing(false);
    }
  };

  // 문제 생성
  const handleGenerateQuestions = () => {
    if (!analysisResult) return;

    setIsProcessing(true);
    
    try {
      const questions = generateSimilarQuestions(
        analysisResult.analyzedQuestions,
        questionCount
      );
      setGeneratedQuestions(questions);
      setStep('finalize');
    } catch (err) {
      console.error('Generation error:', err);
      setError(language === 'ko'
        ? '문제 생성 중 오류가 발생했습니다.'
        : 'Error generating questions.');
    } finally {
      setIsProcessing(false);
    }
  };

  // 최종 생성 (실제로는 서버에 저장)
  const handleFinalize = () => {
    alert(language === 'ko'
      ? `"${curriculumName}" 커리큘럼이 생성되었습니다!\n\n생성된 문제 수: ${generatedQuestions.length}개\n난이도: ${selectedDifficulty}\n\n이제 학생들에게 과제로 배정할 수 있습니다.`
      : `"${curriculumName}" curriculum created!\n\nGenerated questions: ${generatedQuestions.length}\nDifficulty: ${selectedDifficulty}\n\nYou can now assign it to students.`);
    
    navigate('/teacher/curricula');
  };

  // Step 1: 파일 업로드
  const renderUploadStep = () => (
    <Card>
      <Card.Body className="p-8">
        <Stack direction="vertical" gap="lg">
          {/* 설명 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <Stack direction="vertical" gap="sm">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <Heading level={3} className="text-blue-900 mb-2">
                    {language === 'ko' ? 'AI 기반 문제 생성' : 'AI-Powered Question Generation'}
                  </Heading>
                  <Text className="text-blue-800">
                    {language === 'ko'
                      ? '선생님이 가지고 계신 문제 파일(PDF 또는 이미지)을 업로드하시면, AI가 자동으로 분석하여 유사한 유형의 문제를 생성합니다.'
                      : 'Upload your question file (PDF or image), and AI will automatically analyze it to generate similar questions.'}
                  </Text>
                </div>
              </div>
              
              <div className="mt-4 pl-9">
                <Text variant="small" weight="semibold" className="text-blue-900 mb-2 block">
                  {language === 'ko' ? '지원 형식:' : 'Supported formats:'}
                </Text>
                <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                  <li>PDF (.pdf)</li>
                  <li>{language === 'ko' ? '이미지' : 'Images'} (.jpg, .jpeg, .png)</li>
                  <li>{language === 'ko' ? '최대 파일 크기: 10MB' : 'Max file size: 10MB'}</li>
                </ul>
              </div>
            </Stack>
          </div>

          {/* 파일 업로드 영역 */}
          <div>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50 transition-all duration-200"
            >
              {uploadedFile ? (
                <Stack direction="vertical" align="center" gap="md">
                  <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-center">
                    <Text weight="semibold">{uploadedFile.name}</Text>
                    <Text variant="small" color="muted">
                      {(uploadedFile.size / 1024).toFixed(0)} KB
                    </Text>
                  </div>
                  <Text variant="small" className="text-gray-600">
                    {language === 'ko' ? '다른 파일을 선택하려면 클릭하세요' : 'Click to select another file'}
                  </Text>
                </Stack>
              ) : (
                <Stack direction="vertical" align="center" gap="md">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <div className="text-center">
                    <Text weight="semibold" className="text-gray-700">
                      {language === 'ko' ? '파일을 선택하거나 드래그하세요' : 'Click or drag file here'}
                    </Text>
                    <Text variant="small" color="muted">
                      PDF, JPG, PNG (max 10MB)
                    </Text>
                  </div>
                </Stack>
              )}
            </label>
          </div>

          {/* 에러 메시지 */}
          {error && <Alert variant="error" description={error} />}

          {/* 버튼 */}
          <Stack direction="horizontal" gap="sm" className="justify-end">
            <Button variant="secondary" onClick={() => navigate('/teacher/curricula')}>
              {language === 'ko' ? '취소' : 'Cancel'}
            </Button>
            <Button
              variant="primary"
              onClick={handleAnalyze}
              disabled={!uploadedFile || isProcessing}
            >
              {language === 'ko' ? 'AI 분석 시작' : 'Start AI Analysis'}
            </Button>
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );

  // Step 2: 분석 중
  const renderAnalyzingStep = () => (
    <Card>
      <Card.Body className="p-12">
        <Stack direction="vertical" align="center" gap="lg">
          <Spinner size="lg" />
          <Heading level={2} className="text-center">
            {language === 'ko' ? 'AI가 파일을 분석하고 있습니다...' : 'AI is analyzing your file...'}
          </Heading>
          <Text color="muted" className="text-center max-w-md">
            {language === 'ko'
              ? '문제 유형, 난이도, 개념을 파악하는 중입니다. 잠시만 기다려주세요.'
              : 'Identifying question types, difficulty levels, and concepts. Please wait.'}
          </Text>
          <div className="w-full max-w-md bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-primary-500 h-full rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </Stack>
      </Card.Body>
    </Card>
  );

  // Step 3: 분석 결과 검토
  const renderReviewStep = () => (
    <Stack direction="vertical" gap="lg">
      {/* 분석 결과 요약 */}
      <Card>
        <Card.Body>
          <Heading level={2} className="mb-4">
            {language === 'ko' ? '분석 결과' : 'Analysis Results'}
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <Text variant="small" color="muted" className="mb-1">
                {language === 'ko' ? '감지된 문제 수' : 'Detected Questions'}
              </Text>
              <Heading level={3}>{analysisResult?.analyzedQuestions.length || 0}</Heading>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <Text variant="small" color="muted" className="mb-1">
                {language === 'ko' ? '권장 난이도' : 'Suggested Difficulty'}
              </Text>
              <Heading level={3} className="capitalize">
                {analysisResult?.suggestedDifficulty || '-'}
              </Heading>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <Text variant="small" color="muted" className="mb-1">
                {language === 'ko' ? '처리 시간' : 'Processing Time'}
              </Text>
              <Heading level={3}>
                {((analysisResult?.processingTime || 0) / 1000).toFixed(1)}s
              </Heading>
            </div>
          </div>

          <div className="mb-6">
            <Text variant="small" weight="semibold" className="mb-2 block">
              {language === 'ko' ? '감지된 개념:' : 'Detected Concepts:'}
            </Text>
            <div className="flex flex-wrap gap-2">
              {analysisResult?.detectedConcepts.map((concept, index) => (
                <Badge key={index} variant="info">
                  {concept}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Text variant="small" weight="semibold" className="mb-3 block">
              {language === 'ko' ? '분석된 문제들:' : 'Analyzed Questions:'}
            </Text>
            <div className="space-y-3">
              {analysisResult?.analyzedQuestions.map((q, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="neutral" className="capitalize">
                      {q.questionType}
                    </Badge>
                    <Badge variant={
                      q.difficulty === 'beginner' ? 'success' :
                      q.difficulty === 'intermediate' ? 'warning' : 'error'
                    }>
                      {q.difficulty}
                    </Badge>
                  </div>
                  <Text variant="small" className="text-gray-700">
                    {q.originalText}
                  </Text>
                  <Text variant="small" color="muted" className="mt-2">
                    {q.extractedPattern}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* 문제 생성 설정 */}
      <Card>
        <Card.Body>
          <Heading level={2} className="mb-4">
            {language === 'ko' ? '문제 생성 설정' : 'Question Generation Settings'}
          </Heading>

          <Stack direction="vertical" gap="md">
            <Input
              label={language === 'ko' ? '커리큘럼 이름' : 'Curriculum Name'}
              value={curriculumName}
              onChange={(e) => setCurriculumName(e.target.value)}
              placeholder={language === 'ko' ? '예: 중급 영어 문법 연습' : 'e.g., Intermediate English Grammar'}
              fullWidth
            />

            <Select
              label={language === 'ko' ? '난이도' : 'Difficulty'}
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as any)}
              fullWidth
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </Select>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ko' ? '생성할 문제 수:' : 'Number of Questions:'} {questionCount}
              </label>
              <input
                type="range"
                min="3"
                max="10"
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>3</span>
                <span>10</span>
              </div>
            </div>
          </Stack>

          <Stack direction="horizontal" gap="sm" className="justify-end mt-6">
            <Button variant="secondary" onClick={() => setStep('upload')}>
              {language === 'ko' ? '다시 업로드' : 'Upload Again'}
            </Button>
            <Button
              variant="primary"
              onClick={handleGenerateQuestions}
              disabled={!curriculumName.trim() || isProcessing}
            >
              {language === 'ko' ? '문제 생성' : 'Generate Questions'}
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </Stack>
  );

  // Step 4: 생성된 문제 확인 및 최종 생성
  const renderFinalizeStep = () => (
    <Card>
      <Card.Body>
        <Heading level={2} className="mb-4">
          {language === 'ko' ? '생성된 문제' : 'Generated Questions'}
        </Heading>

        <Alert 
          variant="success" 
          description={language === 'ko'
            ? `${generatedQuestions.length}개의 문제가 성공적으로 생성되었습니다!`
            : `${generatedQuestions.length} questions successfully generated!`}
          className="mb-6"
        />

        <div className="space-y-4 mb-6">
          {generatedQuestions.map((q, index) => (
            <div key={q.id} className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 bg-primary-100 text-primary-700 rounded-full font-semibold text-sm">
                    {index + 1}
                  </span>
                  <Heading level={4}>{q.title}</Heading>
                </div>
                <div className="flex gap-2">
                  <Badge variant="neutral" className="capitalize">{q.type}</Badge>
                  <Badge variant={
                    q.difficulty === 'beginner' ? 'success' :
                    q.difficulty === 'intermediate' ? 'warning' : 'error'
                  }>
                    {q.difficulty}
                  </Badge>
                </div>
              </div>
              
              <Text className="whitespace-pre-wrap mb-3">
                {q.question}
              </Text>
              
              {q.options && (
                <div className="mt-2">
                  <Text variant="small" weight="semibold" className="mb-1">Options:</Text>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {q.options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-3 flex gap-2 flex-wrap">
                {q.conceptTags.map((tag, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              <Text variant="small" color="muted" className="mt-2">
                ⏱️ {language === 'ko' ? '예상 시간:' : 'Estimated time:'} {q.estimatedTime} {language === 'ko' ? '분' : 'min'}
              </Text>
            </div>
          ))}
        </div>

        <Stack direction="horizontal" gap="sm" className="justify-end">
          <Button variant="secondary" onClick={() => setStep('review')}>
            {language === 'ko' ? '설정 수정' : 'Modify Settings'}
          </Button>
          <Button variant="primary" onClick={handleFinalize}>
            {language === 'ko' ? '커리큘럼 생성 완료' : 'Finalize Curriculum'}
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );

  return (
    <Page>
      <PageHeader
        title={language === 'ko' ? 'AI 문제 생성' : 'AI Question Generation'}
        description={language === 'ko'
          ? '파일을 업로드하여 AI가 자동으로 문제를 생성하도록 하세요'
          : 'Upload a file and let AI automatically generate questions'}
      >
        <Button variant="secondary" onClick={() => navigate('/teacher/curricula')}>
          {language === 'ko' ? '목록으로' : 'Back to List'}
        </Button>
      </PageHeader>

      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {['upload', 'analyzing', 'review', 'finalize'].map((s, index) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                step === s ? 'bg-primary-500 text-white' :
                ['upload', 'analyzing', 'review', 'finalize'].indexOf(step) > index ? 'bg-green-500 text-white' :
                'bg-gray-200 text-gray-500'
              }`}>
                {['upload', 'analyzing', 'review', 'finalize'].indexOf(step) > index ? '✓' : index + 1}
              </div>
              {index < 3 && (
                <div className={`w-20 h-1 mx-2 ${
                  ['upload', 'analyzing', 'review', 'finalize'].indexOf(step) > index ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      {step === 'upload' && renderUploadStep()}
      {step === 'analyzing' && renderAnalyzingStep()}
      {step === 'review' && renderReviewStep()}
      {step === 'finalize' && renderFinalizeStep()}
    </Page>
  );
};
