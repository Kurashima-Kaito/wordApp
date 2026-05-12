import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type Language = 'ja' | 'en' | 'fr' | 'fi';

const translations = {
  ja: {
    settings: '設定',
    darkMode: 'ダークモード',
    language: '言語',
    home: 'ホーム',
    cards: 'カード',
    cardRememberingRate: '全カードの暗記率',
    remembered: '暗記済み',
    ambiguous: 'あいまい',
    notRemembered: '未暗記',
  },
  en: {
    settings: 'Settings',
    darkMode: 'Dark Mode',
    language: 'Language',
    home: 'Home',
    cards: 'Cards',
    cardRememberingRate: 'Overall Memorization Rate',
    remembered: 'Remembered',
    ambiguous: 'Ambiguous',
    notRemembered: 'Not Remembered',
  },
  fr: {
    settings: 'Paramètres',
    darkMode: 'Mode sombre',
    language: 'Langue',
    home: 'Maison',
    cards: 'Cartes',
    cardRememberingRate: 'Taux de mémorisation global',
    remembered: 'Rappelé',
    ambiguous: 'Ambigu',
    notRemembered: 'Non rappelé',
  },
  fi: {
    settings: 'Asetukset',
    darkMode: 'Tumma tila',
    language: 'Kieli',
    home: 'Koti',
    cards: 'Kortit',
    cardRememberingRate: 'Yleinen muistamisaste',
    remembered: 'Muistettu',
    ambiguous: 'Epäselvä',
    notRemembered: 'Ei muistettu',
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
