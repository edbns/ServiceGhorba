import { useState, useEffect } from 'react';

export type SimpleLanguage = 'en' | 'fr';

const translations = {
  en: {
    // Navigation
    'nav.blog': 'Blog',
    'nav.review': 'Review CV',
    'nav.home': 'Home',
    'nav.back': 'Back to Home',
    'nav.create_another': 'Create Another',
    
    // Homepage
    'home.title': 'Create Your Professional Documents',
    'home.cv_resume': 'CV / Resume',
    'home.cover_letter': 'Cover Letter',
    'home.upload_improve': 'Upload & Improve',
    'home.hide_upload': 'Hide Upload',
    'home.have_existing': 'Have an existing CV?',
    'home.simple_style': 'Keep it simple (for everyday jobs and easy reading)',
    
    // Chat
    'chat.step': 'Step',
    'chat.of': 'of',
    'chat.skip': 'Skip',
    'chat.generating': 'Generating your',
    'chat.creating': 'Our AI is crafting your professional document...',
    'chat.enter_send': 'Press Enter to send, Shift+Enter for new line',
    'chat.speak_answer': 'Speak your answer',
    'chat.listening': 'Listening...',
    
    // Export
    'export.title': 'Export Your CV',
    'export.pdf': 'PDF',
    'export.word': 'Word', 
    'export.text': 'Text',
    'export.markdown': 'Markdown',
    'export.share_whatsapp': 'Share on WhatsApp',
    'export.tips': 'Export Tips',
    'export.best_for_applications': 'PDF is recommended for job applications',
    'export.editable_format': 'Word format allows for easy editing',
    'export.ats_friendly': 'All formats are ATS-friendly',
    
    // CV Formats
    'formats.choose_format': 'Choose CV Format',
    'formats.choose_theme': 'Choose Export Theme',
    'formats.choose_language': 'Choose Export Language',
    'formats.format_info': 'Format Information',
    'formats.format_info_desc': 'Each format follows regional standards and expectations.',
    'formats.theme_info': 'Theme Information',
    'formats.language_info': 'Language Support',
    
    // Helper Tools
    'tools.country_selector': 'Where are you applying?',
    'tools.job_templates': 'Quick Job Templates',
    'tools.skill_translator': 'Skill Translator',
    'tools.translate_skills': 'Convert to Professional Skills',
    'tools.translating': 'Converting to professional skills...',
    'tools.your_skills': 'Your Professional Skills:',
    'tools.search_country': 'Search your country',
    'tools.type_country': 'Type country name...',
    'tools.perfect_selected': 'Perfect! Format selected',
    'tools.auto_selected': 'We\'ve automatically selected the best CV format for {{country}}. You can change it later if needed.',
    'tools.template_preview': 'Template Preview:',
    'tools.sample_achievements': 'Sample Achievements:',
    'tools.starting_point': 'This template will be used as a starting point. You can customize everything in the next steps.',
    'tools.job_input_placeholder': 'What job did you do? (describe it simply)',
    'tools.job_input_examples': 'Example: I cleaned hotel rooms, worked in restaurant kitchen, delivered food',
    
    // CV Format Labels
    'format.basic_worker': 'Basic Worker CV',
    'format.delivery_driver': 'Delivery Driver',
    'format.waiter_service': 'Restaurant / Service',
    'format.construction_cv': 'Construction Worker',
    'format.kitchen_helper': 'Kitchen Staff',
    'format.cleaner_cv': 'Cleaning / Maintenance',
    'format.canada_resume': 'Canadian Resume',
    'format.us_resume': 'US Resume',
    'format.uk_cv': 'UK CV',
    'format.germany_cv': 'German CV',
    'format.japan_rirekisho': 'Japanese Resume (Rirekisho)',
    'format.australia_resume': 'Australian Resume',
    'format.europass': 'Europass (EU)',
    'format.europe_custom': 'European Custom',
    'format.canada_academic': 'Canadian Academic CV',
    'format.academic_cv': 'Academic CV',
    'format.creative_portfolio': 'Creative Portfolio',
    'format.tech_resume': 'Tech Resume',
    
    // Job Templates
    'job.waiter': 'Waiter/Waitress',
    'job.construction': 'Construction Worker',
    'job.delivery': 'Delivery Driver',
    'job.cleaner': 'Cleaner',
    'job.kitchen': 'Kitchen Helper',
    'job.retail': 'Sales/Customer Service',
    'job.security': 'Security Guard',
    'job.warehouse': 'Warehouse Worker',
    
    // Buddy Mode
    'buddy.title': 'Helping someone create their CV?',
    'buddy.enable': 'Enable Helper Mode',
    'buddy.enabled': 'Helper Mode Enabled',
    
    // CV Review
    'review.title': 'AI CV Review',
    'review.subtitle': 'Get instant feedback on your existing CV and learn how to improve it',
    'review.description': 'Paste your existing CV and get AI-powered feedback to improve it',
    'review.paste_placeholder': 'Paste your CV text here',
    'review.paste_description': 'Copy and paste your CV content here...',
    'review.button': 'Review My CV',
    'review.what_reviews': 'What Our AI Reviews',
    'review.content_quality': 'Content Quality',
    'review.content_summary': '• Professional summary strength',
    'review.content_achievements': '• Achievement vs. duty statements',
    'review.content_metrics': '• Quantifiable results and metrics',
    'review.content_keywords': '• Industry-relevant keywords',
    'review.structure_format': 'Structure & Format',
    'review.structure_organization': '• Proper section organization',
    'review.structure_length': '• Appropriate length and spacing',
    'review.structure_ats': '• ATS-friendly formatting',
    'review.structure_regional': '• Regional compliance',
    'review.create_new': 'Want to create a new CV instead?',
    'review.create_new_button': 'Create New CV',
    'review.upload_improve': 'Upload & Improve'
  },
  
  fr: {
    // Navigation
    'nav.blog': 'Blog',
    'nav.review': 'Réviser CV',
    'nav.home': 'Accueil',
    'nav.back': 'Retour à l\'accueil',
    'nav.create_another': 'Créer un autre',
    
    // Homepage
    'home.title': 'Créez vos documents professionnels',
    'home.cv_resume': 'CV / Curriculum Vitae',
    'home.cover_letter': 'Lettre de motivation',
    'home.upload_improve': 'Télécharger et améliorer',
    'home.hide_upload': 'Masquer le téléchargement',
    'home.have_existing': 'Vous avez déjà un CV?',
    'home.simple_style': 'Garder simple (pour les emplois quotidiens et la lecture facile)',
    
    // Chat
    'chat.step': 'Étape',
    'chat.of': 'de',
    'chat.skip': 'Passer',
    'chat.generating': 'Génération de votre',
    'chat.creating': 'Notre IA crée votre document professionnel...',
    'chat.enter_send': 'Appuyez sur Entrée pour envoyer, Maj+Entrée pour nouvelle ligne',
    'chat.speak_answer': 'Parlez votre réponse',
    'chat.listening': 'Écoute...',
    
    // Export
    'export.title': 'Exporter votre CV',
    'export.pdf': 'PDF',
    'export.word': 'Word',
    'export.text': 'Texte',
    'export.markdown': 'Markdown',
    'export.share_whatsapp': 'Partager sur WhatsApp',
    'export.tips': 'Conseils d\'exportation',
    'export.best_for_applications': 'PDF est recommandé pour les candidatures',
    'export.editable_format': 'Le format Word permet une édition facile',
    'export.ats_friendly': 'Tous les formats sont compatibles ATS',
    
    // CV Formats
    'formats.choose_format': 'Choisir le format CV',
    'formats.choose_theme': 'Choisir le thème d\'exportation',
    'formats.choose_language': 'Choisir la langue d\'exportation',
    'formats.format_info': 'Informations sur le format',
    'formats.format_info_desc': 'Chaque format suit les normes et attentes régionales.',
    'formats.theme_info': 'Informations sur le thème',
    'formats.language_info': 'Support linguistique',
    
    // Helper Tools
    'tools.country_selector': 'Où postulez-vous ?',
    'tools.job_templates': 'Modèles rapides de CV',
    'tools.skill_translator': 'Traducteur de compétences',
    'tools.translate_skills': 'Convertir en compétences professionnelles',
    'tools.translating': 'Conversion en compétences professionnelles...',
    'tools.your_skills': 'Vos compétences professionnelles:',
    'tools.search_country': 'Recherchez votre pays',
    'tools.type_country': 'Tapez le nom du pays...',
    'tools.perfect_selected': 'Parfait! Format sélectionné',
    'tools.auto_selected': 'Nous avons automatiquement sélectionné le meilleur format de CV pour {{country}}. Vous pouvez le changer plus tard si nécessaire.',
    'tools.template_preview': 'Aperçu du modèle:',
    'tools.sample_achievements': 'Exemples de réalisations:',
    'tools.starting_point': 'Ce modèle sera utilisé comme point de départ. Vous pouvez tout personnaliser dans les étapes suivantes.',
    'tools.job_input_placeholder': 'Quel travail avez-vous fait? (décrivez-le simplement)',
    'tools.job_input_examples': 'Exemple: J\'ai nettoyé des chambres d\'hôtel, travaillé dans une cuisine de restaurant, livré de la nourriture',
    
    // CV Format Labels
    'format.basic_worker': 'CV de travailleur de base',
    'format.delivery_driver': 'Chauffeur-livreur',
    'format.waiter_service': 'Restauration / Service',
    'format.construction_cv': 'Ouvrier du bâtiment',
    'format.kitchen_helper': 'Personnel de cuisine',
    'format.cleaner_cv': 'Nettoyage / Maintenance',
    'format.canada_resume': 'CV canadien',
    'format.us_resume': 'CV américain',
    'format.uk_cv': 'CV britannique',
    'format.germany_cv': 'CV allemand',
    'format.japan_rirekisho': 'CV japonais (Rirekisho)',
    'format.australia_resume': 'CV australien',
    'format.europass': 'Europass (UE)',
    'format.europe_custom': 'Européen personnalisé',
    'format.canada_academic': 'CV académique canadien',
    'format.academic_cv': 'CV académique',
    'format.creative_portfolio': 'Portfolio créatif',
    'format.tech_resume': 'CV technique',
    
    // Job Templates
    'job.waiter': 'Serveur/Serveuse',
    'job.construction': 'Ouvrier du bâtiment',
    'job.delivery': 'Chauffeur-livreur',
    'job.cleaner': 'Agent de nettoyage',
    'job.kitchen': 'Aide de cuisine',
    'job.retail': 'Ventes/Service client',
    'job.security': 'Agent de sécurité',
    'job.warehouse': 'Ouvrier d\'entrepôt',
    
    // Buddy Mode
    'buddy.title': 'Vous aidez quelqu\'un à créer son CV?',
    'buddy.enable': 'Activer le mode assistant',
    'buddy.enabled': 'Mode assistant activé',
    
    // CV Review
    'review.title': 'Relecture de CV par l\'IA',
    'review.subtitle': 'Obtenez un retour immédiat sur votre CV actuel et découvrez comment l\'améliorer',
    'review.description': 'Collez votre CV existant et recevez une analyse assistée par l\'IA pour l\'améliorer',
    'review.paste_placeholder': 'Collez le texte de votre CV ici',
    'review.paste_description': 'Copiez et collez ici le contenu de votre CV...',
    'review.button': 'Analyser mon CV',
    'review.what_reviews': 'Ce que notre IA analyse',
    'review.content_quality': 'Qualité du contenu',
    'review.content_summary': '• Pertinence du résumé professionnel',
    'review.content_achievements': '• Réalisations vs. simples descriptions de tâches',
    'review.content_metrics': '• Résultats chiffrés et mesurables',
    'review.content_keywords': '• Mots-clés adaptés au secteur',
    'review.structure_format': 'Structure et mise en forme',
    'review.structure_organization': '• Organisation correcte des sections',
    'review.structure_length': '• Longueur et espacement appropriés',
    'review.structure_ats': '• Format compatible avec les ATS',
    'review.structure_regional': '• Conformité avec les normes régionales',
    'review.create_new': 'Vous préférez créer un nouveau CV ?',
    'review.create_new_button': 'Créer un nouveau CV',
    'review.upload_improve': 'Télécharger & Améliorer'
  }
};

export function useSimpleTranslation() {
  const [language, setLanguage] = useState<SimpleLanguage>('en');

  useEffect(() => {
    // Listen for language changes
    const handleStorageChange = () => {
      const saved = localStorage.getItem('ui_language') as SimpleLanguage;
      if (saved && ['en', 'fr'].includes(saved)) {
        setLanguage(saved);
      }
    };

    // Initial load
    handleStorageChange();

    // Listen for changes
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab language changes
    window.addEventListener('languageChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('languageChange', handleStorageChange);
    };
  }, []);

  const t = (key: string): string => {
    const translation = translations[language];
    return translation[key as keyof typeof translation] || key;
  };

  return { t, language, isRTL: false };
}