import React, {useState} from 'react';
import {View, Text, StatusBar, Appearance, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/shared/header/Header';
const {width, height} = Dimensions.get('screen');

export default function Dashboard(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  
  return (
    <View style={{backgroundColor:themecolor.THEMECOLOR}}>
    <Header title="Home"/>
       <View
        style={{
          // justifyContent: 'center',
          // height: height,
          // alignSelf: 'center',
          flex:1,
          marginTop:100
        }} />
      

      <View style={{width:width*0.95,backgroundColor:"red",justifyContent:'center',alignSelf:'center'}}>
      <Text>Dashboard</Text>
      </View>

    </View>
  );
}
