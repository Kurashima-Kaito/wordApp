import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TabBar, useColors, shadow } from '../lib/colors';
import { useLanguage, Language } from '../lib/languageContext';

const appIcon = require('../../assets/images/icon.png');

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();

  const { language, setLanguage, t } = useLanguage(); //ローカライズされたテキスト

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    cardRememberingContainer: {
      margin: 20,
      padding: 15,
      backgroundColor: colors.element,
      borderRadius: 10,
      ...shadow,
    },
    divider: {
      borderBottomWidth: 2,
      marginHorizontal: 5,
      borderColor: colors.divider,
      marginBottom: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      alignContent: 'center',
      textAlign: 'center',
      color: colors.plainText,
    },
    subtitle: {
      fontSize: 16,
      color: colors.plainText,
      marginTop: 10,
    },
    barIndicatorText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    rememberingBarContainer: {
      paddingHorizontal: 10,
    },
  });

  const data = {
    legend: [t('remembered'), t('ambiguous'), t('notRemembered')],
    data: [
      [80, 30, 40]
    ],
    barColors: [colors.remembered, colors.ambiguous, colors.notRemembered]
  };

  return (
    <View style={styles.container}>
      <TabBar />
      <View style={{height: 48, backgroundColor: colors.element, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 50, ...shadow, zIndex: 10}}>
        <View style={{position: "absolute", left: 15}}>
          <Image source={appIcon} style={{width: 30, height: 30, borderRadius: 5}} />
        </View>
        <Pressable 
          onPress={() => router.push('/settings')}
          style={{position: "absolute", right: 10}}
        >
          <View style={{width: 30, height: 30}}>
            <Ionicons name="menu" size={30} color={colors.plainText} />
          </View>
        </Pressable>
      </View>

      <View style={styles.cardRememberingContainer}>
        <Text style={styles.title}>{t('cardRememberingRate')}</Text>
        <View style={styles.divider} />
        <View style={styles.rememberingBarContainer}>
          <View style={{ flexDirection: 'row', height: 50, borderRadius: 10, overflow: 'hidden' }}>
            {data.data[0].map((value, index) => (
              <View 
                key={index} 
                style={{ 
                  flex: value, 
                  backgroundColor: data.barColors[index] 
                }} 
              >
                <Text style={styles.barIndicatorText}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, flexWrap: 'wrap', gap: 15 }}>
          {data.legend.map((label, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: data.barColors[index], marginRight: 5 }} />
              <Text style={{ fontSize: 12, color: colors.plainText }}>{label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
