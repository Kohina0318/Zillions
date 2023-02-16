import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, Appearance, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {ProductStyle} from '../../assets/css/ProductStyle';
import {ProductDataList} from '../../components/shared/FlateLists/ProductDataList';
import {ScrollView} from 'react-native-gesture-handler';
import {getCategoryByProduct} from '../../repository/CategoryRepository/AllProductCategoryRep';
import {useToast} from 'react-native-toast-notifications';

const {width, height} = Dimensions.get('screen');

export default function Products(props) {
  const toast = useToast();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [data, setData] = useState([]);

  useEffect(async () => {
    try {
      var res = await getCategoryByProduct(props.route.params.subCategoryId);
      console.log(
        'data getCategoryByProduct api in.....product page-->',
        res.data,
      );
      setData(res.data);
    } catch (e) {
      console.log('errrror in..categories page-->', e);
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
      <View
        style={{
          ...ProductStyle.container,
        }}>
        <View style={{marginTop: 10}}>
          {data.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <ProductDataList data={data} />
              <View style={{marginVertical: 20}} />
            </ScrollView>
          ) : (
            <View
              style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
              <Text>No data found!</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
