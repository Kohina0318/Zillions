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
import {styles} from '../../../../assets/css/OrderStyle';
import {MyThemeClass} from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import StarRating from 'react-native-star-rating';

const {width} = Dimensions.get('screen');

function OrderDataFlateList({item, themecolor}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        ...styles.datalistView,
        backgroundColor: themecolor.BOXBORDERCOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}
      onPress={() => navigation.navigate('OrderDetails',{productDetails:item.product_details,saleCode:item.sale_code})}
    >
      <View style={{...styles.flexDirView}}>
        <Text style={{...styles.txt, color: themecolor.TXTWHITE}}>
          Delivered on feb 09 2022
        </Text>
      </View>

      <View style={{...styles.marTop}} />

      <View style={{...styles.flexDirView1}}>

        {/* <View style={{...styles.innerImage}}>
          <Image
            source={require('../../../../assets/images/logo.png')}
            // source={{uri: item.banner}}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
            }}
            resizeMode='contain'
          />
        </View> */}

        <View >
          <Text style={{...styles.txt1, color: themecolor.TXTWHITE}} numberOfLines={2}>
            Sale Code :
          </Text>
        </View>
        <View style={{...styles.flexRow}}>
          <Text style={{...styles.txt1, color: themecolor.ADDTOCARTBUTTONCOLOR}} numberOfLines={2}>
            #{item.sale_code}
          </Text>
        </View>

        <View style={{...styles.iconview}}>
          <FontAwesome
            name="angle-right"
            size={25}
            color={themecolor.BACKICON}
          />
        </View>
      </View>

      {/* <View style={{...styles.marTop}} /> */}

      {/* <View style={{...styles.flexDirView, justifyContent: 'space-between'}}>
        <View>
          <Text style={{...styles.txt1, color: themecolor.TXTGREYS}}>
            Rate this product now
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.8} style={{width:width*0.32}}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={0}
            selectedStar={rating => onStarRatingPress(rating)}
            starSize={18}
            fullStarColor={themecolor.STARCOLOR}
          />
        </TouchableOpacity>
      </View> */}

    </TouchableOpacity>
  );
}

export function OrderDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({item}) => (
        <OrderDataFlateList item={item} themecolor={themecolor} />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
