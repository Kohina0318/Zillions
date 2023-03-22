import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  BackHandler,
  ScrollView,
  Touchable,
  Alert,
  TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { styles } from '../../assets/css/OrderCss/OrderStyle';
import { getOrderView } from '../../repository/OrderRepository/OrderRepo';
import { useToast } from 'react-native-toast-notifications';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { OrderDetailProductDataList } from '../../components/shared/FlateLists/OrderFlateList/OrderDetailProductDataList';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import { useNavigation } from '@react-navigation/native';
import OrderHistoryDetailComp from '../../components/shared/OrderProcessComponents/OrderHistory/OrderHistoryDetailComp';
import OrderHistoryTotalAmountComp from '../../components/shared/OrderProcessComponents/OrderHistory/OrderHistoryTotalAmountComp';
import OrderHistoryAddressComp from '../../components/shared/OrderProcessComponents/OrderHistory/OrderHistoryAddressComp';
import VerifyModel from '../../components/shared/Model/VerifyModel';
import { postReturnOrder } from '../../repository/OrderRepository/OrderRepo';

const { width, height } = Dimensions.get('screen');

export default function OrderDetails(props) {

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
  const [data, setData] = useState({})
  const [productDetailData, setProductDetailData] = useState([])
  const [shippingAddress, setShippingAddress] = useState({})
  const [deliveryStatus, setDeliveryStatus] = useState('delivered')
  const [showmodal,setShowmodal]=useState(false);
  const [title, setTitle] = useState('Return Order');
  const [disabled, setDisabled] = useState(false);

  const handleReturnOrder = async () => {
    Alert.alert(
      'Return Order',
      'Are you sure, you wants to return the order?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try{
            var res = await postReturnOrder(props.route.params.SaleId);
            console.log(res)
            if (res.status === true) {
              setShowmodal(true)
              setTitle('Request Sent');
              setDisabled(true)
            }
            else{
              toast.show("Sorry!,Your Request can't be processed", {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          }
          catch(e) {
            console.log('errrror in..handleOrderView page Order Detail-->', e);
            toast.show('Something went wrong!, Try again later.', {
              type: 'danger',
              placement: 'bottom',
              duration: 3000,
              offset: 30,
              animationType: 'slide-in',
            });
          }
          },
        },
      ],
    );
  };

  const handleOrderView = async () => {
    try {
      var res = await getOrderView(props.route.params.SaleId);
      if (res.status === true) {
        console.log(res.data.product)
        if(res.data.delivery_status != undefined || res.data.delivery_status != null ||res.data.delivery_status != ''){
        var status=JSON.parse(res.data.delivery_status)
        var Dstatus=status[0].status
        // setDeliveryStatus(Dstatus);
        }
        if(res.data.return_status=="1"||res.data.return_status==1)
        {
          setTitle("Request Sent")
          setDisabled(true)
        }
        console.log(res.data)
        setData(res.data);
        setProductDetailData(res.data.product)
        setShippingAddress(res.data.address)
        setLoader(false);
      }
      else {
        setProductDetailData([])
        setLoader(false);
      }
    } catch (e) {
      setProductDetailData([])
      setLoader(false);
      console.log('errrror in..handleOrderView page Order Detail-->', e);
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
    handleOrderView();
  }, []);


  return (
    <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>

      <RegisterLoginHeader
        title={`Order Id : ${props.route.params.saleCode}`}
        backIcon={true}
        onPressBack={() => handleBackButtonClick()}
      />

      {loader ? (
        <LoadingFullScreen style={{ flex: 1 }} />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>

            {Object.values(data).length > 0 ?
              <>
                <View style={{ ...styles.marTop }} />
                <OrderHistoryTotalAmountComp data={data} />
              </> : <></>}

            {productDetailData.length > 0 ?
              <>
                <View style={{ ...styles.mgT10 }} />
                <OrderDetailProductDataList data={productDetailData}/>
              </>
              : <></>}

            {Object.values(data).length > 0 ?
              <>
                <View style={{ ...styles.mgT10 }} />
                <OrderHistoryDetailComp detailData={data} />
              </> : <></>}

            {Object.values(shippingAddress).length > 0 ?
              <>
                <View style={{ ...styles.mgT10 }} />
                <OrderHistoryAddressComp data={shippingAddress} />
              </> : <></>}

            <View style={{ ...styles.marTop }} />

          </ScrollView>

          <View style={{ marginVertical: 31 }} />

          <View
            style={{
              ...styles.touchview,
              borderTopColor: themecolor.BOXBORDERCOLOR1,
              backgroundColor: themecolor.LOGINTHEMECOLOR,
            }}>
            <View style={{ ...styles.mainView }}>
              <View style={{ width: '100%' }}>
                <HalfSizeButton
                  title={deliveryStatus=="delivered"?title:"Continue Shopping"}
                  icon={" "}
                  onPress={deliveryStatus=="delivered"?(()=>handleReturnOrder()):(() =>navigation.navigate("Dashboard") )}
                  backgroundColor={'transparent'}
                  color={deliveryStatus=="delivered"?themecolor.TEXTRED:themecolor.BACKICON}
                  borderColor={deliveryStatus=="delivered"?themecolor.TEXTRED:themecolor.BACKICON}
                  disabled={disabled}
                />
              </View>
            </View>
          </View>

        </>

      )}

      {showmodal && (
        <VerifyModel
          setShowmodal={setShowmodal}
          title={'Request Sent Successfully.'}
          navigateTo=''
        />
      )}

    </View>
  );
}
