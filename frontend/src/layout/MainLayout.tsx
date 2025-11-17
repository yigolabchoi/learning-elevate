/**
 * MainLayout Component
 * 
 * The main layout wrapper for the School Portal.
 * Includes header, sidebar, and main content area.
 */

import { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

