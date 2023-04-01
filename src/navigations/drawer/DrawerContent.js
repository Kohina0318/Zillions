import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { MainNavigatorstyle } from '../../assets/css/MainNavigatorstyle';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerActions, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Image as ImageR } from 'react-native';
import { navigate } from '../NavigationDrw/NavigationService';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import AD from 'react-native-vector-icons/AntDesign';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FA from 'react-native-vector-icons/FontAwesome';
import { getUserData } from '../../repository/CommonRepository';
import { postLogout } from '../../repository/AuthRepository/LogoutRepository';
import { removeDatafromAsync } from '../../repository/AsyncStorageServices';
import { useToast } from 'react-native-toast-notifications';

const { width } = Dimensions.get('window');

export default function DrawerContent(props) {
  const toast = useToast();
  const navigation = useNavigation();

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [refresh, setRefresh] = useState(false);
  const [UserData, setUserData] = useState([]);

  useEffect(() => {
    async function temp() {
      try {
        var userData = await getUserData();
        if (userData == null || userData == '' || userData == undefined) {
          setUserData([])
        } else {
          setUserData(userData);
        }
      } catch (e) {
        setUserData([])
      }
    }
    temp()
  }, [props, refresh]);



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
        setRefresh(!refresh)
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


  return (
    <DrawerContentScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...MainNavigatorstyle.DrawerContentSView,
        backgroundColor: themecolor.THEMECOLOR1,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}>
      <View style={MainNavigatorstyle.userinfo1}>
        <View style={{ ...MainNavigatorstyle.ImageRView }}>
          <ImageR
            style={{ ...MainNavigatorstyle.userimg }}
            source={require('../../assets/images/logo.png')}
          />
        </View>

        <View style={{ marginVertical: 2 }} />

        <View
          style={{
            ...MainNavigatorstyle.Borderline,
            borderWidth: 1,
            borderColor: themecolor.BOXBORDERCOLOR1,
          }}
        />
        <View style={{ marginVertical: 7 }} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => navigate('Dashboard')}
            style={MainNavigatorstyle.viewstyle1}>
            <AD name="home" size={20} color={themecolor.BACKICON} />
            <Text
              allowFontScaling={false}
              style={{
                ...MainNavigatorstyle.labelstylecss,
                color: themecolor.TXTWHITE,
              }}>
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('Categories')}
            style={MainNavigatorstyle.viewstyle1}>
            <AD name="appstore-o" size={18} color={themecolor.BACKICON} />
            <Text
              allowFontScaling={false}
              style={{
                ...MainNavigatorstyle.labelstylecss,
                color: themecolor.TXTWHITE,
              }}>
              Categories
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('Brands')}
            style={MainNavigatorstyle.viewstyle1}>
            <MCI name="tag-outline" size={18} color={themecolor.BACKICON} />
            <Text
              allowFontScaling={false}
              style={{
                ...MainNavigatorstyle.labelstylecss,
                color: themecolor.TXTWHITE,
              }}>
              Brands
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('Profile')}
            style={MainNavigatorstyle.viewstyle1}>
            <FA name="user-o" size={18} color={themecolor.BACKICON} />
            <Text
              allowFontScaling={false}
              style={{
                ...MainNavigatorstyle.labelstylecss,
                color: themecolor.TXTWHITE,
              }}>
              Profile
            </Text>
          </TouchableOpacity>

          {UserData.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                handleConfirmLogout();
                navigation.dispatch(DrawerActions.closeDrawer())
              }}
              style={MainNavigatorstyle.viewstyle1}>
              <AD name="logout" size={18} color={themecolor.BACKICON} />
              <Text
                allowFontScaling={false}
                style={{
                  ...MainNavigatorstyle.labelstylecss,
                  color: themecolor.TXTWHITE,
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </ScrollView>

        <View
          style={{
            ...MainNavigatorstyle.Borderline,
            borderWidth: 1,
            borderColor: themecolor.BOXBORDERCOLOR1,
          }}
        />
        <View style={{ marginVertical: 7 }} />

        <TouchableOpacity
          onPress={() => Linking.openURL('https://www.zillionsbuyer.com/blog/')}
          style={MainNavigatorstyle.viewstyle}>
          <Text
            allowFontScaling={false}
            style={{
              ...MainNavigatorstyle.labelstylecss,
              color: themecolor.BACKICON,
            }}>
            Blog
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.zillionsbuyer.com/home/about_Us')
          }
          style={MainNavigatorstyle.viewstyle}>
          <Text
            allowFontScaling={false}
            style={{
              ...MainNavigatorstyle.labelstylecss,
              color: themecolor.BACKICON,
            }}>
            About us
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.zillionsbuyer.com/home/faq')
          }
          style={MainNavigatorstyle.viewstyle}>
          <Text
            allowFontScaling={false}
            style={{
              ...MainNavigatorstyle.labelstylecss,
              color: themecolor.BACKICON,
            }}>
            FAQ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://www.zillionsbuyer.com/home/legal/terms_conditions',
            )
          }
          style={MainNavigatorstyle.viewstyle}>
          <Text
            allowFontScaling={false}
            style={{
              ...MainNavigatorstyle.labelstylecss,
              color: themecolor.BACKICON,
            }}>
            Terms & Conditions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://www.zillionsbuyer.com/home/legal/privacy_policy',
            )
          }
          style={MainNavigatorstyle.viewstyle}>
          <Text
            allowFontScaling={false}
            style={{
              ...MainNavigatorstyle.labelstylecss,
              color: themecolor.BACKICON,
            }}>
            Privacy policy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://www.zillionsbuyer.com/home/page/return-exchange-policy',
            )
          }
          style={MainNavigatorstyle.viewstyle}>
          <Text
            allowFontScaling={false}
            style={{
              ...MainNavigatorstyle.labelstylecss,
              color: themecolor.BACKICON,
            }}>
            Return policy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL('https://www.zillionsbuyer.com/#')}
          style={MainNavigatorstyle.viewstyle}>
          <Text
            allowFontScaling={false}
            style={{
              ...MainNavigatorstyle.labelstylecss,
              color: themecolor.BACKICON,
            }}>
            Sitemap
          </Text>
        </TouchableOpacity>

        <View style={{ marginVertical: 7 }} />

        <View style={MainNavigatorstyle.view2}>
          <View
            style={{
              ...MainNavigatorstyle.Borderline,
              borderWidth: 1,
              borderColor: themecolor.BOXBORDERCOLOR1,
            }}
          />
          <View style={{ marginVertical: 3 }} />
          <Text allowFontScaling={false} style={{ ...MainNavigatorstyle.view2txt }}>App Version 1.0</Text>
          <View style={{ marginVertical: 3 }} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
