import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Dimensions,
    BackHandler,
    TouchableOpacity,
    TextInput,
    Alert,
    ToastAndroid,
    ScrollView
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useToast } from 'react-native-toast-notifications';
import { ProfileStyle } from '../../assets/css/ProfileCss/ProfileStyle';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { postChangePswd } from '../../repository/ProfileRepository/ChangePswdRepo';

const { width, height } = Dimensions.get('screen');

export default function ChangePassword(props) {
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
    const navigation = useNavigation();

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    const [loader, setLoader] = useState(false);
    const [oldPswd, setOldPswd] = useState('');
    const [newPswd, setNewPswd] = useState('');
    const [confirmNewPswd, setConfirmNewPswd] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [isPasswordSecure1, setIsPasswordSecure1] = useState(true);
    const [isPasswordSecure2, setIsPasswordSecure2] = useState(true);

    const handleSubmit = async () => {
        if (oldPswd == '') {
            toast.show('old Password is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (newPswd == '') {
            toast.show('New Password is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (confirmNewPswd == '') {
            toast.show('Confirm New Password is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else {
            try {
                let formdata = new FormData();
                formdata.append('password', oldPswd);
                formdata.append('password1', newPswd);
                formdata.append('password2', confirmNewPswd);

                var res = await postChangePswd(formdata);

                if (res.status === true) {
                    navigation.navigate("Dashboard")
                    toast.show(res.msg, {
                        type: 'success',
                        placement: 'bottom',
                        duration: 3000,
                        offset: 30,
                        animationType: 'slide-in',
                    });
                }
                else if (res.msg == "Invalid Authentication") {

                }
                else {
                    toast.show(res.msg, {
                        type: 'warning',
                        placement: 'bottom',
                        duration: 3000,
                        offset: 30,
                        animationType: 'slide-in',
                    });
                }

            } catch (e) {
                console.log('errrror in..getManageAddress page in address-->', e);
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
        <View style={{ ...ProfileStyle.bg, backgroundColor: themecolor.THEMECOLOR }}>
            <RegisterLoginHeader
                title={'Change Password'}
                backIcon={true}
                onPressBack={() => handleBackButtonClick()}
            />


            <View style={{ ...ProfileStyle.Mv5 }} />

            <View
                style={{
                    ...ProfileStyle.container,
                }}>
                {loader ? (
                    <LoadingFullScreen style={{ flex: 1 }} />
                ) : (
                    <>
                        <View style={{ ...ProfileStyle.ViewHeading }}>
                            <Text allowFontScaling={false} style={{ ...ProfileStyle.headingTxt, color: themecolor.TXTWHITE }}>
                                Change Your Password
                            </Text>

                            <View
                                style={{
                                    ...ProfileStyle.editInnerView,
                                    backgroundColor: themecolor.BOXBORDERCOLOR1,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                }}>

                                <View style={{ ...ProfileStyle.Mv5 }} />

                                <View>
                                    <Text allowFontScaling={false} style={{ ...ProfileStyle.TextinputH, color: themecolor.TXTWHITE }}>Old Password</Text>
                                    <View
                                        style={{
                                            ...ProfileStyle.TextViewPswd,
                                            borderColor: themecolor.BOXBORDERCOLOR1,
                                            backgroundColor: themecolor.BOXBORDERCOLOR,
                                        }}>
                                        <View style={{ width: width * 0.75, }}>
                                            <TextInput
                                                allowFontScaling={false}
                                                value={oldPswd}
                                                placeholder={'Old Password*'}
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                textContentType="newPassword"
                                                secureTextEntry={isPasswordSecure}
                                                enablesReturnKeyAutomatically
                                                placeholderTextColor={themecolor.TXTGREYS}
                                                style={{
                                                    ...ProfileStyle.TextInput,
                                                    color: themecolor.TXTWHITE,
                                                }}
                                                onChangeText={txt => setOldPswd(txt)}
                                            />
                                        </View>
                                        <TouchableOpacity activeOpacity={0.5} style={{ padding: 2 }}
                                            onPress={() => {
                                                isPasswordSecure
                                                    ? setIsPasswordSecure(false)
                                                    : setIsPasswordSecure(true);
                                            }}>
                                            <MaterialCommunityIcons
                                                name={isPasswordSecure ? 'eye-off' : 'eye'}
                                                size={16}
                                                color={themecolor.ICONINPUT}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>


                                <View style={{ ...ProfileStyle.Mv5 }} />

                                <View>
                                    <Text allowFontScaling={false} style={{ ...ProfileStyle.TextinputH, color: themecolor.TXTWHITE }}>New Password</Text>
                                    <View
                                        style={{
                                            ...ProfileStyle.TextViewPswd,
                                            borderColor: themecolor.BOXBORDERCOLOR1,
                                            backgroundColor: themecolor.BOXBORDERCOLOR,
                                        }}>
                                        <View style={{ width: width * 0.75, }}>
                                            <TextInput
                                                allowFontScaling={false}
                                                value={newPswd}
                                                placeholder={'New Password*'}
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                textContentType="newPassword"
                                                secureTextEntry={isPasswordSecure1}
                                                enablesReturnKeyAutomatically
                                                placeholderTextColor={themecolor.TXTGREYS}
                                                style={{
                                                    ...ProfileStyle.TextInput,
                                                    color: themecolor.TXTWHITE,
                                                }}
                                                onChangeText={txt => setNewPswd(txt)}
                                            />
                                        </View>
                                        <TouchableOpacity activeOpacity={0.5} style={{ padding: 2 }} onPress={() => {
                                            isPasswordSecure1
                                                ? setIsPasswordSecure1(false)
                                                : setIsPasswordSecure1(true);
                                        }}
                                        >
                                            <MaterialCommunityIcons
                                                name={isPasswordSecure1 ? 'eye-off' : 'eye'}
                                                size={16}
                                                color={themecolor.ICONINPUT}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>


                                <View style={{ ...ProfileStyle.Mv5 }} />

                                <View>
                                    <Text allowFontScaling={false} style={{ ...ProfileStyle.TextinputH, color: themecolor.TXTWHITE }}>Confirm New Password</Text>
                                    <View
                                        style={{
                                            ...ProfileStyle.TextViewPswd,
                                            borderColor: themecolor.BOXBORDERCOLOR1,
                                            backgroundColor: themecolor.BOXBORDERCOLOR,
                                        }}>
                                        <View style={{ width: width * 0.75, }}>
                                            <TextInput
                                                allowFontScaling={false}
                                                value={confirmNewPswd}
                                                placeholder={'Confirm New Password*'}
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                textContentType="newPassword"
                                                secureTextEntry={isPasswordSecure2}
                                                enablesReturnKeyAutomatically
                                                placeholderTextColor={themecolor.TXTGREYS}
                                                style={{
                                                    ...ProfileStyle.TextInput,
                                                    color: themecolor.TXTWHITE,
                                                }}
                                                onChangeText={txt => setConfirmNewPswd(txt)}
                                            />
                                        </View>
                                        <TouchableOpacity activeOpacity={0.5} style={{ padding: 2 }} onPress={() => {
                                            isPasswordSecure2
                                                ? setIsPasswordSecure2(false)
                                                : setIsPasswordSecure2(true);
                                        }}
                                        >
                                            <MaterialCommunityIcons
                                                name={isPasswordSecure2 ? 'eye-off' : 'eye'}
                                                size={16}
                                                color={themecolor.ICONINPUT}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ ...ProfileStyle.Mv5 }} />

                                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('ForgotPassword')}>
                                    <View style={ProfileStyle.forgot}>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                ...ProfileStyle.forgotTxt,
                                                color: themecolor.BACKICON,
                                            }}>
                                            Forgot Password?
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={{ ...ProfileStyle.Mv5 }} />
                            </View>
                        </View>


                        <View style={{ ...ProfileStyle.Mv5 }} />

                        <View
                            style={{
                                ...ProfileStyle.touchview,
                            }}>
                            <View style={{ ...ProfileStyle.mainView }}>
                                <HalfSizeButton
                                    title="Update"
                                    icon=" "
                                    backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                                    color={'#fff'}
                                    borderColor={themecolor.BOXBORDERCOLOR1}
                                  onPress={() => handleSubmit()}
                                />
                            </View>
                        </View>

                        <View style={{ marginVertical: 60 }} />
                    </>
                )}
            </View>

        </View>
    );
}
