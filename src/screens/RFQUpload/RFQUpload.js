import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  BackHandler,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
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
import {launchImageLibrary } from 'react-native-image-picker';
import { postRFQUploadRepo } from '../../repository/ProfileRepository/RFQUploadRepo';
import { getUserData } from '../../repository/CommonRepository';



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

  const [image, setImage] = useState('');
  const [companyName, setCompanyName] = useState("")
  const [userName, setUserName] = useState("")
  const [mobileno, setMobileno] = useState("")
  const [email, setEmail] = useState("")


  useEffect(() => {
    async function temp() {
      try {
        var userData = await getUserData();
        if (userData == null || userData == '' || userData == undefined) {
          setLoader(false)
        } else {
          var nameUser = `${userData[0].username.replace(/\s+/g, '')} ${userData[0].surname.replace(/\s+/g, '')}`
          setUserName(nameUser)
          setEmail(userData[0].email)
          setMobileno(userData[0].phone)
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
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error', response.error);
      } else if (response.customButtom) {
        // console.log('User tapped custom Button', response.customButtom);
      } else {
        // const source = {
        //   base64: 'data:image/jpeg;base64,' + response.assets[0].base64,
        //   name: response.assets[0].fileName,
        //   type: response.assets[0].type,
        //   uri: response.assets[0].uri,
        // };
        setImage(response.assets[0].base64);
      }
    });
  };

  const removeImage =() =>{
    setImage('')
  }

  const handleSubmit = async () => {
   
    if (userName == '') {
      toast.show('Name is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (mobileno == '') {
      toast.show('Mobile No. is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (mobileno.length < 10) {
      toast.show('Please enter valid mobile number!', {
        type: 'warning',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (email == '') {
      toast.show('Email is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
    else if ( !email.includes('@')|| !email.includes('gmail.com')) {
      toast.show('Please enter valid email address!', {
        type: 'warning',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
    else if (companyName == '') {
      toast.show('Company name is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      })
    } 
    else if (image == '') {
      toast.show('Image is required!', {
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
        formdata.append('name', userName);
        formdata.append('mobileno', mobileno);
        formdata.append('email', email);
        formdata.append('company_name', companyName);
        formdata.append('image',image)

        var res = await postRFQUploadRepo(formdata);

        if (res.status === true) {
          navigation.navigate("Dashboard")
          toast.show(res.msg, {
            type: 'success',
            placement: 'bottom',
            duration: 1000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
        else {
          toast.show(res.msg, {
            type: 'warning',
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
          <ScrollView showsVerticalScrollIndicator={false}>
          
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
                      value={userName}
                      placeholder={'Contact Name*'}
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
                  <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.TXTWHITE }}>Company Name</Text>
                  <View
                    style={{
                      ...styles.TextView,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                      backgroundColor: themecolor.BOXBORDERCOLOR,
                    }}>
                    <TextInput
                      allowFontScaling={false}
                      value={companyName}
                      placeholder={'Company Name*'}
                      placeholderTextColor={themecolor.TXTGREYS}
                      style={{
                        ...styles.TextInput,
                        color: themecolor.TXTWHITE,
                      }}
                      onChangeText={txt => setCompanyName(txt)}
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
                      value={email}
                      placeholder={'Email*'}
                      placeholderTextColor={themecolor.TXTGREYS}
                      style={{
                        ...styles.TextInput,
                        color: themecolor.TXTWHITE,
                      }}
                      onChangeText={txt => setEmail(txt)}
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
                      value={mobileno}
                      placeholder={'Mobile Number*'}
                      keyboardType="numeric"
                      maxLength={10}
                      placeholderTextColor={themecolor.TXTGREYS}
                      style={{
                        ...styles.TextInput,
                        color: themecolor.TXTWHITE,
                      }}
                      onChangeText={txt => setMobileno(txt)}
                    />
                  </View>
                </View>

                {/* <View style={{ ...styles.Mv5 }} />

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
                      value={commentText}
                      placeholder={'Comment*'}
                      multiline
                      numberOfLines={4}
                      placeholderTextColor={themecolor.TXTGREYS}
                      style={{
                        ...styles.modelTextInput,
                        color: themecolor.TXTWHITE,
                      }}
                      onChangeText={txt => setCommentText(txt)}
                    />
                  </View>
                </View> */}

                <View style={{ ...styles.Mv5 }} />

                <View style={{ alignItems: "flex-start", alignSelf: "flex-start", width: "100%", }}>
                  <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.TXTWHITE }}>
                    Upload Image
                  </Text>

                  {image === '' ? (
                    <View style={{ padding: 10,}}>
                      <TouchableOpacity onPress={() => openGallery()}>
                        <FIcon name="camera" size={50} color={themecolor.BORDER} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={{padding:10,}}>
                      <Image
                        // source={{ uri: `data:image/jpeg;base64,${image}` }}
                        source={{ uri: `data:image/jpeg;base64,${image}` }}
                        style={{width:60, height:60,borderRadius:4}}
                      />
                      <TouchableOpacity
                        style={{ position:'absolute', zIndex:99999,right:0, marginTop:0,marginRight:0, marginTop:5 }}
                        onPress={() => removeImage()}
                      >
                        <EIcon name="circle-with-cross" size={20} color={'tomato'} />
                      </TouchableOpacity>
                    </View>
                  )}
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
                  onPress={() => handleSubmit()}
                />
              </View>
            </View>

            <View style={{ marginVertical: 60 }} />

          </View>

          </ScrollView>
        )}
    </View>

    </View >
  );
}
