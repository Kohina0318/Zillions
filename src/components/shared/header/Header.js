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
import Icon from 'react-native-vector-icons/Feather';
import CIcon from 'react-native-vector-icons/MaterialIcons';
import BadgeIcon from './BadgeIcon';
import {styles} from '../../../assets/css/HeaderStyle';
const {width, height} = Dimensions.get('screen');

export default function Header(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <View>
      <StatusBar
        translucent={true}
        backgroundColor={ themecolor.LOGINTHEMECOLOR1}
        barStyle={mode == 'light' ? 'dark-content' : 'light-content'}
      />
      <View
        style={{
          marginTop: 20,
          flex: 1,
          backgroundColor: themecolor.LOGINTHEMECOLOR1,
          flexDirection: 'column',
        }}>
        <View
          style={{
            ...styles.toolBar,
            backgroundColor: themecolor.LOGINTHEMECOLOR1,
          }}>
          <View
            style={{
              width: width * 0.1,
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            {props.backIcon ? (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.toggle}
                onPress={() => {
                  this.setState({showSearch: true});
                }}>
                <CIcon
                  name="keyboard-backspace"
                  size={26}
                  color={themecolor.BACKICON}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.toggle}
                onPress={props.onPress}>
                <Icon name="menu" size={24} color={themecolor.TXTWHITE} />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flex: 1,
              // flexDirection: 'row',
              alignItems: 'center',
              width: width * 0.2,
              padding: 10,
              justifyContent: 'center',
              // backgroundColor:"red"
            }}>
            {props.title == 'Home' ? (
              <Image
                source={require('../../../assets/images/logo.png')}
                style={{width: 130, height: 30, backgroundColor: 'yellow'}}
              />
            ) : (
              <Text
                style={{...styles.toolbarTitle, color: themecolor.TXTWHITE}}>
                {props.title}
              </Text>
            )}
          </View>
          {/* <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingRight: 10,
            }}>
            {props.children}
          </View> */}
          <View
            style={{
              width: width * 0.2,
              flexDirection: 'row',
              alignSelf: 'center',
              // marginRight: 10,
            }}>
            <TouchableOpacity
              style={{marginRight: 15, top: 9}}
              onPress={() => {
                this.setState({showSearch: true});
              }}>
              <Icon name="search" size={24} color={themecolor.TXTWHITE} />
            </TouchableOpacity>
            <BadgeIcon
              icon="shopping-cart"
              count={1}
              onPress={() => {
                navigation.navigate('MyCart');
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
