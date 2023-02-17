import React, {useState} from 'react';
import {View, Text, StatusBar, Appearance, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/shared/header/Header';
const {width, height} = Dimensions.get('screen');

export default function WishList(props) {
    
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  
  return (
    <View style={{flex:1, backgroundColor: themecolor.THEMECOLOR,}}>
    <Header title="Wishlist" />
 
      <View
        style={{
          justifyContent: 'center',
          height: height,
          alignSelf: 'center',
        }}>
        <Text>WishList</Text>
      </View>
    </View>
  );
}
