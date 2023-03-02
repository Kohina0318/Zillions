import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  BackHandler,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {ProductStyle} from '../../assets/css/ProductStyle';
import {ProductDataList} from '../../components/shared/FlateLists/CategoryFlatList/ProductDataList';
import {ScrollView} from 'react-native-gesture-handler';
import {getByProduct} from '../../repository/CategoryRepository/AllProductCategoryRep';
import {useToast} from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';

const {width, height} = Dimensions.get('screen');

export default function Products(props) {
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

  const handleByProduct = async () => {
    try {
      var res = await getByProduct(props.route.params.speciality,props.route.params.Id);
      setData(res.data);
      setLoader(false);
    } catch (e) {
      console.log('errrror in..handleByProduct page-->', e);
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
    handleByProduct();
  }, []);

  return (
    <View style={{...ProductStyle.bg, backgroundColor: themecolor.THEMECOLOR}}>
      <Header
        title={props.route.params.Name}
        backIcon={true}
        onPressBack={() => handleBackButtonClick()}
      />
      {loader ? (
        <LoadingFullScreen style={{flex: 1}} />
      ) : (
        <View
          style={{
            ...ProductStyle.container,
          }}>
          {data.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <ProductDataList data={data} />
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
