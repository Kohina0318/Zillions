import React,{useState,useEffect} from 'react'
import { View,Text,Image,TouchableOpacity,BackHandler } from 'react-native'
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { styles } from '../../assets/css/CartCss/PaymentConfirmationStyle';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import { getProfileInfo } from '../../repository/ProfileRepository/ProfileRepo';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { postDefaultAddress } from '../../repository/AddressRepository/MangeAddressRepo';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import OrderDetailsPaymentHistoryComp from '../../components/shared/OrderProcessComponents/Cart/OrderDetailsPaymentHistoryComp';

export const PaymentConfirmation = (props) => {

  const navigation=useNavigation();

  const toast=useToast()

    function handleBackButtonClick() {
        navigation.navigate('Dashboard')
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
    const [loader, setLoader] = useState(true);
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [state, setState] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    const handleManageAddress = async () => {
        try {
          var userData = await getProfileInfo();
          setName(userData.data[0].username.replace(/\s+/g, ''))
          setSurname(userData.data[0].surname.replace(/\s+/g, ''))
    
          var body = new FormData()
          body.append("type", "default")
          var res = await postDefaultAddress(body);
          if (res.status == true) {
            // setData(res.data);
            if(res.data.length >0 ){
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

      useEffect(()=>{
        setLoader(true);
        handleManageAddress();
      },[])
  
  return (
    <View style={{...styles.bg, backgroundColor: themecolor.THEMECOLOR}}>
        <RegisterLoginHeader
          title="Payment Confirmed"
          backIcon={true}
          onPressBack={() =>handleBackButtonClick()}
        />
         {loader ? (
        <LoadingFullScreen style={{ flex: 1 }} />
      ) : (
        <>
    <View style={{...styles.centeredView}}>
    <View style={{...styles.modalView,backgroundColor:themecolor.TXTWHITE1, borderColor: themecolor.BOXBORDERCOLOR1,}}>
     <Image
        source={require('../../assets/images/confetti.gif')}
        resizeMode='contain'
        style={{...styles.imageStyle}}
     />
     <View style={{...styles.congratsView}}>
      <Text style={{...styles.congratsText,color:themecolor.TXTWHITE}}>Congratulation! </Text>
      <Text style={{...styles.txt,color:themecolor.TXTWHITE}}>Your order has been Placed</Text>
     </View>
    </View>
    <View style={{ ...styles.mgT10 }} />
    <View style={{...styles.lef}}>
    <Text
                    allowFontScaling={false}
                    style={{ ...styles.txtHeading, color: themecolor.TXTGREYS }}>
                    Product Delivered to this address:-
                  </Text>
    </View>
    <View
                style={{
                  ...styles.datalistView,
                  backgroundColor: themecolor.TXTWHITE1,
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
   
    <View style={{ ...styles.mgT10 }} />
    <View style={{...styles.lef}}>
    <Text
                    allowFontScaling={false}
                    style={{ ...styles.txtHeading, color: themecolor.TXTGREYS }}>
                    Order Details:-
                  </Text>
    </View>
    <OrderDetailsPaymentHistoryComp themecolor={themecolor.TXTWHITE1} detailData={props.route.params.data} />
    
    <View style={{ ...styles.mgT10 }} />

  </View>
  {/* <View style={{marginVertical:33}}/> */}
  <TouchableOpacity
            activeOpacity={0.5}
            onPress={()=>navigation.navigate('Order',{page:"Data"})}>
            <View
              style={{
                ...styles.ModelDoneButton,
                backgroundColor: themecolor.ADDTOCARTBUTTONCOLOR,
              }}>
              <Text allowFontScaling={false} style={{...styles.textStyleDone}}>Move To Order Detail</Text>
            </View>
          </TouchableOpacity>
          </>
      )}
  </View>
  )
}
