import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, Appearance, Dimensions,ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {CategoryDataList} from '../../components/shared/FlateLists/CategoryFlatList/CategoryDataList';
import {CategoryStyle} from '../../assets/css/CategoryStyle';
import {getCategories} from '../../repository/CategoryRepository/AllProductCategoryRep';
import { useToast } from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';

const {width, height} = Dimensions.get('screen');

export default function Categories(props) {
  const toast = useToast();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [data, setData] = useState([]);

  useEffect(async () => {
    try {
      var res = await getCategories();
      console.log('data....getCategories...-->', res.data);
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
    <View style={{...CategoryStyle.bg, backgroundColor: themecolor.THEMECOLOR,}}>
      <Header title="Categories" />
        <View
          style={{
            ...CategoryStyle.container,
          }}>
          
          {data.length > 0 ?
            <CategoryDataList data={data} />
            :
            <View style={{alignItems:"center",flex:1,justifyContent:"center"}}>
            <Text>No data found!</Text>
            </View>
            }    
            <View  style={{marginVertical:45}}/>
        </View>     
        
    </View>
  );
}
