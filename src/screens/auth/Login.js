import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  TextInput,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {useNavigation} from '@react-navigation/native';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import {RegisterLoginStyles} from '../../assets/css/RegisterLoginStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FullsizeButton from './FullsizeButton';
import {useToast} from 'react-native-toast-notifications';
import { postLogin } from '../../repository/AuthRepository/LoginRepository';
import Icon from 'react-native-vector-icons/MaterialIcons';
import VerifyModel from '../../components/shared/Model/VerifyModel';
import { StoreDatatoAsync } from '../../repository/AsyncStorageServices';

const {width, height} = Dimensions.get('screen');

export default function Login(props) {
  var toast=useToast();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const navigation = useNavigation();
  const [showmodal, setShowmodal] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const isDarkMode = Appearance.getColorScheme() === 'dark';

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

  const handleLogin = async () => {
    if (email == '') {
      toast.show('Email is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }else if ( !email.includes('@')|| !email.includes('gmail.com')) {
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
    } else {
      try {
        let formdata=new FormData()
        formdata.append('email',email)
        formdata.append('password',password)

        const res = await postLogin(formdata);
      
        if (res.status == true) {
          await StoreDatatoAsync('@UserData', JSON.stringify(res.data));
          await StoreDatatoAsync('@Token', JSON.stringify(res.data[0].token));
          setShowmodal(!showmodal)
        } 
        else {
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
          <RegisterLoginHeader title="Sign In"  onPressBack={() => handleBackButtonClick()}/>
        </View>
        <View style={{...RegisterLoginStyles.MGv5}} />
        <View style={{width: width, height: height * 0.68}}>
          <View
            style={{
              ...RegisterLoginStyles.container,
            }}>
            <View
              style={{
                backgroundColor: themecolor.OTPBOXCOLOR,
                borderColor: themecolor.OTPBOXCOLOR,
                ...RegisterLoginStyles.textInputView,
              }}>
              {/* <View> */}
              <Icon name="email" style={{marginLeft:15}} size={16} color={themecolor.BACKICON} />
              <View style={{width:width*0.75}}>
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
                backgroundColor: themecolor.OTPBOXCOLOR,
                borderColor: themecolor.OTPBOXCOLOR,
              }}>
              {/* <View> */}
              <Icon name="vpn-key" style={{marginLeft:15}} size={18} color={themecolor.BACKICON} />
              <View style={{width:width*0.72,}}>
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

            <View style={{...RegisterLoginStyles.MGv15}}>
              <FullsizeButton title="Sign In" onPress={()=>handleLogin()}/>
            </View>
            <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('ForgotPassword')}>
              <View style={RegisterLoginStyles.forgot}>
                <Text
                 allowFontScaling={false}
                  style={{
                    ...RegisterLoginStyles.forgotTxt,
                    color: themecolor.BACKICON,
                  }}>
                  Forgot Password?
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: width,
              height: height * 0.05,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                borderWidth: 0.3,
                borderColor: themecolor.TXTGREY,
                width: width * 0.3,
              }}
            />
            <View
              style={{
                width: width * 0.07,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text allowFontScaling={false} style={{color: themecolor.TXTGREY, fontSize: 11}}>
                {' '}
                OR{' '}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 0.3,
                borderColor: themecolor.TXTGREY,
                width: width * 0.3,
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: width,
            height: height * 0.18,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: width,
              height: height * 0.05,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
             allowFontScaling={false}
              style={{
                color: themecolor.BACKICON,
                fontSize: 12,
                fontWeight: 'bold',
              }}>
              Haven't any account?
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Register')}>
            <View
              style={{
                ...RegisterLoginStyles.btn,
                backgroundColor: "#fff",
                borderColor: themecolor.BOXBORDERCOLOR2,
              }}>
              <Text
               allowFontScaling={false}
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: themecolor.ADDTOCARTBUTTONCOLOR,
                }}>
                Register
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {showmodal && (
        <VerifyModel
          setShowmodal={setShowmodal}
          title={'Sign In Successfully.'}
          navigateTo='Dashboard'
          navigateFrom="Login"
        />
      )}
    </>
  );
}
