import { useState } from 'react';
import { Platform, Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { WebView } from 'react-native-webview';

export default function testScreen() {
  const [word, setWord] = useState('');
  const [url, setUrl] = useState('');

  const handleSearch = () => {
    if (!word) return;

    // YouGlish埋め込みURL
    const embedUrl = `https://youglish.com/pronounce/${word}/english?autoplay=1`;
    setUrl(embedUrl);
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="単語を入力"
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  input: {
    height: 40,
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
  },
  webview: {
    flex: 1,
    marginTop: 10,
  },
});