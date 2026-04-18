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

  shadow: "#000",
};

//ダークテーマの色
const darkColors = {
  background: "#1a1a1a",
  element: "#393939",
  elementHover: "#404040",
  elementClicked: "#494949",

  memo: "#756c58",

  accentColor: "#84e053",
  lessAccentColor: "#6db83f",

  titleText: "#f0f0f0",
  plainText: "#bbb",

  shadow: "#000",
};

//テーマに応じた色を取得する関数
export const useColors = () => {
  const { theme } = useTheme();
  return theme === 'dark' ? darkColors : lightColors;
};

//デフォルトのカラーオブジェクト（サーバーサイド用）
export const colors = lightColors;