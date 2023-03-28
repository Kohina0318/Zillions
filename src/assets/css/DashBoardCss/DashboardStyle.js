import {StyleSheet, Dimensions} from 'react-native';
import {FontSize} from '../../fonts/Fonts';
import {Colors} from '../../config/Colors';
import {FontFamily} from '../../fonts/FontFamily';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: {flex: 1,},
  container: {
    width:width,
    height:height*0.31,
    marginBottom:8
  },
  container1: {
    width: width,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: width,
    height: height*0.3,
  },
  header: {
    // color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 5
  },
  body: {
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  container2: {
    width:width,
    height:height*0.2
  },
  brandsContainer: {
    width:width * 0.9,
  },
    CardText: {
      fontSize: FontSize.labelText4,
      fontFamily: FontFamily.PopinsMedium,
      color: Colors.black,
      fontWeight:'600',
      alignSelf: 'center',
    },
    ViewAllButton: {
      backgroundColor: Colors.bluetheme,
      borderRadius: 30,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 15,
    },
    ViewAllButtonIcon: {
      color: Colors.white,
      fontSize: FontSize.smallText,
    },
    ViewHeading:{
      width: width * 0.94, alignSelf: 'center', marginBottom:8
    },
    ViewInnerHeading:{
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      position: 'relative',
      marginBottom:5
    }

});

export {styles};
