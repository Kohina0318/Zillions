import React, { } from 'react';
import { TouchableOpacity, View, FlatList, Text} from 'react-native';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { styles } from '../../../../assets/css/CategoryCss/ProductDetailStyle';

function ProductDetailSizeList({ index, touch, selected, onChange, item, themecolor, setSelectedSize,setSelectedSizePrice }) {


  const handleClick = (index, size , amount) => {
    onChange(index)
    setSelectedSize(size)
    setSelectedSizePrice(amount)
  }
  
  return (
    <>
      <TouchableOpacity activeOpacity={0.8} disabled={touch}
        onPress={() => handleClick(index, item.size , item.amount)}>
        <View
          style={{
            ...styles.SizeView,
            borderColor: themecolor.LIGHTGREY,
            backgroundColor: touch == true ? 'transparent':index == selected ? themecolor.GREY : 'transparent'
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
              Price: &#8377;{item.amount}
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
          <ProductDetailSizeList index={index} touch={props.touch} selected={selected} onChange={(value) => handleSelected(value)} item={item} themecolor={themecolor} setSelectedSize={props.setSelectedSize} setSelectedSizePrice={props.setSelectedSizePrice} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    </>
  );
}
