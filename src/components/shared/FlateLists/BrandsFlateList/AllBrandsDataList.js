import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {Colors} from '../../../assets/config/Colors';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../../assets/css/BrandsStyle';

const {width} = Dimensions.get('screen');

function AllBrandsDataFlateList({item, themecolor}) {

  const navigation = useNavigation();

  
  return (
      <TouchableOpacity activeOpacity={0.8}
        style={{
          ...styles.datalistView,
          backgroundColor: themecolor.BOXBORDERCOLOR,
          borderColor: themecolor.BOXBORDERCOLOR1,
        }}
        >
        <View style={{...styles.innerImage}}>
          <Image
            source={{uri: item.banner}}
            style={{
              width: 100,
              height: 100,
            }}
          />
          <View style={{marginTop:3}}/>
          <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {item.brand_name}
          </Text>
        </View>
       </TouchableOpacity>
  );
}

export function AllBrandsDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <> 
    <FlatList
      data={props.data}
      renderItem={({item}) => (
        <AllBrandsDataFlateList item={item} themecolor={themecolor} />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
    <View style={{marginVertical: 20}} />
    </>
  );
}
