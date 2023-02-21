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
      alignSelf:'center',
      borderTopWidth:0.5,

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
  otherProductHeading:{
    fontSize: FontSize.labelText2,
      fontFamily: FontFamily.PopinsMedium,
      color: Colors.black,
      marginBottom:5,
  },
  ViewAllButton: {
    backgroundColor: Colors.bluetheme,
    borderRadius: 30,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  ViewAllButtonIcon: {
    color: Colors.white,
    fontSize: FontSize.smallText,
  },
 
});

export {styles};
