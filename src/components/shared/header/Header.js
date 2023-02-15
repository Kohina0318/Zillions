import React, {Component} from 'react';
import {FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, View,Dimensions,TouchableOpacity} from 'react-native';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import CIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import BadgeIcon from './BadgeIcon';
import { styles } from './styles';
const {width, height} = Dimensions.get('screen');

export default function Header(props){
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  console.log(mode)

        return (
           <View style={{flex:1}}>
           <StatusBar
          translucent={true}
          backgroundColor={'#44C062'}
          barStyle={mode=='ligth'?"dark-content":"light-content"}
        />
         <View
          style={{
            backgroundColor: themecolor.LOGINTHEMECOLOR,
            height: height,
            width: width,
          }}>
          <View style={{marginTop:20,    flex: 1,
        backgroundColor: themecolor.LOGINTHEMECOLOR,
        flexDirection: 'column',}}>
                    <View style={styles.toolBar}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        {props.icon ? (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.toggle}
            onPress={props.onPress}>
            <CIcon name={props.icon} size={24} color="#ffffff" />
          </TouchableOpacity>
        ) : null}
        <Text style={styles.toolbarTitle}>{props.title}</Text>
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
                            style={{marginRight: 10}}
                            onPress={() => {
                                this.setState({showSearch: true});
                            }}>
                            <Icon name="search" size={24} color="#ffffff"/>
                        </TouchableOpacity>

                        {/* <BadgeIcon
                            icon="shopping-cart"
                            count={0}
                            onPress={() => {
                                navigation.navigate('MyCart');
                            }}
                        /> */}
                        </View>
</View>
</View>
           </View>
        );
    
}

