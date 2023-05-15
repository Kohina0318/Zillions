import React, { } from 'react';
import { TouchableOpacity, View, FlatList, Text } from 'react-native';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { styles } from '../../../../assets/css/CategoryCss/ProductDetailStyle';

function ProductDetailSizeList({ index, touch, selected, onChange, item, themecolor, setSelectedSize, setSelectedSizePrice, productDiscount }) {


  const handleClick = (index, size, amount) => {
    onChange(index)
    setSelectedSize(size)
    setSelectedSizePrice(amount)
  }

  var FinalAmount = ""
  if (productDiscount != '' && productDiscount > 0) {
    var discountPrice = (productDiscount * item.amount) / 100
    FinalAmount = parseFloat(item.amount) - parseFloat(discountPrice)
  }


  return (
    <>
      <TouchableOpacity activeOpacity={0.8} disabled={touch}
        onPress={() => handleClick(index, item.size, item.amount)}>
        <View
          style={{
            ...styles.SizeView,
            borderColor: themecolor.LIGHTGREY,
            backgroundColor: touch == true ? 'transparent' : index == selected ? themecolor.GREY : 'transparent'
          }}>
          <View style={{ ...styles.flexDR }}>
            <Text
              allowFontScaling={false}
              style={{
                ...styles.HeadText2,
                color: themecolor.TXTWHITE,
              }}>
              Size: {item.size}
            </Text>
          </View>
          <View style={{ ...styles.flexDR }}>
            <Text
              allowFontScaling={false}
              style={{
                ...styles.HeadText3,
                color: themecolor.TXTWHITE,
              }}>
              Price:{' '}
              <Text style={{
                ...styles.HeadText3,
                color: FinalAmount != "" ?themecolor.TXTGREY:themecolor.TXTWHITE, textDecorationLine: FinalAmount != "" ?'line-through':'',
                textDecorationStyle: 'solid',
              }}>&#8377;{item.amount} </Text>  
              {FinalAmount != "" ?
              <Text allowFontScaling={false}
                style={{
                  ...styles.HeadText3,
                  color: themecolor.TEXTGREEN,
                }}> &#8377;{FinalAmount} </Text>
              :""}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

export function ProductDetailSizeFlatList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [selected, setSelected] = React.useState(0)

  const handleSelected = (item) => {
    setSelected(item)
  }

  return (
    <>
      <FlatList
        data={props.sizes}
        renderItem={({ item, index }) => (
          <ProductDetailSizeList index={index} touch={props.touch} productDiscount={props.productDiscount} selected={selected} onChange={(value) => handleSelected(value)} item={item} themecolor={themecolor} setSelectedSize={props.setSelectedSize} setSelectedSizePrice={props.setSelectedSizePrice} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    </>
  );
}
