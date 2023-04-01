import React, { useEffect, useState } from 'react';
import {
  View,
  BackHandler
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { CategoryStyle } from '../../assets/css/CategoryCss/CategoryStyle'
import { getSubCategories } from '../../repository/CategoryRepository/AllProductCategoryRep';
import { useToast } from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import { SubCategoryDataList } from '../../components/shared/FlateLists/CategoryFlatList/SubCategoryDataList';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';

export default function SubCategories(props) {

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
  const [isLoading, setIsLoading] = React.useState(false);

  const [getOffset, setOffset] = React.useState(0);

  const handleSubCategories = async () => {
    try {
      var body = new FormData()
      body.append('limit', "10")
      body.append('offset', getOffset)

      var res = await getSubCategories(props.route.params.categoryId, body);
      
      if (res.status === true) {
        if (res.data.length > 0) {
          setIsLoading(true)
          setOffset(getOffset + 10)
          var temp1 = data.concat(res.data)
          setData(temp1);
        } else {
          setIsLoading(false)
        }
        setLoader(false);
      }
      else{
        setLoader(false)
      }
    } catch (e) {
      console.log('errrror in..getSubCategories page-->', e);
      setLoader(false)
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  }

  useEffect(() => {
    handleSubCategories()
  }, []);

  return (
    <View style={{ ...CategoryStyle.bg, backgroundColor: themecolor.THEMECOLOR }}>
      <Header title={props.route.params.categoryName} backIcon={true} onPressBack={() => handleBackButtonClick()} />
      {loader ? (
        <LoadingFullScreen style={{ flex: 1 }} />
      ) : (
        <View
          style={{
            ...CategoryStyle.container,
          }}>
          {data.length > 0 ? (
            <>
              <SubCategoryDataList data={data} handleSubCategories={handleSubCategories} isLoading={isLoading} />
              <View style={{ marginVertical: 30 }} /></>
          ) : (
            <NoDataMsg title="No Subcategory Found! " />
          )}
        </View>
      )}
    </View>
  );
}
