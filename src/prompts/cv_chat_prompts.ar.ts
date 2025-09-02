export interface ChatPrompt {
  key: string;
  question: string;
  type?: 'text' | 'textarea' | 'array';
  placeholder?: string;
}

export const guidedCVPrompts_ar: ChatPrompt[] = [
  { 
    key: 'name', 
    question: 'ما هو اسمك الكامل؟',
    type: 'text',
    placeholder: 'مثال، أحمد محمد'
  },
  { 
    key: 'title', 
    question: 'ما الوظيفة أو الدور الذي تستهدفه؟',
    type: 'text',
    placeholder: 'مثال، مهندس برمجيات، مدير تسويق'
  },
  { 
    key: 'email', 
    question: 'ما هو عنوان بريدك الإلكتروني؟',
    type: 'text',
    placeholder: 'مثال، ahmed.mohamed@email.com'
  },
  { 
    key: 'phone', 
    question: 'ما هو رقم هاتفك؟',
    type: 'text',
    placeholder: 'مثال، +966 50 123 4567'
  },
  { 
    key: 'location', 
    question: 'أين تسكن حالياً (المدينة، البلد)؟',
    type: 'text',
    placeholder: 'مثال، الرياض، السعودية أو دبي، الإمارات'
  },
  { 
    key: 'summary', 
    question: 'اكتب نبذة قصيرة عن نفسك (2-3 جمل).',
    type: 'textarea',
    placeholder: 'صف خلفيتك المهنية، نقاط قوتك الرئيسية، وأهدافك المهنية...'
  },
  { 
    key: 'skills', 
    question: 'اكتب مهاراتك الأساسية (مفصولة بفواصل).',
    type: 'textarea',
    placeholder: 'مثال، JavaScript، Python، إدارة المشاريع، التواصل، تحليل البيانات'
  },
  { 
    key: 'experience', 
    question: 'صف خبراتك العملية. يمكنك النسخ من لينكدإن.',
    type: 'textarea',
    placeholder: 'اذكر كل منصب مع: المسمى الوظيفي في اسم الشركة (تاريخ البداية - تاريخ النهاية)، المكان، و2-3 نقاط إنجازات...'
  },
  { 
    key: 'education', 
    question: 'اذكر مؤهلاتك، أسماء المدارس، الدرجات والتواريخ.',
    type: 'textarea',
    placeholder: 'اذكر الدرجات، المؤسسات، تواريخ التخرج، المعدلات (إذا كانت جيدة)، والمقررات ذات الصلة...'
  },
  { 
    key: 'certifications', 
    question: 'هل لديك شهادات مهنية أو تراخيص؟ (اختياري)',
    type: 'textarea',
    placeholder: 'مثال، AWS Certified Solutions Architect، PMP، Google Analytics Certified...'
  },
  { 
    key: 'projects', 
    question: 'مشاريع بارزة أو عناصر محفظة للتسليط عليها؟ (اختياري)',
    type: 'textarea',
    placeholder: 'صف 2-3 مشاريع رئيسية مع التقنيات المستخدمة والنتائج المحققة...'
  },
  { 
    key: 'languages', 
    question: 'اللغات التي تتحدثها (اختياري).',
    type: 'text',
    placeholder: 'مثال، العربية (اللغة الأم)، الإنجليزية (طلاقة)، الفرنسية (متوسط)'
  },
  { 
    key: 'extra', 
    question: 'هل هناك شيء آخر؟ شهادات، هوايات، إلخ (اختياري).',
    type: 'textarea',
    placeholder: 'مثال، قائمة العميد، أوراق بحثية منشورة، منسق تطوعي...'
  }
];