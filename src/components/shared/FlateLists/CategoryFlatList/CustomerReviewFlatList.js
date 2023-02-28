import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { styles } from '../../../../assets/css/ProductDetailStyle';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import { Avatar } from '@rneui/themed';
import StarRating from 'react-native-star-rating';

const {width} = Dimensions.get('screen');

function CustomerReviewList({item, themecolor}) {

  return ( 

   <View style={{width: width * 0.9, marginTop: 10, margin: 5}}>
      <View>
        <Text style={{...styles.TimeText}}>
         {item.create_at}
        </Text>

        <View style={{...styles.subView,borderColor:themecolor.TXTGREYS}}>
          <View style={{...styles.avatarView}}>
            <Avatar
              size={40}
              rounded
              avatarStyle={{
                borderWidth: 1.5,
                borderColor: themecolor.TXTWHITE,
              }}
              source={require('../../../../assets/images/admin.png')}
            />
            <Text
              style={{
                ...styles.avatarText,
                color: themecolor.TXTWHITE,
              }}>
              {item.name}
            </Text>
          </View>
          <View style={{...styles.starView}}>
            <View style={{width: width * 0.3}}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={item.rating_no}
                selectedStar={rating => onStarRatingPress(rating)}
                starSize={16}
                fullStarColor={themecolor.STARCOLOR}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export function CustomerReviewFlatList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return ( 
    <FlatList
      data={props.data}
      renderItem={({item}) => (
        <CustomerReviewList item={item} themecolor={themecolor} />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
