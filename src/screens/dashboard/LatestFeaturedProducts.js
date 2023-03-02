import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, Appearance, Dimensions,BackHandler} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {ProductStyle} from '../../assets/css/ProductStyle';
import {ProductDataList} from '../../components/shared/FlateLists/CategoryFlatList/ProductDataList';
import {ScrollView} from 'react-native-gesture-handler';
import {useToast} from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import { getProductList } from '../../repository/DashboardRepository/AllDashboardRep';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';

const {width, height} = Dimensions.get('screen');

export default function LatestFeaturedProducts(props) {

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
  const [latestProductsData, setLatestProductsData] = useState([]);
  
  const handleLatestProducts = async () => {
    try {
      var res = await getProductList('featured','20');
      setLatestProductsData(res.data);
      setLoader(false);
    } catch (e) {
      console.log('errrror in..handleLatestProducts page LatestFeaturedProducts-->', e);
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
    handleLatestProducts()
  },[])

  return (
    <View style={{...ProductStyle.bg, backgroundColor: themecolor.THEMECOLOR}}>
      <Header title="Latest Featured Products" backIcon={true} onPressBack={() => handleBackButtonClick()}/>
      {loader ? (
        <LoadingFullScreen style={{flex: 1}} />
      ) : (
      <View
        style={{
          ...ProductStyle.container,
        }}>
        {latestProductsData.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <ProductDataList data={latestProductsData} />
          </ScrollView>
        ) : (
          <NoDataMsg  title="No Product Found! "/>
        )}
        <View style={{marginVertical: 40}} />
      </View>
      )}
    </View>
  );
}
