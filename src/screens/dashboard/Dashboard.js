import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import {styles} from '../../assets/css/DashBoardCss/DashboardStyle';
import {
  getBrands,
  getMainSlider,
  getProductList,
} from '../../repository/DashboardRepository/AllDashboardRep';
import {useToast} from 'react-native-toast-notifications';
import {getCategories} from '../../repository/CategoryRepository/AllProductCategoryRep';
import CarouselFile from '../../components/shared/Carousel/CarouselFile';
import {useNavigation} from '@react-navigation/native';
import {DashboardCategoryDataList} from '../../components/shared/FlateLists/DashboardFlatList/DashboardCategoryFlatList';
import DashboardHeading from '../../components/shared/DashboardHeading/DashboardHeading';
import {BrandDataList} from '../../components/shared/FlateLists/DashboardFlatList/BrandFlatList';
import {DashboardProductDataList} from '../../components/shared/FlateLists/DashboardFlatList/DashboardProductDataList';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';

export default function Dashboard(props) {
  const toast = useToast();
  const navigation = useNavigation();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [loader, setLoader] = useState(true);
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
      setCategories(res.data);
    } catch (e) {
      console.log('errrror in..handleCategories page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const handleCarousel = async () => {
    try {
      var res = await getMainSlider();
      setCarouselData(res.data);
    } catch (e) {
      console.log('errrror in..handleCarousel page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const handleBrands = async () => {
    try {
      var body=new FormData()
      body.append('limit','10')
      body.append('offset',0) 
      var res = await getBrands(body);
      setBrands(res.data);
    } catch (e) {
      console.log('errrror in..handleBrands page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const handleLatestProducts = async () => {
    try {
      var body=new FormData()
      body.append('limit',"5")
      body.append('offset',0)
      var res = await getProductList('featured', '5',body);
      setLatestProductsData(res.data);
      setLoader(false);
    } catch (e) {
      setLoader(false);
      console.log('errrror in..handleLatestProducts page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const handleBestSelling = async () => {
    try {  var body=new FormData()
      body.append('limit',"5")
      body.append('offset',0)
      var res = await getProductList('deal', '5',body);
      setBestSellingData(res.data);
    } catch (e) {
      console.log('errrror in..handleBestSelling page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const handleRecentlyViewed = async () => {
    try {
      var body=new FormData()
      body.append('limit',"5")
      body.append('offset',0)
      
      var res = await getProductList('recently_viewed', '5',body);
      setRecentlyViewedData(res.data);
    } catch (e) {
      console.log('errrror in..handleRecentlyViewed page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const handleMostViewed = async () => {
    try {
      var body=new FormData()
      body.append('limit',"5")
      body.append('offset',0)
      var res = await getProductList('most_viewed', '5',body);
      setMostViewedData(res.data);
      // setLoader(false);
    } catch (e) {
      console.log('errrror in..handleMostViewed page-->', e);
      // setLoader(false);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  
  useEffect(()=>{
    handleCategories();
    handleCarousel();
    handleBrands();
    handleLatestProducts();
    handleBestSelling();
    handleRecentlyViewed();
    handleMostViewed();
  },[])


  return (
    <View style={{...styles.bg, backgroundColor: themecolor.THEMECOLOR}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
      />

      <Header title="Home" />

      {loader ? (
        <LoadingFullScreen style={{flex: 1}} />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{marginVertical: 5}} />

            {categories.length > 0 ? (
              <View style={{...styles.ViewHeading}}>
                <DashboardHeading
                  title="Categories"
                  onPress={() => navigation.navigate('Categories')}
                />
                <DashboardCategoryDataList data={categories} />
              </View>
            ) : (
              <></>
            )}

            {carouselData.length > 0 ? (
              <View
                style={{
                  ...styles.container,
                  backgroundColor: themecolor.BOXBORDERCOLOR,
                }}>
                <CarouselFile data={carouselData} />
              </View>
            ) : (
              <></>
            )}

            {brands.length > 0 ? (
              <View style={{...styles.ViewHeading}}>
                <DashboardHeading
                  title="Brands"
                  onPress={() => navigation.navigate('Brands')}
                />
                <BrandDataList handleBrands={handleBrands} isLoading={false} data={brands} horizontal={true} />
              </View>
            ) : (
              <></>
            )}

            {latestProductsData.length > 0 ? (
              <View style={{...styles.ViewHeading}}>
                <DashboardHeading
                  title="Latest Featured Products"
                  onPress={() => navigation.navigate('LatestFeaturedProducts')}
                />
                <DashboardProductDataList data={latestProductsData} />
              </View>
            ) : (
              <></>
            )}

            {bestSellingData.length > 0 ? (
              <View style={{...styles.ViewHeading}}>
                <DashboardHeading
                  title="Best Selling"
                  onPress={() => navigation.navigate('BestSelling')}
                />
                <DashboardProductDataList data={bestSellingData} />
              </View>
            ) : (
              <></>
            )}

            {recentlyViewedData.length > 0 ? (
              <View style={{...styles.ViewHeading}}>
                <DashboardHeading
                  title="Recently Viewed"
                  onPress={() => navigation.navigate('RecentlyViewed')}
                />
                <DashboardProductDataList data={recentlyViewedData} />
              </View>
            ) : (
              <></>
            )}

            {mostViewedData.length > 0 ? (
              <View style={{...styles.ViewHeading}}>
                <DashboardHeading
                  title="Most Viewed"
                  onPress={() => navigation.navigate('MostViewed')}
                />
                <DashboardProductDataList data={mostViewedData} />
              </View>
            ) : (
              <></>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
}
