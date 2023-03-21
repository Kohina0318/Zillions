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
                                    backgroundColor: themecolor.BOXBORDERCOLOR,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                }}>

                                <View style={{ ...ProfileStyle.Mv5 }} />

                                <View>
                                    <Text allowFontScaling={false} style={{ ...ProfileStyle.TextinputH, color: themecolor.TXTWHITE }}>Old Password</Text>

                                    <View
                                        style={{
                                            ...ProfileStyle.TextView,
                                            borderColor: themecolor.BOXBORDERCOLOR1,
                                            backgroundColor: themecolor.BOXBORDERCOLOR,
                                        }}>
                                            <View style={{width:width*0.72,backgroundColor:"red"}}>
                                        <TextInput
                                            allowFontScaling={false}
                                            value={oldPswd}
                                            placeholder={'Old Password*'}
                                            placeholderTextColor={themecolor.TXTGREYS}
                                            style={{
                                                ...ProfileStyle.TextInput,
                                                color: themecolor.TXTWHITE,
                                            }}
                                            onChangeText={txt => setOldPswd(txt)}
                                        />
                                        </View>
                                        <View  style={{backgroundColor:"red"}}>
                <MaterialCommunityIcons
                //   onPress={() => {
                //     isPasswordSecure
                //       ? setIsPasswordSecure(false)
                //       : setIsPasswordSecure(true);
                //   }}
                //   name={isPasswordSecure ? 'eye-off' : 'eye'}
                  name={'eye'}
                  size={16}
                  color={themecolor.ADDTOCARTBUTTONCOLOR}
                />
              </View>
                                    </View>
                                </View>


                                <View style={{ ...ProfileStyle.Mv5 }} />

                                <View>
                                    <Text allowFontScaling={false} style={{ ...ProfileStyle.TextinputH, color: themecolor.TXTWHITE }}>New Password</Text>
                                    <View
                                        style={{
                                            ...ProfileStyle.TextView,
                                            borderColor: themecolor.BOXBORDERCOLOR1,
                                            backgroundColor: themecolor.BOXBORDERCOLOR,
                                        }}>
                                        <TextInput
                                            allowFontScaling={false}
                                            value={newPswd}
                                            placeholder={'New Password*'}
                                            placeholderTextColor={themecolor.TXTGREYS}
                                            style={{
                                                ...ProfileStyle.TextInput,
                                                color: themecolor.TXTWHITE,
                                            }}
                                            onChangeText={txt => setNewPswd(txt)}
                                        />
                                    </View>
                                </View>


                                <View style={{ ...ProfileStyle.Mv5 }} />

                                <View>
                                    <Text allowFontScaling={false} style={{ ...ProfileStyle.TextinputH, color: themecolor.TXTWHITE }}>Confirm New Password</Text>
                                    <View
                                        style={{
                                            ...ProfileStyle.TextView,
                                            borderColor: themecolor.BOXBORDERCOLOR1,
                                            backgroundColor: themecolor.BOXBORDERCOLOR,
                                        }}>
                                        <TextInput
                                            allowFontScaling={false}
                                            value={confirmNewPswd}
                                            placeholder={'Confirm New Password*'}
                                            placeholderTextColor={themecolor.TXTGREYS}
                                            style={{
                                                ...ProfileStyle.TextInput,
                                                color: themecolor.TXTWHITE,
                                            }}
                                            onChangeText={txt => setConfirmNewPswd(txt)}
                                        />
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
                                //   onPress={() => handleEditProfile()}
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
