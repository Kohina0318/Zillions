import React,{useState} from 'react'
import { Text, View,TouchableOpacity,Dimensions } from 'react-native'
import StepIndicator from 'react-native-step-indicator';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { Colors } from '../../assets/config/Colors';
import StepperStyle from '../../assets/css/StepperStyle';

const { width, height } = Dimensions.get('screen');

export const Stepper = ({ item, props, themecolor }) => {

    const labels=["Cart","Address","Payment"]

    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 5,
        stepStrokeCurrentColor:themecolor.ADDTOCARTBUTTONCOLOR,
        stepStrokeWidth: 2,
        stepStrokeFinishedColor: themecolor.ADDTOCARTBUTTONCOLOR,
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: themecolor.ADDTOCARTBUTTONCOLOR,
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: themecolor.ADDTOCARTBUTTONCOLOR,
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 0,
        currentStepIndicatorLabelFontSize: 0,
        stepIndicatorLabelCurrentColor: themecolor.ADDTOCARTBUTTONCOLOR,
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 12,
        currentStepLabelColor: themecolor.TXTWHITE,
        labelFontFamily: FontFamily.PopinsMedium,
      }

      const [currentPosition, setCurrentPosition] = useState(0)

      const handleCurrentPosition = () => {
        if (item == "Cart") {
          setCurrentPosition(0)
        } else if (item == "Address") {
          setCurrentPosition(1)
        } else if (item == "Payment") {
          setCurrentPosition(2)
        } else {
        }
      }
    
      React.useEffect(() => {
        handleCurrentPosition()
      }, [])
    

  return (
    <>
    <View  style={{ ...StepperStyle.CUSTOMERVIEWTO,
          backgroundColor: themecolor.BOXBORDERCOLOR,
          borderColor: themecolor.BOXBORDERCOLOR1, }}>
      <View
        style={{
          width:"100%",
          justifyContent: 'center',
          alignSelf: 'center',
          top: 10,
          alignSelf:"center"
        }}>
        <StepIndicator
          customStyles={customStyles}
          labels={labels}
          stepCount={3}
          currentPosition={currentPosition}
        />
      </View>
      <View style={StepperStyle.NumberInputView}>

      </View>
    </View>
  </>
  )
}
