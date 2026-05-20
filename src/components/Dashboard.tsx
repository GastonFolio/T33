import { motion } from 'framer-motion';
import { BookOpen, Award, TrendingUp, Clock, CheckCircle, Target } from 'lucide-react';
import { modules } from '../data/courses';
import { getProgress, getBadges, getOverallProgress, getEvaluations, getProfile } from '../utils/storage';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const progress = getProgress();
  const badges = getBadges();
  const overallProgress = getOverallProgress();
  const evaluations = getEvaluations();
  const profile = getProfile();

  const totalLessonsCompleted = progress.reduce((acc, p) => acc + p.completedLessons.length, 0);
  const totalQuizzesTaken = progress.reduce((acc, p) => acc + Object.keys(p.quizScores).length, 0);
  const avgQuizScore = totalQuizzesTaken > 0
    ? Math.round(progress.reduce((acc, p) => acc + Object.values(p.quizScores).reduce((a, b) => a + b, 0), 0) / totalQuizzesTaken)
    : 0;

  const statsCards = [
    { label: 'Progression globale', value: `${overallProgress}%`, icon: <TrendingUp className="w-5 h-5" />, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Leçons complétées', value: totalLessonsCompleted.toString(), icon: <BookOpen className="w-5 h-5" />, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'Quiz passés', value: totalQuizzesTaken.toString(), icon: <CheckCircle className="w-5 h-5" />, color: 'text-purple-500 bg-purple-500/10' },
    { label: 'Score moyen', value: `${avgQuizScore}%`, icon: <Target className="w-5 h-5" />, color: 'text-orange-500 bg-orange-500/10' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gray-50 dark:bg-surface-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {profile ? `Bienvenue, ${profile.name} 👋` : 'Tableau de Bord 📊'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Suivez votre progression et continuez votre apprentissage.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsCards.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-surface-800 rounded-xl p-5 border border-gray-200 dark:border-surface-700"
            >
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Overall Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-gray-200 dark:border-surface-700 mb-8"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 dark:text-white">Progression globale</h3>
            <span className="text-sm font-medium text-primary-500">{overallProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-surface-700 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full"
            />
          </div>
        </motion.div>

        {/* Modules Progress */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {modules.map((module, i) => {
            const moduleProgress = progress.find(p => p.moduleId === module.id);
            const completedCount = moduleProgress?.completedLessons.length || 0;
            const totalLessons = module.lessons.length;
            const percent = Math.round((completedCount / totalLessons) * 100);

            return (
              <motion.button
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -2 }}
                onClick={() => onNavigate('courses')}
                className="text-left bg-white dark:bg-surface-800 rounded-xl p-6 border border-gray-200 dark:border-surface-700 hover:border-primary-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{module.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
                      {module.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {completedCount}/{totalLessons} leçons
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-surface-700 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${module.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">{percent}% terminé</span>
                      {percent === 100 && (
                        <span className="text-xs text-emerald-500 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Complété
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Badges & Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-gray-200 dark:border-surface-700"
          >
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Badges obtenus</h3>
            </div>
            {badges.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-sm font-medium border border-yellow-500/20">
                    {badge}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Complétez des modules pour obtenir des badges ! 🏆
              </p>
            )}
          </motion.div>

          {/* Recent Evaluations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-gray-200 dark:border-surface-700"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Évaluations récentes</h3>
            </div>
            {evaluations.length > 0 ? (
              <div className="space-y-3">
                {evaluations.slice(-3).reverse().map((evalItem, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-surface-700">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{evalItem.type as string}</span>
                    <span className="text-sm font-semibold text-primary-500">{evalItem.score as number}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Aucune évaluation pour le moment. Soumettez vos travaux ! 📝
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
