import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, Image,Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MyThemeClass} from '../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import {styles} from '../../../assets/css/ModelsCss/RatingModelStyle';
import StarRating from 'react-native-star-rating';

const {width, height} = Dimensions.get('screen');

const ANIMATION_TYPES = [
  'bounce',
  'flash',
  'jello',
  'pulse',
  'rotate',
  'rubberBand',
  'shake',
  'swing',
  'tada',
  'wobble',
];

export default RatingModel = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  const [starRating,setStarRating]=useState(0)
  const handleClickClose= () => {
    setModalVisible(!modalVisible);
  };

  const onStarRatingPress=(rating)=>{
    setStarRating(rating)
    setTimeout(()=>setModalVisible(!modalVisible),1000)
   
  }

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={{...styles.modalView, backgroundColor: themecolor.RB2}}>
          <View style={styles.ModalViewWidth}>
            <View style={styles.ModelVideoCenter}>
              <Text allowFontScaling={false} style={{...styles.submittext, color: themecolor.TXTWHITE}}>
                {props.title}
              </Text>
            </View>
            <View style={{justifyContent:'center',alignItems:'center',width:width*0.9}}>
            <View style={{width: width * 0.5, margin: 20}}>
          <StarRating
           activeOpacity={0.5}
            disabled={false}
            maxStars={5}
            rating={starRating}
            selectedStar={rating => onStarRatingPress(rating)}
            starSize={30}
            fullStarColor={themecolor.STARCOLOR}
          />
        </View>
        </View>
            <View style={styles.MV2} />

            <View style={styles.FLexCenter}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleClickClose()}>
                <View
                  style={{
                    ...styles.ModelDoneButton,
                    backgroundColor: themecolor.ADDTOCARTBUTTONCOLOR,
                  }}>
                  <Text allowFontScaling={false} style={{...styles.textStyleDone}}>Close</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
