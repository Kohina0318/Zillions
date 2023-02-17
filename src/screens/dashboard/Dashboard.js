import React, {useState} from 'react';
import {View, Text, StatusBar, Dimensions,ScrollView,Image, ImageBackground} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import {styles} from '../../assets/css/DashboardStyle'
import CarouselFile from '../../components/shared/Carousel/CarouselFile';
const { width, height } = Dimensions.get('screen');

const data=[
  {
    title:"Hello",
    body:"bhxabcbdnndvndvmvnm",
    image:'https://www.zillionsbuyer.com/uploads/product_image/product_821_1_thumb.jpg'

  },
  {
    title:"hiii",
    body:"bhxabcbdnndvndvmvnm",
    image:'https://www.zillionsbuyer.com/uploads/product_image/product_821_1_thumb.jpg'
  },
  {
    title:"Hyyyyy",
    body:"bhxabcbdnndvndvmvnm",
    image:'https://www.zillionsbuyer.com/uploads/product_image/product_821_1_thumb.jpg'
  },
  
]

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
      <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{...styles.container,backgroundColor:themecolor.LOGINTHEMECOLOR1}}>
          <CarouselFile data={data}/>
      </View>
      <View style={{...styles.container,backgroundColor:themecolor.LOGINTHEMECOLOR1}} >

      </View>
      </ScrollView>
    </View>
  );
}
