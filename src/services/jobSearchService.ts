// Job Search Service using free public APIs
// Compatible with GitHub Pages (client-side only)

export interface JobListing {
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

export interface JobSearchParams {
  query: string;
  location?: string;
  remote?: boolean;
  category?: string;
  page?: number;
}

export interface JobSearchResult {
  jobs: JobListing[];
  totalCount: number;
  page: number;
  hasMore: boolean;
  source: string;
}

// Himalayas API - Free Remote Jobs API
const HIMALAYAS_API = 'https://himalayas.app/jobs/api';

// Arbeitnow API - Free European Jobs API  
const ARBEITNOW_API = 'https://www.arbeitnow.com/api/job-board-api';

// RemoteOK API (via proxy or direct if CORS allows)
// Note: RemoteOK requires CORS proxy for browser access
// const REMOTEOK_API = 'https://remoteok.com/api';

// Search jobs from Himalayas API
export async function searchHimalayasJobs(params: JobSearchParams): Promise<JobSearchResult> {
  try {
    const url = new URL(`${HIMALAYAS_API}/search`);
    if (params.query) url.searchParams.set('q', params.query);
    if (params.remote) url.searchParams.set('worldwide', 'true');
    if (params.page) url.searchParams.set('page', params.page.toString());
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Himalayas API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    const jobs: JobListing[] = (data.jobs || []).map((job: Record<string, unknown>) => ({
      id: `himalaya-${job.guid || Math.random().toString(36)}`,
      title: job.title as string || 'Untitled Position',
      company: job.companyName as string || 'Unknown Company',
      companyLogo: job.companyLogo as string || undefined,
      location: Array.isArray(job.locationRestrictions) && job.locationRestrictions.length > 0 
        ? (job.locationRestrictions as string[]).join(', ') 
        : 'Remote',
      remote: true,
      salary: job.minSalary && job.maxSalary 
        ? `${job.minSalary}${job.currency || ''} - ${job.maxSalary}${job.currency || ''}` 
        : undefined,
      description: (job.excerpt as string || '').substring(0, 300) + '...',
      technologies: (job.categories as string[]) || [],
      url: job.applicationLink as string || `https://himalayas.app/jobs/${job.companySlug}/${job.guid}`,
      postedAt: job.pubDate as string || new Date().toISOString(),
      source: 'Himalayas',
    }));
    
    return {
      jobs,
      totalCount: data.totalCount || jobs.length,
      page: params.page || 1,
      hasMore: jobs.length === 20,
      source: 'Himalayas',
    };
  } catch (error) {
    console.error('Himalayas API error:', error);
    return { jobs: [], totalCount: 0, page: 1, hasMore: false, source: 'Himalayas' };
  }
}

// Search jobs from Arbeitnow API
export async function searchArbeitnowJobs(params: JobSearchParams): Promise<JobSearchResult> {
  try {
    const url = new URL(ARBEITNOW_API);
    if (params.page) url.searchParams.set('page', params.page.toString());
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Arbeitnow API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter by query if provided
    let filteredJobs = data.data || [];
    if (params.query) {
      const query = params.query.toLowerCase();
      filteredJobs = filteredJobs.filter((job: Record<string, unknown>) => 
        (job.title as string)?.toLowerCase().includes(query) ||
        (job.description as string)?.toLowerCase().includes(query) ||
        (job.company_name as string)?.toLowerCase().includes(query) ||
        (Array.isArray(job.tags) && (job.tags as string[]).some((t: string) => t.toLowerCase().includes(query)))
      );
    }
    
    // Filter for remote if specified
    if (params.remote) {
      filteredJobs = filteredJobs.filter((job: Record<string, unknown>) => job.remote === true);
    }
    
    const jobs: JobListing[] = filteredJobs.slice(0, 20).map((job: Record<string, unknown>) => ({
      id: `arbeitnow-${job.slug || Math.random().toString(36)}`,
      title: job.title as string || 'Untitled Position',
      company: job.company_name as string || 'Unknown Company',
      companyLogo: undefined,
      location: job.location as string || (job.remote ? 'Remote' : 'Europe'),
      remote: Boolean(job.remote),
      salary: undefined,
      description: ((job.description as string) || '').replace(/<[^>]*>/g, '').substring(0, 300) + '...',
      technologies: (job.tags as string[]) || [],
      url: job.url as string || '#',
      postedAt: job.created_at as string || new Date().toISOString(),
      source: 'Arbeitnow',
    }));
    
    return {
      jobs,
      totalCount: data.meta?.total || jobs.length,
      page: params.page || 1,
      hasMore: data.links?.next !== null,
      source: 'Arbeitnow',
    };
  } catch (error) {
    console.error('Arbeitnow API error:', error);
    return { jobs: [], totalCount: 0, page: 1, hasMore: false, source: 'Arbeitnow' };
  }
}

// Aggregate search from multiple sources
export async function searchAllJobs(params: JobSearchParams): Promise<JobSearchResult> {
  const results = await Promise.allSettled([
    searchHimalayasJobs(params),
    searchArbeitnowJobs(params),
  ]);
  
  const allJobs: JobListing[] = [];
  
  results.forEach(result => {
    if (result.status === 'fulfilled' && result.value.jobs) {
      allJobs.push(...result.value.jobs);
    }
  });
  
  // Sort by date (newest first)
  allJobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
  
  return {
    jobs: allJobs,
    totalCount: allJobs.length,
    page: params.page || 1,
    hasMore: allJobs.length >= 20,
    source: 'Multiple',
  };
}

// Calculate profile match score
export function calculateMatchScore(
  job: JobListing,
  userSkills: string[],
  userExperience: string
): number {
  if (userSkills.length === 0) return 50; // Default score
  
  const normalizedUserSkills = userSkills.map(s => s.toLowerCase().trim());
  const jobTechsLower = job.technologies.map(t => t.toLowerCase().trim());
  const jobTitleLower = job.title.toLowerCase();
  const jobDescLower = job.description.toLowerCase();
  
  let matchCount = 0;
  let totalWeight = 0;
  
  normalizedUserSkills.forEach(skill => {
    const weight = skill.length > 2 ? 2 : 1; // Longer skills weighted more
    totalWeight += weight;
    
    if (
      jobTechsLower.some(t => t.includes(skill) || skill.includes(t)) ||
      jobTitleLower.includes(skill) ||
      jobDescLower.includes(skill)
    ) {
      matchCount += weight;
    }
  });
  
  // Base score from skill match
  let score = totalWeight > 0 ? Math.round((matchCount / totalWeight) * 70) : 35;
  
  // Bonus for experience match
  const expKeywords: Record<string, string[]> = {
    junior: ['junior', 'entry', 'graduate', 'débutant', 'stage', 'intern'],
    mid: ['mid', 'intermédiaire', '2-3', '3-5'],
    senior: ['senior', 'lead', 'principal', 'staff', 'architect', '5+'],
  };
  
  const jobTextFull = `${job.title} ${job.description}`.toLowerCase();
  const userExpLower = userExperience.toLowerCase();
  
  if (expKeywords[userExpLower]?.some(k => jobTextFull.includes(k))) {
    score += 15;
  }
  
  // Cap at 100
  return Math.min(100, Math.max(20, score));
}

// Generate application tips based on job
export function generateApplicationTips(job: JobListing, userSkills: string[]): string[] {
  const tips: string[] = [];
  
  const missingTechs = job.technologies.filter(
    t => !userSkills.some(s => s.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(s.toLowerCase()))
  );
  
  if (missingTechs.length > 0) {
    tips.push(`Mentionnez votre intérêt pour ${missingTechs.slice(0, 3).join(', ')} même si vous débutez`);
  }
  
  if (job.remote) {
    tips.push('Mettez en avant votre expérience en travail remote et vos compétences de communication async');
  }
  
  if (job.company) {
    tips.push(`Recherchez ${job.company} et personnalisez votre lettre de motivation`);
  }
  
  tips.push('Adaptez votre CV aux mots-clés de cette offre');
  tips.push('Préparez des exemples de projets pertinents à présenter');
  
  return tips;
}

// Mock data for fallback/demo
export const mockJobs: JobListing[] = [
  {
    id: 'mock-1',
    title: 'Développeur Full Stack React/Node.js',
    company: 'TechStartup SAS',
    location: 'Paris, France (Hybride)',
    remote: true,
    salary: '45K - 55K €',
    description: 'Nous recherchons un développeur Full Stack passionné pour rejoindre notre équipe produit. Vous travaillerez sur notre plateforme SaaS utilisée par des milliers de clients...',
    technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    url: '#',
    postedAt: new Date().toISOString(),
    source: 'Demo',
  },
  {
    id: 'mock-2',
    title: 'DevOps Engineer',
    company: 'CloudScale Inc',
    location: 'Remote (Europe)',
    remote: true,
    salary: '55K - 70K €',
    description: 'Join our infrastructure team to build and maintain scalable cloud solutions. Experience with AWS, Kubernetes, and Terraform required...',
    technologies: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'CI/CD'],
    url: '#',
    postedAt: new Date(Date.now() - 86400000).toISOString(),
    source: 'Demo',
  },
  {
    id: 'mock-3',
    title: 'Frontend Developer Vue.js',
    company: 'DigitalAgency',
    location: 'Lyon, France',
    remote: false,
    salary: '38K - 48K €',
    description: 'Agence digitale recherche un développeur frontend pour créer des interfaces utilisateur modernes et réactives...',
    technologies: ['Vue.js', 'TypeScript', 'TailwindCSS', 'Nuxt.js'],
    url: '#',
    postedAt: new Date(Date.now() - 172800000).toISOString(),
    source: 'Demo',
  },
  {
    id: 'mock-4',
    title: 'Cybersecurity Analyst',
    company: 'SecureTech',
    location: 'Remote',
    remote: true,
    salary: '50K - 65K €',
    description: 'Looking for a security analyst to join our SOC team. You will monitor, detect, and respond to security incidents...',
    technologies: ['SIEM', 'Splunk', 'Python', 'Network Security', 'Threat Intelligence'],
    url: '#',
    postedAt: new Date(Date.now() - 259200000).toISOString(),
    source: 'Demo',
  },
  {
    id: 'mock-5',
    title: 'Administrateur Réseaux & Systèmes',
    company: 'EnterpriseCorp',
    location: 'Marseille, France',
    remote: false,
    salary: '35K - 45K €',
    description: 'Recherche administrateur systèmes pour gérer notre infrastructure on-premise et cloud. Cisco, Windows Server, VMware...',
    technologies: ['Cisco', 'Windows Server', 'VMware', 'Active Directory', 'Linux'],
    url: '#',
    postedAt: new Date(Date.now() - 345600000).toISOString(),
    source: 'Demo',
  },
  {
    id: 'mock-6',
    title: 'Data Engineer',
    company: 'DataDriven',
    location: 'Remote (Worldwide)',
    remote: true,
    salary: '60K - 80K €',
    description: 'Build and maintain data pipelines for our analytics platform. Experience with Python, Spark, and cloud data services required...',
    technologies: ['Python', 'Apache Spark', 'AWS', 'Airflow', 'SQL'],
    url: '#',
    postedAt: new Date(Date.now() - 432000000).toISOString(),
    source: 'Demo',
  },
];

// Search with fallback to mock data
export async function searchJobsWithFallback(params: JobSearchParams): Promise<JobSearchResult> {
  try {
    const result = await searchAllJobs(params);
    
    if (result.jobs.length > 0) {
      return result;
    }
    
    // Fallback to mock data
    let filteredMock = [...mockJobs];
    
    if (params.query) {
      const query = params.query.toLowerCase();
      filteredMock = filteredMock.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.technologies.some(t => t.toLowerCase().includes(query)) ||
        job.description.toLowerCase().includes(query)
      );
    }
    
    if (params.remote) {
      filteredMock = filteredMock.filter(job => job.remote);
    }
    
    return {
      jobs: filteredMock,
      totalCount: filteredMock.length,
      page: 1,
      hasMore: false,
      source: 'Demo (APIs indisponibles)',
    };
  } catch {
    // Return mock data on any error
    return {
      jobs: mockJobs,
      totalCount: mockJobs.length,
      page: 1,
      hasMore: false,
      source: 'Demo (Erreur de connexion)',
    };
  }
}

// Job categories for filtering
export const jobCategories = [
  { id: 'frontend', label: 'Frontend', keywords: ['react', 'vue', 'angular', 'frontend', 'front-end', 'javascript', 'typescript'] },
  { id: 'backend', label: 'Backend', keywords: ['node', 'python', 'java', 'backend', 'back-end', 'api', 'server'] },
  { id: 'fullstack', label: 'Full Stack', keywords: ['fullstack', 'full-stack', 'full stack'] },
  { id: 'devops', label: 'DevOps', keywords: ['devops', 'sre', 'infrastructure', 'kubernetes', 'docker', 'ci/cd'] },
  { id: 'data', label: 'Data / ML', keywords: ['data', 'machine learning', 'ml', 'ai', 'analytics', 'scientist'] },
  { id: 'security', label: 'Cybersécurité', keywords: ['security', 'cybersecurity', 'soc', 'pentester', 'sécurité'] },
  { id: 'mobile', label: 'Mobile', keywords: ['mobile', 'ios', 'android', 'react native', 'flutter'] },
  { id: 'cloud', label: 'Cloud', keywords: ['cloud', 'aws', 'azure', 'gcp', 'architect'] },
];
