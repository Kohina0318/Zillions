import React, {} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Dimensions,
} from 'react-native';
import {MyThemeClass} from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Avatar} from '@rneui/themed';

const {width} = Dimensions.get('screen');

function CategoryDataFlatList({item, themecolor}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('SubCategories', {
          categoryId: item.category_id,
          categoryName: item.category_name,
        })
      }>
      <View
        style={{
          margin: 8,
          width: width * 0.18,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Avatar
          size={60}
          rounded
          avatarStyle={{
            borderWidth: 5,
            borderColor: 'white',
          }}
          source={{uri: item.banner}}
        />
        <Text allowFontScaling={false} style={{color: themecolor.TXTWHITE,fontSize:11}} numberOfLines={1}>
          {item.category_name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export function DashboardCategoryDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({item}) => (
        <CategoryDataFlatList item={item} themecolor={themecolor} />
      )}
      horizontal={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
