import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  BackHandler,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {useToast} from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import {ProfileStyle} from '../../assets/css/ProfileStyle';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import {ScrollView, State} from 'react-native-gesture-handler';
import { postEditProfile } from '../../repository/ProfileRepository/EditProfileRepo';
import VerifyModel from '../../components/shared/Model/VerifyModel';
import { getProfileInfo } from '../../repository/ProfileRepository/ProfileRepo';
const {width, height} = Dimensions.get('screen');

export default function EditProfile(props) {
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
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  
  const [showmodal, setShowmodal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setstate] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [skype, setSkype] = useState('');
  const [facebook, setFacebook] = useState('');
  const [googlePlus, setGooglePlus] = useState('');

  const handleUserData = async () => {
    try {
      var res = await getProfileInfo();
      if (res.status===true) {
        setFirstName(res.data[0].username);
        setLastName(res.data[0].surname);
        setEmail(res.data[0].email);
        setMobileNo(res.data[0].phone);
        setAddress(res.data[0].address1);
        setCity(res.data[0].city);
        setZip(res.data[0].zip);
        setstate(res.data[0].state);
        setCountry(res.data[0].country);
        setSkype(res.data[0].skype);
        setFacebook(res.data[0].facebook);
        setGooglePlus(res.data[0].google_plus);
        setLoader(false);
      } else {
        setLoader(false);
      }
    } catch (e) {
      setLoader(false);
    }
  };

  useEffect(() => {
    handleUserData();
  }, []);

  const handleEditProfile = async()=>{
    try {
        let formdata=new FormData()
        formdata.append('username',firstName)
        formdata.append('surname',lastName)
        formdata.append('email',email)
        formdata.append('phone',mobileNo)
        formdata.append('address1',address)
        formdata.append('city',city)
        formdata.append('zip',zip)
        formdata.append('state',state)
        formdata.append('country',country)
        formdata.append('skype',skype)
        formdata.append('facebook',facebook)
        formdata.append('google_plus',googlePlus)

        const res = await postEditProfile(formdata);
        if (res.status == true) {
         setShowmodal(!showmodal)   
        } else {
          toast.show(res.msg, {
            type: 'danger',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
      } catch (e) {
        console.log('catch in ....Edit Profile page', e);
        toast.show('Something went wrong!, Try again later.', {
          type: 'danger',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
  }

  return (
    <View style={{...ProfileStyle.bg, backgroundColor: themecolor.THEMECOLOR}}>
      <RegisterLoginHeader
        title={'Edit Profile'}
        backIcon={true}
        onPressBack={() => handleBackButtonClick()}
      />
      <View
        style={{
          ...ProfileStyle.container,
        }}>
        {loader ? (
          <LoadingFullScreen style={{flex: 1}} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{...ProfileStyle.ViewHeading}}>
              <Text allowFontScaling={false} style={{...ProfileStyle.headingTxt,color:themecolor.TXTWHITE}}>
                Change Your Profile Information
              </Text>

              <View
                style={{
                  ...ProfileStyle.editInnerView,
                  backgroundColor: themecolor.BOXBORDERCOLOR,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                }}>
                <View style={{...ProfileStyle.Mv5}} />

                <View style={{...ProfileStyle.inputBoxHalf}}>
                  <View>
                    <Text allowFontScaling={false} style={{...ProfileStyle.TextinputH,color:themecolor.TXTGREYS}}>First Name</Text>
                    <View
                      style={{
                        ...ProfileStyle.TextViewHalf,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                      }}>
                      <TextInput
                       allowFontScaling={false}
                        value={firstName}
                        placeholder={'First Name*'}
                        placeholderTextColor={themecolor.TXTGREYS}
                        style={{
                          ...ProfileStyle.TextInput,
                          color: themecolor.TXTWHITE,
                        }}
                        onChangeText={txt => setFirstName(txt)}
                      />
                    </View>
                  </View>

                  <View style={{...ProfileStyle.Mh5}} />

                  <View>
                    <Text allowFontScaling={false} style={{...ProfileStyle.TextinputH,color:themecolor.TXTGREYS}}>Last Name</Text>
                    <View
                      style={{
                        ...ProfileStyle.TextViewHalf,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                      }}>
                      <TextInput
                       allowFontScaling={false}
                        value={lastName}
                        placeholder={'Last Name*'}
                        placeholderTextColor={themecolor.TXTGREYS}
                        style={{
                          ...ProfileStyle.TextInput,
                          color: themecolor.TXTWHITE,
                        }}
                        onChangeText={txt => setLastName(txt)}
                      />
                    </View>
                  </View>
                </View>

                <View style={{...ProfileStyle.Mv5}} />

                <View>
                  <Text allowFontScaling={false} style={{...ProfileStyle.TextinputH,color:themecolor.TXTGREYS}}>Email</Text>
                  <View
                    style={{
                      ...ProfileStyle.TextView,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                      backgroundColor: themecolor.BOXBORDERCOLOR,
                    }}>
                    <TextInput
                     allowFontScaling={false}
                      value={email}
                      placeholder={'Email*'}
                      placeholderTextColor={themecolor.TXTGREYS}
                      style={{
                        ...ProfileStyle.TextInput,
                        color: themecolor.TXTWHITE,
                      }}
                      onChangeText={txt => setEmail(txt)}
                    />
                  </View>
                </View>

                <View style={{...ProfileStyle.Mv5}} />

                <View>
                  <Text allowFontScaling={false} style={{...ProfileStyle.TextinputH,color:themecolor.TXTGREYS}}>Mobile No.</Text>
                  <View
                    style={{
                      ...ProfileStyle.TextView,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                      backgroundColor: themecolor.BOXBORDERCOLOR,
                    }}>
                    <TextInput
                     allowFontScaling={false}
                      value={mobileNo}
                      placeholder={'Mobile No.*'}
                      keyboardType="numeric"
                      maxLength={10}
                      placeholderTextColor={themecolor.TXTGREYS}
                      style={{
                        ...ProfileStyle.TextInput,
                        color: themecolor.TXTWHITE,
                      }}
                      onChangeText={txt => setMobileNo(txt)}
                    />
                  </View>
                </View>
                <View style={{...ProfileStyle.Mv5}} />
              </View>
            </View>

            <View style={{...ProfileStyle.Mv5}} />

            <View style={{...ProfileStyle.ViewHeading}}>
              <Text allowFontScaling={false} style={{...ProfileStyle.headingTxt,color:themecolor.TXTWHITE}}>Shipping info</Text>
              <View
                style={{
                  ...ProfileStyle.editInnerView,
                  backgroundColor: themecolor.BOXBORDERCOLOR,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                }}>
                <View style={{...ProfileStyle.Mv5}} />

                <View>
                  <Text allowFontScaling={false} style={{...ProfileStyle.TextinputH,color:themecolor.TXTGREYS}}>Address</Text>
                  <View
                    style={{
                      ...ProfileStyle.TextView,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                      backgroundColor: themecolor.BOXBORDERCOLOR,
                    }}>
                    <TextInput
                     allowFontScaling={false}
                      value={address}
                      placeholder={'Address*'}
                      placeholderTextColor={themecolor.TXTGREYS}
                      style={{
                        ...ProfileStyle.TextInput,
                        color: themecolor.TXTWHITE,
                      }}
                      onChangeText={txt => setAddress(txt)}
                    />
                  </View>
                </View>

                <View style={{...ProfileStyle.Mv5}} />

                <View style={{...ProfileStyle.inputBoxHalf}}>
                  <View>
                    <Text allowFontScaling={false} style={{...ProfileStyle.TextinputH,color:themecolor.TXTGREYS}}>City</Text>
                    <View
                      style={{
                        ...ProfileStyle.TextViewHalf,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                      }}>
                      <TextInput
                       allowFontScaling={false}
                        value={city}
                        placeholder={'City*'}
                        placeholderTextColor={themecolor.TXTGREYS}
                        style={{
                          ...ProfileStyle.TextInput,
                          color: themecolor.TXTWHITE,
                        }}
                        onChangeText={txt => setCity(txt)}
                      />
                    </View>
                  </View>

                  <View style={{...ProfileStyle.Mh5}} />

                  <View>
                    <Text allowFontScaling={false} style={{...ProfileStyle.TextinputH,color:themecolor.TXTGREYS}}>Zip</Text>
                    <View
                      style={{
                        ...ProfileStyle.TextViewHalf,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                      }}>
                      <TextInput
                       allowFontScaling={false}
                        value={zip}
                        placeholder={'Zip*'}
                        keyboardType="numeric"
                        maxLength={6}
                        placeholderTextColor={themecolor.TXTGREYS}
                        style={{
                          ...ProfileStyle.TextInput,
                          color: themecolor.TXTWHITE,
                        }}
                        onChangeText={txt => setZip(txt)}
                      />
                    </View>
                  </View>
                </View>

                <View style={{...ProfileStyle.Mv5}} />

                <View style={{...ProfileStyle.inputBoxHalf}}>
                  <View>
                    <Text allowFontScaling={false} style={{...ProfileStyle.TextinputH,color:themecolor.TXTGREYS}}>State</Text>
                    <View
                      style={{
                        ...ProfileStyle.TextViewHalf,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                      }}>
                      <TextInput
                       allowFontScaling={false}
                        value={state}
                        placeholder={'State*'}
                        placeholderTextColor={themecolor.TXTGREYS}
                        style={{
                          ...ProfileStyle.TextInput,
                          color: themecolor.TXTWHITE,
                        }}
                        onChangeText={txt => setstate(txt)}
                      />
                    </View>
                  </View>

                  <View style={{...ProfileStyle.Mh5}} />

                  <View>
                    <Text allowFontScaling={false} style={{...ProfileStyle.TextinputH,color:themecolor.TXTGREYS}}>Country</Text>
                    <View
                      style={{
                        ...ProfileStyle.TextViewHalf,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                      }}>
                      <TextInput
                       allowFontScaling={false}
                        value={country}
                        placeholder={'Country*'}
                        placeholderTextColor={themecolor.TXTGREYS}
                        style={{
                          ...ProfileStyle.TextInput,
                          color: themecolor.TXTWHITE,
                        }}
                        onChangeText={txt => setCountry(txt)}
                      />
                    </View>
                  </View>
                </View>

                <View style={{...ProfileStyle.Mv5}} />

                <View style={{...ProfileStyle.inputBoxHalf}}>
                  <View>
                    <Text allowFontScaling={false} style={{...ProfileStyle.TextinputH,color:themecolor.TXTGREYS}}>Skype</Text>
                    <View
                      style={{
                        ...ProfileStyle.TextViewHalf,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                      }}>
                      <TextInput
                       allowFontScaling={false}
                        value={skype}
                        placeholder={'Skype*'}
                        placeholderTextColor={themecolor.TXTGREYS}
                        style={{
                          ...ProfileStyle.TextInput,
                          color: themecolor.TXTWHITE,
                        }}
                        onChangeText={txt => setSkype(txt)}
                      />
                    </View>
                  </View>

                  <View style={{...ProfileStyle.Mh5}} />

                  <View>
                    <Text allowFontScaling={false} style={{...ProfileStyle.TextinputH,color:themecolor.TXTGREYS}}>Facebook</Text>
                    <View
                      style={{
                        ...ProfileStyle.TextViewHalf,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                      }}>
                      <TextInput
                       allowFontScaling={false}
                        value={facebook}
                        placeholder={'Facebook*'}
                        placeholderTextColor={themecolor.TXTGREYS}
                        style={{
                          ...ProfileStyle.TextInput,
                          color: themecolor.TXTWHITE,
                        }}
                        onChangeText={txt => setFacebook(txt)}
                      />
                    </View>
                  </View>
                </View>

                <View style={{...ProfileStyle.Mv5}} />

                <View>
                  <Text allowFontScaling={false} style={{...ProfileStyle.TextinputH,color:themecolor.TXTGREYS}}>Google Plus</Text>
                  <View
                    style={{
                      ...ProfileStyle.TextView,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                      backgroundColor: themecolor.BOXBORDERCOLOR,
                    }}>
                    <TextInput
                     allowFontScaling={false}
                      value={googlePlus}
                      placeholder={'Google Plus*'}
                      placeholderTextColor={themecolor.TXTGREYS}
                      style={{
                        ...ProfileStyle.TextInput,
                        color: themecolor.TXTWHITE,
                      }}
                      onChangeText={txt => setGooglePlus(txt)}
                    />
                  </View>
                </View>
                <View style={{...ProfileStyle.Mv5}} />
              </View>
            </View>

            <View style={{...ProfileStyle.Mv5}} />

            <View
              style={{
                ...ProfileStyle.touchview,
              }}>
              <View style={{...ProfileStyle.mainView}}>
                <HalfSizeButton
                  title="Update"
                  icon=" "
                  backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                  color={'#fff'}
                  borderColor={themecolor.BOXBORDERCOLOR1}
                  onPress={() => handleEditProfile()}
                />
              </View>
            </View>

            <View style={{marginVertical: 60}} />
          </ScrollView>
        )}
      </View>

      {showmodal && (
        <VerifyModel
          setShowmodal={setShowmodal}
          title={'Profile Update Successfully.'}
          navigateTo={'Dashboard'}
          navigateFrom="EditProfile"
        />
      )}
    </View>
  );
}
