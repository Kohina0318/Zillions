import React, { } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { ProductStyle } from '../../../../assets/css/CategoryCss/ProductStyle';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';
import FAIcon from 'react-native-vector-icons/FontAwesome';


const { width } = Dimensions.get('screen');

function DashboardProductDataFlateList({ item, themecolor }) {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          ...ProductStyle.datalistView,
          backgroundColor: themecolor.BOXBORDERCOLOR,
          borderColor: themecolor.BOXBORDERCOLOR1,
        }}
        onPress={() => navigation.navigate('ProductMoreDetails', { productId: item.product_id, title: item.title })}
      >
        <View style={{ ...ProductStyle.innerImage }} key={item.product_id}>
          <Image
            source={{ uri: item.front_image }}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode='center'
          />
        </View>

        <View
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

          <View style={{ margin: 2, width: width * 0.25 }}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={parseFloat(item.rating_num)}
              selectedStar={rating => onStarRatingPress(rating)}
              starSize={14}
              fullStarColor={themecolor.STARCOLOR}
            />
          </View>

          <View style={{ flexDirection: 'row', width: '100%' }}>
            {item.purchase_price != "" ?
              <Text allowFontScaling={false} style={{ ...ProductStyle.txt1, color: themecolor.TEXTGREEN }}>
                <FAIcon name="rupee" size={12} />{item.purchase_price}
                {'  '}
                {(item.purchase_price != item.sale_price) && (item.sale_price != "") ?
                  <Text
                    allowFontScaling={false}
                    style={{
                      ...ProductStyle.txtLine,
                      color: themecolor.TXTGREY,
                    }}>
                    <FAIcon name="rupee" size={12} />{item.sale_price}
                  </Text>
                  : ""}
              </Text>
              : <></>}
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
      renderItem={({ item }) => (
        <DashboardProductDataFlateList item={item} themecolor={themecolor} />
      )}
      horizontal={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
