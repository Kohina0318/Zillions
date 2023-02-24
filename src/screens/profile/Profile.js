import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {ProfileDataList} from '../../components/shared/FlateLists/Profile/ProfileDataFlatList';
import Header from '../../components/shared/header/Header';
import {data, data1} from './ProfileData';
import {Avatar} from '@rneui/themed';
import {ProfileStyle} from '../../assets/css/ProfileStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';

const {width, height} = Dimensions.get('screen');

export default function Profile(props) {
  var navigation = useNavigation();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [loader, setLoader] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [UserData, setUserData] = useState([]);

  const handleUserData= async () => {
    try {
      var UserData = await AsyncStorage.getItem('@UserData');
      var data = JSON.parse(UserData);
      if (data == null || data == '' || data == undefined) {
        setUserData([])
        setLoader(false);
      } else {
        setUserData(data);
        setLoader(false);
      }
    } catch (e) {
      setLoader(false);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      setLoader(true);
      handleUserData();
    }, [refresh,props]),
  );


  const handleLogout = async () => {
    const daat =await AsyncStorage.removeItem('@UserData');
    setRefresh(!refresh) 
  };

  return (
    <View style={{backgroundColor: themecolor.THEMECOLOR, flex: 1}}>
      
      <Header title="Profile" />

      {loader ? (
        <LoadingFullScreen style={{flex: 1}} />
      ) : (
        <>
          
          <View style={{marginTop: 10}} />

          <ScrollView showsVerticalScrollIndicator={false}>
            {UserData.length > 0 ? (
              <>
                <View
                  style={{
                    ...ProfileStyle.datalistView1,
                    backgroundColor: themecolor.BOXTHEMECOLOR,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                  }}>
                  <View
                    style={{
                      ...ProfileStyle.profileDataView,
                    }}>
                    <View>
                      <Avatar
                        size={90}
                        rounded
                        avatarStyle={{
                          ...ProfileStyle.avater,
                        }}
                        source={require('../../assets/images/profile.jpg')}
                      />
                    </View>
                    <View
                      style={{
                        ...ProfileStyle.welcomView,
                      }}>
                      <Text
                        style={{
                          ...ProfileStyle.WellText,
                          color: themecolor.BACKICON,
                        }}>
                        Welcome {UserData[0].username}..
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    ...ProfileStyle.datalistView1,
                    backgroundColor: themecolor.BOXTHEMECOLOR,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                  }}>
                  <ProfileDataList data={data} />
                </View>
              </>
            ) : (
              <>
                <View
                  style={{
                    ...ProfileStyle.datalistView1,
                    backgroundColor: themecolor.BOXTHEMECOLOR,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                  }}>
                  <View style={ProfileStyle.signInView}>
                    <Text
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
                          backgroundColor: "#fff",
                          borderColor: themecolor.ADDTOCARTBUTTONCOLOR,
                        }}>
                        <Text
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
                    backgroundColor: themecolor.BOXTHEMECOLOR,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                  }}>
                  <ProfileDataList data={data1} />
                </View>
              </>
            )}

            <View
              style={{
                ...ProfileStyle.datalistView2,
              }}>
              {UserData.length > 0 ? (
                <TouchableOpacity
                  onPress={() => handleLogout()}
                  style={{
                    ...ProfileStyle.buttonView3,
                    backgroundColor:themecolor.ADDTOCARTBUTTONCOLOR,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                  }}>
                  <Text
                    style={{
                      ...ProfileStyle.buttonText1,
                      color:'#FFF',
                    }}>
                    Logout
                  </Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}

              <View style={{...ProfileStyle.appVerView}}>
                <Text
                  style={{
                    ...ProfileStyle.appverText,
                    color: themecolor.HEADERTHEMECOLOR,
                  }}>
                  {' '}
                  App Version 1.0{' '}
                </Text>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}
