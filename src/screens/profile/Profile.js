import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { ProfileDataList } from '../../components/shared/FlateLists/Profile/ProfileDataFlatList';
import Header from '../../components/shared/header/Header';
import { data, data1 } from './ProfileData';
import { ProfileStyle } from '../../assets/css/ProfileCss/ProfileStyle';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { getProfileInfo } from '../../repository/ProfileRepository/ProfileRepo';
import { removeDatafromAsync } from '../../repository/AsyncStorageServices';
import { postLogout } from '../../repository/AuthRepository/LogoutRepository';
import { useToast } from 'react-native-toast-notifications';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import AD from 'react-native-vector-icons/AntDesign';
import { Image } from '@rneui/base';

export default function Profile(props) {

  const toast = useToast();
  var navigation = useNavigation();

  const mode = useSelector(state => state.mode);

  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [loader, setLoader] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [UserData, setUserData] = useState([]);
  const [imageName, setImageName] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      // setLoader(true);
      handleUserData();
    }, [refresh]),
  );
  
  const handleUserData = async () => {
    try {
      var res = await getProfileInfo();
      if (res.status === true) {
          setUserData(res.data);
        setLoader(false);
      var firstName = res.data[0].username
      setImageName(firstName[0]) 
      }
      else if (res.msg == "Invalid Authentication") {
        setUserData([])
        setLoader(false);
      }
      else {
        setUserData([])
        setLoader(false);
      }
    } catch (e) {
      setUserData([])
      setLoader(false);
    }
  };


  const handleConfirmLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to Logout?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => handleLogout() },
      ],
    );
  };


  const handleLogout = async () => {
    try {
      var res = await postLogout()
      if (res.status == true) {
        await removeDatafromAsync('@UserData');
        await removeDatafromAsync('@Token');
        setRefresh(!refresh);
      }
      else {
        toast.show(res.msg, {
          type: 'warning',
          placement: 'bottom',
          duration: 1000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (e) {
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  return (
    <View style={{ backgroundColor: themecolor.THEMECOLOR, flex: 1 }}>
      <Header title="Profile" />

      {loader ? (
        <LoadingFullScreen style={{ flex: 1 }} />
      ) : (
        <>
          <View style={{ marginTop: 10 }} />

          <ScrollView showsVerticalScrollIndicator={false}>
            {UserData.length > 0 ? (
              <>
                <View
                  style={{
                    ...ProfileStyle.datalistView1,
                    backgroundColor: themecolor.BOXBORDERCOLOR,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                  }}>
                  <View
                    style={{
                      ...ProfileStyle.profileDataView,
                    }}>
                    <View>
                      <View style={{...ProfileStyle.avater, backgroundColor:generateColor(),borderColor:'#fff'}}>
                        <Text style={{...ProfileStyle.profileImgText, color:'#fff'}}>{imageName}</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        ...ProfileStyle.welcomView,
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          ...ProfileStyle.WellText,
                          color: themecolor.BACKICON,
                        }} numberOfLines={1}>
                        Welcome {UserData[0].username.replace(/\s+/g, '')} {UserData[0].surname.replace(/\s+/g, '')}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    ...ProfileStyle.datalistView1,
                    backgroundColor: themecolor.BOXBORDERCOLOR,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                  }}>
                  <ProfileDataList data={data} />
                </View>

                <View
                  style={{
                    ...ProfileStyle.datalistView1,
                    backgroundColor: themecolor.BOXBORDERCOLOR,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                  }}>

                  <View style={{
                    ...ProfileStyle.shippingHeading
                  }}>
                    <Text allowFontScaling={false} style={{ ...ProfileStyle.headingTxt, color: themecolor.TXTWHITE }}>
                      Shipping Services
                    </Text>
                  </View>

                  <View style={{ ...ProfileStyle.shippingSer }}>
                    <Image
                      source={require('../../assets/images/Blue_Dart.png')}
                      resizeMode="contain"
                      style={{ width: 90, height: 50, margin: 2 }}
                    />
                    <Image
                      source={require('../../assets/images/smart_ship.png')}
                      resizeMode="cover"
                      style={{ width: 70, height: 40, margin: 2 }}
                    />
                    {mode === "dark" ?
                      <Image
                        source={require('../../assets/images/shiprocket_white.png')}
                        resizeMode="contain"
                        style={{ width: 70, height: 40, margin: 2 }}
                      />
                      :
                      <Image
                        source={require('../../assets/images/shiprocket.jpg')}
                        resizeMode="contain"
                        style={{ width: 70, height: 40, margin: 2 }}
                      />
                    }
                  </View>

                </View>

              </>
            ) : (
              <>
                <View
                  style={{
                    ...ProfileStyle.datalistView1,
                    backgroundColor: themecolor.BOXBORDERCOLOR,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                  }}>
                  <View style={ProfileStyle.signInView}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        ...ProfileStyle.signInText,
                        color: themecolor.TXTWHITE,
                      }}>
                      {' '}
                      Sign in to receive exclusive offers and Promotions
                    </Text>
                  </View>
                  <View style={ProfileStyle.buttonMainView}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => navigation.navigate('Register')}>
                      <View
                        style={{
                          ...ProfileStyle.buttonView1,
                          backgroundColor: '#fff',
                          borderColor: themecolor.ADDTOCARTBUTTONCOLOR,
                        }}>
                        <Text
                          allowFontScaling={false}
                          style={{
                            ...ProfileStyle.buttonText1,
                            color: themecolor.ADDTOCARTBUTTONCOLOR,
                          }}>
                          Create an account
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => navigation.navigate('Login')}>
                      <View
                        style={{
                          ...ProfileStyle.buttonView2,
                          borderColor: themecolor.ADDTOCARTBUTTONCOLOR,
                          backgroundColor: themecolor.ADDTOCARTBUTTONCOLOR,
                        }}>
                        <Text
                          allowFontScaling={false}
                          style={{
                            ...ProfileStyle.buttonText1,
                            color: '#fff',
                          }}>
                          Sign In
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    ...ProfileStyle.datalistView1,
                    backgroundColor: themecolor.BOXBORDERCOLOR,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                  }}>
                  <ProfileDataList data={data1} />
                </View>

                <View
                  style={{
                    ...ProfileStyle.datalistView1,
                    backgroundColor: themecolor.BOXBORDERCOLOR,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                  }}>

                  <View style={{
                    ...ProfileStyle.shippingHeading
                  }}>
                    <Text allowFontScaling={false} style={{ ...ProfileStyle.headingTxt, color: themecolor.TXTWHITE }}>
                      Shipping Services
                    </Text>
                  </View>

                  <View style={{ ...ProfileStyle.shippingSer }}>
                    <Image
                      source={require('../../assets/images/Blue_Dart.png')}
                      resizeMode="contain"
                      style={{ width: 90, height: 50, margin: 2 }}
                    />
                    <Image
                      source={require('../../assets/images/smart_ship.png')}
                      resizeMode="cover"
                      style={{ width: 70, height: 40, margin: 2 }}
                    />
                    {mode === "dark" ?
                      <Image
                        source={require('../../assets/images/shiprocket_white.png')}
                        resizeMode="contain"
                        style={{ width: 70, height: 40, margin: 2 }}
                      />
                      :
                      <Image
                        source={require('../../assets/images/shiprocket.jpg')}
                        resizeMode="contain"
                        style={{ width: 70, height: 40, margin: 2 }}
                      />
                    }
                  </View>

                </View>

              </>
            )}

            <View
              style={{
                ...ProfileStyle.datalistView2,
              }}>
              {UserData.length > 0 ? (
                <View style={{ width: "100%" }}>
                  <HalfSizeButton
                    title="Logout"
                    icon={<AD name="logout" size={18} color="#fff" />}
                    backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                    color={'#fff'}
                    borderColor={themecolor.BOXBORDERCOLOR1}
                    onPress={() => handleConfirmLogout()}
                  />
                </View>
              ) : (
                <></>
              )}

              <View style={{ ...ProfileStyle.appVerView }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    ...ProfileStyle.appverText,
                    color: themecolor.HEADERTHEMECOLOR,
                  }}>
                  {' '}
                  App Version 1.0{' '}
                </Text>

                <View style={{ ...ProfileStyle.Mv5 }} />

                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() =>
                      Linking.openURL("mailto: query@zillionbuyer.com") }
                    >
                      <Text
                      allowFontScaling={false}
                      style={{
                        ...ProfileStyle.appverText,
                        color: themecolor.ADDTOCARTBUTTONCOLOR,
                      }}>
                      query@zillionbuyer.com {" "}
                      </Text>
                  </TouchableOpacity>

                  <Text style={{
                    ...ProfileStyle.appverText,
                    color: themecolor.TXTWHITE,
                  }}> || </Text>

                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() =>
                      Linking.openURL("tel: 9168103909")
                    }
                  >
                    <Text
                    allowFontScaling={false}
                    style={{
                      ...ProfileStyle.appverText,
                      color: themecolor.ADDTOCARTBUTTONCOLOR,
                    }}>
                     {" "} +91-9168103909
                      </Text> 
                    </TouchableOpacity>

                </View>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}
