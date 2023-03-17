
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import Carousel from 'react-native-banner-carousel';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../../assets/css/CategoryCss/ProductDetailStyle';
import { postAddOrRemoveWishlist } from '../../../../repository/WishListRepository/WishListRepo';
import { useToast } from 'react-native-toast-notifications';

const { width, height } = Dimensions.get('screen');

export default function ProductMoreDetailMainComp(props) {

  const toast = useToast();
  const navigation = useNavigation();

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  var productDetailData = props.productDetail;

  const [showWishListed, setShowWishListed] = useState(parseInt(props.productDetail.wishlist));

  const [allImages, setAllImages] = React.useState(props.productDetail.all_image);
  const [largeImage, setLargeImage] = React.useState(0);

  function renderimage(image, index) {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          props.setImage(image), props.setModalVisible(true);
        }}
      >
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
      var ProductId = productDetailData.product_id;

      var res = await postAddOrRemoveWishlist(any, ProductId);
      if (res.status == true) {
        if (any == 'add') {
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
            { text: 'Yes', onPress: () => navigation.navigate('Login') },
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


  return (
    <View
      style={{
        ...styles.datalistView,
        backgroundColor: themecolor.BOXBORDERCOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}
    >
      <View style={{ ...styles.MrT5 }} />

      {allImages.length > 0 ?
        <View style={{ ...styles.innerViewMain }}>
          <Carousel
            autoplay={false}
            index={largeImage}
          >
            {allImages.map((image, index) => renderimage(image, index))}
          </Carousel>
        </View>
        : <>
        </>
      }


      <View style={{ ...styles.MrT5 }} />

      <View style={{ ...styles.innerViewMain }}>
        <Text
          allowFontScaling={false}
          style={{
            ...styles.HeadText1,
            color: 'grey',
          }}>
          {`${productDetailData.brand_name} >> ${productDetailData.category_name} >> ${productDetailData.sub_category_name} >>`}
        </Text>
      </View>


      <View style={{ ...styles.MrT5 }} />


      <View style={{ ...styles.innerViewMain, }}>
        <View style={{ width: "74%" }}>
          <Text
            allowFontScaling={false}
            style={{
              ...styles.HeadText,
              color: themecolor.TXTWHITE,
            }}>
            {productDetailData.title}
          </Text>
        </View>

        <View style={{ width: "13%" }}>
          {showWishListed === 1 ? (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleWishListed('remove')}
              style={{
                padding: 5,
                borderRadius: 25,
                alignItems: "center"
              }}>
              <FontAwesome name="heart" size={23} color={themecolor.TEXTRED} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleWishListed('add')}
              style={{
                padding: 5,
                borderRadius: 25,
                alignItems: "center"
              }}>
              <FontAwesome
                name="heart-o"
                size={23}
                color={themecolor.TEXTRED}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={{ width: "13%", }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              Linking.openURL(
                `whatsapp://send?text=${productDetailData.slug}&phone=918446361881`,
              )
            }
            style={{
              padding: 5,
              borderRadius: 25,
              alignItems: "center"
            }}>
            <Image
              source={require('../../../../assets/images/whatsapp.png')}
              resizeMode="contain"
              style={{ width: 50, height: 25, }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ ...styles.MrT5 }} />


      <View style={{ ...styles.innerViewMain, }}>
        <View style={{ width: width * 0.35 }}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={parseFloat(productDetailData.rating_num)}
            selectedStar={rating => onStarRatingPress(rating)}
            starSize={18}
            fullStarColor={themecolor.STARCOLOR}
          />
        </View>
      </View>

      <View style={{ ...styles.MrT5 }} />

      <View style={{ ...styles.innerViewMain, }}>
        <Text
          allowFontScaling={false}
          style={{ ...styles.RateText, color: themecolor.TXTWHITE }}>
          MRP :{' '}
          <Text
            allowFontScaling={false}
            style={{ ...styles.RateTextBig1, color: themecolor.TEXTGREEN }}>
            {'  '}
            <FAIcon name="rupee" size={15} />
            {productDetailData.purchase_price}/{productDetailData.unit}{' '}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              ...styles.RateTextBig,
              color: themecolor.TXTGREYS,
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

      <View style={{ ...styles.MrT5 }} />

    </View>

  )
}