/**
 * Login Page - Learning Elevate Portal
 * 
 * 통합 로그인 페이지 (디자인 시스템 적용)
 * 모든 사용자 역할(Admin, Teacher, Student, Parent)을 지원합니다.
 * 
 * Features:
 * - 이메일 및 비밀번호 인증
 * - 역할 선택 (Admin / Teacher / Student / Parent)
 * - 폼 검증
 * - 에러 처리
 * - 로그인 후 자동 리다이렉트
 */

import { useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '../../auth/AuthContext';
import { 
  Card, 
  Input, 
  Button, 
  Alert, 
  Heading, 
  Text, 
  Stack,
  Box 
} from '../../design-system';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  // 랜딩 페이지에서 전달된 포털 타입에 따라 초기 역할 설정
  const portalType = location.state?.portalType;
  const initialRole: UserRole = portalType === 'school' ? 'teacher' : 'student';

  // 폼 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(initialRole);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 이미 인증된 경우 리다이렉트
  if (isAuthenticated) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // 검증
    if (!email.trim()) {
      setError('이메일 주소를 입력해주세요');
      return;
    }

    if (!password.trim()) {
      setError('비밀번호를 입력해주세요');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다');
      return;
    }

    setIsLoading(true);

    try {
      // Mock 인증 (역할 기반)
      const mockEmailMap: Record<UserRole, string> = {
        admin: 'admin@school.com',
        teacher: 'teacher@school.com',
        student: 'student@school.com',
        parent: 'parent@school.com',
      };
      
      const mockEmail = mockEmailMap[role];
      await login(mockEmail, password);

      // 역할에 따라 리다이렉트
      const redirectMap: Record<UserRole, string> = {
        admin: '/dashboard',
        teacher: '/dashboard',
        student: '/student/home',
        parent: '/parent/children',
      };

      navigate(redirectMap[role], { replace: true });
    } catch (err) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    { value: 'teacher' as UserRole, label: 'Teacher', icon: '👨‍🏫' },
    { value: 'admin' as UserRole, label: 'Admin', icon: '👔' },
    { value: 'student' as UserRole, label: 'Student', icon: '🎓' },
    { value: 'parent' as UserRole, label: 'Parent', icon: '👨‍👩‍👧' },
  ];

  // 개발용 간편 로그인 함수
  const quickLogin = async (targetRole: UserRole) => {
    setIsLoading(true);
    setError('');

    const mockEmailMap: Record<UserRole, string> = {
      admin: 'admin@school.com',
      teacher: 'teacher@school.com',
      student: 'student@school.com',
      parent: 'parent@school.com',
    };

    try {
      const mockEmail = mockEmailMap[targetRole];
      await login(mockEmail, 'password123');

      const redirectMap: Record<UserRole, string> = {
        admin: '/dashboard',
        teacher: '/dashboard',
        student: '/student/home',
        parent: '/parent/children',
      };

      navigate(redirectMap[targetRole], { replace: true });
    } catch (err) {
      setError('로그인에 실패했습니다.');
      console.error('Quick login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary-50 via-white to-secondary-50">
      <Box className="w-full max-w-md px-4">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate('/')}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <Text variant="small">처음으로 돌아가기</Text>
        </button>

        {/* 헤더 */}
        <Stack direction="vertical" gap="md" align="center" className="mb-8">
          <Box className="text-center">
            <Heading level={1} className="text-primary-500">
              Learning Elevate
            </Heading>
            <div className="h-1 w-32 bg-primary-500 mx-auto mt-2 rounded-full"></div>
          </Box>
          <Text variant="body" weight="medium" className="text-xl text-gray-700">
            Learning Portal
          </Text>
          <Text variant="caption" color="muted">
            로그인하여 포털에 접속하세요
          </Text>
        </Stack>

        {/* 로그인 카드 */}
        <Card className="shadow-xl">
          <Card.Body>
            <Heading level={2} className="mb-6">
              환영합니다
            </Heading>

            <form onSubmit={handleSubmit}>
              <Stack direction="vertical" gap="lg">
                {/* 역할 선택 */}
                <div>
                  <Text variant="caption" weight="medium" className="mb-2 block">
                    로그인 계정
                  </Text>
                  <div className="grid grid-cols-2 gap-3">
                    {roleOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setRole(option.value)}
                        className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                          role === option.value
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {option.icon} {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 이메일 필드 */}
                <Input
                  id="email"
                  type="email"
                  label="이메일 주소"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@school.com"
                  disabled={isLoading}
                  fullWidth
                  autoComplete="email"
                />

                {/* 비밀번호 필드 */}
                <Input
                  id="password"
                  type="password"
                  label="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                  fullWidth
                  autoComplete="current-password"
                />

                {/* 에러 메시지 */}
                {error && (
                  <Alert variant="error" description={error} />
                )}

                {/* 로그인 버튼 */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  fullWidth
                >
                  {isLoading ? '로그인 중...' : '로그인'}
                </Button>

                {/* 비밀번호 찾기 */}
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    onClick={() => alert('비밀번호 재설정 기능은 곧 제공됩니다!')}
                  >
                    비밀번호를 잊으셨나요?
                  </button>
                </div>
              </Stack>
            </form>
          </Card.Body>
        </Card>

        {/* 데모 계정 안내 */}
        <Card variant="muted" className="mt-6">
          <Card.Body>
            <Stack direction="vertical" gap="sm">
              <Text variant="small" weight="semibold" className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                데모 계정
              </Text>
              <Stack direction="vertical" gap="xs" className="text-xs text-gray-600">
                <div className="flex items-center justify-between">
                  <Text variant="small" weight="medium">관리자:</Text>
                  <code className="bg-white px-2 py-1 rounded text-xs">
                    admin@school.com / password123
                  </code>
                </div>
                <div className="flex items-center justify-between">
                  <Text variant="small" weight="medium">선생님:</Text>
                  <code className="bg-white px-2 py-1 rounded text-xs">
                    teacher@school.com / password123
                  </code>
                </div>
                <div className="flex items-center justify-between">
                  <Text variant="small" weight="medium">학생:</Text>
                  <code className="bg-white px-2 py-1 rounded text-xs">
                    student@school.com / password123
                  </code>
                </div>
                <div className="flex items-center justify-between">
                  <Text variant="small" weight="medium">학부모:</Text>
                  <code className="bg-white px-2 py-1 rounded text-xs">
                    parent@school.com / password123
                  </code>
                </div>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>

        {/* 개발용 간편 로그인 버튼 */}
        <Card className="mt-4 border-2 border-dashed border-yellow-300 bg-yellow-50">
          <Card.Body>
            <Stack direction="vertical" gap="sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <Text variant="small" weight="bold" className="text-yellow-800">
                  개발용 간편 로그인
                </Text>
                <span className="ml-auto px-2 py-0.5 bg-yellow-200 text-yellow-800 text-xs font-semibold rounded">
                  DEV ONLY
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => quickLogin('admin')}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2"
                >
                  <span>👔</span>
                  <span>Admin</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => quickLogin('teacher')}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2"
                >
                  <span>👨‍🏫</span>
                  <span>Teacher</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => quickLogin('student')}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2"
                >
                  <span>🎓</span>
                  <span>Student</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => quickLogin('parent')}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2"
                >
                  <span>👨‍👩‍👧</span>
                  <span>Parent</span>
                </Button>
              </div>

              <Text variant="small" className="text-yellow-700 text-center">
                클릭 한 번으로 각 역할로 바로 로그인됩니다
              </Text>
            </Stack>
          </Card.Body>
        </Card>

        {/* 푸터 */}
        <Text variant="small" color="muted" className="text-center mt-6">
          © 2025 Learning Elevate. All rights reserved.
        </Text>
      </Box>
    </div>
  );
};
