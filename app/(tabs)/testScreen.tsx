import React, { useEffect } from 'react';
import {
  Text,
  View,
  SectionList,
  StatusBar,
} from 'react-native';

export default function testScreen() {
  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  const renderItem = ({ item }: { item: string }) => {
    return (
      <View
        style={{
          height: 40,
          justifyContent: 'center',
          borderTopWidth: 1,
          borderTopColor: '#EAEAEA',
        }}
      >
        <Text>{item}</Text>
      </View>
    );
  };

  const renderSectionHeader = ({ section }: { section: { title: string } }) => {
    return (
      <View
        style={{
          height: 28,
          backgroundColor: '#F0F0F0',
          justifyContent: 'center',
        }}
      >
        <Text>{section.title}</Text>
      </View>
    );
  };

  return (
    <SectionList
      style={{ flex: 1 }}
      keyExtractor={item => item}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      sections={[
        {
          title: 'フォルダ',
          data: ['ロシア', 'ウルグアイ', 'エジプト', 'サウジアラビア'],
        },
        {
          title: 'カード',
          data: ['ポルトガル', 'スペイン', 'イラン', 'モロッコ'],
        },
      ]}
    />
  );
}
