import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../config/Colors';
import {FontFamily as Fonts} from '../fonts/FontFamily';
import {FontSize} from '../fonts/Fonts';

const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbarTitle: {
    fontSize: 20,
    // color: Colors.white,
    fontWeight: '700',
    // marginRight: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    // backgroundColor:'yellow'
  },
  androidButtonText: {
    color: 'blue',
    fontSize: FontSize.h1,
  },

  toolBar: {
    width: width,
    display: 'flex',
    fontSize: FontSize.h1,
    height: height * 0.09,
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: Fonts.primarySemiBold,
    justifyContent: 'space-evenly',
    backgroundColor: 'green',
  },
  title: {
    color: Colors.white,
    fontSize: FontSize.h4,
    fontWeight: '700',
    marginBottom: 16,
  },

  toggle: {
    borderRadius:20
  },
  mainView: {
    width: '100%',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomWidth:1
  },
  mainViewContainer: {
    justifyContent: 'center',
    marginTop: 22,
  },
  headerInnerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: width,
    height: 70,
  },
  iconTitle: {
    width: width * 0.697,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconView: {
    width: width * 0.17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf:"center",
  },
  iconText:{
    width: width * 0.08, alignSelf:"center",borderRadius:15
  },
  iconTitle1: {
    width: width * 0.7,
    alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInnerView1: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: width,
    height: 70,
  },
  toggle1: {
    justifyContent:'flex-start'
  },
});
