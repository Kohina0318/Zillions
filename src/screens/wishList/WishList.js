import React, { useState} from 'react';
import {
  View,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import { styles } from '../../assets/css/WishListCss/WishListStyle';
import { WishListDataList } from '../../components/shared/FlateLists/WishlistFlatList/WishListDataList';
import { getWishlist } from '../../repository/WishListRepository/WishListRepo';
import { useFocusEffect } from '@react-navigation/native';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';

export default function WishList(props) {

  const toast = useToast();
  const navigation = useNavigation();

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [loader, setLoader] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [wishlistData, setWishlistData] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [getOffset, setOffset] = React.useState(0);


  const handleWishlist = async () => {
    try {
      var body = new FormData()
      body.append('limit', "10")
      body.append('offset', getOffset)
      
      var res = await getWishlist(body);
      if (res.status === true) {
        if (res.data.length > 0) {
          setIsLoading(true)
          setOffset(getOffset + 10)
          var temp1 = wishlistData.concat(res.data)
          setWishlistData(temp1);
        } else {
          setIsLoading(false)
        }
        setLoader(false);
      }
      else if (res.msg == "Invalid Authentication") {
        setLoader(false);
        setWishlistData([]);
        Alert.alert(
          'Login to continue',
          'Do you want to Login?',
          [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'Yes', onPress: () => navigation.navigate('Login') },
          ],
        );
      }
      else {
        setLoader(false);
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
    }, [props, refresh]),
  );

  return (
    <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>
      <Header title="Wishlist" />

      {loader ? (
        <LoadingFullScreen style={{ flex: 1 }} />
      ) : (
        <>
          <View style={{ ...styles.container }}>
            {wishlistData.length > 0 ? (
              <WishListDataList data={wishlistData} setRefresh={setRefresh} refresh={refresh} handleWishlist={handleWishlist} isLoading={isLoading} setOffset={setOffset} setWishlistData={setWishlistData} />
            ) : (
              <NoDataMsg title="No Product Found!" />
            )}
            <View style={{ marginVertical: 48 }} />
          </View>


        </>
      )}
    </View>
  );
}
