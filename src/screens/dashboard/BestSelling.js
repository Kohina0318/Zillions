import React, { useEffect, useState } from 'react';
import { View, BackHandler } from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { ProductStyle } from '../../assets/css/CategoryCss/ProductStyle'
import { ProductDataList } from '../../components/shared/FlateLists/CategoryFlatList/ProductDataList';
import { useToast } from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import { getProductList } from '../../repository/DashboardRepository/AllDashboardRep';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';

export default function BestSelling(props) {

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
  const [bestSellingData, setBestSellingData] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [getOffset, setOffset] = React.useState(0);


  const handleBestSelling = async () => {
    try {

      var body = new FormData()
      body.append('limit', "10")
      body.append('offset', getOffset)

      var res = await getProductList('deal', '10', body);
      if (res.status === true) {
        if (res.data.length > 0) {
          setIsLoading(true)
          setOffset(getOffset + 10)
          var temp1 = bestSellingData.concat(res.data)
          setBestSellingData(temp1);
        } else {
          setIsLoading(false)
        }
        setLoader(false);
      }
      else {
        setLoader(false)
      }
    } catch (e) {
      console.log('errrror in..handleBestSelling page BestSelling-->', e);
      setLoader(false);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  useEffect(() => {
    handleBestSelling()
  }, [])

  return (
    <View style={{ ...ProductStyle.bg, backgroundColor: themecolor.THEMECOLOR }}>
      <Header title="Best Selling" backIcon={true} onPressBack={() => handleBackButtonClick()} />
      {loader ? (
        <LoadingFullScreen style={{ flex: 1 }} />
      ) : (
        <View
          style={{
            ...ProductStyle.container,
          }}>
          {bestSellingData.length > 0 ? (
            <ProductDataList data={bestSellingData} handleByProduct={handleBestSelling} isLoading={isLoading} />
          ) : (
            <NoDataMsg title="No Product Found! " />
          )}
          <View style={{ marginVertical: 30 }} />
        </View>
      )}
    </View>
  );
}
