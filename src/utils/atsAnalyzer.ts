import { CVData } from './storage';
import { atsKeywords } from '../data/courses';

export interface ATSResult {
  score: number;
  breakdown: {
    keywords: number;
    structure: number;
    content: number;
    formatting: number;
  };
  issues: ATSIssue[];
  recommendations: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
}

export interface ATSIssue {
  type: 'error' | 'warning' | 'info';
  category: string;
  message: string;
}

export function analyzeCV(cv: CVData, targetJob: string): ATSResult {
  const issues: ATSIssue[] = [];
  const recommendations: string[] = [];
  const strengths: string[] = [];
  
  // Get target keywords
  const targetKeywords = atsKeywords[targetJob] || atsKeywords['dev-web'];
  
  // Combine all CV text for keyword matching
  const cvText = [
    cv.fullName,
    cv.title,
    cv.summary,
    ...cv.skills,
    ...cv.experiences.flatMap(e => [e.title, e.company, ...e.bullets]),
    ...cv.education.map(e => `${e.degree} ${e.school}`),
    ...cv.projects.flatMap(p => [p.name, p.description, ...p.technologies]),
    ...cv.certifications,
  ].join(' ').toLowerCase();
  
  // 1. Keyword Analysis (40% of score)
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];
  
  targetKeywords.forEach(keyword => {
    if (cvText.includes(keyword.toLowerCase())) {
      matchedKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });
  
  const keywordScore = Math.round((matchedKeywords.length / targetKeywords.length) * 100);
  
  if (keywordScore < 40) {
    issues.push({
      type: 'error',
      category: 'Mots-clés',
      message: `Seulement ${matchedKeywords.length}/${targetKeywords.length} mots-clés trouvés. Ajoutez les technologies manquantes.`
    });
  } else if (keywordScore < 70) {
    issues.push({
      type: 'warning',
      category: 'Mots-clés',
      message: `${matchedKeywords.length}/${targetKeywords.length} mots-clés trouvés. Vous pouvez encore améliorer.`
    });
  } else {
    strengths.push(`Excellente couverture des mots-clés : ${matchedKeywords.length}/${targetKeywords.length}`);
  }
  
  // 2. Structure Analysis (25% of score)
  let structureScore = 100;
  
  if (!cv.fullName) {
    issues.push({ type: 'error', category: 'Structure', message: 'Nom complet manquant.' });
    structureScore -= 20;
  }
  if (!cv.email) {
    issues.push({ type: 'error', category: 'Structure', message: 'Email manquant.' });
    structureScore -= 20;
  }
  if (!cv.phone) {
    issues.push({ type: 'warning', category: 'Structure', message: 'Numéro de téléphone manquant.' });
    structureScore -= 10;
  }
  if (!cv.title) {
    issues.push({ type: 'error', category: 'Structure', message: 'Titre professionnel manquant.' });
    structureScore -= 15;
  }
  if (!cv.summary || cv.summary.length < 50) {
    issues.push({ type: 'warning', category: 'Structure', message: 'Résumé professionnel trop court (min. 50 caractères).' });
    structureScore -= 10;
  }
  if (cv.experiences.length === 0) {
    issues.push({ type: 'warning', category: 'Structure', message: 'Aucune expérience professionnelle ajoutée.' });
    structureScore -= 15;
  }
  if (cv.education.length === 0) {
    issues.push({ type: 'warning', category: 'Structure', message: 'Aucune formation ajoutée.' });
    structureScore -= 10;
  }
  
  if (cv.linkedin) strengths.push('Profil LinkedIn ajouté');
  if (cv.github) strengths.push('Profil GitHub ajouté');
  if (cv.portfolio) strengths.push('Portfolio en ligne ajouté');
  
  structureScore = Math.max(0, structureScore);
  
  // 3. Content Quality (20% of score)
  let contentScore = 100;
  
  if (cv.skills.length < 5) {
    issues.push({ type: 'warning', category: 'Contenu', message: `Seulement ${cv.skills.length} compétences. Ajoutez-en au moins 10.` });
    contentScore -= 20;
  } else if (cv.skills.length >= 10) {
    strengths.push(`${cv.skills.length} compétences listées`);
  }
  
  // Check for quantified results in experience bullets
  const hasNumbers = cv.experiences.some(exp => 
    exp.bullets.some(b => /\d+/.test(b))
  );
  if (!hasNumbers && cv.experiences.length > 0) {
    issues.push({ type: 'warning', category: 'Contenu', message: 'Ajoutez des résultats chiffrés dans vos expériences (%, €, utilisateurs).' });
    contentScore -= 15;
  } else if (hasNumbers) {
    strengths.push('Résultats chiffrés dans les expériences');
  }
  
  if (cv.projects.length === 0) {
    issues.push({ type: 'info', category: 'Contenu', message: 'Ajoutez des projets personnels pour renforcer votre profil.' });
    contentScore -= 10;
  } else {
    strengths.push(`${cv.projects.length} projet(s) personnel(s) ajouté(s)`);
  }
  
  if (cv.certifications.length > 0) {
    strengths.push(`${cv.certifications.length} certification(s) ajoutée(s)`);
  } else {
    recommendations.push('Ajoutez des certifications pertinentes (AWS, CCNA, etc.)');
  }
  
  if (cv.summary && cv.summary.length > 200) {
    issues.push({ type: 'info', category: 'Contenu', message: 'Résumé professionnel un peu long. Visez 100-200 caractères.' });
    contentScore -= 5;
  }
  
  contentScore = Math.max(0, contentScore);
  
  // 4. Formatting Score (15% of score)
  let formattingScore = 100;
  
  // Check for consistency
  const emptyBullets = cv.experiences.filter(e => e.bullets.length === 0 || e.bullets.every(b => !b.trim()));
  if (emptyBullets.length > 0) {
    issues.push({ type: 'warning', category: 'Mise en forme', message: `${emptyBullets.length} expérience(s) sans descriptions détaillées.` });
    formattingScore -= 15;
  }
  
  if (cv.languages.length === 0) {
    issues.push({ type: 'info', category: 'Mise en forme', message: 'Section langues vide. Ajoutez au minimum le français et l\'anglais.' });
    formattingScore -= 10;
  }
  
  formattingScore = Math.max(0, formattingScore);
  
  // Calculate final score
  const score = Math.round(
    (keywordScore * 0.4) +
    (structureScore * 0.25) +
    (contentScore * 0.2) +
    (formattingScore * 0.15)
  );
  
  // Generate recommendations
  if (missingKeywords.length > 0) {
    const top5Missing = missingKeywords.slice(0, 5);
    recommendations.push(`Ajoutez ces mots-clés importants : ${top5Missing.join(', ')}`);
  }
  if (!cv.linkedin) recommendations.push('Ajoutez votre profil LinkedIn');
  if (!cv.github) recommendations.push('Ajoutez votre profil GitHub');
  if (cv.experiences.length < 2) recommendations.push('Ajoutez plus d\'expériences professionnelles ou de stages');
  if (cv.skills.length < 10) recommendations.push('Complétez votre liste de compétences (visez 10-15)');
  if (!hasNumbers) recommendations.push('Quantifiez vos réalisations avec des chiffres');
  
  return {
    score: Math.min(100, Math.max(0, score)),
    breakdown: {
      keywords: keywordScore,
      structure: structureScore,
      content: contentScore,
      formatting: formattingScore,
    },
    issues,
    recommendations,
    matchedKeywords,
    missingKeywords,
    strengths,
  };
}
