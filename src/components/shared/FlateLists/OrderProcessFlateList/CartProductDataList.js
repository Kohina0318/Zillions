import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { styles } from '../../../../assets/css/OrderProcessStyle/CartStyle';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FAIcon from 'react-native-vector-icons/FontAwesome';


const {width} = Dimensions.get('screen');

function CartProductDataFlateList({item, themecolor}) {

  const navigation = useNavigation();

  
  return (
      <TouchableOpacity activeOpacity={0.8}
        style={{
          ...styles.datalistView,
          backgroundColor: themecolor.BOXBORDERCOLOR,
          borderColor: themecolor.BOXBORDERCOLOR1,
        }}
        // onPress={() => navigation.navigate('SubCategories',{categoryId:item.category_id,categoryName:item.category_name})}
        >
        <View style={{flexDirection:"row", width:"100%",}}>
        <View style={{...styles.innerImage,}}>
          <Image
            source={{uri: item.banner}}
            style={{
              width: 70,
              height: 70,
              borderRadius: 4,
            }}
          />
        </View>
        <View style={{...styles.margleft15,width:"74%",backgroundColor:"yellow"}}>

          <Text allowFontScaling={false} style={{...styles.txt, color: themecolor.TXTWHITE}}>
          kojhinn
          </Text>

          <View style={{ flexDirection: 'row', width: '100%' }}>
            <Text
              allowFontScaling={false}
              style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>
              <FAIcon name="rupee" size={12} />
              100
              {'  '}
              <Text
                allowFontScaling={false}
                style={{
                  ...styles.txtLine,
                  color: themecolor.TXTGREY,
                }}>
                <FAIcon name="rupee" size={12} />
              200
              </Text>
              <Text
                allowFontScaling={false}
                style={{ ...styles.txt1, color: themecolor.TEXTRED }}>
                {'  ('}
                30%{')'}
              </Text>
            </Text>
          </View>

          <Text allowFontScaling={false} style={{...styles.txtSave, color: themecolor.TEXTGREEN}}>
          You Save : <FAIcon name="rupee" size={12} /> 1000 
          </Text>
         
        </View>
        </View>
        
        <View style={{}} />
        
      </TouchableOpacity>
  );
}

export function CartProductDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return ( 
    <FlatList
      data={props.data}
      renderItem={({item}) => (
        <CartProductDataFlateList item={item} themecolor={themecolor} />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
