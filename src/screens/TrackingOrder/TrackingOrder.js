import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Dimensions,
    BackHandler,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useToast } from 'react-native-toast-notifications';
import { styles } from '../../assets/css/ProfileCss/TrackingOrderStyle';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';

const { width, height } = Dimensions.get('screen');

export default function TrackingOrder(props) {
    function handleBackButtonClick() {
        props.navigation.goBack();
        return true;
    }

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButtonClick,
            );
        };
    }, []);

    const toast = useToast();
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    const [loader, setLoader] = useState(false);


    return (
        <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>
            <RegisterLoginHeader
                title={'Tracking Order'}
                backIcon={true}
                onPressBack={() => handleBackButtonClick()}
            />
            <View
                style={{
                    ...styles.container,
                }}>

                {loader ? (
                    <LoadingFullScreen style={{ flex: 1 }} />
                ) : (
                    <View
                        style={{
                            ...styles.datalistView,
                            backgroundColor: themecolor.BOXBORDERCOLOR,
                            borderColor: themecolor.BOXBORDERCOLOR1,
                        }}>
                        <View style={{ ...styles.innerView }}>
                          <Text style={{...styles.txt, color: themecolor.TXTWHITE }}> Order Tracking </Text>
                        </View>

                        <View style={{...styles.mv5}} />

                        
                    </View>
                )}
            </View>

        </View>
    );
}
