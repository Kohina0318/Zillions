import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from '../fonts/Fonts';
import {Colors} from '../config/Colors';
import {FontFamily} from '../fonts/FontFamily';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: {flex: 1},
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  HeadText: {
    fontSize: FontSize.labelText4,
    color: Colors.black,
    fontFamily: FontFamily.PopinsMedium,
  },
  FLEXDIREC1: { flexDirection: 'row' },
  RateText: {
    fontSize: FontSize.labelText2,
    color: Colors.black,
    fontFamily: FontFamily.PopinsRegular,
  },
  RateTextBig: {
    fontSize: FontSize.labelText3,
    color: Colors.black,
    fontFamily: FontFamily.PopinsMedium,
  },
  touchview:
  {
      backgroundColor: "#fff",
      width: width,
      position: 'absolute',
      bottom: 0,
      height: 60,
      justifyContent: 'center',
      alignSelf:'center'
  },
  mainView:
  {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf:'center',
      alignContent:'center',
      width: width *0.94,
  },
  innerView:
  {
      width: width * 0.6,
  },
  view14:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  RBText: {
    fontSize: FontSize.mainButton,
    fontFamily: FontFamily.normal,
    fontWeight:'bold'
  },
  clrtheme:
  {
    color: Colors.bluetheme
  },
  view16:
  { justifyContent: 'center', alignSelf: 'center', flex: 1 },
  CardText: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.PopinsMedium,
    alignSelf: 'center',
    fontWeight:'bold'
  },
  align3:
  { alignSelf: 'flex-start' },
  left1:
  { left: 10 },
  view17:
  {
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    flexDirection: 'row',
  },
  marg: { marginVertical: 10 },
  Borderline: {
    width: width,
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
  },
 
});

export {styles};
