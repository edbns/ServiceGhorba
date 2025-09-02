export interface ChatPrompt {
  key: string;
  question: string;
  type?: 'text' | 'textarea' | 'array';
  placeholder?: string;
}

export const guidedCVPrompts_fr: ChatPrompt[] = [
  { 
    key: 'name', 
    question: 'Quel est votre nom complet ?',
    type: 'text',
    placeholder: 'ex., Jean Dupont'
  },
  { 
    key: 'title', 
    question: 'Quel poste ou rôle recherchez-vous ?',
    type: 'text',
    placeholder: 'ex., Ingénieur logiciel, Gestionnaire marketing'
  },
  { 
    key: 'email', 
    question: 'Quelle est votre adresse courriel ?',
    type: 'text',
    placeholder: 'ex., jean.dupont@email.com'
  },
  { 
    key: 'phone', 
    question: 'Quel est votre numéro de téléphone ?',
    type: 'text',
    placeholder: 'ex., +1 (514) 123-4567'
  },
  { 
    key: 'location', 
    question: 'Où habitez-vous actuellement (ville, pays) ?',
    type: 'text',
    placeholder: 'ex., Montréal, Canada ou Paris, France'
  },
  { 
    key: 'summary', 
    question: 'Écrivez un court résumé de vous-même (2-3 phrases).',
    type: 'textarea',
    placeholder: 'Décrivez votre parcours professionnel, vos points forts et vos objectifs de carrière...'
  },
  { 
    key: 'skills', 
    question: 'Listez vos compétences clés (séparées par des virgules).',
    type: 'textarea',
    placeholder: 'ex., JavaScript, Python, Gestion de projet, Communication, Analyse de données'
  },
  { 
    key: 'experience', 
    question: 'Décrivez votre expérience professionnelle. Vous pouvez copier votre LinkedIn.',
    type: 'textarea',
    placeholder: 'Listez chaque poste avec : Titre du poste chez Nom de l\'entreprise (Date début - Date fin), Lieu, et 2-3 points de réalisations...'
  },
  { 
    key: 'education', 
    question: 'Indiquez vos diplômes, écoles, dates.',
    type: 'textarea',
    placeholder: 'Listez les diplômes, institutions, dates d\'obtention, notes (si bonnes), et cours pertinents...'
  },
  { 
    key: 'certifications', 
    question: 'Avez-vous des certifications professionnelles ou licences ? (facultatif)',
    type: 'textarea',
    placeholder: 'ex., AWS Certified Solutions Architect, PMP, Google Analytics Certified...'
  },
  { 
    key: 'projects', 
    question: 'Des projets notables ou éléments de portfolio à mettre en avant ? (facultatif)',
    type: 'textarea',
    placeholder: 'Décrivez 2-3 projets clés avec les technologies utilisées et les résultats obtenus...'
  },
  { 
    key: 'languages', 
    question: 'Langues que vous parlez (facultatif).',
    type: 'text',
    placeholder: 'ex., Français (Langue maternelle), Anglais (Courant), Espagnol (Intermédiaire)'
  },
  { 
    key: 'extra', 
    question: 'Autre chose ? Certifications, loisirs, etc. (facultatif)',
    type: 'textarea',
    placeholder: 'ex., Liste du doyen, Articles de recherche publiés, Coordinateur bénévole...'
  }
];