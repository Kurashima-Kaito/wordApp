import { useTheme } from './themeContext';
import { Platform } from 'react-native';

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
  shadowOpacity: 0.1,
  shadowRadius: 3.84,
  elevation: 5,
};

//boldfontの重さ
export const boldWeight = Platform.OS === 'ios' ? '600' : 'bold';