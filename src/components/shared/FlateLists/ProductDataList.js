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
import {ProductStyle} from '../../../assets/css/ProductStyle';
import {MyThemeClass} from '../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import TextTicker from 'react-native-text-ticker';
import StarRating from 'react-native-star-rating';

const {width, height} = Dimensions.get('screen');

function ProductDataFlateList({item, themecolor}) {
  const navigation = useNavigation();

  return (
    <>
      <View
        style={{
          ...ProductStyle.datalistView,
          backgroundColor: themecolor.BOXTHEMECOLOR,
          borderColor: themecolor.BOXBORDERCOLOR1,
        }}>
        <View style={{...ProductStyle.innerImage}}>
          <Image
            // source={{uri: imageTemp}}
            source={require('../../../assets/images/hammerIcon.jpg')}
            style={{
              width: width * 0.42,
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
            <TextTicker
              style={ProductStyle.txt}
              // duration={10000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={5000}>
              {item.title}
            </TextTicker>
          </View>

          <View style={{margin:2}}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={item.rate}
              selectedStar={rating => onStarRatingPress(rating)}
              starSize={17}
              fullStarColor={themecolor.STARCOLOR}
            />
          </View>

          <View style={{flexDirection: 'row',}}>
            <Text style={{...ProductStyle.txt1, color: themecolor.TEXTGREEN}}>
              ₹{item.ptr}
              {'  '}
            </Text>
            <Text
              style={{
                ...ProductStyle.txtLine,
                color: themecolor.TXTGREY,
               }}>
              ₹{item.mrp}
            </Text>
            <Text style={{...ProductStyle.txt1, color: themecolor.TEXTRED}}>
              {'  ( '}
              {item.discount}%{' ) '}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

export function ProductDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({item}) => (
        <ProductDataFlateList item={item} themecolor={themecolor} />
      )}
      horizontal={true}
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: width * 0.94,
      }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
