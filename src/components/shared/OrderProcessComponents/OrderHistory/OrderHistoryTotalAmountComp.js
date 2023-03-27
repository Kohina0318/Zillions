import React, { } from 'react';
import {
    View,
    Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { styles } from '../../../../assets/css/OrderCss/OrderStyle';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

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

    var paymentStatus = []
    if (data.payment_status != undefined || data.payment_status != null || data.payment_status != '') {
        paymentStatus = JSON.parse(data.payment_status)
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
                <View style={{ ...styles.headingWidth70p }}>
                    <Text allowFontScaling={false} style={{ ...styles.txtBig, color: themecolor.TXTWHITE }}>
                        Total Amount : <FAIcon name="rupee" size={15} /> {parseInt(data.grand_total)}
                    </Text>
                </View>

                <View style={{ ...styles.headingWidth30p, }}>
                    <Text allowFontScaling={false} style={{ ...styles.txt, color: themecolor.TXTGREYS }}>
                        {dateSet != '' ? dateSet : ''}
                    </Text>
                </View>
            </View>

            <View style={{ ...styles.mgT10 }} />

            {paymentStatus.length > 0 ?
                <View style={{ ...styles.flexDirView1, }}>
                    <View style={{ ...styles.width35p, }}>
                        <Text allowFontScaling={false} style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>
                            Payment Status
                        </Text>
                    </View>

                    <View style={{ ...styles.width65p, }}>
                        <Text allowFontScaling={false} style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>
                            {paymentStatus[0].status}
                        </Text>
                    </View>
                </View>
                : <></>}


            <View style={{ ...styles.marTop }} />

            <View style={{ ...styles.flexDirView1, }}>
                <View style={{ ...styles.width35p, }}>
                    <Text allowFontScaling={false} style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>
                        Payment Method
                    </Text>
                </View>

                <View style={{ ...styles.width65p, }}>
                    <Text allowFontScaling={false} style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>
                        {data.payment_type == "cash_on_delivery" ? "Cash on delivery" : data.payment_type}
                    </Text>
                </View>
            </View>



            <View style={{ ...styles.marTop }} />

            <View style={{ ...styles.mgT10 }} />

            <View style={{ ...styles.borderLine, borderColor: themecolor.BOXBORDERCOLOR1, }} />

            <View style={{ ...styles.mgT10 }} />

            <View style={{ ...styles.flexDirView1, }}>
                <View style={{ ...styles.width35p, }}>
                    <Text allowFontScaling={false} style={{ ...styles.txt, color: themecolor.BACKICON }}>
                        Delivery Address
                    </Text>
                </View>

                <View style={{ ...styles.width65p, }}>
                    <Text allowFontScaling={false} style={{ ...styles.txt, color: themecolor.BACKICON }}>
                        Order Details
                    </Text>
                </View>

            </View>


        </View>

    )
}