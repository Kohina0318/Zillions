import {StyleSheet,Dimensions} from 'react-native';
import { Colors } from '../../../assets/config/Colors';
import { FontFamily as Fonts } from '../../../assets/fonts/FontFamily';
import { FontSize } from '../../../assets/fonts/Fonts';

const {width, height} = Dimensions.get('screen');
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
    color: Colors.white,
    fontWeight: '700',

    marginRight: 20,
  },
  androidButtonText: {
    color: 'blue',
    fontSize: FontSize.h1,
  },

  toolBar: {
    width: '100%',
    display: 'flex',
    fontSize: FontSize.h1,
    height: height*0.07,
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: Fonts.primarySemiBold,
      
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
