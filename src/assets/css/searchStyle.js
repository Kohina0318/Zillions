import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from '../fonts/Fonts';
import {Colors} from '../config/Colors';
import {FontFamily} from '../fonts/FontFamily';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    width: width * 0.94,
    alignSelf: 'center',
    padding:8
  },
  l15: {
    left: 10,
  },
  textIn: {
    width: width * 0.8,
    fontFamily: FontFamily.PopinsRegular,
    left: 20,
    padding:0
  },
});

export {styles};
