import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import {styles} from '../../../../assets/css/ProfileCss/AddressStyle';
import {MyThemeClass} from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import HalfSizeButton from '../../button/halfSizeButton';
import {useToast} from 'react-native-toast-notifications';
import {
  postDeleteAddress,
  postSetDefaultAddress,
} from '../../../../repository/AddressRepository/MangeAddressRepo';

const {width} = Dimensions.get('screen');

function DefaultAddressDataFlateList({item, themecolor}) {
  const navigation = useNavigation();

  return  (
    <View
      style={{
        ...styles.datalistView,
        backgroundColor: themecolor.BOXBORDERCOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}>
      <View style={{...styles.innerView}}>
        <Text
          allowFontScaling={false}
          style={{...styles.txt, color: themecolor.TXTWHITE}}>
          <Text
            allowFontScaling={false}
            style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {item.address}
          </Text>
        </Text>
        <Text
          allowFontScaling={false}
          style={{...styles.txt, color: themecolor.TXTWHITE}}>
          <Text
            allowFontScaling={false}
            style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {item.city}
          </Text>
          <Text
            allowFontScaling={false}
            style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {' - '}
            {item.postal_code}
          </Text>
        </Text>
        <Text
          allowFontScaling={false}
          style={{...styles.txt, color: themecolor.TXTWHITE}}>
          <Text
            allowFontScaling={false}
            style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {item.state}
          </Text>
          <Text
            allowFontScaling={false}
            style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {' , '}
            {item.country}
          </Text>
        </Text>
        
        <View  style={{...styles.mgT5}}/>

        <Text
          allowFontScaling={false}
          style={{...styles.txtbold, color: themecolor.TXTWHITE}}>
          Mobile No :
          <Text
            allowFontScaling={false}
            style={{...styles.txt1, color: themecolor.TXTWHITE}}>
            {' '}
            {item.phone}
          </Text>
        </Text>
      </View>
    </View>
  );
}

function OtherAddressDataFlateList({item, themecolor, refresh, setRefresh}) {
  const toast = useToast();
  const navigation = useNavigation();

  const handleSetDefaultAddress = async addId => {
    try {
      let formdata = new FormData();
      formdata.append('id', addId);

      var res = await postSetDefaultAddress(formdata);
      if (res.status === true) {
        setRefresh(!refresh);
        toast.show(res.msg, {
          type: 'success',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else {
        
      }
    } catch (e) {
      console.log('errrror in..handleSetDefaultAddress page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const confirmDeleteAddres = id => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => handleDeleteAddress(id)},
      ],
    );
  };

  const handleDeleteAddress = async addId => {
    try {
      let formdata = new FormData();
      formdata.append('id', addId);

      var res = await postDeleteAddress(formdata);
      if (res.status === true) {
        setRefresh(!refresh);
      } else {
        
      }
    } catch (e) {
      console.log('errrror in..handleDeleteAddress page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  return (
    <View
      style={{
        ...styles.datalistView,
        backgroundColor: themecolor.BOXBORDERCOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}>
      <View style={{...styles.innerView}}>
        <Text
          allowFontScaling={false}
          style={{...styles.txt, color: themecolor.TXTWHITE}}>
          <Text
            allowFontScaling={false}
            style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {item.address}
          </Text>
        </Text>
        <Text
          allowFontScaling={false}
          style={{...styles.txt, color: themecolor.TXTWHITE}}>
          <Text
            allowFontScaling={false}
            style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {item.city}
          </Text>
          <Text
            allowFontScaling={false}
            style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {' - '}
            {item.postal_code}
          </Text>
        </Text>
        <Text
          allowFontScaling={false}
          style={{...styles.txt, color: themecolor.TXTWHITE}}>
          <Text
            allowFontScaling={false}
            style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {item.state}
          </Text>
          <Text
            allowFontScaling={false}
            style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {' , '}
            {item.country}
          </Text>
        </Text>

        <View  style={{...styles.mgT5}}/>

        <Text
          allowFontScaling={false}
          style={{...styles.txtbold, color: themecolor.TXTWHITE}}>
          Mobile No :
          <Text
            allowFontScaling={false}
            style={{...styles.txt1, color: themecolor.TXTWHITE}}>
            {' '}
            {item.phone}
          </Text>
        </Text>
      </View>
      
      <View  style={{...styles.mgT5}}/>

      <View style={{...styles.DataButton}}>
        <View style={{width: '49%'}}>
          <HalfSizeButton
            title="Set as default"
            icon=" "
            backgroundColor={'transparent'}
            color={themecolor.BACKICON}
            borderColor={themecolor.BACKICON}
            fontSize={13}
            height={width * 0.09}
            onPress={() => handleSetDefaultAddress(item.id)}
          />
        </View>
        <View style={{width: '49%'}}>
          <HalfSizeButton
            title="Remove"
            icon=" "
            backgroundColor={'transparent'}
            color={themecolor.TEXTRED}
            borderColor={themecolor.TEXTRED}
            fontSize={13}
            height={width * 0.09}
            onPress={() => confirmDeleteAddres(item.id)}
          />
        </View>
      </View>
    </View>
  
  );
}

export function ManageAddressDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({item}) =>
        props.dafault == true ? (
          <DefaultAddressDataFlateList
            item={item}
            themecolor={themecolor}
            refresh={props.refresh}
            setRefresh={props.setRefresh}
          />
        ) : (
          <OtherAddressDataFlateList
            item={item}
            themecolor={themecolor}
            refresh={props.refresh}
            setRefresh={props.setRefresh}
          />
        )
      }
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
