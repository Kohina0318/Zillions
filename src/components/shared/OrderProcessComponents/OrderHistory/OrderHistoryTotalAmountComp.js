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
import FAIcon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';


const { width, height } = Dimensions.get('screen');

export default function OrderHistoryTotalAmountComp(props) {

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    var data = props.data;

    var dateSet = ''
    if (Object.values(data).length > 0) {
        if (data.sale_datetime != undefined || data.sale_datetime != null) {
            dateSet = moment(data.sale_datetime * 1000).format('ll')
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
            <View style={{ ...styles.flexDirView2, }}>
                <View style={{ ...styles.width65p }}>
                    <Text allowFontScaling={false} style={{ ...styles.txtBig, color: themecolor.TXTWHITE }}>
                        Total Amount : <FAIcon name="rupee" size={15} />{data.grand_total}
                    </Text>
                </View>

                <View style={{ ...styles.width35p, }}>
                    <Text allowFontScaling={false} style={{ ...styles.txt, color: themecolor.TXTGREYS }}>
                        {dateSet != '' ? dateSet : ''}
                    </Text>
                </View>
            </View>

            <View style={{ ...styles.flexDirView1, padding: 3 }}>
                <Text allowFontScaling={false} style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>
                    Paid by {data.payment_type == "cash_on_delivery" ? "Cash on delivery" : data.payment_type}
                </Text>
            </View>

            <View style={{ ...styles.mgT10 }} />

            <View style={{ ...styles.mgT10 }} />

            <View style={{ ...styles.borderLine, borderColor: themecolor.BOXBORDERCOLOR1, }} />

            <View style={{ ...styles.mgT10 }} />

            <View style={{ ...styles.flexDirView1, }}>
                <TouchableOpacity activeOpacity={0.5} style={{ ...styles.width65p, }}>
                    <Text allowFontScaling={false} style={{ ...styles.txt, color: themecolor.BACKICON }}>
                        Delivery Address
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} style={{ ...styles.width35p, }}>
                    <Text allowFontScaling={false} style={{ ...styles.txt, color: themecolor.BACKICON }}>
                        Order Details
                    </Text>
                </TouchableOpacity>

            </View>


        </View>

    )
}