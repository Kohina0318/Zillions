import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    Dimensions,
    Image,
    BackHandler,
    ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useToast } from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import { styles } from '../../assets/css/CategoryCss/ProductDetailStyle';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { useNavigation } from '@react-navigation/native';
import { ProductDetailSizeFlatList } from '../../components/shared/FlateLists/CategoryFlatList/ProductDetailSizeFlatList';
import { getProductRealedProducts, getProductView } from '../../repository/CategoryRepository/AllProductCategoryRep';
import { DashboardProductDataList } from '../../components/shared/FlateLists/DashboardFlatList/DashboardProductDataList';
import ProductMoreDetailSortByComp from '../../components/shared/OrderProcessComponents/ProductDetails/ProductMoreDetailSortByComp';
import ProductMoreDetailDeliveryDuComp from '../../components/shared/OrderProcessComponents/ProductDetails/ProductMoreDetailDeliveryDuComp';
import { RBSheetData } from '../../components/shared/RBSheet/RBSheetData';
import { TabData } from './TabData';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import EN from 'react-native-vector-icons/AntDesign';
import ImageZoom from 'react-native-image-pan-zoom';
import { Modal } from 'react-native';
import ProductMoreDetailMainComp from '../../components/shared/OrderProcessComponents/ProductDetails/ProductMoreDetailMainComp';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import { store } from '../../../App';
import { postAddCartProduct } from '../../repository/OrderProcessRepository/AddToCartRepo';
import ImageZoomerModel from '../../components/shared/Model/ImageZoomerModel';
import ProductMoreDetailCustomerSupport from '../../components/shared/OrderProcessComponents/ProductDetails/ProductMoreDetailCustomerSupport';

const { width, height } = Dimensions.get('window');

export default function ProductMoreDetails(props) {
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
    const navigation = useNavigation();
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    const refRBSheet = useRef();
    const [loader, setLoader] = useState(true);
    const [productDetailData, setProductDetailData] = useState({})
    const [productId, setProductId] = React.useState('');
    const [soldBy, setSoldBy] = useState('');
    const [sizes, setSizes] = useState([]);
    const [relatedProductData, setRelatedProductData] = useState([]);
    const [qty, setQty] = useState(1)
    const [selectedSize, setSelectedSize] = useState("")
    const [selectedSizePrice, setSelectedSizePrice] = useState("")
    const [showGoToButton, setShowGoToButton] = useState(false);
    const [showRBSheet, setshowRBSheet] = useState('');
    const [image, setImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = React.useState(false);


    const handleProductView = async () => {
        try {
            var res = await getProductView(props.route.params.productId);
            if (res.status == true) {
                setProductDetailData(res.data)
                setProductId(res.data.product_id);
                setSoldBy(res.data.sold_by);
                setSizes(res.data.size);
                setSelectedSize(res.data.size[0].size)
                setSelectedSizePrice(res.data.size[0].amount)          
            }
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
            var body=new FormData()
            body.append('limit',"10")
              body.append('offset',0) 
           var res = await getProductRealedProducts('most_viewed', '10', productId,body);
           if (res.status == true) {
            setRelatedProductData(res.data);
                setLoader(false);
            } else {
                setLoader(false);
            }
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
        setLoader(true)
        handleProductView();
        handleRelatedProduct();
    }, [props.route.params.productId]);


    const handleAddCartProduct = async () => {
        setLoader(true)
        try {
            var Size = `${selectedSizePrice}#${selectedSize}#${qty}`
            var TotalPrice = selectedSizePrice * qty

            let formdata = new FormData();
            formdata.append('qty[]', qty);
            formdata.append('sizeprice[]', Size);
            formdata.append('totalprice', TotalPrice);

            var res = await postAddCartProduct(productId, formdata)
            if (res.status == true) {
                if (showRBSheet == 0) {
                    store.dispatch({ type: 'ADD_CART', payload: [productId, { productId: productId, data: formdata }] })
                    setShowGoToButton(true)
                    setLoader(false)
                    toast.show(res.msg, {
                        type: 'success',
                        placement: 'bottom',
                        duration: 3000,
                        offset: 30,
                        animationType: 'slide-in',
                    });
                    setQty(1)
                } else {
                    setLoader(false)
                    navigation.navigate("Cart")
                    toast.show(res.msg, {
                        type: 'success',
                        placement: 'bottom',
                        duration: 3000,
                        offset: 30,
                        animationType: 'slide-in',
                    });
                    setQty(1)
                }
            } else {
                setLoader(false)
                toast.show(res.msg, {
                    type: 'warning',
                    placement: 'bottom',
                    duration: 3000,
                    offset: 30,
                    animationType: 'slide-in',
                });
            }
        } catch (e) {
            setLoader(false)
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
                Object.values(productDetailData).length > 0 ?
                    <>
                        <View
                            style={{
                                ...styles.containerMain,
                            }}>

                            <ScrollView showsVerticalScrollIndicator={false}>

                                <ProductMoreDetailMainComp productDetail={productDetailData} setImage={setImage} setModalVisible={setModalVisible} />

                                <View style={{ ...styles.MrT5 }} />

                                {soldBy != "" ? <>
                                    <ProductMoreDetailSortByComp soldBy={soldBy} />
                                    <View style={{ ...styles.MrT5 }} />
                                </> : <></>}

                                {sizes.length > 0 ? <>
                                    <View
                                        style={{
                                            ...styles.datalistView,
                                            backgroundColor: themecolor.BOXBORDERCOLOR,
                                            borderColor: themecolor.BOXBORDERCOLOR1,
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

                                    <View style={{ ...styles.MrT5 }} />
                                </> : <></>}

                                <ProductMoreDetailDeliveryDuComp />

                                <View style={{ ...styles.MrT5 }} />

                                <View
                                    style={{
                                        ...styles.datalistView,
                                        backgroundColor: themecolor.BOXBORDERCOLOR,
                                        borderColor: themecolor.BOXBORDERCOLOR1,
                                    }}>
                                    <TabData
                                        productDetail={productDetailData}
                                    />
                                </View>

                                <View style={{ ...styles.MGT }} />

                                <ProductMoreDetailCustomerSupport />

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

                            </ScrollView>

                            <View style={{ marginVertical: 77 }} />
                        </View>

                        <View
                            style={{
                                ...styles.touchview,
                                borderTopColor: themecolor.BOXBORDERCOLOR1,
                                backgroundColor: themecolor.BOXBORDERCOLOR,
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
                                                    onPress={() => {
                                                        setshowRBSheet(0);
                                                        refRBSheet.current.open()
                                                    }}
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
                                                onPress={() => {
                                                    setshowRBSheet(1);
                                                    refRBSheet.current.open()
                                                }}
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
                            </View>
                        </View>
                    </>
                    :
                    <LoadingFullScreen style={{ flex: 1 }} />
            )}

            {showRBSheet == 0 ?
                <RBSheetData refRBSheet={refRBSheet} title={'Add To Cart'} sizes={sizes} icon={<Feather
                    name="shopping-cart"
                    size={16}
                    color="#fff"
                />} touch={false} qty={qty} setQty={setQty}  maxQty={productDetailData.current_stock} setSelectedSize={setSelectedSize} setSelectedSizePrice={setSelectedSizePrice} onPress={handleAddCartProduct}  />
                :
                <RBSheetData refRBSheet={refRBSheet} title={'Buy Now'} icon={<EN
                    name="doubleright"
                    size={17}
                    color={'#fff'}
                />} sizes={sizes} touch={false} qty={qty}  setQty={setQty} maxQty={productDetailData.current_stock} setSelectedSize={setSelectedSize} setSelectedSizePrice={setSelectedSizePrice} onPress={handleAddCartProduct} />
            }

            <ImageZoomerModel image={image} modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </View>
    )

}