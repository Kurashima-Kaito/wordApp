import { useTheme } from './themeContext';
import { Platform, View } from 'react-native';

//ライトテーマの色
const lightColors = {
  background: "#ddd",
  element: "#fff",
  elementHover: "#f9f9f9",
  elementClicked: "#f0f0f0",
  divider: "#c4c4c4",

  memo: "#e4d7b8",

  accentColor: "#84e053",
  lessAccentColor: "#75c649",
  remembered: "#5ce617",
  ambiguous: "#dee617",
  notRemembered: "#e63917",

  titleText: "#000",
  plainText: "#666",
};

//ダークテーマの色
const darkColors = {
  background: "#1a1a1a",
  element: "#393939",
  elementHover: "#404040",
  elementClicked: "#494949",
  divider: "#464646",

  memo: "#756c58",

  accentColor: "#84e053",
  lessAccentColor: "#6db83f",
  remembered: "#51cc14",
  ambiguous: "#cccc14",
  notRemembered: "#cc3f14",

  titleText: "#f0f0f0",
  plainText: "#bbb",
};

//テーマに応じた色を取得する関数
export const useColors = () => {
  const { theme } = useTheme();
  return theme === 'dark' ? darkColors : lightColors;
};
  
//iphoneの上部UIを隠すためのバー
export const TabBar = () => {
  const colors = useColors();
  return (
    <>
      <View style={{height: 46, backgroundColor: colors.element}}/>
      <View style={{height: 2, backgroundColor: colors.divider}}/>
    </>
  )
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