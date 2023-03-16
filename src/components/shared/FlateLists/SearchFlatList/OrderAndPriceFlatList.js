import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {styles} from '../../../../assets/css/SearchCss/searchStyle';
import {MyThemeClass} from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import {CheckBox} from '@rneui/themed';
import { onChange } from 'react-native-reanimated';

const {width, height} = Dimensions.get('screen');

const data = [
  {
    id: 1,
    order: 'Price Low to High',
    sort: 'price_low',
  },
  {
    id: 2,
    order: 'Price High to Low',
    sort: 'price_high',
  },
  {
    id: 3,
    order: 'Oldest',
    sort: 'condition_old',
  },
  {
    id: 4,
    order: 'Newest',
    sort: 'condition_new',
  },
  {
    id: 5,
    order: 'Most Viewed',
    sort: 'most_viewed',
  },
];

const dataPrice = [
  {
    id: 1,
    price: 'Rs.200 and Below',
    priceSort:'0-200',
  },
  {
    id: 2,
    price: 'Rs.300 - Rs.499',
    priceSort:'300-499',
  },
  {
    id: 3,
    price: 'Rs.500 - Rs.999',
    priceSort:'500-999',
  },
  {
    id: 4,
    price: 'Rs.1000 - Rs.1499',
    priceSort:'1000-1499',
  },
  {
    id: 5,
    price: 'Rs.1500 - Rs.1999',
    priceSort:'1500-1999',
  },
  {
    id: 6,
    price: 'Rs.2000 - Rs.2999',
    priceSort:'2000-2999',
  },
  {
    id: 7,
    price: 'Rs.3000 and above',
    priceSort:'3000-1000000',
  },
];


function OrderList({item,index,selectedIndex,onChange1, themecolor,onChange}) {

  const handleChange=(item,index)=>{
    onChange(item)
    onChange1(index)
  }

  return (
    <>
      <View key={item.id} style={{...styles.checkboxContainer,width:width*0.8}}>
        <CheckBox
          center
          title={item.order}
          checked={selectedIndex==index?true:false}
          onPress={() =>handleChange(item.sort,index) }
          textStyle={{color: themecolor.TXTWHITE}}
          checkedColor={themecolor.ADDTOCARTBUTTONCOLOR}
          containerStyle={{backgroundColor: 'transparent'}}
        />
      </View>
    </>
  );
}

export function OrderFlatList({onChange}) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [selectedIndex, setIndex] = React.useState(-1);

  const onChange1=(value)=>{
    setIndex(value)
  }

  return (
    <>
      <FlatList
        data={data}
        renderItem={({item,index}) => (
          <OrderList item={item} index={index} selectedIndex={selectedIndex} onChange1={(value)=>onChange1(value)} themecolor={themecolor} onChange={onChange} />
        )}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    </>
  );
}

function PriceList({item,index,selectedIndex,onChange1, themecolor,onChange}) {
  const [checked, setChecked] = useState(false);
  const handleChange=(item,index)=>{
    onChange(item)
    onChange1(index)
  }
  return (
    <>
      <View key={item.id} style={{...styles.checkboxContainer,width: width *0.45}}>
        <CheckBox
          center
          title={item.price}
          checked={selectedIndex==index?true:false}
          onPress={() =>handleChange(item.priceSort,index) }
          textStyle={{color: themecolor.TXTWHITE}}
          checkedColor={themecolor.ADDTOCARTBUTTONCOLOR}
          containerStyle={{backgroundColor: 'transparent'}}
        />
      </View>
    </>
  );
}

export function PriceFlatList({onChange}) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [selectedIndex, setIndex] = React.useState(-1);

  const onChange1=(value)=>{
    setIndex(value)
  }

  return (
    <>
      <FlatList
        data={dataPrice}
        renderItem={({item,index}) => (
          <PriceList item={item} index={index} selectedIndex={selectedIndex} onChange1={(value)=>onChange1(value)} themecolor={themecolor} onChange={onChange} />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    </>
  );
}
