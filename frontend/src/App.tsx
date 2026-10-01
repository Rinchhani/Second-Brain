import React from 'react';
import { useApp } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { IntelligenceDashboardPage } from './pages/IntelligenceDashboardPage';
import { IdeasVaultPage } from './pages/IdeasVaultPage';
import { FocusHabitsPage } from './pages/FocusHabitsPage';
import { ThinkingEnginePage } from './pages/ThinkingEnginePage';

export const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <Layout>
      {activeTab === 'dashboard' && <IntelligenceDashboardPage />}
      {activeTab === 'vault' && <IdeasVaultPage />}
      {activeTab === 'habits' && <FocusHabitsPage />}
      {activeTab === 'engine' && <ThinkingEnginePage />}
    </Layout>
  );
};

export function App() {
  return <AppContent />;
}

export default App;
