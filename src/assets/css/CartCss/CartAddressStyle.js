import {StyleSheet, Dimensions} from 'react-native';
import {FontFamily} from '../../fonts/FontFamily';
import {FontSize} from '../../fonts/Fonts';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: {flex: 1},
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  marginTop: {marginTop: 10},

  txtSave: {
    fontSize: FontSize.labelText4,
    fontFamily: FontFamily.Popinssemibold,
  },
  touchview: {
    backgroundColor: '#fff',
    width: width,
    position: 'absolute',
    bottom: 0,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    borderTopWidth: 0.5,
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignContent: 'center',
    width: width * 0.94,
  },
  borderLine: {
    width: '70%',
    borderWidth: 0.3,
    alignSelf: 'center',
    marginLeft: 5,
  },
  borderLine1: {
    width: '95%',
    borderWidth: 0.3,
  },
  txt: {
    fontSize: FontSize.labelText4,
    fontFamily: FontFamily.Popinssemibold,
    fontWeight: 'bold',
  },
  txtConvenienceFee: {
    fontSize: FontSize.labelText2,
    fontFamily: FontFamily.Popinssemibold,
    fontWeight: 'bold',
  },
  datalistView: {
    width: width * 0.93,
    height: 'auto',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 1,
  },
  txtChange: {
    fontSize: FontSize.labelText4,
    fontFamily: FontFamily.Popinsblack,
    alignSelf:'flex-end',
    fontWeight:'700',
  },
  txtHead: {
    fontSize: FontSize.labelTextbig,
    fontFamily: FontFamily.Popinssemibold,
    marginBottom:7
  },
  txt2: {
    fontSize: FontSize.labelText2,
    fontFamily: FontFamily.Popinssemibold,
    left:7,
    paddingRight:25,
    marginBottom:3
  },
  txtMobile: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.Popinssemibold,
    fontWeight:'600',
    left:7,
    paddingRight:25
  },
  txt1: {
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.Popinssemibold,
  },
  innerView:{
    width: width * 0.9,
  },

});

export {styles};
