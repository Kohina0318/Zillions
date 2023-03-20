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
import {styles} from '../../assets/css/ProfileCss/SupportTicketStyle';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import {ScrollView} from 'react-native-gesture-handler';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import Feather from 'react-native-vector-icons/Feather';
import {
  getSupportTicket,
  postCreateSupportTicket,
} from '../../repository/SupportTicketRepository/SupportTicketRepo';
import VerifyModel from '../../components/shared/Model/VerifyModel';
import CreateTicketModel from '../../components/shared/Model/CreateTicketModel';
import {SupportTicketDataList} from '../../components/shared/FlateLists/SupportTicket/SupportTicketDataList';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';
const {width, height} = Dimensions.get('screen');

export default function SupportTicket(props) {
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
  const [refresh, setRefresh] = useState(false);
  const [createTicketModal, setCreateTicketModal] = useState(false);

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);

 
  const handleAllMessages = async () => {
    try {
      const res = await getSupportTicket();
      if (res.status == true) {
        setData(res.data);
        setLoader(false);
      } else {
        setLoader(false);
       
      }
    } catch (e) {
      console.log('catch in ....support Ticket table data page', e);
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
    handleAllMessages();
  }, [refresh]);

  const handleCreateTicket = async () => {
    if (subject == '') {
      toast.show('Subject is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (message == '') {
      toast.show('Message is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else {
      try {
        let formdata = new FormData();
        formdata.append('sub', subject);
        formdata.append('reply', message);

        const res = await postCreateSupportTicket(formdata);
        if (res.status == true) {
          setRefresh(!refresh);
          setCreateTicketModal(false);
          toast.show('Create Ticket Successfully.', {
            type: 'success',
            placement: 'bottom',
            duration: 3000,
            offset: 30,
            animationType: 'slide-in',
          });
        } else {
         
        }
      } catch (e) {
        console.log('catch in .... create support Ticket page', e);
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
    <View style={{...styles.bg, backgroundColor: themecolor.THEMECOLOR}}>
      <RegisterLoginHeader
        title={'Support Ticket'}
        backIcon={true}
        onPressBack={() => handleBackButtonClick()}
      />
      <View
        style={{
          ...styles.container,
        }}>
        {loader ? (
          <LoadingFullScreen style={{flex: 1}} />
        ) : data.length > 0 ? (
          <>
            <SupportTicketDataList data={data} />
          </>
        ) : (
          <NoDataMsg  title="No Ticket Found! "/>
        )}
      </View>

      <View
        style={{
          ...styles.touchview,
        }}>
        <View style={{...styles.mainView}}>
          <HalfSizeButton
            title="Create Ticket"
            icon={<Feather name="arrow-right-circle" size={15} />}
            backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
            color={'#fff'}
            borderColor={themecolor.BOXBORDERCOLOR1}
            onPress={() => setCreateTicketModal(true)}
          />
        </View>
      </View>

      {createTicketModal && (
        <CreateTicketModel
          setCreateTicketModal={setCreateTicketModal}
          setSubject={setSubject}
          setMessage={setMessage}
          onPress={() => handleCreateTicket()}
        />
      )}
    </View>
  );
}
