import React, { useRef, useState } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import EN from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProductDetailSizeFlatList } from '../../components/shared/FlateLists/CategoryFlatList/ProductDetailSizeFlatList';
import { styles } from '../../assets/css/ProductDetailStyle';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import FullsizeButton from '../auth/FullsizeButton';
import { useNavigation } from '@react-navigation/native';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';

const { width, height } = Dimensions.get('window');

export const RBSheetData = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const handleMin = () => {
    props.refRBSheet.current.close()
  }


  return (
    <>
      <RBSheet
        ref={props.refRBSheet}
        animationType={'slide'}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={260}
        customStyles={{
          container: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 0,
            backgroundColor: themecolor.RB2,
          },
          draggableIcon: {
            display: 'none',
          },
        }}>

        <View style={{ ...styles.view14 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleMin()}
            style={{ padding: 3, borderRadius: 20, }}>
            <EN name="close" color={themecolor.TXTWHITE} size={22} />
          </TouchableOpacity>
          <View style={{ padding: 3, left: 10 }}>
            <Text allowFontScaling={false} style={{ ...styles.RBText1, color: themecolor.TXTWHITE }}>
              {props.title}
            </Text>
          </View>

        </View>
        <View style={{ ...styles.Borderline }} />

        <View style={{ marginTop: 25 }} />

        <View style={{ ...styles.view16, }}>
          <Text
            allowFontScaling={false}
            style={{
              ...styles.CardText,
              ...styles.align3,
              ...styles.left1,
              color: themecolor.TXTWHITE,
              marginBottom: 5,
            }}>
            Product Sizes :
          </Text>
          <View style={{ width: width * 0.94, flexDirection: 'column' }}>
            <ProductDetailSizeFlatList
              sizes={props.sizes}
              touch={props.touch}
              setSelectedSize={props.setSelectedSize}
            />
          </View>
        </View>

        <View
          style={{
            ...styles.view16,
          }}>
          <View style={{ ...styles.flexDR }}>
            <Text
              allowFontScaling={false}
              style={{
                ...styles.CardText,
                ...styles.align3,
                ...styles.left1,
                color: themecolor.TXTWHITE,
                marginRight: 20,
                alignSelf: 'center'
              }}>
              Product Quantity :
            </Text>
            <NumericInput
              value={props.qty}
              onChange={value => props.setQty(value)}
              onLimitReached={() => handleMin()}
              totalWidth={100}
              totalHeight={30}
              iconSize={25}
              step={1}
              borderColor={themecolor.TXTGREYS}
              valueType="integer"
              rounded={true}
              minValue={1}
              maxValue={props.maxQty}
              textColor={themecolor.TXTWHITE}
              iconStyle={{ color: themecolor.TXTWHITE }}
              rightButtonBackgroundColor={'transparent'}
              leftButtonBackgroundColor={'transparent'}
            />
          </View>
        </View>

        <View style={{ width: width, marginBottom: 5, justifyContent: 'center', alignSelf: "center", alignItems: 'center' }}>
          <View style={{ width: "90%" }}>
            <HalfSizeButton
              title={props.title}
              icon={props.icon}
              onPress={() => {
                props.onPress();
                props.refRBSheet.current.close()
              }}
              backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
              color={"#fff"}
              borderColor={themecolor.ADDTOCARTBUTTONCOLOR}
            />
          </View>

        </View>
      </RBSheet>
    </>
  );
};
