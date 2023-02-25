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
import {getSubCategories} from '../../repository/CategoryRepository/AllProductCategoryRep';
import {useToast} from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import {styles} from '../../assets/css/AddressStyle';
import {getManageAddress} from '../../repository/AddressRepository.js/MangeAddress';
import MIcon from 'react-native-vector-icons/Ionicons';
import {ManageAddressDataList} from '../../components/shared/FlateLists/ManageAddressFlateList/ManageAddressDataList';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import AddAddressModel from '../../components/shared/Model/AddAddressModel';

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
  const [postalCode, setPostalCode] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  const handleManageAddress = async () => {
    try {
      var res = await getManageAddress();
      setData(res.data);
      setLoader(false);
    } catch (e) {
      console.log('errrror in..getSubCategories page-->', e);
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

  useEffect(() => {
    handleManageAddress();
  }, []);

  return (
    <View style={{...styles.bg, backgroundColor: themecolor.THEMECOLOR}}>
      <Header
        title={'Address'}
        backIcon={true}
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
              <ManageAddressDataList data={data} dafault={true} />
            </View>

            <View style={{...styles.ViewHeading}}>
              <Text style={{...styles.headingTxt}}>Other Addresses </Text>
              <ManageAddressDataList data={data} />
            </View>
            
            <View style={{marginVertical: 70}} />
          </ScrollView>
        )}
      </View>

      <View
        style={{
          ...styles.touchview,
        }}
        onPress={() => setAddAddressModal(true)}>
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
        />
      )}
    </View>
  );
}
