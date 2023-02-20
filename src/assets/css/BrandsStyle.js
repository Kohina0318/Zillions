import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from '../fonts/Fonts';
import {Colors} from '../config/Colors';
import {FontFamily} from '../fonts/FontFamily';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: {flex: 1},
  datalistView: {
    width: width * 0.9,
    height: 170,
    marginTop: 6,
    padding: 13,
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 1,
  },
  container: {
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop:5
  },
  innerImage: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 15,
    fontFamily: FontFamily.Popinssemibold,
    color: '#121327',
  },
  
});

export {styles};
