import React from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../Theme/ThemeDarkLightColor';
import FIcon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../../../assets/css/SearchCss/searchStyle';


export default function Search(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <View
      style={{
        ...styles.mainContainer,
        backgroundColor: themecolor.BOXBORDERCOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}>
      <Text allowFontScaling={false} style={{...styles.l15}}>
        <FIcon name="search" size={12} color={themecolor.AV2} />
      </Text>
      <TextInput
      allowFontScaling={false}
        onChangeText={text => props.filtering(text)}
        placeholder= {props.title}
        style={{
          ...styles.textIn,
          color: themecolor.AV2,
        }}
        placeholderTextColor={themecolor.AV2}
      />
    </View>
  );
}
