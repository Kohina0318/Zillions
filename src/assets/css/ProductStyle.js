import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from '../fonts/Fonts';
import {Colors} from '../config/Colors';
import {FontFamily} from '../fonts/FontFamily';
const {width, height} = Dimensions.get('window');

const ProductStyle = StyleSheet.create({
  bg: {flex: 1},
  datalistView: {
    width: width * 0.44,
    height: height *0.32,
    margin: 5,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 1,
    borderWidth:0.5
  },
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  innerImage: {
    height: height * 0.2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  inner: {padding: 5, width: width * 0.4},
    txt:
    {
        color: Colors.bluetheme,
        fontFamily: FontFamily.PopinsMedium,
        fontSize: FontSize.labelText2
    },
    txt1:
    {
        fontFamily: FontFamily.Popinssemibold,
        color: Colors.black,
        fontSize: FontSize.labelText2
    },
    txtLine:
    {
        fontFamily: FontFamily.Popinssemibold,
        color: Colors.black,
        fontSize: FontSize.labelText2,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    },
    txt2:
    {
        fontFamily: FontFamily.PopinsRegular,
        fontSize: 10,
        color: Colors.black
    },
    
  txt: {
    fontSize: 15,
    fontFamily: FontFamily.Popinssemibold,
    color: '#121327',
  },
  iconview: {flexDirection: 'row', alignItems: 'center'},
});

export {ProductStyle};
