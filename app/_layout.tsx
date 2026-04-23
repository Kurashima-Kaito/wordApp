import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { FontProvider } from './lib/fontContext';
import { ThemeProvider as CustomThemeProvider } from './lib/themeContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'BIZUDPGothic-Regular': require('../fonts/BIZUDPGothic-Regular.ttf'),
    'BIZUDPGothic-Bold': require('../fonts/BIZUDPGothic-Bold.ttf'),
    'BIZUDPMincho-Regular': require('../fonts/BIZUDPMincho-Regular.ttf'),
    'BIZUDPMincho-Bold': require('../fonts/BIZUDPMincho-Bold.ttf'),
    'GentiumBookPlus-Regular': require('../fonts/GentiumBookPlus-Regular.ttf'),
    'GentiumBookPlus-Bold': require('../fonts/GentiumBookPlus-Bold.ttf'),
    'NotoSans-Regular': require('../fonts/NotoSans-Regular.ttf'),
    'NotoSans-Bold': require('../fonts/NotoSans-Bold.ttf')
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <FontProvider>
      <CustomThemeProvider>
        <ThemeProvider value={DefaultTheme}>
          <Stack screenOptions={{ animation: 'slide_from_right' }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            <Stack.Screen name="settings" options={{ title: '設定', headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </CustomThemeProvider>
    </FontProvider>
  );
}
