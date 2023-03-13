import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  TextInput,
  BackHandler,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';
import { styles } from '../../../assets/css/OrderProcessStyle/CartStyle';
import FAIcon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('screen');

export default function OrderDetailsComp(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  var CartDetailData = props.detailData

  return (
    <View
      style={{
        ...styles.datalistView1,
        backgroundColor: themecolor.BOXBORDERCOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}
    >
      <View style={{ ...styles.innerView }}>
        <Text style={{ ...styles.txt, color: themecolor.TXTWHITE }}>Order Details</Text>
      </View>

      <View style={{ ...styles.mv5 }} />

      <View style={{ ...styles.innerView }}>
        <View style={{ ...styles.orderDetialcompWidth }}>
          <Text style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>Subtotal Amount</Text>
        </View>
        <View style={{ ...styles.orderDetialcompWidth1, }}>
          <Text style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>{CartDetailData.total}</Text>
        </View>
      </View>

      <View style={{ ...styles.mv5 }} />

      {/* <View style={{ ...styles.innerView }}>
        <View style={{ ...styles.orderDetialcompWidth }}>
          <Text style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>Saving Amount</Text>
        </View>
        <View style={{ ...styles.orderDetialcompWidth1 }}>
          <Text style={{ ...styles.txt1, color: themecolor.TEXTGREEN }}>- <FAIcon name="rupee" size={12} />1500.00</Text>
        </View>
      </View> */}

      <View style={{ ...styles.innerView }}>
        <View style={{ ...styles.orderDetialcompWidth }}>
          <Text style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>Tax Amount</Text>
        </View>
        <View style={{ ...styles.orderDetialcompWidth1 }}>
          <Text style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>{CartDetailData.tax}</Text>
        </View>
      </View>

      <View style={{ ...styles.mv5 }} />

      <View style={{ ...styles.innerView }}>
        <Text style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>Convenience Fee</Text>
        <Text style={{ ...styles.txtConvenienceFee, color: themecolor.ADDTOCARTBUTTONCOLOR }}> What's this?</Text>
      </View>

      <View style={{ ...styles.innerView }}>
        <View style={{ ...styles.orderDetialcompWidth }}>
          <Text style={{ ...styles.txt1, color: themecolor.TXTGREY }}>Delivery Fee</Text>
        </View>
        <View style={{ ...styles.orderDetialcompWidth1 }}>
          {CartDetailData.ship != " ₹0" ?
            <Text style={{ ...styles.txt1, color: themecolor.TXTGREYS }}><FAIcon name="rupee" size={12} />99</Text>
            :
            <Text style={{ ...styles.txt1, color: themecolor.TEXTGREEN }}>FREE</Text>
          }
        </View>
      </View>

      <View style={{ ...styles.MVT }} />

      <View style={{ ...styles.borderLine, borderColor: themecolor.BOXBORDERCOLOR1, }} />

      <View style={{ ...styles.mv5 }} />

      <View style={{ ...styles.innerView }}>
        <View style={{ ...styles.orderDetialcompWidth, }}>
          <Text style={{ ...styles.txt, color: themecolor.TXTWHITE }}>Amount Payable</Text>
        </View>
        <View style={{ ...styles.orderDetialcompWidth1, }}>
          <Text style={{ ...styles.txt, color: themecolor.TXTWHITE }}>{CartDetailData.grand_total}</Text>
        </View>
      </View>


    </View>
  )

}