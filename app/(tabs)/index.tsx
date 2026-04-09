//import { LinearGradient } from 'expo-linear-gradient';  //グラデーション
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  SectionList,
  StatusBar,
} from 'react-native';
import { useState } from 'react';

const cardsData = [
  {
    name: "英単語English",
    folders: [
      {
        name: "犬1900(青)",
        folders: [
          { name: "犬1900, 100~200", folders: [], cards: [] },
        ],
        cards: []
      },
      { name: "犬1200(黄)", folders: [], cards: [] },
    ],
    cards: [
      {front: "Apple", back: "リンゴ", memo: "赤い果物"},
      {front: "Perseverance", back: "忍耐、粘り強さ", memo: ""},
      {front: "Ambiguous", back: "曖昧な、二通りの解釈ができる", memo: ""},
    ]
  },
  {
    name: "仏単語Français",
    folders: [],
    cards: []
  }
];

//フォルダーとカードの型定義（仮）
type Folder = {
  name: string;
  folders: Folder[];
  cards: Card[];
}
type Card = {
  front: string;
  back: string;
  memo: string;
}

const accentColor = "#84e053";
const lessAccentColor = "#78bd53";

export default function HomeScreen() {

  //今の階層より上のフォルダ名を保存する
  const [currentFolder, setCurrentFolder] = useState<string[]>([]);
  //今の階層とその下のフォルダ・ファイル
  const [foldersData, setFoldersData] = useState<Folder[]>(cardsData);
  const currentFoldersData = findCurrentFoldersData(currentFolder, foldersData);
  const folderList = createFolderList(currentFoldersData);

  const cardList = findCurrentCardsData(currentFolder, foldersData);
  console.log(currentFoldersData, cardList)

  //フォルダをクリックしたときの処理
  const handleFolderPress = (name: string) => {
    //フォルダ更新
    setCurrentFolder(prev => [...prev, name]);
  };
  
  //フォルダ戻るボタン
  const handleUndoPress = () => {
    //フォルダ階層を一つ浅くする
    setCurrentFolder(prev => prev.slice(0, -1));
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
  const CardItem = ({ card }: { card: Card }) => {
    return (
      <Text style={styles.miniTextStyle}>{card.front}</Text>
    );
  };

  //フォルダ描画とカード描画をひとまとめにする
  const renderItem = ({ item, section }: { item: string | Card; section: { title: string } }) => {
    const isFolderSection = section.title === 'フォルダ';
    return isFolderSection ? <FolderItem name={item as string} /> : <CardItem card={item as Card} />;
  };

  const renderSectionHeader = ({ section }: { section: { title: string } }) => {
    return (
      <Text>{section.title}</Text>
    );
  };

  return (
    <>
      <View style={{height: 48, backgroundColor: "gray"}}>
        <Text style={styles.largeTextStyle}>アイフォン15ではここが使えない</Text>
      </View>
      
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
      
      <Pressable
        onPress={() => handleUndoPress()}
        style={buttonStyles.undoButton}
      >
        <Text style={styles.largeTextStyle}>＜</Text>
      </Pressable>
    </>
  );
}

//currentFolderの階層にあるフォルダのデータを返す
function findCurrentFoldersData(currentFolder: string[], data: Folder[]): Folder[] {
  let currentData = data;
  for (const folderName of currentFolder) {
    const folder = currentData.find((f): f is Folder => f.name === folderName);
    if (!folder) return [];
    currentData = folder.folders;
  }
  return currentData;
}

//currentFolderの階層にあるカードのデータを返す
function findCurrentCardsData(currentFolder: string[], data: Folder[]): Card[] {
  let currentData = data;
  let index = 0;
  for (const folderName of currentFolder) {
    const folder = currentData.find((f): f is Folder => f.name === folderName);
    if (!folder) return [];
    if (index === currentFolder.length - 1) return folder.cards;
    currentData = folder.folders;
    index++;
  }
  return [];
}

//cardsDataから一画面に表示するフォルダだけ取り出す
function createFolderList(data: Folder[]): string[] {
  const folderList: string[] = [];
  data.forEach((item: Folder) => {
    folderList.push(item.name);
  });
  return folderList;
}

//影のstyle
const shadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 3,
};
const defaultFont = {
  fontFamily: Platform.select({
    ios: 'Times New Roman, Hiragino Sans', 
    android: 'Times New Roman, sans-serif',
    default: 'Bahnschrift, Hiragino Sans'
  }),
}

//フォルダ関連のスタイル
const folderStyles = StyleSheet.create({
  foldersContainer: {
    paddingTop: 10,
    paddingHorizontal: 20
  },
  folderContainer: {
    width: "100%",
    alignSelf: "stretch",
    
    borderRadius: 5,
    height: 80,
    backgroundColor: "white",
    borderLeftWidth: 6,
    borderLeftColor: accentColor,
    overflow: "hidden",

    ...shadow,
  },
  folderHover: {
    backgroundColor: "#f7fbff",
  },
  folderPressed: {
    backgroundColor: "#e6f2ff",
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
    ...defaultFont,
    fontWeight: "bold",
    fontSize: 28
  },
  folderSubTitleTextStyle: {
    ...defaultFont,
    fontSize: 16
  },
  folderArrow: {
    position: "absolute",
    right: 8,
    top: 25,
    bottom: 0,
    textAlignVertical: "center",
    color: "silver",
    fontSize: 22,
  },
});

//ボタン関連のスタイル
const buttonStyles = StyleSheet.create({
  undoButton: {
    ...shadow,
    position: "absolute",
    left: 10,
    bottom: 20,
    textAlignVertical: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: lessAccentColor,
  },
});

//テキスト、その他のスタイル
const styles = StyleSheet.create({
  dividerStyle: {
    borderBottomWidth: 2,
    marginHorizontal: 5,
    borderColor: "silver"
  },

  miniTextStyle: {
    fontSize: 16
  },
  accentTextStyle: {
    fontSize: 32,
    color: "red"
  },
  largeTextStyle: {
    ...defaultFont,
    fontSize: 32,
    color: "white",
    textAlign: "center",
    justifyContent: 'center'
  }
})