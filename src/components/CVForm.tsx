import React, { useState } from 'react';
import { CVData, JobTemplate } from '@/utils/formatHelpers';
import QuickJobSelector from './QuickJobSelector';

interface CVFormProps {
  onSubmit: (data: CVData) => void;
  onCancel: () => void;
  selectedJobType: string;
  selectedFormat: string;
}



interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export default function CVForm({ onSubmit, onCancel, selectedJobType, selectedFormat }: CVFormProps) {
  const [formData, setFormData] = useState<Partial<CVData>>({
    name: '',
    title: '',
    summary: '',
    skills: [],
    contact: {
      email: '',
      phone: '',
      countryCode: '+1',
      address: '',
      linkedin: ''
    },
    experience: [],
    education: []
  });



  const [educations, setEducations] = useState<Education[]>([
    { id: '1', institution: '', degree: '', field: '', startDate: '', endDate: '' }
  ]);



  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };







  const addEducation = () => {
    const newId = (educations.length + 1).toString();
    setEducations([...educations, { id: newId, institution: '', degree: '', field: '', startDate: '', endDate: '' }]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducations(educations.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    if (educations.length > 1) {
      setEducations(educations.filter(edu => edu.id !== id));
    }
  };

  const handleSubmit = () => {
    const cvData: CVData = {
      name: formData.name || '',
      title: formData.title || '',
      summary: formData.summary || '',
      skills: formData.skills || [],
      contact: {
        email: formData.contact?.email || '',
        phone: formData.contact?.phone ? `${formData.contact?.countryCode || '+1'} ${formData.contact?.phone}` : '',
        address: formData.contact?.address || '',
        linkedin: formData.contact?.linkedin || ''
      },
      experience: [{
        role: formData.title || '',
        company: formData.company || '',
        dates: formData.startDate && formData.endDate ? `${formData.startDate} - ${formData.endDate}` : 
               formData.startDate ? `${formData.startDate} - Present` : '',
        description: formData.jobDescription || '',
        location: formData.city && formData.country ? `${formData.city}, ${formData.country}` : 
                 formData.city || formData.country || ''
      }],
      education: educations.map(edu => ({
        degree: edu.degree,
        institution: edu.institution,
        dates: `${edu.startDate} - ${edu.endDate}`,
        description: edu.field
      }))
    };

    onSubmit(cvData);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mt-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Create Your CV
        </h2>
        <p className="text-gray-600">
          {selectedJobType} format optimized for {selectedFormat} standards
        </p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                value={formData.contact?.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <div className="flex">
                <select
                  value={formData.contact?.countryCode || '+1'}
                  onChange={(e) => handleContactChange('countryCode', e.target.value)}
                  className="px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50"
                >
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+49">🇩🇪 +49</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+39">🇮🇹 +39</option>
                  <option value="+34">🇪🇸 +34</option>
                  <option value="+31">🇳🇱 +31</option>
                  <option value="+32">🇧🇪 +32</option>
                  <option value="+41">🇨🇭 +41</option>
                  <option value="+46">🇸🇪 +46</option>
                  <option value="+47">🇳🇴 +47</option>
                  <option value="+45">🇩🇰 +45</option>
                  <option value="+358">🇫🇮 +358</option>
                  <option value="+48">🇵🇱 +48</option>
                  <option value="+420">🇨🇿 +420</option>
                  <option value="+36">🇭🇺 +36</option>
                  <option value="+43">🇦🇹 +43</option>
                  <option value="+380">🇺🇦 +380</option>
                  <option value="+7">🇷🇺 +7</option>
                  <option value="+81">🇯🇵 +81</option>
                  <option value="+82">🇰🇷 +82</option>
                  <option value="+86">🇨🇳 +86</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+61">🇦🇺 +61</option>
                  <option value="+64">🇳🇿 +64</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+966">🇸🇦 +966</option>
                  <option value="+20">🇪🇬 +20</option>
                  <option value="+27">🇿🇦 +27</option>
                  <option value="+234">🇳🇬 +234</option>
                  <option value="+254">🇰🇪 +254</option>
                  <option value="+52">🇲🇽 +52</option>
                  <option value="+55">🇧🇷 +55</option>
                  <option value="+54">🇦🇷 +54</option>
                  <option value="+56">🇨🇱 +56</option>
                  <option value="+57">🇨🇴 +57</option>
                  <option value="+58">🇻🇪 +58</option>
                  <option value="+593">🇪🇨 +593</option>
                  <option value="+51">🇵🇪 +51</option>
                  <option value="+595">🇵🇾 +595</option>
                  <option value="+598">🇺🇾 +598</option>
                  <option value="+591">🇧🇴 +591</option>
                  <option value="+507">🇵🇦 +507</option>
                  <option value="+506">🇨🇷 +506</option>
                  <option value="+502">🇬🇹 +502</option>
                  <option value="+504">🇭🇳 +504</option>
                  <option value="+503">🇸🇻 +503</option>
                  <option value="+505">🇳🇮 +505</option>
                  <option value="+501">🇧🇿 +501</option>
                  <option value="+504">🇭🇳 +504</option>
                  <option value="+509">🇭🇹 +509</option>
                  <option value="+1809">🇩🇴 +1809</option>
                  <option value="+1876">🇯🇲 +1876</option>
                  <option value="+1242">🇧🇸 +1242</option>
                  <option value="+1246">🇧🇧 +1246</option>
                  <option value="+1264">🇦🇮 +1264</option>
                  <option value="+1268">🇦🇬 +1268</option>
                  <option value="+1284">🇻🇬 +1284</option>
                  <option value="+1340">🇻🇮 +1340</option>
                  <option value="+1345">🇰🇾 +1345</option>
                  <option value="+1441">🇧🇲 +1441</option>
                  <option value="+1473">🇬🇩 +1473</option>
                  <option value="+1649">🇹🇨 +1649</option>
                  <option value="+1664">🇲🇸 +1664</option>
                  <option value="+1671">🇬🇺 +1671</option>
                  <option value="+1684">🇦🇸 +1684</option>
                  <option value="+1758">🇱🇨 +1758</option>
                  <option value="+1767">🇩🇲 +1767</option>
                  <option value="+1784">🇻🇨 +1784</option>
                  <option value="+1787">🇵🇷 +1787</option>
                  <option value="+1809">🇩🇴 +1809</option>
                  <option value="+1868">🇹🇹 +1868</option>
                  <option value="+1869">🇰🇳 +1869</option>
                  <option value="+1876">🇯🇲 +1876</option>
                  <option value="+1939">🇵🇷 +1939</option>
                </select>
                <input
                  type="tel"
                  value={formData.contact?.phone}
                  onChange={(e) => handleContactChange('phone', e.target.value)}
                  placeholder="Phone number"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={formData.contact?.address}
                onChange={(e) => handleContactChange('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
              <input
                type="url"
                value={formData.contact?.linkedin}
                onChange={(e) => handleContactChange('linkedin', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Quick Job Templates */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">What job did you do?</label>
          <QuickJobSelector
            onJobSelected={(template: JobTemplate) => {
              setFormData(prev => ({
                ...prev,
                title: template.title,
                summary: template.summary,
                skills: template.skills,
                company: template.company || '',
                country: template.country || '',
                city: template.city || '',
                startDate: template.startDate || '',
                endDate: template.endDate || '',
                jobDescription: template.jobDescription || ''
              }));
            }}
          />
        </div>



        {/* Education */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Education</h3>
            <button
              type="button"
              onClick={addEducation}
              className="text-primary hover:text-primary-dark font-medium text-sm"
            >
              + Add Education
            </button>
          </div>
          {educations.map((edu, index) => (
            <div key={edu.id} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-900">Education {index + 1}</h4>
                {educations.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                  <input
                    type="text"
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Generate CV
          </button>
        </div>
      </form>
    </div>
  );
}
