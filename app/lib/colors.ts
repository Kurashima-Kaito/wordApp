import { useFontSettings } from './fontContext';
import { useTheme } from './themeContext';

//ライトテーマの色
const lightColors = {
  background: "#ddd",
  element: "#fff",
  elementHover: "#f9f9f9",
  elementClicked: "#f0f0f0",

  memo: "#e4d7b8",

  accentColor: "#84e053",
  lessAccentColor: "#78bd53",

  titleText: "#000",
  plainText: "#666",
};

//ダークテーマの色
const darkColors = {
  background: "#1a1a1a",
  element: "#393939",
  elementHover: "#404040",
  elementClicked: "#494949",

  memo: "#756c58",

  accentColor: "#ffa221",
  lessAccentColor: "#6db83f",

  titleText: "#f0f0f0",
  plainText: "#bbb",
};

//テーマに応じた色を取得する関数
export const useColors = () => {
  const { theme } = useTheme();
  return theme === 'dark' ? darkColors : lightColors;
};

//共通の影スタイル
export const shadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: useTheme().theme === 'dark' ? 0.5 : 0.1,
  shadowRadius: 3.84,
  elevation: 5,
};

//デフォルトフォントスタイル（Hook を使わないバージョン）
export const getDefaultFontFamily = (fontWeight?: string, englishFont?: string, japaneseFont?: string) => {
  const english = englishFont === 'GentiumBookPlus' ? 'GentiumBookPlus' : 'NotoSans';
  const japanese = japaneseFont === 'Mincho' ? 'BIZUDPMincho' : 'BIZUDPGothic';
  const weight = fontWeight === 'bold' ? '-Bold' : '-Regular';
  
  // 英語フォント優先、フォールバックとして日本語フォント
  return `${english}${weight}, ${japanese}${weight}`;
};

export const getJapaneseFontFamily = (fontWeight?: string, japaneseFont?: string) => {
  const japanese = japaneseFont === 'Mincho' ? 'BIZUDPMincho' : 'BIZUDPGothic';
  return fontWeight === 'bold' ? `${japanese}-Bold` : `${japanese}-Regular`;
};

//Hook 版（コンポーネント内で使用）
export const getDefaultFont = (fontWeight?: string) => {
  const { settings } = useFontSettings();
  return {
    fontFamily: getDefaultFontFamily(fontWeight, settings.englishFont),
  };
};

export const getJapaneseFallbackFont = (fontWeight?: string) => {
  const { settings } = useFontSettings();
  return {
    fontFamily: getJapaneseFontFamily(fontWeight, settings.japaneseFont),
  };
};