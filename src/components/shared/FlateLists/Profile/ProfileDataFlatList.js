import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
  Linking
} from 'react-native';
import {Colors} from '../../../../assets/config/Colors';
import { ProfileStyle } from '../../../../assets/css/ProfileStyle';
import {MyThemeClass} from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'

const {width} = Dimensions.get('screen');

function ProfileDataFlateList({item, themecolor}) {

  const navigation = useNavigation();

  
  return (
    <>
      <View
          style={{
            ...ProfileStyle.datalistView,
            borderBottomColor: themecolor.BOXBORDERCOLOR1,
          }}>
          <View style={{marginLeft: 10,flexDirection:'row'}}>
          <View style={{marginRight:10,alignSelf:'center'}}>
<Icon size={22} color={themecolor.TXTWHITE} name={item.icon}/>
          </View>
          <View>
            <Text style={{...ProfileStyle.txt, color: themecolor.TXTWHITE}}>
            {item.name}
            </Text>
            </View>
          </View>

          <View style={{...ProfileStyle.iconStyle}}>
          {
            item.linkStatus?
            <TouchableOpacity
              style={{...ProfileStyle.iconview, borderRadius: 50, padding: 2}}
              onPress={() =>
                Linking.openURL(item.link)
              }
            >
              <FontAwesome name="angle-right" size={30} color={themecolor.ADDTOCARTBUTTONCOLOR} />
            </TouchableOpacity>
            :
            <TouchableOpacity
              style={{...ProfileStyle.iconview, borderRadius: 50, padding: 2}}
              // onPress={() => navigation.navigate('Products')}
            >
              <FontAwesome name="angle-right" size={30} color={themecolor.ADDTOCARTBUTTONCOLOR} />
            </TouchableOpacity>
          }
          </View>
        </View>
    </>
  );
}

export function ProfileDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <>
    <FlatList
      data={props.data}
      renderItem={({item}) => (
        <ProfileDataFlateList item={item} themecolor={themecolor} />
      )}
      showsVerticalScrollIndicator={false}
      // scrollEnabled={true}
    />
    </>
  );
}
