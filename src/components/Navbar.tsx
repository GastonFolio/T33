import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, GraduationCap, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  darkMode: boolean;
  onToggleDark: () => void;
}

const mainNavItems = [
  { id: 'home', label: 'Accueil', icon: '🏠' },
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
];

const learnItems = [
  { id: 'courses', label: 'Formation IT', icon: '📚' },
  { id: 'roadmaps', label: 'Roadmaps IT', icon: '🗺️' },
  { id: 'mindset', label: 'Mindset', icon: '🧠' },
  { id: 'networking', label: 'Networking', icon: '🤝' },
  { id: 'green-tech', label: 'Green IT', icon: '🌱' },
];

const toolsItems = [
  { id: 'cv-builder', label: 'CV Builder', icon: '📄' },
  { id: 'cover-letter', label: 'Lettre', icon: '✉️' },
  { id: 'job-search', label: 'Emplois', icon: '🔍' },
  { id: 'evaluation', label: 'Évaluation', icon: '✅' },
];

export default function Navbar({ currentPage, onNavigate, darkMode, onToggleDark }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const isLearnPage = learnItems.some(item => item.id === currentPage);
  const isToolsPage = toolsItems.some(item => item.id === currentPage);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 font-bold text-xl group"
          >
            <GraduationCap className="w-7 h-7 text-primary-500 group-hover:scale-110 transition-transform" />
            <span className="gradient-text hidden sm:inline">IT Career Lab</span>
            <span className="gradient-text sm:hidden">ICL</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Main items */}
            {mainNavItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'hover:bg-white/10 text-gray-600 dark:text-gray-300'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </button>
            ))}

            {/* Learn Dropdown */}
            <div className="relative">
              <button
                onClick={() => { setLearnOpen(!learnOpen); setToolsOpen(false); }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                  isLearnPage
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'hover:bg-white/10 text-gray-600 dark:text-gray-300'
                }`}
              >
                📚 Formation
                <ChevronDown className={`w-4 h-4 transition-transform ${learnOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {learnOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-surface-800 rounded-xl shadow-xl border border-gray-200 dark:border-surface-700 py-2 z-50"
                    onMouseLeave={() => setLearnOpen(false)}
                  >
                    {learnItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => { onNavigate(item.id); setLearnOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          currentPage === item.id
                            ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'
                            : 'hover:bg-gray-50 dark:hover:bg-surface-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => { setToolsOpen(!toolsOpen); setLearnOpen(false); }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                  isToolsPage
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'hover:bg-white/10 text-gray-600 dark:text-gray-300'
                }`}
              >
                🛠️ Outils
                <ChevronDown className={`w-4 h-4 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {toolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-surface-800 rounded-xl shadow-xl border border-gray-200 dark:border-surface-700 py-2 z-50"
                    onMouseLeave={() => setToolsOpen(false)}
                  >
                    {toolsItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => { onNavigate(item.id); setToolsOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          currentPage === item.id
                            ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'
                            : 'hover:bg-gray-50 dark:hover:bg-surface-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleDark}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
              {/* Main */}
              <div className="text-xs font-semibold text-gray-400 px-4 py-2">Navigation</div>
              {mainNavItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    currentPage === item.id
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'hover:bg-white/10 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}

              {/* Formation */}
              <div className="text-xs font-semibold text-gray-400 px-4 py-2 mt-2">Formation</div>
              {learnItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    currentPage === item.id
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'hover:bg-white/10 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}

              {/* Tools */}
              <div className="text-xs font-semibold text-gray-400 px-4 py-2 mt-2">Outils</div>
              {toolsItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    currentPage === item.id
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'hover:bg-white/10 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
