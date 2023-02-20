import React, {useState} from 'react';
import {View, Text, StatusBar, Appearance, Dimensions,ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/shared/header/Header';
import { styles } from '../../assets/css/WishListStyle';
import { WishListDataList } from '../../components/shared/FlateLists/WishlistFlatList/WishListDataList';
const {width, height} = Dimensions.get('screen');

export default function WishList(props) {
    
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const data = [
    { 
      id: 1,
      title: "jhgfdrtyioo",
      sale_price : "1000",
      purchase_price: "400",
      discount : "30",
      front_image: "https://www.zillionsbuyer.com/uploads/product_image/product_821_1_thumb.jpg"
    },
    {
      id: 2,
      title: "hammer",
      sale_price : "900",
      purchase_price: "200",
      discount : "20",
      front_image: "https://www.zillionsbuyer.com/uploads/product_image/product_821_1_thumb.jpg"
    }
  ]
  
  return (
    <View style={{...styles.bg, backgroundColor: themecolor.THEMECOLOR,}}>
    <Header title="Wishlist" />
 
      <View
        style={{...styles.container}}>
           {data.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <WishListDataList data={data} />
          </ScrollView>
        ) : (
          <View
            style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <Text>No data found!</Text>
          </View>
        )}
        <View style={{marginVertical: 20}} />
     
      </View>
    </View>
  );
}
