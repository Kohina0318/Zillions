import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  BackHandler, ScrollView,
  TouchableOpacity, Image
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { styles } from '../../assets/css/CartCss/CartStyle';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import { useToast } from 'react-native-toast-notifications';
import { CartProductDataList } from '../../components/shared/FlateLists/OrderProcessFlateList/CartProductDataList';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import OrderDetailsComp from '../../components/shared/OrderProcessComponents/Cart/OrderDetailsComp';
import { Stepper } from '../Stepper/Stepper';
import { getCartOrderDetails, getCartProductList } from '../../repository/OrderProcessRepository/CartListRepo';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import EmptyCart from '../../components/shared/NoData/EmptyCart';
import { getRemoveAllProducts } from '../../repository/OrderProcessRepository/RemoveProductRepo';
import CartViewDetailsButton from '../../components/shared/button/CartViewDetailsButton';

const { width, height } = Dimensions.get('screen');


export default function Cart(props) {
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
  const [refresh, setRefresh] = useState(false);

  const [detailData, setDetailData] = useState("");
  const [cartProduct, setCartProduct] = useState([]);

  const handleCartOrderDetails = async () => {
    try {
      var res = await getCartOrderDetails()
      if (res.status == true) {
        setDetailData(res.data)
      } else {
        console.log('Status False in..handleCartOrderDetails page Cart-->');     
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

  const handleCartProductList = async () => {
    try {
      var res = await getCartProductList()
      if (res.status == true) {
        setCartProduct(Object.values(res.data.carted))
        setLoader(false)
      } else {
        setLoader(false)
        setCartProduct([])
      }
    } catch (e) {
      setLoader(false)
      setCartProduct([])
      console.log('errrror in..handleCartProductList page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  }

  useEffect(() => {
    handleCartOrderDetails()
    handleCartProductList()
  }, [refresh])


  const handleRemoveAllProducts = async () => {
    try {
      var res = await getRemoveAllProducts()
      if (res.status == true) {
        setRefresh(!refresh)
        toast.show(res.msg, {
          type: 'success',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else {
        toast.show(res.msg, {
          type: 'warning',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (e) {
      console.log('errrror in..handleRemoveAllProducts page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  }


  return (
    <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>
      <RegisterLoginHeader
        title="Cart"
        backIcon={true}
        onPressBack={() => handleBackButtonClick()}
      />
      {loader ? (
        <LoadingFullScreen style={{ flex: 1 }} />
      ) : (
        cartProduct.length > 0 ?
          <>
            <ScrollView showsVerticalScrollIndicator={false}>

              <View style={{ ...styles.mv5 }} />

              <View>
                <Stepper item={"Cart"} themecolor={themecolor} props={props} />
              </View>

              <View style={{ ...styles.MVT }} />

              <TouchableOpacity activeOpacity={0.5} style={{ ...styles.RemoveAllButton }} onPress={() => handleRemoveAllProducts()}>
                <Text style={{ ...styles.removeButton, color: themecolor.TEXTRED }}>Remove All</Text>
              </TouchableOpacity>
              <CartProductDataList data={cartProduct} refresh={refresh} setRefresh={setRefresh} />

              <View style={{ ...styles.mv5 }} />

              <OrderDetailsComp detailData={detailData} />

              <View style={{ ...styles.mv5 }} />

            </ScrollView>
            <View style={{ marginVertical: 31 }} />

            <CartViewDetailsButton amount={detailData.grand_total} buttonTitle={"Continue"} buttonOnPress={()=>props.navigation.navigate('CartAddress')} />
          </>
          :
          <View style={{ ...styles.container, marginTop: 120, }}>
            <EmptyCart />
          </View>

      )}

    </View>
  );
}
