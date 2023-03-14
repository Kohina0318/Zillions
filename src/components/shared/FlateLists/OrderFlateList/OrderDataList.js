import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { Colors } from '../../../assets/config/Colors';
import { styles } from '../../../../assets/css/OrderStyle';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

function OrderDataFlateList({ item, themecolor }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        ...styles.datalistView,
        backgroundColor: themecolor.BOXBORDERCOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}
      onPress={() => navigation.navigate('OrderDetails', { productDetails: item.product_details, saleCode: item.sale_code, SaleId: item.sale_id })}
    >
      <View style={{ ...styles.flexDirView }}>
        <Text allowFontScaling={false} style={{ ...styles.txt, color: themecolor.TXTWHITE }}>
          Delivered on feb 09 2022
        </Text>
      </View>

      <View style={{ ...styles.marTop }} />

      <View style={{ ...styles.flexDirView1 }}>

        <View >
          <Text allowFontScaling={false} style={{ ...styles.txtBold, color: themecolor.TXTWHITE }} numberOfLines={2}>
            Order Id :
          </Text>
        </View>
        <View style={{ ...styles.flexRow }}>
          <Text allowFontScaling={false} style={{ ...styles.txt1, color: themecolor.BACKICON }} numberOfLines={2}>#{item.sale_code}
          </Text>
        </View>

        <View style={{ ...styles.iconview }}>
          <FontAwesome
            name="angle-right"
            size={25}
            color={themecolor.BACKICON}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function OrderDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => (
        <OrderDataFlateList item={item} themecolor={themecolor} />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
