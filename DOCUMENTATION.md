# 📘 IT Career Lab — Documentation Stratégique Interne

> Document de référence pour l'évolution et la maintenance du projet

---

## 📋 Table des Matières

1. [Vision & Objectifs](#vision--objectifs)
2. [Architecture Détaillée](#architecture-détaillée)
3. [Workflow des Fonctionnalités](#workflow-des-fonctionnalités)
4. [Système d'Évaluation ATS](#système-dévaluation-ats)
5. [Intégration Email](#intégration-email)
6. [APIs Emploi](#apis-emploi)
7. [Évolutions Futures](#évolutions-futures)
8. [Migration SaaS](#migration-saas)
9. [Intégration IA](#intégration-ia)
10. [Monétisation](#monétisation)

---

## 🎯 Vision & Objectifs

### Mission
Créer une plateforme éducative de référence pour l'employabilité IT francophone, accessible gratuitement et évolutive vers un modèle SaaS.

### Objectifs Stratégiques

| Phase | Objectif | Timeline |
|-------|----------|----------|
| **MVP** | Plateforme fonctionnelle avec cours + CV Builder | ✅ Complété |
| **v2** | Roadmaps + Job Search + Modules étendus | ✅ Complété |
| **v3** | PWA + Gamification + IA | Q2 2025 |
| **SaaS** | Multi-tenant + Auth + Dashboards | Q4 2025 |

### KPIs Cibles

- **Utilisateurs actifs** : 1000+ / mois
- **Complétion de cours** : 40%+
- **CV générés** : 500+ / mois
- **Score de satisfaction** : 4.5/5

---

## 🏗️ Architecture Détaillée

### Diagramme de Composants

```
┌──────────────────────────────────────────────────────────────────┐
│                           APP.TSX                                 │
│                    (Router + State Manager)                       │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   NAVBAR    │  │   PAGES     │  │  SERVICES   │              │
│  │             │  │             │  │             │              │
│  │ - Navigation│  │ - Home      │  │ - Email     │              │
│  │ - Dark mode │  │ - Dashboard │  │ - Jobs API  │              │
│  │ - Mobile    │  │ - Courses   │  │ - ATS       │              │
│  └─────────────┘  │ - CV Builder│  │             │              │
│                   │ - Roadmaps  │  └─────────────┘              │
│                   │ - Jobs      │                                │
│                   │ - Modules   │  ┌─────────────┐              │
│                   │ - Evaluation│  │    DATA     │              │
│                   └─────────────┘  │             │              │
│                                    │ - Courses   │              │
│  ┌─────────────┐  ┌─────────────┐  │ - Roadmaps  │              │
│  │   UTILS     │  │   STORAGE   │  │ - Modules   │              │
│  │             │  │             │  │             │              │
│  │ - cn()      │  │ - LocalStor │  └─────────────┘              │
│  │ - ATS       │  │ - Progress  │                                │
│  │             │  │ - CV Data   │                                │
│  └─────────────┘  └─────────────┘                                │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Flux de Données

```
User Action
    │
    ▼
Component (React)
    │
    ├──► Local State (useState)
    │
    ├──► LocalStorage (persist)
    │
    └──► External API (fetch)
            │
            ▼
        Response
            │
            ▼
    Update UI (re-render)
```

---

## 🔄 Workflow des Fonctionnalités

### CV Builder Flow

```
1. User enters CV data
        │
        ▼
2. Real-time preview (CVPreview component)
        │
        ▼
3. Auto-save to LocalStorage
        │
        ▼
4. User clicks "Analyze"
        │
        ▼
5. atsAnalyzer.ts processes data
        │
        ├── Keyword matching (40%)
        ├── Structure check (25%)
        ├── Content quality (20%)
        └── Formatting (15%)
        │
        ▼
6. Display ATSAnalysisView
        │
        ▼
7. User exports PDF (print dialog)
```

### Course Completion Flow

```
1. User reads lesson
        │
        ▼
2. Clicks "Mark Complete"
        │
        ▼
3. updateModuleProgress() called
        │
        ▼
4. LocalStorage updated
        │
        ▼
5. Progress bar updated
        │
        ▼
6. If module complete → Badge earned
```

---

## 📊 Système d'Évaluation ATS

### Algorithme de Scoring

```typescript
// Weights
const WEIGHTS = {
  keywords: 0.40,    // 40%
  structure: 0.25,   // 25%
  content: 0.20,     // 20%
  formatting: 0.15,  // 15%
};

// Score calculation
finalScore = (
  keywordScore * WEIGHTS.keywords +
  structureScore * WEIGHTS.structure +
  contentScore * WEIGHTS.content +
  formattingScore * WEIGHTS.formatting
);
```

### Keyword Database

Mots-clés par spécialité stockés dans `src/data/courses.ts` :

```typescript
export const atsKeywords = {
  'dev-web': ['React', 'TypeScript', 'Node.js', ...],
  'reseaux': ['Cisco', 'TCP/IP', 'VLAN', ...],
  'cybersecurite': ['Pentesting', 'SIEM', 'SOC', ...],
  // ...
};
```

### Critères d'Évaluation

| Critère | Check | Points |
|---------|-------|--------|
| Nom complet | Présent | +20 |
| Email | Présent + valide | +20 |
| Titre pro | Présent | +15 |
| Résumé | 50+ caractères | +10 |
| Expériences | Au moins 1 | +15 |
| Skills | 10+ | +10 |
| Résultats chiffrés | Regex \d+ | +10 |

---

## 📧 Intégration Email

### Architecture Email

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────►│   EmailJS   │────►│    SMTP     │
│  (Browser)  │     │   (API)     │     │   Server    │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Recipient  │
                    │   Inbox     │
                    └─────────────┘
```

### Configuration EmailJS

1. **Service ID** : Lié à votre compte Gmail/Outlook
2. **Template ID** : Template avec variables dynamiques
3. **Public Key** : Clé API publique (safe côté client)

### Template Variables

```
{{to_name}}           - Nom du destinataire
{{student_name}}      - Nom complet étudiant
{{student_group}}     - Groupe/classe
{{student_specialty}} - Spécialité
{{evaluation_type}}   - Type d'évaluation
{{score}}             - Score numérique
{{grade}}             - Note (A, B, C...)
{{details}}           - Détails formatés
{{strengths}}         - Points forts
{{issues}}            - Points à améliorer
{{recommendations}}   - Recommandations
{{date}}              - Date formatée
```

### Fallback Strategy

```
1. Try EmailJS
   │
   ├── Success → Return
   │
   └── Fail → Try Google Apps Script
                │
                ├── Success → Return
                │
                └── Fail → Save locally + Show message
```

---

## 🔍 APIs Emploi

### Sources Intégrées

| API | Type | Couverture | Rate Limit |
|-----|------|------------|------------|
| **Himalayas** | REST | Remote Global | 24h cache |
| **Arbeitnow** | REST | Europe | No limit |
| **Mock Data** | Local | Fallback | N/A |

### Endpoint Himalayas

```
GET https://himalayas.app/jobs/api/search
Query params:
  - q: search query
  - worldwide: true/false
  - page: pagination
```

### Endpoint Arbeitnow

```
GET https://www.arbeitnow.com/api/job-board-api
Query params:
  - page: pagination
```

### Response Normalization

Toutes les réponses sont normalisées vers `JobListing` :

```typescript
interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  remote: boolean;
  salary?: string;
  description: string;
  technologies: string[];
  url: string;
  postedAt: string;
  source: string;
}
```

---

## 🚀 Évolutions Futures

### v3.0 — PWA & Gamification

#### Progressive Web App
```javascript
// Service Worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Manifest.json
{
  "name": "IT Career Lab",
  "short_name": "ICL",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#3b82f6"
}
```

#### Système de Badges

```typescript
interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (progress: Progress) => boolean;
}

const badges: Badge[] = [
  {
    id: 'first-lesson',
    title: 'Premier Pas',
    description: 'Compléter votre première leçon',
    icon: '🎯',
    condition: (p) => p.completedLessons.length >= 1,
  },
  // ...
];
```

#### Système de Niveaux

```typescript
const levels = [
  { min: 0, max: 100, name: 'Débutant', icon: '🌱' },
  { min: 100, max: 500, name: 'Apprenti', icon: '📚' },
  { min: 500, max: 1500, name: 'Confirmé', icon: '⭐' },
  { min: 1500, max: 5000, name: 'Expert', icon: '🏆' },
  { min: 5000, max: Infinity, name: 'Maître', icon: '👑' },
];
```

---

## 🏢 Migration SaaS

### Architecture Cible

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│                    (React + Vite - Vercel)                  │
├─────────────────────────────────────────────────────────────┤
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    SUPABASE                             │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │ │
│  │  │   Auth   │  │ Database │  │       Storage        │  │ │
│  │  │  (Users) │  │ (Postgres│  │   (CV Files, etc.)   │  │ │
│  │  └──────────┘  └──────────┘  └──────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   EDGE FUNCTIONS                        │ │
│  │  - Email sending                                        │ │
│  │  - AI processing                                        │ │
│  │  - Analytics                                            │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Schema Database

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'student',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Progress
CREATE TABLE progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  module_id TEXT,
  completed_lessons TEXT[],
  quiz_scores JSONB,
  updated_at TIMESTAMP
);

-- CV Data
CREATE TABLE cv_data (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  data JSONB,
  ats_score INTEGER,
  updated_at TIMESTAMP
);

-- Evaluations
CREATE TABLE evaluations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type TEXT,
  score INTEGER,
  report JSONB,
  created_at TIMESTAMP
);
```

### Pricing Tiers

| Plan | Prix | Features |
|------|------|----------|
| **Free** | 0€ | Cours, CV basique, 5 analyses/mois |
| **Pro** | 9€/mois | Illimité, templates premium, support |
| **Team** | 29€/mois | Multi-users, dashboard admin, analytics |
| **Enterprise** | Custom | API, SSO, support dédié |

---

## 🤖 Intégration IA

### ChatGPT Integration (Future)

```typescript
// OpenAI API integration
async function analyzeWithAI(cvText: string): Promise<AIFeedback> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert HR and ATS specialist...'
        },
        {
          role: 'user',
          content: `Analyze this CV: ${cvText}`
        }
      ]
    })
  });
  
  return response.json();
}
```

### Use Cases IA

1. **Analyse CV avancée** — Suggestions de réécriture
2. **Génération de lettre** — Personnalisation automatique
3. **Préparation entretien** — Questions personnalisées
4. **Matching emploi** — Score de compatibilité intelligent
5. **Chatbot assistant** — Support 24/7

### Providers Alternatives

- **Anthropic Claude** — Pour analyse de texte
- **Hugging Face** — Modèles open source
- **Cohere** — Embedding et recherche

---

## 💰 Monétisation

### Modèles Possibles

#### 1. Freemium SaaS
- Accès gratuit aux cours
- Premium pour outils avancés
- Récurrent mensuel/annuel

#### 2. B2B Formation
- Licences établissements
- Dashboard formateur
- Suivi de cohortes
- Certifications personnalisées

#### 3. Marketplace
- Templates CV premium
- Cours spécialisés
- Coaching 1-on-1

#### 4. Affiliation
- Liens vers formations externes
- Plateformes d'emploi partenaires
- Outils recommandés

### Projections Revenue

| Année | Users | Conversion | MRR |
|-------|-------|------------|-----|
| Y1 | 5K | 2% | 900€ |
| Y2 | 20K | 3% | 5.4K€ |
| Y3 | 50K | 5% | 22.5K€ |

---

## 🔧 Maintenance

### Checklist Hebdomadaire

- [ ] Vérifier les APIs emploi
- [ ] Surveiller les erreurs console
- [ ] Mettre à jour les dépendances mineures
- [ ] Backup des configurations

### Checklist Mensuelle

- [ ] Audit de sécurité
- [ ] Review des analytics
- [ ] Mise à jour du contenu
- [ ] Test cross-browser

### Checklist Trimestrielle

- [ ] Mise à jour majeure des dépendances
- [ ] Refresh des roadmaps IT
- [ ] Ajout de nouveaux contenus
- [ ] Performance audit

---

## 📚 Ressources

### Documentation Externe

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [TailwindCSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion)
- [EmailJS](https://www.emailjs.com/docs)
- [Supabase](https://supabase.com/docs)

### Communautés

- Discord Dev français
- Reddit r/webdev
- Twitter #100DaysOfCode
- LinkedIn Tech groups

---

*Document maintenu par l'équipe IT Career Lab*
*Dernière mise à jour : Janvier 2025*
