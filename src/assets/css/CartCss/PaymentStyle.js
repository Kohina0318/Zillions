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
  datalistView: {
    width: width * 0.9,
    marginTop: 6,
    padding: 13,
    borderRadius: 8,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 1,
  },
  innerImage: {
    borderRadius: 4,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    backgroundColor: 'red',
  },
  marginTop: {marginTop: 10},
  txt: {
    fontSize: FontSize.labelText5,
    fontFamily: FontFamily.Popinssemibold,
  },
  txt1: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.PopinsRegular,
  },
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
  PayModeTXT: {
    fontSize: FontSize.labelText5,
    fontFamily: FontFamily.Popinssemibold,
    padding:5
  },
  MethodView: {
    padding: 10,
    borderRadius: 10,
    width: width * 0.93,
  },
  FLEXR: {
    width: width * 0.93,
    flexDirection: 'row',
    margin:5,
    padding:5
  },
  FLEXR1: {
    justifyContent:'center',width:width*0.8,marginLeft:30,
    flexDirection: 'row',
    margin:5,
    padding:5,
    alignItems:'center'
  },
  FLEXR2: {
    justifyContent:'center',width:width*0.75,marginLeft:20,
    flexDirection: 'row',
    margin:5,
    padding:5,
    alignItems:'center'
  },
  payModeViewFLEXR2:{width: width * 0.62, flexDirection: 'row' ,},
  PayModeTXT1: {
    fontSize: FontSize.labelText2,
    fontFamily: FontFamily.Popinssemibold,
  },
  PayModeTXT2: {
    fontSize: FontSize.textInput,
    fontFamily: FontFamily.PopinsRegular,
    marginBottom:5
  },
  ruppee:{
    borderWidth:1,
    paddingRight:10,
    paddingLeft:10,
    textAlign:'center',
    alignSelf:'center',
    fontSize:FontSize.labelText3,
    marginRight:7,
    marginLeft:7,
    color: '#95C21B',
    borderColor: '#95C21B',
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
});

export {styles};
