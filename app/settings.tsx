import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { boldWeight, shadow, useColors } from './lib/colors';
import { useTheme } from './lib/themeContext';
import { useLanguage, Language } from './lib/languageContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage(); //ローカライズされたテキスト
  const colors = useColors();
  const [modalVisible, setModalVisible] = useState(false);

  const languages: { label: string; value: Language }[] = [
    { label: '日本語', value: 'ja' },
    { label: 'English', value: 'en' },
    { label: 'Français', value: 'fr' },
    { label: 'Suomi', value: 'fi' },
  ];

  const currentLanguageLabel = languages.find(l => l.value === language)?.label || '日本語';

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
    settingsContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
    },
    settingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      marginBottom: 10,
      borderRadius: 10,
      backgroundColor: colors.element,
      ...shadow,
    },
    dropdownTrigger: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: colors.divider,
      minWidth: 120,
    },
    dropdownText: {
      fontSize: 16,
      color: colors.titleText,
      marginRight: 8,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '80%',
      backgroundColor: colors.element,
      borderRadius: 15,
      padding: 10,
      ...shadow,
    },
    modalItem: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.divider,
    },
    modalItemText: {
      fontSize: 18,
      color: colors.titleText,
      textAlign: 'center',
    },
    lastModalItem: {
      borderBottomWidth: 0,
    },
  });

  return (<>
      <View style={{height: 48, backgroundColor: colors.element, alignItems: "center", justifyContent: "center", borderBottomWidth: 1, borderBottomColor: colors.divider}}>
        <Pressable 
          onPress={() => router.push('/')}
          style={{ position: 'absolute', left: 15 }}
        >
          <Ionicons name="chevron-back" size={24} color={colors.titleText} />
        </Pressable>
        <Text style={styles.label}>{t('settings')}</Text>
      </View>
      <View style={styles.settingsContainer}>

        <View style={styles.settingContainer}>
          <Text style={[styles.label]}>{t('darkMode')}</Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: colors.accentColor }}
            thumbColor={theme === 'dark' ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingContainer}>
          <Text style={styles.label}>{t('language')}</Text>
          <Pressable 
            style={styles.dropdownTrigger}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.dropdownText}>{currentLanguageLabel}</Text>
            <Ionicons name="chevron-down" size={18} color={colors.plainText} />
          </Pressable>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable 
            style={styles.modalOverlay} 
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              {languages.map((item, index) => (
                <Pressable
                  key={item.value}
                  style={[
                    styles.modalItem,
                    index === languages.length - 1 && styles.lastModalItem,
                    language === item.value && { backgroundColor: colors.background + '80' }
                  ]}
                  onPress={() => {
                    setLanguage(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={[
                    styles.modalItemText,
                    language === item.value && { fontWeight: 'bold', color: colors.accentColor }
                  ]}>
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Pressable>
        </Modal>

      </View>
  </>);

}