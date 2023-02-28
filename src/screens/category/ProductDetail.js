import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  BackHandler,
  ScrollView,
  Linking
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
// import {ScrollView} from 'react-native-gesture-handler';
import {useToast} from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import {styles} from '../../assets/css/ProductDetailStyle';
import Carousel from 'react-native-banner-carousel';
import {Colors} from '../../assets/config/Colors';
import StarRating from 'react-native-star-rating';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getProductRealedProducts,
  getProductView,
} from '../../repository/CategoryRepository/AllProductCategoryRep';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import Feather from 'react-native-vector-icons/Feather';
import RenderHtml from 'react-native-render-html';
import {DashboardProductDataList} from '../../components/shared/FlateLists/DashboardFlatList/DashboardProductDataList';
import RBSheet from 'react-native-raw-bottom-sheet';
import EN from 'react-native-vector-icons/Entypo';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import ImageZoom from 'react-native-image-pan-zoom';
import {Modal} from 'react-native';
import {TabData} from './TabData';
import {ProductDetailSizeFlatList} from '../../components/shared/FlateLists/CategoryFlatList/ProductDetailSizeFlatList';

const {width, height} = Dimensions.get('window');

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

  const {widthDes} = useWindowDimensions().width;
  const toast = useToast();
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
  const [showWishListed, setShowWishListed] = useState(true);
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
  const [sizesRate, setSizesRate] = useState([]);
  const [slug,setSlug]=useState('')
  const [unit,setUnit]=useState('')

  const handleWishListed = () => {
    setShowWishListed(!showWishListed);
  };

  const handleProductView = async () => {
    try {
      var res = await getProductView(props.route.params.productId);
      console.log('res data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', res.data);
      setBrandName(res.data.brand_name);
      setCategoryName(res.data.category_name);
      setSubCategoryName(res.data.sub_category_name);
      setSoldBy(res.data.sold_by);
      setProductDetailData(res.data);
      setProductId(res.data.product_id);
      setDescription(res.data.description);
      setShipment(res.data.shipment_info);
      setAllImages(res.data.all_image);
      setTotalReview(res.data.total_reviews_avg);
      setCustomerReview(res.data.customer_review);
      setSizes(Object.keys(res.data.size));
      setSlug(res.data.slug)
      setUnit(res.data.unit)
      setSizesRate(Object.values(res.data.size));
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
            style={{width: width * 0.88, height: height * 0.3}}
            source={{uri: image}}
            resizeMode={'contain'}
          />
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View style={{...styles.bg, backgroundColor: themecolor.THEMECOLOR}}>
      <Header
        title={props.route.params.title}
        backIcon={true}
        onPressBack={() => handleBackButtonClick()}
      />
      {loader ? (
        <LoadingFullScreen style={{flex: 1}} />
      ) : (
        <>
          <View style={{marginTop: 10}} />

          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                ...styles.container,
              }}>
              <View
                style={{
                  backgroundColor: themecolor.BOXTHEMECOLOR,
                  borderWidth: 0.5,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                  borderRadius: 5,
                  padding: 10,
                }}>
                <View style={{width: '100%'}}>
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
                    alignSelf: 'center',
                    justifyContent: 'flex-start',
                    padding: 10,
                  }}>
                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <View style={{width: width * 0.7, flexDirection: 'column'}}>
                      <Text
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
                        style={{
                          ...styles.HeadText,
                          color: themecolor.TXTWHITE,
                        }}>
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

                    <View
                      style={{
                        width: width * 0.1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                     
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={() => Linking.openURL(`whatsapp://send?text=${slug}&phone=918446361881`)}
                          style={{padding: 7, borderRadius: 20}}>
                          <Image
                        source={require('../../assets/images/whatsapp.png')}
                        resizeMode="contain"
                        style={{width: 50, height: 25, margin: 2}}
                      />
                        </TouchableOpacity>
                    
                    </View>
                  </View>

                  <View style={{marginTop: 10}} />

                  <View style={{width: width * 0.35}}>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={productDetailData.rating_num}
                      selectedStar={rating => onStarRatingPress(rating)}
                      starSize={18}
                      fullStarColor={themecolor.STARCOLOR}
                    />
                  </View>

                  <View style={{marginTop: 10}} />

                  <View
                    style={{
                      ...styles.FLEXDIREC1,
                    }}>
                    <Text
                      style={{...styles.RateText, color: themecolor.TXTWHITE}}>
                      MRP :{' '}
                      <Text
                        style={{...styles.RateTextBig1, color: Colors.green1}}>
                        {'  '}
                        <FAIcon name="rupee" size={15} />
                        {productDetailData.purchase_price}/{unit} {' '}
                      </Text>
                      <Text
                        style={{
                          ...styles.RateTextBig,
                          color: 'grey',
                          textDecorationLine: 'line-through',
                        }}>
                        <FAIcon name="rupee" size={12} />{' '}
                        {productDetailData.sale_price}
                      </Text>
                      <Text
                        style={{
                          ...styles.RateTextBig,
                          color: themecolor.TEXTRED,
                        }}>
                        {'  ('}
                        {productDetailData.discount}%{')'}
                      </Text>
                    </Text>
                  </View>

                  <View style={{marginTop: 10}} />

                  {/* <View style={{width: width * 0.3}}>
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
                        <Text style={styles.ViewAllButtonIcon}>
                          Out of Stock
                        </Text>
                      </View>
                    )}
                  </View> */}

                  {/* <View style={{marginTop: 10}} /> */}
                </View>
              </View>

              <View style={{marginTop: 10}} />

              <View
                style={{
                  ...styles.container,
                }}>
                <View
                  style={{
                    backgroundColor: themecolor.BOXTHEMECOLOR,
                    borderWidth: 0.5,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                    borderRadius: 5,
                    padding: 10,
                  }}>
                  <View
                    style={{
                      width: width * 0.9,
                      margin: 10,
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        ...styles.HeadText,
                        color: themecolor.TXTWHITE,
                      }}>
                      Sold By :-{' '}
                    </Text>
                    <Text
                      style={{
                        ...styles.HeadText,
                        color: themecolor.TXTWHITE,
                      }}>
                      <RenderHtml
                        contentWidth={widthDes}
                        source={{html: soldBy}}
                        enableCSSInlineProcessing={false}
                      />
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{marginTop: 10}} />

              <View
                style={{
                  ...styles.container,
                }}>
                <View
                  style={{
                    backgroundColor: themecolor.BOXTHEMECOLOR,
                    borderWidth: 0.5,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                    borderRadius: 5,
                    padding: 10,
                  }}>
                  <View
                    style={{
                      width: width * 0.9,
                      margin: 10,
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{
                        ...styles.HeadText,
                        color: themecolor.TXTWHITE,
                      }}>
                      Sizes Available :-{' '}
                    </Text>
                    <ProductDetailSizeFlatList
                      sizes={sizes}
                      touch={true}
                      sizesRate={sizesRate}
                    />
                  </View>
                </View>
              </View>

              <View style={{marginTop: 10}} />

              <View
                style={{
                  ...styles.container,
                }}>
                <View
                  style={{
                    backgroundColor: themecolor.BOXTHEMECOLOR,
                    borderWidth: 0.5,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                    borderRadius: 5,
                    padding: 10,
                  }}>
                  <View
                    style={{
                      width: width * 0.9,
                      margin: 10,
                      flexDirection: 'column',
                    }}>
                    <View
                      style={{
                        width: width * 0.9,
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 10,
                        marginBottom: 5,
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          ...styles.HeadText,
                          color: themecolor.TXTWHITE,
                        }}>
                        Delivery Duration :-{' '}
                      </Text>
                      <Text
                        style={{
                          ...styles.HeadText,
                          color: themecolor.TXTWHITE,
                        }}>
                        * 8 to 10 Days
                      </Text>
                    </View>
                    <View
                      style={{
                        width: width * 0.9,
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 8,
                        marginBottom: 5,
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          ...styles.HeadText,
                          color: themecolor.TXTWHITE,
                        }}>
                        Payment Mode :-{' '}
                      </Text>

                      <Image
                        source={require('../../assets/images/Visa.png')}
                        resizeMode="contain"
                        style={{width: 40, height: 20, margin: 2}}
                      />
                      <Image
                        source={require('../../assets/images/Maestro.png')}
                        resizeMode="cover"
                        style={{width: 40, height: 20, margin: 2}}
                      />
                      <Image
                        source={require('../../assets/images/mastercard.png')}
                        resizeMode="contain"
                        style={{width: 40, height: 20, margin: 2}}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={{marginTop: 10}} />

              <View
                style={{
                  ...styles.container,
                }}>
                <View
                  style={{
                    backgroundColor: themecolor.BOXTHEMECOLOR,
                    borderWidth: 0.5,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                    borderRadius: 5,
                    padding: 5,
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop:5
                    }}>
                    <TabData totalReview={totalReview} customerReview={customerReview} description={description} shipment={shipment} /> 
                  </View>
                </View>
              </View>

              <View style={{marginTop: 10}} />

              {relatedProductData.length > 0 ? (
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'flex-start',
                    width: width * 0.94,
                  }}>
                  <Text
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
                      backgroundColor={themecolor.TXTWHITE1}
                      color={themecolor.TXTWHITE}
                      borderColor={themecolor.TXTWHITE}
                    />
                  </View>

                  <View style={{width: '49%'}}>
                    <HalfSizeButton
                      title="Buy now"
                      icon={
                        <MaterialIcons
                          name="double-arrow"
                          size={16}
                          color={'#fff'}
                        />
                      }
                      onPress={() => refRBSheet.current.open()}
                      backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                      color={'#fff'}
                      borderColor={themecolor.BORDERCOLOR}
                    />
                  </View>
                </>
              ) : (
                <View style={{width: '100%'}}>
                  <HalfSizeButton
                    title="Out of Stock"
                    icon={<MCIcon name="cart-off" size={16} color={'#fff'} />}
                    backgroundColor={themecolor.TEXTRED}
                    color={'#fff'}
                    borderColor={themecolor.TEXTRED}
                  />
                </View>
              )}

              <RBSheet
                ref={refRBSheet}
                animationType={'slide'}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={300}
                customStyles={{
                  container: {
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 0,
                    backgroundColor: themecolor.RB2,
                  },
                  draggableIcon: {
                    display: 'none',
                  },
                }}>
                <View style={{...styles.view14}}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => refRBSheet.current.close()}>
                    <EN name="cross" color={themecolor.TXTWHITE} size={28} />
                  </TouchableOpacity>
                  <View>
                    <Text
                      style={{...styles.RBText, color: themecolor.TXTWHITE}}>
                      Buy Now
                    </Text>
                  </View>
                  <View>
                    <View>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => OnClick()}>
                        <Text
                          style={{
                            ...styles.RBText,
                            ...styles.clrtheme,
                            color: themecolor.TXTWHITE,
                          }}>
                          Done
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{...styles.Borderline}} />
                <View style={styles.view16}>
                  <View>
                    <Text
                      style={{
                        ...styles.CardText,
                        ...styles.align3,
                        ...styles.left1,
                        color: themecolor.TXTWHITE,
                        marginBottom: 10,
                      }}>
                      Sizes
                    </Text>
                  </View>

                  <View
                    style={{
                      ...styles.container,
                    }}>
                    <View style={{width: width * 0.9, flexDirection: 'column'}}>
                      <ProductDetailSizeFlatList
                        sizes={sizes}
                        touch={true}
                        sizesRate={sizesRate}
                      />
                    </View>
                  </View>
                  <View style={styles.marg} />
                </View>


                <View style={styles.view16}>
                  <View>
                    <Text
                      style={{
                        ...styles.CardText,
                        ...styles.align3,
                        ...styles.left1,
                        color: themecolor.TXTWHITE,
                        marginBottom: 10,
                      }}>
                      Quantity
                    </Text>
                  </View>

                  <View
                    style={{
                      ...styles.container,
                    }}>
                    <View style={{width: width * 0.9, flexDirection: 'column'}}>
                     
                    </View>
                  </View>
                  <View style={styles.marg} />
                </View>
              </RBSheet>
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
                      style={{width: width * 0.9, height: height * 0.5}}
                      source={{uri: image}}
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
