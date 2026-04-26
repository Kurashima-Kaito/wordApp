import React from 'react';
import { Platform, Text, View } from 'react-native';

export default function testScreen() {

  //テキスト、その他のスタイル
  const dynamicStyles = {
    largeTextStyle: {
      fontSize: 32,
      color: "white",
    },
    englishTextStyle: {
      fontFamily: Platform.OS === 'ios' 
        ? 'Gentium Book Plus'
        : 'GentiumBookPlus-Regular',
      fontSize: 32,
      color: "black",
    },
    japaneseTextStyle: {
      fontFamily: 'BIZUDPGothic-Regular',
      fontSize: 32,
      color: "black",
    },
  };

  return (
    <>
      <View style={{height: 48, backgroundColor: "black"}}>
        <Text style={dynamicStyles.largeTextStyle}>アイフォン15ではここが使えない</Text>
      </View>
      <View>
        <Text style={dynamicStyles.englishTextStyle}>テストの画面つまりTestScreen</Text>
        <Text style={dynamicStyles.japaneseTextStyle}>テストの画面</Text>
        <Text style={dynamicStyles.japaneseTextStyle}>テストの画面つまりTestScreen</Text>
      </View>
    </>
  );
}

