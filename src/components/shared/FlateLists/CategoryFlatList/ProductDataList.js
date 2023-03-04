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
import {ProductStyle} from '../../../../assets/css/ProductStyle';
import {MyThemeClass} from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import StarRating from 'react-native-star-rating';
import FAIcon from 'react-native-vector-icons/FontAwesome';


const {width, height} = Dimensions.get('screen');

function ProductDataFlateList({item, themecolor}) {
  const navigation = useNavigation();
  const [showWishListed, setShowWishListed] = useState(true);

  const handleWishListed = () => {
    setShowWishListed(!showWishListed);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          ...ProductStyle.datalistView,
          backgroundColor: themecolor.BOXBORDERCOLOR,
          borderColor: themecolor.BOXBORDERCOLOR1,
        }}
        onPress={() => navigation.navigate('ProductDetail',{productId:item.product_id,title:item.title})}
        >
        <View style={{...ProductStyle.innerImage, }}>
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
            justifyContent: 'flex-end',
            marginTop: -30,
            alignItems: 'flex-end',
            alignSelf: 'flex-end',
            padding: 5,
          }}>
          {showWishListed ? (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleWishListed()}>
              <FontAwesome
                name="heart-o"
                size={20}
                color={themecolor.TEXTRED}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleWishListed()}>
              <FontAwesome name="heart" size={20} color={themecolor.TEXTRED} />
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            ...ProductStyle.inner,
          }}>
          <View>
            <Text
              allowFontScaling={false}
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
            <Text allowFontScaling={false} style={{...ProductStyle.txt1, color: themecolor.TEXTGREEN}}>
              <FAIcon name="rupee" size={12} />{item.purchase_price}
              {'  '}
              <Text
               allowFontScaling={false}
                style={{
                  ...ProductStyle.txtLine,
                  color: themecolor.TXTGREY,
                }}>
                <FAIcon name="rupee" size={12} />{item.sale_price}
              </Text>
              <Text allowFontScaling={false}  style={{...ProductStyle.txt1, color: themecolor.TEXTRED}}>
                {'  ('}
                {item.discount}%{')'}
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
        renderItem={({item}) => (
          <ProductDataFlateList item={item} themecolor={themecolor} />
        )}
        // horizontal={true}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: width * 0.94,
        }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
      <View style={{marginVertical: 20}} />
    </>
  );
}
