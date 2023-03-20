import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  ScrollView,
  BackHandler,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useToast } from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import { getBrands } from '../../repository/DashboardRepository/AllDashboardRep';
import { styles } from '../../assets/css/BrandCss/BrandsStyle';
import { useFocusEffect } from '@react-navigation/native';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { BrandDataList } from '../../components/shared/FlateLists/DashboardFlatList/BrandFlatList';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';

const { width, height } = Dimensions.get('screen');

export default function Brands(props) {
  const toast = useToast();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [loader, setLoader] = useState(true);
  const [brandsData, setBrandsData] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleBrands = async (value) => {
    try {
      var body = new FormData()
      body.append('limit', "15")
      if (value == undefined) {
        body.append('offset', 1)
      }
      else { body.append('offset', value) }
      var res = await getBrands(body);
      if (brandsData == [] || brandsData == null) { setBrandsData(res.data); }
      else {
        setIsLoading(true)
        var temp = res.data
        var temp1 = brandsData.concat(temp)
        setBrandsData(temp1);
      }
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

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // setLoader(true);
  //     handleBrands();
  //   }, [props]),
  // );

  useEffect(() => {
    handleBrands();
  }, [])


  return (
    <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>

      <Header title="Brands" />

      {loader ? (
        <LoadingFullScreen style={{ flex: 1 }} />
      ) : (
        <><View
          style={{
            ...styles.container,
          }}>
          {brandsData.length > 0 ? (
            <BrandDataList
              data={brandsData}
              numColumns={3}
              horizontal={false}
              handleBrands={(value) => handleBrands(value)}
              isLoading={isLoading}
            />
          ) : (
            <NoDataMsg title="No Brands Found! " />
          )}
          <View style={{ marginVertical: 45 }} />
        </View>
        </>
      )}
    </View>
  );
}
