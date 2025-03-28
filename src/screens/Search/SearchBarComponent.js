import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from '../../assets/css/SearchCss/searchStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';

export default function SearchBar(props) {
    const [result, setResult] = useState('')
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    const handleText = (text) => {
        props.setOffset(0);
        props.setProductData([]);
        props.setNoProduct('')
        setResult(text);
        props.onChange(text);
    }

    const handleClear = () => {
        setResult('');
        props.setNoProduct('')
        props.onpress1();
    }


    return (
        <View style={{ ...styles.SearchBarComponent, backgroundColor: themecolor.LOGINTHEMECOLOR1 }}>
            <View style={styles.SearchIcon}>
                <TouchableOpacity onPress={props.onpress}>
                    <Icon name={props.LeftIcon} size={18} color={themecolor.TXTWHITE} />
                </TouchableOpacity>
            </View>
            <TextInput allowFontScaling={false} onSubmitEditing={props.onSubmitEditing} value={result} onChangeText={(text) => handleText(text)} style={{ ...styles.SearchTextInput, height: props.height, color: themecolor.TXTWHITE }} placeholderTextColor={themecolor.TXTGREYS} placeholder={props.placeholder} />
            <View style={styles.Close}>
                <TouchableOpacity onPress={() => handleClear()}><Icon name={props.RightCloseIcon} size={20} color={themecolor.TXTWHITE} /></TouchableOpacity>
            </View>
        </View>
    )
}
SearchBar.defaultProps = {
    height: 45,
    placeholder: 'Search',
    titlecolor: '#FFF',
    BRadius: 10,
}