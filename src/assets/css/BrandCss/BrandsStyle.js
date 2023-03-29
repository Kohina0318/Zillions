import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from '../../fonts/Fonts';
import {Colors} from '../../config/Colors';
import {FontFamily} from '../../fonts/FontFamily';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: {flex: 1},
  datalistView: {
    width: width * 0.4,
    height: height *0.18,
    margin: 12,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 1,
    borderWidth:0.5,
    justifyContent:"center"
  },
  container: {
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop:5
  },
  innerImage: {
    height: height * 0.13,
    overflow: 'hidden',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  inner: {padding: 5, width: width * 0.35},
  txt:
    {
        color: Colors.bluetheme,
        fontFamily: FontFamily.PopinsMedium,
        fontSize: FontSize.labelText5,
        alignSelf:'center'
    },
  txt1: {
    fontFamily: FontFamily.PopinsRegular,
    fontSize: 9,
    padding: 2,
    borderRadius:60,
    color:Colors.white,
    right:3
  },
  iconview: {flexDirection: 'row', alignItems: 'center'},
  margleft15: {marginLeft: 15, width: width * 0.55, },
  contentContainerStyle:{
    width:width*0.944, justifyContent:"flex-start", 
  }
});

export {styles};
