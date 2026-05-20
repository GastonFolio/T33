import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, RefreshCw, Check } from 'lucide-react';

const jobTemplates: Record<string, { title: string; skills: string; example: string }> = {
  'dev-fullstack': {
    title: 'Développeur Full Stack',
    skills: 'React, Node.js, TypeScript, PostgreSQL, Docker, CI/CD',
    example: `Madame, Monsieur,

Développeur Full Stack avec {experience} d'expérience en création d'applications web modernes, je me permets de vous adresser ma candidature pour le poste de Développeur Full Stack au sein de {entreprise}. Votre engagement pour {motivation} et votre stack technique moderne correspondent parfaitement à mon parcours et mes ambitions professionnelles.

Au cours de mes expériences, j'ai {realisation1}, {realisation2}, et {realisation3}. Ma maîtrise de {competences} me permettrait d'être rapidement opérationnel au sein de votre équipe et de contribuer activement à vos projets.

{entreprise} m'attire particulièrement par {raison_entreprise}. Votre culture d'entreprise axée sur l'innovation et la qualité du code résonne profondément avec mes valeurs professionnelles et mon désir de progresser dans un environnement stimulant.

Je serais ravi d'échanger avec vous lors d'un entretien pour discuter de ma contribution potentielle à vos projets. Je reste disponible à votre convenance.

Cordialement,
{nom}`
  },
  'admin-reseaux': {
    title: 'Administrateur Réseaux',
    skills: 'Cisco, TCP/IP, VPN, Firewall, Active Directory, Linux, Windows Server, Monitoring',
    example: `Madame, Monsieur,

Titulaire d'un {diplome} et certifié {certifications}, je souhaite rejoindre {entreprise} en tant qu'Administrateur Réseaux pour mettre à profit mon expertise en infrastructure et sécurité réseau acquise au fil de {experience} d'expérience.

Fort d'une solide expérience en administration d'infrastructures réseau, j'ai {realisation1}, {realisation2}, et {realisation3}. Mes compétences en {competences} me permettent de garantir la disponibilité, la performance et la sécurité des systèmes d'information.

Votre entreprise, reconnue pour {raison_entreprise}, représente pour moi l'environnement idéal pour développer mes compétences et apporter une valeur ajoutée immédiate à votre équipe technique.

Disponible {disponibilite}, je serais honoré de vous rencontrer pour échanger sur ma candidature et les défis techniques auxquels votre infrastructure fait face.

Cordialement,
{nom}`
  },
  'cybersecurite': {
    title: 'Analyste Cybersécurité',
    skills: 'SIEM, SOC, Pentesting, Nmap, Wireshark, ISO 27001, RGPD, Kali Linux',
    example: `Madame, Monsieur,

Passionné par la cybersécurité et disposant de {experience} d'expérience dans la protection des systèmes d'information, je me porte candidat pour le poste d'Analyste Cybersécurité chez {entreprise}. La montée des cybermenaces renforce ma conviction que la sécurité informatique est un enjeu stratégique majeur.

Au cours de mon parcours, j'ai {realisation1}, {realisation2}, et {realisation3}. Mes certifications en {certifications} et ma maîtrise de {competences} me permettent d'identifier, analyser et neutraliser les menaces de manière proactive.

{entreprise} m'attire par {raison_entreprise}. Votre approche de la sécurité comme levier de confiance pour vos clients correspond à ma vision du métier.

Je serais ravi de discuter avec vous de la manière dont je pourrais contribuer à renforcer la posture de sécurité de votre organisation.

Cordialement,
{nom}`
  },
  'devops': {
    title: 'Ingénieur DevOps',
    skills: 'Docker, Kubernetes, Terraform, Jenkins, AWS, GitLab CI, Ansible, Prometheus',
    example: `Madame, Monsieur,

Ingénieur DevOps avec {experience} d'expérience en automatisation d'infrastructures et pipelines CI/CD, je souhaite mettre mes compétences au service de {entreprise}. L'alliance entre développement et opérations est pour moi la clé d'une livraison logicielle rapide et fiable.

J'ai eu l'opportunité de {realisation1}, {realisation2}, et {realisation3}. Ma maîtrise de {competences} me permet d'optimiser les workflows de déploiement et d'assurer la résilience des environnements de production.

{entreprise} se distingue par {raison_entreprise}, ce qui correspond parfaitement à ma vision d'une infrastructure moderne, scalable et automatisée.

Je serais enthousiaste à l'idée d'échanger avec vous pour explorer les synergies possibles. Je reste disponible à votre convenance.

Cordialement,
{nom}`
  },
  'support-it': {
    title: 'Technicien Support IT',
    skills: 'Windows, macOS, Active Directory, Office 365, ITIL, Troubleshooting, ServiceNow',
    example: `Madame, Monsieur,

Technicien Support IT avec {experience} d'expérience en assistance utilisateurs et maintenance d'infrastructures, je souhaite intégrer l'équipe de {entreprise} pour apporter mon expertise technique et mon sens du service client.

Au fil de mon parcours, j'ai {realisation1}, {realisation2}, et {realisation3}. Mes compétences en {competences} me permettent de diagnostiquer rapidement les problèmes et de proposer des solutions efficaces.

{entreprise} m'intéresse particulièrement pour {raison_entreprise}. Votre engagement envers la satisfaction utilisateur et la modernisation des outils de travail correspond à mes aspirations professionnelles.

Disponible {disponibilite}, je serais ravi de discuter avec vous de ma candidature.

Cordialement,
{nom}`
  },
};

export default function CoverLetterPage() {
  const [selectedJob, setSelectedJob] = useState('dev-fullstack');
  const [formData, setFormData] = useState({
    nom: '',
    experience: '2 ans',
    entreprise: '',
    diplome: 'BTS SIO',
    certifications: '',
    competences: '',
    motivation: '',
    raison_entreprise: '',
    realisation1: '',
    realisation2: '',
    realisation3: '',
    disponibilite: 'immédiatement',
  });
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [copied, setCopied] = useState(false);

  const template = jobTemplates[selectedJob];

  const handleGenerate = () => {
    let letter = template.example;
    Object.entries(formData).forEach(([key, value]) => {
      const regex = new RegExp(`\\{${key}\\}`, 'g');
      letter = letter.replace(regex, value || `[${key}]`);
    });
    setGeneratedLetter(letter);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedLetter], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lettre_motivation_${formData.entreprise || 'entreprise'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gray-50 dark:bg-surface-950">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ✉️ Générateur de Lettre de Motivation
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Créez une lettre de motivation professionnelle et personnalisée pour votre candidature IT.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            {/* Job Selection */}
            <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-gray-200 dark:border-surface-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Métier ciblé</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(jobTemplates).map(([key, tmpl]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedJob(key)}
                    className={`p-2.5 rounded-lg text-xs font-medium transition-all border ${
                      selectedJob === key
                        ? 'bg-primary-500/10 border-primary-500 text-primary-500'
                        : 'border-gray-200 dark:border-surface-600 text-gray-600 dark:text-gray-400 hover:border-primary-500/50'
                    }`}
                  >
                    {tmpl.title}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">
                <strong>Compétences clés :</strong> {template.skills}
              </p>
            </div>

            {/* Personal Info */}
            <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-gray-200 dark:border-surface-700 space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Vos informations</h3>
              <FormInput label="Votre nom complet" value={formData.nom} onChange={v => updateForm('nom', v)} placeholder="Prénom Nom" />
              <FormInput label="Années d'expérience" value={formData.experience} onChange={v => updateForm('experience', v)} placeholder="2 ans" />
              <FormInput label="Entreprise ciblée" value={formData.entreprise} onChange={v => updateForm('entreprise', v)} placeholder="Nom de l'entreprise" />
              <FormInput label="Diplôme" value={formData.diplome} onChange={v => updateForm('diplome', v)} placeholder="BTS SIO / Licence / Master" />
              <FormInput label="Certifications" value={formData.certifications} onChange={v => updateForm('certifications', v)} placeholder="CCNA, AWS, etc." />
              <FormInput label="Compétences principales" value={formData.competences} onChange={v => updateForm('competences', v)} placeholder="React, Node.js, Docker" />
              <FormInput label="Disponibilité" value={formData.disponibilite} onChange={v => updateForm('disponibilite', v)} placeholder="immédiatement / dans 1 mois" />
            </div>

            {/* Achievements */}
            <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-gray-200 dark:border-surface-700 space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Réalisations & Motivation</h3>
              <FormInput label="Réalisation 1" value={formData.realisation1} onChange={v => updateForm('realisation1', v)} placeholder="développé une application web utilisée par +5000 utilisateurs" />
              <FormInput label="Réalisation 2" value={formData.realisation2} onChange={v => updateForm('realisation2', v)} placeholder="réduit le temps de chargement de 40% via l'optimisation" />
              <FormInput label="Réalisation 3" value={formData.realisation3} onChange={v => updateForm('realisation3', v)} placeholder="mis en place un pipeline CI/CD automatisé" />
              <FormInput label="Motivation (ce qui vous attire)" value={formData.motivation} onChange={v => updateForm('motivation', v)} placeholder="l'innovation technologique et les défis techniques" />
              <FormInput label="Pourquoi cette entreprise" value={formData.raison_entreprise} onChange={v => updateForm('raison_entreprise', v)} placeholder="son expertise en solutions cloud et sa culture d'innovation" />
            </div>

            <button
              onClick={handleGenerate}
              className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Générer la lettre
            </button>
          </motion.div>

          {/* Preview */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-white dark:bg-surface-800 rounded-xl border border-gray-200 dark:border-surface-700 sticky top-24">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-surface-700">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Aperçu de la lettre</h3>
                {generatedLetter && (
                  <div className="flex gap-2">
                    <button onClick={handleCopy} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-surface-700 transition-colors text-gray-500">
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button onClick={handleDownload} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-surface-700 transition-colors text-gray-500">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className="p-6 min-h-[400px]">
                {generatedLetter ? (
                  <div className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-[serif]">
                    {generatedLetter}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-gray-500">
                    <span className="text-4xl mb-3">✉️</span>
                    <p className="text-sm text-center">
                      Remplissez le formulaire et cliquez sur "Générer" pour voir votre lettre de motivation.
                    </p>
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="p-4 border-t border-gray-200 dark:border-surface-700 bg-gray-50 dark:bg-surface-900 rounded-b-xl">
                <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">💡 Conseils RH</h4>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Personnalisez chaque lettre pour l'entreprise ciblée</li>
                  <li>• Utilisez des résultats chiffrés (%, €, utilisateurs)</li>
                  <li>• Maximum 1 page (250-350 mots)</li>
                  <li>• Relisez attentivement pour les fautes</li>
                  <li>• Mentionnez les mots-clés de l'offre d'emploi</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FormInput({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-surface-600 bg-white dark:bg-surface-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
      />
    </div>
  );
}
