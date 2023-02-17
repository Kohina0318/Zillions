import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, Appearance, Dimensions,ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import {styles} from '../../assets/css/DashboardStyle';
import {getBrands, getMainSlider} from '../../repository/DashboardRepository/AllDashboardRep';
import { useToast } from 'react-native-toast-notifications';
import { getCategories } from '../../repository/CategoryRepository/AllProductCategoryRep';
import CarouselFile from '../../components/shared/Carousel/CarouselFile';
const { width, height } = Dimensions.get('screen');

const data=[
  {
    title:"Hello",
    body:"bhxabcbdnndvndvmvnm",
    image:'https://www.zillionsbuyer.com/uploads/product_image/product_821_1_thumb.jpg'

  },
  {
    title:"hiii",
    body:"bhxabcbdnndvndvmvnm",
    image:'https://www.zillionsbuyer.com/uploads/product_image/product_821_1_thumb.jpg'
  },
  {
    title:"Hyyyyy",
    body:"bhxabcbdnndvndvmvnm",
    image:'https://www.zillionsbuyer.com/uploads/product_image/product_821_1_thumb.jpg'
  },
  
]

export default function Dashboard(props) { 
  const toast = useToast()
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const handleCategories = async () => {
    try {
      var res = getCategories();
      console.log('handleCategories......in dashboard page', res);
    } 
    catch (e) {
      console.log('errrror in..handleCategories page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };
  const handleCarousel = async () => {
    try {
      var res = getMainSlider();
      console.log('handleCarousel......in dashboard page', res);
    } 
    catch (e) {
      console.log('errrror in..handleCarousel page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };
  const handleBrands = async () => {
    try {
      var res = getBrands()
      console.log('handleBrands......in dashboard page', res);
    } 
    catch (e) {
      console.log('errrror in..handleBrands page-->', e);
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
    handleCategories()
    handleCarousel();
    handleBrands()
  }, []);

  return (
    <View style={{...styles.bg, backgroundColor: themecolor.THEMECOLOR}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Header title="Home" />
      <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{...styles.container,backgroundColor:themecolor.LOGINTHEMECOLOR1}}>
          <CarouselFile data={data}/>
      </View>
      <View style={{...styles.container,backgroundColor:themecolor.LOGINTHEMECOLOR1}} >

      </View>
      </ScrollView>
    </View>
  );
}
