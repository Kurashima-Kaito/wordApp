//import { LinearGradient } from 'expo-linear-gradient';  //グラデーション
import {
  FlatList,
  Platform, StyleSheet,
  Text,
  View
} from 'react-native';


export default function HomeScreen() {
  const memoData = [
    { id: 1, title: "挨拶です", memo: "こんにちは / Hello" },
    { id: 2, title: "Er du hypp på å gjøre no' ulovlig?", memo: "Jeg vil ha deg over meg til morgengry" },
    { id: 3, title: "持ち物", memo: "筆記用具、手帳、予備のバッテリー" },
    { id: 4, title: "英単語: Apple", memo: "リンゴ。赤い果物。" },
    { id: 5, title: "歴史: 鎌倉幕府", memo: "1185年（いい箱作ろう）源頼朝が開く" },
    { id: 6, title: "技術: React", memo: "UIを構築するためのJavaScriptライブラリ" },
    { id: 7, title: "献立案", memo: "今夜はカレー。隠し味にチョコを入れる。" },
    { id: 8, title: "英単語: Perseverance", memo: "忍耐、粘り強さ。フィンランド語のSISUに近い。" },
    { id: 9, title: "TODO", memo: "ジムに行く。プロテインを買う。" },
    { id: 10, title: "名言", memo: "失敗は成功のもと。エジソンの言葉。" },
    { id: 11, title: "理科: 光合成", memo: "植物が光、水、二酸化炭素から酸素を作る仕組み" },
    { id: 12, title: "パスワードヒント", memo: "実家で最初に飼った犬の名前" },
    { id: 13, title: "読みたい本", memo: "星の王子さま、サピエンス全史" },
    { id: 14, title: "数学: 三平方の定理", memo: "a^2 + b^2 = c^2" },
    { id: 15, title: "旅行計画", memo: "来月は有楽町周辺を散策する" },
    { id: 16, title: "英単語: Ambiguous", memo: "曖昧な、二通りの解釈ができる" },
    { id: 17, title: "雑学", memo: "シロクマの肌は実は黒い" },
    { id: 18, title: "プログラミング", memo: "constは定数、letは再代入可能な変数" },
    { id: 19, title: "フィンランド語", memo: "Kiitos = ありがとう" },
    { id: 20, title: "開発メモ", memo: "フラッシュカードの裏返るアニメーションを実装する" }
  ];

  return (
    <>
      <View style={{height: 48, backgroundColor: "gray"}}>
        <Text style={styles.largeTextStyle}>アイフォン15ではここが使えない</Text>
      </View>
      <FlatList
        //メモデータをdata propsに指定
        data={memoData}
        //一意となるkeyをidで管理
        keyExtractor={item => String(item.id)}
        //アイテムを棒で分割する
        ItemSeparatorComponent={() => <View style={{height: 10}}/>}
        //内包コンポーネントの配列
        contentContainerStyle={styles.cardsContainer}
        //レンダリングされるViewを定義
        renderItem={({item}) => {
          return (
            <View style={styles.cardContainer}>
              <View style={styles.cardTitleContainer}>
                <Text
                  style={styles.cardTitleTextStyle}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.title}
                </Text>
              </View>
              <View style={styles.cardSubTitleContainer}>
                <Text style={styles.cardSubTitleTextStyle}>{item.memo}</Text>
              </View>
              <Text style={styles.cardArrow}>{'＞'}</Text>
            </View>
          );
        }}
      />
    </>
  );
}

//影
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

const styles = StyleSheet.create({
  cardsContainer: {
    paddingTop: 10,
    paddingHorizontal: 20
  },
  cardContainer: {
    width: "100%",
    alignSelf: "stretch",
    
    borderRadius: 5,
    height: 80,
    backgroundColor: "white",

    ...shadow,
  },
  cardTitleContainer: {
    marginTop: 10,
    height: 35,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 20,
  },
  cardSubTitleContainer: {
    height: 30,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  cardTitleTextStyle: {
    ...defaultFont,
    fontWeight: "bold",
    fontSize: 32
  },
  cardSubTitleTextStyle: {
    ...defaultFont,
    fontSize: 16
  },
  cardArrow: {
    position: "absolute",
    right: 8,
    top: 25,
    bottom: 0,
    textAlignVertical: "center",
    color: "silver",
    fontSize: 22,
  },

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
});