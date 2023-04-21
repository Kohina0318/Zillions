import React, { useState} from 'react';
import {

  View,
  FlatList,
  Dimensions,
} from 'react-native';
import {styles} from '../../../../assets/css/SearchCss/searchStyle';
import {MyThemeClass} from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import {CheckBox} from '@rneui/themed';
import { store } from '../../../../../App';

const {width} = Dimensions.get('screen');

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


function OrderList({item,index,selectedIndex,onChange1, themecolor,}) {

  const handleChange=(item,index)=>{
    onChange1(index)
    store.dispatch({type:'ADD_SEARCH_FILTER_SORT_BY_TEMPORARY', payload: [index ,{index:index,item: item}] })
  }

  return (
    <>
      <View key={item.id} style={{...styles.checkboxContainer,width:width*0.9, }}>
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

export function SortByFlatList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const selected = useSelector(state => state.searchFilterSortBy);
  const [selectedIndex, setIndex] = React.useState(Object.keys(selected)[0]);
  

  const onChange1=(value)=>{
    setIndex(value)
    props.setOffset(0)
    props.setProductData([])
  }

  return (
    <>
      <FlatList
        data={data}
        renderItem={({item,index}) => (
          <OrderList item={item} index={index} selectedIndex={selectedIndex} onChange1={(value)=>onChange1(value)} themecolor={themecolor}  />
        )}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    </>
  );
}

function PriceList({item,index,selectedIndex,onChange1, themecolor,}) {
   
  const handleChange=(item,index)=>{
    onChange1(index)
    store.dispatch({type:'ADD_SEARCH_FILTER_PRICE_BY_TEMPORARY', payload: [index ,{index:index,item: item}] })
  
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

export function PriceFlatList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const selected = useSelector(state => state.searchFilterPriceBy);
  const [selectedIndex, setIndex] = React.useState(Object.keys(selected)[0]);

  const onChange1=(value)=>{
    setIndex(value)
    props.setOffset(0)
    props.setProductData([])
  }

  return (
    <>
      <FlatList
        data={dataPrice}
        renderItem={({item,index}) => (
          <PriceList item={item} index={index} selectedIndex={selectedIndex} onChange1={(value)=>onChange1(value)} themecolor={themecolor} />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    </>
  );
}
