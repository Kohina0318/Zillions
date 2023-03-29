import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
  ToastAndroid
} from 'react-native';
import { styles } from '../../../../assets/css/WishListCss/WishListStyle';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import HalfSizeButton from '../../button/halfSizeButton';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { postAddOrRemoveWishlist } from '../../../../repository/WishListRepository/WishListRepo';
import { useToast } from 'react-native-toast-notifications';
import { RBSheetData } from '../../RBSheet/RBSheetData';
import { postAddCartProduct } from '../../../../repository/OrderProcessRepository/AddToCartRepo';
import { store } from '../../../../../App';
import LoadingContent from '../../Loader/LoadingContent';
import { navigateToClearStack } from '../../../../navigations/NavigationDrw/NavigationService';

const { width } = Dimensions.get('screen');


function WishListDataFlateList({ item, themecolor, setRefresh, refresh,setOffset, setWishlistData }) {

  const toast = useToast();
  const refRBSheet = useRef();
  const navigation = useNavigation();

  const [sizeData, setSizesData] = useState(JSON.parse(item.size));
  const [qty, setQty] = useState(1)
  const [selectedSize, setSelectedSize] = useState(sizeData[0].size)
  const [selectedSizePrice, setSelectedSizePrice] = useState(sizeData[0].amount)

  const handleRemove = async (comeAddCart) => {
    try {
      var res = await postAddOrRemoveWishlist('remove', item.product_id);
      if (res.status == true) {
        setOffset(0)
        setWishlistData([])
        setRefresh(!refresh)
        if(comeAddCart != 'comeAddCart'){
        toast.show(res.msg, {
          type: 'success',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
      } else if (res.msg == "Invalid Authentication") {
        ToastAndroid.showWithGravityAndOffset(
          `${'Token Expired'}`,
          ToastAndroid.TOP,
          ToastAndroid.LONG,
          10,
          10,
        );
        navigateToClearStack('Dashboard');
      }
      else {

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
      var res = await postAddCartProduct(item.product_id, formdata)
      if (res.status == true) {

        store.dispatch({ type: 'ADD_CART', payload: [item.product_id, { productId: item.product_id, data: formdata }] })
        handleRemove('comeAddCart')
        toast.show(res.msg, {
          type: 'success',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
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
    <>
      <View
        style={{
          ...styles.datalistView,
          backgroundColor: themecolor.BOXBORDERCOLOR,
          borderColor: themecolor.BOXBORDERCOLOR1,
        }}
        key={item.row_id}
      >
        <View
          style={{
            ...styles.removeIconButton,
          }}>
          <TouchableOpacity
            activeOpacity={0.05}
            style={{ ...styles.removeButton }}
            onPress={() => handleRemove()}>
            <MCI
              name="close-circle-outline"
              size={25}
              color={themecolor.TEXTRED}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate('ProductMoreDetails', {
              productId: item.product_id,
              title: item.title,
            })
          } style={{
            ...styles.containerInn1
          }}>
          <View style={{ ...styles.innerImage }}
          >
            <Image
              source={{ uri: item.front_image }}
              style={{
                width: "100%",
                height: '100%',
              }}
              resizeMode="center"
            />
          </View>

          <View
            style={{
              ...styles.inner,
            }}>
            <View>
              <Text
                allowFontScaling={false}
                style={{ ...styles.txt, color: themecolor.TXTWHITE }}
                numberOfLines={2}>
                {item.title}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', width: '100%' }}>
              <Text
                allowFontScaling={false}
                style={{ ...styles.txt1, color: themecolor.TEXTGREEN }}>
                <FAIcon name="rupee" size={12} />
                {item.purchase_price}
                {'  '}
                <Text
                  allowFontScaling={false}
                  style={{
                    ...styles.txtLine,
                    color: themecolor.TXTGREY,
                  }}>
                  <FAIcon name="rupee" size={12} />
                  {item.sale_price}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{ ...styles.txt1, color: themecolor.TEXTRED }}>
                  {'  ('}
                  {item.discount}%{')'}
                </Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={{
          width: "100%",
          borderWidth: 0.3,
          borderColor: themecolor.BOXBORDERCOLOR1,
        }} />

        <View style={{ width: "100%" }}>

          <View style={{ marginTop: 5 }} />

          {item.current_stock > 0 ?
            <HalfSizeButton
              title="Move to Cart"
              icon={
                <Feather
                  name="shopping-cart"
                  size={16}
                  color={themecolor.BACKICON}
                />
              }
              backgroundColor={'transparent'}
              color={themecolor.BACKICON}
              borderColor={'transparent'}
              fontSize={14}
              height={width * 0.08}
              onPress={() => refRBSheet.current.open()}
            />
            :
            <HalfSizeButton
              title="Out of Stock"
              icon={
                <MCI name="cart-off" size={16} color={themecolor.TEXTRED} />
              }
              backgroundColor={'transparent'}
              color={themecolor.TEXTRED}
              borderColor={'transparent'}
              fontSize={16}
              height={width * 0.08}
              disabled={true}
            />
          }
        </View>
      </View>
      <RBSheetData refRBSheet={refRBSheet} title={"Move to cart"} sizes={sizeData} touch={false} icon={<Feather
        name="shopping-cart"
        size={16}
        color="#fff"
      />} qty={qty} setQty={setQty} maxQty={item.current_stock} setSelectedSize={setSelectedSize} onPress={handleAddCartProduct} setSelectedSizePrice={setSelectedSizePrice} />

    </>
  );
}

export function WishListDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => (
        <WishListDataFlateList item={item} themecolor={themecolor} setRefresh={props.setRefresh} refresh={props.refresh} setOffset={props.setOffset} setWishlistData={props.setWishlistData} />
      )}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      contentContainerStyle={{
        ...styles.contentContainerStyle
      }}
      onEndReached={() => {
          props.handleWishlist();
      }}
      ListFooterComponent={() => {
        if (props.isLoading && props.data.length > 9) {
          return (
            <LoadingContent />
          );
        } else {
          return null;
        }
      }}
    />
  );
}
