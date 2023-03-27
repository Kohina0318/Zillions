import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    Linking, TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { styles } from '../../../../assets/css/CategoryCss/ProductDetailStyle';
import HalfSizeButton from '../../button/halfSizeButton';
import RequestACallBackModel from '../../Model/RequestACallBackModel';
import { useToast } from 'react-native-toast-notifications';
import { postRequestACallBack } from '../../../../repository/CategoryRepository/AllProductCategoryRep';

export default function ProductMoreDetailCustomerSupport(props) {

    const toast = useToast();
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    const [showModal, setShowModal] = useState(false);
    const [mobileNo, setMobileNo] = useState("");
    const [msg, setMsg] = useState("");


    const handleSubmit = async () => {
        if (mobileNo == '') {
            toast.show('Mobile No. is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (mobileNo.length < 10) {
            toast.show('Please enter valid mobile number!', {
                type: 'warning',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (msg == '') {
            toast.show('Message is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else {
            try {
            let formdata = new FormData();
                formdata.append('mobile', mobileNo);
                formdata.append('message', msg);

                var res = await postRequestACallBack(formdata);
                if (res.status === true) {
                    setShowModal(false);
                    toast.show(res.msg, {
                        type: 'success',
                        placement: 'bottom',
                        duration: 3000,
                        offset: 30,
                        animationType: 'slide-in',
                    });
                }
      
            } catch (e) {
                console.log('errrror in..postRequestACallBack page in Product DEtail-->', e);
                toast.show('Something went wrong!, Try again later.', {
                    type: 'danger',
                    placement: 'bottom',
                    duration: 3000,
                    offset: 30,
                    animationType: 'slide-in',
                });
            }
        }
    };


    return (
        <View
            style={{
                ...styles.datalistView,
                backgroundColor: themecolor.BOXBORDERCOLOR,
                borderColor: themecolor.BOXBORDERCOLOR1,
            }} >

            <View style={{ ...styles.innerViewMain }}>
                <Text
                    allowFontScaling={false}
                    style={{
                        ...styles.HeadText,
                        color: themecolor.TXTWHITE,
                    }}>
                    Customer Support
                </Text>
            </View>

            <View style={{ ...styles.MGT }} />

            <View style={{ ...styles.innerViewMain1, borderColor: themecolor.BOXBORDERCOLOR1, }}>

                <View style={{ ...styles.MrT5 }} />

                <View>
                    <Image
                        source={require('../../../../assets/images/whatsapp.png')}
                        resizeMode="contain"
                        style={{ width: 60, height: 60, }}
                    />
                </View>

                <View style={{ ...styles.MrT5 }} />

                <Text
                    allowFontScaling={false}
                    style={{
                        ...styles.RateTextBig2,
                        color: themecolor.BACKICON,
                    }}>
                    WhatsApp
                </Text>

                <View style={{ ...styles.MrT5 }} />

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() =>
                        Linking.openURL("tel: 9168103909")
                    }
                    style={{
                        borderRadius: 25,
                        alignItems: "center"
                    }}>

                    <Text
                        allowFontScaling={false}
                        style={{
                            ...styles.RateTextBig1,
                            color: themecolor.TEXTRED,
                        }}>
                        +91 - 9168103909
                    </Text>

                </TouchableOpacity>

                <View style={{ ...styles.MrT5 }} />

            </View>

            <View style={{ ...styles.MGT }} />

            <View style={{ ...styles.innerViewMain }}>
                <View style={{ width: '100%' }}>
                    <HalfSizeButton
                        title="Request a Call Back"
                        icon=""
                        onPress={() => setShowModal(true)}
                        backgroundColor={'transparent'}
                        color={themecolor.BACKICON}
                        borderColor={themecolor.BACKICON}
                    />
                </View>
            </View>

            {showModal && (
                <RequestACallBackModel
                    setShowModal={setShowModal}
                    setMobileNo={setMobileNo}
                    setMsg={setMsg}
                    onPress={() => handleSubmit()}
                />
            )}
        </View>

    )
}