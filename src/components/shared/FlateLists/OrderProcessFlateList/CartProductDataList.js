import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { styles } from '../../../../assets/css/OrderProcessStyle/CartStyle';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import AN from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('screen');

function CartProductDataFlateList({ item, themecolor }) {

  const navigation = useNavigation();


  return (
    <View
      style={{
        ...styles.datalistView,
        backgroundColor: themecolor.BOXBORDERCOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}
    // onPress={() => navigation.navigate('SubCategories',{categoryId:item.category_id,categoryName:item.category_name})}
    >
      <View style={{ ...styles.innerView }}>
        <View style={{ ...styles.innerImage, }}>
          <Image
            source={{ uri: item.image }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 4,
            }}
          />
        </View>
        <View style={{ ...styles.TxtViewinner }}>

          <Text allowFontScaling={false} numberOfLines={2} style={{ ...styles.txt, color: themecolor.TXTWHITE }}>
            {item.name}
          </Text>

          <View style={{ ...styles.PriceTxtViewinner }}>
            <TouchableOpacity activeOpacity={0.1} style={{ ...styles.QtyView, borderColor: themecolor.TXTGREY, }}>
              <Text
                allowFontScaling={false} style={{ ...styles.txt1, color: themecolor.TXTWHITE, }}>Size:
                <Text
                  allowFontScaling={false}
                  style={{ ...styles.txtPrice, color: themecolor.TXTWHITE, }}> sz235{" "}
                </Text>
                <AN name="down" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.1} style={{ ...styles.QtyView, borderColor: themecolor.TXTGREY, left: 5 }}>
              <Text allowFontScaling={false}
                style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>Qty:
                <Text
                  allowFontScaling={false}
                  style={{ ...styles.txtPrice, color: themecolor.TXTWHITE }}> {item.qty}{" "}</Text>
                <AN name="down" />
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ ...styles.PriceTxtViewinner }}>
            <Text
              allowFontScaling={false}
              style={{ ...styles.txtPrice, color: themecolor.TXTWHITE }}>
              <FAIcon name="rupee" size={13} />
               {item.price}
              {'  '}
              <Text
                allowFontScaling={false}
                style={{
                  ...styles.txtLine,
                  color: themecolor.TXTGREY,
                }}>
                <FAIcon name="rupee" size={12} />
                200
              </Text>
              <Text
                allowFontScaling={false}
                style={{ ...styles.txt1, color: themecolor.TXTGREY }}>
                {'  ('}
                30%{')'}
              </Text>
            </Text>
          </View>

          <Text allowFontScaling={false} style={{ ...styles.txtSave, color: themecolor.TEXTGREEN }}>
            You Save: <FAIcon name="rupee" size={13} /> 1000
          </Text>

        </View>
      </View>

      <View style={{ ...styles.MVT }} />

      <View style={{ ...styles.borderLine, borderColor: themecolor.BOXBORDERCOLOR1, }} />

      <View style={{ ...styles.innerView, marginTop: 7 }}>
        <View style={{ ...styles.removeView }} >
          <TouchableOpacity activeOpacity={0.8} style={{ ...styles.removeToch }}>
            <Text style={{ ...styles.removeButton, color: themecolor.TEXTRED }}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

export function CartProductDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => (
        <CartProductDataFlateList item={item} themecolor={themecolor} />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
