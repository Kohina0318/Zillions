import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  BackHandler,
  TextInput,

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

  const [loader, setLoader] = useState(false);
  const [userName,setUserName]=useState("")
  const [userMobileno,setUserMobileno]=useState("")
  const [userEmail,setUserEmail]=useState("")
  const [companyName,setCompanyName]=useState("")

  
  useEffect(() => {
    async function temp() {
        try {
            var userData = await getUserData();
            // console.log(userData)
            if (userData == null || userData == '' || userData == undefined) {
                setLoader(false)
           } else {
                
                var nameUser = `${userData[0].username.replace(/\s+/g, '')} ${userData[0].surname.replace(/\s+/g, '')}`
                // alert(nameUser)
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
        <>
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
                  <View>
                    <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.TXTWHITE }}>Attach BOM/RFQ</Text>
                    <View
                      style={{
                        ...styles.TextView,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                      }}>
                      <TextInput
                        allowFontScaling={false}
                        value={companyName}
                        placeholder={'*'}
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
                      onPress={() => handleEditProfile()}
                    />
                  </View>
                </View>

                <View style={{ marginVertical: 48 }} />

              </View>
            </View>

          </View>

        </>

      )}

    </View>
  );
}
