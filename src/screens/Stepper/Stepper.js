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
        stepStrokeCurrentColor: Colors.bluetheme,
        stepStrokeWidth: 2,
        stepStrokeFinishedColor: Colors.bluetheme,
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: Colors.bluetheme,
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: Colors.bluetheme,
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 0,
        currentStepIndicatorLabelFontSize: 0,
        stepIndicatorLabelCurrentColor: Colors.bluetheme,
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
    <View style={{ ...StepperStyle.CUSTOMERdvIEW, }}>
    <TouchableOpacity activeOpacity={0.5} style={{ ...StepperStyle.CUSTOMERVIEWTO, backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
      <View
        style={{
          width: width * 0.9,
          justifyContent: 'center',
          alignSelf: 'center',
          top: 10
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
    </TouchableOpacity>
  </View>
  <View style={{ marginVertical: 1 }} />
  </>
  )
}
