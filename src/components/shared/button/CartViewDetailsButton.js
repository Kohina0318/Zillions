import React, {  } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';
import { styles } from '../../../assets/css/CartCss/CartStyle';
import HalfSizeButton from './halfSizeButton';
import FAIcon from 'react-native-vector-icons/FontAwesome';


export default function CartViewDetailsButton(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();
  
   
    return(
        <View
        style={{
          ...styles.touchview,
          borderTopColor: themecolor.BOXBORDERCOLOR1,
          backgroundColor: themecolor.LOGINTHEMECOLOR,
        }}>
        <View style={{ ...styles.mainView }}>
          <View style={{ width: '40%', justifyContent: "center", }}>
            <Text allowFontScaling={false} style={{ ...styles.txt, color: themecolor.TXTWHITE }}><FAIcon name="rupee" size={14} /> {parseInt(props.amount)}</Text>
            <Text allowFontScaling={false} style={{ ...styles.txtConvenienceFee, color: themecolor.ADDTOCARTBUTTONCOLOR }}>View Details</Text>
          </View>

          <View style={{ width: '60%', }}>
            <HalfSizeButton
              title={props.buttonTitle}
              icon=""
              backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
              color={'#fff'}
              borderColor={themecolor.BORDERCOLOR}
              onPress={props.buttonOnPress}
            />
          </View>
        </View>
      </View>
    )
}