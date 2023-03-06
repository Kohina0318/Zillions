import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../config/Colors';
import { FontFamily } from '../../fonts/FontFamily';
import { FontSize } from '../../fonts/Fonts';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: {flex: 1},
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  datalistView: {
    width: width * 0.9,
    marginTop: 6,
    padding: 13,
    borderRadius: 8,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 1,
  },
  innerImage: {
    borderRadius: 4,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    backgroundColor:"red"
  },
  margleft15: {marginLeft: 7, },
  txt: {
    fontSize: FontSize.labelText5,
    fontFamily: FontFamily.Popinssemibold,
  },
  txt1: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.PopinsRegular,
  },
  txtSave: {
    fontSize: FontSize.labelText4,
    fontFamily: FontFamily.Popinssemibold,
  },
  touchview: {
    backgroundColor: '#fff',
    width: width,
    position: 'absolute',
    bottom: 0,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    borderTopWidth: 0.5,
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignContent: 'center',
    width: width * 0.94,
  },

});

export {styles};
