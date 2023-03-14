import React, { useEffect, useState, useRef } from 'react';
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

const { width } = Dimensions.get('screen');

function CartProductDataFlateList({ item, themecolor, refresh, setRefresh }) {
  const toast = useToast();
  const refRBSheet = useRef();
  const navigation = useNavigation();

  var optionData = JSON.parse(item.option)
  var Size = ''
  var qt = ''

  if (optionData.size != undefined || optionData.size != null) {
    if (optionData.size.value != undefined || optionData.size.value != null) {
      var optionSizeValueData = JSON.stringify(optionData.size.value)
      var data = optionSizeValueData.replace(/^["'](.+(?=["']$))["']$/, '$1');
      var data1 = data.split("*");
      Size = data1[0]
      qt = parseInt(data1[1])
    }
  }
  const [qty, setQty] = useState(qt)


  const handleRemoveProduct = async () => {
    try {
      var res = await getRemoveProduct(item.rowid)
      if (res.status == true) {
        setRefresh(!refresh)
        toast.show(res.msg, {
          type: 'success',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else {
        toast.show(res.msg, {
          type: 'warning',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (e) {
      console.log('errrror in..handleRemoveProduct page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  }

  const handleProductQuantityUpdate = async () => {
    try {
      var res = await getCartProductQuantityUpdate(item.rowid, qty)
      if (res.status == true) {
        setRefresh(!refresh)
        toast.show(res.msg, {
          type: 'success',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else {
        toast.show(res.msg, {
          type: 'warning',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (e) {
      console.log('errrror in..handleProductQuantityUpdate page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
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
            navigation.navigate('ProductDetail', {
              productId: item.id,
              title: item.name,
            })
          } style={{ ...styles.innerImage, }}>
          <Image
            source={{ uri: item.image }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 4,
              resizeMode: 'contain'
            }}
          />
        </TouchableOpacity>

        <View style={{ ...styles.TxtViewinner }}>

          <Text allowFontScaling={false} numberOfLines={2} style={{ ...styles.txt, color: themecolor.TXTWHITE }}>
            {item.name}
          </Text>

          <View style={{ ...styles.PriceTxtViewinner, alignItems: 'flex-start', }}>
{Size != ''? 
            <View style={{ ...styles.QtyView, borderColor: themecolor.TXTGREY, maxWidth: "67%" }} >
              <Text
                allowFontScaling={false} style={{ ...styles.txt1, color: themecolor.TXTWHITE, }}>Size:
              </Text>
              <Text
                allowFontScaling={false} numberOfLines={1}
                style={{ ...styles.txtPrice, color: themecolor.TXTWHITE, maxWidth: "85%", }}>{Size}
              </Text>
            </View>
            :<></>}

{qt != '' ?
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
                {item.is_update > 0 ? item.qty : qt}
                {" "}<AN name="down" /></Text>

            </TouchableOpacity>
            :<></>}

          </View>

          <View style={{ ...styles.PriceTxtViewinner }}>
            <Text
              allowFontScaling={false}
              style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>Total Amount :{" "}
              <Text
                allowFontScaling={false}
                style={{ ...styles.txtPrice, color: themecolor.TXTWHITE }}>
                <FAIcon name="rupee" size={13} />
                {" "}{item.subtotal}
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
            <Text style={{ ...styles.removeButton, color: themecolor.TEXTRED }}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CartQtyRSSheet refRBSheet={refRBSheet} setQty={setQty} qty={qty} onPress={handleProductQuantityUpdate} />

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
