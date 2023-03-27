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

const {width, height} = Dimensions.get('screen');

function BrandDataFlatList({item, themecolor}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.8}
    onPress={() => navigation.navigate('Products',{Id:item.brand_id,Name:item.brand_name,speciality:"brand"})}
    >
      <View
        style={{
          width: width * 0.284,
          height: height * 0.13,
          margin: 5,
          flexDirection: 'column',
        }}>
        <View
          style={{
            width: width * 0.26,
            height: '65%',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            margin: 3,
            borderWidth: 4,
            borderColor: '#E9E9E9',
            borderWidth:0.5,
            borderRadius: 5,
            backgroundColor: '#FFF',
          }}>
          <Image
            source={{uri: item.banner}}
            resizeMode="contain"
            style={{width: 150, height: '60%'}}
          />
        </View>
        <View
          style={{
            width: width * 0.27,
            height: height * 0.03,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
           allowFontScaling={false}
            numberOfLines={1}
            style={{
              color: themecolor.TXTWHITE,
              fontSize: 11,
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
   const[index,setIndex]=useState(15)

  return (
    <FlatList
      data={props.data}
      renderItem={({item}) => (
        <BrandDataFlatList item={item} themecolor={themecolor} />
      )}
      horizontal={props.horizontal}
      numColumns={props.numColumns}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={true}
      onEndReached={() => {
        props.handleBrands(index);
        setIndex(index+15)
      }}
      ListFooterComponent={() => {
        if (props.isLoading) {
          return (
            <LoadingContent/>
          );
        } else {
          return null;
        }
      }}
    />
  );
}
