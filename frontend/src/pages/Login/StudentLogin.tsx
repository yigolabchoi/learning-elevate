/**
 * Student & Parent Login Page - 학생&학부모용 로그인
 * 
 * 학생과 학부모를 위한 전용 로그인 페이지
 * 심플하고 친근한 디자인
 */

import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { useLanguage } from '../../i18n';
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

export const StudentLogin = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'parent'>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    const redirectPath = role === 'student' ? '/student/home' : '/parent/children';
    navigate(redirectPath, { replace: true });
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError(t('login.errors.emailRequired'));
      return;
    }

    if (!password.trim()) {
      setError(t('login.errors.passwordRequired'));
      return;
    }

    if (password.length < 6) {
      setError(t('login.errors.passwordTooShort'));
      return;
    }

    setIsLoading(true);

    try {
      const mockEmailMap: Record<'student' | 'parent', string> = {
        student: 'student@school.com',
        parent: 'parent@school.com',
      };
      
      const mockEmail = mockEmailMap[role];
      await login(mockEmail, password);

      const redirectPath = role === 'student' ? '/student/home' : '/parent/children';
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(t('login.errors.invalidCredentials'));
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = async (targetRole: 'student' | 'parent') => {
    setIsLoading(true);
    setError('');

    const mockEmailMap: Record<'student' | 'parent', string> = {
      student: 'student@school.com',
      parent: 'parent@school.com',
    };

    try {
      const mockEmail = mockEmailMap[targetRole];
      await login(mockEmail, 'password123');
      
      const redirectPath = targetRole === 'student' ? '/student/home' : '/parent/children';
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(t('login.errors.loginFailed'));
      console.error('Quick login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* 언어 전환 버튼 */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          <span className="text-sm font-medium text-gray-700">
            {language === 'ko' ? 'English' : '한국어'}
          </span>
        </button>
      </div>

      <Box className="w-full max-w-md px-4">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <Text variant="small">{t('common.backToHome')}</Text>
        </button>

        {/* 로그인 카드 */}
        <Card className="shadow-lg">
          <Card.Body className="p-8">
            {/* 헤더 */}
            <div className="text-center mb-8">
              <Heading level={1} className="text-gray-900 mb-2">
                {t('common.appName')}
              </Heading>
              <Text className="text-gray-600">
                {t('login.learningPortal')}
              </Text>
            </div>

            <form onSubmit={handleSubmit}>
              <Stack direction="vertical" gap="lg">
                {/* 역할 선택 */}
                <div>
                  <Text variant="small" weight="medium" className="mb-3 block text-gray-700">
                    {t('login.loginType')}
                  </Text>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole('student')}
                      className={`px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm ${
                        role === 'student'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {t('login.roles.student')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('parent')}
                      className={`px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm ${
                        role === 'parent'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {t('login.roles.parent')}
                    </button>
                  </div>
                </div>

                {/* 이메일 */}
                <Input
                  id="email"
                  type="email"
                  label={t('login.email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('login.emailPlaceholder')}
                  disabled={isLoading}
                  fullWidth
                  autoComplete="email"
                />

                {/* 비밀번호 */}
                <Input
                  id="password"
                  type="password"
                  label={t('login.password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('login.passwordPlaceholder')}
                  disabled={isLoading}
                  fullWidth
                  autoComplete="current-password"
                />

                {/* 에러 */}
                {error && <Alert variant="error" description={error} />}

                {/* 로그인 버튼 */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  fullWidth
                >
                  {isLoading ? t('login.loggingIn') : t('common.login')}
                </Button>

                {/* 비밀번호 찾기 */}
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-primary-600 hover:text-primary-700"
                    onClick={() => alert(t('login.forgotPassword'))}
                  >
                    {t('login.forgotPassword')}
                  </button>
                </div>
              </Stack>
            </form>
          </Card.Body>
        </Card>

        {/* 개발용 버튼 */}
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <Text variant="small" weight="semibold" className="text-amber-900">
              {t('login.dev.title')}
            </Text>
            <span className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-semibold">
              {t('login.dev.badge')}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => quickLogin('student')}
              disabled={isLoading}
            >
              Student
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => quickLogin('parent')}
              disabled={isLoading}
            >
              Parent
            </Button>
          </div>
        </div>

        {/* 푸터 */}
        <Text variant="small" color="muted" className="text-center mt-6">
          {t('common.copyright')}
        </Text>
      </Box>
    </div>
  );
};
