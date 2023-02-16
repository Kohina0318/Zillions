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
import {CategoryStyle} from '../../../assets/css/CategoryStyle';
import {MyThemeClass} from '../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';

const {width} = Dimensions.get('screen');

function CategoryDataFlateList({item, themecolor}) {

  const navigation = useNavigation();

  
  return (
    <>
      <View
        style={{
          ...CategoryStyle.datalistView,
          backgroundColor: themecolor.BOXTHEMECOLOR,
          borderColor: themecolor.BOXBORDERCOLOR1,
        }}>
        <View style={{...CategoryStyle.innerImage}}>
          <Image
            source={{uri: item.banner}}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
            }}
          />
        </View>
        <View style={{...CategoryStyle.margleft15}}>
          <Text style={{...CategoryStyle.txt, colors: themecolor.LABEL}}>
            {item.category_name}
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent:"center",alignItems:"center"}}>
          <Text style={{...CategoryStyle.txt1,backgroundColor:themecolor.STARCOLOR}}> 10 </Text>
          <TouchableOpacity
            style={{...CategoryStyle.iconview, borderRadius: 50, padding: 2}}
            onPress={() => navigation.navigate('Products')}
            >
            <FontAwesome name='angle-right' size={25} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export function CategoryDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({item}) => (
        <CategoryDataFlateList item={item} themecolor={themecolor} />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
