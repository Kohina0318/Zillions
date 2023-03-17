import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import {Colors} from '../../../../assets/config/Colors';
import {ProfileStyle} from '../../../../assets/css/ProfileCss/ProfileStyle';
import {MyThemeClass} from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('screen');

function ProfileDataFlateList({item, themecolor}) {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
      activeOpacity={0.5}
        style={{
          ...ProfileStyle.datalistView,
          borderBottomColor: themecolor.BOXBORDERCOLOR1,
        }}
        onPress={()=>{item.onpress != null || item.onpress != undefined ?
          navigation.navigate(item.onpress)
          : 
          Linking.openURL(item.Link)
        }}
        >
        <View style={{flexDirection: 'row', }}>
          {item.icon != null || item.icon != undefined ?
          <View style={{marginRight: 10, alignSelf: 'center',}}>
            <Text allowFontScaling={false} style={{color: themecolor.BACKICON}}>{item.icon}</Text>
          </View>
            :<></>}
          <View>
            <Text allowFontScaling={false} style={{...ProfileStyle.txtProfileData, color: themecolor.TXTWHITE}}>
              {item.name}
            </Text>
          </View>
        </View>

        <View style={{...ProfileStyle.iconStyle}}>
          <View  style={{...ProfileStyle.iconview, borderRadius: 50, padding: 2}}>
            <FontAwesome
              name="angle-right"
              size={22}
              color={themecolor.BACKICON}
            />
          </View>
        </View>
      </TouchableOpacity>
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
      />
    </>
  );
}
