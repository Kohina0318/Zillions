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
import AsyncStorage from '@react-native-community/async-storage';
import {ScrollView, State} from 'react-native-gesture-handler';
import { postEditProfile } from '../../repository/ProfileRepository/EditProfileRepo';
import VerifyModel from '../../components/shared/Model/VerifyModel';
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
      var UserData = await AsyncStorage.getItem('@UserData');
      var data = JSON.parse(UserData);
      if (data == null || data == '' || data == undefined) {
        setLoader(false);
      } else {
        setFirstName(data[0].username);
        setLastName(data[0].surname);
        setEmail(data[0].email);
        setMobileNo(data[0].phone);
        setAddress(data[0].address1);
        setCity(data[0].city);
        setZip(data[0].zip);
        setstate(data[0].state);
        setCountry(data[0].country);
        setSkype(data[0].skype);
        setFacebook(data[0].facebook);
        setGooglePlus(data[0].google_plus);
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
        console.log('handleEditProfile  data....line no 104..>>>', res);

        if (res.status == true) {
            
            alert("succes")
       
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
              <Text style={{...ProfileStyle.headingTxt,color:themecolor.TXTWHITE}}>
                Change Your Profile Information
              </Text>

              <View
                style={{
                  ...ProfileStyle.editInnerView,
                  backgroundColor: themecolor.THEMECOLOR1,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                }}>
                <View style={{...ProfileStyle.Mv5}} />

                <View style={{...ProfileStyle.inputBoxHalf}}>
                  <View>
                    <Text style={{...ProfileStyle.TextinputH}}>First Name</Text>
                    <View
                      style={{
                        ...ProfileStyle.TextViewHalf,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                      }}>
                      <TextInput
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
                    <Text style={{...ProfileStyle.TextinputH}}>Last Name</Text>
                    <View
                      style={{
                        ...ProfileStyle.TextViewHalf,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                      }}>
                      <TextInput
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
                  <Text style={{...ProfileStyle.TextinputH}}>Email</Text>
                  <View
                    style={{
                      ...ProfileStyle.TextView,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                      backgroundColor: themecolor.BOXBORDERCOLOR,
                    }}>
                    <TextInput
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
                  <Text style={{...ProfileStyle.TextinputH}}>Mobile No.</Text>
                  <View
                    style={{
                      ...ProfileStyle.TextView,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                      backgroundColor: themecolor.BOXBORDERCOLOR,
                    }}>
                    <TextInput
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
              <Text style={{...ProfileStyle.headingTxt,color:themecolor.TXTWHITE}}>Shipping info</Text>
              <View
                style={{
                  ...ProfileStyle.editInnerView,
                  backgroundColor: themecolor.THEMECOLOR1,
                  borderColor: themecolor.BOXBORDERCOLOR1,
                }}>
                <View style={{...ProfileStyle.Mv5}} />

                <View>
                  <Text style={{...ProfileStyle.TextinputH}}>Address</Text>
                  <View
                    style={{
                      ...ProfileStyle.TextView,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                      backgroundColor: themecolor.BOXBORDERCOLOR,
                    }}>
                    <TextInput
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
                    <Text style={{...ProfileStyle.TextinputH}}>City</Text>
                    <View
                      style={{
                        ...ProfileStyle.TextViewHalf,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                      }}>
                      <TextInput
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
                    <Text style={{...ProfileStyle.TextinputH}}>Zip</Text>
                    <View
                      style={{
                        ...ProfileStyle.TextViewHalf,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                      }}>
                      <TextInput
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
                    <Text style={{...ProfileStyle.TextinputH}}>State</Text>
                    <View
                      style={{
                        ...ProfileStyle.TextViewHalf,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                      }}>
                      <TextInput
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
                    <Text style={{...ProfileStyle.TextinputH}}>Country</Text>
                    <View
                      style={{
                        ...ProfileStyle.TextViewHalf,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                      }}>
                      <TextInput
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
                    <Text style={{...ProfileStyle.TextinputH}}>Skype</Text>
                    <View
                      style={{
                        ...ProfileStyle.TextViewHalf,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                      }}>
                      <TextInput
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
                    <Text style={{...ProfileStyle.TextinputH}}>Facebook</Text>
                    <View
                      style={{
                        ...ProfileStyle.TextViewHalf,
                        borderColor: themecolor.BOXBORDERCOLOR1,
                        backgroundColor: themecolor.BOXBORDERCOLOR,
                      }}>
                      <TextInput
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
                  <Text style={{...ProfileStyle.TextinputH}}>Google Plus</Text>
                  <View
                    style={{
                      ...ProfileStyle.TextView,
                      borderColor: themecolor.BOXBORDERCOLOR1,
                      backgroundColor: themecolor.BOXBORDERCOLOR,
                    }}>
                    <TextInput
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
