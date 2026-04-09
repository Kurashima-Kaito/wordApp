import React, { useEffect } from 'react';
import {
  Text,
  View,
  SectionList,
  StatusBar,
} from 'react-native';

export default function testScreen() {
  const renderItem = ({ item }: { item: string }) => {
    return (
      <Text>{item}</Text>
    );
  };

  const renderSectionHeader = ({ section }: { section: { title: string } }) => {
    return (
      <Text>{section.title}</Text>
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
