import React, {useEffect, useState} from 'react';
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
import {styles} from '../../../../assets/css/ProductDetailStyle';


const {width, height} = Dimensions.get('screen');

function ProductDetailSizeList({item, themecolor,touch}) {
  const navigation = useNavigation();
  const [showWishListed, setShowWishListed] = useState(true);
// alert('in list')
  const handleWishListed = () => {
    setShowWishListed(!showWishListed);
  };
console.log('data>>>>>>>>>>>>>>>>>>>>',item)
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={touch}
        onPress={() => navigation.navigate('ProductDetail',{productId:item.product_id,title:item.title})}
        >
     <View style={{width:width*0.9,margin:5,flexDirection:'column'}}>
          <View style={{width:width*0.9,flexDirection:'row'}}>
              <Text style={{
            ...styles.HeadText2,
            color: themecolor.TXTWHITE,
            backgroundColor:'grey'
          }}> {item}
          </Text>
          
          </View>
          </View>
      </TouchableOpacity>
    </>
  );
}


function ProductDetailSizeRateList({item, themecolor}) {
  const navigation = useNavigation();
  const [showWishListed, setShowWishListed] = useState(true);
// alert('in list')
  const handleWishListed = () => {
    setShowWishListed(!showWishListed);
  };
console.log('data>>>>>>>>>>>>>>>>>>>>',item)
  return (
    <>
  
          <View style={{width:width*0.9,marginBottom:5,flexDirection:'row'}}>
              <Text style={{
            ...styles.HeadText3,
            color:'grey',
          }}>
          &#8377;{item}
          </Text>
           
         </View>
    </>
  );
}

export function ProductDetailSizeFlatList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

//   console.log("item>>>>>>>>>>>>>>>>>",props)

  return (
    <>
      <FlatList
        data={props.sizes}
        renderItem={({item}) => (
          <ProductDetailSizeList item={item} themecolor={themecolor} />
        )}
        // horizontal={true}
        // contentContainerStyle={{
        //   flexDirection: 'row',
        //   flexWrap: 'wrap',
        //   width: width * 0.94,
        // }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />

<FlatList
        data={props.sizesRate}
        renderItem={({item}) => (
          <ProductDetailSizeRateList item={item} touch={props.touch} themecolor={themecolor} />
        )}
        // horizontal={true}
        // contentContainerStyle={{
        //   flexDirection: 'row',
        //   flexWrap: 'wrap',
        //   width: width * 0.94,
        // }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    </>
  );
}
