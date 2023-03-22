import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  TextInput,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {useNavigation} from '@react-navigation/native';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import {RegisterLoginStyles} from '../../assets/css/HeaderCss/RegisterLoginStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FullsizeButton from './FullsizeButton';
import {useToast} from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FA from 'react-native-vector-icons/FontAwesome';
import {postRegistration} from '../../repository/AuthRepository/RegistrationRepository';
import VerifyModel from '../../components/shared/Model/VerifyModel';

const {width, height} = Dimensions.get('screen');

export default function Register(props) {
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

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const navigation = useNavigation();
  const [showmodal, setShowmodal] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isPasswordSecure1, setIsPasswordSecure1] = useState(true);

  var toast = useToast();

  const isDarkMode = Appearance.getColorScheme() === 'dark';

  const handleRegister = async () => {
    if (firstName == '') {
      toast.show('First Name is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } 
    else if (lastName == '') {
      toast.show('Last Name is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } 
    else if (mobileNo == '') {
      toast.show('Mobile number is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (mobileNo.length < 10) {
      toast.show('Please enter valid mobile number!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (email == '') {
      toast.show('Email is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (!email.includes('@') || !email.includes('gmail.com')) {
      toast.show('Please enter valid email address!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (password == '') {
      toast.show('Password is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (conPassword == '') {
      toast.show('Confirm Password is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else {
      try {
        let formdata = new FormData();
        formdata.append('username', firstName);
        formdata.append('surname', lastName);
        formdata.append('phone', mobileNo);
        formdata.append('email', email);
        formdata.append('password1', password);
        formdata.append('password2', conPassword);

        const res = await postRegistration(formdata);

        if (res.status == true) {
          setShowmodal(!showmodal);
        } else {
          toast.show(res.msg, {
            type: 'danger',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
      } catch (e) {
        console.log('catch in ....login page', e);
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

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <View style={{backgroundColor: themecolor.LOGINTHEMECOLOR, flex: 1}}>
        <View style={{height: height * 0.1}}>
          <RegisterLoginHeader
            title="Register"
            onPressBack={() => handleBackButtonClick()}
          />
        </View>
        <View style={{...RegisterLoginStyles.MGv5}} />
        <View style={{width: width, height: height}}>
          <View
            style={{
              ...RegisterLoginStyles.container,
            }}>
            <View
              style={{...RegisterLoginStyles.textTwoInputView}}>
              <View
                style={{
                  // backgroundColor: themecolor.OTPBOXCOLOR,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                  ...RegisterLoginStyles.textTwoInputView1,
                }}>
                <Icon
                  name="account-circle"
                  style={{marginLeft: 15}}
                  size={18}
                  color={themecolor.BACKICON}
                />
                <View style={{width: width * 0.31}}>
                  <TextInput
                    allowFontScaling={false}
                    value={firstName}
                    placeholderTextColor={themecolor.TXTGREYS}
                    placeholder="First Name*"
                    autoCapitalize="words"
                    onChangeText={text => setFirstName(text)}
                    style={{
                      color: themecolor.TXTWHITE,
                      ...RegisterLoginStyles.textInput,
                    }}
                  />
                </View>
              </View>

              <View
                style={{
                  // backgroundColor: themecolor.OTPBOXCOLOR,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                  ...RegisterLoginStyles.textTwoInputView1,
                }}>
                <Icon
                  name="account-circle"
                  style={{marginLeft: 15}}
                  size={18}
                  color={themecolor.BACKICON}
                />
                <View style={{width: width * 0.31}}>
                  <TextInput
                    allowFontScaling={false}
                    value={lastName}
                    placeholderTextColor={themecolor.TXTGREYS}
                    placeholder="Last Name*"
                    autoCapitalize="words"
                    onChangeText={text => setLastName(text)}
                    style={{
                      color: themecolor.TXTWHITE,
                      ...RegisterLoginStyles.textInput,
                    }}
                  />
                </View>
              </View>
            </View>

            <View style={{...RegisterLoginStyles.MGv5}} />

            <View
              style={{
                // backgroundColor: themecolor.OTPBOXCOLOR,
                borderColor: themecolor.BOXBORDERCOLOR1,
                ...RegisterLoginStyles.textInputView,
              }}>
              <FA
                name="mobile"
                style={{marginLeft: 15, marginRight: 5}}
                size={22}
                color={themecolor.BACKICON}
              />
              <View style={{width: width * 0.75}}>
                <TextInput
                  allowFontScaling={false}
                  value={mobileNo}
                  placeholderTextColor={themecolor.TXTGREYS}
                  placeholder="Mobile number*"
                  keyboardType="numeric"
                  maxLength={10}
                  onChangeText={text => setMobileNo(text)}
                  style={{
                    color: themecolor.TXTWHITE,
                    ...RegisterLoginStyles.textInput,
                  }}
                />
              </View>
            </View>

            <View style={{...RegisterLoginStyles.MGv5}} />
            <View
              style={{
                // backgroundColor: themecolor.OTPBOXCOLOR,
                borderColor: themecolor.BOXBORDERCOLOR1,
                ...RegisterLoginStyles.textInputView,
              }}>
              <Icon
                name="email"
                style={{marginLeft: 15}}
                size={16}
                color={themecolor.BACKICON}
              />
              <View style={{width: width * 0.75}}>
                <TextInput
                  allowFontScaling={false}
                  value={email}
                  placeholderTextColor={themecolor.TXTGREYS}
                  placeholder="Email Address*"
                  keyboardType="email-address"
                  inputMode="email"
                  onChangeText={text => setEmail(text)}
                  style={{
                    color: themecolor.TXTWHITE,
                    ...RegisterLoginStyles.textInput,
                  }}
                />
              </View>
            </View>

            <View style={{...RegisterLoginStyles.MGv5}} />

            <View
              style={{
                ...RegisterLoginStyles.textInputView,
                // backgroundColor: themecolor.OTPBOXCOLOR,
                borderColor: themecolor.BOXBORDERCOLOR1,
              }}>
              <Icon
                name="vpn-key"
                style={{marginLeft: 15}}
                size={18}
                color={themecolor.BACKICON}
              />
              <View style={{width: width * 0.72}}>
                <TextInput
                  allowFontScaling={false}
                  value={password}
                  placeholderTextColor={themecolor.TXTGREYS}
                  placeholder="Password*"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="newPassword"
                  secureTextEntry={isPasswordSecure}
                  enablesReturnKeyAutomatically
                  onChangeText={text => setPassword(text)}
                  style={{
                    color: themecolor.TXTWHITE,
                    ...RegisterLoginStyles.textInputpswd,
                  }}
                />
              </View>
              <View style={{...RegisterLoginStyles.eyeButton}}>
                <MaterialCommunityIcons
                  onPress={() => {
                    isPasswordSecure
                      ? setIsPasswordSecure(false)
                      : setIsPasswordSecure(true);
                  }}
                  name={isPasswordSecure ? 'eye-off' : 'eye'}
                  size={16}
                  color={themecolor.ADDTOCARTBUTTONCOLOR}
                />
              </View>
            </View>

            <View style={{...RegisterLoginStyles.MGv5}} />

            <View
              style={{
                ...RegisterLoginStyles.textInputView,
                // backgroundColor: themecolor.OTPBOXCOLOR,
                borderColor: themecolor.BOXBORDERCOLOR1,
              }}>
              <Icon
                name="vpn-key"
                style={{marginLeft: 15}}
                size={18}
                color={themecolor.BACKICON}
              />
              <View style={{width: width * 0.72}}>
                <TextInput
                  allowFontScaling={false}
                  value={conPassword}
                  placeholderTextColor={themecolor.TXTGREYS}
                  placeholder="Confirm Password*"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="newPassword"
                  secureTextEntry={isPasswordSecure1}
                  enablesReturnKeyAutomatically
                  onChangeText={text => setConPassword(text)}
                  style={{
                    color: themecolor.TXTWHITE,
                    ...RegisterLoginStyles.textInputpswd,
                  }}
                />
              </View>
              <View style={{...RegisterLoginStyles.eyeButton}}>
                <MaterialCommunityIcons
                  onPress={() => {
                    isPasswordSecure1
                      ? setIsPasswordSecure1(false)
                      : setIsPasswordSecure1(true);
                  }}
                  name={isPasswordSecure1 ? 'eye-off' : 'eye'}
                  size={16}
                  color={themecolor.ADDTOCARTBUTTONCOLOR}
                />
              </View>
            </View>

            <View
              style={{
                ...RegisterLoginStyles.MGv15,
                marginBottom: height * 0.23,
              }}>
              <FullsizeButton
                title="Register"
                onPress={() => handleRegister()}
              />
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Login')}>
            <View
              style={{
                width: width,
                height: height * 0.13,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                allowFontScaling={false}
                style={{
                  color: themecolor.BACKICON,
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                Already have an account?
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {showmodal && (
        <VerifyModel
          setShowmodal={setShowmodal}
          title={'Registration Successfully.'}
          navigateTo={'Login'}
          navigateFrom="Register"
        />
      )}
    </>
  );
}
