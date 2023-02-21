import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {useNavigation} from '@react-navigation/native';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import {RegisterLoginStyles} from '../../assets/css/RegisterLoginStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FullsizeButton from './FullsizeButton';
import {useToast} from 'react-native-toast-notifications';

const {width, height} = Dimensions.get('screen');

export default function Login(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const isDarkMode = Appearance.getColorScheme() === 'dark';

  var toast=useToast();

  const handleLogin = async () => {
    if (email == '') {
      toast.show('Mobile number is required!', {
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
      setLoader(true)
      try {
        const res = await postLoginProcess(mobileNo, password);
        console.log('Data......login api ....line 42..>>>', res);

        if (res.status == 'true') {
          await AsyncStorage.setItem('@UserData', JSON.stringify(res.data));
          await AsyncStorage.setItem('@token', res.data.token);
          props.navigation.navigate('Dashboard');
          setLoader(false)
        } 
        else {
          setLoader(false)
          toast.show(res.message, {
            type: 'danger',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
      } catch (e) {
        console.log('catch in ....login page', e);
        setLoader(false)
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
          <RegisterLoginHeader title="Sign In" />
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
              <View>
                <TextInput
                  value={email}
                  placeholderTextColor={themecolor.TXTGREYS}
                  placeholder="Email Address or Username*"
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
              <View>
                <TextInput
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
                  size={20}
                  color={themecolor.HEADERTHEMECOLOR}
                />
              </View>
            </View>

            <View style={{...RegisterLoginStyles.MGv15}}>
              <FullsizeButton title="Sign In" onPress={()=>handleLogin()}/>
            </View>
            <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('ForgotPassword')}>
              <View style={RegisterLoginStyles.forgot}>
                <Text
                  style={{
                    ...RegisterLoginStyles.forgotTxt,
                    color: themecolor.TXTWHITE,
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
                borderWidth: 1,
                borderColor: themecolor.TXTGREY,
                width: width * 0.43,
              }}
            />
            <View
              style={{
                width: width * 0.1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: themecolor.TXTGREY, fontSize: 12}}>
                {' '}
                Or{' '}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: themecolor.TXTGREY,
                width: width * 0.43,
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
              style={{
                color: themecolor.TXTWHITE,
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              Already have an account?
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Register')}>
            <View
              style={{
                ...RegisterLoginStyles.btn,
                backgroundColor: themecolor.LOGINTHEMECOLOR1,
                borderColor: themecolor.TXTWHITE,
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: themecolor.TXTWHITE,
                }}>
                Register
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
