import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import {styles} from '../../../../assets/css/OrderCss/OrderStyle';
import {MyThemeClass} from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import AN from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useToast} from 'react-native-toast-notifications';
import HalfSizeButton from '../../button/halfSizeButton';
import {postReturnOrder} from '../../../../repository/OrderRepository/OrderRepo';

const {width} = Dimensions.get('screen');

function OrderDetailProductDataFlateList({
  item,
  themecolor,
  refresh,
  setRefresh,
  status,
  saleId,
  onChange
}) {
  const [title, setTitle] = useState('Return Order');
  const [disabled, setDisabled] = useState(false);

  const toast = useToast();
  const navigation = useNavigation();

  const handleReturnOrder = async () => {
    Alert.alert(
      'Return Order',
      'Are you sure, you wants to return the order?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try{
            var res = await postReturnOrder(saleId, item.id);
            if (res.status === true) {
              onChange(true)
              setTitle('Request Sent');
              setDisabled(true)
            }
            else{
              toast.show("Sorry!,Your Request can't be processed", {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
          }
          catch(e) {
            console.log('errrror in..handleOrderView page Order Detail-->', e);
            toast.show('Something went wrong!, Try again later.', {
              type: 'danger',
              placement: 'bottom',
              duration: 3000,
              offset: 30,
              animationType: 'slide-in',
            });
          }
          },
        },
      ],
    );
  };

  var optionData = item.option;
  var Size = '';

  if (
    JSON.parse(optionData).size != undefined ||
    JSON.parse(optionData).size != null
  ) {
    if (
      JSON.parse(optionData).size.value != undefined ||
      JSON.parse(optionData).size.value != null
    ) {
      var optionSizeValueData = JSON.parse(optionData).size.value;
      var data = optionSizeValueData.replace(/^["'](.+(?=["']$))["']$/, '$1');
      var data1 = data.split('*');
      Size = data1[0];
    }
  }

  return (
    <View
      style={{
        ...styles.datalistView1,
        backgroundColor: themecolor.BOXBORDERCOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}>
      <View style={{...styles.marTop}} />

      <View style={{...styles.innerView}}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('ProductMoreDetails', {
              productId: item.id,
              title: item.name,
            })
          }
          style={{...styles.innerImage}}>
          <Image
            source={{uri: item.image}}
            style={{
              width: 70,
              height: 80,
              borderRadius: 4,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>

        <View style={{...styles.TxtViewinner}}>
          <Text
            allowFontScaling={false}
            numberOfLines={2}
            style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {item.name}
          </Text>

          {Size != '' ? (
            <View style={{...styles.PriceTxtViewinner}}>
              <Text
                allowFontScaling={false}
                style={{...styles.txt1, color: themecolor.TXTWHITE}}>
                Size :{' '}
                <Text
                  allowFontScaling={false}
                  style={{...styles.txtBold, color: themecolor.TXTWHITE}}>
                  {Size}
                </Text>
              </Text>
            </View>
          ) : (
            <></>
          )}

          <View style={{...styles.PriceTxtViewinner}}>
            <Text
              allowFontScaling={false}
              style={{...styles.txt1, color: themecolor.TXTWHITE}}>
              Total Amount :{' '}
              <Text
                allowFontScaling={false}
                style={{...styles.txtBold, color: themecolor.TXTWHITE}}>
                <FAIcon name="rupee" size={13} /> {parseInt(item.subtotal)}
              </Text>
            </Text>
          </View>
        </View>
      </View>

      <View style={{...styles.marTop}} />
{status=='delivered'?
      <View style={{...styles.mainView1}}>
        <View style={{width: '95%', alignSelf: 'center', margin: 5, left: 3}}>
          <HalfSizeButton
            title={title}
            disabled={disabled}
            icon={' '}
            onPress={() => handleReturnOrder()}
            backgroundColor={'transparent'}
            color={themecolor.TEXTRED}
            borderColor={themecolor.TEXTRED}
            fontSize={14}
            height={width * 0.09}
          />
        </View>
      </View>
      :
      <></>
}
    </View>
  );
}

export function OrderDetailProductDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({item}) => (
        <OrderDetailProductDataFlateList
          item={item}
          themecolor={themecolor}
          refresh={props.refresh}
          setRefresh={props.setRefresh}
          status={props.status}
          saleId={props.saleId}
          onChange={props.onChange}
        />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
