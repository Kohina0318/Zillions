import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { Colors } from '../../../../assets/config/Colors';
import { styles } from '../../../../assets/css/WishListStyle';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import HalfSizeButton from '../../button/halfSizeButton';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { postAddOrRemoveWishlist } from '../../../../repository/WishListRepository/WishListRepo';
import { useToast } from 'react-native-toast-notifications';

const { width, height } = Dimensions.get('screen');

function WishListDataFlateList({ item, themecolor, setRefresh, refresh }) {
  const navigation = useNavigation();
  const toast = useToast();

  const handleRemove = async () => {
    try {
      var res = await postAddOrRemoveWishlist('remove', item.product_id);
      if (res.status == true) {
        setRefresh(!refresh)
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
    <>
      <View
        style={{
          ...styles.datalistView,
          backgroundColor: themecolor.BOXBORDERCOLOR,
          borderColor: themecolor.BOXBORDERCOLOR1,
        }}
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
            navigation.navigate('ProductDetail', {
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
                width: width * 0.36,
                height: '100%',
              }}
              resizeMode="stretch"
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
          <HalfSizeButton
            title="Add to Cart"
            icon={
              <Feather
                name="shopping-cart"
                size={14}
                color={themecolor.BACKICON}
              />
            }
            backgroundColor={'transparent'}
            color={themecolor.BACKICON}
            borderColor={'transparent'}
            fontSize={14}
            height={width * 0.08}
          // onPress={() => handleSetDefaultAddress(item.id)}
          />
        </View>
      </View>
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
        <WishListDataFlateList item={item} themecolor={themecolor} setRefresh={props.setRefresh} refresh={props.refresh} />
      )}
      // horizontal={true}
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: width * 0.945,
      }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
