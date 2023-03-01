import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import EN from 'react-native-vector-icons/Entypo';
import {ProductDetailSizeFlatList} from '../../components/shared/FlateLists/CategoryFlatList/ProductDetailSizeFlatList';
import {styles} from '../../assets/css/ProductDetailStyle';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';

const {width, height} = Dimensions.get('window');

export const RBSheetData = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <>
      <RBSheet
        ref={props.refRBSheet}
        animationType={'slide'}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={300}
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
        <View style={{...styles.view14}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => props.refRBSheet.current.close()}>
            <EN name="cross" color={themecolor.TXTWHITE} size={28} />
          </TouchableOpacity>
          <View>
            <Text style={{...styles.RBText, color: themecolor.TXTWHITE}}>
              Buy Now
            </Text>
          </View>
          <View>
            <View>
              <TouchableOpacity activeOpacity={1} onPress={() => OnClick()}>
                <Text
                  style={{
                    ...styles.RBText,
                    ...styles.clrtheme,
                    color: themecolor.TXTWHITE,
                  }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{...styles.Borderline}} />
        <View style={{...styles.view16}}>
          <Text
            style={{
              ...styles.CardText,
              ...styles.align3,
              ...styles.left1,
              color: themecolor.TXTWHITE,
              marginBottom: 5,
            }}>
            Sizes :
          </Text>
          <View style={{width: width * 0.9, flexDirection: 'column'}}>
            <ProductDetailSizeFlatList
              sizes={props.sizes}
              touch={true}
              sizesRate={props.sizesRate}
            />
          </View>
        </View>
        <View
          style={{
            ...styles.view16,
            width: width * 0.9,
            flexDirection: 'column',
            paddingLeft: 10,
          }}>
          <View>
            <Text
              style={{
                ...styles.CardText,
                ...styles.align3,
                ...styles.left1,
                color: themecolor.TXTWHITE,
                marginBottom: 5,
              }}>
              Quantity :
            </Text>
          </View>
          <View>
            <NumericInput
              // value={this.state.value}
              onChange={value => console.log(value)}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              totalWidth={100}
              totalHeight={50}
              iconSize={25}
              step={1}
              valueType="integer"
              rounded={true}
              minValue={0}
              textColor={themecolor.TXTWHITE}
              iconStyle={{color: themecolor.LOGINTHEMECOLOR}}
              rightButtonBackgroundColor={themecolor.BACKICON}
              leftButtonBackgroundColor={themecolor.BACKICON}
            />
          </View>
          <View style={styles.marg} />
        </View>
      </RBSheet>
    </>
  );
};
