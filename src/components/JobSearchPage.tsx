import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, ExternalLink, Clock, Building2, Filter, Sparkles, RefreshCw } from 'lucide-react';
import {
  searchJobsWithFallback,
  calculateMatchScore,
  generateApplicationTips,
  jobCategories,
  type JobListing,
  type JobSearchParams,
} from '../services/jobSearchService';
import { getCVData } from '../utils/storage';

export default function JobSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [source, setSource] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);

  const userSkills = getCVData()?.skills || [];

  const handleSearch = async () => {
    setLoading(true);
    setSearched(true);

    const params: JobSearchParams = {
      query: searchQuery || (selectedCategory ? jobCategories.find(c => c.id === selectedCategory)?.keywords[0] : '') || 'developer',
      remote: remoteOnly,
      category: selectedCategory || undefined,
    };

    const result = await searchJobsWithFallback(params);
    setJobs(result.jobs);
    setSource(result.source);
    setLoading(false);
  };

  useEffect(() => {
    // Initial load with default search
    handleSearch();
  }, []);

  const filteredJobs = jobs.filter(job => {
    if (selectedCategory) {
      const category = jobCategories.find(c => c.id === selectedCategory);
      if (category) {
        const matches = category.keywords.some(
          k => job.title.toLowerCase().includes(k) ||
               job.technologies.some(t => t.toLowerCase().includes(k))
        );
        if (!matches) return false;
      }
    }
    if (remoteOnly && !job.remote) return false;
    return true;
  });

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gray-50 dark:bg-surface-950">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🔍 Recherche d'Emploi IT
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Trouvez les meilleures opportunités correspondant à votre profil.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-surface-800 rounded-2xl p-4 border border-gray-200 dark:border-surface-700 mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Rechercher par technologie, poste, entreprise..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-surface-600 bg-gray-50 dark:bg-surface-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              Rechercher
            </button>
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Filter className="w-4 h-4" /> Filtres:
            </span>

            {/* Category filters */}
            {jobCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-surface-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-surface-600'
                }`}
              >
                {cat.label}
              </button>
            ))}

            <button
              onClick={() => setRemoteOnly(!remoteOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                remoteOnly
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 dark:bg-surface-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-surface-600'
              }`}
            >
              🌍 Remote uniquement
            </button>
          </div>
        </motion.div>

        {/* Results */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Job List */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 text-primary-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-500">Recherche en cours...</p>
              </div>
            ) : filteredJobs.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-500">
                    {filteredJobs.length} offre(s) trouvée(s)
                    {source && <span className="text-xs ml-2 text-gray-400">via {source}</span>}
                  </p>
                </div>

                {filteredJobs.map((job, i) => {
                  const matchScore = calculateMatchScore(job, userSkills, 'junior');
                  return (
                    <motion.button
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedJob(job)}
                      className={`w-full text-left bg-white dark:bg-surface-800 rounded-xl p-5 border transition-all hover:shadow-lg ${
                        selectedJob?.id === job.id
                          ? 'border-primary-500 ring-2 ring-primary-500/20'
                          : 'border-gray-200 dark:border-surface-700 hover:border-primary-500/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          {job.companyLogo ? (
                            <img src={job.companyLogo} alt={job.company} className="w-12 h-12 rounded-lg object-cover" />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg">
                              {job.company.charAt(0)}
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                              <Building2 className="w-3 h-3" /> {job.company}
                            </p>
                          </div>
                        </div>
                        {userSkills.length > 0 && (
                          <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            matchScore >= 70 ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' :
                            matchScore >= 50 ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' :
                            'bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400'
                          }`}>
                            {matchScore}% match
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-surface-700 text-gray-600 dark:text-gray-300 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {job.location}
                        </span>
                        {job.remote && (
                          <span className="px-2 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs">
                            🌍 Remote
                          </span>
                        )}
                        {job.salary && (
                          <span className="px-2 py-1 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 text-xs">
                            💰 {job.salary}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {job.technologies.slice(0, 5).map((tech, j) => (
                          <span
                            key={j}
                            className={`px-2 py-0.5 rounded text-xs ${
                              userSkills.some(s => s.toLowerCase().includes(tech.toLowerCase()) || tech.toLowerCase().includes(s.toLowerCase()))
                                ? 'bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-400 font-medium'
                                : 'bg-gray-100 dark:bg-surface-700 text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                        {job.technologies.length > 5 && (
                          <span className="text-xs text-gray-400">+{job.technologies.length - 5}</span>
                        )}
                      </div>

                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{job.description}</p>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-surface-700">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(job.postedAt).toLocaleDateString('fr-FR')}
                        </span>
                        <span className="text-xs text-gray-400">{job.source}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </>
            ) : searched ? (
              <div className="text-center py-12 bg-white dark:bg-surface-800 rounded-xl">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Aucune offre trouvée
                </h3>
                <p className="text-gray-500 text-sm">
                  Essayez d'élargir vos critères de recherche.
                </p>
              </div>
            ) : null}
          </div>

          {/* Job Detail / Tips */}
          <div className="lg:col-span-1">
            {selectedJob ? (
              <motion.div
                key={selectedJob.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-surface-800 rounded-xl border border-gray-200 dark:border-surface-700 sticky top-24"
              >
                <div className="p-5 border-b border-gray-200 dark:border-surface-700">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{selectedJob.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedJob.company}</p>
                </div>

                <div className="p-5 space-y-4">
                  {/* Match Score */}
                  {userSkills.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          <Sparkles className="w-4 h-4 inline mr-1" /> Compatibilité
                        </span>
                        <span className="text-sm font-bold text-primary-500">
                          {calculateMatchScore(selectedJob, userSkills, 'junior')}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-surface-700 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full transition-all"
                          style={{ width: `${calculateMatchScore(selectedJob, userSkills, 'junior')}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Application Tips */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      💡 Conseils pour postuler
                    </h4>
                    <ul className="space-y-2">
                      {generateApplicationTips(selectedJob, userSkills).map((tip, i) => (
                        <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <span className="text-primary-500 mt-0.5">→</span> {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      🛠️ Technologies requises
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedJob.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 rounded text-xs ${
                            userSkills.some(s => s.toLowerCase().includes(tech.toLowerCase()))
                              ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                              : 'bg-gray-100 dark:bg-surface-700 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <a
                    href={selectedJob.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Voir l'offre complète
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white dark:bg-surface-800 rounded-xl border border-gray-200 dark:border-surface-700 p-6 text-center sticky top-24">
                <Briefcase className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Sélectionnez une offre
                </h3>
                <p className="text-sm text-gray-500">
                  Cliquez sur une offre pour voir les détails et conseils personnalisés.
                </p>

                {userSkills.length === 0 && (
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg">
                    <p className="text-xs text-yellow-700 dark:text-yellow-400">
                      💡 Remplissez votre CV dans le CV Builder pour obtenir des scores de compatibilité personnalisés !
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
