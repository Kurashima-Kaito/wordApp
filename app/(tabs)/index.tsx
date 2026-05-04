//import { LinearGradient } from 'expo-linear-gradient';  //グラデーション
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useState, useEffect } from 'react';
import {
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View
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
} from '../lib/cardsStore';
import { boldWeight, shadow, useColors } from '../lib/colors';
import { useTheme } from '../lib/themeContext';

//読み上げ
import { Ionicons } from '@expo/vector-icons';
import * as ExpoSpeech from "expo-speech";
import { franc } from 'franc';

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();

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

  useFocusEffect(
    useCallback(() => {
      setFoldersData(JSON.parse(JSON.stringify(getCardsData())));
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
          ]}
        >
          <View style={cardStyles.cardTitleContainer}>
            <Ionicons name="volume-high" size={20} color="grey" onPress={() => handleSpeech(card.front)} />
            <View style={{width: 5}}/>
            <Text style={cardStyles.cardTitleTextStyle}>
              {card.front}
            </Text>
            <Text style={cardStyles.cardIndexTextStyle}>{cardIndex}</Text>
          </View>
          <View style={cardStyles.cardSubTitleContainer}>
            <Text style={cardStyles.cardSubTitleTextStyle}>{card.back}</Text>
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
      height: 80,
      backgroundColor: colors.element,
      borderLeftWidth: 6,
      borderLeftColor: colors.accentColor,

      ...shadow,
    },
    folderHover: {
      backgroundColor: colors.elementHover,
    },
    folderPressed: {
      backgroundColor: colors.elementClicked,
    },
    folderTitleContainer: {
      marginTop: 10,
      height: 35,
      justifyContent: "center",
      paddingLeft: 10,
      paddingRight: 20,
    },
    folderSubTitleContainer: {
      height: 30,
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
      minHeight: 80,
      backgroundColor: colors.element,
      borderTopWidth: 6,
      borderTopColor: colors.accentColor,
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
      textAlignVertical: "center" as const,
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
      backgroundColor: colors.accentColor,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  //テキスト、その他のスタイル
  const styles = StyleSheet.create({
    dividerStyle: {
      borderBottomWidth: 2,
      marginHorizontal: 5,
      borderColor: colors.element,
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
    }
  });

  return (
    <>
      <View style={{height: 48, backgroundColor: "black"}}>
        <Text style={styles.largeTextStyle}>アイフォン15ではここが使えない</Text>
      </View>

      <View style={{height: 48, backgroundColor: colors.element, alignItems: "center", justifyContent: "center", ...shadow}}>
        <Pressable onPress={() => router.push('/settings')}>
          <View style={{width: 30, height: 30, backgroundColor: colors.accentColor}}></View>
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
        <Text style={styles.largeTextStyle}>＜</Text>
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