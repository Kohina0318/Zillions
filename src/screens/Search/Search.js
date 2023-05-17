import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../assets/css/SearchCss/searchStyle';
import SearchInput from './SearchBarComponent';
import { useToast } from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { SortSlider } from './SortSlider';
import EN from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import { getSearchProducts } from '../../repository/SearchRepository/SearchRepo';
import { ProductDataList } from '../../components/shared/FlateLists/CategoryFlatList/ProductDataList';
import { PriceFlatList, SortByFlatList } from '../../components/shared/FlateLists/SearchFlatList/OrderAndPriceFlatList';
import { store } from '../../../App';

const { height } = Dimensions.get('window');

export default function Search(props) {


  function handleBackButtonClick() {
    store.dispatch({ type: 'REMOVE_SEARCH_FILTER_SORT_BY_TEMPORARY' })
    store.dispatch({ type: 'REMOVE_SEARCH_FILTER_SORT_BY' })

    store.dispatch({ type: 'REMOVE_SEARCH_FILTER_PRICE_BY_TEMPORARY' })
    store.dispatch({ type: 'REMOVE_SEARCH_FILTER_PRICE_BY' })

    props.navigation.goBack();
    return true;
  }

  React.useEffect(() => {
    setItem('');
    setIndex(true);
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const refRBSheet = useRef();
  const toast = useToast();

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [value, setValue] = useState('');
  const [item, setItem] = useState('');
  const [index, setIndex] = useState(true);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataShown, setDataShown] = useState(false);
  const [productData, setProductData] = useState([])
  const [productDataNew, setProductDataNew] = useState([])
  const [noProduct, setNoProduct] = useState('')
  const [isLoading, setIsLoading] = React.useState(false);
  const [disabledClearAll, setDisabledClearAll] = React.useState(false);
  const [sortBy, setSortBy] = useState('');
  const [price, setPrice] = useState('');

  const [getOffset, setOffset] = React.useState(0);
  const [getOffsetNew, setOffsetNew] = React.useState(0);

  const selectedSort = useSelector(state => state.searchFilterSortByTemporary);
  const selectedPrice = useSelector(state => state.searchFilterPriceByTemporary);

  const handleSearch = async (clearall) => {
    setNoProduct('')

    if (value == null || value == '') {
      setDataShown(false)
      setLoading(false)
      toast.show(
        'I am here to help you, Please give me some recognition text!',
        {
          type: 'success',
          placement: 'bottom',
          duration: 1000,
          offset: 30,
          animationType: 'slide-in',
        },
      );
    } else {
      try {
        var sortIndex = ""
        var sortItem = ""
        var priceIndex = ""
        var priceItem = ""

        if (clearall == 'clear') {
          store.dispatch({ type: 'REMOVE_SEARCH_FILTER_SORT_BY_TEMPORARY' })
          store.dispatch({ type: 'REMOVE_SEARCH_FILTER_SORT_BY' })
          store.dispatch({ type: 'REMOVE_SEARCH_FILTER_PRICE_BY_TEMPORARY' })
          store.dispatch({ type: 'REMOVE_SEARCH_FILTER_PRICE_BY' })
        }
        else {
          if (Object.values(selectedSort).length > 0) {
            var sortIndex = Object.values(selectedSort)[0].index
            var sortItem = Object.values(selectedSort)[0].item

            store.dispatch({ type: 'ADD_SEARCH_FILTER_SORT_BY', payload: [sortIndex, { index: sortIndex, item: sortItem }] })
          }

          if (Object.values(selectedPrice).length > 0) {
            var priceIndex = Object.values(selectedPrice)[0].index
            var priceItem = Object.values(selectedPrice)[0].item

            store.dispatch({ type: 'ADD_SEARCH_FILTER_PRICE_BY', payload: [priceIndex, { index: priceIndex, item: priceItem }] })
          }
        }

        // alert(`value ==> ${value} , sortBy ==> ${sortItem} , priceSortBy ==> ${priceItem} getOffset ==> ${getOffset},  productData==> ${productData} `)

        var formData = new FormData()
        formData.append("text", value)
        formData.append("sort", sortItem)
        formData.append("range", priceItem)
        formData.append("brand", 0)
        formData.append('limit', "6")
        formData.append('offset', getOffset)

        var res = await getSearchProducts(formData);

        if (res.status === true) {
          if (res.data.all_products.length > 0) {
            setDataShown(true)
            setIsLoading(true)
            setOffset(getOffset + 6)
            setOffsetNew(getOffset + 6)
            var temp1 = productData.concat(res.data.all_products)
            setProductData(temp1);
            setProductDataNew(temp1);
          } else { 
            setIsLoading(false)
            if (getOffset == 0) {
              setNoProduct("No Data")
            }
          }
          setLoading(false)
        }
        else {
          setLoading(false)
          setNoProduct("No Data")
        }
      } catch (e) {
        setLoading(false)
        setNoProduct("No Data")
        console.log('errrror in..handleSearchProduct page-->', e);

      }
    }
  };


  const handleGetvalue = txt => {
    setOffset(0);
    setProductData([]);
    setNoProduct('')
    setValue(txt);
    setDataShown(false);
    setProductDataNew([]);
  };


  const handleClear = () => {
    setOffset(0);
    setProductData([]);
    setValue("");
    setDataShown(false);
    setPrice('');
    setSortBy('');
    setNoProduct('')
    setDisabledClearAll(false);
    setLoading(false);
    store.dispatch({ type: 'REMOVE_SEARCH_FILTER_SORT_BY_TEMPORARY' })
    store.dispatch({ type: 'REMOVE_SEARCH_FILTER_SORT_BY' })

    store.dispatch({ type: 'REMOVE_SEARCH_FILTER_PRICE_BY_TEMPORARY' })
    store.dispatch({ type: 'REMOVE_SEARCH_FILTER_PRICE_BY' })
    setProductDataNew([]);
  }

  const handleOnClear = () => {
    setOffset(0);
    setProductData([]);
    setLoading(true)
    setPrice('');
    setSortBy('');
    setNoProduct('')
    setDisabledClearAll(false);
    store.dispatch({ type: 'REMOVE_SEARCH_FILTER_SORT_BY_TEMPORARY' })
    store.dispatch({ type: 'REMOVE_SEARCH_FILTER_SORT_BY' })

    store.dispatch({ type: 'REMOVE_SEARCH_FILTER_PRICE_BY_TEMPORARY' })
    store.dispatch({ type: 'REMOVE_SEARCH_FILTER_PRICE_BY' })
    setProductDataNew([]);
    handleSearch('clear');
    

  }

  const handleMin = () => {
    if (item == "SortBy") {
      setSortBy('');
      store.dispatch({ type: 'REMOVE_SEARCH_FILTER_SORT_BY_TEMPORARY' })
    }
    else {
      setPrice('');
      store.dispatch({ type: 'REMOVE_SEARCH_FILTER_PRICE_BY_TEMPORARY' })
    }
    setOffset(getOffsetNew);
    setProductData(productDataNew);
    refRBSheet.current.close();
  };



  return (
    <View style={{ backgroundColor: themecolor.THEMECOLOR, flex: 1 }}>
      <Header
        search={true}
        title="Search"
        backIcon={true}
        onPressBack={() => handleBackButtonClick()}
      />

      <View style={styles.SearchMainView}>
        <View style={styles.SearchSecondView}>
          <SearchInput
            onChange={txt => handleGetvalue(txt)}
            onpress={() => {
              setLoading(true);
              handleSearch()
            }}
            onSubmitEditing={() => {
              setLoading(true);
              handleSearch()
            }}
            onpress1={() => handleClear()}
            setProductData={setProductData}
            setNoProduct={setNoProduct}
            setOffset={setOffset}
            RightCloseIcon={value != "" ? "close" : ""}
            LeftIcon="search"
            placeholder="Search.."
          />
        </View>

        {dataShown ?
          (
            <View style={{ marginLeft: 10, flexDirection: 'row' }}>
              <SortSlider onClear={handleOnClear} setItem={setItem} refRBSheet={refRBSheet} disabledClearAll={disabledClearAll}
                sortBy={sortBy} setSortBy={setSortBy} setPrice={setPrice} price={price} />
            </View>
          ) :
          <></>

        }

        {loading ? (
          <LoadingFullScreen style={{ flex: 1 }} />
        ) : (
          noProduct == 'No Data' ?
            <View style={{ ...styles.noDataView }}>
              <Image
                source={require('../../assets/images/search.png')}
                resizeMode="contain"
                style={{ width: "100%", height: 200 }}
              />
              <Text allowFontScaling={false} style={{ ...styles.noDataText1, color: themecolor.TXTWHITE }}>Oops! No matching products found.. </Text>
              <Text allowFontScaling={false} style={{ ...styles.noDataText }}>Try another Search Term</Text>
            </View>
            :
            <>
              <View style={{ marginBottom: 50, alignSelf: "center", }}>
                <ProductDataList data={productData} handleByProduct={handleSearch} isLoading={isLoading} comeIn={'search'} />
              </View>
              <View style={{ marginVertical: 31 }} />
            </>
        )
        }

      </View>
      {loader ? (
        <LoadingFullScreen style={{ flex: 1 }} />
      ) : (
        <>
          <RBSheet
            ref={refRBSheet}
            animationType={'slide'}
            closeOnDragDown={true}
            closeOnPressMask={false}
            closeOnPressBack={false}
            height={height * 0.75}
            customStyles={{
              container: {
                backgroundColor: themecolor.THEMECOLOR,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15
              },
              draggableIcon: {
                display: 'none',
              },
            }}>
            <View style={{ ...styles.view14 }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => handleMin()} style={{ padding: 5, borderRadius: 20 }}>
                <EN name="close" color={themecolor.TXTWHITE} size={20} />
              </TouchableOpacity>
              <View style={{ left: 5 }}>
                <Text
                  allowFontScaling={false}
                  style={{ ...styles.RBText, color: themecolor.TXTWHITE }}>
                  Filter
                </Text>
              </View>
            </View>
            <View style={{ ...styles.Borderline, borderColor: themecolor.BOXBORDERCOLOR1, margin:10 }} />

            <View style={{ alignItems: 'center', height:"70%",justifyContent:"center", margin:10}}>

              {
                item == "SortBy" ?
                  <SortByFlatList setProductData={setProductData} setOffset={setOffset} />
                  :
                  <PriceFlatList setProductData={setProductData} setOffset={setOffset} />
              }
            </View>

            <View style={{ width: '94%',height:"20%", bottom: 0, alignSelf: "center", justifyContent:"center",flex:1 ,}}>
              <HalfSizeButton
                title="Apply"
                backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                color={'#fff'}
                borderColor={themecolor.BOXBORDERCOLOR1}
                onPress={() => {
                  setOffset(0);
                  setProductData([]);
                  setLoading(true);
                  setDisabledClearAll(true);
                  refRBSheet.current.close();
                  handleSearch(0);
                }
                }
              />
            </View>
          </RBSheet>
        </>
      )}
    </View>
  );
}
