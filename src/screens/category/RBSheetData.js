import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import EN from 'react-native-vector-icons/Entypo';
import {ProductDetailSizeFlatList} from '../../components/shared/FlateLists/CategoryFlatList/ProductDetailSizeFlatList';
import {styles} from '../../assets/css/ProductDetailStyle';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import FullsizeButton from '../auth/FullsizeButton';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export const RBSheetData = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const navigation = useNavigation();
  const [qty, setQty] = useState(1);

  const handleMin=()=>{
    props.refRBSheet.current.close()
    setQty(1)
  }

  const handleClick=()=>{
navigation.navigate(props.navigateTo)
  }

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
            onPress={() => handleMin()}>
            <EN name="cross" color={themecolor.TXTWHITE} size={28} />
          </TouchableOpacity>
          <View>
            <Text allowFontScaling={false} style={{...styles.RBText, color: themecolor.TXTWHITE}}>
              {props.title}
            </Text>
          </View>
          <View>
            <View>
              <TouchableOpacity activeOpacity={1} onPress={() => OnClick()}>
                <Text
                 allowFontScaling={false}
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
        <View style={{...styles.view16,marginTop:5}}>
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
          <View style={{width: width * 0.94, flexDirection: 'column'}}>
            <ProductDetailSizeFlatList
              sizes={props.sizes}
              touch={props.touch}
            />
          </View>
        </View>
        <View
          style={{
            ...styles.view16,
           
          }}>
          <View style={{...styles.flexDR}}>
            <Text
             allowFontScaling={false}
              style={{
                ...styles.CardText,
                ...styles.align3,
                ...styles.left1,
                color: themecolor.TXTWHITE,
                marginRight: 20,
               alignSelf:'center'
              }}>
              Quantity:
            </Text>
            <NumericInput
              value={qty}
              onChange={value => setQty(value)}
              onLimitReached={() => handleMin()}
              totalWidth={100}
              totalHeight={30}
              iconSize={25}
              step={1}
              borderColor={themecolor.TXTGREYS}
              valueType="integer"
              rounded={true}
              minValue={1}
              textColor={themecolor.TXTWHITE}
              iconStyle={{color: themecolor.TXTWHITE}}
              rightButtonBackgroundColor={'transparent'}
              leftButtonBackgroundColor={'transparent'}
            />
            </View>
          <View style={styles.marg} />
        </View>

        <View style={{width:width,marginBottom:6}}>
              <FullsizeButton width={width} title={props.title} onPress={()=>handleClick()}/>
            </View>
      </RBSheet>
    </>
  );
};
