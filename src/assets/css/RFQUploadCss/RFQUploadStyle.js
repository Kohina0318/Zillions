import { StyleSheet, Dimensions } from 'react-native';
import { FontSize } from '../../fonts/Fonts';
import { Colors } from '../../config/Colors';
import { FontFamily } from '../../fonts/FontFamily';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: { flex: 1 },
  Mv5: {
    marginVertical: 5,
  },
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },
  ViewHeading:{
    width: width * 0.93, alignSelf: 'center', marginBottom:8
  },
  headingTxt: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.Popinssemibold,
    fontWeight:"bold"
  },
  InnerView: {
    width:"100%",
    padding: 15,
    alignItems: 'center', 
    borderRadius: 7,
    borderWidth: 0.4,  
    marginTop:10 
},
TextView: {
  height: 43,
  borderRadius: 8,
  borderWidth: 0.8,
  overflow: 'hidden',
  width: width * 0.83,
},
TextinputH:{
  fontSize: FontSize.labelText,
  fontFamily: FontFamily.PopinsMedium,
  left: 5,
  bottom:4
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
  width: width * 0.83,
},
modelTextInput:{
  fontSize: FontSize.labelText3,
  fontFamily: FontFamily.PopinsMedium,
  left: 8,
  marginRight:10,
  textAlignVertical: 'top',
},
touchview: {
  width: width * 0.94,
  bottom: 0,
  justifyContent: 'center',
  alignSelf: 'center',
},
mainView: {
  width: '100%',
},


 
  
});

export { styles };
