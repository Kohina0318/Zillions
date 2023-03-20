import { StyleSheet, Dimensions } from 'react-native';
import { FontSize } from '../../fonts/Fonts';
import { Colors } from '../../config/Colors';
import { FontFamily } from '../../fonts/FontFamily';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    bg: { flex: 1 },
    container: {
        alignSelf: 'center',
        marginTop: 10,
        height: height * 0.8,
    },
    datalistView: {
        width: width * 0.94,
        marginTop: 5,
        padding: 13,
        borderRadius: 8,
        alignSelf: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        marginBottom: 1,
    },
    innerView: { flexDirection: "row", width: "100%" },
    txt: {
        fontSize: FontSize.labelText4,
        fontFamily: FontFamily.Popinssemibold,
        fontWeight: 'bold',
      },
      mv5: {
        marginTop: 5
      },

});

export { styles };
