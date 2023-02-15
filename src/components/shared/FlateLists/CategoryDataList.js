import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {Colors} from '../../../assets/config/Colors';

const {width} = Dimensions.get('screen');

function CategoryDataFlateList({item}) {
  return (
    <>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          width: width * 0.93,
          height: 70,
          marginTop: 10,
          padding: 13,
          borderRadius: 15,
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: Colors.borderColor,
          marginBottom: 1,
        }}>
        <View>
          <Text>{item.Name}</Text>
        </View>
      </View>
    </>
  );
}

export function CategoryDataList(props) {
  return (
    <FlatList
      data={props.data}
      renderItem={({item}) => <CategoryDataFlateList item={item} />}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
