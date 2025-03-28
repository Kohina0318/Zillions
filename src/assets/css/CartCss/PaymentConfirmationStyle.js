import { StyleSheet, Dimensions } from 'react-native';
import { FontSize } from '../../fonts/Fonts';
import { FontFamily } from '../../fonts/FontFamily';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  centeredView: {
    alignSelf: 'center',
    flex: 1
  },
  modalView: {
    height: height * 0.17,
    width: width * 0.94,
    margin: 10,
    borderRadius: 8,
    flexDirection: 'row',
    borderWidth: 0.5,
  },
  ModelDoneButton: {
    height: 50,
    width: width * 0.98,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 3,
    position: 'absolute'
  },
  textStyleDone: {
    textAlign: 'center',
    fontSize: FontSize.labelText4,
    fontFamily: FontFamily.PopinsMedium,
    fontWeight: 'bold',
    color: '#FFF',
  },
  imageStyle: {
    width: 100,
    height: 100,
    alignItems: 'flex-start',
    margin: 10,
  },
  congratsView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.55,

  },
  congratsText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: FontFamily.TTCommonsBlack
  },
  txt: {
    textAlign: 'center',
    fontSize: FontSize.labelText4
  },
  mgT10: {
    marginTop: 10
  },
  datalistView: {
    width: width * 0.94,
    height: 'auto',
    padding: 15,
    alignSelf: 'center',
    borderRadius: 8,
    borderWidth: 0.5,
  },
  innerView: {
    width: width * 0.85,
  },
  txtHeading: {
    fontSize: FontSize.labelText4,
    fontFamily: FontFamily.Popinssemibold,
    fontWeight: '700',
    marginBottom: 7
  },
  txtHead: {
    fontSize: FontSize.labelTextbig,
    fontFamily: FontFamily.Popinssemibold,
    left: 6,
    marginBottom: 7
  },
  txt2: {
    fontSize: FontSize.labelText2,
    fontFamily: FontFamily.Popinssemibold,
    left: 7,
    paddingRight: 25,
    marginBottom: 3
  },
  txtMobile: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.Popinssemibold,
    fontWeight: '600',
    left: 7,
    paddingRight: 25
  },
  txt1: {
    fontSize: FontSize.labelText,
    fontFamily: FontFamily.Popinssemibold,
  },
  lef: {
    left: 15,
  }
});

export { styles };
