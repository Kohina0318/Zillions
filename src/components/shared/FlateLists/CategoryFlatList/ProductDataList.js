import React, { useState, } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
  Alert
} from 'react-native';
import { ProductStyle } from '../../../../assets/css/CategoryCss/ProductStyle';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { useToast } from 'react-native-toast-notifications';
import { postAddOrRemoveWishlist } from '../../../../repository/WishListRepository/WishListRepo';
import LoadingContent from '../../Loader/LoadingContent';

const { width } = Dimensions.get('screen');

function ProductDataFlateList({ item, themecolor }) {
  const navigation = useNavigation();
  const toast = useToast();

  const [showWishListed, setShowWishListed] = useState(item.wishlist);

  const handleWishListed = async (any) => {
    try {
      var res = await postAddOrRemoveWishlist(any, item.product_id);
      if (res.status == true) {
        if (any == 'add') {
          setShowWishListed(1);
          toast.show(res.msg, {
            type: 'success',
            placement: 'bottom',
            duration: 1000,
            offset: 30,
            animationType: 'slide-in',
          });
        } else {
          setShowWishListed(0);
          toast.show(res.msg, {
            type: 'success',
            placement: 'bottom',
            duration: 1000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
      }
      else if (res.msg == "Invalid Authentication") {
        Alert.alert(
          'Login to continue',
          'Do you want to Login?',
          [
            {
              text: 'No',
              style: 'cancel',
            },
            { text: 'Yes', onPress: () => navigation.navigate("Login", { comeIn: "ComeInProduct" }) },
          ],
        );
      }
      else {
        toast.show(res.msg, {
          type: 'warning',
          placement: 'bottom',
          duration: 1000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (e) {
      console.log('errrror in..handleRemove page wishlist-->', e)
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  return (
    <>
      <View
        style={{
          ...ProductStyle.datalistView,
          backgroundColor: themecolor.BOXBORDERCOLOR,
          borderColor: themecolor.BOXBORDERCOLOR1,
        }}

      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('ProductMoreDetails', {
              productId: item.product_id,
              title: item.title,
            })
          }
          style={{ ...ProductStyle.innerImage }}>
          <Image
            source={{ uri: item.front_image }}
            style={{
              width: "100%",
              height: '100%',
            }}
            resizeMode="center"
          />
        </TouchableOpacity>

        <View
          style={{
            ...ProductStyle.wishlistIconButton,
            backgroundColor: themecolor.BOXBORDERCOLOR
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
              activeOpacity={0.1}
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

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('ProductMoreDetails', {
              productId: item.product_id,
              title: item.title,
            })
          }
          style={{
            ...ProductStyle.inner,
          }}>
          <View>
            <Text
              allowFontScaling={false}
              style={{ ...ProductStyle.txt, color: themecolor.TXTWHITE }}
              numberOfLines={2}>
              {item.title}
            </Text>
          </View>

          {/* <View style={{ margin: 2, width: width * 0.25 }}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={parseFloat(item.rating_num)}
              selectedStar={rating => onStarRatingPress(rating)}
              starSize={14}
              fullStarColor={themecolor.STARCOLOR}
            />
          </View> */}

          <View style={{ flexDirection: 'row', width: '100%' }}>
            {item.purchase_price != "" ?
              <Text
                allowFontScaling={false}
                style={{ ...ProductStyle.txt1, color: themecolor.TEXTGREEN }} numberOfLines={3}>
                <FAIcon name="rupee" size={12}  />
                {item.purchase_price}
                {'  '}
                {(item.purchase_price != item.sale_price) && (item.sale_price != "") ?
                  <Text
                    allowFontScaling={false}
                    style={{
                      ...ProductStyle.txtLine,
                      color: themecolor.TXTGREY,
                    }}>
                    <FAIcon name="rupee" size={12} />
                    {item.sale_price}
                  </Text>
                  : ""}
                {item.discount != '' ?
                  <Text
                    allowFontScaling={false}
                    style={{ ...ProductStyle.txt1, color: themecolor.TEXTRED }}>
                    {'  ('}
                    {item.discount}%{')'}
                  </Text>
                  : ""}
              </Text>
              : <></>}
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

export function ProductDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <>
      <FlatList
        data={props.data}
        renderItem={({ item }) => (
          <ProductDataFlateList item={item} themecolor={themecolor} />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        contentContainerStyle={{
          ...ProductStyle.contentContainerStyle
        }}
        onEndReached={() => {
          props.handleByProduct();
        }}
        ListFooterComponent={() => {
          if (props.isLoading && props.data.length > 5 && props.comeIn=='search') {
            return (
              <LoadingContent />
            );
          }else if (props.isLoading && props.data.length > 9) {
            return (
              <LoadingContent />
            );
          } else {
            return null;
          }
        }}
      />
      <View style={{ marginVertical: 20 }} />
    </>
  );
}
