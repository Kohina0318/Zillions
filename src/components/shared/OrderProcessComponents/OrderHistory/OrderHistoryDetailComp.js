import React, { } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { styles } from '../../../../assets/css/CartCss/CartStyle';
import FAIcon from 'react-native-vector-icons/FontAwesome';

export default function OrderHistoryDetailComp(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  var detailData = props.detailData

  return (
    <View
      style={{
        ...styles.datalistView,
        backgroundColor:themecolor.BOXBORDERCOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}
    >
      <View style={{ ...styles.innerView }}>
        <Text allowFontScaling={false} style={{ ...styles.txt, color: themecolor.BACKICON }}>Order Details</Text>
      </View>

      <View style={{ ...styles.mv5 }} />

      <View style={{ ...styles.innerView }}>
        <View style={{ ...styles.orderDetialcompWidth }}>
          <Text allowFontScaling={false} style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>Subtotal Amount</Text>
        </View>
        <View style={{ ...styles.orderDetialcompWidth1, }}>
          <Text allowFontScaling={false} style={{ ...styles.txt1, color: themecolor.TXTWHITE }}><FAIcon name="rupee" size={12} /> {parseInt(detailData.total)}</Text>
        </View>
      </View>

      <View style={{ ...styles.mv5 }} />


      <View style={{ ...styles.innerView }}>
        <View style={{ ...styles.orderDetialcompWidth }}>
          <Text allowFontScaling={false} style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>Tax Amount</Text>
        </View>
        <View style={{ ...styles.orderDetialcompWidth1 }}>
          <Text allowFontScaling={false} style={{ ...styles.txt1, color: themecolor.TXTWHITE }}><FAIcon name="rupee" size={12} /> {parseInt(detailData.taxtotal)}</Text>
        </View>
      </View>

      <View style={{ ...styles.mv5 }} />


      <View style={{ ...styles.innerView }}>
        <View style={{ ...styles.orderDetialcompWidth }}>
          <Text allowFontScaling={false} style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>Convenience Fee</Text>
        </View>
        <View style={{ ...styles.orderDetialcompWidth1 }}>
          {detailData.shipping != "0" ?
            <Text allowFontScaling={false} style={{ ...styles.txt1, color: themecolor.TXTWHITE }}><FAIcon name="rupee" size={12} /> {parseInt(detailData.shipping)}</Text>
            :
            <Text allowFontScaling={false} style={{ ...styles.txt1, color: themecolor.TEXTGREEN }}>FREE</Text>
          }
        </View>
      </View>

      <View style={{ ...styles.mv5 }} />


      <View style={{ ...styles.MVT }} />

      <View style={{ ...styles.borderLine, borderColor: themecolor.BOXBORDERCOLOR1, }} />

      <View style={{ ...styles.mv5 }} />

      <View style={{ ...styles.innerView }}>
        <View style={{ ...styles.orderDetialcompWidth, }}>
          <Text allowFontScaling={false} style={{ ...styles.txt, color: themecolor.BACKICON }}>Total Amount</Text>
        </View>
        <View style={{ ...styles.orderDetialcompWidth1, }}>
          <Text allowFontScaling={false} style={{ ...styles.txt, color: themecolor.BACKICON }}><FAIcon name="rupee" size={14} /> {parseInt(detailData.grand_total)}</Text>
        </View>
      </View>

    </View>
  )

}