import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  TextInput,
  BackHandler,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/shared/header/Header';
import {styles} from '../../assets/css/OrderStyle';
import {getOrderView} from '../../repository/OrderRepository/OrderRepo';
import { useToast } from 'react-native-toast-notifications';

const {width, height} = Dimensions.get('screen');

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
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [loader, setLoader] = useState(true);
  const [data, setData]= useState([])

  const handleOrderView = async () => {
    try {
      var res = await getOrderView(props.route.params.SaleId);
      console.log("guyyyyyyyyyyo",res)
      if (res.status === true) {
        setData(res.data);
        setLoader(false);
      } 
      else {
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
      console.log('errrror in..handleWishlist page wishlist-->', e);
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
    <View style={{...styles.bg, backgroundColor: themecolor.THEMECOLOR}}>
      <Header
        title={`Order: #${props.route.params.saleCode}`}
        backIcon={true}
        onPressBack={() => handleBackButtonClick()}
      />

      <View style={{...styles.container}}>
        <Text allowFontScaling={false}>OrderDetails</Text>

        <View style={{marginVertical: 20}} />
      </View>
    </View>
  );
}
