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

  const [getOffset, setOffset] = React.useState(0);


  const handleBrands = async () => {
    try {
      var body = new FormData()
      body.append('limit', "15")
      body.append('offset', getOffset)

      var res = await getBrands(body);

      if (res.status === true) {
        if (res.data.length > 0) {
          setIsLoading(true)
          setOffset(getOffset + 15)
          var temp1 = brandsData.concat(res.data)
          setBrandsData(temp1);
        } else {
          setIsLoading(false)
        }
        setLoader(false);
      }
      else{
        setLoader(false)
      }
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
              handleBrands={handleBrands}
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
