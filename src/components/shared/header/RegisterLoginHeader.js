import React, {  } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';
import CIcon from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../../../assets/css/HeaderCss/HeaderStyle';

export default function RegisterLoginHeader(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()


  return (
    <>
       <View
      style={{
        ...styles.mainView,
        backgroundColor: themecolor.LOGINTHEMECOLOR1,
        borderBottomColor:themecolor.BOXBORDERCOLOR1
      }}>
     
      <View style={{...styles.mainViewContainer}}>
        <View
          style={{...styles.headerInnerView1}}>

          <View style={{justifyContent:'flex-start'}}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.toggle1}
                onPress={props.onPressBack}
                >
                <CIcon
                  name="keyboard-backspace"
                  size={26}
                  color={themecolor.TXTWHITE}
                />
              </TouchableOpacity>
          </View>

          <View style={{...styles.iconTitle1}}>
            
              <Text
               allowFontScaling={false}
                style={{...styles.toolbarTitle, color: themecolor.TXTWHITE}}
                numberOfLines={1}>
                {props.title}
              </Text>
          </View>
        </View>
      </View>
    </View>
    </>
  );
}
