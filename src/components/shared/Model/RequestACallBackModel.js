import React, { useState } from 'react';
import { View, Text, Modal, TextInput } from 'react-native';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { styles } from '../../../assets/css/CategoryCss/ProductDetailStyle';
import HalfSizeButton from '../button/halfSizeButton';

export default function RequestACallBackModel(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    const [modalCart, setModalCart] = useState(true);

    return (
        <>
            <Modal animationType="slide" transparent={true} visible={modalCart}>
                <View
                    style={{
                        ...styles.model,
                    }}>
                    <View
                        style={{
                            ...styles.modelContainer,
                            backgroundColor: themecolor.THEMECOLOR1,
                        }}>
                        <View style={{ ...styles.modelInner }}>

                            <View style={{ ...styles.modelHeader }}>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        ...styles.modelHeading,
                                        color: themecolor.TXTWHITE,
                                    }}>
                                    Request a Call Back
                                </Text>
                            </View>

                            <View style={{ ...styles.MGT }} />

                            <View
                                style={{
                                    ...styles.modelTextView,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                    backgroundColor: themecolor.BOXBORDERCOLOR,
                                }}>
                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="Mobile Number*"
                                    keyboardType="numeric"
                                    maxLength={10}
                                    placeholderTextColor={themecolor.TXTGREYS}
                                    style={{
                                        ...styles.modelTextInput,
                                        color: themecolor.TXTWHITE,
                                    }}
                                    onChangeText={txt => props.setMobileNo(txt)}
                                />
                            </View>

                            <View style={{ ...styles.MGT }} />

                            <View
                                style={{
                                    ...styles.modelTextViewMsg,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                    backgroundColor: themecolor.BOXBORDERCOLOR,
                                }}>
                                <TextInput
                                    allowFontScaling={false}
                                    placeholder={'Message*'}
                                    placeholderTextColor={themecolor.TXTGREYS}
                                    style={{
                                        ...styles.modelTextInput,
                                        color: themecolor.TXTWHITE,
                                    }}
                                    multiline
                                    numberOfLines={4}
                                    onChangeText={txt => props.setMsg(txt)}
                                />
                            </View>
                        </View>

                        <View style={{ ...styles.modelViewButton }}>
                            <View style={{ width: '48%' }}>
                                <HalfSizeButton
                                    title="Submit"
                                    backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                                    color={'#fff'}
                                    borderColor={themecolor.BOXBORDERCOLOR1}
                                    onPress={props.onPress}
                                />
                            </View>
                            <View style={{ marginHorizontal: 6 }} />
                            <View style={{ width: '48%' }}>
                                <HalfSizeButton
                                    title="Cancel"
                                    backgroundColor={'transparent'}
                                    color={'gray'}
                                    borderColor={'transparent'}
                                    onPress={() => {
                                        setModalCart(false);
                                        props.setShowModal(false);
                                    }}
                                />
                            </View>
                        </View>

                        <View style={{ marginVertical: 5 }} />
                    </View>
                </View>
            </Modal>
        </>
    );
}
