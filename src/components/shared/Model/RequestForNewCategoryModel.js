import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput } from 'react-native';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { styles } from '../../../assets/css/CategoryCss/ProductDetailStyle';
import HalfSizeButton from '../button/halfSizeButton';
import { useToast } from 'react-native-toast-notifications';
import { postRequestForNewCategory } from '../../../repository/CategoryRepository/AllProductCategoryRep';
import { getUserData } from '../../../repository/CommonRepository';

export default function RequestForNewCategoryModel(props) {

    const toast = useToast();
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    const [modalCart, setModalCart] = useState(true);
    const [UserData, setUserData] = useState([]);

    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [discription, setDiscription] = useState("");

    useEffect(() => {
        async function temp() {
            try {
                var userData = await getUserData();

                if (userData == null || userData == '' || userData == undefined) {
                    // alert(userData)
                    setUserData([])
                } else {
                    setUserData(userData);
                    var nameUser = `${userData[0].username.replace(/\s+/g, '')} ${userData[0].surname.replace(/\s+/g, '')}`
                    setName(nameUser);
                    setMobileNo(userData[0].phone);
                }
            } catch (e) {
                setUserData([])
            }
        }
        temp()
    }, [props]);


    const handleSubmit = async () => {

        if (name == '') {
            toast.show('Name is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (mobileNo == '') {
            toast.show('Mobile No. is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (mobileNo.length < 10) {
            toast.show('Please enter valid mobile number!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (categoryName == '') {
            toast.show('Category Name is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        }
        else if (discription == '') {
            toast.show('Discription is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        }
        else {
            try {
                let formdata = new FormData();
                formdata.append('name', name);
                formdata.append('mobileno', mobileNo);
                formdata.append('categoryName', categoryName);
                formdata.append('description', discription);

                var res = await postRequestForNewCategory(formdata);
                if (res.status === true) {
                    setModalCart(false);
                    props.setShowModal(false);
                    toast.show(res.msg, {
                        type: 'success',
                        placement: 'bottom',
                        duration: 1000,
                        offset: 30,
                        animationType: 'slide-in',
                    });
                }

            } catch (e) {
                console.log('errrror in..getManageAddress page in address-->', e);
                toast.show('Something went wrong!, Try again later.', {
                    type: 'danger',
                    placement: 'bottom',
                    duration: 1000,
                    offset: 30,
                    animationType: 'slide-in',
                });
            }
        }
    };

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
                                    Request for New Category
                                </Text>
                            </View>

                            <View style={{ ...styles.MGT }} />

                            {UserData.length <= 0 ? (
                                <>
                                    <View
                                        style={{
                                            ...styles.modelTextView,
                                            borderColor: themecolor.BOXBORDERCOLOR1,
                                            backgroundColor: themecolor.BOXBORDERCOLOR,
                                        }}>
                                        <TextInput
                                            allowFontScaling={false}
                                            placeholder="Enter Your Name*"
                                            placeholderTextColor={themecolor.TXTGREYS}
                                            style={{
                                                ...styles.modelTextInput,
                                                color: themecolor.TXTWHITE,
                                            }}
                                            onChangeText={txt => setName(txt)}
                                        />
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
                                            placeholder="Enter Mobile Number*"
                                            keyboardType="numeric"
                                            maxLength={10}
                                            placeholderTextColor={themecolor.TXTGREYS}
                                            style={{
                                                ...styles.modelTextInput,
                                                color: themecolor.TXTWHITE,
                                            }}
                                            onChangeText={txt => setMobileNo(txt)}
                                        />
                                    </View>

                                    <View style={{ ...styles.MGT }} />

                                </>) : (<></>)}

                            <View
                                style={{
                                    ...styles.modelTextView,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                    backgroundColor: themecolor.BOXBORDERCOLOR,
                                }}>
                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="Enter Category Name*"
                                    placeholderTextColor={themecolor.TXTGREYS}
                                    style={{
                                        ...styles.modelTextInput,
                                        color: themecolor.TXTWHITE,
                                    }}
                                    onChangeText={txt => setCategoryName(txt)}
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
                                    placeholder={'Enter Discription*'}
                                    placeholderTextColor={themecolor.TXTGREYS}
                                    style={{
                                        ...styles.modelTextInput,
                                        color: themecolor.TXTWHITE,
                                    }}
                                    multiline
                                    numberOfLines={4}
                                    onChangeText={txt => setDiscription(txt)}
                                />
                            </View>
                        </View>

                        <View style={{ ...styles.modelViewButton }}>
                            <View style={{ width: '48%' }}>
                                <HalfSizeButton
                                    title="Send"
                                    backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                                    color={'#fff'}
                                    borderColor={themecolor.BOXBORDERCOLOR1}
                                    onPress={() => handleSubmit()}
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
