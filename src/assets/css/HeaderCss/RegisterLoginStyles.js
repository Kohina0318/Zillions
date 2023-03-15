import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../config/Colors';
import {FontFamily} from '../../fonts/FontFamily'
import {FontSize} from '../../fonts/Fonts';

const {width, height} = Dimensions.get('window');
export const RegisterLoginStyles = StyleSheet.create({
  textInputpswd: {
    fontSize: 14,
    height: 45,
    fontFamily: FontFamily.PopinsRegular,
    left: 5,
    width: width * 0.68,
  },
  textInput: {
    fontSize: 14,
    height: 45,
    fontFamily: FontFamily.PopinsRegular,
    left: 5,
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
  textTwoInputView: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTwoInputView1: {
    width: width * 0.44,
    flexDirection: 'row',
    borderRadius: 12,
    alignItems: 'center',
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
    width: width *0.85,
    height: height * 0.03,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

  },
  forgotTxt: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  btn: {
    width: width * 0.9,
    height: height * 0.05,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
