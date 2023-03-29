import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { CategoryStyle } from '../../../../assets/css/CategoryCss/CategoryStyle';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import LoadingContent from '../../Loader/LoadingContent';

function SubCategoryDataFlateList({ item, themecolor }) {

  const navigation = useNavigation();
 
  return (
    <TouchableOpacity activeOpacity={0.8}
      style={{
        ...CategoryStyle.datalistView,
        backgroundColor: themecolor.BOXBORDERCOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}
      onPress={() => navigation.navigate('Products', { Id: item.sub_category_id, Name: item.sub_category_name, speciality: "sub_category" })}
    >
      <View style={{ ...CategoryStyle.innerImage }}>
        <Image
          source={{ uri: item.banner }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 50,
          }}
          resizeMode="center"
        />
      </View>
      <View style={{ ...CategoryStyle.margleft15 }}>
        <Text allowFontScaling={false} style={{ ...CategoryStyle.txt, color: themecolor.TXTWHITE }}>
          {item.sub_category_name}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", left: 5, }}>
        {item.no_of_product < '99' ?
          <Text allowFontScaling={false} style={{ ...CategoryStyle.txt1, backgroundColor: themecolor.STARCOLOR }}> {item.no_of_product} </Text>
          : 
          <Text allowFontScaling={false} style={{ ...CategoryStyle.txt1, backgroundColor: themecolor.STARCOLOR }}> 99+ </Text>
        }
        <View
          style={{ ...CategoryStyle.iconview, borderRadius: 50, padding: 2 }}
        >
          <FontAwesome name='angle-right' size={25} color={themecolor.BACKICON} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function SubCategoryDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  
  return (
    <>
      <FlatList
        data={props.data}
        renderItem={({ item }) => (
          <SubCategoryDataFlateList item={item} themecolor={themecolor} />
        )}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        onEndReached={() => {
          props.handleSubCategories();
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
      <View style={{ marginVertical: 20 }} />
    </>
  );
}
