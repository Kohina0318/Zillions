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
    marginTop: 10,
    height: height * 0.8,
  },
  touchview: {
    width: width * 0.94,
    height: height * 0.06,
    bottom: 0,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  mainView: {
    width: '100%',
  },
  Mv5: {
    marginVertical: 5,
  },
  datalistView: {
    width: width * 0.93,
    height: 'auto',
    marginTop: 6,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: 1,
  },
  txt: {
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.Popinssemibold,
  },
  txt2: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.Popinssemibold,
    left:5
  },
  innerView:{flexDirection: 'row', justifyContent: 'space-between'},
  dateTimeView:{flexDirection:"row",justifyContent:'space-between', width: width * 0.8,margin:5},
  txt1: {
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.Popinssemibold,
  },
  buttonView:{ width:width*0.25,alignItems:"center",padding:2, borderRadius:20},
  buttontxt: {
    fontSize: FontSize.small,
    fontFamily: FontFamily.Popinssemibold,
    color:"#fff"
  },
});

export {styles};
