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
import { styles } from '../../assets/css/OrderStyle';
import { getOrderView } from '../../repository/OrderRepository/OrderRepo';
import { useToast } from 'react-native-toast-notifications';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { OrderDetailProductDataList } from '../../components/shared/FlateLists/OrderFlateList/OrderDetailProductDataList';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import { useNavigation } from '@react-navigation/native';
import OrderDetailsComp from '../../components/shared/OrderProcessComponents/OrderDetailsComp';
import moment from 'moment';


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

  var dateSet = ''

  if (Object.values(data).length > 0) {
    if (data.sale_datetime != undefined || data.sale_datetime != null) {
      dateSet = moment(data.sale_datetime * 1000).format('ll')
    }
  }


  const handleOrderView = async () => {
    try {
      var res = await getOrderView(props.route.params.SaleId);
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
        title={`Order: #${props.route.params.saleCode}`}
        backIcon={true}
        onPressBack={() => handleBackButtonClick()}
      />

      {loader ? (
        <LoadingFullScreen style={{ flex: 1 }} />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>

            <View style={{ ...styles.marTop }} />

            <View
              style={{
                ...styles.datalistView,
                backgroundColor: themecolor.BOXBORDERCOLOR,
                borderColor: themecolor.BOXBORDERCOLOR1,
              }}
            >
              <View style={{ ...styles.flexDirView2, }}>
                <View style={{ ...styles.width65p }}>
                  <Text allowFontScaling={false} style={{ ...styles.txtBig, color: themecolor.TXTWHITE }}>
                    Total Amount : <FAIcon name="rupee" size={15} />{data.grand_total}
                  </Text>
                </View>

                <View style={{ ...styles.width35p, }}>
                  <Text allowFontScaling={false} style={{ ...styles.txt, color: themecolor.TXTGREYS }}>
                    {dateSet != ''? dateSet : ''}
                  </Text>
                </View>
              </View>

              <View style={{ ...styles.flexDirView1, padding: 3 }}>
                <Text allowFontScaling={false} style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>
                  Paid by {data.payment_type == "cash_on_delivery" ? "Cash on delivery" : shippingAddress.payment_type}
                </Text>
              </View>

              <View style={{ ...styles.mgT10 }} />

              <View style={{ ...styles.mgT10 }} />

              <View style={{ ...styles.borderLine, borderColor: themecolor.BOXBORDERCOLOR1, }} />

              <View style={{ ...styles.mgT10 }} />

              <View style={{ ...styles.flexDirView1, }}>
                <TouchableOpacity activeOpacity={0.5} style={{ ...styles.width65p, }}>
                  <Text allowFontScaling={false} style={{ ...styles.txt, color: themecolor.BACKICON }}>
                    Delivery Address
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} style={{ ...styles.width35p, }}>
                  <Text allowFontScaling={false} style={{ ...styles.txt, color: themecolor.BACKICON }}>
                    Order Details
                  </Text>
                </TouchableOpacity>

              </View>


            </View>

            <View style={{ ...styles.mgT10 }} />

            <OrderDetailProductDataList data={productDetailData} />

            <View style={{ ...styles.mgT10 }} />

            <OrderDetailsComp detailData={data} />

            <View style={{ ...styles.mgT10 }} />

            <View
              style={{
                ...styles.datalistView1,
                backgroundColor: themecolor.BOXBORDERCOLOR,
                borderColor: themecolor.BOXBORDERCOLOR1,
              }}>

              <View style={{ ...styles.innerView }}>
                <Text
                  allowFontScaling={false}
                  style={{ ...styles.txtBig, color: themecolor.TXTWHITE }}>
                  Deliver to
                </Text>
              </View>

              <View style={{ ...styles.marTop }} />

              <View style={{ ...styles.innerView }}>
                <Text
                  allowFontScaling={false}
                  style={{ ...styles.txt, color: themecolor.TXTGREYS }}>
                  {shippingAddress.firstname} {shippingAddress.lastname}
                </Text>
              </View>

              <View style={{ ...styles.innerView }}>
                <Text
                  allowFontScaling={false}
                  style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>
                  {shippingAddress.address}, {shippingAddress.city} , {shippingAddress.state} , {shippingAddress.postal_code}
                </Text>

              </View>

              <View style={{ ...styles.marTop }} />

              <View style={{ ...styles.innerView }}>
                <Text
                  allowFontScaling={false}
                  style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>
                  Mobile No :
                  <Text
                    allowFontScaling={false}
                    style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>
                    {' '}
                    +91-{shippingAddress.phone}
                  </Text>
                </Text>
              </View>
              
              <View style={{ ...styles.marTop }} />
              
            </View>



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
                  title="Cancel Order"
                  icon={" "}
                  // onPress={() => navigation.navigate("Dashboard")}
                  backgroundColor={'transparent'}
                  color={themecolor.TEXTRED}
                  borderColor={themecolor.TEXTRED}
                />
              </View>
            </View>
          </View>

        </>

      )}

    </View>
  );
}
