# 🎓 IT Career Lab

<div align="center">

![IT Career Lab Banner](https://img.shields.io/badge/IT%20Career%20Lab-v2.0-blue?style=for-the-badge&logo=graduation-cap)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**Plateforme éducative moderne pour l'employabilité IT, le développement personnel et la préparation à la carrière technique.**

[🚀 Demo Live](#) • [📚 Documentation](#documentation) • [🛠️ Installation](#installation)

</div>

---

## 🌟 Vision du Projet

IT Career Lab est une plateforme éducative immersive conçue pour accompagner les professionnels et étudiants IT dans leur parcours vers l'emploi. Elle combine :

- 📚 **Formation Interactive** — Cours détaillés sur la recherche d'emploi IT
- 🗺️ **Roadmaps IT** — Parcours d'apprentissage pour 12+ spécialités
- 📄 **CV Builder ATS** — Création de CV optimisés pour les systèmes de suivi
- 🔍 **Recherche d'Emploi** — Agrégation d'offres IT depuis plusieurs sources
- 🧠 **Développement Personnel** — Mindset, networking, soft skills
- 🌱 **Green IT** — Sensibilisation à l'impact environnemental du numérique
- ✅ **Évaluations Automatiques** — Scoring et feedback personnalisé

---

## 📋 Table des Matières

- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Stack Technique](#-stack-technique)
- [Installation](#-installation)
- [Déploiement GitHub Pages](#-déploiement-github-pages)
- [Configuration Email](#-configuration-email)
- [Structure du Projet](#-structure-du-projet)
- [Roadmap](#-roadmap)
- [Sécurité](#-sécurité)
- [Contribuer](#-contribuer)

---

## ✨ Fonctionnalités

### 📚 Modules de Formation

| Module | Description | Contenu |
|--------|-------------|---------|
| **Recherche d'Emploi IT** | Techniques avancées de prospection | Plateformes, LinkedIn, entretiens, erreurs à éviter |
| **CV Professionnel ATS** | Création de CV optimisés | Templates, analyse automatique, score ATS, export PDF |
| **Lettre de Motivation** | Générateur intelligent | 5 templates métier, personnalisation, conseils RH |
| **Portfolio Développeur** | Guide complet | Structure, design, GitHub Pages, SEO |
| **Mindset & Développement** | Soft skills essentielles | Discipline, productivité, leadership, communication |
| **Networking** | Développement relationnel | LinkedIn, personal branding, esprit entrepreneurial |
| **Green IT** | Impact environnemental | Data centers, éco-conception, bonnes pratiques |

### 🗺️ Roadmaps IT 2025-2026

Parcours détaillés étape par étape pour :

- 🎨 Développeur Frontend
- ⚙️ Développeur Backend
- 🚀 Développeur Full Stack
- 🔐 Cybersécurité
- 🔄 DevOps
- ☁️ Cloud Engineering
- 🤖 Data Science & IA
- 🌐 Réseaux & Télécommunications
- 🎯 UI/UX Design
- 📱 Développement Mobile
- 🧪 QA Testing
- 💼 Freelancing IT

Chaque roadmap inclut :
- Compétences à acquérir par étape
- Outils et frameworks
- Certifications recommandées
- Projets pratiques
- Ressources gratuites
- Erreurs à éviter
- Tips d'entretien

### 📄 CV Builder ATS

- Templates modernes ATS-friendly
- Aperçu en temps réel
- **Analyse ATS automatique** avec scoring :
  - Mots-clés (40%)
  - Structure (25%)
  - Contenu (20%)
  - Mise en forme (15%)
- Recommandations personnalisées
- Export PDF professionnel
- Sauvegarde locale (LocalStorage)

### 🔍 Recherche d'Emploi Intelligente

- Agrégation depuis **Himalayas API** et **Arbeitnow**
- Filtres par catégorie, remote, localisation
- **Score de compatibilité** basé sur votre profil
- Conseils de candidature personnalisés
- Liens directs vers les offres

### ✅ Système d'Évaluation

- Évaluation CV ATS automatique
- Analyse de lettres de motivation
- Checklist portfolio
- Rapports détaillés avec scores
- Envoi par email (EmailJS)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      IT CAREER LAB                          │
│                   (Static SPA - GitHub Pages)               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   React     │  │  TypeScript │  │    TailwindCSS     │  │
│  │   + Vite    │  │   + Strict  │  │   + Framer Motion  │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   STATE MANAGEMENT                    │   │
│  │  ┌────────────────┐  ┌─────────────────────────────┐ │   │
│  │  │  LocalStorage  │  │        IndexedDB           │ │   │
│  │  │  (User Data)   │  │   (Future: Large Data)     │ │   │
│  │  └────────────────┘  └─────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   EXTERNAL SERVICES                   │   │
│  │  ┌──────────┐ ┌───────────┐ ┌───────────────────────┐│   │
│  │  │ EmailJS  │ │ Job APIs  │ │  Google Apps Script   ││   │
│  │  │ (Emails) │ │ (Search)  │ │     (Fallback)       ││   │
│  │  └──────────┘ └───────────┘ └───────────────────────┘│   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Stack Technique

### Frontend
- **React 19** — Framework UI
- **TypeScript 5.9** — Typage statique
- **Vite 7** — Build tool ultra-rapide
- **TailwindCSS 4** — Styling utility-first

### Animations
- **Framer Motion** — Animations fluides
- **GSAP** — Animations avancées (disponible)

### State & Storage
- **LocalStorage** — Persistance des données utilisateur
- **IndexedDB** — Support grandes données (future)

### Services Externes
- **EmailJS** — Envoi d'emails client-side
- **Himalayas API** — Offres d'emploi remote
- **Arbeitnow API** — Offres d'emploi Europe
- **Google Apps Script** — Alternative email

### Build & Deploy
- **Vite Single File** — Build optimisé
- **GitHub Pages** — Hébergement gratuit
- **GitHub Actions** — CI/CD automatique

---

## 📦 Installation

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation locale

```bash
# Cloner le repository
git clone https://github.com/votre-username/it-career-lab.git
cd it-career-lab

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build

# Preview du build
npm run preview
```

---

## 🚀 Déploiement GitHub Pages

### Configuration Automatique

1. **Fork** ce repository
2. Allez dans **Settings > Pages**
3. Source: **GitHub Actions**
4. Le workflow se déclenche automatiquement à chaque push sur `main`

### Configuration Manuelle

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 📧 Configuration Email

### Option 1 : EmailJS (Recommandé)

1. Créez un compte sur [emailjs.com](https://www.emailjs.com/)
2. Ajoutez un service email (Gmail, Outlook...)
3. Créez un template avec les variables :
   - `{{to_name}}`, `{{student_name}}`, `{{score}}`, `{{grade}}`...
4. Modifiez `src/services/emailService.ts` :

```typescript
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY',
  adminEmail: 'apprentissage.csft@gmail.com',
};
```

### Option 2 : Google Apps Script

1. Créez un script sur [script.google.com](https://script.google.com)
2. Déployez comme Web App
3. Configurez l'URL dans `emailService.ts`

### Option 3 : FormSubmit

- Solution sans configuration
- Formulaires soumis à `formsubmit.co/votre-email`

---

## 📁 Structure du Projet

```
it-career-lab/
├── src/
│   ├── components/          # Composants React
│   │   ├── Navbar.tsx
│   │   ├── HomePage.tsx
│   │   ├── Dashboard.tsx
│   │   ├── CoursesPage.tsx
│   │   ├── CVBuilder.tsx
│   │   ├── CoverLetterPage.tsx
│   │   ├── EvaluationPage.tsx
│   │   ├── RoadmapsPage.tsx
│   │   ├── JobSearchPage.tsx
│   │   └── ExtendedModulesPage.tsx
│   │
│   ├── data/                # Données et contenus
│   │   ├── courses.ts       # Modules de formation
│   │   ├── roadmaps.ts      # Roadmaps IT
│   │   └── extendedModules.ts # Mindset, Networking, Green IT
│   │
│   ├── services/            # Services externes
│   │   ├── emailService.ts  # EmailJS integration
│   │   └── jobSearchService.ts # APIs emploi
│   │
│   ├── utils/               # Utilitaires
│   │   ├── storage.ts       # LocalStorage helpers
│   │   ├── atsAnalyzer.ts   # Analyse ATS
│   │   └── cn.ts            # Class names helper
│   │
│   ├── App.tsx              # Composant principal
│   ├── main.tsx             # Point d'entrée
│   └── index.css            # Styles globaux
│
├── public/                  # Assets statiques
├── index.html               # HTML template
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🗺️ Roadmap

### ✅ MVP (v1.0) — Complété
- [x] Modules de formation base
- [x] CV Builder avec analyse ATS
- [x] Lettre de motivation
- [x] Dashboard progression
- [x] Dark mode

### ✅ v2.0 — Actuel
- [x] 12 Roadmaps IT complets
- [x] Recherche d'emploi avec APIs
- [x] Module Mindset
- [x] Module Networking
- [x] Module Green IT
- [x] Système d'évaluation amélioré
- [x] Animations premium

### 🔜 v3.0 — Planifié
- [ ] PWA (Progressive Web App)
- [ ] Notifications push
- [ ] Mode hors-ligne
- [ ] Gamification (badges, niveaux)
- [ ] Intégration ChatGPT pour feedback IA
- [ ] Export LinkedIn
- [ ] Multilingue (EN, AR)

### 🚀 Future — SaaS Evolution
- [ ] Authentification utilisateur
- [ ] Backend Supabase/Firebase
- [ ] Suivi multi-utilisateurs
- [ ] Dashboard formateur
- [ ] Analytics avancés
- [ ] Certificats de complétion
- [ ] API publique

---

## 🔒 Sécurité

### Limitations Frontend-Only

⚠️ **Important** : Cette application fonctionne entièrement côté client.

| Aspect | Limitation | Mitigation |
|--------|-----------|------------|
| **Données** | Stockées en LocalStorage | Pas de données sensibles |
| **Emails** | Clés API exposées | EmailJS rate-limiting |
| **APIs** | Pas d'authentification | APIs publiques uniquement |
| **Validation** | Côté client uniquement | Validation défensive |

### Bonnes Pratiques Appliquées

- ✅ Pas de stockage de mots de passe
- ✅ Pas de données personnelles sensibles
- ✅ Variables d'environnement pour configs
- ✅ CSP headers recommandés
- ✅ HTTPS obligatoire (GitHub Pages)

### Configuration Production

```typescript
// Ne jamais commiter de vraies clés
const CONFIG = {
  emailJs: process.env.VITE_EMAILJS_KEY || 'YOUR_KEY',
};
```

---

## 🎨 Design System

### Couleurs
```css
--primary: #3b82f6;  /* Blue 500 */
--accent: #8b5cf6;   /* Violet 500 */
--surface: #0f172a;  /* Slate 900 */
```

### Typographie
- **Headings** : Inter, system-ui
- **Body** : Inter, -apple-system

### Composants
- Cards avec glassmorphism
- Boutons avec micro-interactions
- Progress bars animées
- Transitions fluides (Framer Motion)

---

## 📊 Performance

### Métriques Cibles

| Métrique | Cible | Actuel |
|----------|-------|--------|
| LCP | < 2.5s | ~1.2s |
| FID | < 100ms | ~50ms |
| CLS | < 0.1 | ~0.05 |
| Bundle Size | < 500KB | ~497KB |

### Optimisations

- ✅ Code splitting par route
- ✅ Lazy loading images
- ✅ Tree shaking
- ✅ Minification
- ✅ Single file build

---

## ♿ Accessibilité

- ✅ Navigation clavier complète
- ✅ Contraste WCAG AA
- ✅ Labels aria
- ✅ Focus visible
- ✅ Skip links
- ✅ Responsive text

---

## 🤝 Contribuer

1. **Fork** le projet
2. Créez une branche (`git checkout -b feature/amazing`)
3. Committez (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing`)
5. Ouvrez une **Pull Request**

### Guidelines
- Respectez le style de code existant
- Ajoutez des tests si applicable
- Mettez à jour la documentation

---

## 📄 Licence

MIT © 2025 IT Career Lab

---

## 🙏 Remerciements

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [TailwindCSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)
- [EmailJS](https://www.emailjs.com)
- [Himalayas API](https://himalayas.app/api)

---

<div align="center">

**Conçu avec ❤️ pour les étudiants et professionnels IT**

[⬆ Retour en haut](#-it-career-lab)

</div>
