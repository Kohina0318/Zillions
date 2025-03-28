import React, { useEffect, useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { styles } from '../../../../assets/css/CartCss/CartStyle';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import AN from 'react-native-vector-icons/AntDesign';
import { RBSheetData } from '../../RBSheet/RBSheetData';
import Feather from 'react-native-vector-icons/Feather';
import { useToast } from 'react-native-toast-notifications';
import { getRemoveProduct } from '../../../../repository/OrderProcessRepository/RemoveProductRepo';
import { CartQtyRSSheet } from '../../RBSheet/CartQtyRSSheet';
import { getCartProductQuantityUpdate } from '../../../../repository/OrderProcessRepository/CartQuantityUpdateRepo';
import { store } from '../../../../../App';

const { width } = Dimensions.get('screen');

function CartProductDataFlateList({ item, themecolor, refresh, setRefresh }) {
  const toast = useToast();
  const refRBSheet = useRef();
  const navigation = useNavigation();

  const [qty, setQty] = useState(parseInt(item.qty))

  const handleRemoveProduct = async () => {
    try {

      var res = await getRemoveProduct(item.id)
      if (res.status == true) {
        var pi = item.product_id+' '+item.size;
        store.dispatch({ type: 'DEL_CART', payload: [pi] })
        setRefresh(!refresh)
        toast.show(res.msg, {
          type: 'success',
          placement: 'bottom',
          duration: 1000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else {
        toast.show(res.msg, {
          type: 'warning',
          placement: 'bottom',
          duration: 1000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (e) {
      console.log('errrror in..handleRemoveProduct page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  }

  const handleProductQuantityUpdate = async () => {
    try {
      var res = await getCartProductQuantityUpdate(item.id, qty)
      if (res.status == true) {
        setRefresh(!refresh)
        toast.show(res.msg, {
          type: 'success',
          placement: 'bottom',
          duration: 1000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else {
        toast.show(res.msg, {
          type: 'warning',
          placement: 'bottom',
          duration: 1000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (e) {
      console.log('errrror in..handleProductQuantityUpdate page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  }

  return (
    <View
      style={{
        ...styles.datalistView,
        backgroundColor: themecolor.BOXBORDERCOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}
    >
      <View style={{ ...styles.innerView }}>

        <TouchableOpacity activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('ProductMoreDetails', {
              productId: item.product_id,
              title: item.name,
            })
          } style={{ ...styles.innerImage, }}>
          <Image
            source={{ uri: item.image }}
            style={{
              width: 75,
              height: 75,
              borderRadius: 4,
            }}
            resizeMode= 'center'
          />
        </TouchableOpacity>

        <View style={{ ...styles.TxtViewinner }}>

          <Text allowFontScaling={false} numberOfLines={2} style={{ ...styles.txt, color: themecolor.TXTWHITE }}>
            {item.name}
          </Text>

          <View style={{ ...styles.PriceTxtViewinner, alignItems: 'flex-start', }}>
            {item.size != '' ?
              <View style={{ ...styles.QtyView, borderColor: themecolor.TXTGREY, maxWidth: "67%" }} >
                <Text
                  allowFontScaling={false} style={{ ...styles.txt1, color: themecolor.TXTWHITE, }}>Size:
                </Text>
                <Text
                  allowFontScaling={false} numberOfLines={1}
                  style={{ ...styles.txtPrice, color: themecolor.TXTWHITE, maxWidth: "85%", }}>{item.size}
                </Text>
              </View>
              : <></>}

            {item.qty != '' ?
              <TouchableOpacity activeOpacity={0.5}
                style={{ ...styles.QtyView, borderColor: themecolor.TXTGREY, maxWidth: "32%", left: 5 }}
                onPress={() => refRBSheet.current.open()}
              >
                <Text allowFontScaling={false}
                  style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>Qty:
                </Text>
                <Text
                  allowFontScaling={false} numberOfLines={1}
                  style={{ ...styles.txtPrice, color: themecolor.TXTWHITE, maxWidth: "85%", }}>
                  {parseInt(item.qty)}
                  {" "}<AN name="down" /></Text>

              </TouchableOpacity>
              : <></>}

          </View>

          <View style={{ ...styles.PriceTxtViewinner }}>
            <Text
              allowFontScaling={false}
              style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>Total Amount :{" "}
              <Text
                allowFontScaling={false}
                style={{ ...styles.txtPrice, color: themecolor.TXTWHITE }}>
                <FAIcon name="rupee" size={13} />
                {" "}{parseInt(item.total_price)}
              </Text>
            </Text>
          </View>

        </View>
      </View>

      <View style={{ ...styles.MVT }} />

      <View style={{ ...styles.borderLine, borderColor: themecolor.BOXBORDERCOLOR1, }} />

      <View style={{ ...styles.innerView, marginTop: 10 }}>
        <View style={{ ...styles.removeView }} >
          <TouchableOpacity activeOpacity={0.5} style={{ ...styles.removeToch }} onPress={() => handleRemoveProduct()}>
            <Text allowFontScaling={false} style={{ ...styles.removeButton, color: themecolor.TEXTRED }}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CartQtyRSSheet refRBSheet={refRBSheet} setQty={setQty} maxQty={item.current_stock} qty={qty} qtyRemove={parseInt(item.qty)} onPress={handleProductQuantityUpdate} />

    </View>
  );
}

export function CartProductDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => (
        <CartProductDataFlateList item={item} themecolor={themecolor} refresh={props.refresh} setRefresh={props.setRefresh} />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
