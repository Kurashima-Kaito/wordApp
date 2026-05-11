import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TabBar, useColors, shadow } from '../lib/colors';

const appIcon = require('../../assets/images/icon.png');

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardRememberingContainer: {
      margin: 20,
      padding: 5,
      height: 100,
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
  });

  return (
    <>
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
        <Text style={styles.title}>全カードの暗記率</Text>
      </View>
      
    </>
  );
}
