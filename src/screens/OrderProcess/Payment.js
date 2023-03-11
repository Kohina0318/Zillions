import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  BackHandler,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {styles} from '../../assets/css/OrderProcessStyle/PaymentStyle';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import {useToast} from 'react-native-toast-notifications';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {Stepper} from '../Stepper/Stepper';
import {CheckBox} from '@rneui/themed';
import OrderDeailsComp from '../../components/shared/OrderProcessComponents/OrderDeailsComp';

const {width, height} = Dimensions.get('screen');

export default function Payment(props) {
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
  const [state, setState] = useState(false);
  const [online, setOnline] = useState(false);
  const [paymentMode, setPaymentMode] = useState('');

  const handlePayment = () => {
    if (paymentMode == '') {
      toast.show('Please select payment mode!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
    if (paymentMode == 'Cash On Delivery') {
      alert('Success in Cash On Delivery');
    }
    if (paymentMode == 'Online') {
      alert('Online Payment');
    }
  };

  const handleCash = () => {
    setState(!state);
    setPaymentMode('Cash On Delivery');
    setOnline(false);
  };
  const handleOnline = () => {
    setOnline(!online);
    setState(false);
    setPaymentMode('Online');
  };

  return (
    <View style={{...styles.bg, backgroundColor: themecolor.THEMECOLOR}}>
      <RegisterLoginHeader
        title="Payment"
        backIcon={true}
        onPressBack={() => handleBackButtonClick()}
      />
      {/* {loader ? (
        <LoadingFullScreen style={{ flex: 1 }} />
      ) : ( */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{...styles.container}}>
          <View>
            <Stepper item={'Payment'} themecolor={themecolor} props={props} />
          </View>
          <View style={styles.marginTop} />
          <View
            style={{
              ...styles.MethodView,
              backgroundColor: themecolor.BOXBORDERCOLOR,
            }}>
            <View style={{width: width * 0.93}}>
              <Text
                allowFontScaling={false}
                style={{...styles.PayModeTXT, color: themecolor.TXTWHITE}}>
                Select Payment Method
              </Text>
            </View>
            <View style={{...styles.FLEXR}}>
              <Text
                allowFontScaling={false}
                style={{...styles.PayModeTXT1, color: themecolor.TXTGREYS}}>
                PAY ONLINE{' '}
              </Text>
              <View
                style={{...styles.borderLine, borderColor: themecolor.TXTGREYS}}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleOnline()}>
              <View style={{...styles.FLEXR, justifyContent: 'space-between'}}>
                <View style={{width: width * 0.8, flexDirection: 'row'}}>
                  <Image
                    source={require('../../assets/images/PAYU.png')}
                    resizeMode="contain"
                    style={{width: 50, height: 27}}
                  />
                  <Text
                    allowFontScaling={false}
                    style={{...styles.PayModeTXT2, color: themecolor.TXTWHITE}}>
                    Pay Online Using Pay U
                  </Text>
                </View>
                <View style={{width: width * 0.1}}>
                  <FAIcon
                    name={online ? 'angle-down' : 'angle-right'}
                    size={15}
                    color={themecolor.TXTWHITE}
                  />
                </View>
              </View>
            </TouchableOpacity>

            {online ? (
              <View style={{...styles.FLEXR1}}>
                <View style={{width: width * 0.65, flexDirection: 'row'}}>
                  <Image
                    source={require('../../assets/images/Note.png')}
                    resizeMode="contain"
                    style={{width: 50, height: 27}}
                  />
                  <Text
                    allowFontScaling={false}
                    style={{...styles.PayModeTXT2, color: themecolor.TXTWHITE}}>
                    PayU
                  </Text>
                </View>

                <View style={{width: width * 0.1}}>
                  <CheckBox
                    checked={true}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    containerStyle={{backgroundColor: 'transparent'}}
                    checkedColor={themecolor.ADDTOCARTBUTTONCOLOR}
                  />
                </View>
              </View>
            ) : (
              <></>
            )}

            <View style={{...styles.FLEXR}}>
              <Text
                allowFontScaling={false}
                style={{...styles.PayModeTXT1, color: themecolor.TXTGREYS}}>
                PAY IN CASH{' '}
              </Text>
              <View
                style={{...styles.borderLine, borderColor: themecolor.TXTGREYS}}
              />
            </View>
            <TouchableOpacity activeOpacity={0.5} onPress={() => handleCash()}>
              <View style={{...styles.FLEXR}}>
                <View style={{width: width * 0.8, flexDirection: 'row'}}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      ...styles.ruppee,
                    }}>
                    &#8377;
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={{...styles.PayModeTXT2, color: themecolor.TXTWHITE}}>
                    Cash on Delivery
                  </Text>
                </View>

                <View style={{width: width * 0.1}}>
                  <FAIcon
                    name={state ? 'angle-down' : 'angle-right'}
                    size={15}
                    color={themecolor.TXTWHITE}
                  />
                </View>
              </View>
            </TouchableOpacity>
            {state ? (
              <View style={{...styles.FLEXR1}}>
                <View style={{width: width * 0.65, flexDirection: 'row'}}>
                  <Image
                    source={require('../../assets/images/Note.png')}
                    resizeMode="contain"
                    style={{width: 50, height: 27}}
                  />
                  <Text
                    allowFontScaling={false}
                    style={{...styles.PayModeTXT2, color: themecolor.TXTWHITE}}>
                    Pay Cash on Delivery
                  </Text>
                </View>

                <View style={{width: width * 0.1}}>
                  <CheckBox
                    checked={true}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    containerStyle={{backgroundColor: 'transparent'}}
                    checkedColor={themecolor.ADDTOCARTBUTTONCOLOR}
                  />
                </View>
              </View>
            ) : (
              <></>
            )}
          </View>
          <View style={styles.marginTop} />
          <OrderDeailsComp />
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
              title="Buy Now"
              icon=""
              backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
              color={'#fff'}
              borderColor={themecolor.BORDERCOLOR}
              onPress={() => handlePayment()}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
