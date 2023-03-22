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
import { launchCamera } from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';


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

  const [filePath, setFilePath] = useState({
    uri: 'https://picsum.photos/200/300?random=1',
  });

  const [image, setImage] = useState(false);



  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };


  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {

      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        // console.log('base64 -> ', response.assets[0].base64);
        console.log('uri -> ', response.assets[0].uri);
        console.log('width -> ', response.assets[0].width);
        console.log('height -> ', response.assets[0].height);
        console.log('fileSize -> ', response.assets[0].fileSize);
        console.log('type -> ', response.assets[0].type);
        console.log('fileName -> ', response.assets[0].fileName);
        setFilePath(response);

        ImgToBase64.getBase64String(`${response.assets[0].uri}`).then(
          base64String => {
            // console.log('Base 64 String ....', base64String);
            let body = {
              imgurl: base64String,
              id: response.assets[0].fileName,
            };
            setImage(base64String)
            setRefresh(!refresh);
          },
        );
      });
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
                  {/* {image === '' ? ( */}

                  <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.TXTWHITE }}>Upload Image</Text>

                  <View style={{ padding: 5, left: 10 }}>
                    <TouchableOpacity onPress={() => captureImage('photo')}>
                      <FIcon name="camera" size={50} color={themecolor.BORDER} />
                    </TouchableOpacity>
                    {/* ) : (
                    <View>
                      <Image
                        source={{ uri: `data:image/jpeg;base64,${image}` }}
                        style={styles.viewImage}
                      />
                      <TouchableOpacity
                        style={styles.iconTouchableOpacity}
                        // onPress={() => deleteTickets()}
                        >
                        <EIcon name="circle-with-cross" size={20} color={'tomato'} />
                      </TouchableOpacity>
                    </View>
                  )} */}
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
