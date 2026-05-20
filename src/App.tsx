import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTheme, setTheme as saveTheme } from './utils/storage';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import CoursesPage from './components/CoursesPage';
import CVBuilder from './components/CVBuilder';
import CoverLetterPage from './components/CoverLetterPage';
import EvaluationPage from './components/EvaluationPage';
import RoadmapsPage from './components/RoadmapsPage';
import JobSearchPage from './components/JobSearchPage';
import ExtendedModulesPage from './components/ExtendedModulesPage';

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(getTheme() === 'dark');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveTheme(darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    const PageWrapper = ({ children }: { children: React.ReactNode }) => (
      <motion.div
        key={currentPage}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    );

    switch (currentPage) {
      case 'home':
        return <PageWrapper><HomePage onNavigate={handleNavigate} /></PageWrapper>;
      case 'dashboard':
        return <PageWrapper><Dashboard onNavigate={handleNavigate} /></PageWrapper>;
      case 'courses':
        return <PageWrapper><CoursesPage /></PageWrapper>;
      case 'cv-builder':
        return <PageWrapper><CVBuilder /></PageWrapper>;
      case 'cover-letter':
        return <PageWrapper><CoverLetterPage /></PageWrapper>;
      case 'evaluation':
        return <PageWrapper><EvaluationPage /></PageWrapper>;
      case 'roadmaps':
        return <PageWrapper><RoadmapsPage /></PageWrapper>;
      case 'job-search':
        return <PageWrapper><JobSearchPage /></PageWrapper>;
      case 'mindset':
      case 'networking':
      case 'green-tech':
        return <PageWrapper><ExtendedModulesPage moduleCategory={currentPage as 'mindset' | 'networking' | 'environment'} /></PageWrapper>;
      default:
        return <PageWrapper><HomePage onNavigate={handleNavigate} /></PageWrapper>;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-surface-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-accent-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(!darkMode)}
      />

      <AnimatePresence mode="wait">
        <main key={currentPage}>
          {renderPage()}
        </main>
      </AnimatePresence>
    </div>
  );
}
