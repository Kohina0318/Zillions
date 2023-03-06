import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  TextInput,
  BackHandler, ScrollView
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { styles } from '../../assets/css/OrderProcessStyle/CartStyle';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import { useToast } from 'react-native-toast-notifications';
import { CartProductDataList } from '../../components/shared/FlateLists/OrderProcessFlateList/CartProductDataList';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import OrderDeailsComp from '../../components/shared/OrderProcessComponents/OrderDeailsComp';
import { Stepper } from '../Stepper/Stepper';

const { width, height } = Dimensions.get('screen');

const data = [
  { id: 1 },
  { id: 2 }
]

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
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [loader, setLoader] = useState(false);

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
        <ScrollView >

          <View style={{ ...styles.MVT }} />

          <View>
            <Stepper item={"Cart"} themecolor={themecolor} props={props} />
          </View>

          <CartProductDataList data={data} />

          <View style={{ ...styles.MVT }} />

          <OrderDeailsComp />

          <View style={{ ...styles.MVT }} />

        </ScrollView>
      )}


      <View style={{ marginVertical: 30 }} />

      <View
        style={{
          ...styles.touchview,
          borderTopColor: themecolor.BOXBORDERCOLOR1,
          backgroundColor: themecolor.LOGINTHEMECOLOR,
        }}>
        <View style={{ ...styles.mainView }}>
          <View style={{ width: '40%', justifyContent: "center", alignItems: "center", }}>
            <Text style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>Total: </Text>
            <Text style={{ ...styles.txt1, color: themecolor.TXTWHITE }}><FAIcon name="rupee" size={12} /> 10000</Text>
          </View>

          <View style={{ width: '60%', }}>
            <HalfSizeButton
              title="Proceed to Payment"
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
