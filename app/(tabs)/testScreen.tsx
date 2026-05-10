import { useState } from 'react';
import { Platform, Text, View, StyleSheet, TextInput, Button, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { TabBar, useColors, shadow } from '../lib/colors';

export default function testScreen() {
  const router = useRouter();
  const [word, setWord] = useState('');
  const [url, setUrl] = useState('');
  const colors = useColors();

  const handleSearch = () => {
    if (!word) return;

    // YouGlish埋め込みURL
    const embedUrl = `https://youglish.com/pronounce/${word}/english?autoplay=1`;
    setUrl(embedUrl);
  };

  const LiquidGlassButton = ({ title, onPress }: { title: string; onPress?: () => void }) => {
    if (Platform.OS !== 'ios') {
      return <Button title={title} onPress={onPress} />;
    }

    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.liquidButtonContainer,
          pressed && { transform: [{ scale: 0.98 }] },
        ]}
      >
        <BlurView intensity={80} tint="light" style={styles.blurContainer}>
          <View style={styles.buttonContent}>
            <Text style={styles.liquidButtonText}>{title}</Text>
          </View>
        </BlurView>
      </Pressable>
    );
  };

const html = `
<!DOCTYPE html>
<html>
  <body>
    <div style="transform: scale(0.5); transform-origin: top;">
      <div id="yg-widget"></div>
    </div>

    <script src="https://youglish.com/public/emb/widget.js"></script>
    <script>
      new YG.Widget("yg-widget", {
        width: 2000,
        height: 600,

        query: "${word}",
        lang: "english",
        autoplay: 1
      });
    </script>
  </body>
</html>
`;

  return (
    <>
    <TabBar/>
    <View style={[styles.header, { backgroundColor: colors.element }]}>
      <Pressable onPress={() => router.replace('/')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color={colors.plainText} />
      </Pressable>
      <Text style={[styles.headerTitle, { color: colors.plainText }]}>テスト</Text>
    </View>
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { color: colors.plainText, borderColor: colors.divider }]}
        placeholder="単語を入力"
        placeholderTextColor={colors.plainText + '80'}
        value={word}
        onChangeText={setWord}
      />
      <Button title="検索" onPress={handleSearch} />

      {url !== '' && (
        Platform.OS === 'web' ? (
          <iframe
            srcDoc={html}
            style={{ width: '100%', height: '500px', border: 'none' }}
          />
        ) : (
          <WebView originWhitelist={['*']} source={{ html }} />
        )
      )}
    </View>
    <View style={styles.buttonWrapper}>
      <LiquidGlassButton title="ボタン"/>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
    ...shadow,
    zIndex: 10,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  input: {
    height: 40,
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  webview: {
    flex: 1,
    marginTop: 10,
  },
  buttonWrapper: {
    padding: 20,
    alignItems: 'center',
  },
  liquidButtonContainer: {
    width: '80%',
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  blurContainer: {
    flex: 1,
  },
  buttonContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Slight tint to help the glass effect
  },
  liquidButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    letterSpacing: 0.5,
  },
});
