import React, { useState, useEffect } from 'react';
import {
  View,
  BackHandler,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {styles} from '../../assets/css/OrderCss/OrderStyle';
import {OrderDataList} from '../../components/shared/FlateLists/OrderFlateList/OrderDataList';
import Search from '../../components/shared/search/Search';
import { getOrderlist } from '../../repository/OrderRepository/OrderRepo';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import RegisterLoginHeader from '../../components/shared/header/RegisterLoginHeader';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';
import { useToast } from 'react-native-toast-notifications';

export default function Order(props) {
  function handleBackButtonClick() {
    if (props.route.params != undefined) {
      props.navigation.navigate('Dashboard');
    } else {
      props.navigation.goBack();
    }
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
  const [dataFilter, setDataFilter] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [getOffset, setOffset] = React.useState(0);


  const handleOrderlist = async () => {
    try {
      var body = new FormData()
      body.append('limit', "10")
      body.append('offset', getOffset)

      var res = await getOrderlist(body);
      if (res.status === true) {
        if (res.data.length > 0) {
          setIsLoading(true)
          setOffset(getOffset + 10)
          var temp1 = data.concat(res.data)
          setData(temp1);
          setDataFilter(temp1);
        } else {
          setIsLoading(false)
        }
        setLoader(false);
      }
      else{
        setLoader(false)
      }

    } catch (e) {
      console.log('errrror in..handleOrderlist page wishlist-->', e);
      setLoader(false);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  useEffect(() => {
    handleOrderlist();
  }, []);

  const filtering = async search => {
    var temp = dataFilter.filter(item => {
      return (
        item.sale_code.toLowerCase().includes(search.toLowerCase()) ||
        item.sale_code.toLowerCase().includes(search.toLowerCase())
      );
    });
    setData(temp);
  };

  return (
    <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>
      <RegisterLoginHeader
        title="My Order"
        backIcon={true}
        onPressBack={() => handleBackButtonClick()}
      />
      {loader ? (
        <LoadingFullScreen style={{ flex: 1 }} />
      ) : (
        <View style={{ ...styles.container }}>
          {/* <Search title={'Search by order Id..'} filtering={filtering} /> */}

          {/* <View style={{ ...styles.marTop }} /> */}

          {data.length > 0 ? (
            <>
              <OrderDataList data={data} handleOrderlist={(value) => handleOrderlist(value)} isLoading={isLoading} />
              <View style={{ ...styles.mgT10 }} />
            </>
          ) : (
            <NoDataMsg title="No Order Found! " />
          )}
          <View style={{ marginVertical: 42 }} />
        </View>
      )}
    </View>
  );
}
