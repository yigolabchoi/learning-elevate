/**
 * Landing Page
 * 
 * 교육기관용 포털과 학부모 & 학생 포털을 구분하는 진입 페이지
 * 심플하고 모던한 디자인
 */

import { useNavigate } from 'react-router-dom';
import { Card, Button, Heading, Text, Stack } from '../../design-system';
import { useLanguage } from '../../i18n';

export const Landing = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* 헤더 */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <Heading level={1} className="text-gray-900 text-4xl mb-3">
            {t('landing.title')}
          </Heading>
          <Text className="text-gray-600 text-lg">
            {t('landing.subtitle')}
          </Text>
        </div>

        {/* 포털 선택 */}
        <div className="max-w-5xl mx-auto">
          <Heading level={2} className="text-center mb-3 text-gray-900">
            {t('landing.selectPortal')}
          </Heading>
          <Text className="text-center text-gray-600 mb-12">
            {t('landing.selectPortalDesc')}
          </Text>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 교육기관용 포털 */}
            <Card className="hover:shadow-xl transition-all duration-200 cursor-pointer group border-2 hover:border-primary-500">
              <Card.Body className="p-8">
                <Stack direction="vertical" gap="lg">
                  {/* 아이콘 */}
                  <div className="flex justify-center mb-2">
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>

                  {/* 제목 */}
                  <div className="text-center">
                    <Heading level={2} className="mb-2">
                      {t('landing.school.title')}
                    </Heading>
                    <Text variant="small" color="muted">
                      {t('landing.school.subtitle')}
                    </Text>
                  </div>

                  {/* 설명 */}
                  <Text className="text-center text-gray-600 text-sm">
                    {t('landing.school.description')}
                  </Text>

                  {/* 기능 목록 */}
                  <Stack direction="vertical" gap="xs" className="mt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('landing.school.feature1')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('landing.school.feature2')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('landing.school.feature3')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('landing.school.feature4')}</span>
                    </div>
                  </Stack>

                  {/* 버튼 */}
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate('/school/login')}
                    className="w-full mt-4"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {t('landing.school.button')}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Button>
                </Stack>
              </Card.Body>
            </Card>

            {/* 학부모 & 학생 포털 */}
            <Card className="hover:shadow-xl transition-all duration-200 cursor-pointer group border-2 hover:border-primary-500">
              <Card.Body className="p-8">
                <Stack direction="vertical" gap="lg">
                  {/* 아이콘 */}
                  <div className="flex justify-center mb-2">
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>

                  {/* 제목 */}
                  <div className="text-center">
                    <Heading level={2} className="mb-2">
                      {t('landing.student.title')}
                    </Heading>
                    <Text variant="small" color="muted">
                      {t('landing.student.subtitle')}
                    </Text>
                  </div>

                  {/* 설명 */}
                  <Text className="text-center text-gray-600 text-sm">
                    {t('landing.student.description')}
                  </Text>

                  {/* 기능 목록 */}
                  <Stack direction="vertical" gap="xs" className="mt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('landing.student.feature1')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('landing.student.feature2')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('landing.student.feature3')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('landing.student.feature4')}</span>
                    </div>
                  </Stack>

                  {/* 버튼 */}
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate('/student/login')}
                    className="w-full mt-4"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {t('landing.student.button')}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Button>
                </Stack>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <div className="container mx-auto px-4 py-8">
        <Text variant="small" color="muted" className="text-center">
          {t('common.copyright')}
        </Text>
      </div>
    </div>
  );
};
