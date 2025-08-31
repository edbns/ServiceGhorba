import React, { useState } from 'react';
import { useSimpleTranslation } from '@/hooks/useSimpleTranslation';

interface SkillTranslatorProps {
  onTranslated: (skills: string[]) => void;
}

export default function SkillTranslator({ onTranslated }: SkillTranslatorProps) {
  const { t, language } = useSimpleTranslation();
  const [jobInput, setJobInput] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedSkills, setTranslatedSkills] = useState<string[]>([]);

  const commonJobSkills = {
    'waiter': [
      'Provided excellent customer service to 100+ customers daily',
      'Managed multiple tables while maintaining service quality',
      'Processed payments and handled cash transactions accurately',
      'Collaborated with kitchen staff to ensure timely food delivery',
      'Resolved customer complaints and maintained positive relationships'
    ],
    'cleaner': [
      'Maintained high cleanliness standards in commercial/residential spaces',
      'Used cleaning equipment and chemicals safely and effectively',
      'Managed time efficiently to complete tasks within deadlines',
      'Followed detailed cleaning protocols and safety procedures',
      'Worked independently with minimal supervision'
    ],
    'driver': [
      'Maintained perfect driving record with zero accidents',
      'Completed 100+ deliveries per week with 98% on-time rate',
      'Provided excellent customer service during delivery interactions',
      'Managed route optimization to maximize efficiency',
      'Handled cash and digital payments accurately'
    ],
    'construction': [
      'Operated construction tools and equipment safely',
      'Followed OSHA safety protocols and maintained zero-accident record',
      'Collaborated with team members to complete projects on schedule',
      'Maintained physical stamina for demanding work environments',
      'Read and followed blueprints and construction specifications'
    ],
    'kitchen': [
      'Prepared food according to recipes and quality standards',
      'Maintained food safety and sanitation protocols',
      'Worked efficiently in fast-paced kitchen environments',
      'Collaborated with team members during busy service periods',
      'Managed inventory and restocked supplies as needed'
    ],
    'cashier': [
      'Processed customer transactions accurately and efficiently',
      'Provided friendly customer service and resolved inquiries',
      'Handled cash, credit, and digital payments securely',
      'Maintained accurate cash drawer and end-of-day reconciliation',
      'Worked collaboratively with team members during busy periods'
    ]
  };

  const translateSkills = async () => {
    if (!jobInput.trim()) return;

    setIsTranslating(true);

    try {
      // First check if we have common skills for this job type
      const jobType = Object.keys(commonJobSkills).find(job => 
        jobInput.toLowerCase().includes(job)
      );

      if (jobType) {
        const skills = commonJobSkills[jobType as keyof typeof commonJobSkills];
        setTranslatedSkills(skills);
        onTranslated(skills);
      } else {
        // Use AI for custom job translation
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'skill_translation',
            data: { jobDescription: jobInput },
            language,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to translate skills');
        }

        const result = await response.json();
        const skills = result.data.skills || [];
        setTranslatedSkills(skills);
        onTranslated(skills);
      }
    } catch (error) {
      console.error('Skill translation error:', error);
      alert('Unable to translate skills. Please try describing your job differently.');
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-start space-x-3 mb-4">
        <svg className="w-6 h-6 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{t('tools.skill_translator')}</h3>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('tools.job_input_placeholder')}
          </label>
          <textarea
            value={jobInput}
            onChange={(e) => setJobInput(e.target.value)}
            placeholder={t('tools.job_input_examples')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <button
          onClick={translateSkills}
          disabled={!jobInput.trim() || isTranslating}
          className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isTranslating ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>{t('tools.translating')}</span>
            </div>
          ) : (
            t('tools.translate_skills')
          )}
        </button>

        {translatedSkills.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-3">{t('tools.your_skills')}</h4>
            <ul className="space-y-2">
              {translatedSkills.map((skill, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-green-800 text-sm">{skill}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-green-700 mt-3">
              These skills have been added to your CV. You can edit them in the next steps.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}