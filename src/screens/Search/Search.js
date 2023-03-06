import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../assets/css/searchStyle';
import SearchInput from './SearchBarComponent';
import {useToast} from 'react-native-toast-notifications';
import {FilterFlatList} from '../../components/shared/FlateLists/SearchFlatList/FilterFlatList';
import {data} from './SearchData';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import {SortSlider} from './SortSlider';
import EN from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {getBrands} from '../../repository/DashboardRepository/AllDashboardRep';
import {getCategories} from '../../repository/CategoryRepository/AllProductCategoryRep';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import { getSearchProducts } from '../../repository/SearchRepository/SearchRepo';
import { ProductDataList } from '../../components/shared/FlateLists/CategoryFlatList/ProductDataList';
import { FilterBrandFlatList,FilterCategoryFlatList } from '../../components/shared/FlateLists/SearchFlatList/FilterFlatList';
import { OrderFlatList,PriceFlatList } from '../../components/shared/FlateLists/SearchFlatList/OrderAndPriceFlatList';

const {width, height} = Dimensions.get('window');

export default function Search(props) {
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  var navigation = useNavigation();
  const refRBSheet = useRef();

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [value, setValue] = useState('');
  const [item, setItem] = useState('');
  const [index, setIndex] = useState(true);
  const [dataList, setDataList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataShown, setDataShown] = useState(false);
  const [productData,setProductData]=useState([])
  const [sortBy,setsortBy]=useState('')
  const [priceSortBy,setPriceSortBy]=useState('')
  const toast = useToast();

  function handleBackButtonClick() {
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

  const handleSearch = async() => {
    if (value == null || value == '') {
      setDataShown(false)
      toast.show(
        'I am here to help you, Please give me some recognition text!',
        {
          type: 'success',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        },
      );
    } else {
      try{
        if(!refRBSheet.current.close()){
          refRBSheet.current.close()
        }
        setLoading(true)
     var formData = new FormData()
     formData.append("text",value)
     formData.append("sort",sortBy)
     formData.append("range",priceSortBy)
     formData.append("brand",0)

        var res = await getSearchProducts(formData);
        if(res.status === true){
          setDataShown(true)
          setProductData(res.data.all_products)
          setLoading(false)
        }
      }catch(e){
        setLoading(false)
        console.log('errrror in..handleSearchProduct page-->', e);
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

  const handleGetvalue = value => {
    // console.log('handle get value>>>>>>>>>>>>>>>>>>>>>>.', value);
    setValue(value);
    setDataShown(false)
  };

  const handleChangeSortBy=(value)=>{
    setsortBy(value)
  }

  const handleChangePriceSortBy=(value)=>{
   setPriceSortBy(value)
  }

  const handleClear=()=>{
    setDataShown(false)
    setLoading(false)
  }

  const handleCategories = async () => {
    try {
      var res = await getCategories();
      console.log(res.data)
      setDataList(res.data);
    } catch (e) {
      console.log('errrror in..handleCategories page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };
  const handleBrands = async () => {
    try {
      var res = await getBrands();
      setDataList(res.data);
    } catch (e) {
      console.log('errrror in..handleBrands page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const handleData = item => {
    setItem(item);
    setLoader(true);

    wait(500)
      .then(async () => {
        if (item == 'Brand') {
          await handleBrands();
        }
        if (item == 'Category') {
          await handleCategories();
        }
      })
      .then(() => {
        setLoader(false);
        refRBSheet.current.open();
      });
  };

  const handleOnClear=()=>{
    setsortBy('')
    setPriceSortBy('')
  }


  const handleMin = () => {
    refRBSheet.current.close();
  };

  // const handleKeyPress=()=>{
  //   setDataShown(false)
  //   setsortBy('')
  // }


  return (
    <View style={{backgroundColor: themecolor.THEMECOLOR, flex: 1}}>
      <Header
        search={true}
        title="Search"
        backIcon={true}
        onPressBack={() => handleBackButtonClick()}
      />

      {/* <View style={{marginTop: 10}} /> */}
      <View style={styles.SearchMainView}>
        <View style={styles.SearchSecondView}>
          <SearchInput
          // onKeyPress={()=>handleKeyPress()}
            onChange={value => handleGetvalue(value)}
            onPress={() => handleSearch()}
            onSubmitEditing={() => handleSearch()}
            onPress1={()=>handleClear()}
            RightCloseIcon="close"
            LeftIcon="search"
            placeholder="Search"
          />
        </View>
        {loading ? (
        <LoadingFullScreen style={{flex: 1}} />
      ) : 
      dataShown? (
        <>
        <View style={{marginLeft: 10, flexDirection: 'row'}}>
          <SortSlider onClear={()=>handleOnClear()} onChange={value => handleData(value)} />
          {/* <FilterFlatList touch={false} onChange={(value)=>handleData(value)} data={data} index={index}/> */}
        </View>
      
<View style={{marginBottom:50}}>
  <ProductDataList data={productData}/>
</View>
</>)
:
<></>
}
      </View>
      {loader ? (
        <LoadingFullScreen style={{flex: 1}} />
      ) : (
        <>
          <RBSheet
            ref={refRBSheet}
            animationType={'slide'}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={height * 0.7}
            customStyles={{
              container: {  
                backgroundColor: themecolor.THEMECOLOR,
                borderTopLeftRadius:25,
                borderTopRightRadius:25
              },
              draggableIcon: {
                display: 'none',
              },
            }}>
            <View style={{...styles.view14}}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => handleMin()} style={{padding:5,borderRadius:20}}>
                <EN name="close" color={themecolor.TXTWHITE} size={20} />
              </TouchableOpacity>
              <View style={{left:5}}>
                <Text
                  allowFontScaling={false}
                  style={{...styles.RBText, color: themecolor.TXTWHITE}}>
                  Filter
                </Text>
              </View>
            </View>
            <View style={{...styles.Borderline,borderColor:themecolor.BOXBORDERCOLOR1}} />

            <View style={{alignItems:'center',height:height * 0.55,}}>
            {
      item=="Brand"?
      <FilterBrandFlatList data={dataList}/>
      :
      item=="Category"?
      <FilterCategoryFlatList data={dataList}/>
      :
      item=="SortBy"?
      <OrderFlatList onChange={(value)=>handleChangeSortBy(value)}/>
      :
      item=="Price"?
      <PriceFlatList onChange={(value)=>handleChangePriceSortBy(value)}/>
      :
      <></>

    }
            </View>

            <View style={{width: '100%',bottom:0}}>
              <HalfSizeButton
                title="Apply"
                backgroundColor={themecolor.ADDTOCARTBUTTONCOLOR}
                color={'#fff'}
                borderColor={themecolor.BOXBORDERCOLOR1}
                onPress={()=>handleSearch()}
              />
            </View>
          </RBSheet>
        </>
      )}
    </View>
  );
}
