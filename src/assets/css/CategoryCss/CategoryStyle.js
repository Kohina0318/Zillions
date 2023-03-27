import {StyleSheet, Dimensions} from 'react-native';
import { fontSize } from '../../fonts/FontSize';
import { Colors } from '../../config/Colors';
import { FontFamily } from '../../fonts/FontFamily';
const {width, height} = Dimensions.get('window');

const CategoryStyle = StyleSheet.create({
  bg: {flex: 1},
  datalistView: {
    width: width * 0.93,
    height: 70,
    marginTop: 6,
    padding: 13,
    borderRadius: 7,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    marginBottom: 1,
  },
  container: {
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop:5
  },
  innerImage: {
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  margleft15: {marginLeft: 15, width: width * 0.56, },
  txt: {
    fontSize: 15,
    fontFamily: FontFamily.Popinssemibold,
    color: '#fff',
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
  innerViewMain: { flexDirection: "row", width:width, marginTop:4 , backgroundColor:"#fff", marginBottom:-7},
  
});

export {CategoryStyle};
