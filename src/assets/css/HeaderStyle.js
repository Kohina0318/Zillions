import {StyleSheet,Dimensions} from 'react-native';
import { Colors } from '../config/Colors';
import { FontFamily as Fonts } from '../fonts/FontFamily';
import { FontSize } from '../fonts/Fonts';

const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbarTitle: {
    fontSize: 20,
    // color: Colors.white,
    fontWeight: '700',
    // marginRight: 20,
    alignSelf:'center',
    justifyContent:'center',
    // backgroundColor:'yellow'
  },
  androidButtonText: {
    color: 'blue',
    fontSize: FontSize.h1,
  },

  toolBar: {
    width: width,
    display: 'flex',
    fontSize: FontSize.h1,
    height: height*0.09,
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: Fonts.primarySemiBold,
    justifyContent:'space-evenly',
    backgroundColor:'green'
  },
  title: {
    color: Colors.white,
    fontSize: FontSize.h4,
    fontWeight: '700',
    marginBottom: 16,
  },

  toggle: {
    padding: 10,
  },
});
