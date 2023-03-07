import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import {styles} from '../../assets/css/WishListStyle';
import {WishListDataList} from '../../components/shared/FlateLists/WishlistFlatList/WishListDataList';
import {getWishlist} from '../../repository/WishListRepository/WishListRepo';
import {useFocusEffect} from '@react-navigation/native';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';
import {useNavigation} from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
const {width, height} = Dimensions.get('screen');

export default function WishList(props) {

  const toast = useToast();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const navigation = useNavigation();
  const [loader, setLoader] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [dataMsg, setDataMsg] = useState('');

  const handleWishlist = async () => {
    try {
      var res = await getWishlist();
      if (res.status === true) {
        setData(res.data);
        setLoader(false);
      } else {
        setLoader(false);
        setDataMsg(res.msg);
      }
    } catch (e) {
      console.log('errrror in..handleWishlist page wishlist-->', e);
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

  useFocusEffect(
    React.useCallback(() => {
      setLoader(true);
      handleWishlist();
    }, [props,refresh]),
  );

  return (
    <View style={{...styles.bg, backgroundColor: themecolor.THEMECOLOR}}>
      <Header title="Wishlist" />

      {loader ? (
        <LoadingFullScreen style={{flex: 1}} />
      ) : (
        <>
          <View style={{...styles.container}}>
            {data.length > 0 ? (
                <WishListDataList data={data} setRefresh={setRefresh} refresh={refresh} />
            ) : dataMsg != '' ? (
              navigation.navigate('Login')
            ) : (
              <NoDataMsg title="No Product Found!" />
            )}
            <View style={{marginVertical: 48}} />
          </View>
        </>
      )}
    </View>
  );
}
