import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  BackHandler,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { styles } from '../../assets/css/FeedbackCss/FeedbackStyle';
import { useToast } from 'react-native-toast-notifications';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { useNavigation } from '@react-navigation/native';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import { getProfileInfo } from '../../repository/ProfileRepository/ProfileRepo';
import { getUserData } from '../../repository/CommonRepository';
import { postFeedBack } from '../../repository/ProfileRepository/FeedBackRepo';

const { width, height } = Dimensions.get('screen');

export default function FeedBack(props) {

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const toast = useToast();
  const navigation = useNavigation();

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [loader, setLoader] = useState(true);
  const [userName, setUserName] = useState("")
  const [userMobileno, setUserMobileno] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [discription, setDiscription] = useState("")


  const handleSubmit = async () => {

    if (userName == '') {
      toast.show('Name is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (userMobileno == '') {
      toast.show('Mobile No. is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (userMobileno.length < 10) {
      toast.show('Please enter valid mobile number!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (userEmail == '') {
      toast.show('Email is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
    else if (discription == '') {
      toast.show('Discription is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
    else {
      try {
        let formdata = new FormData();
        formdata.append('', userName);
        formdata.append('', userMobileno);
        formdata.append('', userEmail);
        formdata.append('', discription);

        console.log("formdata...", formdata)

        var res = await postFeedBack(formdata);
        if (res.status === true) {
          toast.show(res.msg, {
            type: 'success',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
        else {

        }

      } catch (e) {
        console.log('errrror in..getManageAddress page in address-->', e);
        toast.show('Something went wrong!, Try again later.', {
          type: 'danger',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    }
  };


  useEffect(() => {
    async function temp() {
      try {
        var userData = await getUserData();
        if (userData == null || userData == '' || userData == undefined) {
          setLoader(false)
        } else {
          var nameUser = `${userData[0].username.replace(/\s+/g, '')} ${userData[0].surname.replace(/\s+/g, '')}`
          setUserName(nameUser)
          setUserEmail(userData[0].email)
          setUserMobileno(userData[0].phone)
          setLoader(false)
        }
      } catch (e) {
        setLoader(false)
      }
    }
    temp()
  }, [props]);


  return (
    <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>

      <RegisterLoginHeader
        title={"Feedback"}
        backIcon={true}
        onPressBack={() => handleBackButtonClick()}
      />

      {loader ? (
        <LoadingFullScreen style={{ flex: 1 }} />
      ) : (
        <>
          <View style={{ ...styles.container, }} >
            <View style={{ ...styles.ViewHeading }}>
              <Text allowFontScaling={false} style={{ ...styles.headingTxt, color: themecolor.TXTWHITE }}>
                FeedBack
              </Text>

              <View
                style={{
                  ...styles.editInnerView,
                  backgroundColor: themecolor.BOXBORDERCOLOR,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                }}>
                <View>
                  <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.TXTWHITE }}>Name</Text>
                  <View
                    style={{
                      ...styles.TextView,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                      backgroundColor: themecolor.BOXBORDERCOLOR,
                    }}>
                    <TextInput
                      allowFontScaling={false}
                      value={userName}
                      placeholder={'Name'}
                      placeholderTextColor={themecolor.TXTGREYS}
                      style={{
                        ...styles.TextInput,
                        color: themecolor.TXTWHITE,
                      }}
                      onChangeText={txt => setUserName(txt)}
                    />
                  </View>
                </View>
                <View style={{ ...styles.Mv5 }} />
                <View>
                  <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.TXTWHITE }}>Mobile no</Text>
                  <View
                    style={{
                      ...styles.TextView,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                      backgroundColor: themecolor.BOXBORDERCOLOR,
                    }}>
                    <TextInput
                      allowFontScaling={false}
                      keyboardType="numeric"
                      value={userMobileno}
                      placeholder={'Mobile no'}
                      placeholderTextColor={themecolor.TXTGREYS}
                      style={{
                        ...styles.TextInput,
                        color: themecolor.TXTWHITE,
                      }}
                      onChangeText={txt => setUserMobileno(txt)}
                    />
                  </View>
                </View>
                <View style={{ ...styles.Mv5 }} />
                <View>
                  <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.TXTWHITE }}>Email</Text>
                  <View
                    style={{
                      ...styles.TextView,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                      backgroundColor: themecolor.BOXBORDERCOLOR,
                    }}>
                    <TextInput
                      allowFontScaling={false}
                      value={userEmail}
                      placeholder={'Email'}
                      placeholderTextColor={themecolor.TXTGREYS}
                      style={{
                        ...styles.TextInput,
                        color: themecolor.TXTWHITE,
                      }}
                      onChangeText={txt => setUserEmail(txt)}
                    />
                  </View>
                </View>
                <View style={{ ...styles.Mv5 }} />
                <View>
                  <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.TXTWHITE }}>Discription</Text>
                  <View
                    style={{
                      ...styles.modelTextViewMsg,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                      backgroundColor: themecolor.BOXBORDERCOLOR,
                    }}>
                    <TextInput
                      allowFontScaling={false}
                      value={discription}
                      multiline
                      numberOfLines={4}
                      placeholder={'Discription'}
                      placeholderTextColor={themecolor.TXTGREYS}
                      style={{
                        ...styles.modelTextInput,
                        color: themecolor.TXTWHITE,
                      }}
                      onChangeText={txt => setDiscription(txt)}
                    />
                  </View>
                </View>



              </View>
              <View style={{ ...styles.Mv5 }} />

              <View
                style={{
                  ...styles.touchview,
                }}>
                <View style={{ ...styles.mainView }}>
                  <HalfSizeButton
                    title="FeedBack"
                    icon=" "
                    backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                    color={'#fff'}
                    borderColor={themecolor.BOXBORDERCOLOR1}
                    onPress={() => handleSubmit()}
                  />
                </View>
              </View>

              <View style={{ marginVertical: 48 }} />

            </View>
          </View>


        </>

      )}

    </View>
  );
}
