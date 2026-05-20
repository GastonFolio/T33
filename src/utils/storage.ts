// LocalStorage utilities for persisting user data

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  joinDate: string;
}

export interface Progress {
  moduleId: string;
  completedLessons: string[];
  quizScores: Record<string, number>;
  lastAccessed: string;
}

export interface CVData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  title: string;
  summary: string;
  skills: string[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  certifications: string[];
  languages: Language[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
}

export interface Language {
  name: string;
  level: string;
}

const STORAGE_KEYS = {
  PROFILE: 'itcareer_profile',
  PROGRESS: 'itcareer_progress',
  CV_DATA: 'itcareer_cv',
  THEME: 'itcareer_theme',
  BADGES: 'itcareer_badges',
  EVALUATIONS: 'itcareer_evaluations',
} as const;

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
}

export function getProfile(): UserProfile | null {
  const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
  return data ? JSON.parse(data) : null;
}

export function saveProgress(progress: Progress[]): void {
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
}

export function getProgress(): Progress[] {
  const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  return data ? JSON.parse(data) : [];
}

export function updateModuleProgress(moduleId: string, lessonId: string): void {
  const progress = getProgress();
  let moduleProgress = progress.find(p => p.moduleId === moduleId);
  
  if (!moduleProgress) {
    moduleProgress = {
      moduleId,
      completedLessons: [],
      quizScores: {},
      lastAccessed: new Date().toISOString(),
    };
    progress.push(moduleProgress);
  }
  
  if (!moduleProgress.completedLessons.includes(lessonId)) {
    moduleProgress.completedLessons.push(lessonId);
  }
  moduleProgress.lastAccessed = new Date().toISOString();
  
  saveProgress(progress);
}

export function saveQuizScore(moduleId: string, quizId: string, score: number): void {
  const progress = getProgress();
  let moduleProgress = progress.find(p => p.moduleId === moduleId);
  
  if (!moduleProgress) {
    moduleProgress = {
      moduleId,
      completedLessons: [],
      quizScores: {},
      lastAccessed: new Date().toISOString(),
    };
    progress.push(moduleProgress);
  }
  
  moduleProgress.quizScores[quizId] = score;
  moduleProgress.lastAccessed = new Date().toISOString();
  
  saveProgress(progress);
}

export function saveCVData(cv: CVData): void {
  localStorage.setItem(STORAGE_KEYS.CV_DATA, JSON.stringify(cv));
}

export function getCVData(): CVData | null {
  const data = localStorage.getItem(STORAGE_KEYS.CV_DATA);
  return data ? JSON.parse(data) : null;
}

export function getTheme(): 'light' | 'dark' {
  const theme = localStorage.getItem(STORAGE_KEYS.THEME);
  return (theme as 'light' | 'dark') || 'dark';
}

export function setTheme(theme: 'light' | 'dark'): void {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
}

export function getBadges(): string[] {
  const data = localStorage.getItem(STORAGE_KEYS.BADGES);
  return data ? JSON.parse(data) : [];
}

export function addBadge(badge: string): void {
  const badges = getBadges();
  if (!badges.includes(badge)) {
    badges.push(badge);
    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
  }
}

export function saveEvaluation(evaluation: Record<string, unknown>): void {
  const evaluations = getEvaluations();
  evaluations.push({ ...evaluation, date: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEYS.EVALUATIONS, JSON.stringify(evaluations));
}

export function getEvaluations(): Record<string, unknown>[] {
  const data = localStorage.getItem(STORAGE_KEYS.EVALUATIONS);
  return data ? JSON.parse(data) : [];
}

export function getOverallProgress(): number {
  const progress = getProgress();
  if (progress.length === 0) return 0;
  
  const totalModules = 4;
  const totalLessonsPerModule = 5;
  const totalLessons = totalModules * totalLessonsPerModule;
  
  const completedLessons = progress.reduce(
    (acc, p) => acc + p.completedLessons.length, 0
  );
  
  return Math.round((completedLessons / totalLessons) * 100);
}

export const defaultCVData: CVData = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  github: '',
  portfolio: '',
  title: '',
  summary: '',
  skills: [],
  experiences: [],
  education: [],
  projects: [],
  certifications: [],
  languages: [{ name: 'Français', level: 'Natif' }],
};
