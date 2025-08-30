import { useState, useEffect } from 'react';

export type SimpleLanguage = 'en' | 'fr' | 'ar';

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
    'home.subtitle': 'Build CVs, cover letters, and motivation letters with AI assistance',
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
    'tools.country_subtitle': 'We\'ll recommend the best CV format for your target country',
    'tools.job_templates': 'Quick Job Templates',
    'tools.job_subtitle': 'Choose your job type to get started with professional examples',
    'tools.skill_translator': 'Skill Translator',
    'tools.skill_subtitle': 'Tell us about your job and we\'ll turn it into professional skills for your CV',
    'tools.translate_skills': 'Turn Into Professional Skills',
    'tools.translating': 'Translating to professional skills...',
    'tools.your_skills': 'Your Professional Skills:',
    'tools.search_country': 'Search for your country',
    'tools.type_country': 'Type country name...',
    'tools.perfect_selected': 'Perfect! Format Selected',
    'tools.auto_selected': 'We\'ve automatically selected the best CV format for {{country}}. You can change this later if needed.',
    'tools.template_preview': 'Template Preview:',
    'tools.sample_achievements': 'Sample Achievements:',
    'tools.starting_point': 'This template will be used as a starting point. You can customize everything in the next steps.',
    
    // CV Format Labels
    'format.basic_worker': 'Basic Worker CV',
    'format.delivery_driver': 'Delivery Driver',
    'format.waiter_service': 'Restaurant/Service',
    'format.construction_cv': 'Construction/Labor',
    'format.kitchen_helper': 'Kitchen Staff',
    'format.cleaner_cv': 'Cleaning/Maintenance',
    'format.canada_resume': 'Canada Resume',
    'format.us_resume': 'US Resume',
    'format.uk_cv': 'UK CV',
    'format.germany_cv': 'German CV',
    'format.japan_rirekisho': 'Japanese Rirekisho',
    'format.australia_resume': 'Australia Resume',
    'format.europass': 'Europass (EU)',
    'format.europe_custom': 'Europe Custom',
    'format.canada_academic': 'Canada Academic CV',
    'format.academic_cv': 'Academic CV',
    'format.creative_portfolio': 'Creative Portfolio',
    'format.tech_resume': 'Tech Resume',
    
    // Result Page
    'result.title': 'Your {{type}} is Ready!',
    'result.subtitle': 'Review your document below and export it in your preferred format',
    'result.actions': 'Actions',
    'result.edit_content': 'Edit Content',
    'result.improve_ai': 'Improve with AI',
    'result.create_new': 'Create New Document',
    'result.pro_tips': 'Pro Tips',
    
    // Review Page
    'review.title': 'AI CV Review',
    'review.subtitle': 'Get instant feedback on your existing CV and learn how to improve it',
    'review.paste_cv': 'Paste your CV text here',
    'review.review_button': 'Review My CV',
    'review.reviewing': 'AI is reviewing your CV...',
    'review.overall_score': 'Overall Score',
    'review.working_well': 'What\'s Working Well',
    'review.improvements': 'Areas for Improvement',
    'review.suggestions': 'Improvement Suggestions',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.continue': 'Continue',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.generating': 'Generating...',
    'common.perfect': 'Perfect!',
    'common.format_selected': 'Format Selected',
    
    // Buddy Mode
    'buddy.title': 'Helping someone create their CV?',
    'buddy.subtitle': 'You\'re making a real difference in someone\'s career. Let\'s build something great together!',
    'buddy.enable': 'Enable Helper Mode',
    'buddy.enabled': 'Helper Mode On',
    'buddy.tips_title': 'Helper Tips:',
    'buddy.tip1': 'Encourage them to speak about their achievements, not just duties',
    'buddy.tip2': 'Help them think of specific examples and numbers',
    'buddy.tip3': 'Remind them that every job has valuable skills',
    'buddy.tip4': 'Use the voice input feature if typing is difficult',
    'buddy.tip5': 'Take breaks and be patient - this is important work'
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
    'home.subtitle': 'Créez des CV, lettres de motivation avec l\'assistance IA',
    'home.cv_resume': 'CV / Curriculum Vitae',
    'home.cover_letter': 'Lettre de motivation',
    'home.upload_improve': 'Télécharger et améliorer',
    'home.hide_upload': 'Masquer téléchargement',
    'home.have_existing': 'Vous avez déjà un CV?',
    'home.simple_style': 'Garder simple (pour emplois quotidiens et lecture facile)',
    
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
    'export.best_for_applications': 'Le PDF est recommandé pour les candidatures',
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
    'tools.country_subtitle': 'Nous vous recommanderons le meilleur format de CV selon le pays ciblé.',
    'tools.job_templates': 'Modèles rapides de CV',
    'tools.job_subtitle': 'Choisissez votre type de poste pour commencer avec un exemple professionnel',
    'tools.skill_translator': 'Traducteur de compétences',
    'tools.skill_subtitle': 'Parlez-nous de votre travail et nous le transformerons en compétences professionnelles pour votre CV',
    'tools.translate_skills': 'Transformer en compétences professionnelles',
    'tools.translating': 'Traduction en compétences professionnelles...',
    'tools.your_skills': 'Vos compétences professionnelles :',
    'tools.search_country': 'Recherchez votre pays',
    'tools.type_country': 'Tapez le nom du pays...',
    'tools.perfect_selected': 'Parfait ! Format sélectionné',
    'tools.auto_selected': 'Nous avons automatiquement sélectionné le meilleur format de CV pour {{country}}. Vous pouvez le changer plus tard si nécessaire.',
    'tools.template_preview': 'Aperçu du modèle :',
    'tools.sample_achievements': 'Exemples de réalisations :',
    'tools.starting_point': 'Ce modèle sera utilisé comme point de départ. Vous pouvez tout personnaliser dans les étapes suivantes.',
    'tools.job_input_placeholder': 'Quel travail avez-vous fait ? (Décrivez-le simplement)',
    'tools.job_input_examples': 'ex : J\'ai nettoyé des chambres d\'hôtel, j\'ai travaillé dans une cuisine de restaurant, j\'ai livré de la nourriture',
    
    // CV Format Labels
    'format.basic_worker': 'CV de travailleur de base',
    'format.delivery_driver': 'Chauffeur-livreur',
    'format.waiter_service': 'Restauration / Service',
    'format.construction_cv': 'Ouvrier de chantier',
    'format.kitchen_helper': 'Personnel de cuisine',
    'format.cleaner_cv': 'Nettoyage / Entretien',
    'format.canada_resume': 'CV canadien',
    'format.us_resume': 'CV américain',
    'format.uk_cv': 'CV britannique',
    'format.germany_cv': 'CV allemand',
    'format.japan_rirekisho': 'Rirekisho japonais',
    'format.australia_resume': 'CV australien',
    'format.europass': 'Europass (UE)',
    'format.europe_custom': 'Format personnalisé européen',
    'format.canada_academic': 'CV académique canadien',
    'format.academic_cv': 'CV académique',
    'format.creative_portfolio': 'Portfolio créatif',
    'format.tech_resume': 'CV technique',
    
    // Buddy Mode
    'buddy.title': 'Vous aidez quelqu\'un à créer son CV?',
    'buddy.subtitle': 'Vous faites une vraie différence dans la carrière de quelqu\'un. Créons quelque chose de formidable ensemble!',
    'buddy.enable': 'Activer le mode assistant',
    'buddy.enabled': 'Mode assistant activé'
  },
  
  ar: {
    // Navigation
    'nav.blog': 'المدونة',
    'nav.review': 'مراجعة السيرة الذاتية',
    'nav.home': 'الرئيسية',
    'nav.back': 'العودة للرئيسية',
    'nav.create_another': 'إنشاء آخر',
    
    // Homepage
    'home.title': 'أنشئ مستنداتك المهنية',
    'home.subtitle': 'أنشئ السيرة الذاتية ورسائل التحفيز بمساعدة الذكاء الاصطناعي',
    'home.cv_resume': 'السيرة الذاتية',
    'home.cover_letter': 'رسالة التحفيز',
    'home.upload_improve': 'رفع وتحسين',
    'home.hide_upload': 'إخفاء الرفع',
    'home.have_existing': 'لديك سيرة ذاتية موجودة؟',
    'home.simple_style': 'اجعلها بسيطة (للوظائف اليومية والقراءة السهلة)',
    
    // Chat
    'chat.step': 'خطوة',
    'chat.of': 'من',
    'chat.skip': 'تخطي',
    'chat.generating': 'إنشاء',
    'chat.creating': 'الذكاء الاصطناعي ينشئ مستندك المهني...',
    'chat.enter_send': 'اضغط Enter للإرسال، Shift+Enter لسطر جديد',
    'chat.speak_answer': 'تحدث بإجابتك',
    'chat.listening': 'يستمع...',
    
    // Export
    'export.title': 'تصدير سيرتك الذاتية',
    'export.pdf': 'PDF',
    'export.word': 'Word',
    'export.text': 'نص',
    'export.markdown': 'Markdown', 
    'export.share_whatsapp': 'مشاركة على واتساب',
    'export.tips': 'نصائح التصدير',
    'export.best_for_applications': 'يُنصح بـ PDF للتقديمات الوظيفية',
    'export.editable_format': 'تنسيق Word يسمح بالتعديل السهل',
    'export.ats_friendly': 'جميع التنسيقات متوافقة مع ATS',
    
    // CV Formats
    'formats.choose_format': 'اختر تنسيق السيرة الذاتية',
    'formats.choose_theme': 'اختر موضوع التصدير',
    'formats.choose_language': 'اختر لغة التصدير',
    'formats.format_info': 'معلومات التنسيق',
    'formats.format_info_desc': 'كل تنسيق يتبع المعايير والتوقعات الإقليمية.',
    'formats.theme_info': 'معلومات الموضوع',
    'formats.language_info': 'الدعم اللغوي',
    
    // Helper Tools
    'tools.country_selector': 'أين تتقدم بطلب؟',
    'tools.country_subtitle': 'سنوصي بأفضل تنسيق سيرة ذاتية بناءً على البلد المستهدف.',
    'tools.job_templates': 'قوالب سيرة ذاتية سريعة',
    'tools.job_subtitle': 'اختر نوع وظيفتك لبدء مثال احترافي',
    'tools.skill_translator': 'مترجم المهارات',
    'tools.skill_subtitle': 'أخبرنا عن عملك وسنحوّله إلى مهارات احترافية لسيرتك الذاتية',
    'tools.translate_skills': 'تحويل إلى مهارات احترافية',
    'tools.translating': 'جاري التحويل إلى مهارات احترافية...',
    'tools.your_skills': 'مهاراتك الاحترافية:',
    'tools.search_country': 'ابحث عن بلدك',
    'tools.type_country': 'اكتب اسم البلد...',
    'tools.perfect_selected': 'ممتاز! تم اختيار التنسيق',
    'tools.auto_selected': 'لقد اخترنا تلقائياً أفضل تنسيق سيرة ذاتية لـ {{country}}. يمكنك تغييره لاحقاً إذا لزم الأمر.',
    'tools.template_preview': 'معاينة القالب:',
    'tools.sample_achievements': 'نماذج الإنجازات:',
    'tools.starting_point': 'سيتم استخدام هذا القالب كنقطة بداية. يمكنك تخصيص كل شيء في الخطوات التالية.',
    'tools.job_input_placeholder': 'ما الوظيفة التي قمت بها؟ (صفها ببساطة)',
    'tools.job_input_examples': 'مثال: قمت بتنظيف غرف فندق، عملت في مطبخ مطعم، قمت بتوصيل طعام',
    
    // CV Format Labels
    'format.basic_worker': 'سيرة ذاتية لعامل مبتدئ',
    'format.delivery_driver': 'سائق توصيل',
    'format.waiter_service': 'مطعم / خدمة',
    'format.construction_cv': 'عمال البناء',
    'format.kitchen_helper': 'طاقم المطبخ',
    'format.cleaner_cv': 'التنظيف / الصيانة',
    'format.canada_resume': 'السيرة الذاتية الكندية',
    'format.us_resume': 'السيرة الذاتية الأمريكية',
    'format.uk_cv': 'السيرة الذاتية البريطانية',
    'format.germany_cv': 'السيرة الذاتية الألمانية',
    'format.japan_rirekisho': 'السيرة الذاتية اليابانية (ريكيشو)',
    'format.australia_resume': 'السيرة الذاتية الأسترالية',
    'format.europass': 'يوروباس (الاتحاد الأوروبي)',
    'format.europe_custom': 'تنسيق مخصص لأوروبا',
    'format.canada_academic': 'السيرة الذاتية الأكاديمية الكندية',
    'format.academic_cv': 'السيرة الذاتية الأكاديمية',
    'format.creative_portfolio': 'محفظة إبداعية',
    'format.tech_resume': 'السيرة الذاتية التقنية',
    
    // Buddy Mode
    'buddy.title': 'تساعد شخصاً في إنشاء سيرته الذاتية؟',
    'buddy.subtitle': 'أنت تحدث فرقاً حقيقياً في مسيرة شخص ما المهنية. دعنا ننشئ شيئاً رائعاً معاً!',
    'buddy.enable': 'تفعيل وضع المساعد',
    'buddy.enabled': 'وضع المساعد مُفعل'
  }
};

export function useSimpleTranslation() {
  const [language, setLanguage] = useState<SimpleLanguage>('en');

  useEffect(() => {
    // Listen for language changes
    const handleStorageChange = () => {
      const saved = localStorage.getItem('ui_language') as SimpleLanguage;
      if (saved && ['en', 'fr', 'ar'].includes(saved)) {
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

  return { t, language, isRTL: language === 'ar' };
}