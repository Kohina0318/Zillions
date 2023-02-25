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
import {styles} from '../../../../assets/css/AddressStyle';
import {MyThemeClass} from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import HalfSizeButton from '../../button/halfSizeButton';

const {width} = Dimensions.get('screen');

function DefaultAddressDataFlateList({item, themecolor}) {
  const navigation = useNavigation();

  return item.set_default == '1' ? (
    <View
      style={{
        ...styles.datalistView,
        backgroundColor: themecolor.BOXBORDERCOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}
      // onPress={() => navigation.navigate('SubCategories',{categoryId:item.category_id,categoryName:item.category_name})}
    >
      <View style={{...styles.innerView}}>
        <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
          <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {item.address}
          </Text>
        </Text>
        <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
          <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {item.city}
          </Text>
          <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {' - '}
            {item.postal_code}
          </Text>
        </Text>
        <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
          <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {item.state}
          </Text>
          <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {' , '}
            {item.country}
          </Text>
        </Text>
        <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
          Mobile No :
          <Text style={{...styles.txt1, color: themecolor.TXTWHITE}}>
            {' '}
            {item.phone}
          </Text>
        </Text>
      </View>

      <View style={{...styles.DataButton}}>
          <View style={{width: '100%'}}>
            <HalfSizeButton
              title="Remove"
              icon=" "
              backgroundColor={"transparent"}
              color={themecolor.TEXTRED}
              borderColor={themecolor.TEXTRED}
              fontSize={12}
              height={ width * 0.08}
            />
          </View>
         </View>
     
    </View>
  ) : (
    <></>
  );
}

function OtherAddressDataFlateList({item, themecolor}) {
  const navigation = useNavigation();

  return item.set_default == '0' ? (
    <View
      style={{
        ...styles.datalistView,
        backgroundColor: themecolor.BOXBORDERCOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}
      // onPress={() => navigation.navigate('SubCategories',{categoryId:item.category_id,categoryName:item.category_name})}
    >
      <View style={{...styles.innerView}}>
        <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
          <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {item.address}
          </Text>
        </Text>
        <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
          <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {item.city}
          </Text>
          <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {' - '}
            {item.postal_code}
          </Text>
        </Text>
        <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
          <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {item.state}
          </Text>
          <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {' , '}
            {item.country}
          </Text>
        </Text>
        <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
          Mobile No :
          <Text style={{...styles.txt1, color: themecolor.TXTWHITE}}>
            {' '}
            {item.phone}
          </Text>
        </Text>

        </View>

        <View style={{...styles.DataButton}}>
          <View style={{width: '49%'}}>
            <HalfSizeButton
              title="Set as default"
              icon=" "
              backgroundColor={"transparent"}
              color={themecolor.ADDTOCARTBUTTONCOLOR}
              borderColor={themecolor.ADDTOCARTBUTTONCOLOR} 
              fontSize={12}
              height={ width * 0.08}
            />
          </View>
          <View style={{width: '49%'}}>
            <HalfSizeButton
              title="Remove"
              icon=" "
              backgroundColor={"transparent"}
              color={themecolor.TEXTRED}
              borderColor={themecolor.TEXTRED}
              fontSize={12}
              height={ width * 0.08}
            />
          </View>
         </View>
     
    </View>
  ) : (
    <></>
  );
}

export function ManageAddressDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({item}) =>
        props.dafault == true ? (
          <DefaultAddressDataFlateList item={item} themecolor={themecolor} />
        ) : (
          <OtherAddressDataFlateList item={item} themecolor={themecolor} />
        )
      }
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
