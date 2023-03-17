import { StyleSheet, Dimensions } from 'react-native';
import { FontSize } from '../../fonts/Fonts';
import { Colors } from '../../config/Colors';
import { FontFamily } from '../../fonts/FontFamily';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    loadingFullView: {
        alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flex: 1, width: '100%'
    },
    loadingContentView: { justifyContent: "center", alignItems: "center", margin: 10 },
    txt: {
        fontFamily: FontFamily.Popinssemibold,
        color: Colors.black,
        fontSize: FontSize.labelText3,
    },
    mrg5: {
        margin: 5
    }
})

export { styles };