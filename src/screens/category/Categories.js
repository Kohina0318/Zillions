import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { CategoryDataList } from '../../components/shared/FlateLists/CategoryFlatList/CategoryDataList';
import { CategoryStyle } from '../../assets/css/CategoryCss/CategoryStyle'
import { getCategories } from '../../repository/CategoryRepository/AllProductCategoryRep';
import { useToast } from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RequestForNewCategoryModel from '../../components/shared/Model/RequestForNewCategoryModel';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';


const { width, height } = Dimensions.get('screen');

export default function Categories(props) {
  const toast = useToast();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleCategories = async () => {
    try {
      var res = await getCategories();
      setData(res.data);
      setLoader(false);
    } catch (e) {
      console.log('errrror in..categories page-->', e);
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
  handleCategories();
}, [])



  return (
    <View style={{ ...CategoryStyle.bg, backgroundColor: themecolor.THEMECOLOR }}>

      <Header title="Categories" />

      {loader ? (
        <LoadingFullScreen style={{ flex: 1 }} />
      ) : (
        <>
          <View
            style={{
              ...CategoryStyle.container,
            }}>

            {data.length > 0 ? (
              <CategoryDataList data={data} />
            ) : (
              <NoDataMsg title="No Category Found! " />
            )}

           

            <View style={{ ...CategoryStyle.innerViewMain, backgroundColor: themecolor.ADDTOCARTBUTTONCOLOR }} >
              <View style={{ width: '100%' }}>
                <HalfSizeButton
                  title="Request for New Category"
                  icon=""
                  backgroundColor={'transparent'}
                  color="#fff"
                  borderColor={'transparent'}
                  fontSize={13}
                  height={width * 0.08}
                  onPress={() => setShowModal(true)}
                />
              </View>
            </View>

            <View style={{ marginVertical: 50 }} />
          </View>

          {showModal && (
            <RequestForNewCategoryModel
              setShowModal={setShowModal}
            />
          )}
        </>
      )}
    </View>
  );
}
