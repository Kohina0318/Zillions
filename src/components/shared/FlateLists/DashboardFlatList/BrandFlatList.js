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
import { styles } from '../../../../assets/css/BrandsStyle';
import {MyThemeClass} from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';


const {width,height} = Dimensions.get('screen');

function BrandDataFlatList({item, themecolor}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      >
      {/* <View style={{width:width*0.35,height:height*0.13,backgroundColor:themecolor.LOGINTHEMECOLOR,margin:10,flexDirection:'column'}}>
      <View style={{width:width*0.3,height:'65%',justifyContent:'center',alignItems:'center',alignSelf:'center',margin:3,borderWidth:1,borderColor:'#000'}}>
          <Image source={{uri:item.banner}} resizeMode="contain" style={{width:150,height:'100%'}}/>
          </View>
           <View style={{width:width*0.35,height:height*0.04,justifyContent:'center',alignItems:'center'}}>
            <Text numberOfLines={1} style={{color:themecolor.TXTWHITE,margin:3,fontSize:11}}>
              {item.brand_name}
            </Text>
           </View>
        </View> */}

        <View style={{width:width*0.27,height:height*0.13,margin:5,flexDirection:'column'}}>
      <View style={{width:width*0.26,height:'65%',justifyContent:'center',alignItems:'center',alignSelf:'center',margin:3,borderWidth:4,borderColor:'#FFF',borderRadius:5,backgroundColor:'#FFF'}}>
          <Image source={{uri:item.banner}} resizeMode="contain" style={{width:150,height:'60%'}}/>
          </View>
           <View style={{width:width*0.27,height:height*0.03,justifyContent:'center',alignItems:'center'}}>
            <Text numberOfLines={1} style={{color:themecolor.TXTWHITE,fontSize:11,fontWeight:'bold'}}>
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



function BrandDataFlateList({item, themecolor}) {

    const navigation = useNavigation();
  
    
    return (
        <TouchableOpacity
        activeOpacity={0.8}
        style={{
          ...styles.datalistView,
          backgroundColor: themecolor.BOXBORDERCOLOR,
          borderColor: themecolor.BOXBORDERCOLOR1,
        }}>
        <View style={{...styles.innerImage}}>
          <Image
            source={{uri: item.banner}}
            style={{
              width: width * 0.26,
              height: '70%',
            }}
            resizeMode="stretch"
          />
        </View>
        <View
          style={{
            ...styles.inner,
          }}>
          <View>
            <Text
              style={{...styles.txt, color: themecolor.TXTWHITE}}
              numberOfLines={2}>
              {item.brand_name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  
  export function BrandInDataList(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();
  
    return ( 
      <FlatList
        data={props.data}
        renderItem={({item}) => (
          <BrandDataFlateList item={item} themecolor={themecolor} />
        )}
        horizontal={true}
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: width * 0.94,
      }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      />
    );
  }
