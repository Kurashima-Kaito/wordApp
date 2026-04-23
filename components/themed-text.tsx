import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { getDefaultFontFamily } from '../app/lib/colors';
import { useFontSettings } from '../app/lib/fontContext';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const { settings } = useFontSettings();

  const styles = StyleSheet.create({
    default: {
      fontFamily: getDefaultFontFamily(undefined, settings.englishFont, settings.japaneseFont),
      fontSize: 16,
      lineHeight: 24,
    },
    defaultSemiBold: {
      fontFamily: getDefaultFontFamily(undefined, settings.englishFont, settings.japaneseFont),
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600',
    },
    title: {
      fontFamily: getDefaultFontFamily('bold', settings.englishFont, settings.japaneseFont),
      fontSize: 32,
      lineHeight: 32,
    },
    subtitle: {
      fontFamily: getDefaultFontFamily('bold', settings.englishFont, settings.japaneseFont),
      fontSize: 20,
    },
    link: {
      fontFamily: getDefaultFontFamily(undefined, settings.englishFont, settings.japaneseFont),
      lineHeight: 30,
      fontSize: 16,
      color: '#0a7ea4',
    },
  });

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}
