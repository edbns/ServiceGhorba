export interface ChatPrompt {
  key: string;
  question: string;
  type?: 'text' | 'textarea' | 'array';
  placeholder?: string;
}

export const multilingualCVPrompts = {
  en: [
    { key: 'name', question: 'What is your full name?', type: 'text' as const, placeholder: 'e.g., John Smith' },
    { key: 'title', question: 'What job title or role are you aiming for?', type: 'text' as const, placeholder: 'e.g., Software Engineer' },
    { key: 'summary', question: 'Write a short summary of yourself (2-3 sentences).', type: 'textarea' as const, placeholder: 'Describe your background...' },
    { key: 'skills', question: 'List your key skills (comma-separated).', type: 'textarea' as const, placeholder: 'e.g., JavaScript, Communication' },
    { key: 'experience', question: 'Describe your work experience. You can copy from LinkedIn.', type: 'textarea' as const, placeholder: 'List your work experience...' },
    { key: 'education', question: 'List your education, school names, degrees and dates.', type: 'textarea' as const, placeholder: 'List your education...' },
    { key: 'languages', question: 'Languages you speak (optional).', type: 'text' as const, placeholder: 'e.g., English, Spanish' },
    { key: 'extra', question: 'Anything else? Certifications, hobbies, etc. (optional)', type: 'textarea' as const, placeholder: 'Additional information...' },
  ],
  fr: [
    { key: 'name', question: 'Quel est votre nom complet ?', type: 'text' as const, placeholder: 'ex., Jean Dupont' },
    { key: 'title', question: 'Quel poste visez-vous ?', type: 'text' as const, placeholder: 'ex., Ingénieur logiciel' },
    { key: 'summary', question: 'Écrivez un court résumé de vous-même (2-3 phrases).', type: 'textarea' as const, placeholder: 'Décrivez votre parcours...' },
    { key: 'skills', question: 'Listez vos compétences clés (séparées par des virgules).', type: 'textarea' as const, placeholder: 'ex., JavaScript, Communication' },
    { key: 'experience', question: 'Décrivez votre expérience professionnelle.', type: 'textarea' as const, placeholder: 'Listez votre expérience...' },
    { key: 'education', question: 'Indiquez vos diplômes et établissements.', type: 'textarea' as const, placeholder: 'Listez vos diplômes...' },
    { key: 'languages', question: 'Langues parlées (optionnel).', type: 'text' as const, placeholder: 'ex., Français, Anglais' },
    { key: 'extra', question: 'Autre chose ? Certifications, loisirs... (optionnel)', type: 'textarea' as const, placeholder: 'Informations supplémentaires...' },
  ]
};