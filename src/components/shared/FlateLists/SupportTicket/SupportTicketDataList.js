import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {styles} from '../../../../assets/css/SupportTicketStyle';
import {MyThemeClass} from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('screen');

function SupportTicketDataFlateList({item, themecolor}) {
  const navigation = useNavigation();

  const d = new Date(item.time * 1000);
  const day = d.toLocaleString(d.getDate());
  var dateTime = [];
  dateTime = day.split(',');

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        ...styles.datalistView,
        backgroundColor: themecolor.BOXBORDERCOLOR,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}>
      <View style={{...styles.innerView}}>
        <Text allowFontScaling={false} style={{...styles.txt, color: themecolor.BACKICON}}>
          Ticket No : {item.ticket_id}
        </Text>
        {item.view_status == 'ok' ? (
          <View
            style={{
              ...styles.buttonView,
              backgroundColor: themecolor.ADDTOCARTBUTTONCOLOR,
            }}>
            <Text allowFontScaling={false} style={{...styles.buttontxt}}>OPEN</Text>
          </View>
        ) : (
          <View
            style={{...styles.buttonView, backgroundColor: themecolor.TEXTRED}}>
            <Text allowFontScaling={false} style={{...styles.buttontxt}}>CLOSE</Text>
          </View>
        )}
      </View>

      <View style={{width: width * 0.8, marginTop: 5}}>
        <Text allowFontScaling={false} style={{...styles.txt2, color: themecolor.TXTWHITE}}>
          {item.subject}
        </Text>
      </View>

      <View style={{...styles.dateTimeView}}>
        <View style={{}}>
          <Text allowFontScaling={false} style={{...styles.txt1, color: themecolor.TXTWHITE}}>
            Date :
            <Text allowFontScaling={false} style={{...styles.txt1, color: themecolor.TXTWHITE}}>
              {' '}
              {dateTime[0]}
            </Text>
          </Text>
        </View>

        <View style={{}}>
          <Text allowFontScaling={false} style={{...styles.txt1, color: themecolor.TXTWHITE}}>
            Time :
            <Text allowFontScaling={false} style={{...styles.txt1, color: themecolor.TXTWHITE}}>
              {' '}
              {dateTime[1]}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function SupportTicketDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <FlatList
      data={props.data}
      renderItem={({item}) => (
        <SupportTicketDataFlateList item={item} themecolor={themecolor} />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
