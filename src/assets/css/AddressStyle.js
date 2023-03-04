import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from '../fonts/Fonts';
import {Colors} from '../config/Colors';
import {FontFamily} from '../fonts/FontFamily';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: {flex: 1,},
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 5,
    height: height*0.8
  },
  touchview: {
    width: width * 0.94,
    height:height*0.06,
    bottom: 0,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  InnerView: {
    width:"100%",
    padding: 15,
    alignItems: 'center', 
    borderRadius: 8,
    borderWidth: 0.5,  
    marginTop:10 
},

  mainView: {
    width: '100%',
  },
  datalistView: {
    width: width * 0.93,
    height: 'auto',
    marginTop: 6,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 1,
  },
  txt: {
    fontSize: FontSize.labelText2,
    fontFamily: FontFamily.Popinssemibold,
  },
  txt1: {
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.Popinssemibold,
  },
  headingTxt: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.Popinssemibold,
  },
  ViewHeading:{
    width: width * 0.92, alignSelf: 'center', marginBottom:8
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
  modelTextViewMsg: {
    height: 'auto',
    borderRadius: 8,
    borderWidth: 0.5,
    overflow: 'hidden',
    width: width * 0.8,
  },
  modelTextInput:{
    fontSize: FontSize.labelText2,
    fontFamily: FontFamily.PopinsMedium,
    left: 8,
    marginRight:10
  },
  modelViewButton:{
    flexDirection: 'row', width: width * 0.8
  },
  DataButton:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignContent: 'center',
    width:"100%",
    marginTop:5
  }
});

export {styles};
