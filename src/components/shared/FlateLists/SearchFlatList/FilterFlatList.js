import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { styles } from '../../../../assets/css/SearchCss/searchStyle';
import {MyThemeClass} from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import { CheckBox } from '@rneui/themed';

const {width, height} = Dimensions.get('screen');



function FilterBrandList({item,index,selectedIndex,onChange1, themecolor}) {
  
  return (
    <>   
      <View style={styles.checkboxContainer}>
      <CheckBox
      center
      title={item.brand_name}
      checked={selectedIndex==index?true:false}
          onPress={() => onChange1(index)}
      textStyle={{color:themecolor.TXTWHITE}}
      checkedColor={themecolor.ADDTOCARTBUTTONCOLOR}
      containerStyle={{backgroundColor:'transparent'}}
    />
      </View>
    </>
  );
}

export function FilterBrandFlatList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [selectedIndex, setIndex] = React.useState(-1);

  const onChange1=(value)=>{
    setIndex(value)
  }


  return (
    <>
      <FlatList
        data={props.data}
        renderItem={({item,index}) => (
          <FilterBrandList item={item} index={index} selectedIndex={selectedIndex} onChange1={(value)=>onChange1(value)} themecolor={themecolor} />
        )}
        // horizontal={true}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: width * 0.94,
        }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    </>
  );
}


function FilterCategoryList({item,index,selectedIndex,onChange1, themecolor}) {
  
  return (
    <>   
      <View style={styles.checkboxContainer}>
      <CheckBox
      center
      title={item.category_name}
      checked={selectedIndex==index?true:false}
          onPress={() => onChange1(index)}
      textStyle={{color:themecolor.TXTWHITE}}
      checkedColor={themecolor.ADDTOCARTBUTTONCOLOR}
      containerStyle={{backgroundColor:'transparent'}}
    />
      </View>
    </>
  );
}

export function FilterCategoryFlatList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [selectedIndex, setIndex] = React.useState(-1);

  const onChange1=(value)=>{
    setIndex(value)
  }


  return (
    <>
      <FlatList
        data={props.data}
        renderItem={({item,index}) => (
          <FilterCategoryList item={item} index={index} selectedIndex={selectedIndex} onChange1={(value)=>onChange1(value)} themecolor={themecolor} />
        )}
        // horizontal={true}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: width * 0.94,
        }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    </>
  );
}