import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../config/Colors';
import { FontFamily } from '../../fonts/FontFamily';
import { FontSize } from '../../fonts/Fonts';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  datalistView: {
    width: width * 0.93,
    marginTop: 6,
    padding: 13,
    borderRadius: 8,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 1,
  },
  innerView: { flexDirection: "row", width: "100%" },
  innerImage: {
    borderRadius: 4,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  TxtViewinner: { marginLeft: 7, width: "74%",justifyContent:'center' },
  PriceTxtViewinner: { flexDirection: 'row', width: '100%' },
  txt: {
    fontSize: FontSize.labelText4,
    fontFamily: FontFamily.Popinssemibold,
    fontWeight: 'bold',
  },
  txtConvenienceFee: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.Popinssemibold,
    fontWeight: 'bold',
  },
  txt1: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.PopinsRegular,
  },
  txtLine:{
        fontFamily: FontFamily.PopinsRegular,
        fontSize: FontSize.labelText3,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    },
  txtSave: {
    fontSize: FontSize.labelText4,
    fontFamily: FontFamily.Popinssemibold,
  },
  borderLine: {
    width: "100%",
    borderWidth: 0.3,
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
  MVT: {
    marginTop: 10
  },
  removeView:{width: "100%" ,},
  removeToch:{alignSelf:"flex-end",right:5,},
  removeButton: {
    fontFamily: FontFamily.PopinsMedium,
    fontSize: FontSize.labelText3,
    fontWeight: 'bold',
  },
  mv5:{
    marginTop:5
  },
  orderDetialcompWidth:{
    width: "45%",
  },
  orderDetialcompWidth1:{
    width: "55%",justifyContent:'flex-end', alignItems:'flex-end',
  }

});

export { styles };
