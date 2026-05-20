import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, FileText, TrendingUp, CheckCircle, Map, Search, Brain, Leaf, Sparkles } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const features = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Formation Interactive',
    description: 'Cours détaillés sur la recherche d\'emploi IT avec quiz et exercices pratiques.',
    color: 'from-blue-500 to-cyan-500',
    page: 'courses',
  },
  {
    icon: <Map className="w-6 h-6" />,
    title: 'Roadmaps IT 2026',
    description: '12+ parcours d\'apprentissage complets : Frontend, Backend, DevOps, Cybersécurité...',
    color: 'from-violet-500 to-purple-500',
    page: 'roadmaps',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'CV Builder ATS',
    description: 'Créez un CV optimisé avec analyse automatique et score de compatibilité ATS.',
    color: 'from-emerald-500 to-teal-500',
    page: 'cv-builder',
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: 'Recherche d\'Emploi',
    description: 'Trouvez des offres IT en temps réel avec score de compatibilité personnalisé.',
    color: 'from-orange-500 to-red-500',
    page: 'job-search',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Mindset & Soft Skills',
    description: 'Développez discipline, productivité, leadership et communication.',
    color: 'from-pink-500 to-rose-500',
    page: 'mindset',
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: 'Green IT',
    description: 'Impact environnemental du numérique et bonnes pratiques éco-responsables.',
    color: 'from-green-500 to-emerald-500',
    page: 'green-tech',
  },
];

const stats = [
  { value: '12+', label: 'Roadmaps IT', icon: <Map className="w-5 h-5" /> },
  { value: '50+', label: 'Leçons', icon: <BookOpen className="w-5 h-5" /> },
  { value: '100%', label: 'Gratuit', icon: <Sparkles className="w-5 h-5" /> },
  { value: '∞', label: 'Pratique', icon: <TrendingUp className="w-5 h-5" /> },
];

const targetAudience = [
  'Développeurs Web & Full Stack',
  'Techniciens Réseaux & Télécoms',
  'Spécialistes Cybersécurité',
  'Ingénieurs DevOps & Cloud',
  'Data Scientists & IA',
  'Étudiants IT',
  'Jeunes Diplômés',
  'Reconversion IT',
];

const roadmapHighlights = [
  { icon: '🎨', title: 'Frontend', skills: 'React, TypeScript, Next.js' },
  { icon: '⚙️', title: 'Backend', skills: 'Node.js, Python, PostgreSQL' },
  { icon: '🔐', title: 'Cybersécurité', skills: 'Pentesting, SIEM, SOC' },
  { icon: '☁️', title: 'Cloud', skills: 'AWS, Azure, Terraform' },
  { icon: '🔄', title: 'DevOps', skills: 'Docker, Kubernetes, CI/CD' },
  { icon: '🤖', title: 'Data & IA', skills: 'Python, ML, LLMs' },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-surface-900 to-accent-600/30 dark:from-surface-950 dark:via-surface-900 dark:to-primary-900/30" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full blur-[128px] animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500 rounded-full blur-[128px] animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '5s' }} />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['💻', '🚀', '📊', '🔐', '☁️', '🎯'].map((emoji, i) => (
            <motion.span
              key={i}
              className="absolute text-3xl opacity-20"
              style={{
                top: `${20 + i * 12}%`,
                left: `${10 + i * 15}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/20 text-primary-300 text-sm font-medium mb-6 border border-primary-500/30"
            >
              <Sparkles className="w-4 h-4" />
              Plateforme Éducative 2025-2026
            </motion.span>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              Lancez votre{' '}
              <span className="gradient-text">Carrière IT</span>
              <br />
              avec Confiance
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Roadmaps complètes, CV ATS-optimisé, recherche d'emploi intelligente, 
              développement personnel — tout ce qu'il vous faut pour réussir en IT.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('roadmaps')}
                className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary-500/30 transition-colors"
              >
                Explorer les Roadmaps
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('cv-builder')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-lg border border-white/20 backdrop-blur-sm transition-colors"
              >
                Créer mon CV
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="glass rounded-xl p-4 text-center"
              >
                <div className="flex justify-center mb-2 text-primary-400">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-2.5 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Roadmap Highlights */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-surface-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🗺️ Roadmaps IT <span className="gradient-text">2025-2026</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Parcours d'apprentissage complets avec les compétences les plus demandées.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {roadmapHighlights.map((item, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => onNavigate('roadmaps')}
                className="bg-white dark:bg-surface-800 rounded-xl p-4 border border-gray-200 dark:border-surface-700 hover:border-primary-500/50 transition-all text-center group"
              >
                <span className="text-3xl block mb-2">{item.icon}</span>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-primary-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.skills}</p>
              </motion.button>
            ))}
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('roadmaps')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors"
            >
              Voir tous les roadmaps <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white dark:bg-surface-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tout ce dont vous avez besoin pour{' '}
              <span className="gradient-text">réussir</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Une plateforme complète avec des outils pratiques et des cours interactifs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => onNavigate(feature.page)}
                className="text-left group p-6 rounded-2xl border border-gray-200 dark:border-surface-700 hover:border-primary-500/50 dark:hover:border-primary-500/50 transition-all bg-white dark:bg-surface-800 hover:shadow-xl"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
                <span className="inline-flex items-center gap-1 text-primary-500 mt-4 text-sm font-medium">
                  Explorer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-surface-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Pour qui est cette plateforme ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Que vous soyez débutant ou expérimenté, cette plateforme est faite pour vous.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {targetAudience.map((audience, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-surface-800 border border-gray-200 dark:border-surface-700"
              >
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{audience}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-accent-600 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Prêt à lancer votre carrière IT ?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Commencez dès maintenant — c'est 100% gratuit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('roadmaps')}
                className="px-8 py-4 bg-white text-primary-600 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                Explorer les Roadmaps →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('courses')}
                className="px-8 py-4 bg-white/20 text-white rounded-xl font-bold text-lg border border-white/30 hover:bg-white/30 transition-all"
              >
                Commencer la Formation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-white dark:bg-surface-900 border-t border-gray-200 dark:border-surface-700">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                🎓 IT Career Lab
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Plateforme éducative pour l'employabilité et le développement professionnel IT.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Formation</h4>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li><button onClick={() => onNavigate('courses')} className="hover:text-primary-500">Cours IT</button></li>
                <li><button onClick={() => onNavigate('roadmaps')} className="hover:text-primary-500">Roadmaps</button></li>
                <li><button onClick={() => onNavigate('mindset')} className="hover:text-primary-500">Mindset</button></li>
                <li><button onClick={() => onNavigate('green-tech')} className="hover:text-primary-500">Green IT</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Outils</h4>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li><button onClick={() => onNavigate('cv-builder')} className="hover:text-primary-500">CV Builder</button></li>
                <li><button onClick={() => onNavigate('cover-letter')} className="hover:text-primary-500">Lettre de Motivation</button></li>
                <li><button onClick={() => onNavigate('job-search')} className="hover:text-primary-500">Recherche Emploi</button></li>
                <li><button onClick={() => onNavigate('evaluation')} className="hover:text-primary-500">Évaluation</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Contact</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                📧 apprentissage.csft@gmail.com
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Conçu pour les étudiants et professionnels IT.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-surface-700 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© 2025 IT Career Lab — Plateforme éducative pour la recherche d'emploi IT</p>
            <p className="mt-1">Conçu avec ❤️ pour les étudiants et professionnels IT</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
