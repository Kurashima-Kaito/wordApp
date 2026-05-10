import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { boldWeight, shadow, useColors } from './lib/colors';
import { useTheme } from './lib/themeContext';
import { useLanguage, Language } from './lib/languageContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage(); //ローカライズされたテキスト
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

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: colors.titleText,
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: colors.titleText,
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });

  return (<>
      <View style={{height: 48, backgroundColor: colors.element, alignItems: "center", justifyContent: "center"}}>
        <Pressable onPress={() => router.push('/')}>
          <Text style={styles.label}>{t('settings')}</Text>
        </Pressable>
      </View>
      <View style={styles.settingsContainer}>
        
        <View style={styles.settingContainer}>
          <Text style={[styles.label]}>{t('darkMode')}</Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
          />
        </View>
        
        <View style={styles.settingContainer}>
          <Text style={styles.label}>{t('language')}</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value: Language) => setLanguage(value)}
              items={[
                { label: '日本語', value: 'ja' },
                { label: 'English', value: 'en' },
                { label: 'Français', value: 'fr' },
                { label: 'Suomi', value: 'fi' },
              ]}
              value={language}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
            />
          </View>
        </View>

      </View>
  </>);

}