import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useMemo } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import {
  findCurrentCardsData,
  getCardsData,
  Card
} from './lib/cardsStore';
import { boldWeight, shadow, useColors } from './lib/colors';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function TestScreen() {
  const router = useRouter();
  const colors = useColors();
  const { folderPath } = useLocalSearchParams<{ folderPath: string }>();
  
  const path = useMemo(() => {
    try {
      return JSON.parse(decodeURIComponent(folderPath));
    } catch (e) {
      return [];
    }
  }, [folderPath]);

  const cards = useMemo(() => {
    return findCurrentCardsData(path, getCardsData());
  }, [path]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  if (cards.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.titleText, fontSize: 18 }}>カードがありません</Text>
        <Pressable onPress={() => router.back()} style={{ marginTop: 20 }}>
          <Text style={{ color: colors.accentColor }}>戻る</Text>
        </Pressable>
      </View>
    );
  }

  const currentCard = cards[currentIndex];

  const handleFlip = () => {
    setShowBack(!showBack);
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowBack(false);
    } else {
        // Finish test or loop? Let's show a "Finish" state or just stay.
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowBack(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      height: 60,
      backgroundColor: colors.element,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      ...shadow,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: boldWeight,
      color: colors.titleText,
      marginLeft: 15,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    card: {
      width: width * 0.85,
      height: width * 1.2,
      backgroundColor: colors.element,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
      ...shadow,
    },
    cardText: {
      fontSize: 28,
      fontWeight: boldWeight,
      color: colors.titleText,
      textAlign: 'center',
    },
    backText: {
        fontSize: 24,
        color: colors.plainText,
        marginTop: 20,
        textAlign: 'center',
    },
    memoText: {
        fontSize: 16,
        color: colors.plainText,
        marginTop: 20,
        fontStyle: 'italic',
    },
    footer: {
      height: 100,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingBottom: 20,
    },
    navButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.element,
      justifyContent: 'center',
      alignItems: 'center',
      ...shadow,
    },
    progress: {
        position: 'absolute',
        top: 80,
        alignSelf: 'center',
    },
    progressText: {
        color: colors.plainText,
        fontSize: 16,
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="close" size={30} color={colors.titleText} />
        </Pressable>
        <Text style={styles.headerTitle}>テスト: {path[path.length - 1] || 'ルート'}</Text>
      </View>

      <View style={styles.progress}>
          <Text style={styles.progressText}>{currentIndex + 1} / {cards.length}</Text>
      </View>

      <View style={styles.content}>
        <Pressable onPress={handleFlip} style={styles.card}>
          <Text style={styles.cardText}>{currentCard.front}</Text>
          {showBack && (
            <>
              <View style={{ height: 2, width: '100%', backgroundColor: colors.background, marginVertical: 20 }} />
              <Text style={styles.backText}>{currentCard.back}</Text>
              {currentCard.memo && <Text style={styles.memoText}>{currentCard.memo}</Text>}
            </>
          )}
          {!showBack && (
            <Text style={{ position: 'absolute', bottom: 20, color: colors.plainText, fontSize: 14 }}>タップして裏面を表示</Text>
          )}
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Pressable 
            onPress={handlePrev} 
            style={[styles.navButton, currentIndex === 0 && { opacity: 0.3 }]}
            disabled={currentIndex === 0}
        >
          <Ionicons name="chevron-back" size={30} color={colors.accentColor} />
        </Pressable>

        <Pressable 
            onPress={handleNext} 
            style={[styles.navButton, currentIndex === cards.length - 1 && { opacity: 0.3 }]}
            disabled={currentIndex === cards.length - 1}
        >
          <Ionicons name="chevron-forward" size={30} color={colors.accentColor} />
        </Pressable>
      </View>
    </View>
  );
}
