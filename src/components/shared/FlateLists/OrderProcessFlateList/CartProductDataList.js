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
import { RBSheetData } from '../../../../screens/category/RBSheetData';
import Feather from 'react-native-vector-icons/Feather';
import { useToast } from 'react-native-toast-notifications';
import { getRemoveProduct } from '../../../../repository/OrderProcessRepository/RemoveProductRepo';

const { width } = Dimensions.get('screen');

function CartProductDataFlateList({ item, themecolor, refresh, setRefresh }) {
  const toast = useToast();
  const refRBSheet = useRef();
  const navigation = useNavigation();

  var optionData = JSON.parse(item.option)
  var optionSizeValueData = JSON.stringify(optionData.size.value)
  var data = optionSizeValueData.replace(/^["'](.+(?=["']$))["']$/, '$1');
  var data1 = data.split("*");

  const [qty, setQty] = useState(data1[1])
  const [size, setSize] = useState(data1[0])

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

          <View style={{ ...styles.PriceTxtViewinner }}>

              <TouchableOpacity activeOpacity={0.5} style={{ ...styles.QtyView, borderColor: themecolor.TXTGREY, }}
              // onPress={() => refRBSheet.current.open()}
              >
                <Text
                  allowFontScaling={false} style={{ ...styles.txt1, color: themecolor.TXTWHITE, }}>Size:
                  <Text
                    allowFontScaling={false}
                    style={{ ...styles.txtPrice, color: themecolor.TXTWHITE, }}> {size}{" "}
                  </Text>
                  <AN name="down" />
                </Text>
              </TouchableOpacity>
           
              <TouchableOpacity activeOpacity={0.5} style={{ ...styles.QtyView, borderColor: themecolor.TXTGREY, left: 5 }}
              // onPress={() => refRBSheet.current.open()}
              >
                <Text allowFontScaling={false}
                  style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>Qty:
                  <Text
                    allowFontScaling={false}
                    style={{ ...styles.txtPrice, color: themecolor.TXTWHITE }}> {qty}{" "}</Text>
                  <AN name="down" />
                </Text>
              </TouchableOpacity>
            
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
