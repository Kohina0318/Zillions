import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  TextInput,
  BackHandler,
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
import { Stepper } from '../Stepper/Stepper';

const { width, height } = Dimensions.get('screen');

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
        <View style={{ ...styles.container }}> 
        <View>
        <Stepper item={"Payment"} themecolor={themecolor} props={props}/>
        </View>
          
        </View>
      )}

      <View
        style={{
          ...styles.touchview,
          borderTopColor: themecolor.BOXBORDERCOLOR1,
          backgroundColor: themecolor.LOGINTHEMECOLOR,
        }}>
        <View style={{ ...styles.mainView }}>
          <View style={{ width: '40%', justifyContent:"center",alignItems:"center", }}>
           <Text style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>Total: </Text>
           <Text style={{ ...styles.txt1, color: themecolor.TXTWHITE }}><FAIcon name="rupee" size={12} /> 10000</Text>
          </View>

          <View style={{ width: '60%' ,}}>
            <HalfSizeButton
              title="Proceed to Payment"
              icon=""
              backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
              color={'#fff'}
              borderColor={themecolor.BORDERCOLOR}
            />
          </View>
        </View>
      </View>

    </View>
  );
}
