import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  BackHandler,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { styles } from '../../assets/css/BulkOrderEnquiryCss/BulkOrderEnquiry';
import { useToast } from 'react-native-toast-notifications';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { useNavigation } from '@react-navigation/native';


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
    <Text>Bulk Order Enquiry</Text>
</View>

        </>

      )}

    </View>
  );
}
