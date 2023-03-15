import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { styles } from '../../../../assets/css/OrderCss/OrderStyle';

const { width, height } = Dimensions.get('screen');

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

            <View style={{ ...styles.innerView }}>
                <Text
                    allowFontScaling={false}
                    style={{ ...styles.txtBig, color: themecolor.BACKICON }}>
                    Deliver to
                </Text>
            </View>

            <View style={{ ...styles.marTop }} />

            <View style={{ ...styles.innerView }}>
                <Text
                    allowFontScaling={false}
                    style={{ ...styles.txt, color: themecolor.TXTWHITE }}>
                    {shippingAddress.firstname} {shippingAddress.lastname}
                </Text>
            </View>

            <View style={{ ...styles.innerView }}>
                <Text
                    allowFontScaling={false}
                    style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>
                    {shippingAddress.address}, {shippingAddress.city} , {shippingAddress.state} , {shippingAddress.postal_code}
                </Text>

            </View>

            <View style={{ ...styles.marTop }} />

            <View style={{ ...styles.innerView }}>
                <Text
                    allowFontScaling={false}
                    style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>
                    Mobile No :
                    <Text
                        allowFontScaling={false}
                        style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>
                        {' '}
                        +91-{shippingAddress.phone}
                    </Text>
                </Text>
            </View>

        </View>

    )
}