/**
 * App Component
 * 
 * Root application component for the School Portal.
 * Wraps the entire app with necessary providers and routing.
 */

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../auth/AuthContext';
import { LanguageProvider } from '../i18n';
import { AppRoutes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;

