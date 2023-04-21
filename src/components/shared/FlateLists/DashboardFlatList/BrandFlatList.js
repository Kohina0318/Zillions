import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {MyThemeClass} from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import LoadingContent from '../../Loader/LoadingContent';

const { width, height } = Dimensions.get('screen');

function BrandDataFlatList({ item, themecolor,boxSize }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.8}
      onPress={() => navigation.navigate('Products', { Id: item.brand_id, Name: item.brand_name, speciality: "brand" })}
    >
      <View
        style={{
          width: boxSize =="big"? '100%' :width * 0.284,
          height: boxSize =="big"?height * 0.15:height * 0.13,
          margin:5,
          flexDirection: 'column',
          alignItems:'center',
        }}>
        <View
          style={{
            width: boxSize =="big"?width * 0.42:width * 0.26,
            height: boxSize =="big"?'75%':'65%',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            margin: 3,
            borderWidth: 4,
            borderColor: '#E9E9E9',
            borderWidth: 0.5,
            borderRadius: 5,
            backgroundColor: '#FFF',
          }}>
          <Image
            source={{ uri: item.banner }}
            resizeMode="contain"
            style={{ width: '50%', height: '50%' }}
          />
        </View>
        <View
          style={{
            marginTop:5
          }}>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={{
              color: themecolor.TXTWHITE,
              fontSize: boxSize =="big"?12:11,
              fontWeight: 'bold',
            }}>
            {item.brand_name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function BrandDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => (
        <BrandDataFlatList item={item} themecolor={themecolor} boxSize={props.boxSize} />
      )}
      horizontal={props.horizontal}
      numColumns={props.numColumns}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={props.contentContainerStyle}
      scrollEnabled={true}
      onEndReached={() => {
        props.handleBrands();
      }}
      ListFooterComponent={() => {
        if (props.isLoading && props.data.length > 9) {
          return (
            <LoadingContent />
          );
        } else {
          return null;
        }
      }}
    />
  );
}
