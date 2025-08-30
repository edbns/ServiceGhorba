import React, { useState, useEffect } from 'react';
import { guidedCVPrompts, motivationLetterPrompts } from '@/prompts/cv_chat_prompts';
import { CVData } from '@/utils/formatHelpers';

interface ChatBotProps {
  type: 'cv' | 'motivation_letter';
  onComplete: (data: CVData) => void;
  initialData?: Partial<CVData>;
}

export default function ChatBot({ type, onComplete, initialData = {} }: ChatBotProps) {
  const prompts = type === 'cv' ? guidedCVPrompts : motivationLetterPrompts;
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [currentInput, setCurrentInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Initialize responses with any existing data
  useEffect(() => {
    const initialResponses: Record<string, string> = {};
    
    if (type === 'cv' && initialData) {
      if (initialData.name) initialResponses.name = initialData.name;
      if (initialData.title) initialResponses.title = initialData.title;
      if (initialData.contact?.email) initialResponses.email = initialData.contact.email;
      if (initialData.contact?.phone) initialResponses.phone = initialData.contact.phone;
      if (initialData.summary) initialResponses.summary = initialData.summary;
      if (initialData.skills) initialResponses.skills = initialData.skills.join(', ');
      if (initialData.languages) initialResponses.languages = initialData.languages.join(', ');
      if (initialData.extra) initialResponses.extra = initialData.extra;
      
      if (initialData.experience) {
        initialResponses.experience = initialData.experience.map(exp => 
          `${exp.role} at ${exp.company} (${exp.dates}): ${exp.description}`
        ).join('\n\n');
      }
      
      if (initialData.education) {
        initialResponses.education = initialData.education.map(edu => 
          `${edu.degree} at ${edu.institution} (${edu.dates})${edu.description ? ': ' + edu.description : ''}`
        ).join('\n\n');
      }
    }
    
    setResponses(initialResponses);
  }, [initialData, type]);

  const currentPrompt = prompts[currentStep];
  const isLastStep = currentStep === prompts.length - 1;

  const handleNext = () => {
    if (currentInput.trim()) {
      setResponses(prev => ({
        ...prev,
        [currentPrompt.key]: currentInput.trim()
      }));
      setCurrentInput('');
      
      if (isLastStep) {
        handleGenerate();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setCurrentInput(responses[prompts[currentStep - 1].key] || '');
    }
  };

  const handleSkip = () => {
    if (isLastStep) {
      handleGenerate();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          data: responses,
          format: 'general'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const result = await response.json();
      onComplete(result.data);
    } catch (error) {
      console.error('Generation error:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="card max-w-2xl mx-auto text-center">
        <div className="space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <h3 className="text-xl font-semibold text-gray-900">
            Generating your {type === 'cv' ? 'CV' : 'motivation letter'}...
          </h3>
          <p className="text-gray-600">
            Our AI is crafting your professional document. This may take a moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {type === 'cv' ? 'CV Builder' : 'Motivation Letter Builder'}
          </h2>
          <span className="text-sm text-gray-500">
            Step {currentStep + 1} of {prompts.length}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / prompts.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-900 mb-3">
            {currentPrompt.question}
          </label>
          
          {currentPrompt.type === 'textarea' ? (
            <textarea
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder={currentPrompt.placeholder}
              className="input-field h-32 resize-none"
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder={currentPrompt.placeholder}
              className="input-field"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleNext()}
            />
          )}
        </div>

        <div className="flex justify-between">
          <div className="space-x-3">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="btn-secondary"
              >
                Previous
              </button>
            )}
            
            <button
              onClick={handleSkip}
              className="btn-secondary"
            >
              Skip
            </button>
          </div>

          <button
            onClick={handleNext}
            disabled={!currentInput.trim() && !isLastStep}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLastStep ? 'Generate' : 'Next'}
          </button>
        </div>
      </div>

      {/* Show previous responses */}
      {Object.keys(responses).length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Your Information</h3>
          <div className="space-y-3">
            {Object.entries(responses).map(([key, value]) => {
              const prompt = prompts.find(p => p.key === key);
              return (
                <div key={key} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-700">{prompt?.question}</p>
                  <p className="text-sm text-gray-900 mt-1">{value}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}