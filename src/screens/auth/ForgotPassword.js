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
import Icon from 'react-native-vector-icons/MaterialIcons'
import FullsizeButton from './FullsizeButton';

const {width, height} = Dimensions.get('screen');

export default function ForgotPassword(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const isDarkMode = Appearance.getColorScheme() === 'dark';

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <View style={{backgroundColor: themecolor.LOGINTHEMECOLOR, flex: 1}}>
        <View style={{height: height * 0.1}}>
          <RegisterLoginHeader title="Forgot Password" />
        </View>
        <View style={{...RegisterLoginStyles.MGv5}} />
        <View style={{width: width, height: height * 0.68}}>
          <View
            style={{
              ...RegisterLoginStyles.container,
            }}>

<View
              style={{
               alignSelf:'center',justifyContent:'center',width:width*0.9,height:height*0.05,marginBottom:10
              }}>
              <View>
              <Text
              style={{   fontSize: 15, color: themecolor.TXTWHITE,textAlign:'left'}}>
              {' '}
              Enter your account email address and we'll send instructions on how to reset your password.
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
              <Icon name="email" style={{marginLeft:5}} size={20} color={themecolor.TXTWHITE} />
             <View style={{width:width*0.75}}>
                <TextInput
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
              <FullsizeButton title="Submit" />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
