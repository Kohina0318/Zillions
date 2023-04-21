import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from '../../assets/css/SearchCss/searchStyle';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import FA from 'react-native-vector-icons/FontAwesome';

export const SortSlider = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  
  
  const handleClick = item => {
    if (item == 1) {
      props. setSortBy('SortBy');
      props.setItem("SortBy")
      props.refRBSheet.current.open();
    }
    else{
      props.setPrice('Price');
      props.setItem("Price")
      props.refRBSheet.current.open();
    }
   
  };

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{flexDirection: 'row'}}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => handleClick(1)}>
        <View
          style={{
            ...styles.SizeView,
            borderColor:
            props.sortBy == 'SortBy' ? themecolor.BLUEWHITE : themecolor.TXTGREYS,
            backgroundColor: 'transparent',
          }}>
          <View style={{...styles.flexDR}}>
            <Text
              allowFontScaling={false}
              style={{
                ...styles.HeadText2,
                color:
                props.sortBy == 'SortBy'
                    ? themecolor.BLUEWHITE
                    : themecolor.TXTWHITE,
              }}>
              Sort By
            </Text>
            <FA
              name="angle-down"
              style={{alignSelf: 'center', marginLeft: 5}}
              size={16}
              color={
                props.sortBy == 'SortBy' ? themecolor.BLUEWHITE : themecolor.TXTWHITE
              }
            />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} onPress={() => handleClick(2)}>
        <View
          style={{
            ...styles.SizeView,
            borderColor:
              props.price == 'Price' ? themecolor.BLUEWHITE : themecolor.TXTGREYS,
            backgroundColor: 'transparent',
          }}>
          <View style={{...styles.flexDR}}>
            <Text
              allowFontScaling={false}
              style={{
                ...styles.HeadText2,
                color:
                props.price == 'Price' ? themecolor.BLUEWHITE : themecolor.TXTWHITE,
              }}>
              Price
            </Text>
            <FA
              name="angle-down"
              style={{alignSelf: 'center', marginLeft: 5}}
              size={16}
              color={
                props.price == 'Price' ? themecolor.BLUEWHITE : themecolor.TXTWHITE
              }
            />
          </View>
        </View>
      </TouchableOpacity>

      {props.disabledClearAll ? (
        <TouchableOpacity activeOpacity={0.8} onPress={() =>  props.onClear()}>
          <View
            style={{
              ...styles.SizeView1,
              backgroundColor: 'transparent',
            }}>
            <View style={{...styles.flexDR}}>
              <Text
                allowFontScaling={false}
                style={{
                  ...styles.HeadText2,
                  color: themecolor.BLUEWHITE,
                }}>
                Clear All
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};
