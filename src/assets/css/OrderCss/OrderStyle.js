import { StyleSheet, Dimensions } from 'react-native';
import { FontSize } from '../../fonts/Fonts';
import { Colors } from '../../config/Colors';
import { FontFamily } from '../../fonts/FontFamily';
const { width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: { 
    flex: 1,
  },
  datalistView: {
    width: width * 0.94,
    height: "auto",
    marginTop: 5,
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    marginBottom: 1,
  },
  datalistView1: {
    width: width * 0.93,
    marginTop: 3,
    padding: 13,
    borderRadius: 8,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    marginBottom: 2,
  },
  flexDirView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
  },
  flexDirView1: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
  },
  flexDirView2: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    justifyContent: "space-between"
  },
  innerView: { flexDirection: "row", width: "100%" },
  TxtViewinner: { marginLeft: 7, width: "74%", justifyContent: 'center' },
  PriceTxtViewinner: { flexDirection: 'row', width: '100%', marginTop:5 ,alignItems:'flex-start',},
  borderSizeandQty:{borderWidth: 0.5, borderRadius: 5, padding:2 , justifyContent:"center",paddingRight:5, paddingLeft:5 , flexDirection:"row",},
  innerImage: {
    borderRadius: 4,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  marTop: {
    marginTop: 5,
  },
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },
  innerImage: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  flexRow: { marginLeft: 10, width: width * 0.6,},
  flexRow1: { width: "50%" },
  txt: {
    fontSize: FontSize.labelText2,
    fontFamily: FontFamily.Popinssemibold,
    fontWeight: "bold"
  },
  txtBig: {
    fontSize: FontSize.labelText5,
    fontFamily: FontFamily.Popinssemibold,
    fontWeight: "bold"
  },
  txtSmallBig: {
    fontSize: FontSize.textInput,
    fontFamily: FontFamily.Popinssemibold,
    fontWeight: "bold"
  },
  iconview: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    padding: 5,
  },
  txtBold: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.Popinssemibold,
    fontWeight: 'bold',
  },
  txt1: {
    fontFamily: FontFamily.PopinsRegular,
    fontSize: FontSize.labelText3,
    color: Colors.white,
  },
  txt2: {
    fontFamily: FontFamily.PopinsRegular,
    fontSize: FontSize.labelText,
    color: Colors.white,
  },
  borderLine: {
    width: "100%",
    borderWidth: 0.3,
  },
  mgT10: {
    marginTop: 10
  },
  headingWidth70p: {
    width: "70%",  
  },
  headingWidth30p: {
    width: "30%", justifyContent: "flex-end", alignItems: "flex-end", alignSelf: "flex-end",  
  },
  width35p: {
    width: "35%", 
  },
  width65p: {
    width: "65%", justifyContent: "flex-end", alignItems: "flex-end", alignSelf: "flex-end", 
  },
  removeView: { width: "100%", },
  removeToch: { alignSelf: "flex-end", right: 5, },
  removeButton: {
    fontFamily: FontFamily.PopinsMedium,
    fontSize: FontSize.labelText3,
    fontWeight: 'bold',
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
  mainView1: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'center',
    width: width*0.93,
  },
  MRT10:{
    marginTop:10
  },
  Review: {
    width: width * 0.33,
    height: height * 0.029,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
});

export { styles };
