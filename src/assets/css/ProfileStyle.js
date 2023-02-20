import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from '../fonts/Fonts';
import {Colors} from '../config/Colors';
import {FontFamily} from '../fonts/FontFamily';
const {width, height} = Dimensions.get('window');

const ProfileStyle = StyleSheet.create({
  bg: {flex: 1},
  datalistView: {
    width: width * 0.9,
    height: 60,
    marginTop: 6,
    padding: 10,
    borderBottomWidth: 2,
    borderRadius: 3,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  innerImage: {
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  margleft15: {
    // marginLeft: 15,
    width: width * 0.55,
  },
  txt: {
    fontSize: 16,
    fontFamily: FontFamily.Popinssemibold,
  },
  iconview: {flexDirection: 'row', alignItems: 'center'},

  txt1: {
    fontFamily: FontFamily.PopinsRegular,
    fontSize: 9,
    padding: 2,
    borderRadius: 60,
    color: Colors.white,
    right: 3,
  },
  iconStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    right: 5,
  },
  datalistView1: {
    width: width * 0.9,
    height: height * 0.2,
    marginTop: 6,
    padding: 13,
    borderRadius: 15,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 1,
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  innerImage: {
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  txt2: {
    fontSize: 15,
    fontFamily: FontFamily.Popinssemibold,
    color: '#121327',
  },

  txt3: {
    fontFamily: FontFamily.PopinsRegular,
    fontSize: 9,
    padding: 2,
    borderRadius: 60,
    color: Colors.white,
    right: 3,
  },
  signInView: {justifyContent: 'center', alignItems: 'center'},

  signInText: {
    fontSize: 15,
    textAlign: 'center',
  },
  buttonMainView: {display: 'flex', flexDirection: 'row', marginTop: 20},
  buttonView1: {
    width: width * 0.4,
    height: height * 0.05,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    borderRadius: 4,
  },
  buttonText1: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  buttonView2: {
    width: width * 0.4,
    height: height * 0.05,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});

export {ProfileStyle};
