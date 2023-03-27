import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  BackHandler,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { styles } from '../../assets/css/BulkOrderEnquiryCss/BulkOrderStyle';
import { useToast } from 'react-native-toast-notifications';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { useNavigation } from '@react-navigation/native';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import { getProfileInfo } from '../../repository/ProfileRepository/ProfileRepo';
import { getUserData } from '../../repository/CommonRepository';
import { postBulkOrderEnquiry } from '../../repository/ProfileRepository/BulkOrderEnquiryRepo';
import FIcon from 'react-native-vector-icons/FontAwesome';
import EIcon from 'react-native-vector-icons/Entypo';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { postRFQUploadRepo } from '../../repository/ProfileRepository/RFQUploadRepo';


const { width, height } = Dimensions.get('screen');

export default function BulkOrderEnquiry(props) {

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

  const [loader, setLoader] = useState(true);
  const [userName, setUserName] = useState("")
  const [userMobileno, setUserMobileno] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [image, setImage] = useState('');


  useEffect(() => {
    async function temp() {
      try {
        var userData = await getUserData();
        if (userData == null || userData == '' || userData == undefined) {
          setLoader(false)
        } else {
          var nameUser = `${userData[0].username.replace(/\s+/g, '')} ${userData[0].surname.replace(/\s+/g, '')}`
          setUserName(nameUser)
          setUserEmail(userData[0].email)
          setUserMobileno(userData[0].phone)
          setLoader(false)
        }
      } catch (e) {
        setLoader(false)
      }
    }
    temp()
  }, [props]);


  const openGallery = () => {
    let options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error', response.error);
      } else if (response.customButtom) {
        console.log('User tapped custom Button', response.customButtom);
      } else {
        const source = {
          base64: 'data:image/jpeg;base64,' + response.assets[0].base64,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
          uri: response.assets[0].uri,
        };
        setImage(response.assets[0].base64);
      }
    });
  };

  const removeImage = () => {
    setImage('')
  }

  const handleSubmit = async () => {

    if (userName == '') {
      toast.show('Name is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (userMobileno == '') {
      toast.show('Mobile No. is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (userMobileno.length < 10) {
      toast.show('Please enter valid mobile number!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (userEmail == '') {
      toast.show('Email is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
    else if (!userEmail.includes('@') || !userEmail.includes('gmail.com')) {
      toast.show('Please enter valid email address!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
    else if (companyName == '') {
      toast.show('Company name is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
    else if (image == '') {
      toast.show('Image is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
    else {
      try {
        let formdata = new FormData();
        formdata.append('name', userName);
        formdata.append('mobileno', userMobileno);
        formdata.append('email', userEmail);
        formdata.append('company_name', companyName);
        formdata.append('image', image)

        console.log("formdata...", formdata)

        var res = await postRFQUploadRepo(formdata);
        console.log("postRFQUploadRepo...>>>", res)

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
    <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>

      <RegisterLoginHeader
        title={"Bulk Order Enquiry"}
        backIcon={true}
        onPressBack={() => handleBackButtonClick()}
      />

      {loader ? (
        <LoadingFullScreen style={{ flex: 1 }} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={{ ...styles.container, }} >
              <View style={{ ...styles.ViewHeading }}>
                <Text allowFontScaling={false} style={{ ...styles.headingTxt, color: themecolor.TXTWHITE }}>
                  Bulk order Enquiry
                </Text>

                <View
                  style={{
                    ...styles.editInnerView,
                    backgroundColor: themecolor.BOXBORDERCOLOR,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                  }}>
                  <View>
                    <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.TXTWHITE }}>Name</Text>
                    <View
                      style={{
                        ...styles.TextView,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                      }}>
                      <TextInput
                        allowFontScaling={false}
                        value={userName}
                        placeholder={'Name*'}
                        placeholderTextColor={themecolor.TXTGREYS}
                        style={{
                          ...styles.TextInput,
                          color: themecolor.TXTWHITE,
                        }}
                        onChangeText={txt => setUserName(txt)}
                      />
                    </View>
                  </View>
                  <View style={{ ...styles.Mv5 }} />
                  <View>
                    <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.TXTWHITE }}>Mobile no</Text>
                    <View
                      style={{
                        ...styles.TextView,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                      }}>
                      <TextInput
                        allowFontScaling={false}
                        keyboardType="numeric"
                        value={userMobileno}
                        placeholder={'Mobileno*'}
                        placeholderTextColor={themecolor.TXTGREYS}
                        style={{
                          ...styles.TextInput,
                          color: themecolor.TXTWHITE,
                        }}
                        onChangeText={txt => setUserMobileno(txt)}
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
                        value={userEmail}
                        placeholder={'Email*'}
                        placeholderTextColor={themecolor.TXTGREYS}
                        style={{
                          ...styles.TextInput,
                          color: themecolor.TXTWHITE,
                        }}
                        onChangeText={txt => setUserEmail(txt)}
                      />
                    </View>
                  </View>
                  <View style={{ ...styles.Mv5 }} />
                  <View style={{ alignItems: "flex-start", alignSelf: "flex-start", width: "100%", }}>
                    <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.TXTWHITE }}>Attach BOM/RFQ</Text>
                    {image === '' ? (

                      <View style={{ padding: 10, }}>
                        <TouchableOpacity onPress={() => openGallery()}>
                          <FIcon name="camera" size={50} color={themecolor.BORDER} />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={{ padding: 10, }}>
                        <Image
                          // source={{ uri: `data:image/jpeg;base64,${image}` }}
                          source={{ uri: `data:image/jpeg;base64,${image}` }}
                          style={{ width: 60, height: 60, borderRadius: 4 }}
                        />
                        <TouchableOpacity
                          style={{ position: 'absolute', zIndex: 99999, right: 0, marginTop: 0, marginRight: 0, marginTop: 5 }}
                          onPress={() => removeImage()}
                        >
                          <EIcon name="circle-with-cross" size={20} color={'tomato'} />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>


                  <View style={{ ...styles.Mv5 }} />




                  <View>
                    <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.TXTWHITE }}>Company name</Text>
                    <View
                      style={{
                        ...styles.TextView,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                      }}>
                      <TextInput
                        allowFontScaling={false}
                        value={companyName}
                        placeholder={'Company name*'}
                        placeholderTextColor={themecolor.TXTGREYS}
                        style={{
                          ...styles.TextInput,
                          color: themecolor.TXTWHITE,
                        }}
                        onChangeText={txt => setCompanyName(txt)}
                      />
                    </View>
                  </View>



                </View>
                <View style={{ ...styles.Mv5 }} />

                <View
                  style={{
                    ...styles.touchview,
                  }}>
                  <View style={{ ...styles.mainView }}>
                    <HalfSizeButton
                      title="Send"
                      icon=" "
                      backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                      color={'#fff'}
                      borderColor={themecolor.BOXBORDERCOLOR1}
                      onPress={() => handleSubmit()}
                    />
                  </View>
                </View>

                <View style={{ marginVertical: 48 }} />

              </View>
            </View>

          </View>

        </ScrollView>

      )
      }

    </View >
  );
}
