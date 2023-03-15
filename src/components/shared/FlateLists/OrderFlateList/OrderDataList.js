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
import { styles } from '../../../../assets/css/OrderCss/OrderStyle';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

function OrderDataFlateList({ item, themecolor }) {
  const navigation = useNavigation();

  var productDetails = Object.values(item.product_details)
  var image = ''
  image = productDetails[0].image

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        ...styles.datalistView,
        backgroundColor: themecolor.BOXBORDERCOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}
      onPress={() => navigation.navigate('OrderDetails', { saleCode: item.sale_code, SaleId: item.sale_id })}
    >
      <View style={{ ...styles.flexDirView }}>
        <Text allowFontScaling={false} style={{ ...styles.txt, color: themecolor.BACKICON }}>
        Order Id : {item.sale_code}
        </Text>
      </View>

      <View style={{ ...styles.mgT10 }} />

      <View style={{ ...styles.flexDirView1 }}>
        <View style={{ ...styles.innerImage, }}>
          <Image
            source={{ uri: image }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 4,
              resizeMode: 'contain'
            }}
          />
        </View>

        <View style={{ ...styles.flexRow }}>
          <Text allowFontScaling={false} style={{ ...styles.txt, color: themecolor.TXTWHITE }} >
             {item.delivery_status == "pending" ? "Confirmed": item.delivery_status}
          </Text>

          <Text allowFontScaling={false} style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>
            Estimated Delivery {item.order_date}
          </Text>

          <Text allowFontScaling={false} style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>
            {item.payment_type == "cash_on_delivery" ? "Cash on delivery" : item.payment_type}
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

      
      <View style={{ ...styles.marTop }} />

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
