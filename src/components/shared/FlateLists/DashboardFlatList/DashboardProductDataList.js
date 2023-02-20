import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {Colors} from '../../../assets/config/Colors';
import { ProductStyle } from '../../../../assets/css/ProductStyle';
import {MyThemeClass} from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import TextTicker from 'react-native-text-ticker';
import StarRating from 'react-native-star-rating';

const {width, height} = Dimensions.get('screen');

function DashboardProductDataFlateList({item, themecolor}) {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          ...ProductStyle.datalistView,
          backgroundColor: themecolor.BOXBORDERCOLOR,
          borderColor: themecolor.BOXBORDERCOLOR1,
        }}>
        <View style={{...ProductStyle.innerImage}}>
          <Image
            source={{uri: item.front_image}}
            style={{
              width: width * 0.38,
              height: '100%',
            }}
            resizeMode="stretch"
          />
        </View>
        <View
          style={{
            ...ProductStyle.inner,
          }}>
          <View>
            <Text
              style={{...ProductStyle.txt, color: themecolor.TXTWHITE}}
              numberOfLines={2}>
              {item.title}
            </Text>
          </View>

          <View style={{margin: 2, width: width * 0.25}}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={item.rating_num}
              selectedStar={rating => onStarRatingPress(rating)}
              starSize={14}
              fullStarColor={themecolor.STARCOLOR}
            />
          </View>

          <View style={{flexDirection: 'row', width: '100%'}}>
            <Text style={{...ProductStyle.txt1, color: themecolor.TEXTGREEN}}>
              ₹{item.purchase_price}
              {'  '}
              <Text
                style={{
                  ...ProductStyle.txtLine,
                  color: themecolor.TXTGREY,
                }}>
                ₹{item.sale_price}
              </Text>
             </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

export function DashboardProductDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({item}) => (
        <DashboardProductDataFlateList item={item} themecolor={themecolor} />
      )}
      horizontal={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
