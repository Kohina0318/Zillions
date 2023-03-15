import React from 'react';
import { View, Text,Dimensions,Image,TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';
import { styles } from '../../../assets/css/CartCss/CartStyle';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');

export default function EmptyCart(props) {

    const navigation = useNavigation();
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    return (
        <View style={{ ...styles.emptyCartViewContainer}}>
            <Image
                source={require('../../../assets/images/emptyCart1.png')}
                resizeMode="contain"
                style={{ width: "100%", height: 250 }}
            />
            <View style={{ ...styles.EmptyCartInnerContainer }} >
                <Text allowFontScaling={false} style={{
                    ...styles.txtSave,
                    color: themecolor.TXTGREYS,
                }}>Look's like you haven't added anything </Text>
                <Text allowFontScaling={false} style={{
                    ...styles.txtSave,
                    color: themecolor.TXTGREYS,
                }}>in your cart yet.</Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <TouchableOpacity activeOpacity={0.5}
                    onPress={() => navigation.navigate("Dashboard")}
                    style={{
                      ...styles.emptyCartTouchButon,
                        borderColor: themecolor.BACKICON,
                    }}>
                    <Text allowFontScaling={false} style={{ ...styles.txt, color: themecolor.BACKICON }}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
