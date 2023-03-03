import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import EN from 'react-native-vector-icons/Entypo';
import { styles } from '../../assets/css/searchStyle';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import { useNavigation } from '@react-navigation/native';
import { FilterFlatList } from '../../components/shared/FlateLists/SearchFlatList/FilterFlatList';

const {width, height} = Dimensions.get('window');

export const RBSheetData = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const navigation = useNavigation();

  return (
    <>
    {
      props.item=="Brand"||props.item=="Category"?
      <FilterFlatList data={props.data}/>
      :
      <></>

    }
      
    </>
  );
};
