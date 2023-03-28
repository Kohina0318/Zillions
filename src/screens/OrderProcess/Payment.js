import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  BackHandler,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { styles } from '../../assets/css/CartCss/PaymentStyle';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import { useToast } from 'react-native-toast-notifications';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Stepper } from '../Stepper/Stepper';
import { CheckBox } from '@rneui/themed';
import OrderDetailsComp from '../../components/shared/OrderProcessComponents/Cart/OrderDetailsComp';
import { getCartOrderDetails } from '../../repository/OrderProcessRepository/CartListRepo';
import CartViewDetailsButton from '../../components/shared/button/CartViewDetailsButton';
import { store } from '../../../App';
import RazorpayCheckout from 'react-native-razorpay';
import { getProfileInfo } from '../../repository/ProfileRepository/ProfileRepo';
import { postPayment } from '../../repository/OrderProcessRepository/PaymentRepo';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

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
  const navigation = useNavigation();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [loader, setLoader] = useState(true);
  const [state, setState] = useState(false);
  const [online, setOnline] = useState(true);
  const [paymentMode, setPaymentMode] = useState('Online');
  const [detailData, setDetailData] = useState('');
  const [title, setTitle] = useState('Pay Now');

  const access_key = 'rzp_test_cdnNWMaIkNop2J';

  const random_id = Math.random().toFixed(16).split('.')[1];

  var cart = useSelector(state => state.cart)
  var cartLen = Object.keys(cart)

  const handleCartOrderDetails = async () => {
    try {
      var res = await getCartOrderDetails();
      if (res.status == true) {
        setDetailData(res.data);
        setLoader(false);
      }
      else {
        setLoader(false);
      }
    } catch (e) {
      setLoader(false);
      console.log('errrror in..handleCartOrderDetails page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  useEffect(() => {
    handleCartOrderDetails();
  }, []);

  const handleCash = () => {
    setState(!state);
    setPaymentMode('Cash On Delivery');
    setTitle('Place Order');
    setOnline(false);
  };
  const handleOnline = async () => {
    setOnline(!online);
    setState(false);
    setTitle('Pay Now');
    setPaymentMode('Online');
  };

  const handlePayment = async () => {
    try {
      var userData = '';
      var Amount = '';

      var res = await getProfileInfo();
      if (res.status === true) {
        userData = res.data[0];

        if (paymentMode == 'Online') {

          if (
            detailData.grand_total != null ||
            detailData.grand_total != '' ||
            detailData.grand_total != undefined
          ) {
            Amount = detailData.grand_total;
          }

          if (userData != '' && Amount != '') {
            var options = {
              description: random_id,
              image:
                'https://www.zillionsbuyer.com/uploads/logo_image/logo_0.png',
              currency: 'INR',
              key: access_key, // Your api key
              amount: parseInt(Amount) * 100,
              name: 'Zillionbuyer',
              handler: function (response) {
                console.log(response.razorpay_payment_id);
              },
              prefill: {
                name: `${userData.username} ${userData.surname}`,
                contact: userData.phone,
                email: userData.email,
              },
              theme: { color: '#281E5D' },
              modal: {
                ondismiss: () => console.log("handleDismis")
              },
            };
            RazorpayCheckout.open(options)
              .then(async (data) => {
                setLoader(true)
                if (data.razorpay_payment_id) {
                  // handle success
                  // alert(`Success: ${data.razorpay_payment_id}`);
                  console.log(`Success: ${data.razorpay_signature},${data.razorpay_order_id},${data.razorpay_payment_id}`)

                  var body = new FormData();
                  body.append('payment_type', 'razorpay');
                  body.append('address_id', props.route.params.id);
                  body.append('razorToken', access_key);
                  body.append('razorpay_signature', data.razorpay_signature);
                  body.append('razorpay_order_id', data.razorpay_order_id);
                  body.append('razorpay_payment_id', data.razorpay_payment_id);
                  body.append('zb_order_id', random_id);
                  var res = await postPayment(body);
                  if (res.status == true) {
                    cartLen.map((item) => {
                      store.dispatch({ type: 'DEL_CART', payload: [item] })
                    })
                    setLoader(false);
                    props.navigation.navigate('PaymentConfirmation', { data: detailData })
                  } else {
                    setLoader(false);
                    toast.show(res.msg, {
                      type: 'warning',
                      placement: 'bottom',
                      duration: 3000,
                      offset: 30,
                      animationType: 'slide-in',
                    });
                  }
                } else {
                  setLoader(false)
                  toast.show(
                    'Something Went wrong!, Please try after sometime.',
                    {
                      type: 'danger',
                      placement: 'bottom',
                      duration: 3000,
                      offset: 30,
                      animationType: 'slide-in',
                    },
                  );
                }
              })
              .catch(error => {
                setLoader(false)
                // handle failure
                // alert(`Error: ${error.code} | ${error.description}`);
                console.log(
                  `....Error in RazorpayCheckout...>>: ${error.code} | ${error.description}`,
                );
              });
            RazorpayCheckout.onExternalWalletSelection(data => {
              console.log(`External Wallet Selected: ${data.external_wallet} `);
            });
          }
        }

        else if (paymentMode == 'Cash On Delivery') {
          try {
            setLoader(true);
            var body = new FormData();
            body.append('payment_type', 'cash_on_delivery');
            body.append('address_id', props.route.params.id);
            var res = await postPayment(body);
            if (res.status == true) {
              cartLen.map((item) => {
                store.dispatch({ type: 'DEL_CART', payload: [item] })
              })
              setLoader(false);
              props.navigation.navigate('PaymentConfirmation', { data: detailData })
            } else {
              setLoader(false);
              toast.show(res.msg, {
                type: 'warning',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          } catch (e) {
            console.log('errrror in..getManageAddress page-->', e);
            setLoader(false);
            toast.show('Something went wrong!, Try again later.', {
              type: 'danger',
              placement: 'bottom',
              duration: 3000,
              offset: 30,
              animationType: 'slide-in',
            });
          }
        }

        else {
          toast.show('Please select payment mode!', {
            type: 'warning',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
        }

      }
      else if (res.msg == "Invalid Authentication") {
        Alert.alert(
          'Login to continue',
          'Do you want to Login?',
          [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'Yes', onPress: () => navigation.navigate('Login') },
          ],
        );
      }
      else {

      }

    } catch (e) {
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      })
    }
  };

  return (
    <>
      <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>
        <RegisterLoginHeader
          title="Payment"
          backIcon={true}
          onPressBack={() => handleBackButtonClick()}
        />
        {loader ? (
          <LoadingFullScreen style={{ flex: 1 }} />
        ) : (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ ...styles.container }}>
                <View>
                  <Stepper
                    item={'Payment'}
                    themecolor={themecolor}
                    props={props}
                  />
                </View>
                <View style={styles.marginTop} />
                <View
                  style={{
                    ...styles.MethodView,
                    backgroundColor: themecolor.BOXBORDERCOLOR,
                  }}>
                  <View style={{ width: width * 0.93 }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        ...styles.PayModeTXT,
                        color: themecolor.TXTWHITE,
                      }}>
                      Select Payment Method
                    </Text>
                  </View>

                  <View>
                    <View style={{ ...styles.FLEXR }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          ...styles.PayModeTXT1,
                          color: themecolor.TXTGREYS,
                        }}>
                        PAY ONLINE{' '}
                      </Text>
                      <View
                        style={{
                          ...styles.borderLine,
                          borderColor: themecolor.TXTGREYS,
                        }}
                      />
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => handleOnline()}>
                      <View
                        style={{
                          ...styles.FLEXR,
                          justifyContent: 'space-between',
                        }}>
                        <View style={{ width: width * 0.8, flexDirection: 'row' }}>
                          <Image
                            source={require('../../assets/images/PAYU.png')}
                            resizeMode="contain"
                            style={{ width: 50, height: 27 }}
                          />
                          <Text
                            allowFontScaling={false}
                            style={{
                              ...styles.PayModeTXT2,
                              color: themecolor.TXTWHITE,
                            }}>
                            Pay Online Using Pay U
                          </Text>
                        </View>
                        <View style={{ width: width * 0.1 }}>
                          <FAIcon
                            name={online ? 'angle-down' : 'angle-right'}
                            size={18}
                            color={themecolor.TXTWHITE}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>

                    {online ? (
                    <View style={{ ...styles.FLEXR2, }}>
                      <View style={{ ...styles.payModeViewFLEXR2 }}>
                        <Image
                          source={require('../../assets/images/Note.png')}
                          resizeMode="contain"
                          style={{ width: 50, height: 27 }}
                        />
                        <Text
                          allowFontScaling={false}
                          style={{
                            ...styles.PayModeTXT2,
                            color: themecolor.TXTWHITE,
                          }}>
                          PayU
                        </Text>
                      </View>

                      <View style={{ width: width * 0.1 }}>
                        <CheckBox
                          checked={true}
                          checkedIcon="dot-circle-o"
                          uncheckedIcon="circle-o"
                          containerStyle={{ backgroundColor: 'transparent' }}
                          checkedColor={themecolor.ADDTOCARTBUTTONCOLOR}
                        />
                      </View>
                    </View>
                    ) : (
                    <></>
                  )}
                  </View>

                  <View>
                    <View style={{ ...styles.FLEXR }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          ...styles.PayModeTXT1,
                          color: themecolor.TXTGREYS,
                        }}>
                        PAY IN CASH{' '}
                      </Text>
                      <View
                        style={{
                          ...styles.borderLine,
                          borderColor: themecolor.TXTGREYS,
                        }}
                      />
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => handleCash()}>
                      <View style={{ ...styles.FLEXR }}>
                        <View style={{ width: width * 0.8, flexDirection: 'row' }}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              ...styles.ruppee,
                            }}>
                            &#8377;
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={{
                              ...styles.PayModeTXT2,
                              color: themecolor.TXTWHITE,
                            }}>
                            Cash on Delivery
                          </Text>
                        </View>

                        <View style={{ width: width * 0.1 }}>
                          <FAIcon
                            name={state ? 'angle-down' : 'angle-right'}
                            size={18}
                            color={themecolor.TXTWHITE}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                    
                    {state ? (
                    <View style={{ ...styles.FLEXR2 }}>
                      <View style={{ ...styles.payModeViewFLEXR2 }}>
                        <Image
                          source={require('../../assets/images/Note.png')}
                          resizeMode="contain"
                          style={{ width: 50, height: 27 }}
                        />
                        <Text
                          allowFontScaling={false}
                          style={{
                            ...styles.PayModeTXT2,
                            color: themecolor.TXTWHITE,
                          }}>
                          Pay Cash on Delivery
                        </Text>
                      </View>

                      <View style={{ width: width * 0.1 }}>
                        <CheckBox
                          checked={true}
                          checkedIcon="dot-circle-o"
                          uncheckedIcon="circle-o"
                          containerStyle={{ backgroundColor: 'transparent' }}
                          checkedColor={themecolor.ADDTOCARTBUTTONCOLOR}
                        />
                      </View>
                    </View>
                    ) : (
                    <></>
                  )}
                  </View>
                </View>

                <View style={styles.marginTop} />

                <OrderDetailsComp detailData={detailData} />

                <View style={styles.marginTop} />
              </View>
            </ScrollView>

            <View style={{ marginVertical: 31 }} />

            <CartViewDetailsButton
              amount={detailData.grand_total}
              buttonTitle={title}
              buttonOnPress={() => handlePayment()}
            />
          </>
        )
        }
      </View >
    </>
  );
}
