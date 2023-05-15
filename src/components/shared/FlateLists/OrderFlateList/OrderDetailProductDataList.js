import React, { useEffect, useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
} from 'react-native';
import { styles } from '../../../../assets/css/OrderCss/OrderStyle';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import RatingModel from '../../Model/RatingModel';
import { postAddProductRating } from '../../../../repository/OrderRepository/OrderRepo';
import { useToast } from 'react-native-toast-notifications';


function OrderDetailProductDataFlateList({
  item,
  themecolor,
  deliveryStatus, type
}) {

  const toast = useToast();
  const navigation = useNavigation();
  const [showmodal, setShowmodal] = useState(false);
  // const [starRating, setStarRating] = useState(item.your_rating);

  var totalAmount= ""
  var Size = '';

  if(type === "application" ){
    Size=item.size
  totalAmount=parseInt(item.total_price)
  }
  else{
    totalAmount=parseInt(item.subtotal)
    var optionData = item.option;
    
  if (
    JSON.parse(optionData).size != undefined ||
    JSON.parse(optionData).size != null
  ) {
    if (
      JSON.parse(optionData).size.value != undefined ||
      JSON.parse(optionData).size.value != null
    ) {
      var optionSizeValueData = JSON.parse(optionData).size.value;
      var data = optionSizeValueData.replace(/^["'](.+(?=["']$))["']$/, '$1');
      var data1 = data.split('*');
      Size = data1[0];
    }
  }

  }
  

  const handleAddProductRating = async () => {
    if (starRating == 0) {
      toast.show('Please fill rating Star', {
        type: 'warning',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
    else {
      try {

        let formdata = new FormData();
        formdata.append('product_id', item.id);
        formdata.append('rating', starRating);

        var res = await postAddProductRating(formdata);

        if (res.status === true) {
          setShowmodal(!showmodal)
          toast.show(res.msg, {
            type: 'success',
            placement: 'bottom',
            duration: 1000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
        else {
          setShowmodal(!showmodal)
          toast.show(res.msg, {
            type: 'warning',
            placement: 'bottom',
            duration: 1000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
      }
      catch (e) {
        setShowmodal(!showmodal)
        console.log('errrror in..handleAddProductRating page Order Detail-->', e);
        toast.show('Something went wrong!, Try again later.', {
          type: 'danger',
          placement: 'bottom',
          duration: 1000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    }
  }


  return (
    <View
      style={{
        ...styles.datalistView1,
        backgroundColor: themecolor.BOXBORDERCOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}>
      <View style={{ ...styles.marTop }} />

      <View style={{ ...styles.innerView }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('ProductMoreDetails', {
              productId: item.product_id,
              title: item.name,
            })
          }
          style={{ ...styles.innerImage }}>
          <Image
            source={{ uri: item.image }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 4,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>

        <View style={{ ...styles.TxtViewinner }}>
          <Text
            allowFontScaling={false}
            numberOfLines={2}
            style={{ ...styles.txt, color: themecolor.TXTWHITE }}>
            {item.name}
          </Text>

          <View style={{ ...styles.PriceTxtViewinner }}>
          {Size != '' ? (
          
            <View style={{...styles.borderSizeandQty,  borderColor: themecolor.TXTGREY,maxWidth: "83%"}}>
              <Text
                allowFontScaling={false} numberOfLines={1}
                style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>
                Size :{' '}
                <Text
                  allowFontScaling={false}
                  style={{ ...styles.txtBold, color: themecolor.TXTWHITE ,maxWidth: "85%", }}>
                  {Size}
                </Text>
              </Text>
            </View>
             ) : (
            <></>
          )} 

            <View style={{...styles.borderSizeandQty,  borderColor: themecolor.TXTGREY,marginLeft:7}}>
              <Text
                allowFontScaling={false}
                style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>
                Qty :{' '}
                <Text
                  allowFontScaling={false}
                  style={{ ...styles.txtBold, color: themecolor.TXTWHITE }}>
                  {item.qty}
                </Text>
              </Text>
            </View>
          </View>
          
          <View style={{ ...styles.PriceTxtViewinner }}>
            <Text
              allowFontScaling={false}
              style={{ ...styles.txt1, color: themecolor.TXTWHITE }}>
              Total Amount :{' '}
              <Text
                allowFontScaling={false}
                style={{ ...styles.txtBold, color: themecolor.TXTWHITE }}>
                <FAIcon name="rupee" size={13} /> {totalAmount}
              </Text>
            </Text>
          </View>
        </View>
      </View>

      <View style={{ ...styles.marTop }} />

      {deliveryStatus == "delivered" ?
        <>
          <View style={{ ...styles.marTop }} />

          <View style={{ ...styles.borderLine, borderColor: themecolor.BOXBORDERCOLOR1, }} />

          <View style={{ ...styles.MRT10 }} />

          {/* {starRating > 0 ?
            <View style={{ flexDirection: "row", }}>
              <View style={{ width: "60%" }}>
                <Text allowFontScaling={false} style={{ ...styles.txtSmallBig, color: themecolor.BACKICON }}>
                  Your Review
                </Text>
              </View>

              <View style={{ width: "40%" }}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={parseFloat(starRating)}
                  selectedStar={rating => onStarRatingPress(rating)}
                  starSize={20}
                  fullStarColor={themecolor.STARCOLOR}
                />
              </View>
            </View>
            :
            <View style={{ flexDirection: "row", }}>
              <View style={{ width: "40%" }}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={parseFloat(starRating)}
                  selectedStar={rating => onStarRatingPress(rating)}
                  starSize={20}
                  fullStarColor={themecolor.STARCOLOR}
                />
              </View>

              <View style={{ width: "60%", alignItems: "flex-end" }}>
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
          } */}
        </>
        : <></>}

      {/* {showmodal && (
        <RatingModel
          setShowmodal={setShowmodal}
          title={'Enter Your Review'}
          setStarRating={setStarRating}
          starRating={starRating}
          onPress={handleAddProductRating}
        />
      )} */}


    </View>
  );
}

export function OrderDetailProductDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => (
        <OrderDetailProductDataFlateList
          item={item}
          themecolor={themecolor}
          type={props.type}
        // deliveryStatus={props.deliveryStatus}
        />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
