import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from '../fonts/Fonts';
import {Colors} from '../config/Colors';
import {FontFamily} from '../fonts/FontFamily';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: {flex: 1},
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
    fontSize: FontSize.labelText,
    color: Colors.black,
    fontFamily: FontFamily.PopinsMedium,
    borderRadius: 80,
    padding: 3,
    margin: 5,
    width: 50,
    textAlign: 'center',
  },
  HeadText3: {
    fontSize: FontSize.small,
    fontFamily: FontFamily.PopinsMedium,
    marginRight: 5,
    marginLeft: 5,
    width: 50,
    textAlign: 'center',
  },
  FLEXDIREC1: {flexDirection: 'row'},
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
    fontSize: FontSize.labelText2,
    fontFamily: FontFamily.PopinsMedium,
    color: Colors.black,
    marginBottom: 5,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  RBText: {
    fontSize: FontSize.mainButton,
    fontFamily: FontFamily.normal,
    fontWeight: 'bold',
  },
  clrtheme: {
    color: Colors.bluetheme,
  },
  view16: {justifyContent: 'center', alignSelf: 'center', flex: 1},
  CardText: {
    fontSize: FontSize.labelText3,
    fontFamily: FontFamily.PopinsMedium,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  align3: {alignSelf: 'flex-start'},
  left1: {left: 10},
  view17: {
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    flexDirection: 'row',
  },
  marg: {marginVertical: 10},
  Borderline: {
    width: width,
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  activeTabStyle: {
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
    fontSize: 14,
    // backgroundColor:'green'
  },
  activeTabs: {color: '#000', fontSize: 14, borderBottomWidth: 3,
},
NumericInputViewList:
    {
        width: width * 0.10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'center',
        // marginRight: 8,
    },
    
});

export {styles};
