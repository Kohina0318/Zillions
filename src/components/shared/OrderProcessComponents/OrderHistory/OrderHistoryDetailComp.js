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
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { styles } from '../../../../assets/css/CartCss/CartStyle';
import FAIcon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('screen');

export default function OrderHistoryDetailComp(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  var detailData = props.detailData

  return (
    <View
      style={{
        ...styles.datalistView1,
        backgroundColor: themecolor.BOXBORDERCOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}
    >
      <View style={{ ...styles.innerView }}>
        <Text style={{ ...styles.txt, color: themecolor.BACKICON }}>Order Details</Text>
      </View>

      <View style={{ ...styles.mv5 }} />

      <View style={{ ...styles.innerView }}>
        <View style={{ ...styles.orderDetialcompWidth }}>
          <Text style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>Subtotal Amount</Text>
        </View>
        <View style={{ ...styles.orderDetialcompWidth1, }}>
          <Text style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>{detailData.total}</Text>
        </View>
      </View>

      <View style={{ ...styles.mv5 }} />

      {/* <View style={{ ...styles.innerView }}>
        <View style={{ ...styles.orderDetialcompWidth }}>
          <Text style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>Tax Amount</Text>
        </View>
        <View style={{ ...styles.orderDetialcompWidth1 }}>
          <Text style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>{detailData.tax}</Text>
        </View>
      </View>

      <View style={{ ...styles.mv5 }} />
 */}

      <View style={{ ...styles.innerView }}>
        <View style={{ ...styles.orderDetialcompWidth }}>
          <Text style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>Convenience Fee</Text>
        </View>
        <View style={{ ...styles.orderDetialcompWidth1 }}>
          {detailData.shipping != "0" ?
            <Text style={{ ...styles.txt1, color: themecolor.TXTWHITE }}><FAIcon name="rupee" size={12} />{detailData.shipping}</Text>
            :
            <Text style={{ ...styles.txt1, color: themecolor.TEXTGREEN }}>FREE</Text>
          }
        </View>
      </View>

      <View style={{ ...styles.mv5 }} />

      <View style={{ ...styles.innerView }}>
        <View style={{ ...styles.orderDetialcompWidth }}>
          <Text style={{ ...styles.txtPrice, color: themecolor.TXTWHITE }}>Total Amount</Text>
        </View>
        <View style={{ ...styles.orderDetialcompWidth1 }}>
          <Text style={{ ...styles.txtPrice, color: themecolor.TXTWHITE }}><FAIcon name="rupee" size={13} /> {detailData.grand_total}</Text>
        </View>
      </View>


      <View style={{ ...styles.MVT }} />

      <View style={{ ...styles.borderLine, borderColor: themecolor.BOXBORDERCOLOR1, }} />

      <View style={{ ...styles.mv5 }} />

      <View style={{ ...styles.innerView }}>
        <View style={{ ...styles.orderDetialcompWidth, }}>
          <Text style={{ ...styles.txt, color: themecolor.TXTWHITE }}>Amount to be paid</Text>
        </View>
        <View style={{ ...styles.orderDetialcompWidth1, }}>
          <Text style={{ ...styles.txt, color: themecolor.TXTWHITE }}><FAIcon name="rupee" size={14} /> {detailData.grand_total}</Text>
        </View>
      </View>

    </View>
  )

}