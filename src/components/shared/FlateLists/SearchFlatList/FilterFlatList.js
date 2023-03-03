import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { styles } from '../../../../assets/css/searchStyle';
import {MyThemeClass} from '../../../Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import { CheckBox } from '@rneui/themed';

const {width, height} = Dimensions.get('screen');



function FilterList({item, themecolor}) {
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  
  return (
    <>   
      <View style={styles.checkboxContainer}>
      <CheckBox
      center
      title={item.brand_name}
      checked={checked}
      onPress={() => setChecked(!checked)}
    />
      </View>
    </>
  );
}

export function FilterFlatList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  return (
    <>
      <FlatList
        data={props.data}
        renderItem={({item}) => (
          <FilterList item={item} themecolor={themecolor} />
        )}
        // horizontal={true}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: width * 0.94,
        }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
      <View style={{marginVertical: 20}} />
    </>
  );
}