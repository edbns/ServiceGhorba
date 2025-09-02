import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSimpleTranslation } from '@/hooks/useSimpleTranslation';
import { CVFormat } from './CVFormatSelector';
import { ISO_COUNTRY_CODES, codeToFlagEmoji } from '@/utils/countries';


type CountryOption = { code: string; en: string; fr: string; flag?: string; format?: CVFormat };

// Minimal curated mapping for format suggestions; others default to Europass
const countryFormatMap: Record<string, CVFormat> = {
	CA: 'canada_resume',
	US: 'us_resume',
	GB: 'uk_cv',
	UK: 'uk_cv',
	DE: 'germany_cv',
	AU: 'australia_resume',
	JP: 'japan_rirekisho',
	FR: 'europass',
	ES: 'europass',
	NL: 'europass',
	EU: 'europass'
};

// Build list from ISO codes and Intl.DisplayNames
// Using any to avoid TS lib gaps for Intl.DisplayNames
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const intlEN: any = typeof Intl !== 'undefined' && (Intl as any).DisplayNames ? new (Intl as any).DisplayNames(['en'], { type: 'region' }) : null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const intlFR: any = typeof Intl !== 'undefined' && (Intl as any).DisplayNames ? new (Intl as any).DisplayNames(['fr'], { type: 'region' }) : null;

const allCountries: CountryOption[] = ISO_COUNTRY_CODES.map((code) => {
	const enName = intlEN && typeof intlEN.of === 'function' ? (intlEN.of(code) as string | undefined) : undefined;
	const frName = intlFR && typeof intlFR.of === 'function' ? (intlFR.of(code) as string | undefined) : undefined;
	return {
		code,
		en: enName || code,
		fr: frName || code,
		flag: codeToFlagEmoji(code)
	};
}).filter(c => !!c.en && !!c.fr);

interface CountryBasedSelectorProps {
	onCountrySelected: (format: CVFormat, country: string) => void;
	className?: string;
}

export default function CountryBasedSelector({ onCountrySelected, className = '' }: CountryBasedSelectorProps) {
	const { t, language } = useSimpleTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCode, setSelectedCode] = useState('');
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const options = useMemo(() => {
		const localized = allCountries
			.map((c) => ({
				code: c.code,
				label: language === 'fr' ? (c.fr as string) : (c.en as string),
				flag: c.flag,
				format: countryFormatMap[c.code] || 'europass'
			}))
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

	return (
		<div className={`bg-white rounded-lg border border-gray-200 p-6 mb-6 ${className}`}>
			<div className="flex items-start space-x-3 mb-4">
				<svg className="w-6 h-6 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<div>
					<h3 className="text-lg font-semibold text-gray-900">{t('tools.country_selector')}</h3>
				</div>
			</div>

			<div className="space-y-4" ref={dropdownRef}>
				<label className="block text-sm font-medium text-gray-700 mb-2">
					{t('tools.search_country')}
				</label>
				<button
					type="button"
					onClick={() => setIsOpen(prev => !prev)}
					className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
				>
					<span className="text-sm text-gray-800">{selectedCode ? options.find(o => o.code === selectedCode)?.label : (language === 'fr' ? 'Choisir un pays' : 'Choose a country')}</span>
					<svg className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
				</button>
				{isOpen && (
					<div className="mt-2 border border-gray-200 rounded-lg bg-white shadow-sm">
						<div className="p-2 border-b">
							<input
								type="text"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder={t('tools.type_country')}
								className="w-full px-3 py-2 border border-gray-300 rounded"
							/>
						</div>
						<div className="max-h-60 overflow-auto">
							{options.map((opt) => (
								<button
									key={opt.code}
									type="button"
									onClick={() => {
										setSelectedCode(opt.code);
										onCountrySelected(opt.format as CVFormat, opt.label);
										setIsOpen(false);
									}}
									className={`w-full text-left px-3 py-2 flex items-center space-x-2 hover:bg-gray-50 ${selectedCode === opt.code ? 'bg-blue-50' : ''}`}
								>
									<span className="text-lg">{opt.flag || ''}</span>
									<span className="text-sm text-gray-800">{opt.label}</span>
								</button>
							))}
							{options.length === 0 && (
								<div className="px-3 py-2 text-sm text-gray-500">{language === 'fr' ? 'Aucun résultat' : 'No matches'}</div>
							)}
						</div>
					</div>
				)}
			</div>

				{selectedCode && (
					<div className="bg-green-50 border border-green-200 rounded-lg p-4">
						<div className="flex items-start space-x-3">
							<svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<div>
								<h4 className="font-medium text-green-900 mb-2">{t('tools.perfect_selected')}</h4>
								<p className="text-sm text-green-800">
									{t('tools.auto_selected').replace('{{country}}', (options.find(o => o.code === selectedCode)?.label || ''))}
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
	);
}