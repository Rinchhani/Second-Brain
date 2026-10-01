import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { CreateIdeaModal } from '../ideas/CreateIdeaModal';
import { AddHabitModal } from '../habits/AddHabitModal';
import { AddBookModal } from '../habits/AddBookModal';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-on-surface flex flex-col md:flex-row antialiased selection:bg-primary selection:text-black">
      {/* Mobile Top Header */}
      <Header />

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 mt-16 md:mt-0 md:ml-64 p-4 md:p-10 min-h-screen pb-24 md:pb-12 max-w-container-max mx-auto w-full flex flex-col">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Global Interactive Modals */}
      <CreateIdeaModal />
      <AddHabitModal />
      <AddBookModal />
    </div>
  );
};
