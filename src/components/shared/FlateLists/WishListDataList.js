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
import {styles} from '../../../assets/css/WishListStyle';
import {MyThemeClass} from '../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

function WishListDataFlateList({item, themecolor}) {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          ...styles.datalistView,
          backgroundColor: themecolor.BOXBORDERCOLOR,
          borderColor: themecolor.BOXBORDERCOLOR1,
        }}>
        <View style={{...styles.innerImage}}>
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
            ...styles.inner,
          }}>
          <View>
            <Text
              style={{...styles.txt, color: themecolor.TXTWHITE}}
              numberOfLines={2}>
              {item.title}
            </Text>
          </View>

          <View style={{flexDirection: 'row', width: '100%'}}>
            <Text style={{...styles.txt1, color: themecolor.TEXTGREEN}}>
              ₹ {item.purchase_price}
              {'  '}
              <Text
                style={{
                  ...styles.txtLine,
                  color: themecolor.TXTGREY,
                }}>
                ₹ {item.sale_price}
              </Text>
              <Text style={{...styles.txt1, color: themecolor.TEXTRED}}>
                {'  ('}
                {item.discount}%{')'}
              </Text>
            </Text>
          </View>

          <View style={{marginTop:3}}>
            <TouchableOpacity
            // onPress={() => setshowCompetitionModal(true)}
            >
              <View
                style={{
                  ...styles.AddButton,
                  backgroundColor: themecolor.HEADERTHEMECOLOR,
                }}>
                <Text style={styles.AddButtonIcon}>Add to cart</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

export function WishListDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({item}) => (
        <WishListDataFlateList item={item} themecolor={themecolor} />
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
