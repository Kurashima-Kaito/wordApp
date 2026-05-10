import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type Language = 'ja' | 'en' | 'fr' | 'fi';

const translations = {
  ja: {
    settings: '設定',
    darkMode: 'ダークモード',
    language: '言語',
    home: 'ホーム',
  },
  en: {
    settings: 'Settings',
    darkMode: 'Dark Mode',
    language: 'Language',
    home: 'Home',
  },
  fr: {
    settings: 'Paramètres',
    darkMode: 'Mode sombre',
    language: 'Langue',
    home: 'Maison',
  },
  fi: {
    settings: 'Asetukset',
    darkMode: 'Tumma tila',
    language: 'Kieli',
    home: 'Koti',
  },
};

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['ja']) => string;
}>({
  language: 'ja',
  setLanguage: () => {},
  t: (key) => translations['ja'][key],
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('ja');

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage && (['ja', 'en', 'fr', 'fi'] as Language[]).includes(savedLanguage as Language)) {
        setLanguageState(savedLanguage as Language);
      }
    };
    loadLanguage();
  }, []);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    await AsyncStorage.setItem('language', lang);
  };

  const t = (key: keyof typeof translations['ja']) => {
    return translations[language][key] || translations['en'][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
