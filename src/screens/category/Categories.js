import React, {useState} from 'react';
import {View, Text, StatusBar, Appearance, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {useNavigation} from '@react-navigation/native';
import { CategoryDataList } from '../../components/shared/FlateLists/CategoryDataList';
const {width, height} = Dimensions.get('screen');

export default function Categories(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const data=[
    {
        id:1,
        name:"kkkkkkkkk"
    },
    {
        id:2,
        name: "ddrtyh"
    }
  ]
 
  return (
    <>
      <View
        style={{
          color: themecolor.TXTWHITE,
          justifyContent: 'center',
          height: height,
          alignSelf: 'center',
        }}>
        <Text>Categories</Text>
        <CategoryDataList data={data} />
      </View>
    </>
  );
}
