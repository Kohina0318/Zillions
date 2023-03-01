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
import Icon from 'react-native-vector-icons/MaterialIcons';
import FullsizeButton from './FullsizeButton';
import { postforgotPassword } from '../../repository/AuthRepository/ForgotRepository';
import {useToast} from 'react-native-toast-notifications';
import SuccessModel from '../../components/shared/Model/SuccessModel';

const {width, height} = Dimensions.get('screen');

export default function ForgotPassword(props) {
  var toast=useToast();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [showmodal, setShowmodal] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
 
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

  const handleForgotPassword = async () => {
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
    } 
    else {
      try {
        let formdata=new FormData()
        formdata.append('email',email)
        
        const res = await postforgotPassword(formdata);
        console.log('Data......forgot api ....line 42..>>>', res);

        if (res.status == true) {
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
        console.log('catch in ....Forgot page', e);
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
          <RegisterLoginHeader title="Forgot Password"  onPressBack={() => handleBackButtonClick()}/>
        </View>
        <View style={{...RegisterLoginStyles.MGv5}} />
        <View style={{width: width, height: height * 0.68}}>
          <View
            style={{
              ...RegisterLoginStyles.container,
            }}>
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                width: width * 0.9,
                height: height * 0.04,
                marginBottom: 5,
              }}>
              <View>
                <Text
                 allowFontScaling={false}
                  style={{
                    fontSize: 12,
                    color: themecolor.TXTWHITE,
                    textAlign: 'left',
                  }}>
                  {' '}
                  Enter your account email address and we'll send instructions
                  on how to reset your password.
                </Text>
              </View>
            </View>

            <View style={{...RegisterLoginStyles.MGv5}} />

            <View
              style={{
                backgroundColor: themecolor.OTPBOXCOLOR,
                borderColor: themecolor.OTPBOXCOLOR,
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

            <View style={{...RegisterLoginStyles.MGv15}}>
              <FullsizeButton title="Submit"  onPress={()=>handleForgotPassword()}/>
            </View>
          </View>
        </View>
      </View>

      {showmodal && (
        <SuccessModel
          setShowmodal={setShowmodal}
          title={'Email send Successfully. Please check link in your email.'}
          navigateTo={'Login'}
          navigateFrom="ForgotPassword"
        />
      )}
    </>
  );
}
