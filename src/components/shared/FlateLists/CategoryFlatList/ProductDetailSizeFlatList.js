import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, FlatList, Text, Dimensions} from 'react-native';
import {MyThemeClass} from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../../../assets/css/ProductDetailStyle';

const {width, height} = Dimensions.get('screen');

function ProductDetailSizeList({index, touch, selected,onChange, item, themecolor, }) {
  const navigation = useNavigation();

const handleClick=(index)=>{
  onChange(index)
}

console.log('items.......',index, touch, selected, onChange, item, themecolor)
  return (
    <>
      <TouchableOpacity activeOpacity={0.8} disabled={touch}
      onPress={()=>handleClick(index)}>
        <View
          style={{
         ...styles.SizeView,
            borderColor:themecolor.TXTGREYS, 
            backgroundColor:index==selected?themecolor.TXTGREYS:'transparent' 
          }}>
          <View style={{...styles.flexDR}}>
            <Text
              allowFontScaling={false}
              style={{
                ...styles.HeadText2,
                color: themecolor.TXTWHITE,
              }}>
              Size: {item.size}
            </Text>
          </View>
          <View style={{...styles.flexDR}}>
            <Text
              allowFontScaling={false}
              style={{
                ...styles.HeadText3,
                color: themecolor.TXTWHITE,
              }}>
              Price: &#8377;{item.amount}
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
  const [selected,setSelected]=React.useState(0)

  const handleSelected=(item)=>{
    setSelected(item)
  }

  return (
    <>
      <FlatList
        data={props.sizes}
        renderItem={({item,index}) => (
          <ProductDetailSizeList index={index} touch={props.touch} selected={selected} onChange={(value)=>handleSelected(value)} item={item} themecolor={themecolor} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    </>
  );
}
