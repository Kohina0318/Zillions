import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Appearance,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import { ProfileDataList } from '../../components/shared/FlateLists/Profile/ProfileDataFlatList';
import Header from '../../components/shared/header/Header';
import { data } from './ProfileData';
import {Avatar} from '@rneui/themed';
import { ProfileStyle } from '../../assets/css/ProfileStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const {width, height} = Dimensions.get('screen');

export default function Profile(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <View style={{backgroundColor: themecolor.THEMECOLOR,flex:1}}>
      <View style={{height: height * 0.1}}>
        <Header title="Profile" />
      </View>
      <View style={{marginTop: 20}} />
      <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:110,}}>
      
      <View
        style={{
          ...ProfileStyle.datalistView1,
          backgroundColor: themecolor.BOXTHEMECOLOR,
          borderColor: themecolor.BOXBORDERCOLOR1,
        }}>
        <View style={{...ProfileStyle.innerImage}}>
        {/* {props.photo == '' || props.photo == null ? ( */}
              <Avatar
                size={50}
                rounded
                avatarStyle={{
                  borderWidth: 5,
                  borderColor: 'white',
                  borderStyle: 'solid',
                }}
                source={require('../../assets/images/admin.png')}
              />
            {/* ) : (
              <Avatar
                size={150}
                rounded
                avatarStyle={{
                  borderWidth: 5,
                  borderColor: 'white',
                  borderStyle: 'solid',
                }}
                source={{uri: props.photo}}
              />
            )} */}
        </View>
        <View style={{...ProfileStyle.margleft15}}>
          <Text style={{...ProfileStyle.txt2, color: themecolor.TXTWHITE}}>
           Admin
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent:"center",alignItems:"center"}}>
          <TouchableOpacity
            style={{...ProfileStyle.iconview, borderRadius: 50, padding: 2}}
            // onPress={() => navigation.navigate('Products')}
            >
            <FontAwesome name='angle-right' size={30} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
   
      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
         <ProfileDataList data={data}/>

      </View>

      </ScrollView>
    </View>
  );
}
