import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { boldWeight, shadow, useColors } from './lib/colors';
import { useTheme } from './lib/themeContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const colors = useColors();

  const styles = StyleSheet.create({
    title: {
      fontWeight: boldWeight,
      fontSize: 24,
      marginBottom: 20,
    },
    label: {
      fontWeight: boldWeight,
      fontSize: 18,
      color: colors.titleText,
    },
    largeTextStyle: {
      fontWeight: boldWeight,
      fontSize: 32,
      color: "white",
      textAlign: "center",
    },
    settingsContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
    },
    settingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
      backgroundColor: colors.element,
      overflow: "hidden",
      zIndex: 2,

      ...shadow,
    },
    pickerContainer: {
      marginLeft: 10,
      borderRadius: 5,
      backgroundColor: 'transparent',
      width: '50%',
    },
    picker: {
      color: colors.titleText,
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
  });

  return (<>
      <View style={{height: 48, backgroundColor: colors.element, alignItems: "center", justifyContent: "center"}}>
        <Pressable onPress={() => router.push('/')}>
          <Text style={styles.label}>設定</Text>
        </Pressable>
      </View>
      <View style={styles.settingsContainer}>
        
        <View style={styles.settingContainer}>
          <Text style={[styles.label]}>ダークモード</Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
          />
        </View>
        
        <View style={styles.settingContainer}>
          <Text style={styles.label}>日本語フォント</Text>
          <View style={styles.pickerContainer}>
            
          </View>
        </View>
        
        <View style={styles.settingContainer}>
          <Text style={styles.label}>英数字フォント</Text>
          <View style={styles.pickerContainer}>
            
          </View>
        </View>

      </View>
  </>);

}