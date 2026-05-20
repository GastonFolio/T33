// Extended Modules: Mindset, Network Marketing, Environmental Tech

export interface ExtendedLesson {
  id: string;
  title: string;
  content: string;
  duration: string;
  type: 'text' | 'exercise' | 'challenge' | 'project';
}

export interface ExtendedModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  category: 'mindset' | 'networking' | 'environment';
  lessons: ExtendedLesson[];
}

export const extendedModules: ExtendedModule[] = [
  {
    id: 'mindset',
    title: 'Mindset & Développement Personnel',
    description: 'Développez les soft skills et l\'état d\'esprit nécessaires pour réussir dans votre carrière IT.',
    icon: '🧠',
    color: 'from-violet-500 to-purple-600',
    category: 'mindset',
    lessons: [
      {
        id: 'ms-1',
        title: 'Le Growth Mindset',
        duration: '15 min',
        type: 'text',
        content: `# Le Growth Mindset — La Clé du Succès

## 🎯 Fixed vs Growth Mindset

La psychologue Carol Dweck a identifié deux états d'esprit fondamentaux :

### Fixed Mindset (État d'esprit fixe)
- "Je suis nul en maths"
- "Je ne suis pas fait pour coder"
- "Les autres sont plus intelligents"
- **Évite les défis** par peur de l'échec
- **Abandonne facilement** face aux obstacles

### Growth Mindset (État d'esprit de croissance)
- "Je peux apprendre les maths"
- "Le code s'apprend avec de la pratique"
- "Je peux développer mes compétences"
- **Embrasse les défis** comme opportunités
- **Persévère** malgré les obstacles

## 🔑 Comment développer le Growth Mindset

### 1. Changez votre langage interne
| ❌ Fixed Mindset | ✅ Growth Mindset |
|-----------------|-------------------|
| "Je ne sais pas coder" | "Je ne sais pas **encore** coder" |
| "C'est trop dur" | "Ça demande plus de pratique" |
| "J'ai échoué" | "J'ai appris ce qui ne fonctionne pas" |

### 2. Embrassez les erreurs
> "J'ai échoué 1000 fois avant de réussir l'ampoule. Je n'ai pas échoué. J'ai découvert 1000 façons qui ne fonctionnent pas." — Thomas Edison

En programmation, les bugs sont vos meilleurs professeurs.

### 3. Célébrez le processus, pas le résultat
- Félicitez-vous pour l'effort, pas le talent
- Valorisez l'apprentissage, pas la performance
- Appréciez la progression, pas la perfection

### 4. Apprenez des critiques
- Le feedback négatif = opportunité d'amélioration
- Les code reviews = apprentissage gratuit
- Les rejets en entretien = données pour s'améliorer

## 💪 Exercice Pratique
Cette semaine, remplacez chaque "Je ne peux pas" par "Je ne peux pas **encore**".`
      },
      {
        id: 'ms-2',
        title: 'Discipline & Habitudes',
        duration: '20 min',
        type: 'text',
        content: `# Discipline & Habitudes — Le Système qui Remplace la Motivation

## 🎯 Pourquoi la Motivation ne Suffit Pas

La motivation est **temporaire**. Elle fluctue selon :
- Votre humeur
- Votre niveau d'énergie
- Les circonstances externes

La **discipline** et les **habitudes** sont permanentes.

> "Nous sommes ce que nous faisons de manière répétée. L'excellence n'est donc pas un acte, mais une habitude." — Aristote

## 🔄 La Science des Habitudes

### Le Loop de l'Habitude (Charles Duhigg)
1. **Signal** → Ce qui déclenche l'action
2. **Routine** → L'action elle-même
3. **Récompense** → Ce qui renforce l'habitude

### Exemple : Coder tous les jours
- **Signal** : Après le café du matin
- **Routine** : Coder pendant 30 minutes
- **Récompense** : Sentiment d'accomplissement + tracker

## 📅 Construire des Habitudes de Développeur

### Les Habitudes Quotidiennes Essentielles

| Habitude | Durée | Impact |
|----------|-------|--------|
| Coder | 30 min - 2h | Compétence technique |
| Lire (tech) | 15-30 min | Veille technologique |
| LeetCode/Algo | 15-30 min | Préparation entretiens |
| Push GitHub | 5 min | Consistance visible |
| Journal/Review | 10 min | Réflexion & progression |

### La Règle des 2 Minutes (James Clear)
> "Si ça prend moins de 2 minutes, faites-le maintenant."

Pour démarrer une nouvelle habitude, réduisez-la à 2 minutes :
- "Coder 1 heure" → "Ouvrir VS Code"
- "Faire du sport" → "Mettre ses chaussures"
- "Lire un livre" → "Lire une page"

## 🎯 Le Système de Tracking

### Méthode "Don't Break the Chain" (Seinfeld)
- Marquez chaque jour où vous pratiquez
- Ne brisez jamais la chaîne
- La streak devient motivante

### Template de Journal Quotidien
\`\`\`
📅 Date: __/__/____
✅ Habitudes réalisées:
- [ ] Coder 30 min
- [ ] LeetCode 1 problème
- [ ] Lire 15 min
- [ ] Push GitHub

🎯 Top 3 du jour:
1. ________________
2. ________________
3. ________________

📝 Apprentissages:
________________

🔄 Amélioration demain:
________________
\`\`\``
      },
      {
        id: 'ms-3',
        title: 'Gestion du Temps & Productivité',
        duration: '20 min',
        type: 'text',
        content: `# Gestion du Temps & Productivité

## ⏰ Les Principes Fondamentaux

### Loi de Pareto (80/20)
> 20% de vos efforts produisent 80% des résultats.

**Application IT** :
- 20% des fonctionnalités satisfont 80% des utilisateurs
- 20% de vos connaissances résolvent 80% des problèmes
- 20% de votre temps produit 80% de votre valeur

### Loi de Parkinson
> "Le travail s'étend pour remplir le temps disponible."

**Solution** : Fixez des deadlines serrées mais réalistes.

### Loi de Carlson
> "Un travail interrompu prend plus de temps qu'un travail continu."

**Solution** : Bloquez des périodes de travail profond.

## 🍅 La Méthode Pomodoro

1. Choisissez une tâche
2. Réglez un timer sur **25 minutes**
3. Travaillez sans interruption
4. Prenez une pause de **5 minutes**
5. Tous les 4 pomodoros, pause de **15-30 minutes**

### Outils Pomodoro
- Forest (app mobile)
- Tomato Timer (web)
- Focus Keeper
- Pomofocus.io

## 📋 Time Blocking

Planifiez votre journée par blocs :

\`\`\`
06:00 - 07:00 | 🏃 Sport / Routine matinale
07:00 - 08:00 | 📚 Apprentissage (cours, lecture)
08:00 - 12:00 | 💻 Deep Work (code, projets)
12:00 - 13:00 | 🍽️ Déjeuner & Repos
13:00 - 14:00 | 📧 Communication (emails, calls)
14:00 - 18:00 | 💻 Deep Work (code, projets)
18:00 - 19:00 | 🔍 Review & Planification demain
19:00 - 22:00 | 👨‍👩‍👧‍👦 Vie personnelle
\`\`\`

## 🎯 Matrice d'Eisenhower

| | Urgent | Non Urgent |
|---|--------|------------|
| **Important** | ✅ FAIRE maintenant | 📅 PLANIFIER |
| **Non Important** | 🔄 DÉLÉGUER | ❌ ÉLIMINER |

### Application pour Développeurs
- **Urgent + Important** : Bug en production
- **Non Urgent + Important** : Apprendre une nouvelle techno
- **Urgent + Non Important** : La plupart des emails
- **Non Urgent + Non Important** : Scroll réseaux sociaux

## 🚫 Éliminer les Distractions

### Distractions Communes
- Notifications téléphone
- Réseaux sociaux
- Emails constants
- Open space bruyant
- Multitasking

### Solutions
- Mode avion pendant le deep work
- Bloquer les sites (Freedom, Cold Turkey)
- Casque antibruit
- Communication asynchrone
- Single-tasking`
      },
      {
        id: 'ms-4',
        title: 'Communication & Leadership',
        duration: '20 min',
        type: 'text',
        content: `# Communication & Leadership en IT

## 💬 Communication Technique

### Les 4 Règles d'Or

**1. Simplicité**
- Expliquez comme à un enfant de 10 ans
- Évitez le jargon technique inutile
- Utilisez des analogies

**2. Structure**
- Introduction → Contexte → Détails → Conclusion
- Utilisez des bullet points
- Une idée par paragraphe

**3. Écoute Active**
- Posez des questions de clarification
- Reformulez pour confirmer
- Ne coupez pas la parole

**4. Feedback Constructif**
- Commencez par le positif
- Soyez spécifique sur les améliorations
- Proposez des solutions

## 📝 Communication Écrite

### Emails Professionnels
\`\`\`
Sujet: [ACTION REQUISE] Review PR #123 - Feature X

Bonjour [Nom],

Je sollicite votre review sur la PR #123 qui implémente [Feature X].

Points clés:
• Ajout de [fonctionnalité A]
• Refactoring de [composant B]
• Tests unitaires inclus

Merci de votre retour d'ici [date].

Cordialement,
[Prénom]
\`\`\`

### Messages Slack/Teams
- Court et direct
- Une demande par message
- Utilisez les threads
- @mention uniquement si nécessaire

## 🎤 Présentations Techniques

### Structure STAR pour expliquer un projet
- **S**ituation : Le contexte
- **T**ask : Votre mission
- **A**ction : Ce que vous avez fait
- **R**ésultat : L'impact mesurable

### Conseils Présentation
- 10 slides max
- 1 idée par slide
- Visuels > Texte
- Préparez des démos live
- Anticipez les questions

## 👥 Leadership Technique

### Les 5 Niveaux de Leadership (John Maxwell)

1. **Position** : Les gens suivent parce qu'ils doivent
2. **Permission** : Les gens suivent parce qu'ils le veulent
3. **Production** : Les gens suivent pour les résultats
4. **Développement** : Les gens suivent pour ce que vous leur apprenez
5. **Personnage** : Les gens suivent pour qui vous êtes

### Compétences Leadership IT
- Mentorat des juniors
- Code reviews constructives
- Documentation claire
- Prise de décision technique
- Gestion de conflits`
      },
      {
        id: 'ms-5',
        title: 'Challenge — Journal de Progression',
        duration: '7 jours',
        type: 'challenge',
        content: `# Challenge 7 Jours — Journal de Progression

## 🎯 Objectif
Développer l'habitude du journaling et de la réflexion quotidienne pour accélérer votre progression.

## 📝 Instructions

### Chaque Matin (5 min)
\`\`\`
📅 Date: __/__/____

🎯 Mes 3 priorités du jour:
1. _______________________
2. _______________________
3. _______________________

💭 Affirmation positive:
"Je suis capable de ____________"

🔋 Mon niveau d'énergie (1-10): ___
\`\`\`

### Chaque Soir (10 min)
\`\`\`
✅ Tâches accomplies:
- [ ] Priorité 1
- [ ] Priorité 2
- [ ] Priorité 3

📊 Score du jour (1-10): ___

🎉 3 victoires du jour:
1. _______________________
2. _______________________
3. _______________________

📚 Ce que j'ai appris:
_______________________

😤 Ce qui m'a frustré:
_______________________

🔄 Ce que je ferai différemment demain:
_______________________

🙏 Gratitude (3 choses):
1. _______________________
2. _______________________
3. _______________________
\`\`\`

## ✅ Critères de Réussite
- [ ] 7 jours consécutifs de journaling
- [ ] Amélioration visible de la clarté mentale
- [ ] Identification de patterns (positifs et négatifs)
- [ ] Au moins 3 apprentissages clés documentés

## 🏆 Récompense
Après 7 jours, offrez-vous quelque chose que vous aimez pour célébrer cette nouvelle habitude !`
      },
    ],
  },
  {
    id: 'networking-marketing',
    title: 'Networking & Développement Relationnel',
    description: 'Maîtrisez l\'art du networking professionnel et développez votre réseau pour accélérer votre carrière.',
    icon: '🤝',
    color: 'from-blue-500 to-cyan-500',
    category: 'networking',
    lessons: [
      {
        id: 'nm-1',
        title: 'L\'Importance du Networking',
        duration: '15 min',
        type: 'text',
        content: `# L'Importance du Networking Professionnel

## 🌐 Pourquoi le Networking est Essentiel

### Statistiques Clés
- **85%** des emplois sont pourvus via le réseau
- **70%** des opportunités ne sont jamais publiées
- Les recommandations = **5x plus de chances** d'être embauché

> "Votre réseau est votre valeur nette." — Porter Gale

## 🎯 Les Bénéfices du Networking

### 1. Opportunités Cachées
- Offres d'emploi non publiées
- Projets freelance
- Partenariats business
- Investissements

### 2. Apprentissage Accéléré
- Mentorship informel
- Partage d'expériences
- Conseils d'experts
- Erreurs à éviter

### 3. Visibilité Professionnelle
- Personal branding
- Reconnaissance d'expertise
- Invitations à intervenir
- Opportunités de leadership

### 4. Support & Motivation
- Communauté de pairs
- Accountability partners
- Encouragements
- Collaboration

## 🔑 Les Principes du Networking Efficace

### 1. Donner Avant de Recevoir
> "Be a giver, not a taker."

- Partagez des ressources
- Faites des introductions
- Offrez votre aide gratuitement
- Créez de la valeur pour les autres

### 2. Authenticité
- Soyez vous-même
- Intérêt sincère pour les autres
- Relations long terme vs transactions
- Évitez le networking "forcé"

### 3. Consistance
- Networking régulier (pas juste quand vous cherchez)
- Entretien des relations existantes
- Suivi après les rencontres
- Présence continue

### 4. Valeur Ajoutée
- Expertise à partager
- Connexions à faire
- Contenu utile
- Solutions aux problèmes

## 💼 Applications en IT

### Pour les Développeurs
- Communautés open source
- Meetups tech locaux
- Conférences (DevFest, DotJS...)
- Discord/Slack communities
- Twitter Tech

### Pour les Étudiants
- Groupes LinkedIn
- Forums comme Reddit
- Hackathons
- Événements école
- Stages & alternances`
      },
      {
        id: 'nm-2',
        title: 'Construire son Réseau LinkedIn',
        duration: '20 min',
        type: 'text',
        content: `# Construire son Réseau LinkedIn

## 📊 LinkedIn : La Plateforme N°1 du Networking Pro

### Statistiques LinkedIn
- **900+ millions** d'utilisateurs
- **65 millions** de décideurs
- **87%** des recruteurs utilisent LinkedIn
- **8 personnes** embauchées chaque minute via LinkedIn

## 🛠️ Optimiser son Profil

### Photo Professionnelle
- Fond neutre ou bureau
- Sourire naturel
- Cadrage poitrine/visage
- Bonne qualité d'image
- Vêtements professionnels

### Titre (Headline) Percutant
❌ "Étudiant en informatique"
✅ "Développeur Full Stack React/Node.js | Open to Work"

**Formule** : [Métier] + [Technologies] + [Valeur ajoutée/Disponibilité]

### Résumé (About) Impactant
\`\`\`
🚀 [Accroche - Qui êtes-vous ?]

💻 [Compétences techniques principales]

🏆 [Réalisations chiffrées]

🎯 [Ce que vous recherchez]

📧 [Comment vous contacter]

#Hashtags #Pertinents
\`\`\`

## 🔗 Stratégie de Connexion

### Qui Connecter ?
- Recruteurs dans votre domaine
- Développeurs & tech leads
- Alumni de votre école
- Speakers de conférences
- Créateurs de contenu tech
- Personnes dans vos entreprises cibles

### Message de Connexion
\`\`\`
Bonjour [Prénom],

J'ai découvert votre profil via [contexte]. 
Votre parcours en [domaine] m'inspire particulièrement.

J'aimerais vous ajouter à mon réseau pour 
[raison spécifique].

Au plaisir d'échanger !
[Votre prénom]
\`\`\`

### Règles d'Or
- Personnalisez chaque message
- Évitez les demandes directes
- Référencez un contexte commun
- Soyez concis (300 caractères max)

## 📝 Créer du Contenu

### Types de Posts Performants
1. **Apprentissages** : Ce que vous avez appris cette semaine
2. **Projets** : Présentation de vos réalisations
3. **Conseils** : Tips pour d'autres développeurs
4. **Storytelling** : Votre parcours, vos échecs/succès
5. **Veille** : Partage d'articles/ressources commentés

### Fréquence
- **Idéal** : 2-3 posts/semaine
- **Minimum** : 1 post/semaine
- **Commentaires** : 5-10/jour

### Engagement
- Commentez avant de poster
- Répondez à tous les commentaires
- Likez et partagez le contenu des autres
- Soyez actif dans les groupes`
      },
      {
        id: 'nm-3',
        title: 'Développer son Esprit Entrepreneurial',
        duration: '20 min',
        type: 'text',
        content: `# Développer son Esprit Entrepreneurial

## 🚀 L'Esprit Entrepreneur en 2025

### Pourquoi Développer cet État d'Esprit ?

L'économie moderne récompense ceux qui :
- **Créent de la valeur** plutôt que de consommer
- **Résolvent des problèmes** pour les autres
- **Prennent des initiatives** sans attendre qu'on leur dise
- **Construisent des actifs** plutôt que d'échanger temps contre argent

> "L'entrepreneur voit une opportunité là où les autres voient un obstacle."

## 💡 Les Piliers de l'Esprit Entrepreneurial

### 1. Création de Valeur
- Identifiez les problèmes autour de vous
- Proposez des solutions
- Pensez "Comment puis-je aider ?"
- Créez avant de consommer

### 2. Prise de Risque Calculée
- Sortez de votre zone de confort
- Acceptez l'échec comme apprentissage
- Testez rapidement, itérez
- Minimisez les risques tout en agissant

### 3. Persévérance
- Le succès prend du temps
- Les obstacles font partie du chemin
- La consistance bat l'intensité
- Ne jamais abandonner trop tôt

### 4. Apprentissage Continu
- Restez curieux
- Apprenez de tous (juniors, seniors, autres industries)
- Investissez dans votre éducation
- Expérimentez constamment

## 🌐 Le Pouvoir du Réseau Relationnel

### Votre Réseau = Votre Richesse

Les personnes que vous connaissez peuvent :
- Ouvrir des portes
- Partager des opportunités
- Vous recommander
- Vous mentorer
- Devenir partenaires

### Comment Développer son Réseau

**Stratégie du "Give First"**
1. Aidez les autres sans rien attendre
2. Partagez vos connaissances gratuitement
3. Faites des introductions
4. Soyez la personne qui connecte

**La Règle des 5 Personnes**
> Vous êtes la moyenne des 5 personnes avec qui vous passez le plus de temps.

- Entourez-vous de personnes inspirantes
- Cherchez des mentors
- Participez à des masterminds
- Rejoignez des communautés d'excellence

## 💰 Revenus & Indépendance Financière

### Les Sources de Revenus

| Type | Exemple | Caractéristique |
|------|---------|-----------------|
| **Actif** | Salaire, Freelance | Temps = Argent |
| **Passif** | Formations, Livres | Créez une fois, vendez à l'infini |
| **Investissement** | Placements, Immobilier | L'argent travaille pour vous |

### Développer des Revenus Complémentaires

Pour les développeurs :
- Créer des templates/thèmes
- Vendre des formations en ligne
- Développer des SaaS
- Consulting/Coaching
- Contenu sponsorisé (blog, YouTube)

**Question clé** : Comment transformer vos compétences en produit ?

## 🎯 Passez à l'Action

> "Les idées n'ont pas de valeur. Seule l'exécution compte."

### Cette Semaine
1. Identifiez un problème que vous pouvez résoudre
2. Contactez 3 nouvelles personnes
3. Partagez une connaissance publiquement
4. Investissez 1h dans votre éducation

💡 **Pour aller plus loin**, discutez avec votre formateur des opportunités de développement personnel et professionnel.`
      },
      {
        id: 'nm-4',
        title: 'Communication & Influence',
        duration: '15 min',
        type: 'text',
        content: `# Communication & Influence

## 🗣️ Les Fondamentaux de la Communication Persuasive

### Les 3 Piliers (Aristote)
1. **Ethos** : Crédibilité & Expertise
2. **Pathos** : Émotion & Connexion
3. **Logos** : Logique & Arguments

## 🎯 Techniques de Communication

### L'Écoute Active
- Écoutez pour comprendre, pas pour répondre
- Posez des questions ouvertes
- Reformulez pour confirmer
- Montrez de l'intérêt sincère

### Le Storytelling
Les histoires sont **22x** plus mémorables que les faits.

**Structure** :
1. **Setup** : Le contexte et le personnage
2. **Conflit** : Le problème ou le défi
3. **Résolution** : Comment vous l'avez surmonté
4. **Leçon** : Ce que cela vous a appris

### Le Pitch Elevator (30 secondes)
\`\`\`
Je suis [métier],
spécialisé en [domaine].
J'aide [cible] à [résultat]
grâce à [compétence unique].

Exemple récent : [réalisation concrète].
\`\`\`

## 👥 Développer son Leadership

### Les Qualités du Leader
- **Vision** : Voir où aller
- **Communication** : Transmettre cette vision
- **Empathie** : Comprendre les autres
- **Décision** : Prendre des risques
- **Intégrité** : Faire ce qu'on dit

### Leader vs Manager
| Leader | Manager |
|--------|---------|
| Inspire | Contrôle |
| Innove | Administre |
| Questionne | Accepte |
| Développe | Maintient |
| Vision | Objectifs |

### Comment Développer son Leadership
1. Mentorez quelqu'un
2. Prenez des initiatives
3. Acceptez les responsabilités
4. Apprenez de vos erreurs publiquement
5. Célébrez les autres

## 🌟 Personal Branding

### Votre Marque Personnelle
- Ce que les gens disent de vous quand vous n'êtes pas là
- Votre réputation professionnelle
- Votre signature unique

### Construire son Personal Brand
1. **Définissez** : Vos valeurs, expertise, différenciation
2. **Communiquez** : Contenu régulier et cohérent
3. **Démontrez** : Projets, résultats, témoignages
4. **Entretenez** : Présence continue, networking

> "Si vous ne construisez pas votre marque, quelqu'un d'autre le fera pour vous."`
      },
      {
        id: 'nm-5',
        title: 'Challenge — Networking 30 Jours',
        duration: '30 jours',
        type: 'challenge',
        content: `# Challenge Networking 30 Jours

## 🎯 Objectif
Développer votre réseau professionnel de manière proactive et structurée.

## 📋 Actions Quotidiennes

### Semaine 1 : Fondations
- **Jour 1-2** : Optimisez votre profil LinkedIn
- **Jour 3-4** : Identifiez 20 personnes cibles
- **Jour 5-7** : Envoyez 5 demandes de connexion/jour

### Semaine 2 : Engagement
- **Jour 8-10** : Commentez 5 posts/jour
- **Jour 11-14** : Publiez votre premier post

### Semaine 3 : Connexion
- **Jour 15-17** : Proposez 2 cafés virtuels
- **Jour 18-21** : Participez à un événement/meetup

### Semaine 4 : Valeur
- **Jour 22-25** : Aidez 3 personnes dans votre domaine
- **Jour 26-28** : Créez et partagez une ressource utile
- **Jour 29-30** : Bilan et planification suite

## ✅ Critères de Réussite
- [ ] +50 nouvelles connexions qualifiées
- [ ] 10+ commentaires pertinents
- [ ] 2+ posts publiés
- [ ] 2+ conversations approfondies
- [ ] 1+ participation à un événement

## 📊 Tracker
Utilisez un tableur pour suivre :
- Connexions envoyées
- Taux d'acceptation
- Conversations initiées
- Opportunités découvertes`
      },
    ],
  },
  {
    id: 'green-tech',
    title: 'Culture Environnementale & Technologie',
    description: 'Comprenez l\'impact environnemental du numérique et adoptez les bonnes pratiques du Green IT.',
    icon: '🌱',
    color: 'from-green-500 to-emerald-500',
    category: 'environment',
    lessons: [
      {
        id: 'gt-1',
        title: 'L\'Impact Environnemental du Numérique',
        duration: '20 min',
        type: 'text',
        content: `# L'Impact Environnemental du Numérique

## 🌍 Le Numérique : Un Pollueur Invisible

### Statistiques Alarmantes
- Le numérique représente **4% des émissions mondiales de CO2**
- C'est **plus que l'aviation civile** (2.5%)
- La croissance est de **+9%/an**
- En 2025 : **8% des émissions mondiales** si rien ne change

### Sources d'Émissions Numériques

| Source | Part des émissions |
|--------|-------------------|
| Fabrication des appareils | **45%** |
| Data centers | **25%** |
| Réseaux (internet) | **20%** |
| Usage des appareils | **10%** |

## 💻 Les Data Centers

### Consommation Énergétique
- Un data center moyen = **25 000 foyers**
- Le streaming vidéo = **1% des émissions mondiales**
- Une recherche Google = **0.2g de CO2**
- Un email avec pièce jointe = **35g de CO2**

### Refroidissement
- **40%** de l'énergie d'un data center sert au refroidissement
- Température idéale : 18-27°C
- Solutions : free cooling, immersion cooling

## 📱 L'Obsolescence des Appareils

### Le Problème
- Un smartphone = **70kg de ressources naturelles**
- Durée de vie moyenne : **2-3 ans**
- Recyclage réel : **<20%**
- E-waste mondial : **50 millions de tonnes/an**

### Métaux Rares
Un smartphone contient :
- Or, argent, cuivre
- Lithium, cobalt
- Terres rares (néodyme, tantale)
- Conditions d'extraction souvent problématiques

## 🤖 L'IA : Le Nouveau Défi

### Consommation de l'IA
- Entraîner GPT-3 = **552 tonnes de CO2** (= 5 voitures pendant toute leur vie)
- Une requête ChatGPT = **10x une recherche Google**
- Les modèles doublent en taille tous les 3-4 mois

### L'Eau et l'IA
- Microsoft : **+34% de consommation d'eau** en 2022 (pour l'IA)
- Un data center = **millions de litres d'eau/jour**

## 📊 Empreinte Numérique Quotidienne

| Action | Émission CO2 |
|--------|-------------|
| 1h de streaming HD | 36g |
| 1 email (sans pièce jointe) | 4g |
| 1 email (avec pièce jointe 1MB) | 19g |
| 1h de visioconférence | 150-1000g |
| 1 recherche Google | 0.2g |
| 1 post Instagram | 0.15g |
| 1 minute TikTok | 2.63g |

> "Si Internet était un pays, ce serait le 3ème consommateur d'électricité mondial."`
      },
      {
        id: 'gt-2',
        title: 'Green IT : Principes et Pratiques',
        duration: '20 min',
        type: 'text',
        content: `# Green IT : Principes et Pratiques

## 🌱 Qu'est-ce que le Green IT ?

### Définition
Le **Green IT** (ou IT durable) désigne l'ensemble des pratiques visant à réduire l'empreinte environnementale des technologies de l'information.

### Les 3 Niveaux du Green IT

**Green IT 1.0** : Optimisation infrastructure
- Efficacité énergétique des data centers
- Virtualisation des serveurs
- Gestion des déchets électroniques

**Green IT 1.5** : IT pour le développement durable
- Télétravail & visioconférence
- Dématérialisation
- Smart buildings

**Green IT 2.0** : IT au service de l'environnement
- Monitoring environnemental
- Smart grids
- Optimisation des transports

## ♻️ Les Pratiques Green IT

### Pour les Développeurs

**1. Éco-conception Web**
- Optimiser les images (WebP, compression)
- Minifier CSS/JS
- Lazy loading
- Limiter les requêtes HTTP
- Choisir des hébergeurs verts

**2. Code Efficient**
- Algorithmes optimisés
- Éviter les requêtes inutiles
- Cache intelligent
- Clean code (moins de ressources serveur)

**3. Architecture Sobre**
- Éviter le sur-engineering
- Microservices vs monolithe (selon contexte)
- Serverless quand approprié
- CDN géographiquement pertinent

### Pour les Entreprises

**1. Politique d'Achat Responsable**
- Labels éco (EPEAT, Energy Star, TCO)
- Durée de vie prolongée
- Appareils reconditionnés
- Location plutôt qu'achat

**2. Gestion du Cycle de Vie**
- Maintenance prolongée
- Réparation avant remplacement
- Recyclage certifié (R2, e-Stewards)
- Don ou revente

**3. Data Centers Verts**
- PUE (Power Usage Effectiveness) < 1.4
- Énergies renouvelables
- Refroidissement naturel
- Récupération de chaleur

## 📊 Métriques Green IT

### PUE (Power Usage Effectiveness)
\`\`\`
PUE = Énergie totale data center / Énergie IT
\`\`\`
- PUE idéal : 1.0 (impossible en pratique)
- PUE moyen : 1.6
- PUE excellent : < 1.3

### Carbon Intensity
- Mesure les émissions CO2 par unité de service
- Varie selon le mix énergétique local
- France : ~50g CO2/kWh (nucléaire)
- Allemagne : ~400g CO2/kWh (charbon)

## 🏢 Entreprises Exemplaires

### Engagements Majeurs
- **Google** : Carbon neutral depuis 2007, 100% renouvelable
- **Microsoft** : Carbon negative d'ici 2030
- **Apple** : 100% renouvelable, carbone neutre 2030
- **AWS** : 100% renouvelable d'ici 2025`
      },
      {
        id: 'gt-3',
        title: 'Bonnes Pratiques Numériques',
        duration: '15 min',
        type: 'text',
        content: `# Bonnes Pratiques Numériques Responsables

## 🖥️ Gestion des Emails

### Le Problème
- **306 milliards** d'emails envoyés/jour
- **80%** ne sont jamais ouverts
- Les newsletters oubliées s'accumulent
- Les pièces jointes multiplient l'impact

### Solutions
✅ **Faire le tri**
- Désinscrivez-vous des newsletters inutiles
- Supprimez les vieux emails (surtout avec PJ)
- Videz la corbeille et spam régulièrement

✅ **Envoyer mieux**
- Évitez "Reply All" quand inutile
- Compressez les pièces jointes
- Utilisez des liens plutôt que des fichiers
- Évitez les signatures avec images

## 🔍 Navigation Web

### Bonnes Pratiques
- **Favoris** : Ajoutez les sites fréquents (évitez Google)
- **URL directes** : Tapez l'adresse plutôt que chercher
- **Onglets** : Fermez ceux inutilisés
- **Extensions** : Limitez au strict nécessaire
- **Mode sombre** : Économise l'écran et les yeux

### Streaming Responsable
- Téléchargez plutôt que streamez (répété)
- Réduisez la qualité vidéo (720p suffit souvent)
- Évitez l'autoplay
- Podcast audio > vidéo YouTube

## 📱 Appareils & Équipements

### Prolonger la Durée de Vie
- **Étui de protection** : Protège des chutes
- **Batterie** : Gardez entre 20-80%
- **Mises à jour** : Gardez l'OS à jour
- **Nettoyage** : Désinstallez les apps inutilisées
- **Réparation** : Privilégiez la réparation au remplacement

### Achat Responsable
- Reconditionnés (Back Market, Fnac 2nd vie)
- Labels éco (EPEAT, Blue Angel)
- Durabilité > Dernière technologie
- Indice de réparabilité

## 💾 Stockage & Cloud

### Bonnes Pratiques
- Supprimez les fichiers inutiles
- Évitez les doublons
- Compressez les archives
- Limitez la synchronisation automatique
- Préférez le local au cloud quand possible

## 📊 Checklist Éco-Responsable

### Quotidien
- [ ] Fermer les onglets non utilisés
- [ ] Éteindre l'ordinateur le soir
- [ ] Désactiver Bluetooth/WiFi si inutilisé
- [ ] Baisser la luminosité de l'écran

### Hebdomadaire
- [ ] Vider la corbeille email
- [ ] Supprimer les fichiers temporaires
- [ ] Désinstaller les apps inutilisées
- [ ] Trier les téléchargements

### Mensuel
- [ ] Audit des newsletters
- [ ] Nettoyage cloud/stockage
- [ ] Vérifier les sauvegardes
- [ ] Supprimer les vieux comptes`
      },
      {
        id: 'gt-4',
        title: 'Éco-Conception Web',
        duration: '20 min',
        type: 'text',
        content: `# Éco-Conception Web pour Développeurs

## 🌐 Principes de l'Éco-Conception

### Les 3R du Développement Durable
1. **Réduire** : Moins de code, moins de ressources
2. **Réutiliser** : Components, libraries existantes
3. **Recycler** : Refactoring, optimisation

### Les 5 Piliers de l'Éco-Conception Web

**1. Simplicité Fonctionnelle**
- Chaque feature = impact environnemental
- YAGNI (You Ain't Gonna Need It)
- Moins de features = moins de code = moins d'énergie

**2. Sobriété Technique**
- Technologies appropriées au besoin
- Éviter le sur-engineering
- Privilégier les solutions natives

**3. Performance**
- Code optimisé = moins de ressources serveur
- Temps de chargement réduit = moins de data
- Efficacité algorithme = moins de CPU

**4. Durabilité**
- Code maintenable
- Documentation claire
- Rétrocompatibilité

**5. Accessibilité**
- Un site accessible = utilisable plus longtemps
- Moins de frustration = moins de rechargements
- Plus d'utilisateurs sans changer le code

## 💻 Techniques d'Optimisation

### Images
\`\`\`html
<!-- ❌ Mauvais -->
<img src="photo.png" />

<!-- ✅ Bon -->
<img 
  src="photo.webp" 
  srcset="photo-400.webp 400w, photo-800.webp 800w"
  sizes="(max-width: 600px) 400px, 800px"
  loading="lazy"
  alt="Description"
/>
\`\`\`

### CSS/JS
\`\`\`bash
# Minification
npx terser script.js -o script.min.js
npx cssnano styles.css styles.min.css

# Tree-shaking (Vite/Webpack)
# Importer uniquement ce qui est nécessaire
import { debounce } from 'lodash-es'  # ✅
import _ from 'lodash'  # ❌
\`\`\`

### Fonts
\`\`\`css
/* ❌ Charger toutes les variantes */
@import url('https://fonts.googleapis.com/css2?family=Inter');

/* ✅ Uniquement ce qui est nécessaire */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap;
}
\`\`\`

## 📊 Mesurer l'Impact

### Outils d'Audit
- **Lighthouse** : Performance, accessibilité
- **Website Carbon** : Empreinte carbone
- **EcoIndex** : Score environnemental
- **Green Web Foundation** : Hébergement vert

### Métriques Clés
| Métrique | Cible |
|----------|-------|
| Poids page | < 1 MB |
| Requêtes HTTP | < 25 |
| Temps chargement | < 3s |
| LCP | < 2.5s |
| EcoIndex | A ou B |

## 🏆 Best Practices

### Architecture
- SSG (Static Site Generation) quand possible
- CDN pour la distribution
- Compression (gzip, brotli)
- HTTP/2 ou HTTP/3

### Code
- Pas de dépendances inutiles
- Code splitting
- Lazy loading
- Service Workers pour cache`
      },
      {
        id: 'gt-5',
        title: 'Projet Noté — Recherche Environnementale',
        duration: '2 semaines',
        type: 'project',
        content: `# Mini Projet Noté — Recherche Environnementale

## 🎯 Objectif
Réaliser une recherche approfondie sur un sujet lié à l'impact environnemental du numérique et présenter vos découvertes.

## 📋 Sujets Disponibles

Choisissez **UN** sujet parmi :

### Catégorie 1 : Infrastructure
1. **Impact écologique des data centers** — Consommation énergétique, refroidissement, solutions
2. **Cloud computing et environnement** — Avantages vs inconvénients écologiques
3. **5G et empreinte carbone** — Déploiement, consommation, impact

### Catégorie 2 : Pratiques
4. **Green coding** — Techniques de développement éco-responsable
5. **Pollution numérique au quotidien** — Emails, streaming, réseaux sociaux
6. **Obsolescence programmée** — Causes, conséquences, alternatives

### Catégorie 3 : Technologies
7. **IA et consommation énergétique** — Training, inference, solutions
8. **Blockchain et énergie** — Proof of Work vs Proof of Stake
9. **Cryptomonnaies et environnement** — Bitcoin, Ethereum, alternatives vertes

### Catégorie 4 : Solutions
10. **E-waste et recyclage** — Situation mondiale, solutions, acteurs
11. **Green IT en entreprise** — Politiques, certifications, ROI
12. **Éco-conception web** — Principes, techniques, exemples

## 📝 Livrables

### 1. Document de Recherche (PDF)
- **Format** : 5-10 pages
- **Structure** :
  - Introduction et problématique
  - État des lieux (données chiffrées)
  - Analyse et enjeux
  - Solutions et bonnes pratiques
  - Conclusion et engagement personnel
  - Sources (minimum 5 sources fiables)

### 2. Présentation (Slides)
- **Format** : 10-15 slides
- **Durée** : 10 minutes de présentation
- **Contenu** : Synthèse visuelle du document

## 📤 Soumission

Envoyez via le formulaire de la plateforme :
- Votre document PDF
- Votre présentation
- Vos informations (Nom, Prénom, Groupe)

## 📊 Critères d'Évaluation

| Critère | Points |
|---------|--------|
| Qualité de la recherche | /25 |
| Données chiffrées et sources | /20 |
| Analyse et réflexion personnelle | /20 |
| Solutions proposées | /15 |
| Qualité de la présentation | /10 |
| Respect des consignes | /10 |
| **Total** | **/100** |

## ⏰ Deadline
2 semaines à partir de la date de début

## 💡 Conseils
- Utilisez des sources récentes (< 2 ans)
- Citez vos sources correctement
- Incluez des graphiques et données visuelles
- Proposez des actions concrètes et réalisables
- Reliez le sujet à votre futur métier IT`
      },
    ],
  },
];

export const projectTopics = [
  {
    id: 'datacenter',
    title: 'Impact écologique des data centers',
    category: 'Infrastructure',
    difficulty: 'Intermédiaire',
    keywords: ['PUE', 'refroidissement', 'énergie renouvelable', 'localisation'],
  },
  {
    id: 'cloud-env',
    title: 'Cloud computing et environnement',
    category: 'Infrastructure',
    difficulty: 'Intermédiaire',
    keywords: ['AWS', 'Azure', 'GCP', 'carbon neutral', 'serverless'],
  },
  {
    id: '5g-carbon',
    title: '5G et empreinte carbone',
    category: 'Infrastructure',
    difficulty: 'Avancé',
    keywords: ['déploiement', 'IoT', 'smart cities', 'consommation'],
  },
  {
    id: 'green-coding',
    title: 'Green coding — Développement éco-responsable',
    category: 'Pratiques',
    difficulty: 'Débutant',
    keywords: ['optimisation', 'algorithmes', 'efficacité', 'éco-conception'],
  },
  {
    id: 'digital-pollution',
    title: 'Pollution numérique au quotidien',
    category: 'Pratiques',
    difficulty: 'Débutant',
    keywords: ['emails', 'streaming', 'réseaux sociaux', 'stockage'],
  },
  {
    id: 'obsolescence',
    title: 'Obsolescence programmée',
    category: 'Pratiques',
    difficulty: 'Intermédiaire',
    keywords: ['smartphones', 'durée de vie', 'réparation', 'législation'],
  },
  {
    id: 'ai-energy',
    title: 'IA et consommation énergétique',
    category: 'Technologies',
    difficulty: 'Avancé',
    keywords: ['GPT', 'training', 'inference', 'data centers', 'eau'],
  },
  {
    id: 'blockchain-energy',
    title: 'Blockchain et énergie',
    category: 'Technologies',
    difficulty: 'Avancé',
    keywords: ['PoW', 'PoS', 'Bitcoin', 'Ethereum', 'consensus'],
  },
  {
    id: 'crypto-env',
    title: 'Cryptomonnaies et environnement',
    category: 'Technologies',
    difficulty: 'Intermédiaire',
    keywords: ['mining', 'hardware', 'alternatives', 'régulation'],
  },
  {
    id: 'ewaste',
    title: 'E-waste et recyclage électronique',
    category: 'Solutions',
    difficulty: 'Débutant',
    keywords: ['DEEE', 'recyclage', 'reconditionnement', 'économie circulaire'],
  },
  {
    id: 'green-it-enterprise',
    title: 'Green IT en entreprise',
    category: 'Solutions',
    difficulty: 'Intermédiaire',
    keywords: ['RSE', 'ISO 14001', 'politique', 'achats responsables'],
  },
  {
    id: 'ecodesign-web',
    title: 'Éco-conception web',
    category: 'Solutions',
    difficulty: 'Intermédiaire',
    keywords: ['performance', 'optimisation', 'accessibilité', 'sobriété'],
  },
];
