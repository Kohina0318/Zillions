import React, {useState} from 'react';
import {Tab, TabView} from '@rneui/themed';
import RenderHtml from 'react-native-render-html';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {Dimensions, Text, View, TouchableOpacity} from 'react-native';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { CustomerReviewFlatList } from '../../components/shared/FlateLists/CategoryFlatList/CustomerReviewFlatList';
import { styles } from '../../assets/css/ProductDetailStyle';
import StarRating from 'react-native-star-rating';
import RatingModel from '../../components/shared/Model/RatingModel';

const {width, height} = Dimensions.get('screen');

export const TabData = props => {
  const [index, setIndex] = React.useState(0);
  const [showmodal, setShowmodal] = useState(false);
  const {widthDes} = useWindowDimensions().width;

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const tagsStyles = {
    p: {
      // backgroundColor:'grey',
      color: themecolor.TXTWHITE,
    },
  };

  const tagStyles = {
    p: {
      // backgroundColor:'grey',
      color: themecolor.TXTWHITE,
      textAlign: 'left',
      height: 'auto',
    },
    ul: {
      color: themecolor.TXTWHITE,
      height: 'auto',
      // textAlign:'left'
    },
    li: {
      color: themecolor.TXTWHITE,
      textAlign: 'left',
      height: 'auto',
    },
    span: {
      height: 'auto',
    },
    body: {
      height: 'auto',
    },
  };

  return (
    <>
      <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
        <Tab
          value={index}
          onChange={e => setIndex(e)}
          indicatorStyle={{
            backgroundColor: themecolor.BACKICON,
            height: 3,
          }}
          // scrollable={true}
          // style={{height:height*0.07}}
        >
          <Tab.Item
            title="Description"
            titleStyle={{fontSize: 12, color: themecolor.BACKICON}}
          />
          <Tab.Item
            title="Shipping Info"
            titleStyle={{fontSize: 12, color: themecolor.BACKICON}}
          />
          <Tab.Item
            title="Reviews"
            titleStyle={{fontSize: 12, color: themecolor.BACKICON}}
          />
        </Tab>

        <TabView
          containerStyle={{
            width: width * 0.98,
            height: height + 200,
            justifyContent: 'center',
          }}
          value={index}
          onChange={setIndex}
          animationType="spring">
          <TabView.Item style={{height: height}}>
            <RenderHtml
              contentWidth={widthDes}
              source={{html: props.description}}
              enableExperimentalMarginCollapsing={true}
              enableExperimentalBRCollapsing={true}
              enableExperimentalGhostLinesPrevention={true}
              defaultViewProps={{width: width * 0.8}}
              tagsStyles={tagStyles}
            />
          </TabView.Item>
          <TabView.Item>
            <RenderHtml
              contentWidth={widthDes}
              source={{html: props.shipment}}
              enableExperimentalMarginCollapsing={true}
              enableExperimentalBRCollapsing={true}
              enableExperimentalGhostLinesPrevention={true}
              enableCSSInlineProcessing={false}
              defaultViewProps={{width: width * 0.9}}
              tagsStyles={tagsStyles}
              // ignoredStyles={{backgroundColor}}
            />
          </TabView.Item>
          <TabView.Item>

          <View style={{flexDirection: 'column', width: width * 0.9}}>
    <View
      style={{
        ...styles.mainView1,
      }}>
      <View>
        <Text
          style={{
            color: themecolor.TXTWHITE,
            fontSize: 20,
            margin: 10,
          }}>
          Average User Rating :
        </Text>
        <View style={{width: width * 0.4, margin: 10}}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={props.totalReview}
            selectedStar={rating => onStarRatingPress(rating)}
            starSize={20}
            fullStarColor={themecolor.STARCOLOR}
          />
        </View>
      </View>
      <View style={{margin: 10}}>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>setShowmodal(!showmodal)}>
          <View
            style={{
              backgroundColor: themecolor.ADDTOCARTBUTTONCOLOR,
              ...styles.Review,
            }}>
            <Text style={{color: '#FFF', textAlign: 'center'}}>
              Give Your Review
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>

    <View>
    <CustomerReviewFlatList data={props.customerReview}/>
    </View>
   
  </View>           
          </TabView.Item>
        </TabView>

        {showmodal && (
        <RatingModel
          setShowmodal={setShowmodal}
          title={'Enter Your Review'}
        />
      )}
      </ScrollView>
    </>
  );
};
