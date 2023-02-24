import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  ScrollView,
  BackHandler
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {CategoryStyle} from '../../assets/css/CategoryStyle';
import {getSubCategories} from '../../repository/CategoryRepository/AllProductCategoryRep';
import {useToast} from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import {SubCategoryDataList} from '../../components/shared/FlateLists/CategoryFlatList/SubCategoryDataList';

const {width, height} = Dimensions.get('screen');

export default function SubCategories(props) {
  const toast = useToast();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [data, setData] = useState([]);

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

  const handleSubCategories= async() => {
    try {
      var res = await getSubCategories(props.route.params.categoryId);
      setData(res.data);
    } catch (e) {
      console.log('errrror in..getSubCategories page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  }

  useEffect(() => {
    handleSubCategories()
  }, []);

  return (
    <View style={{...CategoryStyle.bg, backgroundColor: themecolor.THEMECOLOR}}>
      <Header title={props.route.params.categoryName} backIcon={true}  onPressBack={() => handleBackButtonClick()}/>

      <View
        style={{
          ...CategoryStyle.container,
        }}>
        {data.length > 0 ? (
          <SubCategoryDataList data={data} />
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
