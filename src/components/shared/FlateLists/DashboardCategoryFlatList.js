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
import { styles } from '../../../assets/css/DashboardStyle';
import {MyThemeClass} from '../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import {Avatar} from '@rneui/themed';

const {width} = Dimensions.get('screen');

function CategoryDataFlatList({item, themecolor}) {

  const navigation = useNavigation();

  
  return (
      <TouchableOpacity activeOpacity={0.8}
        // style={{
        //   ...CategoryStyle.datalistView,
        //   backgroundColor: themecolor.BOXBORDERCOLOR,
        //   borderColor: themecolor.BOXBORDERCOLOR1,
        // }}
        onPress={() => navigation.navigate('SubCategories',{categoryId:item.category_id,categoryName:item.category_name})}
        >
       <View style={{margin:10,width:width*0.2,justifyContent:'center',alignItems:'center'}}>
      <Avatar
                size={70}
                rounded
                avatarStyle={{
                  borderWidth: 5,
                  borderColor: 'white',
                  borderStyle: 'solid',
                }}
                source={{uri: item.banner}}
              />
              <Text style={{color:themecolor.TXTWHITE}} numberOfLines={1}>{item.category_name}</Text>
              </View>
      </TouchableOpacity>
  );
}

export function DashboardCategoryDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return ( 
    <FlatList
      data={props.data}
      renderItem={({item}) => (
        <CategoryDataFlatList item={item} themecolor={themecolor} />
      )}
      horizontal={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
