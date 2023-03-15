import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import { Colors as Color } from '../../../assets/config/Colors';

import {TouchableOpacity} from 'react-native-gesture-handler';

function BadgeIcon(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        display: 'flex',
        height: 42,
        width: 35,
        justifyContent: 'center',
        alignContent: 'center',
        marginRight:2,
      }}>
      <View style={styles.badgeContainer}>
        {props.icon ? (
          <Icon name={props.icon} size={22} color={themecolor.TXTWHITE} />
        ) : null}
        {props.count && props.count > 0 ? (
          <View style={{...styles.badge,backgroundColor:themecolor.BACKICON}}>
            <Text allowFontScaling={false} style={{...styles.badgeText,color:themecolor.TXTWHITE1}}>{props.count}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'relative',
  },

  badge: {
    position: 'absolute',
    top: -10,
    right: 2,
    alignItems: 'center',
    // backgroundColor: 'white',
    borderRadius: 20,
    width: 20,
    height: 20,
    textAlign: 'center',
    paddingTop: 2,
    fontSize: 10,
    // color: Color.black,
  },
  badgeText: {
    fontSize: 10,
  },
});

export default BadgeIcon;
