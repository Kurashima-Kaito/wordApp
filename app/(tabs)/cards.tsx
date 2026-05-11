//import { LinearGradient } from 'expo-linear-gradient';  //グラデーション
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useState, useEffect } from 'react';
import {
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight
} from 'react-native-reanimated';
import {
  Card,
  createFolderList,
  findCurrentCardsData,
  findCurrentFoldersData,
  Folder,
  getCardsData,
  loadCardsData,
} from '../lib/cardsStore';
import { boldWeight, shadow, useColors, TabBar } from '../lib/colors';
import { useTheme } from '../lib/themeContext';
import { useLanguage, Language } from '../lib/languageContext';

//読み上げ
import { Ionicons } from '@expo/vector-icons';
import * as ExpoSpeech from "expo-speech";
import { franc } from 'franc';

export default function CardsScreen() {
  const router = useRouter();
  const colors = useColors();

  // ... (rest of the component)

  //今の階層より上のフォルダ名を保存する
  const [currentFolder, setCurrentFolder] = useState<string[]>([]);
  // 実際に表示・アニメーションに使用するフォルダ階層
  const [activeFolder, setActiveFolder] = useState<string[]>([]);
  //今の階層とその下のフォルダ・ファイル
  const [foldersData, setFoldersData] = useState<Folder[]>(() =>
    JSON.parse(JSON.stringify(getCardsData()))
  );
  //読み上げ中かどうか
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  // 遷移の向き
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const { language, setLanguage, t } = useLanguage(); //ローカライズされたテキスト

  useFocusEffect(
    useCallback(() => {
      loadCardsData().then(() => {
        setFoldersData(JSON.parse(JSON.stringify(getCardsData())));
      });
    }, [])
  );

  // currentFolderが変更されたら、次のレンダーでactiveFolderを更新する
  // これにより、アンマウントされるコンポーネントが新しいdirectionを確実に受け取った状態でアニメーションを開始できる
  useEffect(() => {
    setActiveFolder(currentFolder);
  }, [currentFolder]);

  const currentFoldersData = findCurrentFoldersData(activeFolder, foldersData);
  const folderList = createFolderList(currentFoldersData);

  const cardList = findCurrentCardsData(activeFolder, foldersData);
  console.log(currentFoldersData, cardList)

  //フォルダをクリックしたときの処理
  const handleFolderPress = (name: string) => {
    setDirection('forward');
    setCurrentFolder(prev => [...prev, name]);
  };
  
  //カードをクリックしたときの処理
  const handleCardPress = (cardIndex: number) => {
    router.push(
      `/edit?folderPath=${encodeURIComponent(JSON.stringify(activeFolder))}&cardIndex=${cardIndex}`
    );
  };
  
  //フォルダ戻るボタン
  const handleUndoPress = () => {
    setDirection('backward');
    setCurrentFolder(prev => prev.slice(0, -1));
  };

  //読み上げボタン
  const handleSpeech = (text: string) => {
      // 再生中の場合は、音声を停止する。
      if (isSpeaking) {
          ExpoSpeech.stop()
          setIsSpeaking(false)
          return
      }

      setIsSpeaking(true)

      const detectedLang = franc(text);
      let language = 'en'; // デフォルト
      if (detectedLang !== 'und') {
        language = detectedLang.slice(0, 2); // ISO 639-1形式に変換
      }

      // expo-speechのパラメータ設定
      const options = {
          language: language,
          pitch: 1.0,  // 音声のピッチ
          rate: 1.0,  // 音声速度
          onDone: () => setIsSpeaking(false),  // 再生完了時の処理
          onError: () => setIsSpeaking(false) // 再生中にエラーが発生した時の処理
      }
      // テキストの内容を音声読み上げ
      ExpoSpeech.speak(text, options)
  };

  //フォルダ描画
  const FolderItem = ({ name }: { name: string }) => {
    return (
      <>
        <Pressable
          onPress={() => handleFolderPress(name)}
          style={({hovered, pressed}) => [
            folderStyles.folderContainer,
            hovered && folderStyles.folderHover,
            pressed && folderStyles.folderPressed,
          ]}
        >
          <View style={folderStyles.folderTitleContainer}>
            <Text
              style={folderStyles.folderTitleTextStyle}
              numberOfLines={1}
              ellipsizeMode="tail">
              {name}
            </Text>
          </View>
          <View style={folderStyles.folderSubTitleContainer}>
            <Text style={folderStyles.folderSubTitleTextStyle}>a</Text>
          </View>
          <Text style={folderStyles.folderArrow}>{'＞'}</Text>
        </Pressable>
        <View style={{height: 10}}/>
      </>
    );
  };

  // HSVからRGBに変換するヘルパー
  const hsvToRgb = (h: number, s: number, v: number) => {
    let r = 0, g = 0, b = 0;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  //暗記度に応じた色を取得 (0=赤, 10000=緑) - HSVで補間
  const getBorderColor = (level: number) => {
    const normalizedLevel = Math.max(0, Math.min(10000, level));
    const ratio = normalizedLevel / 10000;
    
    // Hue: 0 (赤) から 120/360 ≒ 0.33 (緑) まで変化させる
    const h = ratio * (120 / 360);
    const s = 0.9; // 彩度
    const v = 0.9; // 明度
    
    const { r, g, b } = hsvToRgb(h, s, v);
    return `rgb(${r}, ${g}, ${b})`;
  };

  //カード描画
  const CardItem = ({ card, cardIndex }: { card: Card; cardIndex: number }) => {
    return (
      <>
        <Pressable
          onPress={() => handleCardPress(cardIndex)}
          style={({hovered, pressed}) => [
            cardStyles.cardContainer,
            hovered && cardStyles.cardHover,
            pressed && cardStyles.cardPressed,
            { flexDirection: 'row', borderLeftColor: getBorderColor(card.memorizationLevel) }
          ]}
        >
          <View style={{ paddingLeft: 6, paddingTop: 5, justifyContent: 'flex-start', alignItems: "center" }}>
            <Ionicons name="volume-high" size={20} color="grey" onPress={() => handleSpeech(card.front)} />
          </View>

          <View style={{ width: 1, backgroundColor: colors.divider, margin: 5, alignSelf: 'stretch'}} />

          <View style={{ flex: 1 }}>
            <View style={[cardStyles.cardTitleContainer, { paddingLeft: 0 }]}>
              <Text style={cardStyles.cardTitleTextStyle}>
                {card.front}
              </Text>
              <Text style={cardStyles.cardIndexTextStyle}>{cardIndex}</Text>
            </View>
            <View style={[cardStyles.cardSubTitleContainer, { paddingLeft: 0 }]}>
              <Text style={cardStyles.cardSubTitleTextStyle}>{card.back}</Text>
            </View>
          </View>
        </Pressable>
        {card.memo !== "" && (
          <View style={cardStyles.cardMemoContainer}>
            <Text style={cardStyles.cardMemoTextStyle}>
              {card.memo}
            </Text>
          </View>
        )}
        <View style={{height: 10}}/>
      </>
    );
  };

  //フォルダ描画とカード描画をひとまとめにする
  const renderItem = ({ item, index, section }: { item: string | Card; index: number; section: { title: string } }) => {
    const isFolderSection = section.title === 'フォルダ';
    return isFolderSection
      ? <FolderItem name={item as string} />
      : <CardItem card={item as Card} cardIndex={index} />;
  };

  //セクションヘッダー描画。フォルダとカードの間に線を引く
  const renderSectionHeader = ({ section }: { section: { title: string } }) => {
    return section.title === 'カード' ? <View style={styles.dividerStyle}/> : <></>;
  };

 //フォルダ関連のスタイル
  const folderStyles = StyleSheet.create({
    foldersContainer: {
      paddingTop: 10,
      paddingHorizontal: 20,
      backgroundColor: colors.background,
      flex: 1,
    },
    folderContainer: {
      width: "100%",
      alignSelf: "stretch",
      
      borderRadius: 5,
      paddingBottom: 10,
      backgroundColor: colors.element,
      borderTopWidth: 6,
      borderTopColor: colors.accentColor,

      ...shadow,
    },
    folderHover: {
      backgroundColor: colors.elementHover,
    },
    folderPressed: {
      backgroundColor: colors.elementClicked,
    },
    folderTitleContainer: {
      justifyContent: "center",
      padding: 5,
      paddingLeft: 10,
      paddingRight: 20,

    },
    folderSubTitleContainer: {
      justifyContent: "center",
      paddingHorizontal: 10,
    },
    folderTitleTextStyle: {
      fontWeight: boldWeight,
      fontSize: 28,
      color: colors.titleText,
    },
    folderSubTitleTextStyle: {
      fontSize: 16,
      color: colors.plainText,
    },
    folderArrow: {
      position: "absolute",
      right: 8,
      top: 25,
      bottom: 0,
      textAlignVertical: "center" as const,
      color: colors.plainText,
      fontSize: 22,
    },
  });

  //カード関連のスタイル
  const cardStyles = StyleSheet.create({
    cardsContainer: {
      paddingTop: 10,
      paddingHorizontal: 20
    },
    cardContainer: {
      ...shadow,
      width: "100%",
      alignSelf: "stretch",
      
      borderRadius: 5,
      minHeight: 50,
      backgroundColor: colors.element,
      borderLeftWidth: 6,
      borderLeftColor: colors.accentColor,
      zIndex: 2,
    },
    cardMemoContainer: {
      ...shadow,
      width: "90%",
      alignSelf: "center",
      
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      padding: 5,

      backgroundColor: colors.memo,
      zIndex: 1,
    },
    cardHover: {
      backgroundColor: colors.elementHover,
    },
    cardPressed: {
      backgroundColor: colors.elementClicked,
    },
    cardTitleContainer: {
      marginTop: 0,
      minHeight: 35,
      justifyContent: "center",
      paddingLeft: 10,
      paddingRight: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    cardSubTitleContainer: {
      justifyContent: "center",
      paddingHorizontal: 10,
      marginBottom: 5,
    },
    cardTitleTextStyle: {
      fontWeight: boldWeight,
      fontSize: 28,
      color: colors.titleText,
    },
    cardSubTitleTextStyle: {
      fontSize: 16,
      color: colors.plainText,
    },
    cardIndexTextStyle: {
      fontSize: 14,
      color: colors.plainText,
      marginLeft: "auto",
    },
    cardMemoTextStyle: {
      fontSize: 14,
      color: colors.titleText,
    },
  });

  //ボタン関連のスタイル
  const buttonStyles = StyleSheet.create({
    undoButton: {
      ...shadow,
      position: "absolute",
      left: 10,
      bottom: 20,
      alignItems: "center",
      justifyContent: "center",
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.lessAccentColor,
    },
    fab: {
      ...shadow,
      position: "absolute",
      right: 20,
      bottom: 20,
      width: 65,
      height: 65,
      borderRadius: 32.5,
      backgroundColor: colors.lessAccentColor,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  //テキスト、その他のスタイル
  const styles = StyleSheet.create({
    dividerStyle: {
      borderBottomWidth: 2,
      marginHorizontal: 5,
      borderColor: colors.divider,
      marginBottom: 10,
    },

    miniTextStyle: {
      fontSize: 16,
      color: colors.plainText,
    },
    accentTextStyle: {
      fontSize: 32,
      color: colors.accentColor,
    },
    largeTextStyle: {
      fontSize: 32,
      color: "white",
      textAlign: "center",
    },
    fabIcon: {
      fontSize: 40,
      color: "white",
    },
    folderPassTextStyle: {
      fontSize: 15,
      color: colors.plainText,
    }
  });

  return (
    <>
      <TabBar/>

      <View style={{height: 48, backgroundColor: colors.element, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 50, ...shadow, zIndex: 10}}>
        <Text 
          style={styles.folderPassTextStyle}
          numberOfLines={1}
          ellipsizeMode="middle"
        >
          {activeFolder.length === 0 ? t('cards') : [t('cards'), ...activeFolder].join(' > ')}
        </Text>
        <Pressable 
          onPress={() => router.push('/settings')}
          style={{position: "absolute", right: 10}}
        >
          <View style={{width: 30, height: 30}}>
            <Ionicons name="menu" size={30} color={colors.plainText} />
          </View>
        </Pressable>
      </View>
      
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Animated.View
          key={activeFolder.join('/')}
          entering={(direction === 'forward' ? SlideInRight : SlideInLeft).duration(300)}
          exiting={(direction === 'forward' ? SlideOutLeft : SlideOutRight).duration(300)}
          style={{ flex: 1 }}
        >
          <SectionList
            style={folderStyles.foldersContainer}
            keyExtractor={(item, index) =>
              typeof item === 'string' ? item : `${item.front}-${index}`
            }
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            sections={[
              {
                title: 'フォルダ',
                data: folderList,
              },
              {
                title: 'カード',
                data: cardList,
              },
            ]}
          />
        </Animated.View>
      </View>
      
      <Pressable
        onPress={() => handleUndoPress()}
        style={buttonStyles.undoButton}
      >
        <Ionicons name="arrow-back" size={40} color="white" />
      </Pressable>

      <Pressable
        onPress={() => router.push('/selectFolder')}
        style={buttonStyles.fab}
      >
        <Ionicons name="play" size={32} color="white" />
      </Pressable>
    </>
  );
}
