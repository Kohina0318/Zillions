import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  ScrollView,
  BackHandler,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {useToast} from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import {getBrands} from '../../repository/DashboardRepository/AllDashboardRep';
import {styles} from '../../assets/css/BrandsStyle';
import {useFocusEffect} from '@react-navigation/native';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import {BrandDataList} from '../../components/shared/FlateLists/DashboardFlatList/BrandFlatList';

const {width, height} = Dimensions.get('screen');

export default function Brands(props) {
  const toast = useToast();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [loader, setLoader] = useState(true);
  const [brandsData, setBrandsData] = useState([]);

  const handleBrands = async () => {
    try {
      var res = await getBrands();
      console.log('handleBrands......in dashboard page', res.data);
      setBrandsData(res.data);
      setLoader(false);
    } catch (e) {
      console.log('errrror in..handleBrands page-->', e);
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

  useFocusEffect(
    React.useCallback(() => {
      handleBrands();
    }, [props]),
  );

  return (
    <View style={{...styles.bg, backgroundColor: themecolor.THEMECOLOR}}>
      {loader ? (
        <LoadingFullScreen style={{flex: 1}} />
      ) : (
        <>
          <Header title="Brands" />
          <View
            style={{
              ...styles.container,
            }}>
            {brandsData.length > 0 ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                <BrandDataList
                  data={brandsData}
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: width * 0.94,
                  }}
                />
              </ScrollView>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Text>No data found!</Text>
              </View>
            )}
            <View style={{marginVertical: 45}} />
          </View>
        </>
      )}
    </View>
  );
}
