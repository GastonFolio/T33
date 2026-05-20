import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Download, BarChart3, X, ChevronDown, AlertCircle, CheckCircle, Info, Sparkles } from 'lucide-react';
import { CVData, Experience, Education, Project, saveCVData, getCVData, defaultCVData } from '../utils/storage';
import { analyzeCV, type ATSResult } from '../utils/atsAnalyzer';

const jobOptions = [
  { value: 'dev-web', label: 'Développeur Web' },
  { value: 'reseaux', label: 'Réseaux & Télécom' },
  { value: 'cybersecurite', label: 'Cybersécurité' },
  { value: 'devops', label: 'DevOps' },
  { value: 'data', label: 'Data / IA' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'support-it', label: 'Support IT' },
];

export default function CVBuilder() {
  const [cv, setCv] = useState<CVData>(getCVData() || defaultCVData);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'analysis'>('edit');
  const [targetJob, setTargetJob] = useState('dev-web');
  const [atsResult, setAtsResult] = useState<ATSResult | null>(null);
  const [skillInput, setSkillInput] = useState('');
  const [certInput, setCertInput] = useState('');
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    saveCVData(cv);
  }, [cv]);

  const updateField = <K extends keyof CVData>(field: K, value: CVData[K]) => {
    setCv(prev => ({ ...prev, [field]: value }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: [''],
    };
    updateField('experiences', [...cv.experiences, newExp]);
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    updateField('experiences', cv.experiences.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const removeExperience = (id: string) => {
    updateField('experiences', cv.experiences.filter(e => e.id !== id));
  };

  const addEducation = () => {
    const newEdu: Education = { id: Date.now().toString(), degree: '', school: '', year: '' };
    updateField('education', [...cv.education, newEdu]);
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    updateField('education', cv.education.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const removeEducation = (id: string) => {
    updateField('education', cv.education.filter(e => e.id !== id));
  };

  const addProject = () => {
    const newProj: Project = { id: Date.now().toString(), name: '', description: '', technologies: [], link: '' };
    updateField('projects', [...cv.projects, newProj]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    updateField('projects', cv.projects.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const removeProject = (id: string) => {
    updateField('projects', cv.projects.filter(p => p.id !== id));
  };

  const addSkill = () => {
    if (skillInput.trim() && !cv.skills.includes(skillInput.trim())) {
      updateField('skills', [...cv.skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const addCertification = () => {
    if (certInput.trim() && !cv.certifications.includes(certInput.trim())) {
      updateField('certifications', [...cv.certifications, certInput.trim()]);
      setCertInput('');
    }
  };

  const runAnalysis = () => {
    const result = analyzeCV(cv, targetJob);
    setAtsResult(result);
    setActiveTab('analysis');
  };

  const handleExportPDF = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
          <head>
            <title>CV - ${cv.fullName || 'Mon CV'}</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; line-height: 1.5; padding: 40px; max-width: 800px; margin: 0 auto; }
              h1 { font-size: 24px; margin-bottom: 4px; }
              h2 { font-size: 14px; color: #3b82f6; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #3b82f6; padding-bottom: 4px; margin: 20px 0 10px; }
              h3 { font-size: 14px; margin-bottom: 2px; }
              p, li { font-size: 12px; }
              .contact { font-size: 12px; color: #666; margin-bottom: 4px; }
              .summary { font-size: 12px; color: #444; margin-bottom: 16px; }
              .skills-list { display: flex; flex-wrap: wrap; gap: 6px; }
              .skill-tag { background: #eff6ff; color: #1d4ed8; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
              .exp-header { display: flex; justify-content: space-between; align-items: baseline; }
              .exp-date { font-size: 11px; color: #888; }
              .exp-company { font-size: 12px; color: #666; font-style: italic; }
              ul { margin: 4px 0 12px 16px; }
              li { margin-bottom: 2px; }
              .section { margin-bottom: 16px; }
              .edu-item, .proj-item { margin-bottom: 8px; }
              .cert-list { font-size: 12px; }
              .lang-list { font-size: 12px; }
            </style>
          </head>
          <body>${printContent}</body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const tabs = [
    { id: 'edit' as const, label: '✏️ Éditer', icon: null },
    { id: 'preview' as const, label: '👁️ Aperçu', icon: null },
    { id: 'analysis' as const, label: '📊 Analyse ATS', icon: null },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gray-50 dark:bg-surface-950">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            📄 CV Builder ATS
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Créez un CV professionnel optimisé pour les systèmes de suivi des candidatures.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-surface-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-surface-700 border border-gray-200 dark:border-surface-700'
              }`}
            >
              {tab.label}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <select
              value={targetJob}
              onChange={e => setTargetJob(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm bg-white dark:bg-surface-800 border border-gray-200 dark:border-surface-700 text-gray-700 dark:text-gray-300"
            >
              {jobOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <button
              onClick={runAnalysis}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <BarChart3 className="w-4 h-4" /> Analyser
            </button>
            <button
              onClick={handleExportPDF}
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" /> PDF
            </button>
          </div>
        </div>

        {/* Edit Tab */}
        {activeTab === 'edit' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Personal Info */}
            <Section title="Informations Personnelles">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Nom complet" value={cv.fullName} onChange={v => updateField('fullName', v)} placeholder="Prénom Nom" />
                <Input label="Titre professionnel" value={cv.title} onChange={v => updateField('title', v)} placeholder="Développeur Full Stack" />
                <Input label="Email" value={cv.email} onChange={v => updateField('email', v)} placeholder="email@example.com" type="email" />
                <Input label="Téléphone" value={cv.phone} onChange={v => updateField('phone', v)} placeholder="06 XX XX XX XX" />
                <Input label="Localisation" value={cv.location} onChange={v => updateField('location', v)} placeholder="Paris, France" />
                <Input label="LinkedIn" value={cv.linkedin} onChange={v => updateField('linkedin', v)} placeholder="linkedin.com/in/username" />
                <Input label="GitHub" value={cv.github} onChange={v => updateField('github', v)} placeholder="github.com/username" />
                <Input label="Portfolio" value={cv.portfolio} onChange={v => updateField('portfolio', v)} placeholder="monportfolio.dev" />
              </div>
            </Section>

            {/* Summary */}
            <Section title="Résumé Professionnel">
              <textarea
                value={cv.summary}
                onChange={e => updateField('summary', e.target.value)}
                placeholder="Décrivez votre profil en 3-4 lignes..."
                className="w-full p-3 rounded-lg border border-gray-200 dark:border-surface-600 bg-white dark:bg-surface-900 text-gray-900 dark:text-white text-sm min-h-[100px] resize-y focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              />
            </Section>

            {/* Skills */}
            <Section title="Compétences Techniques">
              <div className="flex gap-2 mb-3">
                <input
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="Ajouter une compétence..."
                  className="flex-1 p-2.5 rounded-lg border border-gray-200 dark:border-surface-600 bg-white dark:bg-surface-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
                <button onClick={addSkill} className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {cv.skills.map((skill, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm border border-primary-200 dark:border-primary-500/20">
                    {skill}
                    <button onClick={() => updateField('skills', cv.skills.filter((_, j) => j !== i))} className="hover:text-red-500 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </Section>

            {/* Experience */}
            <Section title="Expérience Professionnelle" onAdd={addExperience} addLabel="Ajouter une expérience">
              {cv.experiences.map((exp, idx) => (
                <div key={exp.id} className="p-4 rounded-xl bg-gray-50 dark:bg-surface-900 border border-gray-200 dark:border-surface-700 mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-500">Expérience {idx + 1}</span>
                    <button onClick={() => removeExperience(exp.id)} className="text-red-500 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input label="Titre du poste" value={exp.title} onChange={v => updateExperience(exp.id, { title: v })} placeholder="Développeur Full Stack" />
                    <Input label="Entreprise" value={exp.company} onChange={v => updateExperience(exp.id, { company: v })} placeholder="TechCorp" />
                    <Input label="Date début" value={exp.startDate} onChange={v => updateExperience(exp.id, { startDate: v })} placeholder="09/2023" />
                    <Input label="Date fin" value={exp.endDate} onChange={v => updateExperience(exp.id, { endDate: v })} placeholder="Présent" />
                  </div>
                  <div className="mt-3">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Réalisations (une par ligne)</label>
                    <textarea
                      value={exp.bullets.join('\n')}
                      onChange={e => updateExperience(exp.id, { bullets: e.target.value.split('\n') })}
                      placeholder="- Développé une application React&#10;- Réduit le temps de chargement de 40%&#10;- Collaboré avec 8 développeurs"
                      className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-surface-600 bg-white dark:bg-surface-900 text-gray-900 dark:text-white text-sm min-h-[80px] resize-y focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>
              ))}
            </Section>

            {/* Education */}
            <Section title="Formation" onAdd={addEducation} addLabel="Ajouter une formation">
              {cv.education.map((edu, idx) => (
                <div key={edu.id} className="p-4 rounded-xl bg-gray-50 dark:bg-surface-900 border border-gray-200 dark:border-surface-700 mb-3">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-500">Formation {idx + 1}</span>
                    <button onClick={() => removeEducation(edu.id)} className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <Input label="Diplôme" value={edu.degree} onChange={v => updateEducation(edu.id, { degree: v })} placeholder="BTS SIO" />
                    <Input label="Établissement" value={edu.school} onChange={v => updateEducation(edu.id, { school: v })} placeholder="Université Paris" />
                    <Input label="Année" value={edu.year} onChange={v => updateEducation(edu.id, { year: v })} placeholder="2023" />
                  </div>
                </div>
              ))}
            </Section>

            {/* Projects */}
            <Section title="Projets Personnels" onAdd={addProject} addLabel="Ajouter un projet">
              {cv.projects.map((proj, idx) => (
                <div key={proj.id} className="p-4 rounded-xl bg-gray-50 dark:bg-surface-900 border border-gray-200 dark:border-surface-700 mb-3">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-500">Projet {idx + 1}</span>
                    <button onClick={() => removeProject(proj.id)} className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input label="Nom du projet" value={proj.name} onChange={v => updateProject(proj.id, { name: v })} placeholder="E-commerce App" />
                    <Input label="Lien" value={proj.link} onChange={v => updateProject(proj.id, { link: v })} placeholder="github.com/user/project" />
                  </div>
                  <div className="mt-3">
                    <Input label="Description" value={proj.description} onChange={v => updateProject(proj.id, { description: v })} placeholder="Application e-commerce avec React et Node.js" />
                  </div>
                  <div className="mt-3">
                    <Input label="Technologies (séparées par des virgules)" value={proj.technologies.join(', ')} onChange={v => updateProject(proj.id, { technologies: v.split(',').map(t => t.trim()).filter(Boolean) })} placeholder="React, Node.js, MongoDB" />
                  </div>
                </div>
              ))}
            </Section>

            {/* Certifications */}
            <Section title="Certifications">
              <div className="flex gap-2 mb-3">
                <input
                  value={certInput}
                  onChange={e => setCertInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                  placeholder="Ajouter une certification..."
                  className="flex-1 p-2.5 rounded-lg border border-gray-200 dark:border-surface-600 bg-white dark:bg-surface-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
                <button onClick={addCertification} className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm"><Plus className="w-4 h-4" /></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {cv.certifications.map((cert, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm border border-emerald-200 dark:border-emerald-500/20">
                    {cert}
                    <button onClick={() => updateField('certifications', cv.certifications.filter((_, j) => j !== i))} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </Section>

            {/* Languages */}
            <Section title="Langues">
              <div className="space-y-2">
                {cv.languages.map((lang, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <input
                      value={lang.name}
                      onChange={e => {
                        const newLangs = [...cv.languages];
                        newLangs[i] = { ...lang, name: e.target.value };
                        updateField('languages', newLangs);
                      }}
                      className="flex-1 p-2.5 rounded-lg border border-gray-200 dark:border-surface-600 bg-white dark:bg-surface-900 text-gray-900 dark:text-white text-sm"
                      placeholder="Langue"
                    />
                    <input
                      value={lang.level}
                      onChange={e => {
                        const newLangs = [...cv.languages];
                        newLangs[i] = { ...lang, level: e.target.value };
                        updateField('languages', newLangs);
                      }}
                      className="flex-1 p-2.5 rounded-lg border border-gray-200 dark:border-surface-600 bg-white dark:bg-surface-900 text-gray-900 dark:text-white text-sm"
                      placeholder="Niveau"
                    />
                    <button onClick={() => updateField('languages', cv.languages.filter((_, j) => j !== i))} className="text-red-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => updateField('languages', [...cv.languages, { name: '', level: '' }])}
                  className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Ajouter une langue
                </button>
              </div>
            </Section>
          </motion.div>
        )}

        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 max-w-3xl mx-auto" ref={printRef}>
              <CVPreview cv={cv} />
            </div>
          </motion.div>
        )}

        {/* Analysis Tab */}
        {activeTab === 'analysis' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {atsResult ? (
              <ATSAnalysisView result={atsResult} />
            ) : (
              <div className="text-center py-20">
                <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Lancez l'analyse ATS</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Cliquez sur le bouton "Analyser" pour évaluer votre CV.</p>
                <button onClick={runAnalysis} className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors">
                  <BarChart3 className="w-4 h-4 inline mr-2" /> Analyser mon CV
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children, onAdd, addLabel }: { title: string; children: React.ReactNode; onAdd?: () => void; addLabel?: string }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl border border-gray-200 dark:border-surface-700 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-surface-700 transition-colors">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{title}</h3>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4">
          {children}
          {onAdd && (
            <button onClick={onAdd} className="mt-3 text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1 transition-colors">
              <Plus className="w-4 h-4" /> {addLabel || 'Ajouter'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-surface-600 bg-white dark:bg-surface-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
      />
    </div>
  );
}

function CVPreview({ cv }: { cv: CVData }) {
  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", color: '#1a1a1a', lineHeight: 1.5 }}>
      {/* Header */}
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>{cv.fullName || 'Votre Nom'}</h1>
      <p style={{ fontSize: 14, color: '#3b82f6', fontWeight: 600, marginBottom: 4 }}>{cv.title || 'Titre Professionnel'}</p>
      <p className="contact" style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
        {[cv.email, cv.phone, cv.location].filter(Boolean).join(' | ')}
      </p>
      {(cv.linkedin || cv.github || cv.portfolio) && (
        <p style={{ fontSize: 12, color: '#666', marginBottom: 12 }}>
          {[cv.linkedin, cv.github, cv.portfolio].filter(Boolean).join(' | ')}
        </p>
      )}

      {/* Summary */}
      {cv.summary && (
        <div className="section">
          <h2 style={{ fontSize: 14, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: 1, borderBottom: '2px solid #3b82f6', paddingBottom: 4, margin: '16px 0 8px' }}>Profil</h2>
          <p style={{ fontSize: 12, color: '#444' }}>{cv.summary}</p>
        </div>
      )}

      {/* Skills */}
      {cv.skills.length > 0 && (
        <div className="section">
          <h2 style={{ fontSize: 14, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: 1, borderBottom: '2px solid #3b82f6', paddingBottom: 4, margin: '16px 0 8px' }}>Compétences Techniques</h2>
          <div className="skills-list" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {cv.skills.map((skill, i) => (
              <span key={i} className="skill-tag" style={{ background: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: 4, fontSize: 11 }}>{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {cv.experiences.length > 0 && (
        <div className="section">
          <h2 style={{ fontSize: 14, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: 1, borderBottom: '2px solid #3b82f6', paddingBottom: 4, margin: '16px 0 8px' }}>Expérience Professionnelle</h2>
          {cv.experiences.map(exp => (
            <div key={exp.id} style={{ marginBottom: 12 }}>
              <div className="exp-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: 14, fontWeight: 600 }}>{exp.title || 'Titre du poste'}</h3>
                <span className="exp-date" style={{ fontSize: 11, color: '#888' }}>{exp.startDate} - {exp.endDate || 'Présent'}</span>
              </div>
              <p className="exp-company" style={{ fontSize: 12, color: '#666', fontStyle: 'italic' }}>{exp.company}</p>
              {exp.bullets.filter(b => b.trim()).length > 0 && (
                <ul style={{ margin: '4px 0 0 16px', listStyle: 'disc' }}>
                  {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                    <li key={i} style={{ fontSize: 12, marginBottom: 2 }}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {cv.education.length > 0 && (
        <div className="section">
          <h2 style={{ fontSize: 14, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: 1, borderBottom: '2px solid #3b82f6', paddingBottom: 4, margin: '16px 0 8px' }}>Formation</h2>
          {cv.education.map(edu => (
            <div key={edu.id} className="edu-item" style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: 13, fontWeight: 600 }}>{edu.degree}</h3>
                <span style={{ fontSize: 11, color: '#888' }}>{edu.year}</span>
              </div>
              <p style={{ fontSize: 12, color: '#666' }}>{edu.school}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {cv.projects.length > 0 && (
        <div className="section">
          <h2 style={{ fontSize: 14, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: 1, borderBottom: '2px solid #3b82f6', paddingBottom: 4, margin: '16px 0 8px' }}>Projets</h2>
          {cv.projects.map(proj => (
            <div key={proj.id} className="proj-item" style={{ marginBottom: 8 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600 }}>{proj.name} {proj.link && <span style={{ fontSize: 11, color: '#3b82f6', fontWeight: 400 }}>— {proj.link}</span>}</h3>
              <p style={{ fontSize: 12, color: '#444' }}>{proj.description}</p>
              {proj.technologies.length > 0 && (
                <p style={{ fontSize: 11, color: '#666' }}>Technologies : {proj.technologies.join(', ')}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {cv.certifications.length > 0 && (
        <div className="section">
          <h2 style={{ fontSize: 14, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: 1, borderBottom: '2px solid #3b82f6', paddingBottom: 4, margin: '16px 0 8px' }}>Certifications</h2>
          <ul style={{ margin: '4px 0 0 16px', listStyle: 'disc' }}>
            {cv.certifications.map((cert, i) => (
              <li key={i} style={{ fontSize: 12 }}>{cert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Languages */}
      {cv.languages.filter(l => l.name).length > 0 && (
        <div className="section">
          <h2 style={{ fontSize: 14, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: 1, borderBottom: '2px solid #3b82f6', paddingBottom: 4, margin: '16px 0 8px' }}>Langues</h2>
          <ul style={{ margin: '4px 0 0 16px', listStyle: 'disc' }}>
            {cv.languages.filter(l => l.name).map((lang, i) => (
              <li key={i} style={{ fontSize: 12 }}>{lang.name} — {lang.level}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ATSAnalysisView({ result }: { result: ATSResult }) {
  const scoreBg = result.score >= 75 ? 'from-emerald-500 to-teal-500' : result.score >= 50 ? 'from-yellow-500 to-orange-500' : 'from-red-500 to-pink-500';

  return (
    <div className="space-y-6">
      {/* Score Card */}
      <div className={`bg-gradient-to-r ${scoreBg} rounded-2xl p-8 text-white text-center`}>
        <h2 className="text-lg font-medium opacity-90 mb-2">Score ATS Global</h2>
        <div className="text-6xl font-bold mb-2">{result.score}%</div>
        <p className="opacity-80">
          {result.score >= 75 ? '✅ Votre CV est bien optimisé pour les ATS !' :
           result.score >= 50 ? '⚠️ Votre CV nécessite quelques améliorations.' :
           '❌ Votre CV a besoin d\'optimisations importantes.'}
        </p>
      </div>

      {/* Breakdown */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Mots-clés', value: result.breakdown.keywords, weight: '40%' },
          { label: 'Structure', value: result.breakdown.structure, weight: '25%' },
          { label: 'Contenu', value: result.breakdown.content, weight: '20%' },
          { label: 'Mise en forme', value: result.breakdown.formatting, weight: '15%' },
        ].map((item, i) => (
          <div key={i} className="bg-white dark:bg-surface-800 rounded-xl p-4 border border-gray-200 dark:border-surface-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{item.label}</span>
              <span className="text-xs text-gray-400">Poids: {item.weight}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{item.value}%</div>
            <div className="w-full bg-gray-200 dark:bg-surface-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  item.value >= 75 ? 'bg-emerald-500' : item.value >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Issues */}
      {result.issues.length > 0 && (
        <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-gray-200 dark:border-surface-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-500" /> Problèmes détectés ({result.issues.length})
          </h3>
          <div className="space-y-3">
            {result.issues.map((issue, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${
                issue.type === 'error' ? 'bg-red-50 dark:bg-red-500/10' :
                issue.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-500/10' :
                'bg-blue-50 dark:bg-blue-500/10'
              }`}>
                {issue.type === 'error' ? <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> :
                 issue.type === 'warning' ? <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" /> :
                 <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />}
                <div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{issue.category}</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{issue.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strengths */}
      {result.strengths.length > 0 && (
        <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-gray-200 dark:border-surface-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" /> Points forts ({result.strengths.length})
          </h3>
          <div className="space-y-2">
            {result.strengths.map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> {s}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Keywords */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-gray-200 dark:border-surface-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">
            ✅ Mots-clés trouvés ({result.matchedKeywords.length})
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {result.matchedKeywords.map((k, i) => (
              <span key={i} className="px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs">{k}</span>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-gray-200 dark:border-surface-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">
            ❌ Mots-clés manquants ({result.missingKeywords.length})
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {result.missingKeywords.map((k, i) => (
              <span key={i} className="px-2 py-1 rounded bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs">{k}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-gray-200 dark:border-surface-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-500" /> Recommandations
          </h3>
          <div className="space-y-2">
            {result.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="text-primary-500 shrink-0">💡</span> {rec}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
