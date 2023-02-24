import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  BackHandler,
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
import {Tab, TabView} from '@rneui/themed';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';

const {width, height} = Dimensions.get('screen');

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
  const [index, setIndex] = React.useState(0);
  const [productDetailData, setProductDetailData] = React.useState('');
  const [productId, setProductId] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [allImages, setAllImages] = React.useState([]);
  const [largeImage, setLargeImage] = React.useState(0);
  const [relatedProductData, setRelatedProductData] = useState([]);
  const [showWishListed, setShowWishListed] = useState(true);
  const [shipment,setShipment]=useState('')

  const handleWishListed = () => {
    setShowWishListed(!showWishListed);
  };

  const tagsStyles={
    p:{
      // backgroundColor:'grey',
      color:themecolor.TXTWHITE
    },
  }

  
  const tagStyles={
    p:{
      // backgroundColor:'grey',
      color:themecolor.TXTWHITE,
      textAlign:'left'
    },
    ul:{
      color:themecolor.TXTWHITE,
      // textAlign:'left'
    },
    li:{
      color:themecolor.TXTWHITE,
      textAlign:'left'
    },
    // body:{
    //   height:'auto'
    // }
  }

  const handleProductView = async () => {
    try {
      var res = await getProductView(props.route.params.productId);
      console.log('res data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', res.data);
      setProductDetailData(res.data);
      setProductId(res.data.product_id);
      setDescription(res.data.description);
      setShipment(res.data.shipment_info)
      setAllImages(res.data.all_image);
      setLoader(false)
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
      <View key={index}>
        <Image
          style={{width: width * 0.88, height: height * 0.3}}
          source={{uri: image}}
          resizeMode={'contain'}
        />
      </View>
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
                <View style={{width: '100%', height: height * 0.33}}>
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
                    <View style={{width: width * 0.7}}>
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
                    <Text
                      style={{...styles.RateText, color: themecolor.TXTWHITE}}>
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
                      <Text
                        style={{...styles.RateTextBig, color: Colors.green1}}>
                        {'  '}
                        <FAIcon name="rupee" size={12} />{' '}
                        {productDetailData.purchase_price}
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
                        <Text style={styles.ViewAllButtonIcon}>
                          Out of Stock
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={{marginTop: 10}} />
                  <View style={{width:width*0.9,alignItems:'center',justifyContent:'center'}}>
                   <Tab
      value={index}
      onChange={(e) => setIndex(e)}
      indicatorStyle={{
        backgroundColor: 'white',
        // height: 3,
      }}
    >
      <Tab.Item
        title="Recent"
        titleStyle={{ fontSize: 14,color:themecolor.BACKICON }}
      />
      <Tab.Item
        title="Shipping Info"
        titleStyle={{ fontSize: 14,color:themecolor.BACKICON }}
      />
      <Tab.Item
        title="Reviews"
        titleStyle={{ fontSize: 14,color:themecolor.BACKICON }}
      />
    </Tab>

    <TabView containerStyle={{width:width,justifyContent:'center'}} tabItemContainerStyle={{width:width*0.7,justifyContent:'center'}} value={index} onChange={setIndex} animationType="spring">
      <TabView.Item>
                    <RenderHtml
                      contentWidth={widthDes}
                      source={{html: description}}
                      enableExperimentalMarginCollapsing={true}
                      enableExperimentalBRCollapsing={true}
                      enableExperimentalGhostLinesPrevention={true}
                      defaultViewProps={{width:width*0.8,justifyContent:'center'}}
                      tagsStyles={tagStyles}
                    />
      </TabView.Item>
      <TabView.Item>
      <RenderHtml
                      contentWidth={widthDes}
                      source={{html:shipment}}
                      enableExperimentalMarginCollapsing={true}
                      enableExperimentalBRCollapsing={true}
                      enableExperimentalGhostLinesPrevention={true}
                      enableCSSInlineProcessing={false}
                      defaultViewProps={{width:width*0.9}}
                      tagsStyles={tagsStyles}
                      // ignoredStyles={{backgroundColor}}
                    />
      </TabView.Item>
      <TabView.Item>
        <Text h1>Cart</Text>
      </TabView.Item>
    </TabView>
    </View>  
                  <View style={{marginTop: 20}} />
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
                height={150}
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
                      Please add quantity
                    </Text>
                  </View>
                  <View style={styles.view17}>
                    {/* <DatePickerRange onChange={value => handleChange(value)} /> */}
                  </View>
                  <View style={styles.marg} />
                </View>
              </RBSheet>
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
