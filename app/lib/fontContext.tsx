import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type JapaneseFontType = 'Gothic' | 'Mincho';
type EnglishFontType = 'GentiumBookPlus' | 'NotoSans';

type FontSettings = {
  japaneseFont: JapaneseFontType;
  englishFont: EnglishFontType;
};

type FontContextType = {
  settings: FontSettings;
  setJapaneseFont: (font: JapaneseFontType) => void;
  setEnglishFont: (font: EnglishFontType) => void;
};

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<FontSettings>({
    japaneseFont: 'Gothic',
    englishFont: 'GentiumBookPlus',
  });

  // 設定を読み込む
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const saved = await AsyncStorage.getItem('fontSettings');
        if (saved) {
          setSettings(JSON.parse(saved));
        }
      } catch (error) {
        console.error('フォント設定の読み込みに失敗しました', error);
      }
    };
    loadSettings();
  }, []);

  // 日本語フォントを変更
  const setJapaneseFont = async (font: JapaneseFontType) => {
    const newSettings = { ...settings, japaneseFont: font };
    setSettings(newSettings);
    try {
      await AsyncStorage.setItem('fontSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('フォント設定の保存に失敗しました', error);
    }
  };

  // 英語フォントを変更
  const setEnglishFont = async (font: EnglishFontType) => {
    const newSettings = { ...settings, englishFont: font };
    setSettings(newSettings);
    try {
      await AsyncStorage.setItem('fontSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('フォント設定の保存に失敗しました', error);
    }
  };

  return (
    <FontContext.Provider value={{ settings, setJapaneseFont, setEnglishFont }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFontSettings = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useFontSettings must be used within a FontProvider');
  }
  return context;
};
