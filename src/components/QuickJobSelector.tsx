import React, { useState } from 'react';
import { useSimpleTranslation } from '@/hooks/useSimpleTranslation';

export interface JobTemplate {
  title: string;
  summary: string;
  skills: string[];
  achievements: string[];
}

const jobTemplates: Record<string, JobTemplate> = {
  waiter: {
    title: 'Restaurant Server',
    summary: 'Experienced food service professional with strong customer service skills and ability to work in fast-paced environments. Committed to providing excellent dining experiences and supporting team success.',
    skills: ['Customer Service', 'Multitasking', 'Cash Handling', 'Team Collaboration', 'Food Safety Knowledge'],
    achievements: [
      'Served 100+ customers daily while maintaining high service standards',
      'Processed cash and credit transactions with 100% accuracy',
      'Collaborated with kitchen staff to ensure timely meal delivery',
      'Maintained positive customer relationships and resolved complaints effectively'
    ]
  },
  cleaner: {
    title: 'Professional Cleaner',
    summary: 'Reliable cleaning professional with attention to detail and commitment to maintaining high standards. Experienced in both residential and commercial cleaning with focus on safety and efficiency.',
    skills: ['Attention to Detail', 'Time Management', 'Equipment Operation', 'Safety Protocols', 'Independent Work'],
    achievements: [
      'Maintained cleaning standards for 20+ rooms/offices daily',
      'Used cleaning equipment and chemicals safely with zero incidents',
      'Completed assigned tasks 15% faster than average while maintaining quality',
      'Received positive feedback from supervisors and clients consistently'
    ]
  },
  driver: {
    title: 'Professional Driver',
    summary: 'Reliable driver with excellent navigation skills and commitment to customer service. Experienced in delivery operations with perfect safety record and strong time management abilities.',
    skills: ['Safe Driving', 'Route Planning', 'Customer Service', 'Time Management', 'Vehicle Maintenance'],
    achievements: [
      'Completed 500+ deliveries with 99% on-time delivery rate',
      'Maintained perfect driving record with zero accidents or violations',
      'Achieved 4.8/5 customer satisfaction rating consistently',
      'Optimized delivery routes to reduce fuel costs and improve efficiency'
    ]
  },
  construction: {
    title: 'Construction Worker',
    summary: 'Experienced construction professional with strong work ethic and commitment to safety. Skilled in various construction tasks with ability to work effectively in team environments.',
    skills: ['Construction Tools', 'Safety Protocols', 'Physical Stamina', 'Team Collaboration', 'Blueprint Reading'],
    achievements: [
      'Worked on 10+ construction projects with zero safety incidents',
      'Operated heavy machinery and power tools safely and efficiently',
      'Collaborated with teams of 15+ workers to meet project deadlines',
      'Completed specialized training in OSHA safety protocols'
    ]
  },
  cook: {
    title: 'Kitchen Staff',
    summary: 'Dedicated kitchen professional with food safety knowledge and ability to work efficiently in high-pressure environments. Committed to quality food preparation and team collaboration.',
    skills: ['Food Preparation', 'Food Safety', 'Kitchen Equipment', 'Time Management', 'Team Collaboration'],
    achievements: [
      'Prepared 200+ meals daily while maintaining quality standards',
      'Maintained food safety protocols with zero health code violations',
      'Worked efficiently during peak hours and special events',
      'Trained new kitchen staff on procedures and safety protocols'
    ]
  },
  security: {
    title: 'Security Guard',
    summary: 'Professional security officer with strong observation skills and commitment to safety. Experienced in maintaining secure environments and handling emergency situations calmly and effectively.',
    skills: ['Security Protocols', 'Observation Skills', 'Emergency Response', 'Communication', 'Report Writing'],
    achievements: [
      'Monitored facility security for 2+ years with zero major incidents',
      'Responded to 50+ emergency situations calmly and effectively',
      'Maintained detailed security logs and incident reports',
      'Completed certified security training and first aid certification'
    ]
  },
  cashier: {
    title: 'Retail Cashier',
    summary: 'Customer-focused retail professional with strong mathematical skills and commitment to accuracy. Experienced in handling transactions and providing excellent customer service in busy retail environments.',
    skills: ['Cash Handling', 'Customer Service', 'POS Systems', 'Product Knowledge', 'Problem Solving'],
    achievements: [
      'Processed 300+ transactions daily with 99.9% accuracy',
      'Provided friendly customer service and resolved inquiries effectively',
      'Maintained balanced cash drawer with zero discrepancies',
      'Assisted customers with product selection and recommendations'
    ]
  },
  helper: {
    title: 'General Helper',
    summary: 'Versatile worker with strong work ethic and willingness to learn. Experienced in supporting various operations and adapting quickly to new tasks and environments.',
    skills: ['Adaptability', 'Physical Stamina', 'Following Instructions', 'Team Support', 'Equipment Handling'],
    achievements: [
      'Supported daily operations across multiple departments effectively',
      'Learned new tasks quickly and maintained high performance standards',
      'Assisted team members and contributed to overall productivity',
      'Maintained perfect attendance record and reliable work schedule'
    ]
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
      <div className="flex items-start space-x-3 mb-4">
        <svg className="w-6 h-6 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
        </svg>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('tools.job_templates')}</h3>
          <p className="text-sm text-gray-600">
            {t('tools.job_subtitle')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(jobTemplates).map(([key, template]) => (
          <button
            key={key}
            onClick={() => handleJobSelect(key)}
            className={`p-3 border rounded-lg text-left transition-colors ${
              selectedJob === key
                ? 'border-primary bg-blue-50 text-primary'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            <div className="font-medium text-sm">{template.title}</div>
          </button>
        ))}
      </div>

      {selectedJob && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-3">Template Preview:</h4>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium text-blue-800">Summary:</span>
              <p className="text-blue-700 mt-1">{jobTemplates[selectedJob].summary}</p>
            </div>
            <div>
              <span className="font-medium text-blue-800">Key Skills:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {jobTemplates[selectedJob].skills.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="font-medium text-blue-800">Sample Achievements:</span>
              <ul className="text-blue-700 mt-1 space-y-1">
                {jobTemplates[selectedJob].achievements.slice(0, 3).map((achievement, index) => (
                  <li key={index} className="flex items-start space-x-1">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-3">
            This template will be used as a starting point. You can customize everything in the next steps.
          </p>
        </div>
      )}
    </div>
  );
}