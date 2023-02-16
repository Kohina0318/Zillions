import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from '../fonts/Fonts';
import {Colors} from '../config/Colors';
import {FontFamily} from '../fonts/FontFamily';
const {width, height} = Dimensions.get('window');

const CategoryStyle = StyleSheet.create({
  bg: {flex: 1},
  datalistView: {
    width: width * 0.9,
    height: 70,
    marginTop: 6,
    padding: 13,
    borderRadius: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 1,
  },
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  innerImage: {
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  margleft15: {marginLeft: 15, width: width * 0.55, },
  txt: {
    fontSize: 15,
    fontFamily: FontFamily.Popinssemibold,
    color: '#121327',
  },
  iconview: {flexDirection: 'row', alignItems: 'center'},

  txt1: {
    fontFamily: FontFamily.PopinsRegular,
    fontSize: 9,
    padding: 2,
    borderRadius:60,
    color:Colors.white,
    right:3
  },
});

export {CategoryStyle};
