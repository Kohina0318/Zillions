import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useNavigation } from '@react-navigation/native';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import { RegisterLoginStyles} from '../../assets/css/RegisterLoginStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FullsizeButton from './FullsizeButton';
import {useToast} from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FA from 'react-native-vector-icons/FontAwesome'

const { width, height } = Dimensions.get('screen');

export default function Register(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const navigation = useNavigation()
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [userName,setUserName]=useState('')
  const [email,setEmail]=useState('')
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  var toast=useToast();

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
      else if (userName == '') {
        toast.show('Username is required!', {
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
    } 
      else if ( !email.includes('@')|| !email.includes('gmail.com')) {
        toast.show('Please enter valid email address!', {
          type: 'warning',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      } 
      else if ( email == '') {
        toast.show('Email is required!', {
          type: 'warning',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      } 
       else if (password == '') {
      toast.show('Password is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } 
   
    else {
    
      try {
        const res = await postLoginProcess(mobileNo, password);
        console.log('Data......login api ....line 42..>>>', res);

        if (res.status == 'true') {
          await AsyncStorage.setItem('@UserData', JSON.stringify(res.data));
          await AsyncStorage.setItem('@token', res.data.token);
          props.navigation.navigate('Dashboard');
          
        } 
        else {
        
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
      <View style={{backgroundColor:themecolor.LOGINTHEMECOLOR,flex:1}}>
      <View style={{height: height * 0.1}}>
      <RegisterLoginHeader title="Register"/>
      </View>
      <View style={{...RegisterLoginStyles.MGv5}} />
      <View style={{width:width,height:height}}>
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
              <Icon name="account-circle" style={{marginLeft:5}} size={20} color={themecolor.TXTWHITE} />
              <View style={{width:width*0.75}}>
                <TextInput
                  value={firstName}
                  placeholderTextColor={themecolor.TXTGREYS}
                  placeholder="Enter First Name *"
                 autoCapitalize='words'
                  onChangeText={text => setFirstName(text)}
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
                backgroundColor: themecolor.OTPBOXCOLOR,
                borderColor: themecolor.OTPBOXCOLOR,
                ...RegisterLoginStyles.textInputView,
              }}>
              <Icon name="account-circle" style={{marginLeft:5}} size={20} color={themecolor.TXTWHITE} />
              <View style={{width:width*0.75}}>
                <TextInput
                  value={lastName}
                  placeholderTextColor={themecolor.TXTGREYS}
                  placeholder="Enter Last Name*"
                 autoCapitalize='words'
                  onChangeText={text => setLastName(text)}
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
                backgroundColor: themecolor.OTPBOXCOLOR,
                borderColor: themecolor.OTPBOXCOLOR,
                ...RegisterLoginStyles.textInputView,
              }}>
              <Icon name="account-circle" style={{marginLeft:5}} size={20} color={themecolor.TXTWHITE} />
              <View style={{width:width*0.75}}>
                <TextInput
                  value={userName}
                  placeholderTextColor={themecolor.TXTGREYS}
                  placeholder="Enter User Name*"
                 autoCapitalize='words'
                  onChangeText={text => setUserName(text)}
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
                backgroundColor: themecolor.OTPBOXCOLOR,
                borderColor: themecolor.OTPBOXCOLOR,
                ...RegisterLoginStyles.textInputView,
              }}>
              <FA name="mobile" style={{marginLeft:5}} size={20} color={themecolor.TXTWHITE} />
              <View style={{width:width*0.75}}>
                <TextInput
                  value={mobileNo}
                  placeholderTextColor={themecolor.TXTGREYS}
                  placeholder="Enter Mobile number*"
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
                backgroundColor: themecolor.OTPBOXCOLOR,
                borderColor: themecolor.OTPBOXCOLOR,
                ...RegisterLoginStyles.textInputView,
              }}>
              <Icon name="email" style={{marginLeft:5}} size={20} color={themecolor.TXTWHITE} />
              <View style={{width:width*0.75}}>
                <TextInput
                  value={email}
                  placeholderTextColor={themecolor.TXTGREYS}
                  placeholder="Enter Email Address*"
                  keyboardType="email-address"
                  inputMode='email'
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
               <Icon name="vpn-key" style={{marginLeft:5}} size={20} color={themecolor.TXTWHITE} />
              <View style={{width:width*0.75}}>
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

            <View style={{...RegisterLoginStyles.MGv15, marginBottom: height * 0.23}}>
              <FullsizeButton
                title="Register"
                onPress={()=>handleRegister()}
              />
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('Login')}>
          <View style={{width:width,height:height*0.1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:themecolor.TXTWHITE,fontSize:14,fontWeight:'bold'}}>Already have an account?</Text>
          </View>
          </TouchableOpacity>
      </View>
     
      </View>
    </>
  );
}
