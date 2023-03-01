import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import {styles} from '../../assets/css/WishListStyle';
import {WishListDataList} from '../../components/shared/FlateLists/WishlistFlatList/WishListDataList';
import {getWishlist} from '../../repository/WishListRepository/WishListRepo';
import {useFocusEffect, } from '@react-navigation/native';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
const {width, height} = Dimensions.get('screen');

export default function WishList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [loader, setLoader] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);

  const handleWishlist = async () => {
    try {
      var res = await getWishlist();
      setData(res.data);
      setLoader(false);
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
      handleWishlist();
    }, [refresh,props]),
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
              <ScrollView showsVerticalScrollIndicator={false}>
                <WishListDataList data={data} />
              </ScrollView>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Text>No data found!</Text>
              </View>
            )}
            <View style={{marginVertical: 20}} />
          </View>
        </>
      )}
    </View>
  );
}
