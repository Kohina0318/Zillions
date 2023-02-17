import React, {useState} from 'react';
import {View, Text, StatusBar, Appearance, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/shared/header/Header';
import { styles } from '../../assets/css/OrderStyle';
const {width, height} = Dimensions.get('screen');

export default function Order(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
 
  return (
    <View style={{...styles.bg, backgroundColor: themecolor.THEMECOLOR,}}>
    <Header title="Order" />
 
      <View
        style={{...styles.container}}>
        <Text>Order</Text>
      </View>
    </View>
  );
}
