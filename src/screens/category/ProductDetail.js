import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  BackHandler,
  ScrollView,
  Linking,
  Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
// import {ScrollView} from 'react-native-gesture-handler';
import { useToast } from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import { styles } from '../../assets/css/ProductDetailStyle';
import Carousel from 'react-native-banner-carousel';
import { Colors } from '../../assets/config/Colors';
import StarRating from 'react-native-star-rating';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getProductRealedProducts,
  getProductView,
} from '../../repository/CategoryRepository/AllProductCategoryRep';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/Ionicons';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import Feather from 'react-native-vector-icons/Feather';
import RenderHtml from 'react-native-render-html';
import { DashboardProductDataList } from '../../components/shared/FlateLists/DashboardFlatList/DashboardProductDataList';
import RBSheet from 'react-native-raw-bottom-sheet';
import EN from 'react-native-vector-icons/AntDesign';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import ImageZoom from 'react-native-image-pan-zoom';
import { Modal } from 'react-native';
import { TabData } from './TabData';
import { ProductDetailSizeFlatList } from '../../components/shared/FlateLists/CategoryFlatList/ProductDetailSizeFlatList';
import NumericInput from 'react-native-numeric-input';
import { RBSheetData } from '../../components/shared/RBSheet/RBSheetData';
import { Ribbon } from '../../components/shared/Ribbon/Ribbon';
import { postAddCartProduct } from '../../repository/OrderProcessRepository/AddToCartRepo';
import { postAddOrRemoveWishlist } from '../../repository/WishListRepository/WishListRepo';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function ProductDetail(props) {
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

  const { widthDes } = useWindowDimensions().width;
  const toast = useToast();
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [loader, setLoader] = useState(true);
  const [productDetailData, setProductDetailData] = React.useState('');
  const [productId, setProductId] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [allImages, setAllImages] = React.useState([]);
  const [largeImage, setLargeImage] = React.useState(0);
  const [relatedProductData, setRelatedProductData] = useState([]);
  const [shipment, setShipment] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [soldBy, setSoldBy] = useState('');
  const [brandName, setBrandName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [totalReview, setTotalReview] = useState('');
  const [sizes, setSizes] = useState([]);
  const [customerReview, setCustomerReview] = useState([]);
  const [slug, setSlug] = useState('');
  const [unit, setUnit] = useState('');
  const [featured, setFeatured] = useState('');
  const [title, setTitle] = useState('');
  const [navigateTo, setNavigateTo] = useState('');
  const [icon, setIcon] = useState('')
  const [qty, setQty] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedSizePrice, setSelectedSizePrice] = useState("")
  const [showWishListed, setShowWishListed] = useState(0);
  const [showGoToButton, setShowGoToButton] = useState(false);


  const handleProductView = async () => {
    try {
      var res = await getProductView(props.route.params.productId);
      setBrandName(res.data.brand_name);
      setCategoryName(res.data.category_name);
      setSubCategoryName(res.data.sub_category_name);
      setSoldBy(res.data.sold_by);
      setProductDetailData(res.data);
      setProductId(res.data.product_id);
      setShowWishListed(res.data.wishlist)
      setDescription(res.data.description);
      setShipment(res.data.shipment_info);
      setAllImages(res.data.all_image);
      setTotalReview(res.data.total_reviews_avg);
      setCustomerReview(res.data.customer_review);
      setFeatured(res.data.featured);
      setSizes(res.data.size);
      setSelectedSize(res.data.size[0].size)
      setSelectedSizePrice(res.data.size[0].amount)
      setSlug(res.data.slug);
      setUnit(res.data.unit);
      setLoader(false);
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

  const handleRelatedProduct = async () => {
    try {
      var res = await getProductRealedProducts('most_viewed', '20', productId);
      setRelatedProductData(res.data);
    } catch (e) {
      console.log('errrror in..handleRelatedProduct page-->', e);
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

  const handleRB = (index) => {
    if (index == 1) {
      setTitle('Add To Cart')
      setNavigateTo('')
      setIcon(<Feather
        name="shopping-cart"
        size={16}
        color="#fff"
      />)
    }
    else {
      setTitle('Buy Now')
      setNavigateTo('Cart')
      setIcon(
        <EN
          name="doubleright"
          size={17}
          color={'#fff'}
        />
      )
    }
    refRBSheet.current.open()
  }

  useEffect(() => {
    handleProductView();
    handleRelatedProduct();
  }, []);

  function renderimage(image, index) {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPressIn={() => {
          setImage(image), setModalVisible(true);
        }}>
        <View key={index}>
          <Image
            style={{ width: width * 0.88, height: height * 0.3 }}
            source={{ uri: image }}
            resizeMode={'contain'}
          />
        </View>
      </TouchableOpacity>
    );
  }

  const handleWishListed = async (any) => {
    try {
      var res = await postAddOrRemoveWishlist(any, productId);
      console.log(res.msg)
      if (res.status == true) {
        if (any == 1) {
          setShowWishListed(1);
        }
        else {
          setShowWishListed(0);
        }
        toast.show(res.msg, {
          type: 'success',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
      else if (res.msg == "Invalid Authentication") {
        Alert.alert(
          'Login to continue',
          'Do you want to Login?',
          [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Yes', onPress: () => navigation.navigate('Login')},
          ],
        );
      }
       else {
        toast.show(res.msg, {
          type: 'warning',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (e) {
      console.log('errrror in..handleRemove page wishlist-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const handleAddCartProduct = async () => {
    try {
      var Size = `${selectedSizePrice}#${selectedSize}#${qty}`
      var TotalPrice = selectedSizePrice * qty

      let formdata = new FormData();
      formdata.append('qty[]', qty);
      formdata.append('sizeprice[]', Size);
      formdata.append('totalprice', TotalPrice);

      var res = await postAddCartProduct(productId, formdata)
      if (res.status == true) {
        if (title == 'Add To Cart') {
          setShowGoToButton(true)
          toast.show(res.msg, {
            type: 'success',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
        } else {
          navigation.navigate(navigateTo)
        }
      } else {
        toast.show(res.msg, {
          type: 'warning',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (e) {
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  }

  return (
    <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>
      <Header
        title={props.route.params.title}
        backIcon={true}
        onPressBack={() => handleBackButtonClick()}
      />
      {loader ? (
        <LoadingFullScreen style={{ flex: 1 }} />
      ) : (
        <>
          <View style={{...styles.MGT}} />

          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                ...styles.container,
                marginTop:10
              }}>
              <View
                style={{
                  backgroundColor: themecolor.BOXBORDERCOLOR,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                  ...styles.subView1,
                }}>
                {featured == 'ok' ? (
                  <View style={{ position: 'absolute', top: -10, right: -10, zIndex: 99999 }}>
                    <Ribbon />
                  </View>
                ) : (
                  <></>
                )}

                <View style={{ width: '100%' }}>
                  <Carousel
                    autoplay={false}
                    index={largeImage}
                  // pageSize={(width, height)}
                  >
                    {allImages.map((image, index) => renderimage(image, index))}
                  </Carousel>
                </View>

                <View
                  style={{
                    ...styles.BRVIEW,
                  }}>
                  <View style={{ ...styles.BRSUBVIEW }}>
                    <View style={{ ...styles.BRWID }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          ...styles.HeadText1,
                          color: 'grey',
                        }}>
                        {brandName}
                        {'>>'}
                        {categoryName}
                        {'>>'}
                        {subCategoryName}
                        {'>>'}
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={{
                          ...styles.HeadText,
                          color: themecolor.TXTWHITE,
                        }}>
                        {productDetailData.title}
                      </Text>
                    </View>

                    <View
                      style={{
                        ...styles.WID1,
                      }}>
                      {showWishListed == 1 ? (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => handleWishListed('remove')}
                          style={{
                            padding: 2,
                            borderRadius: 25,
                          }}>
                          <FontAwesome name="heart" size={23} color={themecolor.TEXTRED} />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => handleWishListed('add')}
                          style={{
                            padding: 2,
                            borderRadius: 25,
                          }}>
                          <FontAwesome
                            name="heart-o"
                            size={23}
                            color={themecolor.TEXTRED}
                          />
                        </TouchableOpacity>
                      )}
                    </View>

                    <View
                      style={{
                        ...styles.WID1,
                      }}>
                      <TouchableOpacity
                        activeOpacity={0.1}
                        onPress={() =>
                          Linking.openURL(
                            `whatsapp://send?text=${slug}&phone=918446361881`,
                          )
                        }
                        style={{
                          padding: 2,
                          borderRadius: 25,
                        }}>
                        <Image
                          source={require('../../assets/images/whatsapp.png')}
                          resizeMode="contain"
                          style={{ width: 50, height: 25, }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{ ...styles.MGT }} />

                  <View style={{ width: width * 0.35 }}>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={productDetailData.rating_num}
                      selectedStar={rating => onStarRatingPress(rating)}
                      starSize={18}
                      fullStarColor={themecolor.STARCOLOR}
                    />
                  </View>

                  <View style={{ ...styles.MGT }} />

                  <View
                    style={{
                      ...styles.FLEXDIREC1,
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>
                      MRP :{' '}
                      <Text
                        allowFontScaling={false}
                        style={{ ...styles.RateTextBig1, color: Colors.green1 }}>
                        {'  '}
                        <FAIcon name="rupee" size={15} />
                        {productDetailData.purchase_price}/{unit}{' '}
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={{
                          ...styles.RateTextBig,
                          color: 'grey',
                          textDecorationLine: 'line-through',
                        }}>
                        <FAIcon name="rupee" size={12} />{' '}
                        {productDetailData.sale_price}
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={{
                          ...styles.RateTextBig,
                          color: themecolor.TEXTRED,
                        }}>
                        {'  ('}
                        {productDetailData.discount}%{')'}
                      </Text>
                    </Text>
                  </View>

                  <View style={{ ...styles.MGT }} />
                </View>
              </View>

              <View style={{ ...styles.MGT }} />

              <View
                style={{
                  ...styles.container,
                }}>
                <View
                  style={{
                    backgroundColor: themecolor.BOXBORDERCOLOR,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                    ...styles.subView1,
                  }}>
                  <View
                    style={{
                      ...styles.WID9,
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        ...styles.HeadText,
                        color: themecolor.TXTWHITE,
                      }}>
                      Sold By :-{' '}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={{
                        ...styles.HeadText,
                        color: themecolor.TXTWHITE,
                      }}>
                      <RenderHtml
                        contentWidth={widthDes}
                        source={{ html: soldBy }}
                        enableCSSInlineProcessing={false}
                      />
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ ...styles.MGT}} />

              <View
                style={{
                  ...styles.container,
                }}>
                <View
                  style={{
                    backgroundColor: themecolor.BOXBORDERCOLOR,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                    ...styles.subView1,
                  }}>
                  <View
                    style={{
                      ...styles.WID,
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        ...styles.HeadText,
                        color: themecolor.TXTWHITE,
                      }}>
                      Sizes Available :-{' '}
                    </Text>
                    <ProductDetailSizeFlatList sizes={sizes} touch={true} />
                  </View>
                </View>
              </View>

              <View style={{ ...styles.MGT }} />

              <View
                style={{
                  ...styles.container,
                }}>
                <View
                  style={{
                    backgroundColor: themecolor.BOXBORDERCOLOR,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                    ...styles.subView1,
                  }}>
                  <View
                    style={{
                      ...styles.WID9,
                    }}>
                    <View
                      style={{
                        ...styles.DELVIEW,
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          ...styles.HeadText,
                          color: themecolor.TXTWHITE,
                        }}>
                        Delivery Duration :-{' '}
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={{
                          ...styles.HeadText,
                          color: themecolor.TXTWHITE,
                        }}>
                        * 8 to 10 Days
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.DELVIEW,
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          ...styles.HeadText,
                          color: themecolor.TXTWHITE,
                        }}>
                        Secure Payment :-{' '}
                      </Text>

                      <Image
                        source={require('../../assets/images/Visa.png')}
                        resizeMode="contain"
                        style={{ width: 40, height: 20, margin: 2 }}
                      />
                      <Image
                        source={require('../../assets/images/Maestro.png')}
                        resizeMode="cover"
                        style={{ width: 40, height: 20, margin: 2 }}
                      />
                      <Image
                        source={require('../../assets/images/mastercard.png')}
                        resizeMode="contain"
                        style={{ width: 40, height: 20, margin: 2 }}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={{...styles.MGT }} />

              <View
                style={{
                  ...styles.container,
                }}>
                <View
                  style={{
                    backgroundColor: themecolor.BOXBORDERCOLOR,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                    ...styles.subView1,
                  }}>
                  <View
                    style={{
                      ...styles.Tabsubview,
                    }}>
                    <TabData
                      totalReview={totalReview}
                      customerReview={customerReview}
                      description={description}
                      shipment={shipment}
                    />
                  </View>
                </View>
              </View>

              <View style={{ ...styles.MGT }} />

              {relatedProductData.length > 0 ? (
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'flex-start',
                    width: width * 0.94,
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      ...styles.otherProductHeading,
                      color: themecolor.TXTWHITE,
                    }}>
                    Related Products
                  </Text>
                  <View>
                    <DashboardProductDataList data={relatedProductData} />
                  </View>
                </View>
              ) : (
                <></>
              )}

              <View style={{ ...styles.MGT }} />
            </View>
          </ScrollView>

          <View style={{ marginVertical: 32 }} />

          <TouchableOpacity
            style={{
              ...styles.touchview,
              borderTopColor: themecolor.BOXBORDERCOLOR1,
              backgroundColor: themecolor.LOGINTHEMECOLOR,
            }}>
            <View style={{ ...styles.mainView }}>
              {productDetailData.current_stock > 0 ? (
                <>
                  <View style={{ width: '49%' }}>
                    {showGoToButton ?
                      <HalfSizeButton
                        title="Go to cart"
                        icon={
                          <Feather
                            name="shopping-cart"
                            size={16}
                            color={themecolor.BACKICON}
                          />
                        }
                        onPress={() => navigation.navigate("Cart")}
                        backgroundColor={'transparent'}
                        color={themecolor.BACKICON}
                        borderColor={themecolor.BACKICON}
                      />
                      :
                      <HalfSizeButton
                        title="Add to cart"
                        icon={
                          <Feather
                            name="shopping-cart"
                            size={16}
                            color={themecolor.BACKICON}
                          />
                        }
                        onPress={() => handleRB(1)}
                        backgroundColor={'transparent'}
                        color={themecolor.BACKICON}
                        borderColor={themecolor.BACKICON}
                      />
                    }
                  </View>

                  <View style={{ width: '49%' }}>
                    <HalfSizeButton
                      title="Buy now"
                      icon={
                        <EN
                          name="doubleright"
                          size={17}
                          color={'#fff'}
                        />
                      }
                      onPress={() => handleRB(2)}
                      backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                      color={'#fff'}
                      borderColor={themecolor.ADDTOCARTBUTTONCOLOR}
                    />
                  </View>
                </>
              ) : (
                <View style={{ width: '100%' }}>
                  <HalfSizeButton
                    title="Out of Stock"
                    icon={<MCIcon name="cart-off" size={16} color={'#fff'} />}
                    backgroundColor={themecolor.TEXTRED}
                    color={'#fff'}
                    borderColor={themecolor.TEXTRED}
                  />
                </View>
              )}
              <RBSheetData refRBSheet={refRBSheet} title={title} sizes={sizes} touch={false} icon={icon} qty={qty} setQty={setQty} maxQty={productDetailData.current_stock} setSelectedSize={setSelectedSize} setSelectedSizePrice={setSelectedSizePrice}  onPress={handleAddCartProduct} />
            </View>
          </TouchableOpacity>

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <ImageZoom
                    cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={width * 0.9}
                    imageHeight={height * 0.5}>
                    <Image
                      style={{ width: width * 0.9, height: height * 0.5 }}
                      source={{ uri: image }}
                      resizeMode="contain"
                    />
                  </ImageZoom>
                </View>
              </View>
            </Modal>
          </View>
        </>
      )}
    </View>
  );
}
