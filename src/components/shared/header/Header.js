import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { DrawerActions, useNavigation  } from '@react-navigation/native';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import CIcon from 'react-native-vector-icons/MaterialIcons';
import BadgeIcon from './BadgeIcon';
import { styles } from '../../../assets/css/HeaderCss/HeaderStyle'
import { getCartProductList } from '../../../repository/OrderProcessRepository/CartListRepo';
import { store } from '../../../../App';
import { useFocusEffect} from '@react-navigation/native';
const { width } = Dimensions.get('screen');

export default function Header(props) {
  const navigation = useNavigation();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [len, setLen] = useState('')

  var cart = useSelector(state => state.cart)
  var cartLength = Object.keys(cart).length
  
  // useEffect(() => {
  //   var cartLen = Object.keys(cart).length
  //   setLen(cartLen)
    
  //   if (cartLen === 0) {
  //     fetchData(cartLen)
  //   }
  // }, [cart])


  useFocusEffect(
    React.useCallback(() => {
    if (cartLength === 0) {
      fetchData()
    }else{
       setLen(cartLength)
    }
    }, [cart,props]),
  );
  

          

  const fetchData = async () => {
    try{
    var res = await getCartProductList()
    var data1 = res.data
    setLen(data1.length)
    data1.map((item) => {
      var pi = item.product_id+' '+item.size;
      store.dispatch({ type: 'ADD_CART', payload: [pi, item] })
    })
  }catch(e){
    // console.log("Inheader.....getCartProductList " ,e)
  }
  }


  return (
    <View
      style={{
        ...styles.mainView,
        backgroundColor: themecolor.LOGINTHEMECOLOR1,
        borderBottomColor: themecolor.BOXBORDERCOLOR1
      }}>

      <View style={{ ...styles.mainViewContainer }}>
        <View
          style={{ ...styles.headerInnerView }}>

          <View style={{ width: width * 0.06, }}>
            {props.backIcon ? (
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.toggle}
                onPress={props.onPressBack}
              >
                <CIcon
                  name="keyboard-backspace"
                  size={26}
                  color={themecolor.TXTWHITE}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <Icon name="menu-sharp" size={26} color={themecolor.TXTWHITE} />
              </TouchableOpacity>
            )}
          </View>

          <View style={{ ...styles.iconTitle, }}>
            {props.title == 'Home' ? (
              <Image
                source={require('../../../assets/images/logo.png')}
                style={{ width: 130, height: 30 }}
              />
            ) : (
              <Text
                allowFontScaling={false}
                style={{ ...styles.toolbarTitle, color: themecolor.TXTWHITE }}
                numberOfLines={1}>
                {props.title}
              </Text>
            )}
          </View>

          <View
            style={{ ...styles.iconView }}>

            <View style={{ ...styles.iconText }}>
              {props.search ? <></>
                :
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.navigate("Search");
                  }}
                >
                  <Icon name="search" size={22} color={themecolor.TXTWHITE} />
                </TouchableOpacity>
              }
            </View>

            <View style={{ ...styles.iconText }}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => {
                navigation.navigate("Cart");
              }}>
                <BadgeIcon
                  icon="shopping-cart"
                  count={len}
                  onPress={() => {
                    navigation.navigate('Cart');
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
