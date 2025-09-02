import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSimpleTranslation } from '@/hooks/useSimpleTranslation';
import { ISO_COUNTRY_CODES, codeToFlagEmoji } from '@/utils/countries';

export interface JobTemplate {
  title: string;
  summary: string;
  skills: string[];
  achievements: string[];
  company?: string;
  country?: string;
  city?: string;
  startDate?: string;
  endDate?: string;
  jobDescription?: string;
}

const jobTemplates: Record<string, JobTemplate> = {
  waiter: {
    title: 'job.waiter',
    summary: 'Experienced food service professional with strong customer service skills and ability to work in fast-paced environments. Committed to providing excellent dining experiences and supporting team success.',
    skills: ['Customer Service', 'Multitasking', 'Cash Handling', 'Team Collaboration', 'Food Safety Knowledge'],
    achievements: [
      'Served 100+ customers daily while maintaining high service standards',
      'Processed cash and credit transactions with 100% accuracy',
      'Collaborated with kitchen staff to ensure timely meal delivery',
      'Maintained positive customer relationships and resolved complaints effectively'
    ],
    company: 'Restaurant Name',
    country: 'Canada',
    city: 'Toronto',
    startDate: '2022-01',
    endDate: '',
    jobDescription: 'Provided excellent customer service in a busy restaurant environment. Served 100+ customers daily while maintaining high service standards. Processed cash and credit transactions with 100% accuracy. Collaborated with kitchen staff to ensure timely meal delivery.'
  },
  cleaner: {
    title: 'job.cleaner',
    summary: 'Reliable cleaning professional with attention to detail and commitment to maintaining high standards. Experienced in both residential and commercial cleaning with focus on safety and efficiency.',
    skills: ['Attention to Detail', 'Time Management', 'Equipment Operation', 'Safety Protocols', 'Independent Work'],
    achievements: [
      'Maintained cleaning standards for 20+ rooms/offices daily',
      'Used cleaning equipment and chemicals safely with zero incidents',
      'Completed assigned tasks 15% faster than average while maintaining quality',
      'Received positive feedback from supervisors and clients consistently'
    ],
    company: 'Cleaning Company',
    country: 'Canada',
    city: 'Vancouver',
    startDate: '2021-03',
    endDate: '',
    jobDescription: 'Maintained cleaning standards for 20+ rooms/offices daily. Used cleaning equipment and chemicals safely with zero incidents. Completed assigned tasks 15% faster than average while maintaining quality. Received positive feedback from supervisors and clients consistently.'
  },
  driver: {
    title: 'job.delivery',
    summary: 'Reliable driver with excellent navigation skills and commitment to customer service. Experienced in delivery operations with perfect safety record and strong time management abilities.',
    skills: ['Safe Driving', 'Route Planning', 'Customer Service', 'Time Management', 'Vehicle Maintenance'],
    achievements: [
      'Completed 500+ deliveries with 99% on-time delivery rate',
      'Maintained perfect driving record with zero accidents or violations',
      'Achieved 4.8/5 customer satisfaction rating consistently',
      'Optimized delivery routes to reduce fuel costs and improve efficiency'
    ],
    company: 'Delivery Company',
    country: 'Canada',
    city: 'Montreal',
    startDate: '2020-06',
    endDate: '',
    jobDescription: 'Completed 500+ deliveries with 99% on-time delivery rate. Maintained perfect driving record with zero accidents or violations. Achieved 4.8/5 customer satisfaction rating consistently. Optimized delivery routes to reduce fuel costs and improve efficiency.'
  },
  construction: {
    title: 'job.construction',
    summary: 'Experienced construction professional with strong work ethic and commitment to safety. Skilled in various construction tasks with ability to work effectively in team environments.',
    skills: ['Construction Tools', 'Safety Protocols', 'Physical Stamina', 'Team Collaboration', 'Blueprint Reading'],
    achievements: [
      'Worked on 10+ construction projects with zero safety incidents',
      'Operated heavy machinery and power tools safely and efficiently',
      'Collaborated with teams of 15+ workers to meet project deadlines',
      'Completed specialized training in OSHA safety protocols'
    ],
    company: 'Construction Company',
    country: 'Canada',
    city: 'Calgary',
    startDate: '2019-09',
    endDate: '',
    jobDescription: 'Worked on 10+ construction projects with zero safety incidents. Operated heavy machinery and power tools safely and efficiently. Collaborated with teams of 15+ workers to meet project deadlines. Completed specialized training in OSHA safety protocols.'
  },
  cook: {
    title: 'job.kitchen',
    summary: 'Dedicated kitchen professional with food safety knowledge and ability to work efficiently in high-pressure environments. Committed to quality food preparation and team collaboration.',
    skills: ['Food Preparation', 'Food Safety', 'Kitchen Equipment', 'Time Management', 'Team Collaboration'],
    achievements: [
      'Prepared 200+ meals daily while maintaining quality standards',
      'Maintained food safety protocols with zero health code violations',
      'Worked efficiently during peak hours and special events',
      'Trained new kitchen staff on procedures and safety protocols'
    ],
    company: 'Restaurant Name',
    country: 'Canada',
    city: 'Ottawa',
    startDate: '2021-04',
    endDate: '',
    jobDescription: 'Prepared 200+ meals daily while maintaining quality standards. Maintained food safety protocols with zero health code violations. Worked efficiently during peak hours and special events. Trained new kitchen staff on procedures and safety protocols.'
  },
  security: {
    title: 'job.security',
    summary: 'Professional security officer with strong observation skills and commitment to safety. Experienced in maintaining secure environments and handling emergency situations calmly and effectively.',
    skills: ['Security Protocols', 'Observation Skills', 'Emergency Response', 'Communication', 'Report Writing'],
    achievements: [
      'Monitored facility security for 2+ years with zero major incidents',
      'Responded to 50+ emergency situations calmly and effectively',
      'Maintained detailed security logs and incident reports',
      'Completed certified security training and first aid certification'
    ],
    company: 'Security Company',
    country: 'Canada',
    city: 'Edmonton',
    startDate: '2020-08',
    endDate: '',
    jobDescription: 'Monitored facility security for 2+ years with zero major incidents. Responded to 50+ emergency situations calmly and effectively. Maintained detailed security logs and incident reports. Completed certified security training and first aid certification.'
  },
  cashier: {
    title: 'job.retail',
    summary: 'Customer-focused retail professional with strong mathematical skills and commitment to accuracy. Experienced in handling transactions and providing excellent customer service in busy retail environments.',
    skills: ['Cash Handling', 'Customer Service', 'POS Systems', 'Product Knowledge', 'Problem Solving'],
    achievements: [
      'Processed 300+ transactions daily with 99.9% accuracy',
      'Provided friendly customer service and resolved inquiries effectively',
      'Maintained balanced cash drawer with zero discrepancies',
      'Assisted customers with product selection and recommendations'
    ],
    company: 'Retail Store',
    country: 'Canada',
    city: 'Winnipeg',
    startDate: '2021-02',
    endDate: '',
    jobDescription: 'Processed 300+ transactions daily with 99.9% accuracy. Provided friendly customer service and resolved inquiries effectively. Maintained balanced cash drawer with zero discrepancies. Assisted customers with product selection and recommendations.'
  },
  helper: {
    title: 'job.helper',
    summary: 'Versatile worker with strong work ethic and willingness to learn. Experienced in supporting various operations and adapting quickly to new tasks and environments.',
    skills: ['Adaptability', 'Physical Stamina', 'Following Instructions', 'Team Support', 'Equipment Handling'],
    achievements: [
      'Supported daily operations across multiple departments effectively',
      'Learned new tasks quickly and maintained high performance standards',
      'Assisted team members and contributed to overall productivity',
      'Maintained perfect attendance record and reliable work schedule'
    ],
    company: 'Company Name',
    country: 'Canada',
    city: 'Quebec City',
    startDate: '2022-05',
    endDate: '',
    jobDescription: 'Supported daily operations across multiple departments effectively. Learned new tasks quickly and maintained high performance standards. Assisted team members and contributed to overall productivity. Maintained perfect attendance record and reliable work schedule.'
  }
};

interface QuickJobSelectorProps {
  onJobSelected: (template: JobTemplate) => void;
  className?: string;
}

export default function QuickJobSelector({ onJobSelected, className = '' }: QuickJobSelectorProps) {
  const { t } = useSimpleTranslation();
  const [selectedJob, setSelectedJob] = useState<string>('');

  const handleJobSelect = (jobKey: string) => {
    setSelectedJob(jobKey);
    const template = jobTemplates[jobKey];
    if (template) {
      onJobSelected(template);
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 mb-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">What job did you do?</h3>
        <p className="text-gray-600">Click on your job type below</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(jobTemplates).map(([key, template]) => (
          <button
            key={key}
            onClick={() => handleJobSelect(key)}
            className={`p-4 border-2 rounded-xl text-center transition-all ${
              selectedJob === key
                ? 'border-primary bg-blue-50 text-primary shadow-md'
                : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:shadow-sm'
            }`}
          >

            <div className="font-medium text-sm">{t(template.title)}</div>
          </button>
        ))}
      </div>

      {selectedJob && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="text-center mb-4">
            <h4 className="text-lg font-semibold text-blue-900 mb-2">Your Job Details</h4>
            <p className="text-sm text-blue-700">You can edit these if you want to change something</p>
          </div>
          
          <div className="space-y-4">
            {/* Company and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Company Name:</label>
                <input
                  type="text"
                  value={jobTemplates[selectedJob].company || ''}
                  onChange={(e) => {
                    jobTemplates[selectedJob].company = e.target.value;
                  }}
                  className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Country:</label>
                <CountryPicker
                  selectedCountry={jobTemplates[selectedJob].country || ''}
                  onCountryChange={(country) => {
                    jobTemplates[selectedJob].country = country;
                  }}
                />
              </div>
            </div>

            {/* City and Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">City:</label>
                <input
                  type="text"
                  value={jobTemplates[selectedJob].city || ''}
                  onChange={(e) => {
                    jobTemplates[selectedJob].city = e.target.value;
                  }}
                  className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">From:</label>
                <input
                  type="month"
                  value={jobTemplates[selectedJob].startDate || ''}
                  onChange={(e) => {
                    jobTemplates[selectedJob].startDate = e.target.value;
                  }}
                  className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">To:</label>
                <input
                  type="month"
                  value={jobTemplates[selectedJob].endDate || ''}
                  onChange={(e) => {
                    jobTemplates[selectedJob].endDate = e.target.value;
                  }}
                  className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Job Summary */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">Job summary:</label>
              <textarea
                value={jobTemplates[selectedJob].summary}
                onChange={(e) => {
                  // Update the template summary
                  jobTemplates[selectedJob].summary = e.target.value;
                }}
                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Describe your job responsibilities and achievements..."
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">Your skills:</label>
              <div className="border border-blue-200 rounded-lg p-3 bg-white">
                <div className="flex flex-wrap gap-2 mb-3">
                {jobTemplates[selectedJob].skills.map((skill, index) => (
                    <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      <span>{skill}</span>
                      <button
                        onClick={() => {
                          jobTemplates[selectedJob].skills.splice(index, 1);
                          // Force re-render
                          const currentJob = selectedJob;
                          setSelectedJob('');
                          setTimeout(() => setSelectedJob(currentJob), 10);
                        }}
                        className="ml-2 text-blue-600 hover:text-blue-800 font-bold"
                        title="Remove skill"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Type a skill..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        jobTemplates[selectedJob].skills.push(e.currentTarget.value.trim());
                        e.currentTarget.value = '';
                        // Force re-render
                        const currentJob = selectedJob;
                        setSelectedJob('');
                        setTimeout(() => setSelectedJob(currentJob), 10);
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      if (input && input.value.trim()) {
                        jobTemplates[selectedJob].skills.push(input.value.trim());
                        input.value = '';
                        // Force re-render
                        const currentJob = selectedJob;
                        setSelectedJob('');
                        setTimeout(() => setSelectedJob(currentJob), 10);
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>


          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                const template = jobTemplates[selectedJob];
                if (template) {
                  onJobSelected(template);
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors text-lg"
            >
              Use This Job Info
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// CountryPicker Component
interface CountryPickerProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
}

function CountryPicker({ selectedCountry, onCountryChange }: CountryPickerProps) {
  const { language } = useSimpleTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const options = useMemo(() => {
    const localized = ISO_COUNTRY_CODES
      .map((code) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const intlEN: any = typeof Intl !== 'undefined' && (Intl as any).DisplayNames ? new (Intl as any).DisplayNames(['en'], { type: 'region' }) : null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const intlFR: any = typeof Intl !== 'undefined' && (Intl as any).DisplayNames ? new (Intl as any).DisplayNames(['fr'], { type: 'region' }) : null;
        
        const enName = intlEN && typeof intlEN.of === 'function' ? (intlEN.of(code) as string | undefined) : undefined;
        const frName = intlFR && typeof intlFR.of === 'function' ? (intlFR.of(code) as string | undefined) : undefined;
        
        return {
          code,
          label: language === 'fr' ? (frName || code) : (enName || code),
          flag: codeToFlagEmoji(code)
        };
      })
      .filter(c => !!c.label)
      .sort((a, b) => a.label.localeCompare(b.label));

    if (!searchTerm) return localized;
    const term = searchTerm.toLowerCase();
    return localized.filter((c) => c.label.toLowerCase().includes(term));
  }, [language, searchTerm]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const selectedOption = options.find(o => o.label === selectedCountry);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full flex items-center justify-between px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      >
        <div className="flex items-center space-x-2">
          {selectedOption && <span className="text-lg">{selectedOption.flag}</span>}
          <span className="text-sm text-gray-800">
            {selectedCountry || (language === 'fr' ? 'Choisir un pays' : 'Choose a country')}
          </span>
        </div>
        <svg className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 border border-gray-200 rounded-lg bg-white shadow-lg">
          <div className="p-2 border-b">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'fr' ? 'Rechercher un pays...' : 'Search countries...'}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
          <div className="max-h-60 overflow-auto">
            {options.map((opt) => (
              <button
                key={opt.code}
                type="button"
                onClick={() => {
                  onCountryChange(opt.label);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
                className={`w-full text-left px-3 py-2 flex items-center space-x-2 hover:bg-gray-50 ${selectedCountry === opt.label ? 'bg-blue-50' : ''}`}
              >
                <span className="text-lg">{opt.flag}</span>
                <span className="text-sm text-gray-800">{opt.label}</span>
              </button>
            ))}
            {options.length === 0 && (
              <div className="px-3 py-2 text-sm text-gray-500">
                {language === 'fr' ? 'Aucun résultat' : 'No matches'}
            </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}