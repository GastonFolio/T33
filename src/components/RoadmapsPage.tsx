import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Award, TrendingUp, BookOpen, AlertTriangle, Lightbulb, ChevronRight, ExternalLink, CheckCircle } from 'lucide-react';
import { roadmaps, type Roadmap, type RoadmapStep } from '../data/roadmaps';

export default function RoadmapsPage() {
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  if (selectedRoadmap) {
    return (
      <RoadmapDetail
        roadmap={selectedRoadmap}
        expandedStep={expandedStep}
        onExpandStep={setExpandedStep}
        onBack={() => { setSelectedRoadmap(null); setExpandedStep(null); }}
      />
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gray-50 dark:bg-surface-950">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🗺️ Roadmaps IT 2025-2026
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Parcours d'apprentissage complets, étape par étape, pour chaque spécialité IT.
          </p>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Parcours', value: roadmaps.length, icon: '🎯' },
            { label: 'Compétences 2026', value: '120+', icon: '💻' },
            { label: 'Outils & Frameworks', value: '80+', icon: '🛠️' },
            { label: 'Certifications', value: '30+', icon: '🏆' },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-surface-800 rounded-xl p-4 border border-gray-200 dark:border-surface-700 text-center">
              <span className="text-2xl">{stat.icon}</span>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Roadmap Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map((roadmap, i) => (
            <motion.button
              key={roadmap.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              whileHover={{ y: -4, scale: 1.01 }}
              onClick={() => setSelectedRoadmap(roadmap)}
              className="text-left bg-white dark:bg-surface-800 rounded-2xl border border-gray-200 dark:border-surface-700 overflow-hidden hover:shadow-xl transition-all group"
            >
              {/* Header Gradient */}
              <div className={`h-24 bg-gradient-to-r ${roadmap.color} flex items-center justify-center relative overflow-hidden`}>
                <span className="text-5xl filter drop-shadow-lg">{roadmap.icon}</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1 group-hover:text-primary-500 transition-colors">
                  {roadmap.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {roadmap.description}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    roadmap.demand === 'Très élevée' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' :
                    roadmap.demand === 'Élevée' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400' :
                    'bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400'
                  }`}>
                    📈 {roadmap.demand}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400">
                    💰 {roadmap.salaryRange}
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-surface-700">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {roadmap.timeToJob}
                  </span>
                  <span className="text-xs text-primary-500 flex items-center gap-1 font-medium">
                    {roadmap.steps.length} étapes <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

function RoadmapDetail({ roadmap, expandedStep, onExpandStep, onBack }: {
  roadmap: Roadmap;
  expandedStep: string | null;
  onExpandStep: (id: string | null) => void;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gray-50 dark:bg-surface-950">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-500 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour aux roadmaps
        </button>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className={`rounded-2xl p-8 bg-gradient-to-r ${roadmap.color} text-white mb-8 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 opacity-20">
              <span className="text-[150px]">{roadmap.icon}</span>
            </div>
            <div className="relative z-10">
              <span className="text-5xl mb-4 inline-block">{roadmap.icon}</span>
              <h1 className="text-3xl font-bold mb-2">{roadmap.title}</h1>
              <p className="text-white/80 mb-6 max-w-2xl">{roadmap.description}</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 rounded-lg bg-white/20 text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Demande: {roadmap.demand}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/20 text-sm flex items-center gap-2">
                  💰 {roadmap.salaryRange}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/20 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Temps estimé: {roadmap.timeToJob}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top Skills 2026 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            🔥 Compétences les plus demandées en 2026
          </h2>
          <div className="flex flex-wrap gap-2">
            {roadmap.topSkills2026.map((skill, i) => (
              <span key={i} className="px-3 py-1.5 rounded-lg bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium border border-primary-200 dark:border-primary-500/20">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* AI Tools */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            🤖 Outils IA à maîtriser
          </h2>
          <div className="flex flex-wrap gap-2">
            {roadmap.aiTools.map((tool, i) => (
              <span key={i} className="px-3 py-1.5 rounded-lg bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-sm font-medium border border-violet-200 dark:border-violet-500/20">
                ✨ {tool}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Roadmap Steps */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            📍 Parcours Étape par Étape
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500 hidden sm:block" />

            <div className="space-y-4">
              {roadmap.steps.map((step, i) => (
                <StepCard
                  key={step.id}
                  step={step}
                  index={i}
                  isExpanded={expandedStep === step.id}
                  onToggle={() => onExpandStep(expandedStep === step.id ? null : step.id)}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mistakes & Tips */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-gray-200 dark:border-surface-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" /> Erreurs à éviter
            </h3>
            <ul className="space-y-2">
              {roadmap.mistakes.map((mistake, i) => (
                <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                  <span className="text-orange-500 mt-1">⚠️</span> {mistake}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-gray-200 dark:border-surface-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" /> Tips Entretien
            </h3>
            <ul className="space-y-2">
              {roadmap.interviewTips.map((tip, i) => (
                <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">💡</span> {tip}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StepCard({ step, index, isExpanded, onToggle }: {
  step: RoadmapStep;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative">
      {/* Step number badge */}
      <div className="absolute left-3 sm:left-4 top-4 w-5 h-5 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center z-10">
        {index + 1}
      </div>

      <div className="ml-10 sm:ml-14">
        <button
          onClick={onToggle}
          className="w-full text-left bg-white dark:bg-surface-800 rounded-xl p-5 border border-gray-200 dark:border-surface-700 hover:border-primary-500/50 transition-all"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">{step.title}</h4>
              <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" /> {step.duration}
              </span>
            </div>
            <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-white dark:bg-surface-800 rounded-b-xl border border-t-0 border-gray-200 dark:border-surface-700 p-5 space-y-4">
                {/* Skills */}
                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Compétences à acquérir
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {step.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">🛠️ Outils</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {step.tools.map((tool, i) => (
                      <span key={i} className="px-2 py-1 rounded bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                {step.certifications && step.certifications.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4" /> Certifications recommandées
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {step.certifications.map((cert, i) => (
                        <span key={i} className="px-2 py-1 rounded bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 text-xs font-medium">
                          🏆 {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">🚀 Projets recommandés</h5>
                  <ul className="space-y-1">
                    {step.projects.map((project, i) => (
                      <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-emerald-500" /> {project}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">📚 Ressources gratuites</h5>
                  <div className="flex flex-wrap gap-2">
                    {step.resources.map((resource, i) => (
                      <span key={i} className="px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> {resource}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
