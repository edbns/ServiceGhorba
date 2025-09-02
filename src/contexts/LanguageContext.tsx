import React, { createContext, useContext, useState, useEffect } from 'react';

export type UILanguage = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  language: UILanguage;
  setLanguage: (lang: UILanguage) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionaries
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
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete'
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
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.cancel': 'Annuler',
    'common.save': 'Sauvegarder',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer'
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
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<UILanguage>('en');

  const isRTL = language === 'ar';

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  // Persist language choice
  useEffect(() => {
    const savedLanguage = localStorage.getItem('ui_language') as UILanguage;
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ui_language', language);
    
    // Set document direction and language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}