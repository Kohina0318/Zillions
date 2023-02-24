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
const {width, height} = Dimensions.get('screen');

export default function RecentlyViewed(props) {

  const toast = useToast();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [recentlyViewedData, setRecentlyViewedData] = useState([]);

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

  const handleRecentlyViewed = async () => {
    try {
      var res = await getProductList('recently_viewed','20');
      console.log('handleRecentlyViewed......in RecentlyViewed page', res.data);
      setRecentlyViewedData(res.data);
    } catch (e) {
      console.log('errrror in..handleRecentlyViewed page RecentlyViewed-->', e);
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
    handleRecentlyViewed()
  },[])

  return (
    <View style={{...ProductStyle.bg, backgroundColor: themecolor.THEMECOLOR}}>
      <Header title="Recently Viewed" backIcon={true} onPressBack={() => handleBackButtonClick()}/>

      <View
        style={{
          ...ProductStyle.container,
        }}>
        {recentlyViewedData.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <ProductDataList data={recentlyViewedData} />
          </ScrollView>
        ) : (
          <View
            style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <Text>No data found!</Text>
          </View>
        )}
        <View style={{marginVertical:40}} />
      </View>
    </View>
  );
}
