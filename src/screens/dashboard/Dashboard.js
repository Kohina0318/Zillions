import React, {useState} from 'react';
import {View, Text, StatusBar, Appearance, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import {styles} from '../../assets/css/DashboardStyle'
const {width, height} = Dimensions.get('screen');

export default function Dashboard(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <View style={{...styles.bg,backgroundColor: themecolor.THEMECOLOR}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Header title="Home" />

      <View
        style={{...styles.container}}>
        <Text>Dashboard</Text>
      </View>
    </View>
  );
}
