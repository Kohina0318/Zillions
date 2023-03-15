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
import {styles} from '../../assets/css/OrderCss/OrderStyle';
import {OrderDataList} from '../../components/shared/FlateLists/OrderFlateList/OrderDataList';
import Search from '../../components/shared/search/Search';
import {getOrderlist} from '../../repository/OrderRepository/OrderRepo';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';
import { useToast } from 'react-native-toast-notifications';

const {width, height} = Dimensions.get('screen');

export default function Order(props) {
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
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);

  const handleOrderlist = async () => {
    try {
      var res = await getOrderlist();
      console.log("handleOrderlist....>>",res.data)
      if (res.status === true) {
        setData(res.data);
        setDataFilter(res.data);
        setLoader(false);
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
      console.log('errrror in..handleOrderlist page wishlist-->', e);
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
    handleOrderlist();
  }, []);

  const filtering = async search => {
    var temp = dataFilter.filter(item => {
      return (
        item.sale_code.toLowerCase().includes(search.toLowerCase()) ||
        item.sale_code.toLowerCase().includes(search.toLowerCase())
      );
    });
    setData(temp);
  };

  return (
    <View style={{...styles.bg, backgroundColor: themecolor.THEMECOLOR}}>
      <RegisterLoginHeader
        title="Order"
        backIcon={true}
        onPressBack={() => handleBackButtonClick()}
      />
      {loader ? (
        <LoadingFullScreen style={{flex: 1}} />
      ) : (
        <View style={{...styles.container}}>
          <Search title={'Search by sale code..'} filtering={filtering} />

          <View style={{marginTop: 5}} />
          {data.length > 0 ? (
            <OrderDataList data={data} />
          ) : (
            <NoDataMsg title="No Order Found! " />
          )}
          <View style={{marginVertical: 45}} />
        </View>
      )}
    </View>
  );
}
