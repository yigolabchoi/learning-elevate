/**
 * Header Component
 * 
 * Global header for the School Portal with branding and user info.
 */

import { useAuth } from '../auth/AuthContext';
import { useLanguage } from '../i18n';

export const Header = () => {
  const { user, logout, switchRole } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  // 포털 제목 결정
  const getPortalTitle = () => {
    if (user?.role === 'admin' || user?.role === 'teacher') {
      return t('header.schoolPortal');
    }
    return t('header.learningPortal');
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-primary-500">{t('common.appName')}</h1>
        <span className="text-gray-400">|</span>
        <span className="text-gray-600">{getPortalTitle()}</span>
      </div>

      <div className="flex items-center gap-4">
        {/* 언어 전환 */}
        <button
          onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          <span className="text-sm font-medium text-gray-700">
            {language === 'ko' ? 'EN' : 'KO'}
          </span>
        </button>

        {/* Role Switcher (Dev Only) */}
        {(user?.role === 'admin' || user?.role === 'teacher') && (
          <div className="text-xs text-gray-500 border-l pl-4">
            <span className="mr-2">{t('header.devMode')}:</span>
            <button
              onClick={() => switchRole('admin')}
              className="text-primary-500 hover:underline mr-2"
            >
              Admin
            </button>
            <button
              onClick={() => switchRole('teacher')}
              className="text-primary-500 hover:underline"
            >
              Teacher
            </button>
          </div>
        )}

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">{user?.name}</div>
            <div className="text-xs text-gray-500 capitalize">{t(`login.roles.${user?.role}`)}</div>
          </div>
          <button
            onClick={logout}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            {t('common.logout')}
          </button>
        </div>
      </div>
    </header>
  );
};
