import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {useToast} from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import {getBrands} from '../../repository/DashboardRepository/AllDashboardRep';
import {styles} from '../../assets/css/BrandsStyle';
import { BrandInDataList } from '../../components/shared/FlateLists/DashboardFlatList/BrandFlatList';

const {width, height} = Dimensions.get('screen');

export default function Brands(props) {
  const toast = useToast();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [brandsData, setBrandsData] = useState([]);

  const handleBrands = async () => {
    try {
      var res = await getBrands();
      console.log('handleBrands......in dashboard page', res.data);
      setBrandsData(res.data);
    } catch (e) {
      console.log('errrror in..handleBrands page-->', e);
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
    handleBrands();
  }, []);

  return (
    <View style={{...styles.bg, backgroundColor: themecolor.THEMECOLOR}}>
      <Header title="Brands" backIcon={true} />
      <View
        style={{
          ...styles.container,
        }}>

         {brandsData.length > 0 ?
            <BrandInDataList data={brandsData} />
            :
            <View style={{alignItems:"center",flex:1,justifyContent:"center"}}>
            <Text>No data found!</Text>
            </View>
            }    
            <View  style={{marginVertical:20}}/>
      </View>
    </View>
  );
}
