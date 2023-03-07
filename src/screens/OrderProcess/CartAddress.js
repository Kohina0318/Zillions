import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  BackHandler,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {styles} from '../../assets/css/OrderProcessStyle/CartAddressStyle';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import {useToast} from 'react-native-toast-notifications';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import {Stepper} from '../Stepper/Stepper';
import FAIcon from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('screen');

export default function CartAddress(props) {
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
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [loader, setLoader] = useState(false);

  return (
    <View style={{...styles.bg, backgroundColor: themecolor.THEMECOLOR}}>
      <RegisterLoginHeader
        title="Address"
        backIcon={true}
        onPressBack={() => handleBackButtonClick()}
      />
      {/* {loader ? (
        <LoadingFullScreen style={{ flex: 1 }} />
      ) : ( */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{...styles.container}}>
          <View>
            <Stepper item={'Address'} themecolor={themecolor} props={props} />
          </View>
          <View style={styles.marginTop} />
          <TouchableOpacity activeOpacity={0.5} onPress={()=>props.navigation.navigate('Address')}>
          <View style={{...styles.innerView}}>
            <Text
              allowFontScaling={false}
              style={{
                ...styles.txtChange,
                color: themecolor.BACKICON,
                borderColor: themecolor.ADDTOCARTBUTTONCOLOR,
                borderWidth: mode == 'dark' ? 2 : 0,
                padding: mode == 'dark' ? 8 : 0,
                borderRadius: mode == 'dark' ? 10 : 0,
              }}>
              + Change/Add Address
            </Text>
          </View>
          </TouchableOpacity>
          <View style={styles.marginTop} />
          <View
            style={{
              ...styles.datalistView,
              backgroundColor: themecolor.BOXBORDERCOLOR,
              borderColor: themecolor.BOXBORDERCOLOR1,
            }}>
            <View style={{...styles.innerView}}>
              <Text
                allowFontScaling={false}
                style={{...styles.txtHead, color: themecolor.TXTWHITE}}>
                Ayushi Kamthan
              </Text>
              <Text
                allowFontScaling={false}
                style={{...styles.txt2, color: themecolor.TXTWHITE}}>
                Shinde ki Chawwani Gwalior , Madhya Pradesh , 474001
              </Text>
              <Text
                allowFontScaling={false}
                style={{...styles.txtMobile, color: themecolor.TXTWHITE}}>
                Mobile No :
                <Text
                  allowFontScaling={false}
                  style={{...styles.txt1, color: themecolor.TXTWHITE}}>
                  {' '}
                  +91-9123456781
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* )} */}

      <View style={{marginVertical: 31}} />

      <View
        style={{
          ...styles.touchview,
          borderTopColor: themecolor.BOXBORDERCOLOR1,
          backgroundColor: themecolor.LOGINTHEMECOLOR,
        }}>
        <View style={{...styles.mainView}}>
          <View style={{width: '40%', justifyContent: 'center'}}>
            <Text
              allowFontScaling={false}
              style={{...styles.txt, color: themecolor.TXTWHITE}}>
              <FAIcon name="rupee" size={14} />
              10000
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                ...styles.txtConvenienceFee,
                color: themecolor.ADDTOCARTBUTTONCOLOR,
              }}>
              View Details
            </Text>
          </View>

          <View style={{width: '60%'}}>
            <HalfSizeButton
              title="Proceed To Payment"
              icon=""
              backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
              color={'#fff'}
              borderColor={themecolor.BORDERCOLOR}
              onPress={() => props.navigation.navigate('Payment')}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
