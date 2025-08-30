import React, { useState, useEffect } from 'react';
import { guidedCVPrompts, motivationLetterPrompts, basicWorkerPrompts, guidedMotivationPrompts } from '@/prompts/cv_chat_prompts';
import { useSimpleTranslation } from '@/hooks/useSimpleTranslation';
import { CVData, CVFormat } from '@/utils/formatHelpers';

// Speech Recognition types
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition: any;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface ChatBotProps {
  type: 'cv' | 'motivation_letter';
  format?: CVFormat;
  simpleStyle?: boolean;
  onComplete: (data: CVData) => void;
  initialData?: Partial<CVData>;
}

interface ChatMessage {
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

export default function ChatBot({ type, format, simpleStyle = false, onComplete, initialData = {} }: ChatBotProps) {
  const { t } = useSimpleTranslation();
  // Choose prompts based on type, format, and style
  let prompts;
  if (type === 'cv') {
    // Use basic prompts for service worker formats
    const serviceWorkerFormats = ['basic_worker', 'delivery_driver', 'waiter_service', 'construction_cv', 'kitchen_helper', 'cleaner_cv'];
    prompts = format && serviceWorkerFormats.includes(format) ? basicWorkerPrompts : guidedCVPrompts;
  } else {
    // For motivation letters, use simple prompts if simple style is selected
    prompts = simpleStyle ? guidedMotivationPrompts : motivationLetterPrompts;
  }
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [currentInput, setCurrentInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Initialize responses and chat
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
    
    // Initialize first message
    const documentName = type === 'cv' ? 'CV' : (simpleStyle ? 'simple cover letter' : 'cover letter');
    setChatMessages([{
      role: 'assistant',
      content: `Hello! I'm here to help you create a professional ${documentName}. Let's start with some basic information. ${prompts[0].question}`,
      timestamp: new Date()
    }]);

    // Check for speech recognition support
    if (typeof window !== 'undefined') {
      setSpeechSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
    }
  }, [initialData, type, prompts, simpleStyle]);

  const currentPrompt = prompts[currentStep];
  const isLastStep = currentStep === prompts.length - 1;

  const startListening = () => {
    if (!speechSupported) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setCurrentInput(prev => prev + (prev ? ' ' : '') + transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      role: 'user',
      content: currentInput.trim(),
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Store response
    setResponses(prev => ({
      ...prev,
      [currentPrompt.key]: currentInput.trim()
    }));

    setCurrentInput('');

    // Add assistant response
    setTimeout(() => {
      if (isLastStep) {
        setChatMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Perfect! I have all the information I need. Let me generate your professional document now.',
          timestamp: new Date()
        }]);
        setTimeout(() => handleGenerate(), 1000);
      } else {
        const nextPrompt = prompts[currentStep + 1];
        setChatMessages(prev => [...prev, {
          role: 'assistant',
          content: `Great! ${nextPrompt.question}`,
          timestamp: new Date()
        }]);
        setCurrentStep(prev => prev + 1);
      }
    }, 500);
  };

  const handleSkip = () => {
    const skipMessage: ChatMessage = {
      role: 'user',
      content: '[Skipped]',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, skipMessage]);

    setTimeout(() => {
      if (isLastStep) {
        setChatMessages(prev => [...prev, {
          role: 'assistant',
          content: 'No problem! Let me generate your document with the information provided.',
          timestamp: new Date()
        }]);
        setTimeout(() => handleGenerate(), 1000);
      } else {
        const nextPrompt = prompts[currentStep + 1];
        setChatMessages(prev => [...prev, {
          role: 'assistant',
          content: `No worries! ${nextPrompt.question}`,
          timestamp: new Date()
        }]);
        setCurrentStep(prev => prev + 1);
      }
    }, 500);
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
          type: type === 'motivation_letter' && simpleStyle ? 'basic_motivation' : type,
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
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but there was an error generating your document. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Generating your {type === 'cv' ? 'CV' : 'motivation letter'}
            </h3>
            <p className="text-gray-600">
              Our AI is crafting your professional document...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Chat Container */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {message.role === 'user' ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  )}
                </div>
                
                {/* Message */}
                <div className={`rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              {currentPrompt?.type === 'textarea' ? (
                <textarea
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder={currentPrompt.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={3}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
              ) : (
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder={currentPrompt?.placeholder || 'Type your response...'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
              )}
            </div>
            
            <div className="flex space-x-2">
              {speechSupported && (
                <button
                  onClick={startListening}
                  disabled={isListening}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    isListening 
                      ? 'bg-red-500 text-white' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  title={isListening ? 'Listening...' : 'Speak your answer'}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
              )}
              
              <button
                onClick={handleSkip}
                className="px-4 py-3 text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium"
                title="Skip this question"
              >
                {t('chat.skip')}
              </button>
              
              <button
                onClick={handleSendMessage}
                disabled={!currentInput.trim()}
                className="bg-primary hover:bg-primary-dark text-white p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
            <span>{t('chat.step')} {currentStep + 1} {t('chat.of')} {prompts.length}</span>
            <span>{t('chat.enter_send')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}