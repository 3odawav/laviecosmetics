
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../i18n/en';
import { ar } from '../i18n/ar';

type Language = 'en' | 'ar';

type LangContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof en;
};

const LanguageContext = createContext<LangContextType | undefined>(undefined);

const translations = { en, ar };

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('lavie_language') as Language | null;
    if (saved) setLanguage(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('lavie_language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
};
