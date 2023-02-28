import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  ScrollView,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {useToast} from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import {styles} from '../../assets/css/AddressStyle';
import {
  getManageAddress,
  postAddAddress,
  postDeleteAddress,
} from '../../repository/AddressRepository/MangeAddressRepo';
import MIcon from 'react-native-vector-icons/Ionicons';
import {ManageAddressDataList} from '../../components/shared/FlateLists/ManageAddressFlateList/ManageAddressDataList';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import AddAddressModel from '../../components/shared/Model/AddAddressModel';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';

const {width, height} = Dimensions.get('screen');

export default function Address(props) {
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

  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [addAddressModal, setAddAddressModal] = useState(false);

  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [refresh, setRefresh] = useState(false);

  const handleManageAddress = async () => {
    try {
      var res = await getManageAddress();
      setData(res.data);
      setLoader(false);
    } catch (e) {
      console.log('errrror in..getManageAddress page-->', e);
      setLoader(false);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const handleAddAddress = async () => {
    if (address == '') {
      toast.show('Address is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (state == '') {
      toast.show('State is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (city == '') {
      toast.show('City is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (postalCode == '') {
      toast.show('Postal Code is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (postalCode.length < 6) {
      toast.show('Please enter valid Postal Code!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (mobileNo == '') {
      toast.show('Mobile No. is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (mobileNo.length < 10) {
      toast.show('Please enter valid mobile number!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else {
      try {
        let formdata = new FormData();
        formdata.append('address', address);
        formdata.append('state', state);
        formdata.append('city', city);
        formdata.append('postal_code', postalCode);
        formdata.append('phone', mobileNo);
        formdata.append('country', country);

        var res = await postAddAddress(formdata);
        setAddAddressModal(false);
        setRefresh(!refresh);
        toast.show(res.msg, {
          type: 'success',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      } catch (e) {
        console.log('errrror in..getManageAddress page in address-->', e);
        setLoader(false);
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

  useEffect(() => {
    handleManageAddress();
  }, [refresh]);

  return (
    <View style={{...styles.bg, backgroundColor: themecolor.THEMECOLOR}}>
      <RegisterLoginHeader
        title={'Address'}
        onPressBack={() => handleBackButtonClick()}
      />
      <View
        style={{
          ...styles.container,
        }}>
        {loader ? (
          <LoadingFullScreen style={{flex: 1}} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{...styles.ViewHeading}}>
              <Text style={{...styles.headingTxt}}>Default Address </Text>
              <ManageAddressDataList
                data={data}
                dafault={true}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </View>

            <View style={{...styles.ViewHeading}}>
              <Text style={{...styles.headingTxt}}>Other Addresses </Text>
              <ManageAddressDataList
                data={data}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </View>

            <View style={{marginVertical: 10}} />
          </ScrollView>
        )}
      </View>

      <View
        style={{
          ...styles.touchview,
        }}
        >
        <View style={{...styles.mainView}}>
          <HalfSizeButton
            title="Add Address"
            icon={<MIcon name="add" size={16} color={'#fff'} />}
            backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
            color={'#fff'}
            borderColor={themecolor.BOXBORDERCOLOR1}
            onPress={() => setAddAddressModal(true)}
          />
        </View>
      </View>

      {addAddressModal && (
        <AddAddressModel
          setAddAddressModal={setAddAddressModal}
          setAddress={setAddress}
          setState={setState}
          setCity={setCity}
          setPostalCode={setPostalCode}
          setMobileNo={setMobileNo}
          setCountry={setCountry}
          onPress={() => handleAddAddress()}
        />
      )}
    </View>
  );
}
