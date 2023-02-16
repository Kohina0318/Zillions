import React, {useState} from 'react';
import {View, Text, StatusBar, Appearance, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {ProductStyle} from '../../assets/css/ProductStyle';
import {ProductDataList} from '../../components/shared/FlateLists/ProductDataList';
import {ScrollView} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');

export default function Products(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const data = [
    {
      id: 1,
      title: 'Makita Angle Grinder M9509B',
      ptr: '400',
      mrp: '600',
      rate: '2',
      discount: '10',
    },
    {
      id: 2,
      title: 'Makita Portable Cut-off M2401B High performance and durability',
      ptr: '300',
      mrp: '700',
      rate: '3',
      discount: '30',
    },
    {
      id: 3,
      title:
        'Makita Angle Grinder M9506B High performance and durability at less expense',
      ptr: '499',
      mrp: '599',
      rate: '2.5',
      discount: '10',
    },
    {
      id: 4,
      title: 'Makita Angle Grinder M9512B Continuous rating Input : 720W',
      ptr: '200',
      mrp: '350',
      rate: '4.5',
      discount: '5',
    },
    {
      id: 5,
      title: 'Makita Angle Grinder M9509B',
      ptr: '599',
      mrp: '1000',
      rate: '5',
      discount: '50',
    },
    {
      id: 6,
      title: 'Makita Angle Grinder M9509B',
      ptr: '599',
      mrp: '1000',
      rate: '5',
      discount: '50',
    },
    {
      id: 7,
      title: 'Makita Angle Grinder M9509B',
      ptr: '599',
      mrp: '1000',
      rate: '5',
      discount: '50',
    },
  ];

  return (
    <View style={{...ProductStyle.bg, backgroundColor: themecolor.THEMECOLOR}}>
      <View
        style={{
          ...ProductStyle.container,
        }}>
        <View style={{marginTop: 10}}>
          <ScrollView  showsVerticalScrollIndicator={false}>
            <ProductDataList data={data} />
            <View style={{marginVertical: 20}} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
