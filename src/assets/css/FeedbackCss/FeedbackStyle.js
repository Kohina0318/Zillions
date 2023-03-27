import { StyleSheet, Dimensions } from 'react-native';
import { FontSize } from '../../fonts/Fonts';
import { FontFamily } from '../../fonts/FontFamily';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },
  headingTxt: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.Popinssemibold,
    fontWeight:"bold"
  },
  ViewHeading:{
    width: width * 0.93, alignSelf: 'center', marginBottom:8
  },
  editInnerView: {
    width:"100%",
    padding: 15,
    alignItems: 'center', 
    borderRadius: 7,
    borderWidth: 0.4,  
    marginTop:10 
},
Mv5: {
  marginVertical: 5,
},
TextinputH:{
  fontSize: FontSize.labelText,
  fontFamily: FontFamily.PopinsMedium,
  left: 5,
  bottom:4
},
TextViewPswd: {
  height: 43,
  borderRadius: 8,
  borderWidth: 0.8,
  overflow: 'hidden',
  width: width * 0.83,
  flexDirection:"row",
  alignItems:"center",
  alignSelf:"center",
},
TextInput:{
  fontSize: FontSize.labelText3,
  fontFamily: FontFamily.PopinsMedium,
  left: 8,
  marginRight:10
},
TextinputH:{
  fontSize: FontSize.labelText,
  fontFamily: FontFamily.PopinsMedium,
  left: 5,
  bottom:4
},
TextView: {
  height: 43,
  borderRadius: 8,
  borderWidth: 0.8,
  overflow: 'hidden',
  width: width * 0.83,
},
TextInput:{
  fontSize: FontSize.labelText3,
  fontFamily: FontFamily.PopinsMedium,
  left: 8,
  marginRight:10
},
modelTextViewMsg: {
  height: 'auto',
  borderRadius: 8,
  borderWidth: 0.5,
  overflow: 'hidden',
  width: width * 0.82,
},
modelTextInput:{
  fontSize: FontSize.labelText3,
  fontFamily: FontFamily.PopinsMedium,
  left: 8,
  marginRight:10,
  textAlignVertical: 'top',
},
});

export { styles };
