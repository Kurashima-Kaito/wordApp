import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useColors } from '../lib/colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = useColors();
  const showTabBar = true; // T/Fで表示/非表示を切り替え

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: { 
          display: showTabBar ? 'flex' : 'none',
          backgroundColor: colors.element,
          borderTopColor: colors.divider,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: 'cards',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="rectangle.stack.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="testScreen"
        options={{
          title: 'test',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
