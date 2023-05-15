import React, {} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../../Theme/ThemeDarkLightColor';
import {styles} from '../../../../assets/css/OrderCss/OrderStyle';

export default function OrderHistoryAddressComp(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  var shippingAddress = props.data;

  return (
    <View
      style={{
        ...styles.datalistView,
        backgroundColor: themecolor.BOXBORDERCOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}>
      <View style={{...styles.innerView}}>
        <Text
          allowFontScaling={false}
          style={{...styles.txtBig, color: themecolor.BACKICON}}>
          Deliver to
        </Text>
      </View>

      <View style={{...styles.marTop}} />
      {(shippingAddress.firstname == null) | (shippingAddress.firstname == '') &&
      (shippingAddress.lastname == null) | (shippingAddress.lastname == '') ? (
        <></>
      ) : (
        <View style={{...styles.innerView}}>
          <Text
            allowFontScaling={false}
            style={{...styles.txt, color: themecolor.TXTWHITE}}>
            {shippingAddress.firstname == null
              ? ''
              : shippingAddress.firstname.replace(/\s+/g, '')}{' '}
            {shippingAddress.lastname == null
              ? ''
              : shippingAddress.lastname.replace(/\s+/g, '')}
          </Text>
        </View>
      )}

      <View style={{...styles.innerView}}>
        <Text
          allowFontScaling={false}
          style={{...styles.txt1, color: themecolor.TXTWHITE}}>
          {shippingAddress.address == null || shippingAddress.address == '' ? (
            <></>
          ) : (
            <>{shippingAddress.address} ,</>
          )}{' '}
          {shippingAddress.city == null || shippingAddress.city == '' ? (
            <></>
          ) : (
            <>{shippingAddress.city} ,</>
          )}{' '}
          {shippingAddress.state == null || shippingAddress.state == '' ? (
            <></>
          ) : (
            <>{shippingAddress.state} ,</>
          )}{' '}
          {shippingAddress.postal_code == null ||
          shippingAddress.postal_code == '' ? (
            <></>
          ) : (
            <>{shippingAddress.postal_code} </>
          )}
        </Text>
      </View>

      <View style={{...styles.marTop}} />
      {shippingAddress.phone == null || shippingAddress.phone == '' ? (
        <></>
      ) : (
        <View style={{...styles.innerView}}>
          <Text
            allowFontScaling={false}
            style={{...styles.txt1, color: themecolor.TXTWHITE}}>
            Mobile No :
            <Text
              allowFontScaling={false}
              style={{...styles.txt1, color: themecolor.TXTWHITE}}>
              {' '}
              +91-{shippingAddress.phone}
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
}
