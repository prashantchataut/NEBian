'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { getLanguage, setLanguage, getAvailableLanguages, type Language } from '@/lib/i18n';

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentLang(getLanguage());
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCurrentLang(lang);
    setIsOpen(false);
    // Reload page to apply translations
    window.location.reload();
  };

  const languages = getAvailableLanguages();
  const currentLanguage = languages.find(l => l.code === currentLang);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLanguage?.nativeName}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 mt-2 w-40 rounded-[var(--radius-md)] bg-surface-container border border-outline-variant shadow-lg z-50 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  currentLang === lang.code
                    ? 'bg-primary-container text-on-primary-container font-medium'
                    : 'text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span className="mr-2">{lang.nativeName}</span>
                <span className="text-xs text-on-surface-variant">({lang.name})</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
