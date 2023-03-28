import { StyleSheet, Dimensions } from 'react-native';
import { FontSize } from '../../fonts/Fonts';
import { Colors } from '../../config/Colors';
import { FontFamily } from '../../fonts/FontFamily';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    // justifyContent: 'center',
    alignSelf: 'center',
    width: width * 0.94,
  },
  container1: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width * 0.9,
  },
  HeadText: {
    fontSize: FontSize.labelText4,
    color: Colors.black,
    fontFamily: FontFamily.PopinsMedium,
  },
  HeadText1: {
    fontSize: FontSize.smallText,
    color: Colors.black,
    fontFamily: FontFamily.PopinsMedium,
  },
  HeadText2: {
    fontSize: FontSize.labelText2,
    fontFamily: FontFamily.PopinsMedium,
    textAlign: 'center',
  },
  HeadText3: {
    fontSize: FontSize.smallText,
    fontFamily: FontFamily.PopinsMedium,
    textAlign: 'center',
  },
  FLEXDIREC1: { flexDirection: 'row' },
  RateText: {
    fontSize: FontSize.labelText2,
    color: Colors.black,
    fontFamily: FontFamily.PopinsRegular,
  },
  RateTextBig: {
    fontSize: FontSize.labelText3,
    color: Colors.black,
    fontFamily: FontFamily.PopinsMedium,
  },
  RateTextBig1: {
    fontSize: FontSize.labelText5,
    color: Colors.black,
    fontFamily: FontFamily.PopinsMedium,
  },
  RateTextBig2: {
    fontSize: FontSize.labelText5,
    color: Colors.black,
    fontFamily: FontFamily.Popinsbold,
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
  innerView: {
    width: width * 0.6,
  },
  otherProductHeading: {
    fontSize: FontSize.labelText4,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
    marginBottom: 5,
    fontWeight:'600'
  },
  otherProductView:{
    alignSelf: 'center',
    justifyContent: 'flex-start',
    width: width * 0.94,
  },
  ViewAllButton: {
    backgroundColor: Colors.bluetheme,
    borderRadius: 30,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  ViewAllButtonIcon: {
    color: Colors.white,
    fontSize: FontSize.smallText,
  },
  view14: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
  },
  RBText1: {
    fontSize: FontSize.buttonText,
    fontFamily: FontFamily.normal,
    fontWeight: 'bold',
  },
  RBText: {
    fontSize: FontSize.mainButton,
    fontFamily: FontFamily.normal,
    fontWeight: 'bold',
  },
  clrtheme: {
    color: Colors.bluetheme,
  },
  view16: { justifyContent: 'center', marginLeft: 10, marginRight: 10, flex: 1, },
  CardText: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.PopinsMedium,
    fontWeight: 'bold',
  },
  align3: { alignSelf: 'flex-start' },
  left1: { left: 10 },
  view17: {
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    flexDirection: 'row',
  },
  marg: { marginVertical: 5 },
  Borderline: {
    width: width,
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
  },
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    // backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalCloseView: { width: width * 0.9, flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", },
  modalCloseTouch: { padding: 5, borderRadius: 20, justifyContent: "center" },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    //  position:'absolute'
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  mainView1: {
    flexDirection: 'row',
    width: width * 0.9,
    justifyContent: 'space-between',
    marginTop: 5,
  },
  Review: {
    width: width * 0.33,
    height: height * 0.036,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TimeText: {
    margin: 2,
    fontSize: FontSize.small,
    color: 'grey',
  },
  subView: {
    flexDirection: 'row',
    width: width * 0.85,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  avatarView: {
    flexDirection: 'column',
    width: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: FontSize.labelText2,
    fontFamily: FontFamily.PopinsMedium,
    margin: 5,
  },
  starView: {
    width: width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabStyle: {
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  activeTabStyle: {
    backgroundColor: 'transparent',
  },
  tabviewstyle: {
    width: width * 0.93,
    alignSelf: 'center',
    backgroundColor: 'red',
    padding: 2,
    borderRadius: 5,
    borderColor: Colors.borderColor,
    borderWidth: 1,
  },
  TabNewStyle: {
    color: Colors.black,
    fontFamily: FontFamily.PopinsMedium,
    fontSize: 15,
    fontWeight: '800'
  },
  tabBorderLine: {
    width: "100%",
    borderWidth: 0.3,
  },
  MrT5: { marginTop: 5 },
  activeTabs: {
    color: Colors.black,
    fontSize: 15,
    fontFamily: FontFamily.PopinsMedium,
    fontWeight: '800'
  },
  NumericInputViewList: {
    width: width * 0.1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'center',
    // marginRight: 8,
  },
  SizeView: {
    margin: 5,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  flexDR: {
    flexDirection: 'row',
  },
  subView1: {
    borderRadius: 5,
    padding: 10,
    borderWidth: 0.5,
  },
  BRVIEW: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  BRSUBVIEW: {
    flexDirection: 'row', width: '100%'
  },
  BRWID: {
    width: width * 0.67, flexDirection: 'column',
  },
  WID1: {
    width: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  WID9: {
    width: width * 0.9,
    margin: 10,
    flexDirection: 'row',
  },
  WID: {
    width: width * 0.85,
    margin: 10,
    flexDirection: 'column',
  },
  DELVIEW: {
    width: width * 0.9,
    margin: 5,
    flexDirection: 'row',
  },
  Tabsubview: {
    alignItems: 'center',
    marginTop: 5
  },

  MGT: {
    marginTop: 10
  },
  tabReviewContainer: {
    flexDirection: 'column', width: width * 0.88,
  },
  tabDescriptionContainer: {
    width: width * 0.85,
  },
  tabStarContainer: {
    width: width * 0.35, margin: 10
  },

  containerMain: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 5
  },
  innerViewMain: { flexDirection: "row", width: "100%" },
  innerViewMain1: {
    width: "100%", alignSelf: "center", justifyContent: "center", alignItems: "center",
    borderWidth: 0.5,padding:10,  borderRadius: 5,
  },

  datalistView: {
    width: width * 0.94,
    marginTop: 3,
    padding: 13,
    borderRadius: 8,
    borderWidth: 0.5,
    marginBottom: 2,
    backgroundColor: "red"
  },
  model: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modelContainer: {
    borderRadius: 15,
    padding: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    margin: 25,
  },
  modelInner: {
    width: width * 0.8,
    height: 'auto',
    paddingBottom: 20,
  },
  modelHeader: {
    marginTop: 8,
    padding: 5,
  },
  modelHeading: {
    fontSize: FontSize.buttonText,
    fontFamily: FontFamily.Popinssemibold,
  },
  modelTextView: {
    height: 40,
    borderRadius: 8,
    borderWidth: 0.5,
    overflow: 'hidden',
    width: width * 0.8,
  },
  modelTextViewMsg: {
    height: 'auto',
    borderRadius: 8,
    borderWidth: 0.5,
    overflow: 'hidden',
    width: width * 0.8,
  },
  modelTextInput:{
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.PopinsMedium,
    left: 8,
    marginRight:10,
    textAlignVertical: 'top',
  },
  modelViewButton:{
    flexDirection: 'row', width: width * 0.8
  },

});

export { styles };
