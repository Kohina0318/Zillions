import React, { } from 'react';
import {
    View,
    Text,
    useWindowDimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import RenderHtml from 'react-native-render-html';
import { styles } from '../../../../assets/css/CategoryCss/ProductDetailStyle';

export default function ProductMoreDetailSortByComp(props) {

    const { widthDes } = useWindowDimensions().width;

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    return (
        <View
            style={{
                ...styles.datalistView,
                backgroundColor: themecolor.BOXBORDERCOLOR,
                borderColor: themecolor.BOXBORDERCOLOR1,
            }}
        >
            <View style={{ ...styles.MrT5 }} />

            <View style={{ ...styles.innerViewMain }}>
                <Text
                    allowFontScaling={false}
                    style={{
                        ...styles.HeadText,
                        color: themecolor.TXTWHITE,
                    }}>
                    Sold By :{' '}
                </Text>

                <Text
                    allowFontScaling={false}
                    style={{
                        ...styles.HeadText,
                        color: themecolor.TXTWHITE,
                    }}>
                    <RenderHtml
                        contentWidth={widthDes}
                        source={{ html: props.soldBy }}
                        enableCSSInlineProcessing={false}
                    />
                </Text>
            </View>

            <View style={{ ...styles.MrT5 }} />

        </View>

    )
}