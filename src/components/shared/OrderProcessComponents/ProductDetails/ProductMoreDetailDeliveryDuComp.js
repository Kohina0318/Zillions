import React, {  } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { styles } from '../../../../assets/css/CategoryCss/ProductDetailStyle';

export default function ProductMoreDetailDeliveryDuComp(props) {


    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    return (
        <View
            style={{
                ...styles.datalistView,
                backgroundColor: themecolor.BOXBORDERCOLOR,
                borderColor: themecolor.BOXBORDERCOLOR1,
            }} >
            {/* <View
                style={{
                    ...styles.DELVIEW,
                }}>
                <Text
                    allowFontScaling={false}
                    style={{
                        ...styles.HeadText,
                        color: themecolor.TXTWHITE,
                    }}>
                    Delivery Duration :{' '}
                </Text>
                <Text
                    allowFontScaling={false}
                    style={{
                        ...styles.HeadText,
                        color: themecolor.TXTWHITE,
                    }}>
                    * 8 to 10 Days
                </Text>
            </View> */}
            <View
                style={{
                    ...styles.DELVIEW,
                }}>
                <Text
                    allowFontScaling={false}
                    style={{
                        ...styles.HeadText,
                        color: themecolor.TXTWHITE,
                    }}>
                    Secure Payment :{' '}
                </Text>

                <Image
                    source={require('../../../../assets/images/Visa.png')}
                    resizeMode="contain"
                    style={{ width: 40, height: 20, margin: 2 }}
                />
                <Image
                    source={require('../../../../assets/images/Maestro.png')}
                    resizeMode="cover"
                    style={{ width: 40, height: 20, margin: 2 }}
                />
                <Image
                    source={require('../../../../assets/images/mastercard.png')}
                    resizeMode="contain"
                    style={{ width: 40, height: 20, margin: 2 }}
                />
            </View>
        </View>

    )
}