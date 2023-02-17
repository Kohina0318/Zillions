import React from 'react';
import {View,Dimensions,Image} from 'react-native';
import {styles} from '../../../assets/css/DashboardStyle';
import Carousel from 'react-native-banner-carousel';
import {useSelector} from 'react-redux';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';

const { width, height } = Dimensions.get('screen');

export default function CarouselFile(props) {
    const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

console.log("props>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",props)
  const [largeImage, setLargeImage] = React.useState(0);

  const renderItem = (item, index) => {
    return (
      <View style={styles.container1} key={index}>
        <Image resizeMode='contain' source={{uri: item.banner}} style={styles.image} />
      </View>
    );
  };
  return (
    <>
      <Carousel
        autoplay={true}
        index={largeImage}
        pageSize={(width, height)}
        loop
        activePageIndicatorStyle={{backgroundColor: themecolor.ICON}}
        pageIndicatorStyle={{backgroundColor: themecolor.TXTGREY}}>
        {props.data.map((item, index) => renderItem(item, index))}
      </Carousel>
    </>
  );
}
