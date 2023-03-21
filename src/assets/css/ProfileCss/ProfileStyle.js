import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from '../../fonts/Fonts';
import {Colors} from '../../config/Colors';
import {FontFamily} from '../../fonts/FontFamily';
const {width, height} = Dimensions.get('window');

const ProfileStyle = StyleSheet.create({
  bg: {flex: 1},
  datalistView: {
    width: width * 0.9,
    marginTop: 6,
    padding: 10,
    borderRadius: 3,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innerImage: {
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  margleft15: {
    // marginLeft: 15,
    width: width * 0.55,
  },
  txt: {
    fontSize: FontSize.labelText2,
    fontFamily: FontFamily.Popinssemibold,
  },
  txtProfileData: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.Popinssemibold,
  },
  iconview: {flexDirection: 'row', alignItems: 'center'},
  txt1: {
    fontFamily: FontFamily.PopinsRegular,
    fontSize: 9,
    padding: 2,
    borderRadius: 60,
    color: Colors.white,
    right: 3,
  },
  iconStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    right: 5,
  },
  datalistView1: {
    width: width * 0.94,
    marginTop: 6,
    padding: 13,
    borderRadius: 7,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 0.5,
    marginBottom: 1,
    justifyContent: 'center',
  },
  datalistView2: {
    width: width,
    padding: 13,
    borderRadius: 7,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 1,
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },
  innerImage: {
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  txt2: {
    fontSize: 15,
    fontFamily: FontFamily.Popinssemibold,
    color: '#121327',
  },

  txt3: {
    fontFamily: FontFamily.PopinsRegular,
    fontSize: 9,
    padding: 2,
    borderRadius: 60,
    color: Colors.white,
    right: 3,
  },
  signInView: {justifyContent: 'center', alignItems: 'center'},

  signInText: {
    fontSize: 15,
    textAlign: 'center',
  },
  WellText: {
    fontFamily: FontFamily.abhinabolditalic,
    fontSize: FontSize.labelText4,
    fontWeight:"bold"
  },
  buttonMainView: {display: 'flex', flexDirection: 'row', marginTop: 20},
  buttonView1: {
    width: width * 0.4,
    height: height * 0.05,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    borderRadius: 8,
  },
  buttonText1: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  buttonView2: {
    width: width * 0.4,
    height: height * 0.05,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonView3: {
    width: width * 0.93,
    height: height * 0.05,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  appVerView: {
    width: width * 0.93,
    height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  appverText: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.PopinsMedium,
  },
  arrowIconView: {
    width: width * 0.08,
    left: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  welcomView: {
    width: width * 0.56,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    left: 10,
  },
  avater: {
    borderWidth: 5,
    borderColor: 'white',
    // borderStyle: 'solid',
  },
  profileDataView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingTxt: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.Popinssemibold,
    fontWeight:"bold"
  },
  ViewHeading:{
    width: width * 0.93, alignSelf: 'center', marginBottom:8
  },
  touchview: {
    width: width * 0.94,
    bottom: 0,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  mainView: {
    width: '100%',
  },
  editInnerView: {
      width:"100%",
      padding: 15,
      alignItems: 'center', 
      borderRadius: 7,
      borderWidth: 0.4,  
      marginTop:10 
  },
  TextView: {
    height: 40,
    borderRadius: 8,
    borderWidth: 0.8,
    overflow: 'hidden',
    width: width * 0.83,
  },
  TextViewHalf: {
    height: 40,
    borderRadius: 8,
    borderWidth: 0.8,
    overflow: 'hidden',
    width: width * 0.41,
  },
  TextInput:{
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.PopinsMedium,
    left: 8,
    marginRight:10
  },
  TextinputH:{
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.PopinsMedium,
    left: 5,
    bottom:4
  },
  Mv5: {
    marginVertical: 5,
  },
  Mh5: {
    marginHorizontal: 2,
  },
  inputBoxHalf:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgot: {
    width: width *0.85,
    height: height * 0.03,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

  },
  forgotTxt: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  
  
  
});

export {ProfileStyle};
