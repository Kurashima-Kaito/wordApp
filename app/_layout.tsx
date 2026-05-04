import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { ThemeProvider as CustomThemeProvider } from './lib/themeContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    'BIZUDPGothic-Regular': require('../assets/fonts/BIZUDPGothic-Regular.ttf'),
    'BIZUDPGothic-Bold': require('../assets/fonts/BIZUDPGothic-Bold.ttf'),
    'BIZUDPMincho-Regular': require('../assets/fonts/BIZUDPMincho-Regular.ttf'),
    'BIZUDPMincho-Bold': require('../assets/fonts/BIZUDPMincho-Bold.ttf'),
    'GentiumBookPlus-Regular': require('../assets/fonts/GentiumBookPlus-Regular.ttf'),
    'GentiumBookPlus-Bold': require('../assets/fonts/GentiumBookPlus-Bold.ttf'),
    'NotoSans-Regular': require('../assets/fonts/NotoSans-Regular.ttf'),
    'NotoSans-Bold': require('../assets/fonts/NotoSans-Bold.ttf')
  });
  
  return (
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
  );
}