import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {ScrollView} from 'react-native-gesture-handler';
import {useToast} from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import {styles} from '../../assets/css/ProductDetailStyle';
import Carousel from 'react-native-banner-carousel';
import {Colors} from '../../assets/config/Colors';
import StarRating from 'react-native-star-rating';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {getProductView} from '../../repository/CategoryRepository/AllProductCategoryRep';

const {width, height} = Dimensions.get('screen');

export default function ProductDetail(props) {
  const toast = useToast();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [productDetailData, setProductDetailData] = React.useState('');
  const [allImages, setAllImages] = React.useState([]);

  const [largeImage, setLargeImage] = React.useState(0);

  const handleProductView = async () => {
    try {
      var res = await getProductView(props.route.params.productId);
      console.log(
        'data handleProductView api in.....product DEtail  page-->',
        res.data,
      );
      setProductDetailData(res.data);
      setAllImages(res.data.all_image);
    } catch (e) {
      console.log('errrror in..handleProductView page-->', e);
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
    handleProductView();
  }, []);

  function renderimage(image, index) {
    return (
      <View key={index}>
        <Image
          style={{width: width, height: height * 0.3}}
          source={{uri: image}}
          resizeMode={'contain'}
        />
      </View>
    );
  }

  return (
    <View style={{...styles.bg, backgroundColor: themecolor.THEMECOLOR}}>
      <Header title={props.route.params.title} backIcon={true} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            ...styles.container,
          }}>
          <View
            style={{
              backgroundColor: themecolor.BOXTHEMECOLOR,
              borderWidth: 1,
              borderColor: themecolor.BOXBORDERCOLOR1,
              width: width,
              height: height * 0.5,
            }}>
            <Carousel
              autoplay={false}
              index={largeImage}
              pageSize={(width, height)}>
              {allImages.map((image, index) => renderimage(image, index))}
            </Carousel>

            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'flex-start',
                width: width * 0.9,
              }}>
              <Text style={{...styles.HeadText, color: themecolor.TXTWHITE}}>
                {productDetailData.title}
              </Text>

              <View  style={{marginTop: 10}}/>

              <View style={{ width: width * 0.4}}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={productDetailData.rating_num}
                  selectedStar={rating => onStarRatingPress(rating)}
                  starSize={16}
                  fullStarColor={themecolor.STARCOLOR}
                />
              </View>

              <View  style={{marginTop: 10}}/>

                <View
                  style={{
                    ...styles.FLEXDIREC1,
                  }}>
                  <Text
                    style={{...styles.RateText, color: themecolor.TXTWHITE}}>
                    MRP :{' '}
                  
                  <Text
                    style={{
                      ...styles.RateTextBig,
                      color: 'grey',
                      textDecorationLine: 'line-through',
                    }}>
                    <FAIcon name="rupee" size={12} />{" "}
                    {productDetailData.sale_price}  
                  </Text>
                  <Text style={{...styles.RateTextBig, color: Colors.green1}}>
                    {"  "}
                    <FAIcon name="rupee" size={12} />{" "}
                    {productDetailData.purchase_price} 
                  </Text>
                  <Text style={{...styles.RateTextBig, color: themecolor.TEXTRED}}>
                    {'  ('}
                    {productDetailData.discount}%{')'}
                  </Text>
                  </Text>
                </View>
            
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={{ ...styles.touchview, backgroundColor: themecolor.LOGINTHEMECOLOR }}>
                    <View style={styles.mainView}>
                        <View style={styles.innerView}>
                            <Text >
                                Place Order
                            </Text>
                        </View>
                        
                    </View>

                </TouchableOpacity>
    </View>
  );
}
