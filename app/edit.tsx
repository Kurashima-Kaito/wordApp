import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { getCard, updateCard, defaultFont } from './lib/cardsStore';

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
      <View style={{height: 48, backgroundColor: "gray"}}>
        <Text style={styles.largeTextStyle}>アイフォン15ではここが使えない</Text>
      </View>
      <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Front</Text>
        <TextInput
          style={styles.input}
          value={front}
          multiline={true}
          onChangeText={setFront}
          placeholder="英単語"
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Back</Text>
        <TextInput
          style={styles.input}
          value={back}
          onChangeText={setBack}
          placeholder="意味"
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Memo</Text>
        <TextInput
          style={[styles.input, styles.memoInput]}
          value={memo}
          onChangeText={setMemo}
          placeholder="メモ"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    
    ...defaultFont
  },
  memoInput: {
    minHeight: 100,
    textAlignVertical: 'top',
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
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: '#900',
    marginBottom: 20,
  },
  largeTextStyle: {
    ...defaultFont,
    fontSize: 32,
    color: "white",
    textAlign: "center",
    justifyContent: 'center'
  }
});
