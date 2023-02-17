import React, {Component} from 'react';
import {
  Image,
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {MyThemeClass} from '../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import CIcon from 'react-native-vector-icons/MaterialIcons';
import BadgeIcon from './BadgeIcon';
import {styles} from '../../../assets/css/HeaderStyle';
const {width, height} = Dimensions.get('screen');

export default function Header(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <View
      style={{
        ...styles.mainView,
        backgroundColor: themecolor.LOGINTHEMECOLOR1,
        borderBottomColor:themecolor.BOXBORDERCOLOR1
      }}>
     
      <View style={{...styles.mainViewContainer}}>
        <View
          style={{...styles.headerInnerView}}>

          <View style={{width: width * 0.1,}}>
          {props.backIcon ? (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.toggle}
                // onPress={() => }
                >
                <CIcon
                  name="keyboard-backspace"
                  size={26}
                  color={themecolor.BACKICON}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={1}
                // onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                >
                <Icon name="menu-sharp" size={26} color={themecolor.TXTWHITE} />
              </TouchableOpacity>
            )}
          </View>

          <View style={{...styles.iconTitle}}>
            {props.title == 'Home' ? (
              <Image
                source={require('../../../assets/images/logo.png')}
                style={{width: 130, height: 30}}
              />
            ) : (
              <Text
                style={{...styles.toolbarTitle, color: themecolor.TXTWHITE}}
                numberOfLines={1}>
                {props.title}
              </Text>
            )}
          </View>

          <View
            style={{...styles.iconView}}>
            <View style={{width: width * 0.1}}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({showSearch: true});
                }}>
                <Icon name="search" size={22} color={themecolor.TXTWHITE} />
              </TouchableOpacity>
            </View>

            <View style={{width: width * 0.1}}>
              <TouchableOpacity activeOpacity={0.5}>
                <BadgeIcon
                  icon="shopping-cart"
                  count={1}
                  onPress={() => {
                    navigation.navigate('MyCart');
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
