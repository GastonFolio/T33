export interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: string;
  type: 'text' | 'exercise' | 'quiz' | 'project';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
  badge: string;
}

export const modules: Module[] = [
  {
    id: 'job-search',
    title: 'Recherche d\'Emploi IT',
    description: 'Maîtrisez les techniques avancées de recherche d\'emploi dans le secteur IT.',
    icon: '🔍',
    color: 'from-blue-500 to-cyan-500',
    badge: '🏅 Expert Recherche',
    lessons: [
      {
        id: 'js-1',
        title: 'Introduction à la Recherche d\'Emploi IT',
        duration: '15 min',
        type: 'text',
        content: `# Introduction à la Recherche d'Emploi IT

## Le marché IT en 2024-2025

Le secteur IT est l'un des plus dynamiques au monde. Voici les tendances clés :

### 📊 Statistiques du marché
- **+15%** de croissance annuelle des offres IT
- **85%** des recruteurs utilisent LinkedIn
- **75%** des CV sont filtrés par des ATS avant d'être lus
- **Salaire moyen** développeur junior : 32-42K€

### 🎯 Les métiers les plus demandés
1. **Développeur Full Stack** — React, Node.js, Python
2. **DevOps Engineer** — Docker, Kubernetes, CI/CD
3. **Data Analyst/Scientist** — Python, SQL, Machine Learning
4. **Cybersécurité** — Pentesting, SOC Analyst
5. **Cloud Engineer** — AWS, Azure, GCP
6. **Administrateur Réseaux** — Cisco, Linux, Windows Server

### 🔑 Compétences transversales essentielles
- Communication technique
- Travail en équipe (Agile/Scrum)
- Résolution de problèmes
- Apprentissage continu
- Anglais technique

> 💡 **Conseil** : Ne vous limitez pas aux compétences techniques. Les soft skills représentent 40% de la décision de recrutement.

## Votre Plan d'Action

1. **Semaine 1-2** : Préparer votre CV et profils en ligne
2. **Semaine 3-4** : Créer votre portfolio et projets
3. **Semaine 5-6** : Postuler activement (5-10 candidatures/jour)
4. **Semaine 7-8** : Préparer les entretiens techniques`
      },
      {
        id: 'js-2',
        title: 'Plateformes de Recrutement IT',
        duration: '20 min',
        type: 'text',
        content: `# Les Plateformes de Recrutement IT

## 🌐 Plateformes Généralistes

### LinkedIn — La plateforme N°1
- Créez un profil complet (100%)
- Ajoutez un titre percutant : "Développeur Full Stack | React & Node.js | Open to Work"
- Publiez régulièrement du contenu technique
- Rejoignez des groupes IT
- Activez "Open to Work" (visible aux recruteurs uniquement)

### Indeed / Monster / Glassdoor
- Déposez votre CV
- Configurez des alertes email
- Recherchez par technologie, pas par titre

## 💻 Plateformes Spécialisées IT

| Plateforme | Spécialité | Niveau |
|-----------|-----------|--------|
| **Welcome to the Jungle** | Startups & Tech | Junior-Senior |
| **Stack Overflow Jobs** | Développeurs | Intermédiaire+ |
| **GitHub Jobs** | Open Source | Tous niveaux |
| **Talent.io** | Tech curated | 2+ ans exp |
| **Free-Work** | Freelance IT | Tous |
| **Malt** | Freelance | Tous |
| **RemoteOK** | Remote | Tous |

## 🏢 Sites d'entreprises
- Consultez directement les pages "Careers"
- Identifiez 20-30 entreprises cibles
- Suivez-les sur LinkedIn

## 📱 Réseaux sociaux
- **Twitter/X** : Suivez #DevJobs #TechJobs
- **Discord** : Communautés tech françaises
- **Reddit** : r/cscareerquestions

## ✅ Checklist Plateformes
- [ ] Profil LinkedIn complet
- [ ] CV sur 3+ plateformes
- [ ] Alertes configurées
- [ ] 20 entreprises identifiées
- [ ] Portfolio en ligne`
      },
      {
        id: 'js-3',
        title: 'Optimiser son Profil LinkedIn',
        duration: '25 min',
        type: 'text',
        content: `# Optimiser son Profil LinkedIn

## 📸 Photo et Bannière
- Photo professionnelle (fond neutre, sourire)
- Bannière personnalisée avec vos technologies
- Format recommandé : 400x400px (photo), 1584x396px (bannière)

## ✍️ Titre (Headline)
**Mauvais** : "Étudiant en informatique"
**Bon** : "Développeur Full Stack React/Node.js | Passionné DevOps | Disponible immédiatement"

### Formule gagnante :
\`[Métier] | [Technologies clés] | [Valeur ajoutée]\`

## 📝 Résumé (About)
Structure en 4 parties :
1. **Accroche** — Qui êtes-vous ?
2. **Compétences** — Que savez-vous faire ?
3. **Réalisations** — Qu'avez-vous accompli ?
4. **Call to Action** — Comment vous contacter ?

### Exemple :
> 🚀 Développeur Full Stack passionné par la création d'applications web performantes.
>
> 💻 Compétences : React, TypeScript, Node.js, PostgreSQL, Docker
>
> 🏆 Projets : Application e-commerce (10K utilisateurs), API REST microservices
>
> 📧 Contactez-moi : prenom.nom@email.com

## 🛠️ Section Compétences
- Ajoutez **50 compétences** (le maximum)
- Priorisez les compétences les plus demandées
- Demandez des recommandations (endorsements)

## 💼 Expérience & Projets
- Décrivez chaque expérience avec des **résultats chiffrés**
- Ajoutez des médias (screenshots, liens GitHub)
- Listez vos projets personnels

## 📊 Activité & Engagement
- Publiez 2-3 fois par semaine
- Commentez des posts techniques
- Partagez vos apprentissages
- Écrivez des articles techniques`
      },
      {
        id: 'js-4',
        title: 'Préparer un Entretien Technique',
        duration: '30 min',
        type: 'text',
        content: `# Préparer un Entretien Technique IT

## 🎯 Types d'entretiens

### 1. Entretien téléphonique (Screening)
- Durée : 15-30 min
- Objectif : Vérifier la motivation et les bases
- **Préparez** : Votre pitch de 2 minutes

### 2. Test technique en ligne
- Plateformes : HackerRank, Codility, LeetCode
- Durée : 1-2h
- **Préparez** : Algorithmes, structures de données

### 3. Entretien technique approfondi
- Durée : 1-2h
- Live coding ou whiteboard
- **Préparez** : Résolution de problèmes à voix haute

### 4. Entretien système (System Design)
- Durée : 45-60 min
- Conception d'architecture
- **Préparez** : Scalabilité, bases de données, API

## 📋 Questions fréquentes

### Questions techniques
- "Expliquez la différence entre REST et GraphQL"
- "Comment fonctionne le Virtual DOM en React ?"
- "Qu'est-ce que Docker et pourquoi l'utiliser ?"
- "Expliquez le modèle OSI"
- "Comment sécuriser une API ?"

### Questions comportementales (STAR Method)
- **S**ituation : Décrivez le contexte
- **T**ask : Quelle était votre mission ?
- **A**ction : Qu'avez-vous fait ?
- **R**ésultat : Quel a été le résultat ?

## 🎮 Exercice pratique
Préparez votre réponse STAR pour :
1. Un projet difficile que vous avez mené
2. Un conflit en équipe que vous avez résolu
3. Un bug critique que vous avez corrigé

## ⚠️ Erreurs à éviter
- Ne pas avoir recherché l'entreprise
- Ne pas poser de questions
- Mentir sur ses compétences
- Ne pas tester sa webcam/micro avant
- Arriver en retard (même en visio)`
      },
      {
        id: 'js-5',
        title: 'Quiz — Recherche d\'Emploi',
        duration: '10 min',
        type: 'quiz',
        content: 'Testez vos connaissances sur la recherche d\'emploi IT.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Quel pourcentage des CV est filtré par un ATS avant d\'être lu par un humain ?',
        options: ['25%', '50%', '75%', '90%'],
        correct: 2,
        explanation: 'Environ 75% des CV sont filtrés automatiquement par les systèmes ATS (Applicant Tracking System) avant d\'atteindre un recruteur humain.'
      },
      {
        id: 'q2',
        question: 'Quelle est la plateforme N°1 pour le recrutement IT ?',
        options: ['Indeed', 'LinkedIn', 'Monster', 'Glassdoor'],
        correct: 1,
        explanation: 'LinkedIn est la plateforme la plus utilisée par les recruteurs IT, avec 85% des recruteurs qui l\'utilisent activement.'
      },
      {
        id: 'q3',
        question: 'Quelle méthode est recommandée pour répondre aux questions comportementales ?',
        options: ['Méthode AIDA', 'Méthode STAR', 'Méthode SMART', 'Méthode Agile'],
        correct: 1,
        explanation: 'La méthode STAR (Situation, Task, Action, Result) est la méthode standard pour structurer ses réponses aux questions comportementales en entretien.'
      },
      {
        id: 'q4',
        question: 'Combien de candidatures par jour sont recommandées dans une recherche active ?',
        options: ['1-2', '5-10', '20-30', '50+'],
        correct: 1,
        explanation: 'Il est recommandé d\'envoyer 5-10 candidatures ciblées par jour plutôt que de postuler en masse sans personnalisation.'
      },
      {
        id: 'q5',
        question: 'Quel élément LinkedIn est le plus important pour être trouvé par les recruteurs ?',
        options: ['La photo', 'Le titre (headline)', 'Le nombre de connexions', 'Les publications'],
        correct: 1,
        explanation: 'Le titre (headline) est le premier élément que voient les recruteurs et le plus important pour le référencement LinkedIn.'
      }
    ]
  },
  {
    id: 'cv-ats',
    title: 'CV Professionnel ATS',
    description: 'Créez un CV optimisé pour les systèmes ATS et les recruteurs IT.',
    icon: '📄',
    color: 'from-emerald-500 to-teal-500',
    badge: '🏅 Expert CV ATS',
    lessons: [
      {
        id: 'cv-1',
        title: 'Comprendre les Systèmes ATS',
        duration: '15 min',
        type: 'text',
        content: `# Comprendre les Systèmes ATS

## 🤖 Qu'est-ce qu'un ATS ?

Un **ATS** (Applicant Tracking System) est un logiciel utilisé par les entreprises pour :
- Recevoir et stocker les candidatures
- Filtrer automatiquement les CV
- Classer les candidats par pertinence
- Gérer le processus de recrutement

### ATS populaires
- **Workday** — Grandes entreprises
- **Greenhouse** — Startups & Tech
- **Lever** — Scale-ups
- **Taleo** (Oracle) — Multinationales
- **SAP SuccessFactors** — Grandes entreprises
- **SmartRecruiters** — PME/Grandes entreprises

## ⚙️ Comment fonctionne un ATS ?

### 1. Parsing du CV
L'ATS extrait :
- Nom, prénom, contact
- Expériences professionnelles
- Formation
- Compétences techniques
- Mots-clés

### 2. Scoring
L'ATS attribue un **score de pertinence** basé sur :
- Correspondance des mots-clés (40%)
- Expérience requise (25%)
- Formation (15%)
- Compétences techniques (20%)

### 3. Classement
Les CV sont classés du score le plus haut au plus bas. Seuls les **top 10-20%** sont vus par le recruteur.

## ❌ Ce qui bloque un ATS

| Élément | Problème |
|---------|----------|
| Images/logos | Non lisibles |
| Tableaux complexes | Structure cassée |
| En-têtes/pieds de page | Ignorés |
| Polices fantaisie | Non reconnues |
| Fichiers .png/.jpg | Non parsable |
| Colonnes multiples | Ordre mélangé |

## ✅ Format ATS-friendly
- Format **.docx** ou **.pdf** (texte sélectionnable)
- Structure simple, linéaire
- Titres de sections standards
- Mots-clés du poste visé
- Police standard (Arial, Calibri, Helvetica)
- Pas de graphiques pour les compétences`
      },
      {
        id: 'cv-2',
        title: 'Structure d\'un CV IT Parfait',
        duration: '20 min',
        type: 'text',
        content: `# Structure d'un CV IT Parfait

## 📐 Architecture du CV

### 1. En-tête (Header)
\`\`\`
PRÉNOM NOM
Développeur Full Stack | React & Node.js
📧 email@example.com | 📱 06 XX XX XX XX
📍 Paris, France | 🔗 linkedin.com/in/prenom-nom
💻 github.com/username | 🌐 portfolio.dev
\`\`\`

### 2. Résumé Professionnel (3-4 lignes)
> Développeur Full Stack avec 2 ans d'expérience en React et Node.js. Passionné par la création d'applications web performantes et scalables. Certifié AWS Cloud Practitioner. Disponible immédiatement.

### 3. Compétences Techniques
\`\`\`
Frontend : React, TypeScript, Vue.js, HTML5, CSS3, Tailwind
Backend : Node.js, Express, Python, Django, REST API
Base de données : PostgreSQL, MongoDB, Redis
DevOps : Docker, Kubernetes, CI/CD, GitHub Actions
Cloud : AWS (EC2, S3, Lambda), GCP
Outils : Git, Jira, Figma, Postman
\`\`\`

### 4. Expérience Professionnelle
Pour chaque expérience :
- **Titre du poste** — Nom de l'entreprise
- *Dates (MM/AAAA - MM/AAAA)*
- 3-5 bullet points avec **résultats chiffrés**

**Exemple :**
> **Développeur Full Stack** — TechCorp SAS
> *09/2023 - Présent*
> - Développé une application React/Node.js utilisée par +5000 utilisateurs
> - Réduit le temps de chargement de 40% via l'optimisation du code
> - Mis en place un pipeline CI/CD avec GitHub Actions (déploiement en 5 min)
> - Collaboré avec une équipe de 8 développeurs en méthodologie Agile/Scrum

### 5. Formation
- **Diplôme** — Établissement — Année
- Certifications pertinentes

### 6. Projets Personnels
- Nom du projet + lien GitHub
- Technologies utilisées
- Résultats/impact

### 7. Langues
- Français : Natif
- Anglais : B2/C1 (professionnel)

## 📏 Règles d'or
1. **1 page** pour < 5 ans d'expérience
2. **2 pages max** pour 5+ ans
3. Personnaliser pour chaque offre
4. Utiliser les mots-clés de l'offre
5. Résultats chiffrés (%, €, utilisateurs)`
      },
      {
        id: 'cv-3',
        title: 'Mots-clés et Optimisation ATS',
        duration: '20 min',
        type: 'text',
        content: `# Mots-clés et Optimisation ATS

## 🔑 L'importance des mots-clés

Les ATS fonctionnent par **correspondance de mots-clés**. Si votre CV ne contient pas les bons termes, il sera filtré.

## 📋 Comment identifier les mots-clés

### Étape 1 : Analyser l'offre d'emploi
Repérez dans l'offre :
- Technologies mentionnées
- Compétences requises
- Termes récurrents
- Niveau d'expérience

### Étape 2 : Catégoriser les mots-clés

| Catégorie | Exemples |
|-----------|----------|
| **Hard skills** | React, Python, SQL, Docker |
| **Soft skills** | Leadership, Communication, Agile |
| **Certifications** | AWS, CCNA, PMP, Scrum Master |
| **Outils** | Jira, Git, Figma, Jenkins |
| **Méthodologies** | Agile, Scrum, DevOps, CI/CD |

### Étape 3 : Intégrer naturellement
- Dans le résumé professionnel
- Dans les descriptions d'expérience
- Dans la section compétences
- Dans les projets

## 🎯 Mots-clés par métier IT

### Développeur Web
\`React, Vue.js, Angular, TypeScript, JavaScript, HTML5, CSS3, Node.js, REST API, GraphQL, Git, Webpack, Jest, Tailwind CSS\`

### Administrateur Réseaux
\`Cisco, TCP/IP, DNS, DHCP, VPN, Firewall, VLAN, Active Directory, Windows Server, Linux, Monitoring, Nagios, Zabbix\`

### Cybersécurité
\`Pentesting, SIEM, SOC, Firewall, IDS/IPS, Nmap, Wireshark, Metasploit, ISO 27001, RGPD, Analyse de risques\`

### DevOps
\`Docker, Kubernetes, Jenkins, Terraform, Ansible, CI/CD, AWS, Azure, GitLab CI, Monitoring, Prometheus, Grafana\`

## ⚡ Astuces Pro
1. **Utilisez les deux formats** : "JavaScript" ET "JS"
2. **Évitez les abréviations seules** : écrivez "Search Engine Optimization (SEO)"
3. **Répétez 2-3 fois** les mots-clés importants naturellement
4. **Utilisez les exact terms** de l'offre d'emploi`
      },
      {
        id: 'cv-4',
        title: 'Exercice — Créez votre CV',
        duration: '45 min',
        type: 'exercise',
        content: `# Exercice Pratique — Créez votre CV ATS

## 🎯 Objectif
Créer un CV professionnel optimisé ATS en utilisant le générateur intégré.

## 📝 Instructions

### Étape 1 : Collectez vos informations
Préparez :
- Coordonnées complètes
- Résumé professionnel (3-4 lignes)
- Compétences techniques (min. 15)
- Expériences professionnelles (avec résultats chiffrés)
- Formation
- Projets personnels
- Certifications

### Étape 2 : Choisissez votre métier cible
Sélectionnez parmi :
- Développeur Web
- Administrateur Réseaux
- Cybersécurité
- DevOps
- Data Analyst
- Support IT

### Étape 3 : Utilisez le générateur de CV
1. Allez dans l'onglet "CV Builder"
2. Remplissez chaque section
3. Vérifiez l'aperçu en temps réel
4. Lancez l'analyse ATS

### Étape 4 : Optimisez
- Visez un score ATS > 75%
- Corrigez les erreurs détectées
- Ajoutez les mots-clés manquants

### Étape 5 : Exportez
- Exportez en PDF
- Vérifiez que le texte est sélectionnable
- Testez sur un lecteur ATS en ligne

## ✅ Critères de réussite
- [ ] Score ATS > 75%
- [ ] Pas d'erreurs de structure
- [ ] Mots-clés du métier présents
- [ ] Résultats chiffrés dans les expériences
- [ ] Format 1 page
- [ ] Informations de contact complètes`
      },
      {
        id: 'cv-5',
        title: 'Quiz — CV ATS',
        duration: '10 min',
        type: 'quiz',
        content: 'Testez vos connaissances sur les CV ATS.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Quel format de fichier est le plus compatible avec les ATS ?',
        options: ['.png', '.pdf (texte sélectionnable)', '.jpg', '.psd'],
        correct: 1,
        explanation: 'Le format PDF avec texte sélectionnable (non scanné) est le plus compatible avec les systèmes ATS modernes.'
      },
      {
        id: 'q2',
        question: 'Quel élément bloque la lecture ATS ?',
        options: ['Texte en gras', 'Bullet points', 'Images et graphiques', 'Liens hypertexte'],
        correct: 2,
        explanation: 'Les images, graphiques et éléments visuels ne sont pas lisibles par les ATS et bloquent l\'extraction d\'informations.'
      },
      {
        id: 'q3',
        question: 'Quelle est la longueur idéale d\'un CV pour un junior IT ?',
        options: ['Demi-page', '1 page', '3 pages', '5 pages'],
        correct: 1,
        explanation: 'Pour moins de 5 ans d\'expérience, un CV d\'une page est la norme. Cela force à être concis et pertinent.'
      },
      {
        id: 'q4',
        question: 'Quel pourcentage du score ATS dépend des mots-clés ?',
        options: ['10%', '20%', '40%', '80%'],
        correct: 2,
        explanation: 'La correspondance des mots-clés représente environ 40% du score ATS, ce qui en fait le facteur le plus important.'
      },
      {
        id: 'q5',
        question: 'Combien de compétences techniques minimum recommande-t-on sur un CV IT ?',
        options: ['3-5', '10-15', '30+', '50+'],
        correct: 1,
        explanation: 'Il est recommandé d\'inclure 10-15 compétences techniques pertinentes, organisées par catégorie.'
      }
    ]
  },
  {
    id: 'cover-letter',
    title: 'Lettre de Motivation',
    description: 'Rédigez des lettres de motivation percutantes adaptées aux métiers IT.',
    icon: '✉️',
    color: 'from-purple-500 to-pink-500',
    badge: '🏅 Expert Rédaction',
    lessons: [
      {
        id: 'cl-1',
        title: 'Structure d\'une Lettre de Motivation IT',
        duration: '15 min',
        type: 'text',
        content: `# Structure d'une Lettre de Motivation IT

## 📐 Les 4 Paragraphes Essentiels

### Paragraphe 1 — L'Accroche (3-4 lignes)
**Objectif** : Capter l'attention immédiatement

**Mauvais** : "Suite à votre annonce parue sur..."
**Bon** : "Développeur React avec 2 ans d'expérience en création d'applications SaaS, je suis enthousiaste à l'idée de rejoindre [Entreprise] pour contribuer à votre plateforme utilisée par 100K+ utilisateurs."

### Paragraphe 2 — Vos Compétences (5-6 lignes)
**Objectif** : Montrer que vous avez les compétences requises

Structure :
- Référencez 2-3 compétences clés de l'offre
- Donnez des exemples concrets
- Chiffrez vos résultats

### Paragraphe 3 — Pourquoi cette entreprise (4-5 lignes)
**Objectif** : Montrer que vous connaissez l'entreprise

- Mentionnez un projet/produit spécifique
- Expliquez pourquoi leur mission vous motive
- Montrez l'alignement avec vos valeurs

### Paragraphe 4 — Conclusion et Call to Action (2-3 lignes)
**Objectif** : Proposer un entretien

"Je serais ravi d'échanger avec vous lors d'un entretien pour discuter de ma contribution potentielle à votre équipe. Je reste disponible à votre convenance."

## 📏 Règles d'or
1. **Maximum 1 page** (250-350 mots)
2. **Personnaliser** pour chaque entreprise
3. **Pas de fautes** d'orthographe
4. **Ton professionnel** mais enthousiaste
5. **Reprendre les mots-clés** de l'offre`
      },
      {
        id: 'cl-2',
        title: 'Exemples de Lettres par Métier',
        duration: '20 min',
        type: 'text',
        content: `# Exemples de Lettres de Motivation IT

## 💻 Développeur Full Stack

---

Madame, Monsieur,

Passionné par le développement web depuis 3 ans, je me permets de vous adresser ma candidature pour le poste de Développeur Full Stack au sein de [Entreprise]. Votre engagement pour l'innovation technologique et votre stack technique moderne (React, Node.js, PostgreSQL) correspondent parfaitement à mon parcours et mes ambitions.

Au cours de mes expériences, j'ai développé une application e-commerce en React/Node.js générant +500 transactions quotidiennes, mis en place une architecture microservices réduisant le temps de réponse API de 60%, et contribué à un projet open source comptant +2000 stars sur GitHub. Ma maîtrise de TypeScript, Docker et les pipelines CI/CD me permettrait d'être rapidement opérationnel au sein de votre équipe.

[Entreprise] m'attire particulièrement par votre produit [X] qui révolutionne [domaine]. Votre culture d'entreprise axée sur l'apprentissage continu et la qualité du code résonne avec mes valeurs professionnelles.

Je serais ravi d'échanger avec vous lors d'un entretien pour discuter de ma contribution à vos projets. Je reste disponible à votre convenance.

Cordialement,
[Prénom Nom]

---

## 🔒 Administrateur Réseaux & Sécurité

---

Madame, Monsieur,

Titulaire d'un BTS Réseaux & Télécommunications et certifié CCNA, je souhaite rejoindre [Entreprise] en tant qu'Administrateur Réseaux pour mettre à profit mon expertise en infrastructure et sécurité réseau.

Fort d'une expérience de 2 ans en administration d'infrastructures réseau (Cisco, Linux, Windows Server), j'ai géré un parc de 500 postes, implémenté une solution VPN sécurisant les connexions de 200 collaborateurs distants, et réduit les incidents réseau de 35% grâce à la mise en place d'un monitoring Nagios/Zabbix proactif.

Votre entreprise, reconnue pour son expertise en solutions cloud et son infrastructure haute disponibilité, représente pour moi l'environnement idéal pour développer mes compétences et apporter une valeur ajoutée immédiate.

Disponible immédiatement, je serais honoré de vous rencontrer pour discuter de ma candidature.

Cordialement,
[Prénom Nom]`
      },
      {
        id: 'cl-3',
        title: 'Exercice — Rédigez votre lettre',
        duration: '30 min',
        type: 'exercise',
        content: `# Exercice — Rédigez votre Lettre de Motivation

## 🎯 Objectif
Rédiger une lettre de motivation personnalisée pour un poste IT.

## 📝 Instructions

### Étape 1 : Choisissez une offre d'emploi
Trouvez une offre réelle sur LinkedIn ou Indeed pour un poste qui vous intéresse.

### Étape 2 : Analysez l'offre
Identifiez :
- Les compétences requises
- Les technologies mentionnées
- La culture d'entreprise
- Les mots-clés importants

### Étape 3 : Utilisez le générateur
1. Allez dans l'onglet "Lettre de Motivation"
2. Sélectionnez votre métier
3. Remplissez les informations
4. Personnalisez le contenu généré

### Étape 4 : Vérifiez
- [ ] Maximum 1 page
- [ ] Personnalisée pour l'entreprise
- [ ] Compétences de l'offre mentionnées
- [ ] Résultats chiffrés
- [ ] Pas de fautes d'orthographe
- [ ] Ton professionnel et enthousiaste
- [ ] Call to action en conclusion`
      },
      {
        id: 'cl-4',
        title: 'Quiz — Lettre de Motivation',
        duration: '10 min',
        type: 'quiz',
        content: 'Testez vos connaissances sur les lettres de motivation IT.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Combien de paragraphes doit contenir une lettre de motivation idéale ?',
        options: ['2', '4', '6', '8'],
        correct: 1,
        explanation: 'Une lettre de motivation efficace contient 4 paragraphes : accroche, compétences, motivation entreprise, conclusion.'
      },
      {
        id: 'q2',
        question: 'Quelle est la longueur idéale d\'une lettre de motivation ?',
        options: ['100 mots', '250-350 mots', '500-700 mots', '1000+ mots'],
        correct: 1,
        explanation: 'Une lettre de motivation doit faire 250-350 mots maximum, soit environ 1 page.'
      },
      {
        id: 'q3',
        question: 'Quelle accroche est la plus efficace ?',
        options: [
          '"Suite à votre annonce..."',
          '"Je me permets de postuler..."',
          '"Développeur React avec 2 ans d\'expérience, je suis enthousiaste..."',
          '"Bonjour, je cherche un emploi..."'
        ],
        correct: 2,
        explanation: 'Une accroche qui mentionne directement votre expertise et votre enthousiasme est la plus percutante.'
      }
    ]
  },
  {
    id: 'portfolio',
    title: 'Portfolio Développeur',
    description: 'Construisez un portfolio moderne et professionnel pour présenter vos projets.',
    icon: '🌐',
    color: 'from-orange-500 to-red-500',
    badge: '🏅 Expert Portfolio',
    lessons: [
      {
        id: 'pf-1',
        title: 'Pourquoi un Portfolio est Essentiel',
        duration: '10 min',
        type: 'text',
        content: `# Pourquoi un Portfolio est Essentiel

## 🎯 L'impact d'un portfolio

### Statistiques
- **68%** des recruteurs IT consultent le portfolio avant l'entretien
- Un portfolio augmente vos chances de **+40%**
- Les candidats avec portfolio reçoivent **2x plus** de réponses

## 💼 Ce qu'un portfolio démontre

1. **Compétences techniques réelles** — Pas juste des mots sur un CV
2. **Capacité à livrer** — Des projets terminés et fonctionnels
3. **Qualité du code** — Bonnes pratiques, architecture
4. **Créativité** — Design, UX, résolution de problèmes
5. **Passion** — Projets personnels, contributions open source

## 🏗️ Structure d'un Portfolio Professionnel

### Pages essentielles
1. **Accueil (Hero)** — Première impression, nom, titre, CTA
2. **À propos** — Bio, parcours, compétences
3. **Projets** — 4-6 projets détaillés
4. **Compétences** — Technologies maîtrisées
5. **Contact** — Formulaire, email, liens sociaux

### Pour chaque projet
- Screenshot/démo
- Description du problème résolu
- Technologies utilisées
- Votre rôle et contributions
- Lien vers le code (GitHub)
- Lien vers la démo live
- Résultats/impact

## 🎨 Design Tips
- Design épuré et moderne
- Maximum 3 couleurs
- Typographie lisible
- Animations subtiles
- Mobile-first
- Temps de chargement < 3 secondes
- Accessibilité (WCAG 2.1)`
      },
      {
        id: 'pf-2',
        title: 'Créer un Portfolio avec HTML/CSS/JS',
        duration: '45 min',
        type: 'text',
        content: `# Créer un Portfolio — Guide Complet

## 📁 Structure des dossiers

\`\`\`
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── profile.jpg
│   ├── project1.jpg
│   └── project2.jpg
└── README.md
\`\`\`

## 🏠 Section Hero (Accueil)

\`\`\`html
<section id="hero" class="hero">
  <div class="hero-content">
    <span class="greeting">Bonjour, je suis</span>
    <h1 class="name">Prénom Nom</h1>
    <h2 class="title">Développeur Full Stack</h2>
    <p class="tagline">
      Je crée des applications web modernes et performantes
    </p>
    <div class="hero-buttons">
      <a href="#projects" class="btn btn-primary">
        Voir mes projets
      </a>
      <a href="#contact" class="btn btn-secondary">
        Me contacter
      </a>
    </div>
  </div>
</section>
\`\`\`

## 🎨 CSS Moderne

\`\`\`css
:root {
  --primary: #3b82f6;
  --secondary: #8b5cf6;
  --bg: #0f172a;
  --text: #e2e8f0;
  --card-bg: #1e293b;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bg), #1a1a2e);
  padding: 2rem;
}

.name {
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0.5rem 0;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}
\`\`\`

## 📱 Responsive Design

\`\`\`css
@media (max-width: 768px) {
  .name { font-size: 2rem; }
  .hero-buttons { flex-direction: column; }
  .projects-grid { grid-template-columns: 1fr; }
}
\`\`\`

## 🚀 Déploiement GitHub Pages

### Étape 1 : Créer un repository
\`\`\`bash
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/username/portfolio.git
git push -u origin main
\`\`\`

### Étape 2 : Activer GitHub Pages
1. Settings → Pages
2. Source : Deploy from branch
3. Branch : main, / (root)
4. Save

### Étape 3 : Votre portfolio est en ligne !
URL : \`https://username.github.io/portfolio\`

## 🌐 Nom de domaine gratuit
- **Freenom** : .tk, .ml, .ga (gratuit)
- **GitHub** : username.github.io (gratuit)
- **Netlify** : site-name.netlify.app (gratuit)
- **Vercel** : site-name.vercel.app (gratuit)`
      },
      {
        id: 'pf-3',
        title: 'Exemples de Portfolios par Métier',
        duration: '20 min',
        type: 'text',
        content: `# Exemples de Portfolios par Métier

## 💻 Portfolio Développeur Web

### Sections recommandées
1. Hero avec animation typing
2. Stack technique avec icônes
3. 4-6 projets web (e-commerce, dashboard, API)
4. Section open source / GitHub stats
5. Blog technique (optionnel)
6. Contact

### Projets à inclure
- **Application CRUD** — Démontre les bases
- **Clone d'une app populaire** — Montre vos capacités
- **Projet personnel original** — Montre votre créativité
- **Contribution open source** — Montre votre collaboration

---

## 🔌 Portfolio Administrateur Réseaux

### Sections recommandées
1. Hero avec certifications (CCNA, etc.)
2. Compétences réseau (schéma visuel)
3. Projets infrastructure
4. Certifications et formations
5. Lab virtuel / homelab
6. Contact

### Projets à inclure
- **Architecture réseau** — Schéma d'un réseau d'entreprise
- **Projet sécurité** — Firewall, VPN, monitoring
- **Automatisation** — Scripts Python/Bash
- **Documentation technique** — Procédures, guides

---

## 🔒 Portfolio Cybersécurité

### Sections recommandées
1. Hero avec focus sécurité
2. Certifications (CEH, CompTIA Security+)
3. Write-ups CTF
4. Projets sécurité
5. Veille technologique
6. Contact

### Projets à inclure
- **Rapport de pentest** (environnement de lab)
- **Outil de sécurité** développé
- **Write-ups** de challenges CTF
- **Analyse de malware** (en lab)

---

## 🆓 Portfolio Freelance

### Sections recommandées
1. Hero avec proposition de valeur
2. Services proposés avec tarifs
3. Projets clients (avec permission)
4. Témoignages clients
5. Processus de travail
6. FAQ
7. Contact / Devis gratuit`
      },
      {
        id: 'pf-4',
        title: 'Quiz — Portfolio',
        duration: '10 min',
        type: 'quiz',
        content: 'Testez vos connaissances sur la création de portfolio.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Combien de projets minimum recommande-t-on dans un portfolio ?',
        options: ['1-2', '4-6', '10-15', '20+'],
        correct: 1,
        explanation: 'Il est recommandé d\'inclure 4-6 projets de qualité plutôt que beaucoup de projets médiocres.'
      },
      {
        id: 'q2',
        question: 'Quel est le temps de chargement maximum recommandé pour un portfolio ?',
        options: ['1 seconde', '3 secondes', '10 secondes', '30 secondes'],
        correct: 1,
        explanation: 'Un portfolio doit charger en moins de 3 secondes pour ne pas perdre de visiteurs.'
      },
      {
        id: 'q3',
        question: 'Quelle plateforme gratuite permet d\'héberger un portfolio statique ?',
        options: ['AWS EC2', 'GitHub Pages', 'Heroku Pro', 'DigitalOcean'],
        correct: 1,
        explanation: 'GitHub Pages est gratuit et parfait pour héberger un portfolio statique avec un nom de domaine personnalisé.'
      }
    ]
  }
];

export const atsKeywords: Record<string, string[]> = {
  'dev-web': ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js', 'Express', 'REST API', 'GraphQL', 'Git', 'GitHub', 'Webpack', 'Vite', 'Jest', 'Testing', 'Tailwind', 'Bootstrap', 'Sass', 'Responsive', 'Agile', 'Scrum', 'CI/CD', 'Docker', 'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL'],
  'reseaux': ['Cisco', 'TCP/IP', 'DNS', 'DHCP', 'VPN', 'Firewall', 'VLAN', 'Active Directory', 'Windows Server', 'Linux', 'Nagios', 'Zabbix', 'SNMP', 'Routing', 'Switching', 'OSI', 'LAN', 'WAN', 'WiFi', 'Proxy', 'Load Balancer', 'Monitoring', 'Troubleshooting', 'CCNA', 'ITIL'],
  'cybersecurite': ['Pentesting', 'SIEM', 'SOC', 'Firewall', 'IDS', 'IPS', 'Nmap', 'Wireshark', 'Metasploit', 'Burp Suite', 'ISO 27001', 'RGPD', 'Kali Linux', 'OWASP', 'Vulnerability', 'Malware', 'Forensics', 'Encryption', 'PKI', 'Risk Assessment', 'Compliance', 'CEH', 'CompTIA Security+'],
  'devops': ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Ansible', 'CI/CD', 'AWS', 'Azure', 'GCP', 'GitLab CI', 'GitHub Actions', 'Prometheus', 'Grafana', 'ELK', 'Linux', 'Bash', 'Python', 'Infrastructure as Code', 'Microservices', 'Monitoring', 'Logging', 'Helm', 'ArgoCD'],
  'data': ['Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'Jupyter', 'Tableau', 'Power BI', 'ETL', 'Data Warehouse', 'Big Data', 'Spark', 'Hadoop', 'Machine Learning', 'Deep Learning', 'NLP', 'Statistics', 'R', 'Data Visualization', 'A/B Testing'],
  'cloud': ['AWS', 'Azure', 'GCP', 'EC2', 'S3', 'Lambda', 'CloudFormation', 'IAM', 'VPC', 'RDS', 'DynamoDB', 'ECS', 'EKS', 'Serverless', 'Auto Scaling', 'Load Balancing', 'Cloud Security', 'Cost Optimization', 'Multi-Cloud', 'SaaS', 'PaaS', 'IaaS', 'DevOps'],
  'support-it': ['Windows', 'macOS', 'Linux', 'Active Directory', 'Office 365', 'Troubleshooting', 'Help Desk', 'ITIL', 'ServiceNow', 'Jira', 'Remote Support', 'Networking', 'Hardware', 'Software', 'Ticketing', 'SLA', 'Documentation', 'Customer Service', 'VPN', 'Printing', 'Backup']
};
