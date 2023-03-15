import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from '../../fonts/Fonts';
import {Colors} from '../../config/Colors';
import {FontFamily} from '../../fonts/FontFamily';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    width: width * 0.94,
    alignSelf: 'center',
    padding: 8,
  },
  l15: {
    left: 10,
  },
  textIn: {
    width: width * 0.8,
    fontFamily: FontFamily.PopinsRegular,
    left: 20,
    padding: 0,
  },
  MainVIews: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 10,
    width: width,
    alignSelf: 'center',
    backgroundColor: '#e9e9e9',
    elevation: 2,
  },
  touchview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainVIews: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 10,
    width: width,
    alignSelf: 'center',
    backgroundColor: '#e9e9e9',
    elevation: 2,
  },
  SearchText: {
    marginHorizontal: 10,
    fontFamily: FontFamily.PopinsMedium,
    fontSize: FontSize.labelText2,
    color: Colors.bluetheme1,
  },
  SearchMainView: {
    flex: 1,
  },
  SearchSecondView: {
    flexDirection: 'row',
    width: width * 0.95,
    alignSelf: 'center',
  },
  Close: {alignSelf: 'center', right: 10},
  SearchBarComponent: {
    width: width * 0.95,
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 10,
    height: 40,
  },
  SearchIcon: {alignSelf: 'center', left: 10},
  SearchTextInput: {
    left: 5,
    width: width * 0.75,
    fontFamily: FontFamily.PopinsMedium,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    top: 2,
    color: '#000',
  },
  SizeView: {
    margin: 5,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 10,
  },
  SizeView1: {
    margin: 5,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  flexDR: {
    flexDirection: 'row',
  },
  HeadText2: {
    fontSize: FontSize.labelText2,
    fontFamily: FontFamily.PopinsMedium,
    textAlign: 'center',
  },
  view14: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
  },
  RBText: {
    fontSize: FontSize.newButtonText,
    fontFamily: FontFamily.PopinsMedium,
    fontWeight: '700',
    marginLeft: 5,
  },
  Borderline: {
    width: width,
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 0.3,
    borderColor: Colors.borderColor,
  },
  checkboxContainer: {
    flexDirection: 'row',
    margin: 5,
    width: width * 0.44,
  },
});

export {styles};
