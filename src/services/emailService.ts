import emailjs from '@emailjs/browser';

// EmailJS Configuration
// To set up EmailJS:
// 1. Create account at https://www.emailjs.com/
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Replace these values with your actual IDs

const EMAILJS_CONFIG = {
  serviceId: 'service_itcareerlab', // Replace with your EmailJS service ID
  templateId: 'template_evaluation', // Replace with your EmailJS template ID
  publicKey: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
  adminEmail: 'apprentissage.csft@gmail.com',
};

// Initialize EmailJS
export const initEmailJS = () => {
  if (EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    return true;
  }
  return false;
};

export interface StudentInfo {
  firstName: string;
  lastName: string;
  email: string;
  group: string;
  specialty?: string;
}

export interface EvaluationReport {
  type: string;
  score: number;
  grade: string;
  details: string[];
  strengths: string[];
  issues: string[];
  recommendations: string[];
  atsBreakdown?: {
    keywords: number;
    structure: number;
    content: number;
    formatting: number;
  };
}

export interface ProjectSubmission {
  topic: string;
  description: string;
  fileInfo?: string;
  submittedAt: string;
}

// Send evaluation report to student and admin
export async function sendEvaluationEmail(
  student: StudentInfo,
  report: EvaluationReport
): Promise<{ success: boolean; message: string }> {
  // Check if EmailJS is configured
  if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    console.log('📧 EmailJS not configured. Email would be sent to:', student.email);
    console.log('Report:', report);
    
    // Log the email that would be sent for debugging
    logEmailContent(student, report);
    
    return {
      success: true,
      message: 'Évaluation enregistrée (email simulé - configuration EmailJS requise)',
    };
  }

  try {
    // Prepare template parameters
    const templateParams = {
      to_email: student.email,
      to_name: `${student.firstName} ${student.lastName}`,
      cc_email: EMAILJS_CONFIG.adminEmail,
      student_name: `${student.firstName} ${student.lastName}`,
      student_group: student.group,
      student_specialty: student.specialty || 'Non spécifié',
      evaluation_type: report.type,
      score: report.score,
      grade: report.grade,
      details: report.details.join('\n'),
      strengths: report.strengths.map(s => `✅ ${s}`).join('\n'),
      issues: report.issues.map(i => `⚠️ ${i}`).join('\n'),
      recommendations: report.recommendations.map(r => `💡 ${r}`).join('\n'),
      ats_keywords: report.atsBreakdown?.keywords || 'N/A',
      ats_structure: report.atsBreakdown?.structure || 'N/A',
      ats_content: report.atsBreakdown?.content || 'N/A',
      ats_formatting: report.atsBreakdown?.formatting || 'N/A',
      date: new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    // Send to student
    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    return {
      success: true,
      message: `Rapport envoyé à ${student.email}`,
    };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return {
      success: false,
      message: 'Erreur lors de l\'envoi de l\'email. Le rapport a été sauvegardé localement.',
    };
  }
}

// Send project submission confirmation
export async function sendProjectSubmissionEmail(
  student: StudentInfo,
  submission: ProjectSubmission
): Promise<{ success: boolean; message: string }> {
  if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    console.log('📧 Project submission (simulated):', {
      student,
      submission,
    });
    
    return {
      success: true,
      message: 'Projet soumis avec succès (email de confirmation simulé)',
    };
  }

  try {
    const templateParams = {
      to_email: student.email,
      cc_email: EMAILJS_CONFIG.adminEmail,
      student_name: `${student.firstName} ${student.lastName}`,
      student_group: student.group,
      student_specialty: student.specialty || 'Non spécifié',
      subject_type: 'Soumission de projet',
      project_topic: submission.topic,
      project_description: submission.description,
      file_info: submission.fileInfo || 'Aucun fichier',
      submitted_at: submission.submittedAt,
    };

    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      'template_project', // You'll need to create this template
      templateParams
    );

    return {
      success: true,
      message: 'Projet soumis ! Confirmation envoyée par email.',
    };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return {
      success: false,
      message: 'Projet enregistré mais erreur lors de l\'envoi de confirmation.',
    };
  }
}

// Log email content for debugging when EmailJS is not configured
function logEmailContent(student: StudentInfo, report: EvaluationReport) {
  const emailContent = `
═══════════════════════════════════════════════════════════════
                  IT CAREER LAB - RAPPORT D'ÉVALUATION
═══════════════════════════════════════════════════════════════

📧 Destinataire: ${student.email}
📧 Copie: ${EMAILJS_CONFIG.adminEmail}

👤 INFORMATIONS ÉTUDIANT
───────────────────────────────────────────────────────────────
Nom complet: ${student.firstName} ${student.lastName}
Groupe: ${student.group}
Spécialité: ${student.specialty || 'Non spécifié'}

📊 RÉSULTATS DE L'ÉVALUATION
───────────────────────────────────────────────────────────────
Type: ${report.type}
Score: ${report.score}% 
Note: ${report.grade}

📋 DÉTAILS
───────────────────────────────────────────────────────────────
${report.details.map(d => `• ${d}`).join('\n')}

${report.atsBreakdown ? `
📈 ANALYSE ATS DÉTAILLÉE
───────────────────────────────────────────────────────────────
• Mots-clés: ${report.atsBreakdown.keywords}%
• Structure: ${report.atsBreakdown.structure}%
• Contenu: ${report.atsBreakdown.content}%
• Mise en forme: ${report.atsBreakdown.formatting}%
` : ''}

✅ POINTS FORTS
───────────────────────────────────────────────────────────────
${report.strengths.map(s => `✓ ${s}`).join('\n')}

⚠️ POINTS À AMÉLIORER
───────────────────────────────────────────────────────────────
${report.issues.map(i => `• ${i}`).join('\n')}

💡 RECOMMANDATIONS
───────────────────────────────────────────────────────────────
${report.recommendations.map(r => `→ ${r}`).join('\n')}

───────────────────────────────────────────────────────────────
Date: ${new Date().toLocaleDateString('fr-FR')}
Généré par IT Career Lab
═══════════════════════════════════════════════════════════════
  `;

  console.log(emailContent);
}

// Alternative: Google Apps Script webhook
// If EmailJS doesn't work, you can use Google Apps Script as a fallback

export async function sendViaGoogleAppsScript(
  student: StudentInfo,
  report: EvaluationReport
): Promise<{ success: boolean; message: string }> {
  // Replace with your Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
  
  if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
    return {
      success: false,
      message: 'Google Apps Script not configured',
    };
  }

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student,
        report,
        timestamp: new Date().toISOString(),
      }),
    });

    return {
      success: true,
      message: 'Rapport envoyé via Google Apps Script',
    };
  } catch (error) {
    console.error('Google Apps Script Error:', error);
    return {
      success: false,
      message: 'Erreur lors de l\'envoi',
    };
  }
}

// FormSubmit alternative (simpler setup)
export function getFormSubmitUrl(): string {
  // FormSubmit allows email sending without server
  // Just submit a form to: https://formsubmit.co/your@email.com
  return `https://formsubmit.co/${EMAILJS_CONFIG.adminEmail}`;
}

// Export configuration status
export function isEmailConfigured(): boolean {
  return EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY';
}

/*
═══════════════════════════════════════════════════════════════
                 EMAIL SERVICE SETUP GUIDE
═══════════════════════════════════════════════════════════════

OPTION 1: EmailJS (Recommended)
────────────────────────────────
1. Go to https://www.emailjs.com/
2. Create a free account (200 emails/month free)
3. Add an Email Service:
   - Click "Add New Service"
   - Choose Gmail, Outlook, or other
   - Follow authentication steps
   
4. Create an Email Template:
   - Click "Email Templates" > "Create New Template"
   - Use these variables in your template:
     {{to_name}}
     {{student_name}}
     {{student_group}}
     {{evaluation_type}}
     {{score}}
     {{grade}}
     {{details}}
     {{strengths}}
     {{issues}}
     {{recommendations}}
     
5. Get your credentials:
   - Service ID: From Email Services page
   - Template ID: From Email Templates page
   - Public Key: From Account > API Keys
   
6. Update EMAILJS_CONFIG above with your values

────────────────────────────────
OPTION 2: Google Apps Script
────────────────────────────────
1. Go to https://script.google.com/
2. Create a new project
3. Paste this code:

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  
  MailApp.sendEmail({
    to: data.student.email,
    cc: 'apprentissage.csft@gmail.com',
    subject: `IT Career Lab - ${data.report.type}`,
    htmlBody: createEmailHtml(data)
  });
  
  return ContentService.createTextOutput('OK');
}

4. Deploy as Web App (Anyone can access)
5. Copy the URL and update GOOGLE_SCRIPT_URL above

────────────────────────────────
OPTION 3: FormSubmit
────────────────────────────────
- Simplest option, no configuration needed
- Just submit forms to formsubmit.co/your-email
- Limited customization

═══════════════════════════════════════════════════════════════
*/
