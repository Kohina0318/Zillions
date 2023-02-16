import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';

const slides = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../../assets/images/slide1.png'),
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../../assets/images/slide2.png'),
  },
  {
    key: 3,
    title: 'Rocket guy',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require('../../assets/images/slide3.png'),
  },
];



export default function ViewPager(props) {

    const mode = useSelector(state => state.mode);
    const Color = new MyThemeClass(mode).getThemeColor()

  const renderItem = (data) => {
    return (
      <View style={{...styles.slide}}>
        <ImageBackground source={data.item.image} style={styles.image}>
          <Text style={styles.title}>{data.item.title}</Text>
          <Text style={{...styles.text,color:Color.TXTWHITE}}>{data.item.text}</Text>
        </ImageBackground>
      </View>
    );
  };
  const onDone = () => {
    props.navigation.navigate('Dashboard');
  };
  const renderNextButton = () => {
    return (
      <View>
        <Text style={{...styles.next,color:Color.TXTWHITE}}>Next</Text>
      </View>
    );
  };
  const renderDoneButton = () => {
    return (
      <View>
        <Text style={{...styles.done,color:Color.TXTBLACK}}>Done</Text>
      </View>
    );
  };
  
    return (
      <View style={{flex: 1}}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={mode=='light' ? "dark-content":"light-content"}
        />
        <AppIntroSlider
          renderItem={(item)=>renderItem(item)}
          data={slides}
          onDone={()=>onDone()}
          dotStyle={{backgroundColor:Color.TXTGREY}}
          activeDotStyle={{backgroundColor:Color.TXTBLACK}}
          renderDoneButton={()=>renderDoneButton()}
          renderNextButton={()=>renderNextButton()}
        />
      </View>
    );
  }


  const styles = StyleSheet.create({
    slide: {
      flex: 1,
      flexDirection: 'column',
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'flex-end',
      paddingBottom: 100,
    },
    text: {
      // color: Color.graylight,
      textAlign: 'center',
    },
    title: {
      fontSize: 22,
      // color: Color.gray,
      textAlign: 'center',
    },
    dots: {
      // backgroundColor: Color.gray,
    },
    activeDots: {
      // backgroundColor: Color.colorPrimary,
    },
    next: {
      fontSize: 14,
      fontWeight: '700',
      // color: Color.gray,
    },
    done: {
      fontSize: 14,
      fontWeight: '700',
      // color: Color.colorPrimaryDark,
    },
  });