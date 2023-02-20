import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import {styles} from '../../assets/css/DashboardStyle';
import {
  getBrands,
  getMainSlider,
  getProductList,
} from '../../repository/DashboardRepository/AllDashboardRep';
import {useToast} from 'react-native-toast-notifications';
import {getCategories} from '../../repository/CategoryRepository/AllProductCategoryRep';
import CarouselFile from '../../components/shared/Carousel/CarouselFile';
import {Avatar} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {DashboardCategoryDataList} from '../../components/shared/FlateLists/DashboardFlatList/DashboardCategoryFlatList';
import DashboardHeading from '../../components/shared/DashboardHeading/DashboardHeading';
import {BrandDataList} from '../../components/shared/FlateLists/DashboardFlatList/BrandFlatList';
import {DashboardProductDataList} from '../../components/shared/FlateLists/DashboardFlatList/DashboardProductDataList';
const {width, height} = Dimensions.get('screen');

export default function Dashboard(props) {
  const toast = useToast();
  const navigation = useNavigation();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [carouselData, setCarouselData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [latestProductsData, setLatestProductsData] = useState([]);
  const [bestSellingData, setBestSellingData] = useState([]);
  const [recentlyViewedData, setRecentlyViewedData] = useState([]);
  const [mostViewedData, setMostViewedData] = useState([]);

  const handleCategories = async () => {
    try {
      var res = await getCategories();
      console.log('handleCategories......in dashboard page', res);
      setCategories(res.data);
    } catch (e) {
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
      var res = await getMainSlider();
      console.log('handleCarousel......in dashboard page', res.data);
      setCarouselData(res.data);
    } catch (e) {
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
      var res = await getBrands();
      console.log('handleBrands......in dashboard page', res.data);
      setBrands(res.data);
    } catch (e) {
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

  const handleLatestProducts = async () => {
    try {
      var res = await getProductList('latest');
      console.log('handleLatestProducts......in dashboard page', res.data);
      setLatestProductsData(res.data);
    } catch (e) {
      console.log('errrror in..handleLatestProducts page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const handleBestSelling = async () => {
    try {
      var res = await getProductList('latest');
      console.log('handleBestSelling......in dashboard page', res.data);
      setBestSellingData(res.data);
    } catch (e) {
      console.log('errrror in..handleBestSelling page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const handleRecentlyViewed = async () => {
    try {
      var res = await getProductList('recently_viewed');
      console.log('handleRecentlyViewed......in dashboard page', res.data);
      setRecentlyViewedData(res.data);
    } catch (e) {
      console.log('errrror in..handleRecentlyViewed page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const handleMostViewed = async () => {
    try {
      var res = await getProductList('most_viewed');
      console.log('handleMostViewed......in dashboard page', res.data);
      setMostViewedData(res.data);
    } catch (e) {
      console.log('errrror in..handleMostViewed page-->', e);
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
    handleCarousel();
    handleBrands();
    handleLatestProducts();
    handleBestSelling();
    handleRecentlyViewed();
    handleMostViewed();
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
        <View style={{marginVertical: 5}} />

        <View style={{...styles.ViewHeading}}>
          <DashboardHeading
            title="Categories"
            onPress={() => navigation.navigate('Categories')}
          />
          <View style={{width: width, height: height * 0.13}}>
            <DashboardCategoryDataList data={categories} />
          </View>
        </View>

        <View
          style={{
            ...styles.container,
            backgroundColor: themecolor.LOGINTHEMECOLOR1,
          }}>
          <CarouselFile data={carouselData} />
        </View>

        <View style={{marginVertical: 9}} />

        <View style={{...styles.ViewHeading}}>
          <DashboardHeading
            title="Brands"
            onPress={() => navigation.navigate('Brands')}
          />
          <View style={{width: width, height: height * 0.2}}>
            <BrandDataList data={brands} />
          </View>
        </View>

        <View style={{marginVertical: 9}} />

        <View style={{...styles.ViewHeading}}>
          <DashboardHeading
            title="Latest Featured Products"
            onPress={() => navigation.navigate('LatestFeaturedProducts')}
          />
          <DashboardProductDataList data={latestProductsData} />
        </View>

        <View style={{marginVertical: 9}} />

        <View style={{...styles.ViewHeading}}>
          <DashboardHeading
            title="Best Selling"
            onPress={() => navigation.navigate('BestSelling')}
          />
          <DashboardProductDataList data={bestSellingData} />
        </View>

        <View style={{marginVertical: 9}} />

        <View style={{...styles.ViewHeading}}>
          <DashboardHeading
            title="Recently Viewed"
            onPress={() => navigation.navigate('RecentlyViewed')}
          />
          <DashboardProductDataList data={recentlyViewedData} />
        </View>

        <View style={{marginVertical: 9}} />

        <View style={{...styles.ViewHeading}}>
          <DashboardHeading
            title="Most Viewed"
            onPress={() => navigation.navigate('MostViewed')}
          />
          <DashboardProductDataList data={mostViewedData} />
        </View>
      </ScrollView>
    </View>
  );
}
