import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, Appearance, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {ProductStyle} from '../../assets/css/ProductStyle';
import {ProductDataList} from '../../components/shared/FlateLists/ProductDataList';
import {ScrollView} from 'react-native-gesture-handler';
import {getSubCategoryByProduct} from '../../repository/CategoryRepository/AllProductCategoryRep';
import {useToast} from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';

const {width, height} = Dimensions.get('screen');

export default function Products(props) {
  const toast = useToast();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [data, setData] = useState([]);

  useEffect(async () => {
    try {
      var res = await getSubCategoryByProduct(props.route.params.subCategoryId);
      console.log(
        'data getSubCategoryByProduct api in.....product page-->',
        res.data,
      );
      setData(res.data);
    } catch (e) {
      console.log('errrror in..getSubCategoryByProduct page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  }, []);

  return (
    <View style={{...ProductStyle.bg, backgroundColor: themecolor.THEMECOLOR}}>
      <Header title={props.route.params.subCategoryName} backIcon={true} />

      <View
        style={{
          ...ProductStyle.container,
        }}>
        {data.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <ProductDataList data={data} />
          </ScrollView>
        ) : (
          <View
            style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <Text>No data found!</Text>
          </View>
        )}
        <View style={{marginVertical: 20}} />
      </View>
    </View>
  );
}
