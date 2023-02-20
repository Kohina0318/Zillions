import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {Colors} from '../../../../assets/config/Colors';
import {styles} from '../../../../../assets/css/DashboardStyle';
import {MyThemeClass} from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {Avatar} from '@rneui/themed';

const {width,height} = Dimensions.get('screen');

function BrandDataFlatList({item, themecolor}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      >
      <View style={{width:width*0.2,height:height*0.15,backgroundColor:themecolor.LOGINTHEMECOLOR,margin:10,flexDirection:'column'}}>
          <Image source={{uri:item.banner}} style={{width:70,height:100,alignSelf:'center',margin:3}}/>
           <View>
            <Text numberOfLines={1} style={{color:themecolor.TXTWHITE,margin:3,fontSize:11}}>
              {item.brand_name}
            </Text>
           </View>
        </View>
    </TouchableOpacity>
  );
}

export function BrandDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({item}) => (
        <BrandDataFlatList item={item} themecolor={themecolor} />
      )}
      horizontal={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
