import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  BackHandler,
  ScrollView,
  Touchable,
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

  const handleOrderView = async () => {
    try {
      var res = await getOrderView(props.route.params.SaleId);
      console.log("handleOrderView.....", res.data)
      if (res.status === true) {
        setData(res.data);
        setProductDetailData(Object.values(JSON.parse(res.data.product_details)))
        setShippingAddress(JSON.parse(res.data.shipping_address))
        setLoader(false);
      }
      else {
        setProductDetailData([])
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
      setProductDetailData([])
      console.log('errrror in..handleOrderView page Order Detail-->', e);
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
                <OrderDetailProductDataList data={productDetailData} />
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
                  title="Continue Shopping"
                  icon={" "}
                  onPress={() => navigation.navigate("Dashboard")}
                  backgroundColor={'transparent'}
                  color={themecolor.BACKICON}
                  borderColor={themecolor.BACKICON}
                />
              </View>
            </View>
          </View>

        </>

      )}

    </View>
  );
}
