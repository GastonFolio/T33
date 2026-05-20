import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, CheckCircle, ChevronRight, Send, Upload, FileText } from 'lucide-react';
import { extendedModules, projectTopics, type ExtendedModule } from '../data/extendedModules';
import { updateModuleProgress, getProgress } from '../utils/storage';
import { sendProjectSubmissionEmail, type StudentInfo, type ProjectSubmission } from '../services/emailService';

interface ExtendedModulesPageProps {
  moduleCategory: 'mindset' | 'networking' | 'environment';
}

const categoryMap: Record<string, string> = {
  mindset: 'mindset',
  networking: 'networking-marketing',
  environment: 'green-tech',
  'green-tech': 'green-tech',
};

export default function ExtendedModulesPage({ moduleCategory }: ExtendedModulesPageProps) {
  const moduleId = categoryMap[moduleCategory] || 'mindset';
  const module = extendedModules.find(m => m.id === moduleId);
  
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const progress = getProgress();

  if (!module) {
    return <div className="min-h-screen pt-20 flex items-center justify-center">Module non trouvé</div>;
  }

  const lesson = module.lessons[selectedLessonIndex];
  const moduleProgress = progress.find(p => p.moduleId === module.id);
  const isCompleted = moduleProgress?.completedLessons.includes(lesson?.id) || false;

  const handleCompleteLesson = () => {
    if (lesson) {
      updateModuleProgress(module.id, lesson.id);
    }
  };

  if (showProjectForm) {
    return <ProjectSubmissionForm module={module} onBack={() => setShowProjectForm(false)} />;
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50 dark:bg-surface-950">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-72 shrink-0"
        >
          <div className="bg-white dark:bg-surface-800 rounded-xl border border-gray-200 dark:border-surface-700 p-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{module.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{module.title}</h3>
                <p className="text-xs text-gray-500">{module.lessons.length} leçons</p>
              </div>
            </div>
            <div className="space-y-1">
              {module.lessons.map((l, i) => {
                const done = moduleProgress?.completedLessons.includes(l.id) || false;
                return (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLessonIndex(i)}
                    className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                      i === selectedLessonIndex
                        ? 'bg-primary-500/10 text-primary-500 font-medium'
                        : 'hover:bg-gray-100 dark:hover:bg-surface-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {done ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-surface-600 shrink-0" />
                    )}
                    <span className="truncate">{l.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Project Button for Green Tech */}
            {module.id === 'green-tech' && (
              <button
                onClick={() => setShowProjectForm(true)}
                className="w-full mt-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Upload className="w-4 h-4" /> Soumettre un projet
              </button>
            )}
          </div>
        </motion.aside>

        {/* Content */}
        <motion.main
          key={lesson?.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 min-w-0"
        >
          <div className="bg-white dark:bg-surface-800 rounded-xl border border-gray-200 dark:border-surface-700 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                lesson?.type === 'exercise' ? 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400' :
                lesson?.type === 'challenge' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400' :
                lesson?.type === 'project' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
              }`}>
                {lesson?.type === 'exercise' ? '🏋️ Exercice' :
                 lesson?.type === 'challenge' ? '🎯 Challenge' :
                 lesson?.type === 'project' ? '🚀 Projet' : '📖 Cours'}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {lesson?.duration}
              </span>
            </div>

            {/* Render content */}
            <div className="prose prose-sm sm:prose dark:prose-invert max-w-none">
              <MarkdownRenderer content={lesson?.content || ''} />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-surface-700">
              <button
                onClick={() => selectedLessonIndex > 0 && setSelectedLessonIndex(selectedLessonIndex - 1)}
                disabled={selectedLessonIndex === 0}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Précédent
              </button>

              <div className="flex gap-3">
                {!isCompleted && (
                  <button
                    onClick={handleCompleteLesson}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" /> Marquer comme terminé
                  </button>
                )}
                {selectedLessonIndex < module.lessons.length - 1 && (
                  <button
                    onClick={() => {
                      handleCompleteLesson();
                      setSelectedLessonIndex(selectedLessonIndex + 1);
                    }}
                    className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    Suivant <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  );
}

function ProjectSubmissionForm({ module, onBack }: { module: ExtendedModule; onBack: () => void }) {
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    firstName: '',
    lastName: '',
    email: '',
    group: '',
    specialty: '',
  });
  const [selectedTopic, setSelectedTopic] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!studentInfo.firstName || !studentInfo.lastName || !studentInfo.email || !studentInfo.group || !selectedTopic) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setSubmitting(true);

    const submission: ProjectSubmission = {
      topic: selectedTopic,
      description,
      submittedAt: new Date().toISOString(),
    };

    const result = await sendProjectSubmissionEmail(studentInfo, submission);
    
    setSubmitting(false);
    setSubmitted(true);
    console.log('Submission result:', result);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4 bg-gray-50 dark:bg-surface-950">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-surface-800 rounded-2xl p-8 text-center border border-gray-200 dark:border-surface-700"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Projet soumis ! 🎉</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Votre projet sur "{selectedTopic}" a été enregistré. Vous recevrez une confirmation par email.
            </p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors"
            >
              Retour aux cours
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gray-50 dark:bg-surface-950">
      <div className="max-w-3xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-500 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour aux cours
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-white dark:bg-surface-800 rounded-2xl border border-gray-200 dark:border-surface-700 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">📤 Soumettre un Projet</h2>
              <p className="text-white/80">Projet de recherche environnementale — Module {module.title}</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Student Info */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" /> Informations Étudiant *
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Prénom *</label>
                    <input
                      type="text"
                      value={studentInfo.firstName}
                      onChange={e => setStudentInfo({ ...studentInfo, firstName: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-surface-600 bg-white dark:bg-surface-900 text-gray-900 dark:text-white text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Nom *</label>
                    <input
                      type="text"
                      value={studentInfo.lastName}
                      onChange={e => setStudentInfo({ ...studentInfo, lastName: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-surface-600 bg-white dark:bg-surface-900 text-gray-900 dark:text-white text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Email *</label>
                    <input
                      type="email"
                      value={studentInfo.email}
                      onChange={e => setStudentInfo({ ...studentInfo, email: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-surface-600 bg-white dark:bg-surface-900 text-gray-900 dark:text-white text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Groupe *</label>
                    <input
                      type="text"
                      value={studentInfo.group}
                      onChange={e => setStudentInfo({ ...studentInfo, group: e.target.value })}
                      placeholder="Ex: RT2-A"
                      className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-surface-600 bg-white dark:bg-surface-900 text-gray-900 dark:text-white text-sm"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Spécialité</label>
                    <input
                      type="text"
                      value={studentInfo.specialty}
                      onChange={e => setStudentInfo({ ...studentInfo, specialty: e.target.value })}
                      placeholder="Ex: Réseaux & Télécommunications"
                      className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-surface-600 bg-white dark:bg-surface-900 text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Topic Selection */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">🎯 Choisissez un Sujet *</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {projectTopics.map(topic => (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.title)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        selectedTopic === topic.title
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/20'
                          : 'bg-gray-50 dark:bg-surface-900 border-gray-200 dark:border-surface-600 hover:border-emerald-500/50'
                      }`}
                    >
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">{topic.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{topic.category}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          topic.difficulty === 'Débutant' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' :
                          topic.difficulty === 'Intermédiaire' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400' :
                          'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                        }`}>
                          {topic.difficulty}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Description / Notes additionnelles</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Décrivez brièvement votre approche..."
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-surface-600 bg-white dark:bg-surface-900 text-gray-900 dark:text-white text-sm min-h-[100px] resize-y"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Soumettre le projet
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Simple Markdown Renderer
function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      const isOrdered = /^\d+\./.test(listItems[0]);
      const Tag = isOrdered ? 'ol' : 'ul';
      elements.push(
        <Tag key={`list-${elements.length}`} className={`${isOrdered ? 'list-decimal' : 'list-disc'} pl-6 my-3 space-y-1`}>
          {listItems.map((item, i) => (
            <li key={i} className="text-gray-700 dark:text-gray-300 text-sm">
              <InlineMarkdown text={item.replace(/^[\-\*]\s|^\d+\.\s/, '').replace(/^\[.\]\s/, '')} />
            </li>
          ))}
        </Tag>
      );
      listItems = [];
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      elements.push(
        <div key={`table-${elements.length}`} className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-gray-200 dark:border-surface-600 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 dark:bg-surface-700">
                {tableRows[0]?.map((cell, i) => (
                  <th key={i} className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-surface-600">
                    <InlineMarkdown text={cell.trim()} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.slice(2).map((row, ri) => (
                <tr key={ri} className="border-b border-gray-100 dark:border-surface-700">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 text-gray-600 dark:text-gray-300">
                      <InlineMarkdown text={cell.trim()} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${elements.length}`} className="bg-gray-900 dark:bg-surface-950 text-green-400 p-4 rounded-xl text-xs overflow-x-auto my-4 border border-gray-700">
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        flushList();
        flushTable();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (line.includes('|') && line.trim().startsWith('|')) {
      if (!inTable) {
        flushList();
        inTable = true;
      }
      const cells = line.split('|').filter(c => c.trim() !== '');
      if (cells.length > 0) {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      flushTable();
    }

    if (!line.trim()) {
      flushList();
      continue;
    }

    if (line.startsWith('# ')) {
      flushList();
      elements.push(<h1 key={`h1-${i}`} className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-6 mb-4">{line.replace('# ', '')}</h1>);
      continue;
    }
    if (line.startsWith('## ')) {
      flushList();
      elements.push(<h2 key={`h2-${i}`} className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">{line.replace('## ', '')}</h2>);
      continue;
    }
    if (line.startsWith('### ')) {
      flushList();
      elements.push(<h3 key={`h3-${i}`} className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">{line.replace('### ', '')}</h3>);
      continue;
    }

    if (line.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote key={`bq-${i}`} className="border-l-4 border-primary-500 pl-4 py-2 my-3 bg-primary-50 dark:bg-primary-500/10 rounded-r-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300 italic"><InlineMarkdown text={line.replace('> ', '')} /></p>
        </blockquote>
      );
      continue;
    }

    if (/^[\-\*]\s/.test(line.trim()) || /^\d+\.\s/.test(line.trim()) || /^\[.\]\s/.test(line.trim())) {
      listItems.push(line.trim());
      continue;
    }

    if (line.trim() === '---') {
      flushList();
      elements.push(<hr key={`hr-${i}`} className="my-6 border-gray-200 dark:border-surface-700" />);
      continue;
    }

    flushList();
    elements.push(
      <p key={`p-${i}`} className="text-sm text-gray-700 dark:text-gray-300 my-2 leading-relaxed">
        <InlineMarkdown text={line} />
      </p>
    );
  }

  flushList();
  flushTable();

  return <>{elements}</>;
}

function InlineMarkdown({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      parts.push(<code key={key++} className="px-1.5 py-0.5 bg-gray-200 dark:bg-surface-700 rounded text-xs font-mono text-primary-600 dark:text-primary-400">{codeMatch[1]}</code>);
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      parts.push(<strong key={key++} className="font-semibold text-gray-900 dark:text-white">{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    const italicMatch = remaining.match(/^\*([^*]+)\*/);
    if (italicMatch) {
      parts.push(<em key={key++} className="italic">{italicMatch[1]}</em>);
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    const nextSpecial = remaining.slice(1).search(/[`*]/);
    if (nextSpecial === -1) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    } else {
      parts.push(<span key={key++}>{remaining.slice(0, nextSpecial + 1)}</span>);
      remaining = remaining.slice(nextSpecial + 1);
    }
  }

  return <>{parts}</>;
}
