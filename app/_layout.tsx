import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { ThemeProvider as CustomThemeProvider } from './lib/themeContext';
import { LanguageProvider } from './lib/languageContext';
import { loadCardsData } from './lib/cardsStore';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  useEffect(() => {
    loadCardsData();
  }, []);
  
  return (
    <LanguageProvider>
      <CustomThemeProvider>
        <ThemeProvider value={DefaultTheme}>
        <Stack
          // すべての画面に共通のデフォルトを設定したい場合は、ここで指定
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen 
            name="(tabs)" 
            options={{
              animation: 'simple_push',
              presentation: "fullScreenModal"
            }} 
          />

          <Stack.Screen 
            name="settings" 
            options={{
              animation: 'simple_push',
            }} 
          />

          <Stack.Screen 
            name="edit" 
            options={{
              animation: 'default',
              animationDuration: 300,
              presentation: 'card',
            }} 
          />

          <Stack.Screen 
            name="selectFolder" 
            options={{
              animation: 'slide_from_bottom',
              presentation: 'modal',
            }} 
          />

          <Stack.Screen 
            name="test" 
            options={{
              animation: 'slide_from_right',
            }} 
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </CustomThemeProvider>
  </LanguageProvider>
  );
}