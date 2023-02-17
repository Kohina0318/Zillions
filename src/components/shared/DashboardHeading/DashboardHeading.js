import React  from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from '../../../assets/css/DashboardStyle';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';

export default function DashboardHeading(props){

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();
   
    return(
        <View style={{...styles.ViewInnerHeading}}>
        <View>
          <Text style={{...styles.CardText, color: themecolor.TXTWHITE}}>
            {props.title}
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.5} onPress={()=>props.onPress}>
          <View
            style={{
              ...styles.ViewAllButton,
              backgroundColor: themecolor.HEADERTHEMECOLOR,
            }}>
            <Text style={styles.ViewAllButtonIcon}>View all</Text>
          </View>
        </TouchableOpacity>
        
      </View>
    )
}