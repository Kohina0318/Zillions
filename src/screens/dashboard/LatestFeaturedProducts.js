import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, Appearance, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {ProductStyle} from '../../assets/css/ProductStyle';
import {ProductDataList} from '../../components/shared/FlateLists/CategoryFlatList/ProductDataList';
import {ScrollView} from 'react-native-gesture-handler';
import {useToast} from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import { getProductList } from '../../repository/DashboardRepository/AllDashboardRep';

const {width, height} = Dimensions.get('screen');

export default function LatestFeaturedProducts(props) {

  const toast = useToast();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [latestProductsData, setLatestProductsData] = useState([]);
  
  const handleLatestProducts = async () => {
    try {
      var res = await getProductList('latest');
      console.log('handleLatestProducts......in LatestFeaturedProducts page', res.data);
      setLatestProductsData(res.data);
    } catch (e) {
      console.log('errrror in..handleLatestProducts page LatestFeaturedProducts-->', e);
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
      <Header title="Latest Featured Products" backIcon={true} />

      <View
        style={{
          ...ProductStyle.container,
        }}>
        {latestProductsData.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <ProductDataList data={latestProductsData} />
          </ScrollView>
        ) : (
          <View
            style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <Text>No data found!</Text>
          </View>
        )}
        <View style={{marginVertical: 40}} />
      </View>
    </View>
  );
}
