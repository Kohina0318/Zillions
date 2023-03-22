import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  BackHandler,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { styles } from '../../assets/css/RFQUploadCss/RFQUploadStyle';
import { useToast } from 'react-native-toast-notifications';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { useNavigation } from '@react-navigation/native';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import FIcon from 'react-native-vector-icons/FontAwesome';
import EIcon from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-picker';

const { width, height } = Dimensions.get('screen');


export default function RFQUpload(props) {

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
  const [refresh, setRefresh] = useState(false);

  const [filePath, setFilePath] = useState({});

  const [image, setImage] = useState("");

  const captureImage = async () => {
    
    try {
      
    var options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom Option'
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

      ImagePicker.showImagePicker(options, res => {
        console.log('Response = ', res);
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);
          alert(res.customButton);
        } else {
          let source = res;
          setImage(source)

        }
      })
    } catch (e) {
      console.log("error in inage picker", e)
    }
  };



  return (
    <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>

      <RegisterLoginHeader
        title={"RFQ Upload"}
        backIcon={true}
        onPressBack={() => handleBackButtonClick()}
      />
      <View style={{ ...styles.Mv5 }} />

      <View
        style={{
          ...styles.container,
        }}>
        {loader ? (
          <LoadingFullScreen style={{ flex: 1 }} />
        ) : (
          <>
            <View style={{ ...styles.ViewHeading }}>
              <Text allowFontScaling={false} style={{ ...styles.headingTxt, color: themecolor.TXTWHITE }}>
                Upload Multiple Part Numbers for Quotation
              </Text>

              <View
                style={{
                  ...styles.InnerView,
                  backgroundColor: themecolor.BOXBORDERCOLOR,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                }}>

                <View style={{ ...styles.Mv5 }} />

                <View>
                  <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.TXTWHITE }}>Contact Name</Text>
                  <View
                    style={{
                      ...styles.TextView,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                      backgroundColor: themecolor.BOXBORDERCOLOR,
                    }}>
                    <TextInput
                      allowFontScaling={false}
                      // value={email}
                      placeholder={'Contact Name*'}
                      placeholderTextColor={themecolor.TXTGREYS}
                      style={{
                        ...styles.TextInput,
                        color: themecolor.TXTWHITE,
                      }}
                    // onChangeText={txt => setEmail(txt)}
                    />
                  </View>
                </View>

                <View style={{ ...styles.Mv5 }} />

                <View>
                  <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.TXTWHITE }}>Company Name</Text>
                  <View
                    style={{
                      ...styles.TextView,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                      backgroundColor: themecolor.BOXBORDERCOLOR,
                    }}>
                    <TextInput
                      allowFontScaling={false}
                      // value={email}
                      placeholder={'Company Name*'}
                      placeholderTextColor={themecolor.TXTGREYS}
                      style={{
                        ...styles.TextInput,
                        color: themecolor.TXTWHITE,
                      }}
                    // onChangeText={txt => setEmail(txt)}
                    />
                  </View>
                </View>

                <View style={{ ...styles.Mv5 }} />

                <View>
                  <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.TXTWHITE }}>Email</Text>
                  <View
                    style={{
                      ...styles.TextView,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                      backgroundColor: themecolor.BOXBORDERCOLOR,
                    }}>
                    <TextInput
                      allowFontScaling={false}
                      // value={email}
                      placeholder={'Email*'}
                      placeholderTextColor={themecolor.TXTGREYS}
                      style={{
                        ...styles.TextInput,
                        color: themecolor.TXTWHITE,
                      }}
                    // onChangeText={txt => setEmail(txt)}
                    />
                  </View>
                </View>

                <View style={{ ...styles.Mv5 }} />

                <View>
                  <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.TXTWHITE }}>Mobile Number</Text>
                  <View
                    style={{
                      ...styles.TextView,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                      backgroundColor: themecolor.BOXBORDERCOLOR,
                    }}>
                    <TextInput
                      allowFontScaling={false}
                      // value={email}
                      placeholder={'Mobile Number*'}
                      keyboardType="numeric"
                      maxLength={10}
                      placeholderTextColor={themecolor.TXTGREYS}
                      style={{
                        ...styles.TextInput,
                        color: themecolor.TXTWHITE,
                      }}
                    // onChangeText={txt => setEmail(txt)}
                    />
                  </View>
                </View>

                <View style={{ ...styles.Mv5 }} />

                <View>
                  <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.TXTWHITE }}>Comment</Text>
                  <View
                    style={{
                      ...styles.modelTextViewMsg,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                      backgroundColor: themecolor.BOXBORDERCOLOR,
                    }}>
                    <TextInput
                      allowFontScaling={false}
                      // value={email}
                      placeholder={'Comment*'}
                      multiline
                      numberOfLines={4}
                      placeholderTextColor={themecolor.TXTGREYS}
                      style={{
                        ...styles.modelTextInput,
                        color: themecolor.TXTWHITE,
                      }}
                    // onChangeText={txt => setEmail(txt)}
                    />
                  </View>
                </View>

                <View style={{ ...styles.Mv5 }} />

                <View style={{ alignItems: "flex-start", alignSelf: "flex-start", width: "100%", }}>

                  <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.TXTWHITE }}>Upload Image</Text>

                  <View style={{ padding: 5, left: 10 }}>
                    <TouchableOpacity onPress={() => captureImage()}>
                      <FIcon name="camera" size={50} color={themecolor.BORDER} />
                    </TouchableOpacity>

                  </View>
                </View>

                <View style={{ ...styles.Mv5 }} />

              </View>

              <View style={{ ...styles.Mv5 }} />

              <View
                style={{
                  ...styles.touchview,
                }}>
                <View style={{ ...styles.mainView }}>
                  <HalfSizeButton
                    title="Update RFQ"
                    icon=" "
                    backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                    color={'#fff'}
                    borderColor={themecolor.BOXBORDERCOLOR1}
                  //   onPress={() => handleEditProfile()}
                  />
                </View>
              </View>

              <View style={{ marginVertical: 60 }} />

            </View>

          </>
        )}
      </View>

    </View>
  );
}
