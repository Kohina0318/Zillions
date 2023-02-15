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
import CIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import BadgeIcon from './BadgeIcon';
import {styles} from './styles';
const {width, height} = Dimensions.get('screen');

export default function Header(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent={true}
        backgroundColor={themecolor.LOGINTHEMECOLOR}
        barStyle={mode == 'light' ? 'dark-content' : 'light-content'}
      />
      <View
        style={{
          marginTop: 20,
          flex: 1,
          backgroundColor: themecolor.LOGINTHEMECOLOR,
          flexDirection: 'column',shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 5,
        }}>
        <View
          style={{
            ...styles.toolBar,
            backgroundColor: themecolor.LOGINTHEMECOLOR,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
            }}>
            {props.title == 'Home' ? (
              <Image
                source={require('../../../assets/images/logo.png')}
                style={{width: 130, height: 30}}
              />
            ) : (
              <Text
                style={{...styles.toolbarTitle, color: themecolor.TXTWHITE}}>
                {props.title}
              </Text>
            )}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingRight: 10,
            }}>
            {props.children}
          </View>

          <TouchableOpacity
            style={{marginRight: 15}}
            onPress={() => {
              this.setState({showSearch: true});
            }}>
            <Icon name="search" size={24} color={themecolor.TXTWHITE} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginRight: 15}}
            onPress={() => {
              this.setState({showSearch: true});
            }}>
            <Icon name="bell" size={24} color={themecolor.TXTWHITE} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginRight: 15}}
            onPress={() => {
              this.setState({showSearch: true});
            }}>
            <Icon name="heart" size={24} color={themecolor.TXTWHITE} />
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
  );
}
