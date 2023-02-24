import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from '../fonts/Fonts';
import {Colors} from '../config/Colors';
import {FontFamily} from '../fonts/FontFamily';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: {flex: 1},
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },
  touchview: {
    width: width * 0.94,
    position: 'absolute',
    bottom: 0,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  mainView: {
    width: '100%',
  },
  datalistView: {
    width: width * 0.9,
    height: 70,
    marginTop: 6,
    padding: 15,
    borderRadius: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 1,
  },
    innerView: { },
  txt: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.Popinssemibold,
  },
  txt1: {
    fontSize: FontSize.labelText2,
    fontFamily: FontFamily.Popinssemibold,
  },
  Mv5: {
    marginVertical: 5,
  },
  model: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modelContainer: {
    borderRadius: 15,
    padding: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    margin: 25,
  },
  modelInner: {
    width: width * 0.8,
    height: 'auto',
    paddingBottom: 20,
  },
  modelHeader: {
    marginTop: 8,
    padding: 5,
  },
  modelHeading: {
    fontSize: FontSize.buttonText,
    fontFamily: FontFamily.Popinssemibold,
  },
  modelTextView: {
    height: 40,
    borderRadius: 8,
    borderWidth: 0.5,
    overflow: 'hidden',
    width: width * 0.8,
  },
  modelTextInput:{
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.PopinsMedium,
    left: 8,
    marginRight:10
  },
  modelViewButton:{
    flexDirection: 'row', width: width * 0.8
  }
});

export {styles};
