import React,{useState} from 'react';
import {TouchableOpacity, View, FlatList, Text, Dimensions,ScrollView} from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from '../../assets/css/searchStyle';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import FA from 'react-native-vector-icons/FontAwesome'

export const SortSlider = (props) => {

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();
    const [sortBy,setSortBy]=useState('')
    const [category,setCategory]=useState('')
    const [brand,setBrand]=useState('')
    const [size,setSize]=useState('')
    const [price,setPrice]=useState('')

    const handleClear=()=>{
        setBrand('')
        setCategory('')
        setPrice('')
        setSize('')
        setSortBy('')
    }

    const handleClick=(item)=>{
       if(item==1)
       { 
        setSortBy('SortBy')
        props.onChange('SortBy')
       }
       if(item==2)
       {
setBrand("Brand")
props.onChange('Brand')
       }
       if(item==3)
       {
        setCategory("Category")
        props.onChange('Category')
       }
       if(item==4)
       {
        setPrice("Price")
        props.onChange('Price')
       }
       if(item==5)
       {
        setSize("Size")
        props.onChange('Size')
       }
    }

  return (
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection:'row'}}>
  <TouchableOpacity activeOpacity={0.8}
      onPress={()=>handleClick(1)}>
        <View
          style={{
         ...styles.SizeView,
            borderColor:sortBy=='SortBy'?themecolor.BLUEWHITE:themecolor.TXTGREYS, 
            backgroundColor:'transparent' 
          }}>
          <View style={{...styles.flexDR}}>
            <Text
              allowFontScaling={false}
              style={{
                ...styles.HeadText2,
                color:sortBy=='SortBy'?themecolor.BLUEWHITE:themecolor.TXTWHITE
              }}>
             Sort By
            </Text>
            <FA name='angle-down' style={{alignSelf:'center',marginLeft:5}} size={16} color={sortBy=='SortBy'?themecolor.BLUEWHITE:themecolor.TXTWHITE} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}
      onPress={()=>handleClick(2)}>
        <View
          style={{
         ...styles.SizeView,
            borderColor:brand=='Brand'?themecolor.BLUEWHITE:themecolor.TXTGREYS, 
            backgroundColor:'transparent' 
          }}>
          <View style={{...styles.flexDR}}>
            <Text
              allowFontScaling={false}
              style={{
                ...styles.HeadText2,
                color:brand=='Brand'?themecolor.BLUEWHITE:themecolor.TXTWHITE,
              }}>
              Brands
            </Text>
            <FA name='angle-down' style={{alignSelf:'center',marginLeft:5}} size={16} color={brand=='Brand'?themecolor.BLUEWHITE:themecolor.TXTWHITE} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}
      onPress={()=>handleClick(3)}>
        <View
          style={{
         ...styles.SizeView,
            borderColor:category=='Category'?themecolor.BLUEWHITE:themecolor.TXTGREYS, 
            backgroundColor:'transparent' 
          }}>
          <View style={{...styles.flexDR}}>
            <Text
              allowFontScaling={false}
              style={{
                ...styles.HeadText2,
                color:category=='Category'?themecolor.BLUEWHITE:themecolor.TXTWHITE,
              }}>
             Category
            </Text>
            <FA name='angle-down' style={{alignSelf:'center',marginLeft:5}} size={16} color={category=='Category'?themecolor.BLUEWHITE:themecolor.TXTWHITE} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}
      onPress={()=>handleClick(4)}>
        <View
          style={{
         ...styles.SizeView,
            borderColor:price=="Price"?themecolor.BLUEWHITE:themecolor.TXTGREYS, 
            backgroundColor:'transparent' 
          }}>
          <View style={{...styles.flexDR}}>
            <Text
              allowFontScaling={false}
              style={{
                ...styles.HeadText2,
                color:price=="Price"?themecolor.BLUEWHITE:themecolor.TXTWHITE,
              }}>
             Price
            </Text>
            <FA name='angle-down' style={{alignSelf:'center',marginLeft:5}} size={16} color={price=="Price"?themecolor.BLUEWHITE:themecolor.TXTWHITE} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}
      onPress={()=>handleClick(5)}>
        <View
          style={{
         ...styles.SizeView,
            borderColor:size=="Size"?themecolor.BLUEWHITE:themecolor.TXTGREYS, 
            backgroundColor:'transparent' 
          }}>
          <View style={{...styles.flexDR}}>
            <Text
              allowFontScaling={false}
              style={{
                ...styles.HeadText2,
                color:size=="Size"?themecolor.BLUEWHITE:themecolor.TXTWHITE,
              }}>
              Size
            </Text>
            <FA name='angle-down' style={{alignSelf:'center',marginLeft:5}} size={16} color={size=="Size"?themecolor.BLUEWHITE:themecolor.TXTWHITE} />
          </View>
        </View>
      </TouchableOpacity>
      {sortBy=='SortBy'||brand=='Brand'||category=='Category'||price=="Price"||size=="Size"?
<TouchableOpacity activeOpacity={0.8}
      onPress={()=>handleClear()}>
        <View
          style={{
         ...styles.SizeView1,
            backgroundColor:'transparent' 
          }}>
          <View style={{...styles.flexDR}}>
            <Text
              allowFontScaling={false}
              style={{
                ...styles.HeadText2,
                color:themecolor.BLUEWHITE,
              }}>
             Clear All
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      :
      <></>}

  </ScrollView>
  )
}
