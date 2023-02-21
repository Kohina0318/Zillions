import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  Image,
  TouchableOpacity,
  useWindowDimensions,
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
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getProductView} from '../../repository/CategoryRepository/AllProductCategoryRep';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import Feather from 'react-native-vector-icons/Feather';
import RenderHtml from 'react-native-render-html';
import {DashboardProductDataList} from '../../components/shared/FlateLists/DashboardFlatList/DashboardProductDataList';

const {width, height} = Dimensions.get('screen');

const data = [
  {
    id: 1,
    title: 'kkhdhchuduhi',
    purchase_price: '789',
    sale_price: '300',
    rating_num: 2,
  },
  {
    id: 2,
    title: 'ihkhggg',
    purchase_price: '999',
    sale_price: '400',
    rating_num: 4,
  },
  {
    id: 3,
    title: 'dtyhhhdhchuduhi',
    purchase_price: '509',
    sale_price: '200',
    rating_num: 0,
  },
];
export default function ProductDetail(props) {
  const {widthDes} = useWindowDimensions();

  const toast = useToast();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [productDetailData, setProductDetailData] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [allImages, setAllImages] = React.useState([]);
  const [largeImage, setLargeImage] = React.useState(0);
  const [showWishListed, setShowWishListed] = useState(true);

  const handleWishListed = () => {
    setShowWishListed(!showWishListed);
  };

  const handleProductView = async () => {
    try {
      var res = await getProductView(props.route.params.productId);
      console.log(
        'data handleProductView api in.....product DEtail  page-->',
        res.data,
      );
      setProductDetailData(res.data);
      setDescription(res.data.description);
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
              <View style={{flexDirection: 'row', width: width * 0.9}}>
                <View style={{width: width * 0.8}}>
                  <Text
                    style={{...styles.HeadText, color: themecolor.TXTWHITE}}>
                    {productDetailData.title}
                  </Text>
                </View>

                <View
                  style={{
                    width: width * 0.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {showWishListed ? (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => handleWishListed()}
                      style={{padding: 7, borderRadius: 20}}>
                      <FontAwesome
                        name="heart-o"
                        size={22}
                        color={themecolor.TEXTRED}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => handleWishListed()}
                      style={{padding: 7, borderRadius: 20}}>
                      <FontAwesome
                        name="heart"
                        size={22}
                        color={themecolor.TEXTRED}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={{marginTop: 10}} />

              <View style={{width: width * 0.4}}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={productDetailData.rating_num}
                  selectedStar={rating => onStarRatingPress(rating)}
                  starSize={16}
                  fullStarColor={themecolor.STARCOLOR}
                />
              </View>

              <View style={{marginTop: 10}} />

              <View
                style={{
                  ...styles.FLEXDIREC1,
                }}>
                <Text style={{...styles.RateText, color: themecolor.TXTWHITE}}>
                  MRP :{' '}
                  <Text
                    style={{
                      ...styles.RateTextBig,
                      color: 'grey',
                      textDecorationLine: 'line-through',
                    }}>
                    <FAIcon name="rupee" size={12} />{' '}
                    {productDetailData.sale_price}
                  </Text>
                  <Text style={{...styles.RateTextBig, color: Colors.green1}}>
                    {'  '}
                    <FAIcon name="rupee" size={12} />{' '}
                    {productDetailData.purchase_price}
                  </Text>
                  <Text
                    style={{...styles.RateTextBig, color: themecolor.TEXTRED}}>
                    {'  ('}
                    {productDetailData.discount}%{')'}
                  </Text>
                </Text>
              </View>

              <View style={{marginTop: 10}} />

              <View style={{width: width * 0.3}}>
                {productDetailData.current_stock > 0 ? (
                  <View
                    style={{
                      ...styles.ViewAllButton,
                      backgroundColor: themecolor.TEXTGREEN,
                    }}>
                    <Text style={styles.ViewAllButtonIcon}>Available</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      ...styles.ViewAllButton,
                      backgroundColor: themecolor.TEXTRED,
                    }}>
                    <Text style={styles.ViewAllButtonIcon}>Out of Stock</Text>
                  </View>
                )}
              </View>

              <View style={{marginTop: 10}} />

              <View style={{}}>
                <RenderHtml
                  // contentWidth={widthDes}
                  source={{html: `${description}`}}
                />
              </View>
            </View>
          </View>

          <View style={{marginTop: 10}} />

          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'flex-start',
              width: width * 0.9,
            }}>
            <Text
              style={{
                ...styles.otherProductHeading,
                color: themecolor.TXTWHITE,
              }}>
              Related Products
            </Text>
            <View>
              <DashboardProductDataList data={data} />
            </View>
          </View>

          <View style={{marginTop: 10}} />
        </View>
      </ScrollView>

      <View style={{marginVertical: 32}} />

      <TouchableOpacity
        style={{
          ...styles.touchview,
          borderTopColor: themecolor.BOXBORDERCOLOR1,
          backgroundColor: themecolor.LOGINTHEMECOLOR,
        }}>
        <View style={{...styles.mainView}}>
          
        {productDetailData.current_stock > 0 ? (
          <>
          <View style={{width: '49%'}}>
            <HalfSizeButton
              title="Add to cart"
              icon={
                <Feather
                  name="shopping-cart"
                  size={16}
                  color={themecolor.TXTWHITE}
                />
              }
              onPress={() => handleWishListed()}
              backgroundColor={themecolor.TXTWHITE1}
              color={themecolor.TXTWHITE}
              borderColor={themecolor.TXTWHITE}
            />
          </View>

          <View style={{width: '49%'}}>
            <HalfSizeButton
              title="Buy now"
              icon={
                <MaterialIcons name="double-arrow" size={16} color={'#fff'} />
              }
              backgroundColor={'#281E5D'}
              color={'#fff'}
              borderColor={'#fff'}
            />
          </View>
          </>
        ):(
          <View style={{width: '100%'}}>
            <HalfSizeButton
              title="Out of Stock"
              icon={
                <MCIcon
                  name="cart-off"
                  size={16}
                  color={"#fff"}
                />
              }
              onPress={() => handleWishListed()}
              backgroundColor={themecolor.TEXTRED}
              color={"#fff"}
              borderColor={themecolor.TEXTRED}
            />
          </View>
        )}

        </View>
      </TouchableOpacity>
    </View>
  );
}
