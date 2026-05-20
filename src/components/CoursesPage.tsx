import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, Clock, ChevronRight, Award } from 'lucide-react';
import { modules, type Module, type QuizQuestion } from '../data/courses';
import { getProgress, updateModuleProgress, saveQuizScore, addBadge } from '../utils/storage';

export default function CoursesPage() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const progress = getProgress();

  const handleStartModule = (m: Module) => {
    setSelectedModule(m);
    setSelectedLessonIndex(0);
    setShowQuiz(false);
    setQuizSubmitted(false);
    setQuizAnswers({});
  };

  const handleCompleteLesson = () => {
    if (!selectedModule) return;
    const lesson = selectedModule.lessons[selectedLessonIndex];
    updateModuleProgress(selectedModule.id, lesson.id);

    if (selectedLessonIndex < selectedModule.lessons.length - 1) {
      setSelectedLessonIndex(prev => prev + 1);
    }
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setQuizSubmitted(false);
    setQuizAnswers({});
  };

  const handleSubmitQuiz = () => {
    if (!selectedModule) return;
    const quiz = selectedModule.quiz;
    let correct = 0;
    quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correct) correct++;
    });
    const score = Math.round((correct / quiz.length) * 100);
    saveQuizScore(selectedModule.id, 'main-quiz', score);

    if (score >= 80) {
      addBadge(selectedModule.badge);
    }

    // Mark quiz lesson as completed
    const quizLesson = selectedModule.lessons.find(l => l.type === 'quiz');
    if (quizLesson) {
      updateModuleProgress(selectedModule.id, quizLesson.id);
    }

    setQuizSubmitted(true);
  };

  const getQuizScore = () => {
    if (!selectedModule) return 0;
    let correct = 0;
    selectedModule.quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correct) correct++;
    });
    return Math.round((correct / selectedModule.quiz.length) * 100);
  };

  if (selectedModule && showQuiz) {
    return <QuizView
      module={selectedModule}
      answers={quizAnswers}
      submitted={quizSubmitted}
      score={getQuizScore()}
      onAnswer={(qId, aIdx) => setQuizAnswers(prev => ({ ...prev, [qId]: aIdx }))}
      onSubmit={handleSubmitQuiz}
      onBack={() => setShowQuiz(false)}
      onBackToModules={() => { setSelectedModule(null); setShowQuiz(false); }}
    />;
  }

  if (selectedModule) {
    return <LessonView
      module={selectedModule}
      lessonIndex={selectedLessonIndex}
      onSelectLesson={setSelectedLessonIndex}
      onComplete={handleCompleteLesson}
      onStartQuiz={handleStartQuiz}
      onBack={() => setSelectedModule(null)}
      progress={progress}
    />;
  }

  return <ModuleList modules={modules} progress={progress} onSelect={handleStartModule} />;
}

// Module List View
function ModuleList({ modules: mods, progress, onSelect }: {
  modules: Module[];
  progress: ReturnType<typeof getProgress>;
  onSelect: (m: Module) => void;
}) {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gray-50 dark:bg-surface-950">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            📚 Formation Interactive
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Choisissez un module pour commencer votre apprentissage.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {mods.map((module, i) => {
            const mp = progress.find(p => p.moduleId === module.id);
            const completed = mp?.completedLessons.length || 0;
            const total = module.lessons.length;
            const pct = Math.round((completed / total) * 100);

            return (
              <motion.button
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => onSelect(module)}
                className="text-left bg-white dark:bg-surface-800 rounded-2xl p-6 border border-gray-200 dark:border-surface-700 hover:border-primary-500/50 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{module.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-4">
                      {module.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> {module.lessons.length} leçons
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> ~{module.lessons.reduce((a, l) => a + parseInt(l.duration), 0)} min
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-surface-700 rounded-full h-2 mb-1">
                      <div className={`bg-gradient-to-r ${module.color} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">{pct}% terminé</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Lesson View
function LessonView({ module, lessonIndex, onSelectLesson, onComplete, onStartQuiz, onBack, progress }: {
  module: Module;
  lessonIndex: number;
  onSelectLesson: (i: number) => void;
  onComplete: () => void;
  onStartQuiz: () => void;
  onBack: () => void;
  progress: ReturnType<typeof getProgress>;
}) {
  const lesson = module.lessons[lessonIndex];
  const mp = progress.find(p => p.moduleId === module.id);
  const isCompleted = mp?.completedLessons.includes(lesson.id) || false;

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50 dark:bg-surface-950">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-72 shrink-0"
        >
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Retour aux modules
          </button>
          <div className="bg-white dark:bg-surface-800 rounded-xl border border-gray-200 dark:border-surface-700 p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{module.icon}</span>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{module.title}</h3>
            </div>
            <div className="space-y-1">
              {module.lessons.map((l, i) => {
                const done = mp?.completedLessons.includes(l.id) || false;
                return (
                  <button
                    key={l.id}
                    onClick={() => {
                      if (l.type === 'quiz') { onStartQuiz(); }
                      else { onSelectLesson(i); }
                    }}
                    className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                      i === lessonIndex
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
          </div>
        </motion.aside>

        {/* Content */}
        <motion.main
          key={lesson.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 min-w-0"
        >
          <div className="bg-white dark:bg-surface-800 rounded-xl border border-gray-200 dark:border-surface-700 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                lesson.type === 'exercise' ? 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400' :
                lesson.type === 'quiz' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400' :
                lesson.type === 'project' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
              }`}>
                {lesson.type === 'exercise' ? '🏋️ Exercice' :
                 lesson.type === 'quiz' ? '❓ Quiz' :
                 lesson.type === 'project' ? '🚀 Projet' : '📖 Cours'}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {lesson.duration}
              </span>
            </div>

            {/* Render Markdown-like content */}
            <div className="prose prose-sm sm:prose dark:prose-invert max-w-none">
              <MarkdownRenderer content={lesson.content} />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-surface-700">
              <button
                onClick={() => lessonIndex > 0 && onSelectLesson(lessonIndex - 1)}
                disabled={lessonIndex === 0}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Précédent
              </button>

              <div className="flex gap-3">
                {!isCompleted && (
                  <button
                    onClick={onComplete}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" /> Marquer comme terminé
                  </button>
                )}
                {lessonIndex < module.lessons.length - 1 ? (
                  <button
                    onClick={() => {
                      onComplete();
                      const nextLesson = module.lessons[lessonIndex + 1];
                      if (nextLesson.type === 'quiz') { onStartQuiz(); }
                      else { onSelectLesson(lessonIndex + 1); }
                    }}
                    className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    Suivant <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={onStartQuiz}
                    className="px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <Award className="w-4 h-4" /> Passer le Quiz
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

// Quiz View
function QuizView({ module, answers, submitted, score, onAnswer, onSubmit, onBack, onBackToModules }: {
  module: Module;
  answers: Record<string, number>;
  submitted: boolean;
  score: number;
  onAnswer: (qId: string, aIdx: number) => void;
  onSubmit: () => void;
  onBack: () => void;
  onBackToModules: () => void;
}) {
  const allAnswered = module.quiz.every(q => answers[q.id] !== undefined);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gray-50 dark:bg-surface-950">
      <div className="max-w-3xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-500 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour au cours
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-white dark:bg-surface-800 rounded-xl border border-gray-200 dark:border-surface-700 p-6 sm:p-8">
            <div className="text-center mb-8">
              <span className="text-4xl">{module.icon}</span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
                Quiz — {module.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {module.quiz.length} questions • Répondez à toutes les questions
              </p>
            </div>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`text-center p-6 rounded-xl mb-8 ${
                  score >= 80 ? 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30' :
                  score >= 50 ? 'bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30' :
                  'bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30'
                }`}
              >
                <div className="text-4xl mb-2">
                  {score >= 80 ? '🎉' : score >= 50 ? '💪' : '📚'}
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444' }}>
                  {score}%
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {score >= 80 ? `Excellent ! Vous avez obtenu le badge "${module.badge}" !` :
                   score >= 50 ? 'Bien ! Révisez les points manqués et réessayez.' :
                   'Continuez à réviser et réessayez le quiz.'}
                </p>
              </motion.div>
            )}

            <div className="space-y-6">
              {module.quiz.map((q, qi) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  index={qi}
                  selected={answers[q.id]}
                  submitted={submitted}
                  onSelect={(aIdx) => onAnswer(q.id, aIdx)}
                />
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-8">
              {!submitted ? (
                <button
                  onClick={onSubmit}
                  disabled={!allAnswered}
                  className="px-8 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:dark:bg-surface-600 text-white rounded-xl font-semibold disabled:cursor-not-allowed transition-colors"
                >
                  Valider le Quiz
                </button>
              ) : (
                <button
                  onClick={onBackToModules}
                  className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold transition-colors"
                >
                  Retour aux modules
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function QuestionCard({ question, index, selected, submitted, onSelect }: {
  question: QuizQuestion;
  index: number;
  selected: number | undefined;
  submitted: boolean;
  onSelect: (idx: number) => void;
}) {
  return (
    <div className="p-4 rounded-xl bg-gray-50 dark:bg-surface-900 border border-gray-200 dark:border-surface-700">
      <p className="font-medium text-gray-900 dark:text-white mb-3">
        <span className="text-primary-500">{index + 1}.</span> {question.question}
      </p>
      <div className="space-y-2">
        {question.options.map((opt, oi) => {
          let cls = 'border-gray-200 dark:border-surface-600 hover:border-primary-500/50';
          if (submitted) {
            if (oi === question.correct) cls = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10';
            else if (oi === selected && oi !== question.correct) cls = 'border-red-500 bg-red-50 dark:bg-red-500/10';
          } else if (oi === selected) {
            cls = 'border-primary-500 bg-primary-50 dark:bg-primary-500/10';
          }

          return (
            <button
              key={oi}
              onClick={() => !submitted && onSelect(oi)}
              disabled={submitted}
              className={`w-full text-left p-3 rounded-lg border ${cls} transition-all text-sm`}
            >
              <span className="font-medium mr-2 text-gray-400">
                {String.fromCharCode(65 + oi)}.
              </span>
              <span className="text-gray-700 dark:text-gray-300">{opt}</span>
            </button>
          );
        })}
      </div>
      {submitted && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-surface-800 p-3 rounded-lg">
          💡 {question.explanation}
        </p>
      )}
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

    // Code blocks
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

    // Tables
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

    // Empty lines
    if (!line.trim()) {
      flushList();
      continue;
    }

    // Headers
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

    // Blockquotes
    if (line.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote key={`bq-${i}`} className="border-l-4 border-primary-500 pl-4 py-2 my-3 bg-primary-50 dark:bg-primary-500/10 rounded-r-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300"><InlineMarkdown text={line.replace('> ', '')} /></p>
        </blockquote>
      );
      continue;
    }

    // List items
    if (/^[\-\*]\s/.test(line.trim()) || /^\d+\.\s/.test(line.trim()) || /^\[.\]\s/.test(line.trim())) {
      listItems.push(line.trim());
      continue;
    }

    // Horizontal rule
    if (line.trim() === '---') {
      flushList();
      elements.push(<hr key={`hr-${i}`} className="my-6 border-gray-200 dark:border-surface-700" />);
      continue;
    }

    // Regular paragraph
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
  // Simple inline markdown: bold, italic, code, links
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Inline code
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      parts.push(<code key={key++} className="px-1.5 py-0.5 bg-gray-200 dark:bg-surface-700 rounded text-xs font-mono text-primary-600 dark:text-primary-400">{codeMatch[1]}</code>);
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // Bold
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      parts.push(<strong key={key++} className="font-semibold text-gray-900 dark:text-white">{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Italic
    const italicMatch = remaining.match(/^\*([^*]+)\*/);
    if (italicMatch) {
      parts.push(<em key={key++} className="italic">{italicMatch[1]}</em>);
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Regular text (one character at a time if no match)
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
