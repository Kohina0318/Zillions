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
import { styles } from '../../../../assets/css/AddressStyle';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const {width} = Dimensions.get('screen');

function ManageAddressDataFlateList({item, themecolor}) {

  const navigation = useNavigation();

  
  return (
      <TouchableOpacity activeOpacity={0.8}
        style={{
          ...styles.datalistView,
          backgroundColor: themecolor.BOXBORDERCOLOR,
          borderColor: themecolor.BOXBORDERCOLOR1,
        }}
        // onPress={() => navigation.navigate('SubCategories',{categoryId:item.category_id,categoryName:item.category_name})}
        >
        <View style={{...styles.innerView}}>
          <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
            Address : 
            <Text style={{...styles.txt1, color: themecolor.TXTWHITE}}> {item.address}</Text>
          </Text>  
        </View>

      </TouchableOpacity>
  );
}

export function ManageAddressDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return ( 
    <FlatList
      data={props.data}
      renderItem={({item}) => (
        <ManageAddressDataFlateList item={item} themecolor={themecolor} />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
