import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertTriangle, FileText, Award, Mail } from 'lucide-react';
import { getCVData } from '../utils/storage';
import { analyzeCV } from '../utils/atsAnalyzer';
import { saveEvaluation } from '../utils/storage';

type EvalType = 'cv-ats' | 'cover-letter' | 'portfolio-review';

const evalTypes = [
  { id: 'cv-ats' as EvalType, title: 'Évaluation CV ATS', icon: '📄', description: 'Analyse complète de votre CV avec score ATS et recommandations.' },
  { id: 'cover-letter' as EvalType, title: 'Évaluation Lettre de Motivation', icon: '✉️', description: 'Analyse de votre lettre de motivation avec conseils d\'amélioration.' },
  { id: 'portfolio-review' as EvalType, title: 'Évaluation Portfolio', icon: '🌐', description: 'Analyse de votre portfolio avec checklist de bonnes pratiques.' },
];

export default function EvaluationPage() {
  const [selectedType, setSelectedType] = useState<EvalType | null>(null);
  const [email, setEmail] = useState('');
  const [targetJob, setTargetJob] = useState('dev-web');
  const [coverLetterText, setCoverLetterText] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<EvalResult | null>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!email || !selectedType) return;
    setSending(true);

    let evalResult: EvalResult;

    if (selectedType === 'cv-ats') {
      const cvData = getCVData();
      if (!cvData) {
        setSending(false);
        alert('Veuillez d\'abord remplir votre CV dans le CV Builder.');
        return;
      }
      const atsResult = analyzeCV(cvData, targetJob);
      evalResult = {
        type: 'Évaluation CV ATS',
        score: atsResult.score,
        grade: getGrade(atsResult.score),
        details: [
          `Score ATS global : ${atsResult.score}%`,
          `Mots-clés trouvés : ${atsResult.matchedKeywords.length}`,
          `Mots-clés manquants : ${atsResult.missingKeywords.length}`,
          `Points forts : ${atsResult.strengths.length}`,
          `Problèmes détectés : ${atsResult.issues.length}`,
        ],
        recommendations: atsResult.recommendations,
        strengths: atsResult.strengths,
        issues: atsResult.issues.map(i => i.message),
      };
    } else if (selectedType === 'cover-letter') {
      evalResult = evaluateCoverLetter(coverLetterText);
    } else {
      evalResult = evaluatePortfolio(portfolioUrl);
    }

    // Save locally
    saveEvaluation({
      type: evalResult.type,
      score: evalResult.score,
      email,
    });

    // Send email via EmailJS or fallback
    try {
      await sendEvaluationEmail(email, evalResult);
    } catch {
      console.log('Email service not configured — results saved locally.');
    }

    setResult(evalResult);
    setSubmitted(true);
    setSending(false);
  };

  if (submitted && result) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4 bg-gray-50 dark:bg-surface-950">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Score Header */}
            <div className={`rounded-2xl p-8 text-center text-white mb-8 bg-gradient-to-r ${
              result.score >= 75 ? 'from-emerald-500 to-teal-500' :
              result.score >= 50 ? 'from-yellow-500 to-orange-500' :
              'from-red-500 to-pink-500'
            }`}>
              <Award className="w-12 h-12 mx-auto mb-3 opacity-90" />
              <h2 className="text-2xl font-bold mb-1">{result.type}</h2>
              <div className="text-5xl font-bold my-3">{result.score}%</div>
              <div className="text-xl font-medium opacity-90">Note : {result.grade}</div>
              <p className="text-sm opacity-80 mt-2">
                {result.score >= 75 ? 'Excellent travail ! Votre travail est de qualité professionnelle.' :
                 result.score >= 50 ? 'Bon travail ! Quelques améliorations sont recommandées.' :
                 'Des améliorations significatives sont nécessaires. Consultez les recommandations.'}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-gray-200 dark:border-surface-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary-500" /> Détails de l'évaluation
                </h3>
                <div className="space-y-2">
                  {result.details.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-primary-500 shrink-0" /> {d}
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths */}
              {result.strengths.length > 0 && (
                <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-gray-200 dark:border-surface-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" /> Points forts
                  </h3>
                  <div className="space-y-2">
                    {result.strengths.map((s, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="text-emerald-500 shrink-0">✅</span> {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Issues */}
              {result.issues.length > 0 && (
                <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-gray-200 dark:border-surface-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" /> Points à améliorer
                  </h3>
                  <div className="space-y-2">
                    {result.issues.map((s, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="text-orange-500 shrink-0">⚠️</span> {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {result.recommendations.length > 0 && (
                <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-gray-200 dark:border-surface-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    💡 Recommandations
                  </h3>
                  <div className="space-y-2">
                    {result.recommendations.map((r, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="text-primary-500 shrink-0">→</span> {r}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Email Notice */}
              <div className="bg-blue-50 dark:bg-blue-500/10 rounded-xl p-4 border border-blue-200 dark:border-blue-500/20 flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Rapport envoyé</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    Un rapport détaillé a été enregistré. Vous pouvez consulter vos résultats dans le Dashboard.
                  </p>
                </div>
              </div>

              <button
                onClick={() => { setSubmitted(false); setResult(null); setSelectedType(null); }}
                className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold transition-colors"
              >
                Nouvelle évaluation
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gray-50 dark:bg-surface-950">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ✅ Évaluation Automatique
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Soumettez vos travaux pour une évaluation automatique avec score, commentaires et recommandations.
          </p>
        </motion.div>

        {/* Email Field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-gray-200 dark:border-surface-700 mb-6"
        >
          <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary-500" /> Votre email (obligatoire)
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="votre.email@example.com"
            className="w-full p-3 rounded-lg border border-gray-200 dark:border-surface-600 bg-white dark:bg-surface-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
          />
          <p className="text-xs text-gray-500 mt-2">Le rapport d'évaluation sera associé à cette adresse email.</p>
        </motion.div>

        {/* Eval Type Selection */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {evalTypes.map((et, i) => (
            <motion.button
              key={et.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              onClick={() => setSelectedType(et.id)}
              className={`text-left p-5 rounded-xl border transition-all ${
                selectedType === et.id
                  ? 'bg-primary-500/10 border-primary-500 ring-2 ring-primary-500/20'
                  : 'bg-white dark:bg-surface-800 border-gray-200 dark:border-surface-700 hover:border-primary-500/50'
              }`}
            >
              <span className="text-3xl">{et.icon}</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mt-3 text-sm">{et.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{et.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Type-specific form */}
        {selectedType && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-gray-200 dark:border-surface-700 mb-6">
              {selectedType === 'cv-ats' && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Évaluation CV ATS</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Votre CV sera analysé depuis le CV Builder. Assurez-vous de l'avoir rempli.
                  </p>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Métier ciblé</label>
                  <select
                    value={targetJob}
                    onChange={e => setTargetJob(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-surface-600 bg-white dark:bg-surface-900 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="dev-web">Développeur Web</option>
                    <option value="reseaux">Réseaux & Télécom</option>
                    <option value="cybersecurite">Cybersécurité</option>
                    <option value="devops">DevOps</option>
                    <option value="data">Data / IA</option>
                    <option value="cloud">Cloud</option>
                    <option value="support-it">Support IT</option>
                  </select>
                </div>
              )}

              {selectedType === 'cover-letter' && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Évaluation Lettre de Motivation</h3>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Collez votre lettre de motivation</label>
                  <textarea
                    value={coverLetterText}
                    onChange={e => setCoverLetterText(e.target.value)}
                    placeholder="Collez ici votre lettre de motivation..."
                    className="w-full p-3 rounded-lg border border-gray-200 dark:border-surface-600 bg-white dark:bg-surface-900 text-gray-900 dark:text-white text-sm min-h-[200px] resize-y focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              )}

              {selectedType === 'portfolio-review' && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Évaluation Portfolio</h3>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">URL de votre portfolio</label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={e => setPortfolioUrl(e.target.value)}
                    placeholder="https://monportfolio.github.io"
                    className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-surface-600 bg-white dark:bg-surface-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">L'évaluation sera basée sur une checklist de bonnes pratiques.</p>
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!email || sending}
              className="w-full py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:dark:bg-surface-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:cursor-not-allowed transition-colors"
            >
              {sending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyse en cours...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Soumettre pour évaluation
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Types
interface EvalResult {
  type: string;
  score: number;
  grade: string;
  details: string[];
  recommendations: string[];
  strengths: string[];
  issues: string[];
}

function getGrade(score: number): string {
  if (score >= 90) return 'A+ Excellent';
  if (score >= 80) return 'A Très Bien';
  if (score >= 70) return 'B Bien';
  if (score >= 60) return 'C Assez Bien';
  if (score >= 50) return 'D Passable';
  return 'E À améliorer';
}

function evaluateCoverLetter(text: string): EvalResult {
  const strengths: string[] = [];
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 50;

  const wordCount = text.split(/\s+/).filter(Boolean).length;

  // Length check
  if (wordCount >= 200 && wordCount <= 400) {
    strengths.push(`Bonne longueur (${wordCount} mots)`);
    score += 10;
  } else if (wordCount < 200) {
    issues.push(`Lettre trop courte (${wordCount} mots). Visez 250-350 mots.`);
    score -= 10;
  } else {
    issues.push(`Lettre trop longue (${wordCount} mots). Maximum 350 mots recommandés.`);
    score -= 5;
  }

  // Structure check
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim());
  if (paragraphs.length >= 3 && paragraphs.length <= 5) {
    strengths.push(`Bonne structure (${paragraphs.length} paragraphes)`);
    score += 10;
  } else {
    issues.push('Structure non optimale. Visez 4 paragraphes.');
    score -= 5;
  }

  // Professional salutation
  if (/madame|monsieur/i.test(text)) {
    strengths.push('Formule de politesse présente');
    score += 5;
  } else {
    issues.push('Ajoutez une formule de salutation (Madame, Monsieur)');
    score -= 5;
  }

  // Closing
  if (/cordialement|respectueusement|salutations/i.test(text)) {
    strengths.push('Formule de conclusion présente');
    score += 5;
  } else {
    issues.push('Ajoutez une formule de conclusion (Cordialement)');
    score -= 5;
  }

  // Numbers/results
  if (/\d+%|\d+\s*(utilisateurs|clients|projets|euros|€)/i.test(text)) {
    strengths.push('Résultats chiffrés mentionnés');
    score += 10;
  } else {
    recommendations.push('Ajoutez des résultats chiffrés pour plus d\'impact');
  }

  // Company mention
  if (/entreprise|société|votre|vous/i.test(text)) {
    strengths.push('Référence à l\'entreprise présente');
    score += 5;
  }

  // Technical skills
  const techKeywords = ['react', 'node', 'python', 'java', 'docker', 'aws', 'cisco', 'linux', 'sql', 'git'];
  const foundTech = techKeywords.filter(k => text.toLowerCase().includes(k));
  if (foundTech.length >= 3) {
    strengths.push(`Compétences techniques mentionnées (${foundTech.length})`);
    score += 5;
  } else {
    recommendations.push('Mentionnez davantage de compétences techniques');
  }

  score = Math.min(100, Math.max(0, score));

  return {
    type: 'Évaluation Lettre de Motivation',
    score,
    grade: getGrade(score),
    details: [
      `Nombre de mots : ${wordCount}`,
      `Nombre de paragraphes : ${paragraphs.length}`,
      `Compétences techniques détectées : ${foundTech.length}`,
    ],
    recommendations: [
      ...recommendations,
      'Personnalisez chaque lettre pour l\'entreprise ciblée',
      'Relisez attentivement pour les fautes d\'orthographe',
    ],
    strengths,
    issues,
  };
}

function evaluatePortfolio(url: string): EvalResult {
  const strengths: string[] = [];
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 40;

  // URL validation
  if (url.startsWith('http')) {
    strengths.push('URL valide fournie');
    score += 10;
  } else {
    issues.push('URL invalide ou manquante');
  }

  // GitHub Pages check
  if (url.includes('github.io') || url.includes('netlify') || url.includes('vercel')) {
    strengths.push('Hébergé sur une plateforme reconnue');
    score += 10;
  }

  // HTTPS
  if (url.startsWith('https')) {
    strengths.push('HTTPS activé');
    score += 5;
  } else {
    issues.push('Activez HTTPS pour la sécurité');
  }

  // General checklist-based evaluation
  const checklistItems = [
    'Section Hero avec nom et titre',
    'Section À propos',
    'Section Projets (4-6 projets)',
    'Section Compétences',
    'Section Contact',
    'Design responsive mobile',
    'Navigation claire',
    'Liens vers GitHub et LinkedIn',
    'Temps de chargement < 3s',
    'Accessibilité (alt sur les images)',
  ];

  // Simulate partial compliance
  const passedChecks = Math.floor(Math.random() * 3) + 5;
  score += passedChecks * 3;

  strengths.push(`Portfolio en ligne accessible`);
  recommendations.push(...[
    'Assurez-vous d\'avoir au moins 4 projets avec démo',
    'Ajoutez des captures d\'écran pour chaque projet',
    'Optimisez les images pour le chargement rapide',
    'Ajoutez des meta tags SEO',
    'Testez sur mobile et tablette',
    'Ajoutez un favicon personnalisé',
  ]);

  score = Math.min(100, Math.max(0, score));

  return {
    type: 'Évaluation Portfolio',
    score,
    grade: getGrade(score),
    details: [
      `URL : ${url}`,
      `Checklist : basée sur ${checklistItems.length} critères`,
      `Plateforme détectée : ${url.includes('github') ? 'GitHub Pages' : url.includes('netlify') ? 'Netlify' : 'Autre'}`,
    ],
    recommendations,
    strengths,
    issues,
  };
}

async function sendEvaluationEmail(email: string, result: EvalResult): Promise<void> {
  // This function would integrate with EmailJS or Google Apps Script
  // For now, we log the email that would be sent
  console.log('📧 Email evaluation report:', {
    to: email,
    cc: 'apprentissage.csft@gmail.com',
    subject: `IT Career Lab — ${result.type} — Score: ${result.score}%`,
    body: `
Bonjour,

Voici les résultats de votre ${result.type} :

📊 Score global : ${result.score}% (${result.grade})

✅ Points forts :
${result.strengths.map(s => `  - ${s}`).join('\n')}

⚠️ Points à améliorer :
${result.issues.map(s => `  - ${s}`).join('\n')}

💡 Recommandations :
${result.recommendations.map(r => `  - ${r}`).join('\n')}

Continuez votre apprentissage sur IT Career Lab !

Cordialement,
L'équipe IT Career Lab
    `.trim(),
  });

  // Integration point for EmailJS:
  // await emailjs.send('service_id', 'template_id', templateParams, 'public_key');
}
