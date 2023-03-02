import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from '../fonts/Fonts';
import {Colors} from '../config/Colors';
import {FontFamily} from '../fonts/FontFamily';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: {flex: 1},
  datalistView: {
    width: width * 0.46,
    height: height * 0.38,
    margin: 2,
    padding: 8,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 1,
    borderWidth: 0.5,
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },
  removeButton:{
    borderRadius: 20,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  innerImage: {
    height: height * 0.2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  inner: {padding: 2, width:"100%"},
  txt: {
    color: Colors.bluetheme,
    fontFamily: FontFamily.PopinsMedium,
    fontSize: FontSize.labelText2,
  },
  txt1: {
    fontFamily: FontFamily.Popinssemibold,
    color: Colors.black,
    fontSize: FontSize.labelText3,
  },
  txtLine: {
    fontFamily: FontFamily.Popinssemibold,
    color: Colors.black,
    fontSize: FontSize.labelText3,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  txt2: {
    fontFamily: FontFamily.PopinsRegular,
    fontSize: 10,
    color: Colors.black,
  },
  iconview: {flexDirection: 'row', alignItems: 'center'},
  AddButton: {
    backgroundColor: Colors.bluetheme,
    borderRadius: 5,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  AddButtonIcon: {
    color: Colors.white,
    fontFamily: FontFamily.Popinssemibold,
    fontSize: FontSize.labelText3,
  },
});

export {styles};
