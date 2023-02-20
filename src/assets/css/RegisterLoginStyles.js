import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../config/Colors';
import {FontFamily} from '../fonts/FontFamily';
import {FontSize} from '../fonts/Fonts';

const {width, height} = Dimensions.get('window');
export const RegisterLoginStyles = StyleSheet.create({
  textInputpswd: {
    fontSize: 14,
    height: 45,
    fontFamily: FontFamily.PopinsRegular,
    left: 15,
    width: width * 0.81,
  },
  textInput: {
    fontSize: 14,
    height: 45,
    fontFamily: FontFamily.PopinsRegular,
    left: 15,
  },
  textInputView: {
    width: width * 0.9,
    flexDirection: 'row',
    borderRadius: 12,
    alignItems: 'center',
    // justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 0.8,
  },
  container: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 11,
    alignSelf: 'center',
  },
  MGv5: {
    marginVertical: 8,
  },
  MGv15: {
    marginVertical: 15,
  },
  forgot: {
    width: width,
    height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotTxt: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  btn: {
    width: width * 0.98,
    height: height * 0.05,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});
