import React,{useRef,useState,useEffect} from 'react'
import { View,Text ,BackHandler,TouchableOpacity,Dimensions } from 'react-native'
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../assets/css/searchStyle';
import SearchInput from './SearchBarComponent';
import { useToast } from 'react-native-toast-notifications';
import { FilterFlatList } from '../../components/shared/FlateLists/SearchFlatList/FilterFlatList';
import { data } from './SearchData';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { RBSheetData } from './RBSheetData';
import { SortSlider } from './SortSlider';
import EN from 'react-native-vector-icons/Entypo';
import RBSheet from 'react-native-raw-bottom-sheet';
import { getBrands } from '../../repository/DashboardRepository/AllDashboardRep';
import { getCategories } from '../../repository/CategoryRepository/AllProductCategoryRep';



const {width, height} = Dimensions.get('window');

export default function Search(props){

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  var navigation = useNavigation();
  const refRBSheet = useRef();

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [value, setValue] = useState('');
  const [item, setItem] = useState('');
  const [index,setIndex]=useState(true)
  const [dataList,setDataList]=useState([])
  const [loader, setLoader] = useState(false);
  const toast = useToast();

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

  React.useEffect(() => {
    setItem('')
    setIndex(true)
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const handleSearch=()=>{
    if(value==null||value=='')
    {    toast.show('I am here to help you, Please give me some recognition text!', {
      type: 'success',
      placement: 'bottom',
      duration: 3000,
      offset: 30,
      animationType: 'slide-in',
    });
      
    }
    else{
      props.navigation.navigate('Search', {value: value})
    }
  }

  const handleGetvalue = value => {
    // console.log('handle get value>>>>>>>>>>>>>>>>>>>>>>.', value);
    setValue(value);
  
  };

  const handleCategories = async () => {
    try {
      var res = await getCategories();
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

  const handleData=(item)=>{
    setItem(item);
    setLoader(true);
   
    wait(500)
    .then(async()=>{
      if(item=="Brand")
      {
       await handleBrands();
      }
      if(item=="Category")
      {
      await handleCategories();
      }
    })
    .then(() => {
      setLoader(false);
      refRBSheet.current.open();
    });
    
   }
  const handleMin=()=>{
    refRBSheet.current.close()
  }
  const handleClick=()=>{
navigation.navigate(props.navigateTo)
  }


  return (
    <View style={{backgroundColor: themecolor.THEMECOLOR, flex: 1}}>
      
      <Header search={true} title="Search" backIcon={true} onPressBack={() => handleBackButtonClick()}/>
    
          
          {/* <View style={{marginTop: 10}} /> */}
          <View style={styles.SearchMainView}>
        <View style={styles.SearchSecondView}>
          <SearchInput
            onChange={value => handleGetvalue(value)}
            onPress={()=>handleSearch()}
            RightCloseIcon="close"
            LeftIcon="search"
            placeholder="Search"
          />
        </View>
        <View style={{marginLeft:10,flexDirection:'row'}}>
        <SortSlider onChange={(value)=>handleData(value)}/>
{/* <FilterFlatList touch={false} onChange={(value)=>handleData(value)} data={data} index={index}/> */}
        </View>
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
        height={height*0.97}
        customStyles={{
          container: {
            backgroundColor: themecolor.RB2,
          },
          draggableIcon: {
            display: 'none',
          },
        }}>
        <View style={{...styles.view14}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => handleMin()}>
            <EN name="cross" color={themecolor.TXTWHITE} size={20} />
          </TouchableOpacity>
          <View>
            <Text allowFontScaling={false} style={{...styles.RBText, color: themecolor.TXTWHITE}}>
              Filter
            </Text>
          </View>
        </View>
        <View style={{...styles.Borderline}} />
         
         <RBSheetData data={dataList} item={item}/>

         <View style={{width:width,marginBottom:6}}>
              <FullsizeButton width={width} title="Apply" />
            </View>
      </RBSheet>
      </>)}
      </View>

  );
}
