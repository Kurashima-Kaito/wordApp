import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { getDefaultFontFamily, shadow, useColors } from './lib/colors';
import { useFontSettings } from './lib/fontContext';
import { useTheme } from './lib/themeContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const colors = useColors();
  const { settings, setJapaneseFont, setEnglishFont } = useFontSettings();

  const styles = StyleSheet.create({
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
    title: {
      fontFamily: getDefaultFontFamily('bold', settings.englishFont, settings.japaneseFont),
      fontSize: 24,
      marginBottom: 20,
    },
    label: {
      fontFamily: getDefaultFontFamily('bold', settings.englishFont, settings.japaneseFont),
      fontSize: 18,
      color: colors.titleText,
    },
    pickerContainer: {
      marginLeft: 10,
      borderRadius: 5,
      backgroundColor: colors.element,
    },
    picker: {
      color: colors.titleText,
    },
    largeTextStyle: {
      fontFamily: getDefaultFontFamily('normal', settings.englishFont, settings.japaneseFont),
      fontSize: 32,
      color: "white",
      textAlign: "center",
      justifyContent: 'center'
    }
  });

  return (<>
      <View style={{height: 48, backgroundColor: "black"}}>
        <Text style={styles.largeTextStyle}>アイフォン15ではここが使えない</Text>
      </View>
      <View style={{height: 48, backgroundColor: colors.element, alignItems: "center", justifyContent: "center"}}>
        <Pressable onPress={() => router.push('/')}>
          <View style={{width: 30, height: 30, backgroundColor: colors.accentColor}}></View>
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
            <RNPickerSelect
              items={[
                { label: 'Gothic', value: 'Gothic' },
                { label: 'Mincho', value: 'Mincho' },
              ]}
              onValueChange={setJapaneseFont}
              value={settings.japaneseFont}
              style={{
                inputIOS: styles.picker,
                inputAndroid: styles.picker,
              }}
            />
          </View>
        </View>
        
        <View style={styles.settingContainer}>
          <Text style={styles.label}>英数字フォント</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              items={[
                { label: 'GentiumBookPlus', value: 'GentiumBookPlus' },
                { label: 'NotoSans', value: 'NotoSans' },
              ]}
              onValueChange={setEnglishFont}
              value={settings.englishFont}
              style={{
                inputIOS: styles.picker,
                inputAndroid: styles.picker,
              }}
            />
          </View>
        </View>

      </View>
  </>);

}