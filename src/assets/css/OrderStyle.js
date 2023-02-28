import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from '../fonts/Fonts';
import {Colors} from '../config/Colors';
import {FontFamily} from '../fonts/FontFamily';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: {flex: 1},
  datalistView: {
    width: width * 0.93,
    height: "auto",
    marginTop: 5,
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 1,
  },
  flexDirView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
  },
  flexDirView1: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
  },
  marTop: {
    marginTop: 5,
  },
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  innerImage: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  flexRow: {marginLeft: 10, width: width * 0.55},
  flexRow1: {width:"50%"},
  txt: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.Popinssemibold,
    color: '#121327',
  },
  iconview: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    padding: 5,
  },

  txt1: {
    fontFamily: FontFamily.PopinsRegular,
    fontSize: FontSize.labelText2,
    color: Colors.white,
   },
  txt2: {
    fontFamily: FontFamily.PopinsRegular,
    fontSize: FontSize.labelText,
    color: Colors.white,
  },
});

export {styles};
