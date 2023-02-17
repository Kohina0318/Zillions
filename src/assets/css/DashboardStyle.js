import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from '../fonts/Fonts';
import {Colors} from '../config/Colors';
import {FontFamily} from '../fonts/FontFamily';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: {flex: 1,},
  container: {
    width:width *0.94,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop:5,
  },
});

export {styles};
