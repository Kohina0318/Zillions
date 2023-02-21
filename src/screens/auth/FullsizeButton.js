import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {Colors} from '../../assets/config/Colors';
import {FontFamily} from '../../assets/fonts/FontFamily';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';

const {width} = Dimensions.get('window');

export default FullsizeButton = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const styles = StyleSheet.create({
    bigButton: {
      backgroundColor: themecolor.ADDTOCARTBUTTONCOLOR,
      width: width * 0.9,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      height: width * 0.1,
      borderRadius: 10,
    },
  });

  return (
    <View>
      <TouchableOpacity onPress={props.onPress}>
        <View style={{...styles.bigButton}}>
          <Text
            style={{
              color: '#fff',
              fontFamily: FontFamily.PopinsMedium,
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            {props.title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
