import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, FlatList, Text, Dimensions} from 'react-native';
import {MyThemeClass} from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../../../assets/css/ProductDetailStyle';

const {width, height} = Dimensions.get('screen');

function ProductDetailSizeList({item, themecolor, touch}) {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={touch}
        >
     <View style={{width:width*0.15,margin:5,flexDirection:'column'}}>
          <View style={{width:width*0.15,flexDirection:'row'}}>
              <Text allowFontScaling={false} style={{
            ...styles.HeadText2,
            color: themecolor.TXTWHITE,
            backgroundColor:themecolor.LIGHTGREY
          }}> {item.size}
          </Text>
          
          </View>
          <View style={{width:width*0.15,flexDirection:'row',justifyContent:'center'}}>
              <Text allowFontScaling={false} style={{
            ...styles.HeadText3,
            color:'grey',
          }}>
          &#8377;{item.amount}
          </Text>
         </View>
         </View>
      </TouchableOpacity>
    </>
  );
}


export function ProductDetailSizeFlatList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <>
      <FlatList
        data={props.sizes}
        renderItem={({item}) => (
          <ProductDetailSizeList item={item} themecolor={themecolor} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    </>
  );
}
