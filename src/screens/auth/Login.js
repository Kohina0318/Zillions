import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('screen');

export default function Login(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const navigation = useNavigation()

  const isDarkMode = Appearance.getColorScheme() === 'dark';

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <View style={{backgroundColor:themecolor.LOGINTHEMECOLOR, color:themecolor.TXTWHITE}}><Text> kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</Text></View>
    </>
  );
}
