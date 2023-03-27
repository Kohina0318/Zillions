import React, { useState } from 'react';
import RenderHtml from 'react-native-render-html';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { Text, View, TouchableOpacity } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { CustomerReviewFlatList } from '../../components/shared/FlateLists/CategoryFlatList/CustomerReviewFlatList';
import { styles } from '../../assets/css/CategoryCss/ProductDetailStyle';
import StarRating from 'react-native-star-rating';
import RatingModel from '../../components/shared/Model/RatingModel';
import SegmentedControlTab from 'react-native-segmented-control-tab';

export const TabData = props => {
  const [index, setIndex] = React.useState(0);
  const [showmodal, setShowmodal] = useState(false);
  const { width: contentWidth } = useWindowDimensions();

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  var totalReview = ''
  var customerReview = []
  var description = ''
  var shipment = ''

  var productDetailData = props.productDetail;
  totalReview = productDetailData.total_reviews_avg
  customerReview = productDetailData.customer_review
  description = productDetailData.description
  shipment = productDetailData.shipment_info



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

  const handleSingleIndexSelect = inx => {
    setIndex(inx);
  };

  return (
    <>
      <SegmentedControlTab
        values={['Description', 'Shipping Info', 'Review']}
        selectedIndex={index}
        tabStyle={{
          ...styles.tabStyle,
        }}
        activeTabStyle={{
          ...styles.activeTabStyle,
          color: themecolor.BACKICON
        }}
        tabsContainerStyle={{
          backgroundColor: 'transparent',
        }}
        tabTextStyle={{
          ...styles.TabNewStyle,
          color: themecolor.TXTGREYS
        }}
        activeTabTextStyle={{ ...styles.activeTabs, color: themecolor.BACKICON, }}
        onTabPress={handleSingleIndexSelect}
      />

      <View style={{ ...styles.MGT }} />

      <View style={{ ...styles.tabBorderLine, borderColor: themecolor.BOXBORDERCOLOR1, }} />

      <View style={{ ...styles.MrT5 }} />

      <View style={{ marginBottom: 5 }}>
        {index == 0 ?
          <RenderHtml
            contentWidth={contentWidth}
            source={{ html: description }}
            enableExperimentalMarginCollapsing={true}
            enableExperimentalBRCollapsing={true}
            enableExperimentalGhostLinesPrevention={true}
            defaultViewProps={{ ...styles.tabDescriptionContainer }}
            tagsStyles={tagStyles}
          /> :
          index == 1 ?
            <RenderHtml
              contentWidth={contentWidth}
              source={{ html: shipment }}
              enableExperimentalMarginCollapsing={true}
              enableExperimentalBRCollapsing={true}
              enableExperimentalGhostLinesPrevention={true}
              enableCSSInlineProcessing={false}
              defaultViewProps={{ ...styles.tabDescriptionContainer }}
              tagsStyles={tagsStyles}
            // ignoredStyles={{backgroundColor}}
            />
            :
            <View style={{ ...styles.tabReviewContainer }}>
              <View
                style={{
                  ...styles.mainView1,
                }}>
                <View>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: themecolor.TXTWHITE,
                      fontSize: 16,
                      margin: 10,
                    }}>
                    Average User Rating :
                  </Text>
                  <View style={{ ...styles.tabStarContainer }}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={parseFloat(totalReview)}
                      selectedStar={rating => onStarRatingPress(rating)}
                      starSize={20}
                      fullStarColor={themecolor.STARCOLOR}
                    />
                  </View>
                </View>
                <View style={{ margin: 10 }}>
                  <TouchableOpacity activeOpacity={0.5} onPress={() => setShowmodal(!showmodal)}>
                    <View
                      style={{
                        backgroundColor: themecolor.ADDTOCARTBUTTONCOLOR,
                        ...styles.Review,
                      }}>
                      <Text allowFontScaling={false} style={{ color: '#FFF', textAlign: 'center', fontSize: 12, }}>
                        Give Your Review
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <CustomerReviewFlatList data={customerReview} />
              </View>
            </View>
        }

      </View>

      {showmodal && (
        <RatingModel
          setShowmodal={setShowmodal}
          title={'Enter Your Review'}
        />
      )}
    </>
  );
};
