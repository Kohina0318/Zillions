import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  BackHandler,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { styles } from '../../assets/css/CartCss/CartAddressStyle';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import { useToast } from 'react-native-toast-notifications';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import { Stepper } from '../Stepper/Stepper';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { getManageAddressPost } from '../../repository/AddressRepository/MangeAddressRepo';
import { getCartOrderDetails } from '../../repository/OrderProcessRepository/CartListRepo';
import CartViewDetailsButton from '../../components/shared/button/CartViewDetailsButton';
import OrderDetailsComp from '../../components/shared/OrderProcessComponents/Cart/OrderDetailsComp';
import { useFocusEffect } from '@react-navigation/native';
import Register from '../auth/Register';
import { getProfileInfo } from '../../repository/ProfileRepository/ProfileRepo';

const { width, height } = Dimensions.get('screen');

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

  const [loader, setLoader] = useState(true);
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [state, setState] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [data, setData] = useState(false)

  const [detailData, setDetailData] = useState("");

  const handleCartOrderDetails = async () => {
    try {
      var res = await getCartOrderDetails()
      if (res.status == true) {
        setDetailData(res.data)
      } else {
        console.log('Status False in..handleCartOrderDetails page CartAddress-->');
      }
    } catch (e) {
      console.log('errrror in..handleCartOrderDetails page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  }

  const handleManageAddress = async () => {
    try {
      var userData = await getProfileInfo();
      console.log('userdata>>>>>>>>>>>>>>>>', userData)
      setName(userData.data[0].username.replace(/\s+/g, ''))
      setSurname(userData.data[0].surname.replace(/\s+/g, ''))

      var body = new FormData()
      body.append("type", "default")
      var res = await getManageAddressPost(body);
      
      console.log("manage address>>>>>>>>>",res)
      if (res.status == true) {
        // setData(res.data);
        if(res.data.length >0 ){
          setData(true)
        setAddress(res.data[0].address)
        setCity(res.data[0].city)
        setPhone(res.data[0].phone)
        setPostalCode(res.data[0].postal_code)
        setState(res.data[0].state)
        setLoader(false);
        }
        else{
          setLoader(false);
        }
        
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
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoader(true);
      handleCartOrderDetails()
      handleManageAddress();
    }, [props]),
  );

  const handleConfirmation=()=>{
    if(!data){
      Alert.alert(
        'Please add address to continue',
        'Do you want to add address?',
        [
          {
            text: 'No',
            onPress: () => console.log('No pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => props.navigation.navigate('Address')},
        ],
      );
    }
    else{
      props.navigation.navigate('Payment')
    }
  }


  return (
    <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>
      <RegisterLoginHeader
        title="Address"
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
                <Stepper item={'Address'} themecolor={themecolor} props={props} />
              </View>

              <View style={styles.marginTop} />
              <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate('Address')}>
                <View style={{ ...styles.innerView }}>
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
                    {data?
                  "+ Change/Add Address"
                    : "+ Add address"
                    }
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={styles.marginTop} />
              {data?<>
              <View
                style={{
                  ...styles.datalistView,
                  backgroundColor: themecolor.BOXBORDERCOLOR,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                }}>
                <View style={{ ...styles.innerView }}>
                  <Text
                    allowFontScaling={false}
                    style={{ ...styles.txtHead, color: themecolor.TXTWHITE }}>
                    {name} {surname}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={{ ...styles.txt2, color: themecolor.TXTWHITE }}>
                    {address==null||address==''?<></>:<>{address} ,</>} {city==null||city==''?<></>:<>{city} ,</>} {state==null||state==''?<></>:<>{state} ,</>} {postalCode}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={{ ...styles.txtMobile, color: themecolor.TXTWHITE }}>
                    Mobile No :
                    <Text
                      allowFontScaling={false}
                      style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>
                      {' '}
                      +91-{phone}
                    </Text>
                  </Text>
                </View>
              </View>
</>:<></>}
              <View style={styles.marginTop} />

              <OrderDetailsComp detailData={detailData} />

              

              <View style={styles.marginTop} />

            </View>
          </ScrollView>

          <View style={{ marginVertical: 31 }} />

          <CartViewDetailsButton amount={detailData.grand_total} buttonTitle={"Proceed To Payment"} buttonOnPress={() =>handleConfirmation()} />
        </>
      )}


    </View>
  );
}
