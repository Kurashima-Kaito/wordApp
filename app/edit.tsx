import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { JSX, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { getCard, updateCard } from './lib/cardsStore';
import { getDefaultFontFamily, useColors, shadow } from './lib/colors';
import { useFontSettings } from './lib/fontContext';

type CardData = {
  front: string;
  back: string;
  memo: string;
};

export default function EditCardScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ folderPath?: string; cardIndex?: string }>();
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [memo, setMemo] = useState('');
  const [isValidCard, setIsValidCard] = useState(true);
  const { settings } = useFontSettings();
  const colors = useColors();

  useEffect(() => {
    const folderPath = params.folderPath ? JSON.parse(params.folderPath as string) as string[] : [];
    const cardIndex = params.cardIndex ? parseInt(params.cardIndex as string, 10) : -1;
    const card = getCard(folderPath, cardIndex);

    if (!card) {
      setIsValidCard(false);
      return;
    }

    setFront(card.front);
    setBack(card.back);
    setMemo(card.memo);
    setIsValidCard(true);
  }, [params.folderPath, params.cardIndex]);

  const handleSave = () => {
    const folderPath = params.folderPath ? JSON.parse(params.folderPath as string) as string[] : [];
    const cardIndex = params.cardIndex ? parseInt(params.cardIndex as string, 10) : -1;
    if (cardIndex < 0) return;

    updateCard(folderPath, cardIndex, { front, back, memo });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
    },
    field: {
      marginBottom: 16,
    },
    label: {
      fontSize: 10,
      margin: 2,
      color: colors.titleText,
      fontFamily: getDefaultFontFamily('bold', settings.englishFont, settings.japaneseFont),
    },
    input: {
      backgroundColor: 'white',
      borderColor: colors.plainText,
      borderRadius: 5,
      padding: 3,
      fontSize: 20,
      minHeight: 40,
      
      fontFamily: getDefaultFontFamily(undefined, settings.englishFont, settings.japaneseFont),
      
      ...shadow
    },
    memoInput: {
      minHeight: 100,
      textAlignVertical: 'top',
      
      fontFamily: getDefaultFontFamily(undefined, settings.englishFont, settings.japaneseFont)
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    button: {
      backgroundColor: '#84e053',
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    cancelButton: {
      backgroundColor: '#999',
    },
    buttonText: {
      fontFamily: getDefaultFontFamily('bold', settings.englishFont, settings.japaneseFont),
      color: 'white',
      fontSize: 16,
    },
    errorText: {
      fontSize: 16,
      color: '#900',
      marginBottom: 20,
    },
    largeTextStyle: {
      fontFamily: getDefaultFontFamily(undefined, settings.englishFont, settings.japaneseFont),
      fontSize: 32,
      color: "white",
      textAlign: "center",
      justifyContent: 'center'
    }
  });

  if (!isValidCard) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.errorText}>カードが見つかりませんでした。</Text>
        <Pressable style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>戻る</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{height: 48, backgroundColor: "black"}}>
        <Text style={styles.largeTextStyle}>アイフォン15ではここが使えない</Text>
      </View>

      <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>表面</Text>
        <TextInput
          style={styles.input}
          value={front}
          multiline
          onChangeText={setFront}
          placeholder="英単語"
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>裏面</Text>
        <TextInput
          style={styles.input}
          value={back}
          multiline
          onChangeText={setBack}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>メモ</Text>
        <TextInput
          style={styles.input}
          value={memo}
          onChangeText={setMemo}
          multiline
        />
      </View>
      <View style={styles.buttonRow}>
        <Pressable style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
          <Text style={styles.buttonText}>キャンセル</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>保存</Text>
        </Pressable>
      </View>
    </View>
    </>
  );
}